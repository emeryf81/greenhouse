"""Render the architecture blueprint from docs/_blueprint.template.md.

``docs/BLUEPRINT.md`` holds the title, the contents and chapters 1-2; every later chapter
goes to its own file in ``docs/blueprint/``. GitHub stops formatting a Markdown file past
a certain size (the page then shows raw text and no diagrams), so no file may grow that big.
Relative links are rewritten for the files one folder deeper, and links to a heading in
another chapter point at that chapter's file.

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


HEADER = "<!-- Generated from the sources by a script: code excerpts below are verbatim. -->\n"
MAIN_CHAPTERS = 2  # chapters kept in docs/BLUEPRINT.md
MAX_BYTES = 150_000  # well below the size GitHub still formats


def slug(heading):
    """GitHub's anchor for a heading (lower case, punctuation dropped, spaces to dashes)."""
    text = re.sub(r"[`*_]", "", heading.strip().lower())
    text = re.sub(r"[^\w\- ]", "", text, flags=re.UNICODE)
    return text.replace(" ", "-")


def outside_code(text, fn):
    """Apply ``fn`` to the parts of ``text`` that are not fenced code blocks."""
    parts = re.split(r"(?ms)(^```.*?^```[^\n]*$)", text)
    return "".join(part if part.startswith("```") else fn(part) for part in parts)


def deeper(text):
    """Relative links and image sources for a file in docs/blueprint/."""

    def fix(url):
        return url if re.match(r"(https?:|mailto:|#|/)", url) else "../" + url

    text = re.sub(r"\]\(([^)\s]+)\)", lambda m: "](" + fix(m.group(1)) + ")", text)
    return re.sub(r'((?:src|href)=")([^"]+)"', lambda m: m.group(1) + fix(m.group(2)) + '"', text)


out = re.sub(r"\{\{(py|ts|lines):([^}]+)\}\}", render, TEMPLATE)
out = out.removeprefix(HEADER)
head, *chapters = re.split(r"(?m)^(?=## \d+\. )", out)
files = {}  # chapter index -> file name relative to docs/
for i, chapter in enumerate(chapters):
    title = chapter.splitlines()[0][3:]
    number, _, name = title.partition(". ")
    files[i] = "BLUEPRINT.md" if i < MAIN_CHAPTERS else f"blueprint/{int(number):02d}-{slug(name)}.md"
anchors = {}  # heading anchor -> file
for i, chapter in enumerate(chapters):
    for line in outside_code(chapter, lambda t: t).splitlines():
        m = re.match(r"#{2,6} (.+)", line)
        if m:
            anchors.setdefault(slug(m.group(1)), files[i])


def retarget(text, here):
    def fix(m):
        target = anchors.get(m.group(1))
        if target is None or target == here:
            return m.group(0)
        if here == "BLUEPRINT.md":
            return f"]({target}#{m.group(1)})"
        return f"](../{target}#{m.group(1)})" if target == "BLUEPRINT.md" else f"]({target.split('/')[1]}#{m.group(1)})"

    return outside_code(text, lambda t: re.sub(r"\]\(#([^)\s]+)\)", fix, t))


docs = ROOT / "docs"
(docs / "blueprint").mkdir(exist_ok=True)
for old in (docs / "blueprint").glob("*.md"):
    old.unlink()
written = {"BLUEPRINT.md": HEADER + retarget(head, "BLUEPRINT.md")}
for i, chapter in enumerate(chapters):
    name = files[i]
    if name == "BLUEPRINT.md":
        written[name] += retarget(chapter, name)
        continue
    prev_name = files[i - 1].split("/")[-1] if i else None
    nxt = files.get(i + 1)
    nav = ["[↑ Blueprint contents](../BLUEPRINT.md)"]
    if prev_name and files[i - 1] != "BLUEPRINT.md":
        nav.insert(0, f"[← {chapters[i - 1].splitlines()[0][3:]}]({prev_name})")
    if nxt:
        nav.append(f"[{chapters[i + 1].splitlines()[0][3:]} →]({nxt.split('/')[-1]})")
    bar = " · ".join(nav)
    body = outside_code(retarget(chapter, name), deeper).rstrip()
    written[name] = f"{HEADER}{bar}\n\n{body}\n\n---\n\n{bar}\n"
for name, text in written.items():
    size = len(text.encode())
    if size > MAX_BYTES:
        raise SystemExit(f"{name} is {size} bytes; split the chapter further (limit {MAX_BYTES})")
    (docs / name).write_text(text)
    print(f"written {name}: {len(text.splitlines())} lines, {size // 1024} KB")
