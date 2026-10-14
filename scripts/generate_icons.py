"""
توليد أيقونات الموقع من الملف الأصلي app/icon.png
يُنشئ:
  - app/icon.png       (192×192 PNG) — favicon للمتصفح عبر Next.js
  - app/apple-icon.png (180×180 PNG) — أيقونة Apple touch
  - app/favicon.ico    (16/32/48 px multi-size ICO) — توافق قديم
"""

from pathlib import Path
from PIL import Image

ROOT = Path(__file__).parent.parent
SRC  = ROOT / "app" / "icon.png"
assert SRC.exists(), f"المصدر غير موجود: {SRC}"

img = Image.open(SRC).convert("RGBA")

# ── icon.png ──────────────────────────────────────────────────
icon = img.resize((192, 192), Image.LANCZOS)
icon.save(ROOT / "app" / "icon.png", format="PNG", optimize=True)
print("✅  app/icon.png  →  192×192")

# ── apple-icon.png ────────────────────────────────────────────
apple = img.resize((180, 180), Image.LANCZOS)
apple.save(ROOT / "app" / "apple-icon.png", format="PNG", optimize=True)
print("✅  app/apple-icon.png  →  180×180")

# ── favicon.ico (16 + 32 + 48) ───────────────────────────────
sizes = [(16, 16), (32, 32), (48, 48)]
frames = [img.resize(s, Image.LANCZOS).convert("RGBA") for s in sizes]
frames[0].save(
    ROOT / "app" / "favicon.ico",
    format="ICO",
    sizes=sizes,
    append_images=frames[1:],
)
print("✅  app/favicon.ico  →  16/32/48 px")
print("\nانتهى — أُعيدت كتابة الأيقونات بنجاح.")
