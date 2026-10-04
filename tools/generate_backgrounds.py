#!/usr/bin/env python3
"""
Generate authentic seamless parallax background layers for all Lotus 3 themes:
1. Forest (자연풍경 / 숲)
2. Roadworks (공사장)
3. Snow Blizzard (설원)
4. Desert Canyon (사막 협곡)
5. Night Highway (야간 고속도로)
6. Storm & Thunder (폭풍우)
"""

import os
import math
import random
from PIL import Image, ImageDraw

SPRITES_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "assets", "sprites"))
os.makedirs(SPRITES_DIR, exist_ok=True)
W = 1280

# -------------------------------------------------------------
# 1. FOREST (자연풍경 / 숲) - No Cranes! Crisp Blue Sky & Alpine Mountains
# -------------------------------------------------------------
def generate_forest_backgrounds():
    # A. Sky with fluffy summer clouds
    h_sky = 360
    im_sky = Image.new("RGBA", (W, h_sky))
    d_sky = ImageDraw.Draw(im_sky)
    for y in range(h_sky):
        ratio = y / h_sky
        r = int(24 + (125 - 24) * ratio)
        g = int(65 + (190 - 65) * ratio)
        b = int(145 + (240 - 145) * ratio)
        d_sky.line([(0, y), (W, y)], fill=(r, g, b, 255))

    cloud_offsets = [90, 310, 540, 780, 1020, 1200]
    for cx in cloud_offsets:
        cy = 80 + int(25 * math.sin(cx * 0.05))
        d_sky.ellipse([cx - 70, cy + 5, cx + 70, cy + 45], fill=(160, 205, 235, 180))
        d_sky.ellipse([cx - 60, cy, cx + 60, cy + 38], fill=(240, 248, 255, 230))
        d_sky.ellipse([cx - 35, cy - 22, cx + 25, cy + 28], fill=(255, 255, 255, 240))
        d_sky.ellipse([cx + 5, cy - 15, cx + 55, cy + 28], fill=(255, 255, 255, 240))
    im_sky.save(os.path.join(SPRITES_DIR, "bg_forest_sky.png"))
    im_sky.save(os.path.join(SPRITES_DIR, "bg_sky.png")) # compatibility alias

    # B. Distant Alpine Mountains
    h_mtn = 240
    im_mtn = Image.new("RGBA", (W, h_mtn), (0, 0, 0, 0))
    d_mtn = ImageDraw.Draw(im_mtn)

    pts_far, pts_mid = [], []
    for x in range(0, W + 1, 4):
        rad = 2 * math.pi * (x / W)
        y_far = 80 + 35 * math.sin(rad * 2) + 20 * math.sin(rad * 5 + 1.2) + 15 * math.cos(rad * 3)
        pts_far.append((x, int(y_far)))
        y_mid = 130 + 30 * math.sin(rad * 3 + 2.0) + 18 * math.sin(rad * 7) + 12 * math.cos(rad * 4)
        pts_mid.append((x, int(y_mid)))

    poly_far = [(0, h_mtn)] + pts_far + [(W, h_mtn)]
    d_mtn.polygon(poly_far, fill=(45, 80, 120, 255))
    for x, y in pts_far:
        if y < 65:
            d_mtn.polygon([(x - 12, y + 16), (x, y), (x + 12, y + 16)], fill=(210, 235, 255, 255))
    poly_mid = [(0, h_mtn)] + pts_mid + [(W, h_mtn)]
    d_mtn.polygon(poly_mid, fill=(28, 62, 88, 255))
    im_mtn.save(os.path.join(SPRITES_DIR, "bg_forest_mountains.png"))
    im_mtn.save(os.path.join(SPRITES_DIR, "bg_mountains.png")) # compatibility alias

    # C. Near Horizon Forest Hills
    h_fst = 200
    im_fst = Image.new("RGBA", (W, h_fst), (0, 0, 0, 0))
    d_fst = ImageDraw.Draw(im_fst)
    pts_fst = []
    for x in range(0, W + 1, 6):
        rad = 2 * math.pi * (x / W)
        tree_jagged = 8 * ((x // 6) % 3)
        y_fst = 70 + 25 * math.sin(rad * 4) + 14 * math.sin(rad * 8 + 0.5) - tree_jagged
        pts_fst.append((x, int(y_fst)))

    poly_fst = [(0, h_fst)] + pts_fst + [(W, h_fst)]
    d_fst.polygon(poly_fst, fill=(18, 55, 26, 255))
    for x, y in pts_fst:
        if (x // 6) % 2 == 0:
            d_fst.polygon([(x - 8, y + 16), (x, y), (x + 8, y + 16)], fill=(28, 80, 38, 255))
    im_fst.save(os.path.join(SPRITES_DIR, "bg_forest_hills.png"))
    print("Forest backgrounds generated!")

# -------------------------------------------------------------
# 2. ROADWORKS (공사장) - Dusk Amber Industrial Sky & Tower Cranes
# -------------------------------------------------------------
def generate_roadworks_backgrounds():
    h_sky = 360
    im_sky = Image.new("RGBA", (W, h_sky))
    d_sky = ImageDraw.Draw(im_sky)
    for y in range(h_sky):
        ratio = y / h_sky
        r = int(55 + (195 - 55) * ratio)
        g = int(42 + (135 - 42) * ratio)
        b = int(38 + (82 - 38) * ratio)
        d_sky.line([(0, y), (W, y)], fill=(r, g, b, 255))
    im_sky.save(os.path.join(SPRITES_DIR, "bg_roadworks_sky.png"))

    h_ind = 240
    im_ind = Image.new("RGBA", (W, h_ind), (0, 0, 0, 0))
    d_ind = ImageDraw.Draw(im_ind)
    # Industrial silhouettes
    for i in range(0, W, 60):
        bldg_h = 60 + int(45 * math.sin(i * 0.05)) + (i % 30)
        d_ind.rectangle([i, h_ind - bldg_h, i + 55, h_ind], fill=(45, 38, 36, 255))
        for wy in range(h_ind - bldg_h + 10, h_ind - 10, 16):
            d_ind.rectangle([i + 8, wy, i + 18, wy + 8], fill=(255, 200, 100, 180))
            d_ind.rectangle([i + 28, wy, i + 38, wy + 8], fill=(255, 200, 100, 180))
    # Giant Tower Cranes
    for crane_x in [180, 520, 880, 1160]:
        crane_top = 25
        crane_base = h_ind - 20
        d_ind.rectangle([crane_x - 4, crane_top, crane_x + 4, crane_base], fill=(220, 160, 20, 255))
        for ty in range(crane_top, crane_base, 14):
            d_ind.line([(crane_x - 4, ty), (crane_x + 4, ty + 14)], fill=(120, 80, 10, 255))
        d_ind.rectangle([crane_x - 8, crane_top + 6, crane_x + 8, crane_top + 22], fill=(20, 20, 20, 255))
        d_ind.line([(crane_x - 40, crane_top + 6), (crane_x + 110, crane_top + 6)], fill=(220, 160, 20, 255), width=3)
        d_ind.rectangle([crane_x - 40, crane_top + 3, crane_x - 25, crane_top + 15], fill=(50, 50, 50, 255))
        d_ind.line([(crane_x, crane_top - 10), (crane_x - 35, crane_top + 6)], fill=(180, 180, 180, 255))
        d_ind.line([(crane_x, crane_top - 10), (crane_x + 70, crane_top + 6)], fill=(180, 180, 180, 255))
        d_ind.line([(crane_x + 65, crane_top + 6), (crane_x + 65, crane_top + 50)], fill=(200, 200, 200, 255))
        d_ind.rectangle([crane_x + 61, crane_top + 50, crane_x + 69, crane_top + 58], fill=(255, 50, 20, 255))
    im_ind.save(os.path.join(SPRITES_DIR, "bg_roadworks_skyline.png"))
    print("Roadworks backgrounds generated!")

# -------------------------------------------------------------
# 3. SNOW (설원) - Cold Arctic Sky & Jagged Glacier Mountains
# -------------------------------------------------------------
def generate_snow_backgrounds():
    h_sky = 360
    im_sky = Image.new("RGBA", (W, h_sky))
    d_sky = ImageDraw.Draw(im_sky)
    for y in range(h_sky):
        ratio = y / h_sky
        r = int(70 + (185 - 70) * ratio)
        g = int(100 + (215 - 100) * ratio)
        b = int(140 + (240 - 140) * ratio)
        d_sky.line([(0, y), (W, y)], fill=(r, g, b, 255))
    im_sky.save(os.path.join(SPRITES_DIR, "bg_snow_sky.png"))

    h_mtn = 240
    im_mtn = Image.new("RGBA", (W, h_mtn), (0, 0, 0, 0))
    d_mtn = ImageDraw.Draw(im_mtn)
    pts = []
    for x in range(0, W + 1, 5):
        rad = 2 * math.pi * (x / W)
        y = 70 + 40 * math.sin(rad * 3) + 25 * math.cos(rad * 6 + 1.0)
        pts.append((x, int(y)))
    d_mtn.polygon([(0, h_mtn)] + pts + [(W, h_mtn)], fill=(65, 95, 130, 255))
    # Extensive glaciers and snow caps
    for x, y in pts:
        d_mtn.polygon([(x - 14, y + 25), (x, y), (x + 14, y + 25)], fill=(235, 245, 255, 255))
        d_mtn.line([(x, y), (x - 6, y + 35)], fill=(180, 215, 245, 255), width=2)
    im_mtn.save(os.path.join(SPRITES_DIR, "bg_snow_mountains.png"))
    print("Snow backgrounds generated!")

# -------------------------------------------------------------
# 4. DESERT (사막 협곡) - Scorching Sunset & Red Sandstone Mesas
# -------------------------------------------------------------
def generate_desert_backgrounds():
    h_sky = 360
    im_sky = Image.new("RGBA", (W, h_sky))
    d_sky = ImageDraw.Draw(im_sky)
    # Sunset gradient: purple -> burnt orange -> gold
    for y in range(h_sky):
        ratio = y / h_sky
        r = int(180 + (255 - 180) * ratio)
        g = int(45 + (160 - 45) * ratio)
        b = int(40 + (40 - 40) * ratio)
        d_sky.line([(0, y), (W, y)], fill=(min(255, r), min(255, g), b, 255))
    # Giant desert sunset sun
    d_sky.ellipse([W//2 - 90, 80, W//2 + 90, 260], fill=(255, 240, 160, 240))
    im_sky.save(os.path.join(SPRITES_DIR, "bg_desert_sky.png"))

    h_mtn = 240
    im_mtn = Image.new("RGBA", (W, h_mtn), (0, 0, 0, 0))
    d_mtn = ImageDraw.Draw(im_mtn)
    # Flat-topped canyon mesas and buttes
    mesas = [(80, 240, 110), (320, 200, 85), (580, 260, 120), (880, 220, 95), (1140, 250, 105)]
    # Far canyon silhouette
    d_mtn.rectangle([0, 140, W, h_mtn], fill=(130, 50, 30, 255))
    for cx, w_m, h_m in mesas:
        y_top = h_mtn - h_m
        pts = [(cx - w_m//2, h_mtn), (cx - w_m//2 + 25, y_top), (cx + w_m//2 - 25, y_top), (cx + w_m//2, h_mtn)]
        d_mtn.polygon(pts, fill=(165, 65, 35, 255))
        d_mtn.line([(cx - w_m//2 + 25, y_top), (cx + w_m//2 - 25, y_top)], fill=(220, 110, 60, 255), width=3)
        # Vertical strata erosion lines
        for sx in range(cx - w_m//2 + 35, cx + w_m//2 - 35, 20):
            d_mtn.line([(sx, y_top + 10), (sx, h_mtn - 15)], fill=(110, 40, 25, 255), width=2)
    im_mtn.save(os.path.join(SPRITES_DIR, "bg_desert_mountains.png"))
    print("Desert backgrounds generated!")

# -------------------------------------------------------------
# 5. NIGHT (야간 고속도로) - Deep Midnight & Glowing City Skyline
# -------------------------------------------------------------
def generate_night_backgrounds():
    h_sky = 360
    im_sky = Image.new("RGBA", (W, h_sky))
    d_sky = ImageDraw.Draw(im_sky)
    for y in range(h_sky):
        ratio = y / h_sky
        r = int(5 + (20 - 5) * ratio)
        g = int(8 + (28 - 8) * ratio)
        b = int(22 + (55 - 22) * ratio)
        d_sky.line([(0, y), (W, y)], fill=(r, g, b, 255))
    # Crescent moon
    d_sky.ellipse([W - 200, 45, W - 140, 105], fill=(255, 250, 220, 255))
    d_sky.ellipse([W - 215, 42, W - 155, 105], fill=(10, 15, 35, 255))
    # Stars
    random.seed(42)
    for _ in range(120):
        sx = random.randint(0, W)
        sy = random.randint(10, h_sky - 80)
        d_sky.point((sx, sy), fill=(255, 255, 255, random.randint(160, 255)))
    im_sky.save(os.path.join(SPRITES_DIR, "bg_night_sky.png"))

    h_cty = 240
    im_cty = Image.new("RGBA", (W, h_cty), (0, 0, 0, 0))
    d_cty = ImageDraw.Draw(im_cty)
    # Modern skyscrapers with glowing golden & cyan windows
    random.seed(99)
    for x in range(0, W, 45):
        bh = random.randint(70, 160)
        d_cty.rectangle([x, h_cty - bh, x + 40, h_cty], fill=(12, 16, 26, 255), outline=(25, 35, 55, 255))
        # Spire antennas with flashing red aviation lights
        if bh > 130:
            d_cty.line([(x + 20, h_cty - bh), (x + 20, h_cty - bh - 24)], fill=(120, 130, 150, 255), width=2)
            d_cty.ellipse([x + 18, h_cty - bh - 26, x + 22, h_cty - bh - 22], fill=(255, 50, 50, 255))
        # Lit windows
        for wy in range(h_cty - bh + 10, h_cty - 10, 14):
            for wx in range(x + 6, x + 35, 10):
                if random.random() < 0.65:
                    col = (255, 220, 100, 220) if random.random() < 0.7 else (100, 220, 255, 220)
                    d_cty.rectangle([wx, wy, wx + 6, wy + 6], fill=col)
    im_cty.save(os.path.join(SPRITES_DIR, "bg_night_skyline.png"))
    print("Night backgrounds generated!")

# -------------------------------------------------------------
# 6. STORM (폭풍우와 번개) - Turbulent Dark Sky & Jagged Ridges
# -------------------------------------------------------------
def generate_storm_backgrounds():
    h_sky = 360
    im_sky = Image.new("RGBA", (W, h_sky))
    d_sky = ImageDraw.Draw(im_sky)
    for y in range(h_sky):
        ratio = y / h_sky
        r = int(22 + (55 - 22) * ratio)
        g = int(20 + (45 - 20) * ratio)
        b = int(35 + (70 - 35) * ratio)
        d_sky.line([(0, y), (W, y)], fill=(r, g, b, 255))
    # Swirling dark storm clouds
    for cx in [150, 450, 750, 1050]:
        cy = 90
        d_sky.ellipse([cx - 140, cy - 30, cx + 140, cy + 50], fill=(15, 14, 25, 220))
        d_sky.ellipse([cx - 100, cy - 50, cx + 80, cy + 30], fill=(28, 25, 42, 200))
    im_sky.save(os.path.join(SPRITES_DIR, "bg_storm_sky.png"))

    h_mtn = 240
    im_mtn = Image.new("RGBA", (W, h_mtn), (0, 0, 0, 0))
    d_mtn = ImageDraw.Draw(im_mtn)
    pts = []
    for x in range(0, W + 1, 6):
        rad = 2 * math.pi * (x / W)
        y = 90 + 35 * math.sin(rad * 3 + 1.0) + 18 * math.cos(rad * 5)
        pts.append((x, int(y)))
    d_mtn.polygon([(0, h_mtn)] + pts + [(W, h_mtn)], fill=(24, 20, 32, 255))
    im_mtn.save(os.path.join(SPRITES_DIR, "bg_storm_skyline.png"))
    print("Storm backgrounds generated!")

if __name__ == "__main__":
    generate_forest_backgrounds()
    generate_roadworks_backgrounds()
    generate_snow_backgrounds()
    generate_desert_backgrounds()
    generate_night_backgrounds()
    generate_storm_backgrounds()
