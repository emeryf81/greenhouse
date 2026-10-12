"""Drawing surfaces for printouts: a dependency-free PDF writer and SVG.

Both surfaces implement the same small API in **millimetres with the origin
at the top-left** (y grows downwards), so ``printout.py`` lays out a page
once and renders it as a PDF (for printing / the reMarkable) or as SVG (the
on-screen preview).

The PDF uses the 14 standard fonts (Helvetica, Helvetica-Bold) with
WinAnsi encoding - no font files are embedded, every PDF reader and the
reMarkable render them.  Content streams are Flate-compressed.
"""

from __future__ import annotations

from collections.abc import Iterator, Sequence
from contextlib import contextmanager
from dataclasses import dataclass, field
from datetime import UTC, datetime
from html import escape
import unicodedata
import zlib

MM = 72 / 25.4  # points per millimetre
PT_TO_MM = 25.4 / 72

# Glyph widths (1/1000 em) for ASCII 32..126 from the Adobe AFM files.
_HELVETICA = (
    278, 278, 355, 556, 556, 889, 667, 191, 333, 333, 389, 584, 278, 333, 278, 278,
    556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 278, 278, 584, 584, 584, 556,
    1015, 667, 667, 722, 722, 667, 611, 778, 722, 278, 500, 667, 556, 833, 722, 778,
    667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611, 278, 278, 278, 469, 556,
    333, 556, 556, 500, 556, 556, 278, 556, 556, 222, 222, 500, 222, 833, 556, 556,
    556, 556, 333, 500, 278, 556, 500, 722, 500, 500, 500, 334, 260, 334, 584,
)  # fmt: skip
_HELVETICA_BOLD = (
    278, 333, 474, 556, 556, 889, 722, 238, 333, 333, 389, 584, 278, 333, 278, 278,
    556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 333, 333, 584, 584, 584, 611,
    975, 722, 722, 722, 722, 667, 611, 778, 722, 278, 556, 722, 611, 833, 722, 778,
    667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611, 333, 278, 333, 584, 556,
    333, 556, 611, 556, 611, 556, 333, 611, 611, 278, 278, 556, 278, 889, 611, 611,
    611, 611, 389, 556, 333, 611, 556, 778, 556, 556, 500, 389, 280, 389, 584,
)  # fmt: skip
_EXTRA_WIDTHS = {"°": 400, "²": 333, "³": 333, "·": 278, "–": 556, "—": 1000, "…": 1000, "€": 556, "×": 584, "•": 350}
_REPLACE = {"→": "->", "←": "<-", "≈": "~", "≥": ">=", "≤": "<=", "−": "-", "✓": "v", "★": "*", " ": " "}


def _clean(text: str) -> str:
    return "".join(_REPLACE.get(ch, ch) for ch in text)


def _char_width(ch: str, bold: bool) -> int:
    table = _HELVETICA_BOLD if bold else _HELVETICA
    code = ord(ch)
    if 32 <= code <= 126:
        return table[code - 32]
    if ch in _EXTRA_WIDTHS:
        return _EXTRA_WIDTHS[ch]
    base = unicodedata.normalize("NFKD", ch)[:1]  # é -> e
    if base and 32 <= ord(base) <= 126:
        return table[ord(base) - 32]
    return 556


def text_width(text: str, size_pt: float, bold: bool = False) -> float:
    """Width of ``text`` in millimetres."""
    return sum(_char_width(ch, bold) for ch in _clean(text)) / 1000 * size_pt * PT_TO_MM


def wrap(text: str, width_mm: float, size_pt: float, bold: bool = False) -> list[str]:
    """Greedy word wrap; very long words are cut."""
    lines: list[str] = []
    for paragraph in text.split("\n"):
        line = ""
        for word in paragraph.split(" "):
            candidate = f"{line} {word}".strip()
            if text_width(candidate, size_pt, bold) <= width_mm or not line:
                line = candidate
            else:
                lines.append(line)
                line = word
            # Cut words that are wider than the line on their own (also right after a break).
            while text_width(line, size_pt, bold) > width_mm and len(line) > 1:
                cut = len(line) - 1
                while cut > 1 and text_width(line[:cut], size_pt, bold) > width_mm:
                    cut -= 1
                lines.append(line[:cut])
                line = line[cut:]
        lines.append(line)
    return lines


def ellipsize(text: str, width_mm: float, size_pt: float, bold: bool = False) -> str:
    if text_width(text, size_pt, bold) <= width_mm:
        return text
    while text and text_width(text + "…", size_pt, bold) > width_mm:
        text = text[:-1]
    return text + "…" if text else ""


def hex_rgb(color: str) -> tuple[float, float, float]:
    color = color.lstrip("#")
    if len(color) == 3:
        color = "".join(c * 2 for c in color)
    return int(color[0:2], 16) / 255, int(color[2:4], 16) / 255, int(color[4:6], 16) / 255


def to_gray(color: str) -> str:
    """Perceived luminance as a grey hex colour."""
    r, g, b = hex_rgb(color)
    v = round((0.299 * r + 0.587 * g + 0.114 * b) * 255)
    return f"#{v:02X}{v:02X}{v:02X}"


def _num(value: float) -> str:
    out = f"{value:.2f}".rstrip("0").rstrip(".")
    return "0" if out == "-0" else out


# --------------------------------------------------------------------------- #
# Surface API
# --------------------------------------------------------------------------- #
class Surface:
    """Abstract page; subclasses emit PDF operators or SVG elements."""

    width: float
    height: float

    def rect(
        self,
        x: float,
        y: float,
        w: float,
        h: float,
        *,
        fill: str | None = None,
        stroke: str | None = None,
        width: float = 0.25,
        dash: Sequence[float] | None = None,
        radius: float = 0.0,
    ) -> None:
        raise NotImplementedError

    def line(
        self, x1: float, y1: float, x2: float, y2: float, *, stroke: str = "#000", width: float = 0.25,
        dash: Sequence[float] | None = None,
    ) -> None:  # fmt: skip
        raise NotImplementedError

    def polygon(
        self, points: Sequence[tuple[float, float]], *, fill: str | None = None, stroke: str | None = None,
        width: float = 0.25, close: bool = True,
    ) -> None:  # fmt: skip
        raise NotImplementedError

    def circle(
        self, cx: float, cy: float, r: float, *, fill: str | None = None, stroke: str | None = None, width: float = 0.25
    ) -> None:
        raise NotImplementedError

    def dots(self, points: Sequence[tuple[float, float]], *, r: float, color: str) -> None:
        for x, y in points:
            self.circle(x, y, r, fill=color)

    def text(
        self, x: float, y: float, text: str, *, size: float = 9.0, color: str = "#000", bold: bool = False,
        anchor: str = "start",
    ) -> None:  # fmt: skip
        raise NotImplementedError

    @contextmanager
    def clip(self, x: float, y: float, w: float, h: float) -> Iterator[None]:
        raise NotImplementedError
        yield  # pragma: no cover

    # -- helpers shared by both back ends --------------------------------- #
    def hatch(self, x: float, y: float, w: float, h: float, pattern: str, color: str, spacing: float = 2.5) -> None:
        """Fill a rectangle with a line pattern (e-ink friendly, survives B/W)."""
        if pattern == "none" or w <= 0 or h <= 0:
            return
        with self.clip(x, y, w, h):
            lw = 0.18
            if pattern in ("diag", "cross"):
                k = -h
                while k < w:
                    self.line(x + k, y + h, x + k + h, y, stroke=color, width=lw)
                    k += spacing
            if pattern in ("back", "cross"):
                k = 0.0
                while k < w + h:
                    self.line(x + k - h, y, x + k, y + h, stroke=color, width=lw)
                    k += spacing
            if pattern in ("horiz", "grid"):
                yy = y + spacing / 2
                while yy < y + h:
                    self.line(x, yy, x + w, yy, stroke=color, width=lw)
                    yy += spacing
            if pattern in ("vert", "grid"):
                xx = x + spacing / 2
                while xx < x + w:
                    self.line(xx, y, xx, y + h, stroke=color, width=lw)
                    xx += spacing
            if pattern == "dots":
                pts = []
                yy = y + spacing / 2
                row = 0
                while yy < y + h:
                    xx = x + spacing / 2 + (spacing / 2 if row % 2 else 0)
                    while xx < x + w:
                        pts.append((xx, yy))
                        xx += spacing
                    yy += spacing
                    row += 1
                self.dots(pts, r=0.25, color=color)

    def text_block(
        self, x: float, y: float, width: float, text: str, *, size: float = 9.0, color: str = "#000",
        bold: bool = False, leading: float = 1.3, max_lines: int | None = None,
    ) -> float:  # fmt: skip
        """Wrapped text; returns the y below the block."""
        lines = wrap(text, width, size, bold)
        if max_lines is not None and len(lines) > max_lines:
            lines = lines[:max_lines]
            lines[-1] = ellipsize(lines[-1] + "…", width, size, bold)
        step = size * leading * PT_TO_MM
        for line in lines:
            y += step
            self.text(x, y - step * 0.25, line, size=size, color=color, bold=bold)
        return y


# --------------------------------------------------------------------------- #
# PDF
# --------------------------------------------------------------------------- #
@dataclass(slots=True)
class PdfPage(Surface):
    width: float
    height: float
    ops: list[str] = field(default_factory=list)
    grayscale: bool = False

    def _y(self, y: float) -> float:
        return (self.height - y) * MM

    def _color(self, color: str, stroke: bool) -> str:
        r, g, b = hex_rgb(to_gray(color) if self.grayscale else color)
        return f"{_num(r)} {_num(g)} {_num(b)} {'RG' if stroke else 'rg'}"

    def _style(self, fill: str | None, stroke: str | None, width: float, dash: Sequence[float] | None) -> str | None:
        if fill:
            self.ops.append(self._color(fill, False))
        if stroke:
            self.ops.append(self._color(stroke, True))
            self.ops.append(f"{_num(width * MM)} w")
            self.ops.append(f"[{' '.join(_num(d * MM) for d in dash)}] 0 d" if dash else "[] 0 d")
        if fill and stroke:
            return "B"
        if fill:
            return "f"
        if stroke:
            return "S"
        return None

    def rect(self, x, y, w, h, *, fill=None, stroke=None, width=0.25, dash=None, radius=0.0):
        op = self._style(fill, stroke, width, dash)
        if op is None:
            return
        if radius > 0:
            r = min(radius, w / 2, h / 2)
            k = 0.5523 * r
            pts = [
                f"{_num((x + r) * MM)} {_num(self._y(y))} m",
                f"{_num((x + w - r) * MM)} {_num(self._y(y))} l",
                f"{_num((x + w - r + k) * MM)} {_num(self._y(y))} {_num((x + w) * MM)} {_num(self._y(y + r - k))} {_num((x + w) * MM)} {_num(self._y(y + r))} c",
                f"{_num((x + w) * MM)} {_num(self._y(y + h - r))} l",
                f"{_num((x + w) * MM)} {_num(self._y(y + h - r + k))} {_num((x + w - r + k) * MM)} {_num(self._y(y + h))} {_num((x + w - r) * MM)} {_num(self._y(y + h))} c",
                f"{_num((x + r) * MM)} {_num(self._y(y + h))} l",
                f"{_num((x + r - k) * MM)} {_num(self._y(y + h))} {_num(x * MM)} {_num(self._y(y + h - r + k))} {_num(x * MM)} {_num(self._y(y + h - r))} c",
                f"{_num(x * MM)} {_num(self._y(y + r))} l",
                f"{_num(x * MM)} {_num(self._y(y + r - k))} {_num((x + r - k) * MM)} {_num(self._y(y))} {_num((x + r) * MM)} {_num(self._y(y))} c",
            ]
            self.ops.extend(pts)
            self.ops.append("h " + op)
            return
        self.ops.append(f"{_num(x * MM)} {_num(self._y(y + h))} {_num(w * MM)} {_num(h * MM)} re {op}")

    def line(self, x1, y1, x2, y2, *, stroke="#000", width=0.25, dash=None):
        self._style(None, stroke, width, dash)
        self.ops.append(f"{_num(x1 * MM)} {_num(self._y(y1))} m {_num(x2 * MM)} {_num(self._y(y2))} l S")

    def polygon(self, points, *, fill=None, stroke=None, width=0.25, close=True):
        op = self._style(fill, stroke, width, None)
        if op is None or len(points) < 2:
            return
        x0, y0 = points[0]
        path = [f"{_num(x0 * MM)} {_num(self._y(y0))} m"]
        path += [f"{_num(x * MM)} {_num(self._y(y))} l" for x, y in points[1:]]
        if close:
            path.append("h")
        self.ops.append(" ".join(path) + " " + (op if close or op == "S" else "S"))

    def circle(self, cx, cy, r, *, fill=None, stroke=None, width=0.25):
        op = self._style(fill, stroke, width, None)
        if op is None:
            return
        k = 0.5523 * r
        X, Y = cx * MM, self._y(cy)
        R, K = r * MM, k * MM
        self.ops.append(
            f"{_num(X + R)} {_num(Y)} m "
            f"{_num(X + R)} {_num(Y + K)} {_num(X + K)} {_num(Y + R)} {_num(X)} {_num(Y + R)} c "
            f"{_num(X - K)} {_num(Y + R)} {_num(X - R)} {_num(Y + K)} {_num(X - R)} {_num(Y)} c "
            f"{_num(X - R)} {_num(Y - K)} {_num(X - K)} {_num(Y - R)} {_num(X)} {_num(Y - R)} c "
            f"{_num(X + K)} {_num(Y - R)} {_num(X + R)} {_num(Y - K)} {_num(X + R)} {_num(Y)} c h {op}"
        )

    def dots(self, points, *, r, color):
        # Zero-length lines with round caps: one operator per dot, tiny files.
        if not points:
            return
        self.ops.append(f"q {self._color(color, True)} {_num(2 * r * MM)} w 1 J")
        self.ops.extend(f"{_num(x * MM)} {_num(self._y(y))} m {_num(x * MM)} {_num(self._y(y))} l S" for x, y in points)
        self.ops.append("Q")

    def text(self, x, y, text, *, size=9.0, color="#000", bold=False, anchor="start"):
        text = _clean(text)
        if not text:
            return
        if anchor != "start":
            w = text_width(text, size, bold)
            x -= w / 2 if anchor == "middle" else w
        data = text.encode("cp1252", errors="replace")
        escaped = data.replace(b"\\", b"\\\\").replace(b"(", b"\\(").replace(b")", b"\\)").decode("latin-1")
        self.ops.append(
            f"BT /{'F2' if bold else 'F1'} {_num(size)} Tf {self._color(color, False)} "
            f"{_num(x * MM)} {_num(self._y(y))} Td ({escaped}) Tj ET"
        )

    @contextmanager
    def clip(self, x, y, w, h):
        self.ops.append(f"q {_num(x * MM)} {_num(self._y(y + h))} {_num(w * MM)} {_num(h * MM)} re W n")
        try:
            yield
        finally:
            self.ops.append("Q")


@dataclass(slots=True)
class PdfDocument:
    title: str = "Hortulus"
    author: str = "Hortulus"
    pages: list[PdfPage] = field(default_factory=list)

    def add_page(self, width_mm: float, height_mm: float) -> PdfPage:
        page = PdfPage(width_mm, height_mm)
        self.pages.append(page)
        return page

    def to_bytes(self, *, created: datetime | None = None) -> bytes:
        objects: list[bytes] = []

        def add(body: bytes) -> int:
            objects.append(body)
            return len(objects)

        def pdf_string(value: str) -> str:
            data = _clean(value).encode("cp1252", errors="replace")
            return (
                "(" + data.replace(b"\\", b"\\\\").replace(b"(", b"\\(").replace(b")", b"\\)").decode("latin-1") + ")"
            )

        catalog = add(b"")  # placeholder, filled below
        pages_id = add(b"")
        font1 = add(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>")
        font2 = add(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>")
        kids = []
        for page in self.pages:
            stream = zlib.compress("\n".join(page.ops).encode("latin-1"), 9)
            content = add(
                f"<< /Length {len(stream)} /Filter /FlateDecode >>\nstream\n".encode() + stream + b"\nendstream"
            )
            kids.append(
                add(
                    (
                        f"<< /Type /Page /Parent {pages_id} 0 R "
                        f"/MediaBox [0 0 {_num(page.width * MM)} {_num(page.height * MM)}] "
                        f"/Resources << /Font << /F1 {font1} 0 R /F2 {font2} 0 R >> >> "
                        f"/Contents {content} 0 R >>"
                    ).encode()
                )
            )
        stamp = (created or datetime.now(UTC)).strftime("D:%Y%m%d%H%M%SZ")
        info = add(
            (
                f"<< /Title {pdf_string(self.title)} /Author {pdf_string(self.author)} "
                f"/Producer (Hortulus) /CreationDate ({stamp}) >>"
            ).encode()
        )
        objects[catalog - 1] = f"<< /Type /Catalog /Pages {pages_id} 0 R >>".encode()
        objects[pages_id - 1] = (
            f"<< /Type /Pages /Kids [{' '.join(f'{k} 0 R' for k in kids)}] /Count {len(kids)} >>".encode()
        )

        out = bytearray(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")
        offsets = []
        for idx, body in enumerate(objects, start=1):
            offsets.append(len(out))
            out += f"{idx} 0 obj\n".encode() + body + b"\nendobj\n"
        xref = len(out)
        out += f"xref\n0 {len(objects) + 1}\n0000000000 65535 f \n".encode()
        out += b"".join(f"{off:010d} 00000 n \n".encode() for off in offsets)
        out += f"trailer\n<< /Size {len(objects) + 1} /Root {catalog} 0 R /Info {info} 0 R >>\n".encode()
        out += f"startxref\n{xref}\n%%EOF\n".encode()
        return bytes(out)


# --------------------------------------------------------------------------- #
# SVG
# --------------------------------------------------------------------------- #
@dataclass(slots=True)
class SvgPage(Surface):
    width: float
    height: float
    parts: list[str] = field(default_factory=list)
    _clip_id: int = 0
    grayscale: bool = False

    def _c(self, color: str) -> str:
        return to_gray(color) if self.grayscale else color

    def _paint(self, fill: str | None, stroke: str | None, width: float, dash: Sequence[float] | None = None) -> str:
        fill = self._c(fill) if fill else None
        stroke = self._c(stroke) if stroke else None
        attrs = [f'fill="{fill or "none"}"']
        if stroke:
            attrs.append(f'stroke="{stroke}" stroke-width="{_num(width)}"')
            if dash:
                attrs.append(f'stroke-dasharray="{" ".join(_num(d) for d in dash)}"')
        return " ".join(attrs)

    def rect(self, x, y, w, h, *, fill=None, stroke=None, width=0.25, dash=None, radius=0.0):
        if not fill and not stroke:
            return
        rx = f' rx="{_num(radius)}"' if radius else ""
        self.parts.append(
            f'<rect x="{_num(x)}" y="{_num(y)}" width="{_num(w)}" height="{_num(h)}"{rx} '
            f"{self._paint(fill, stroke, width, dash)}/>"
        )

    def line(self, x1, y1, x2, y2, *, stroke="#000", width=0.25, dash=None):
        self.parts.append(
            f'<line x1="{_num(x1)}" y1="{_num(y1)}" x2="{_num(x2)}" y2="{_num(y2)}" '
            f"{self._paint(None, stroke, width, dash)}/>"
        )

    def polygon(self, points, *, fill=None, stroke=None, width=0.25, close=True):
        pts = " ".join(f"{_num(x)},{_num(y)}" for x, y in points)
        tag = "polygon" if close else "polyline"
        self.parts.append(f'<{tag} points="{pts}" {self._paint(fill if close else None, stroke, width)}/>')

    def circle(self, cx, cy, r, *, fill=None, stroke=None, width=0.25):
        self.parts.append(f'<circle cx="{_num(cx)}" cy="{_num(cy)}" r="{_num(r)}" {self._paint(fill, stroke, width)}/>')

    def dots(self, points, *, r, color):
        if not points:
            return
        d = " ".join(f"M{_num(x)} {_num(y)}h0" for x, y in points)
        self.parts.append(
            f'<path d="{d}" stroke="{self._c(color)}" stroke-width="{_num(2 * r)}" stroke-linecap="round" fill="none"/>'
        )

    def text(self, x, y, text, *, size=9.0, color="#000", bold=False, anchor="start"):
        if not text:
            return
        weight = ' font-weight="700"' if bold else ""
        self.parts.append(
            f'<text x="{_num(x)}" y="{_num(y)}" font-size="{_num(size * PT_TO_MM)}" fill="{self._c(color)}" '
            f'text-anchor="{anchor}"{weight}>{escape(text)}</text>'
        )

    @contextmanager
    def clip(self, x, y, w, h):
        self._clip_id += 1
        cid = f"c{self._clip_id}"
        self.parts.append(
            f'<clipPath id="{cid}"><rect x="{_num(x)}" y="{_num(y)}" width="{_num(w)}" height="{_num(h)}"/></clipPath>'
            f'<g clip-path="url(#{cid})">'
        )
        try:
            yield
        finally:
            self.parts.append("</g>")

    def to_svg(self, id_prefix: str = "p") -> str:
        body = "".join(self.parts).replace('id="c', f'id="{id_prefix}c').replace("url(#c", f"url(#{id_prefix}c")
        return (
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {_num(self.width)} {_num(self.height)}" '
            f'width="{_num(self.width)}mm" height="{_num(self.height)}mm" '
            f'font-family="Helvetica, Arial, sans-serif">'
            f'<rect width="100%" height="100%" fill="#fff"/>{body}</svg>'
        )
