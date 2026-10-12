"""The gardening handbook: Markdown chapters (EN / NL) and a glossary.

Chapters live in ``data/handbook/<lang>/NN-<id>.md``; the number orders the
table of contents and the first ``# heading`` is the title.  The glossary
feeds the info tooltips in the panel; each term links to a chapter.
"""

from __future__ import annotations

from dataclasses import dataclass
from functools import cache
import json
from pathlib import Path
import re
from typing import Any

from .i18n import normalize_lang

HANDBOOK_DIR = Path(__file__).resolve().parent.parent / "data" / "handbook"
_FILE = re.compile(r"^(\d+)-([a-z_]+)\.md$")


@dataclass(frozen=True, slots=True)
class Chapter:
    id: str
    order: int
    title: str
    summary: str
    sections: tuple[str, ...]
    body: str

    def meta(self) -> dict[str, Any]:
        return {
            "id": self.id,
            "order": self.order,
            "title": self.title,
            "summary": self.summary,
            "sections": list(self.sections),
        }


def _parse(order: int, chapter_id: str, text: str) -> Chapter:
    lines = text.strip().splitlines()
    title = lines[0].lstrip("# ").strip() if lines and lines[0].startswith("#") else chapter_id
    body = "\n".join(lines[1:]).strip()
    summary = next(
        (ln.strip() for ln in body.splitlines() if ln.strip() and not ln.startswith(("#", "|", "-", "1."))), ""
    )
    sections = tuple(ln[3:].strip() for ln in body.splitlines() if ln.startswith("## "))
    return Chapter(chapter_id, order, title, summary, sections, body)


@cache
def chapters(lang: str = "en") -> tuple[Chapter, ...]:
    folder = HANDBOOK_DIR / normalize_lang(lang)
    if not folder.is_dir():
        folder = HANDBOOK_DIR / "en"
    out = []
    for path in sorted(folder.glob("*.md")):
        match = _FILE.match(path.name)
        if match:
            out.append(_parse(int(match.group(1)), match.group(2), path.read_text(encoding="utf-8")))
    return tuple(sorted(out, key=lambda c: c.order))


def chapter(chapter_id: str, lang: str = "en") -> Chapter | None:
    return next((c for c in chapters(lang) if c.id == chapter_id), None)


@cache
def _glossary_raw() -> dict[str, Any]:
    return json.loads((HANDBOOK_DIR / "glossary.json").read_text(encoding="utf-8"))


def glossary(lang: str = "en") -> dict[str, dict[str, str]]:
    lang = normalize_lang(lang)
    out = {}
    for key, entry in _glossary_raw().items():
        text = entry.get(lang) or entry["en"]
        out[key] = {"term": text["term"], "text": text["text"], "chapter": entry.get("chapter", "")}
    return out


def search(query: str, lang: str = "en", limit: int = 20) -> list[dict[str, Any]]:
    """Case-insensitive search through chapter titles, headings and text."""
    q = query.strip().lower()
    if not q:
        return []
    hits = []
    for ch in chapters(lang):
        score = 0
        if q in ch.title.lower():
            score += 10
        score += 3 * sum(q in s.lower() for s in ch.sections)
        count = ch.body.lower().count(q)
        score += min(count, 5)
        if score:
            idx = ch.body.lower().find(q)
            snippet = ch.body[max(0, idx - 60) : idx + 100].replace("\n", " ").strip() if idx >= 0 else ch.summary
            hits.append({"id": ch.id, "title": ch.title, "score": score, "snippet": snippet})
    hits.sort(key=lambda h: -h["score"])
    return hits[:limit]
