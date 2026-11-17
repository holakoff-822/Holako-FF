# -*- coding: utf-8 -*-
import os
import shutil
import codecs

DESKTOP = r"C:\Users\Youssef Gamal\OneDrive\Desktop"
SRC = os.path.join(DESKTOP, "index.html")
PROJ = os.path.join(DESKTOP, "zakhrafa-gaming")

with open(SRC, "rb") as f:
    raw = f.read()

if raw.startswith(b"\xef\xbb\xbf"):
    raw = raw[3:]

# The file on disk is valid UTF-8, but its *content* is mojibake:
# original UTF-8 bytes were decoded as a single-byte codec and re-saved as UTF-8.
text = raw.decode("utf-8")

# Reverse the double-encoding. The decode layer is Windows-1252 (cp1252):
# bytes 0x80-0x9F that are "defined" in cp1252 became printable chars
# (Š, œ, ™, •, …), while the *undefined* bytes (0x81, 0x8D, 0x8F, 0x90, 0x9D)
# became C1 control chars (U+0081, U+008D, U+008F, U+0090, U+009D).
# Python's cp1252 cannot re-encode those C1 controls, so build the bytes
# manually: C1 controls map to their byte value, everything else via cp1252.
def reverse_mojibake(s):
    out = bytearray()
    for ch in s:
        o = ord(ch)
        if 0x80 <= o <= 0x9F:
            out.append(o)
        else:
            out.extend(ch.encode("cp1252"))
    return bytes(out).decode("utf-8")

fixed = reverse_mojibake(text)

# ---------------------------------------------------------------------------
# THEME: black / gold / red  (cyan -> gold, purple/blue -> red/black)
# ---------------------------------------------------------------------------
repl = [
    # cyan -> gold
    ("#00f5d4", "#f5c518"),
    ("#52ffee", "#ffe066"),
    ("#00b4d8", "#d4a017"),
    ("#00c9a7", "#d4a017"),
    ("#3b82f6", "#f5c518"),
    ("rgba(0, 245, 212,", "rgba(245, 197, 24,"),
    # purple -> red
    ("#a855f7", "#e11d48"),
    ("#6366f1", "#9f1239"),
    ("#7928ca", "#d4a017"),
    ("#ff0080", "#e11d48"),
    ("#c084fc", "#ff8fa3"),
    ("#e9d5ff", "#ffd1d9"),
    ("#d8b4fe", "#ffb3c1"),
    ("#ff3366", "#e11d48"),
    ("rgba(168, 85, 247,", "rgba(225, 29, 72,"),
    ("rgba(255, 51, 102,", "rgba(225, 29, 72,"),
    # blue-black backgrounds -> warm black
    ("#050811", "#0a0a0a"),
    ("#0b1120", "#141414"),
    ("#080d1a", "#0d0d0d"),
    ("#04060c", "#000000"),
    ("#0f172a", "#1a1a1a"),
    ("#060911", "#0a0a0a"),
    ("#080c15", "#0a0a0a"),
    ("rgba(15, 23, 42,", "rgba(20, 20, 20,"),
    ("rgba(22, 34, 61,", "rgba(32, 26, 20,"),
    ("rgba(5, 8, 17,", "rgba(10, 10, 10,"),
    ("rgba(8, 13, 24,", "rgba(12, 12, 12,"),
    ("rgba(30, 41, 59, 1)", "rgba(40, 34, 24, 1)"),
    # unify golds
    ("#ffd166", "#f5c518"),
    ("#ffd700", "#f5c518"),
    # favicon (URL-encoded colors inside the data URI)
    ("%239d4edd", "%23d4a017"),
    ("%2300f5d4", "%23e11d48"),
    ("%23ffd166", "%23f5c518"),
    ("%23080c15", "%230a0a0a"),
]
for a, b in repl:
    fixed = fixed.replace(a, b)

# particle colors -> gold/red alternating
fixed = fixed.replace(
    'const colors = ["#f5c518", "#e11d48", "#f5c518", "#f5c518"];',
    'const colors = ["#f5c518", "#e11d48", "#ffd700", "#e11d48"];'
)

# ---------------------------------------------------------------------------
# Royal gold/red refinements (injected before </style>)
# ---------------------------------------------------------------------------
ENHANCE = """    /* ==== Royal Black-Gold-Red refinements ==== */
    header.site-header::before {
      content: "";
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 3px;
      background: linear-gradient(90deg, #f5c518, #e11d48, #f5c518);
      background-size: 200% 100%;
      animation: royalSheen 6s linear infinite;
    }
    @keyframes royalSheen {
      0% { background-position: 0% 0; }
      100% { background-position: 200% 0; }
    }
    .hero-title {
      text-shadow: 0 0 30px rgba(245, 197, 24, 0.35), 0 0 60px rgba(225, 29, 72, 0.25);
    }
    .generator-box {
      border-color: rgba(245, 197, 24, 0.4);
    }
  </style>"""
if "</style>" in fixed:
    fixed = fixed.replace("</style>", ENHANCE, 1)

# ---------------------------------------------------------------------------
# Write outputs
# ---------------------------------------------------------------------------
os.makedirs(PROJ, exist_ok=True)

with open(os.path.join(PROJ, "index.html"), "w", encoding="utf-8") as f:
    f.write(fixed)

with open(SRC, "w", encoding="utf-8") as f:
    f.write(fixed)

for name in ("robots.txt", "sitemap.xml"):
    p = os.path.join(DESKTOP, name)
    if os.path.exists(p):
        shutil.copyfile(p, os.path.join(PROJ, name))

# Verification markers
sample = fixed[fixed.find("<title>") + 7: fixed.find("</title>")]
has_arabic = any("\u0600" <= c <= "\u06FF" for c in fixed)
with open(os.path.join(PROJ, "_verify.txt"), "w", encoding="utf-8") as f:
    f.write("chars=%d\n" % len(fixed))
    f.write("arabic_present=%s\n" % has_arabic)
    f.write("title=%s\n" % sample)

print("DONE")
