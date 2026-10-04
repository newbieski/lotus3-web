#!/usr/bin/env python3
"""
Generate seamless parallax background layers for Course 1 (Forest):
1. bg_sky.png (1280x360): Sky gradient with retro fluffy clouds
2. bg_mountains.png (1280x240): Distant mountains with hazy blue/purple ridge
3. bg_forest_hills.png (1280x200): Pine and green tree canopy silhouettes
"""

import os
import math
from PIL import Image, ImageDraw

SPRITES_DIR = os.path.expanduser("/Users/taehun/lotus2-web/assets/sprites")

def generate_backgrounds():
    w = 1280

    # 1. Sky & Clouds
    h_sky = 360
    im_sky = Image.new("RGBA", (w, h_sky))
    d_sky = ImageDraw.Draw(im_sky)

    # Gradient from deep blue to dusk/horizon cyan
    for y in range(h_sky):
        ratio = y / h_sky
        r = int(24 + (120 - 24) * ratio)
        g = int(60 + (185 - 60) * ratio)
        b = int(140 + (235 - 140) * ratio)
        d_sky.line([(0, y), (w, y)], fill=(r, g, b, 255))

    # Fluffy retro pixel clouds
    cloud_offsets = [100, 320, 560, 800, 1050]
    for cx in cloud_offsets:
        cy = 80 + int(30 * math.sin(cx))
        # Shadow
        d_sky.ellipse([cx - 70, cy + 5, cx + 70, cy + 45], fill=(160, 200, 235, 180))
        # Main cloud body
        d_sky.ellipse([cx - 60, cy, cx + 60, cy + 38], fill=(240, 248, 255, 230))
        d_sky.ellipse([cx - 35, cy - 22, cx + 25, cy + 28], fill=(255, 255, 255, 240))
        d_sky.ellipse([cx + 5, cy - 15, cx + 55, cy + 28], fill=(255, 255, 255, 240))

    im_sky.save(os.path.join(SPRITES_DIR, "bg_sky.png"))

    # 2. Distant Mountains (seamless wrap)
    h_mtn = 240
    im_mtn = Image.new("RGBA", (w, h_mtn), (0, 0, 0, 0))
    d_mtn = ImageDraw.Draw(im_mtn)

    # Base ridge points using sine harmonics for seamless wrap (w = 1280)
    pts_far = []
    pts_mid = []
    for x in range(0, w + 1, 4):
        rad = 2 * math.pi * (x / w)
        # Far peak
        y_far = 80 + 35 * math.sin(rad * 2) + 20 * math.sin(rad * 5 + 1.2) + 15 * math.cos(rad * 3)
        pts_far.append((x, int(y_far)))
        # Mid peak
        y_mid = 130 + 30 * math.sin(rad * 3 + 2.0) + 18 * math.sin(rad * 7) + 12 * math.cos(rad * 4)
        pts_mid.append((x, int(y_mid)))

    # Draw far mountains
    poly_far = [(0, h_mtn)] + pts_far + [(w, h_mtn)]
    d_mtn.polygon(poly_far, fill=(45, 75, 115, 255))
    # Snowcaps on high peaks
    for x, y in pts_far:
        if y < 65:
            d_mtn.polygon([(x - 12, y + 16), (x, y), (x + 12, y + 16)], fill=(210, 230, 250, 255))

    # Draw mid mountains
    poly_mid = [(0, h_mtn)] + pts_mid + [(w, h_mtn)]
    d_mtn.polygon(poly_mid, fill=(30, 60, 85, 255))

    im_mtn.save(os.path.join(SPRITES_DIR, "bg_mountains.png"))

    # 3. Middleground Forest Horizon (seamless wrap)
    h_fst = 200
    im_fst = Image.new("RGBA", (w, h_fst), (0, 0, 0, 0))
    d_fst = ImageDraw.Draw(im_fst)

    pts_fst = []
    for x in range(0, w + 1, 6):
        rad = 2 * math.pi * (x / w)
        tree_jagged = 8 * ((x // 6) % 3)
        y_fst = 70 + 25 * math.sin(rad * 4) + 14 * math.sin(rad * 8 + 0.5) - tree_jagged
        pts_fst.append((x, int(y_fst)))

    poly_fst = [(0, h_fst)] + pts_fst + [(w, h_fst)]
    d_fst.polygon(poly_fst, fill=(18, 55, 26, 255))

    # Tree top details
    for x, y in pts_fst:
        if (x // 6) % 2 == 0:
            d_fst.polygon([(x - 8, y + 16), (x, y), (x + 8, y + 16)], fill=(28, 80, 38, 255))

    im_fst.save(os.path.join(SPRITES_DIR, "bg_forest_hills.png"))
    print("Background parallax layers generated!")

if __name__ == "__main__":
    generate_backgrounds()
