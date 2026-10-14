"""Tiny, dependency-free (de)serialisation for the Hortulus dataclasses.

The stored JSON documents must survive version upgrades in both directions:

* unknown keys are ignored (a newer version wrote them - forward compatible),
* missing keys fall back to the dataclass default (backward compatible),
* enums, dates and datetimes are stored as ISO strings.

Only the type shapes actually used by :mod:`.models` are supported:
dataclasses, ``StrEnum``, ``date``, ``datetime``, ``list[T]``, ``dict[str, T]``,
``T | None`` and plain JSON scalars.
"""

from __future__ import annotations

import dataclasses
from datetime import date, datetime
from enum import Enum
from functools import cache
import types
import typing
from typing import Any, TypeVar, get_args, get_origin

T = TypeVar("T")

# Captured at import time: test helpers such as freezegun swap the module
# attributes for subclasses, so identity checks (``tp is date``) are fragile.
_DATETIME: type = datetime
_DATE: type = date


@cache
def _hints(cls: type) -> dict[str, Any]:
    return typing.get_type_hints(cls)


def to_dict(obj: Any) -> Any:
    """Convert a dataclass tree into JSON-compatible primitives."""
    if dataclasses.is_dataclass(obj) and not isinstance(obj, type):
        return {f.name: to_dict(getattr(obj, f.name)) for f in dataclasses.fields(obj)}
    if isinstance(obj, Enum):
        return obj.value
    if isinstance(obj, datetime):
        return obj.isoformat()
    if isinstance(obj, date):
        return obj.isoformat()
    if isinstance(obj, (list, tuple)):
        return [to_dict(v) for v in obj]
    if isinstance(obj, dict):
        return {str(k): to_dict(v) for k, v in obj.items()}
    return obj


def from_dict(cls: type[T], data: Any) -> T:
    """Build ``cls`` from primitives produced by :func:`to_dict` (or by a user)."""
    return _convert(cls, data)


def _convert(tp: Any, value: Any) -> Any:
    if value is None:
        return None
    origin = get_origin(tp)

    # Optional / unions: try every member, first success wins.
    if origin in (typing.Union, types.UnionType):
        members = [a for a in get_args(tp) if a is not type(None)]
        last_err: Exception | None = None
        for member in members:
            try:
                return _convert(member, value)
            except (TypeError, ValueError, KeyError) as err:
                last_err = err
        raise ValueError(f"Cannot convert {value!r} to {tp}") from last_err

    if origin is list:
        (item_tp,) = get_args(tp) or (Any,)
        if not isinstance(value, (list, tuple)):
            raise TypeError(f"Expected list, got {type(value).__name__}")
        return [_convert(item_tp, v) for v in value]

    if origin is dict:
        _key_tp, val_tp = get_args(tp) or (str, Any)
        if isinstance(value, (list, tuple)) and not value:
            return {}  # an empty object that went through PHP's json_decode(..., true) comes back as []
        if not isinstance(value, dict):
            raise TypeError(f"Expected mapping, got {type(value).__name__}")
        return {str(k): _convert(val_tp, v) for k, v in value.items()}

    if origin is typing.Literal:
        if value not in get_args(tp):
            raise ValueError(f"{value!r} not in {get_args(tp)}")
        return value

    if tp is Any:
        return value

    if isinstance(tp, type):
        if dataclasses.is_dataclass(tp):
            if isinstance(value, tp):
                return value
            if not isinstance(value, dict):
                raise TypeError(f"Expected mapping for {tp.__name__}")
            hints = _hints(tp)
            kwargs = {
                f.name: _convert(hints[f.name], value[f.name])
                for f in dataclasses.fields(tp)
                if f.name in value and f.init
            }
            return tp(**kwargs)
        if issubclass(tp, Enum):
            return tp(value)
        if issubclass(tp, _DATETIME) or tp is datetime:
            return value if isinstance(value, _DATETIME) else datetime.fromisoformat(value)
        if issubclass(tp, _DATE) or tp is date:
            if isinstance(value, _DATETIME):
                return value.date()
            if isinstance(value, _DATE):
                return value
            return date.fromisoformat(str(value)[:10])
        if tp is bool:
            if isinstance(value, str):
                return value.strip().lower() in ("1", "true", "yes", "on")
            return bool(value)
        if tp is float:
            return float(value)
        if tp is int:
            return int(value)
        if tp is str:
            return str(value)
    return value
