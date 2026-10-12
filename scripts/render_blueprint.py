"""Render docs/BLUEPRINT.md from docs/_blueprint.template.md.

Placeholders pull code verbatim from the repository so the blueprint never drifts:

* ``{{py:path::Qualified.name}}``  - a Python class/function (via ``ast``)
* ``{{ts:path::start_regex::end_regex}}`` - lines from start up to (excluding) end
* ``{{lines:path::first::last}}`` - an inclusive line range

Usage: ``python scripts/render_blueprint.py``
"""

import ast
import pathlib
import re
import textwrap

ROOT = pathlib.Path(__file__).resolve().parent.parent
TEMPLATE = (ROOT / "docs" / "_blueprint.template.md").read_text()


def py(path, qual):
    src = (ROOT / path).read_text()
    tree = ast.parse(src)
    parts = qual.split(".")
    nodes = tree.body
    node = None
    for p in parts:
        node = next(
            n for n in nodes if isinstance(n, (ast.ClassDef, ast.FunctionDef, ast.AsyncFunctionDef)) and n.name == p
        )
        nodes = node.body
    start = min([d.lineno for d in getattr(node, "decorator_list", [])] + [node.lineno])
    lines = src.splitlines()[start - 1 : node.end_lineno]
    return textwrap.dedent("\n".join(lines))


def ts(path, start, end):
    src = (ROOT / path).read_text().splitlines()
    i = next(k for k, line in enumerate(src) if re.search(start, line))
    j = next(k for k in range(i + 1, len(src)) if re.search(end, src[k]))
    block = src[i:j]
    while block and not block[-1].strip():
        block.pop()
    return textwrap.dedent("\n".join(block))


def lines(path, a, b):
    src = (ROOT / path).read_text().splitlines()
    return "\n".join(src[a - 1 : b])


def render(match):
    kind, rest = match.group(1), match.group(2)
    args = rest.split("::")
    if kind == "py":
        return py(*args)
    if kind == "ts":
        return ts(*args)
    if kind == "lines":
        return lines(args[0], int(args[1]), int(args[2]))
    raise ValueError(kind)


out = re.sub(r"\{\{(py|ts|lines):([^}]+)\}\}", render, TEMPLATE)
(ROOT / "docs" / "BLUEPRINT.md").write_text(out)
print("written", len(out.splitlines()), "lines")
