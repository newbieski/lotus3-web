#!/usr/bin/env python3
"""
Generate retro 16-bit arcade sprites for Lotus 3 (Lotus III: The Ultimate Challenge) Web Engine:
- Lotus Elan SE (Player car: straight, steer left, steer right, braking, uphill, downhill)
- Rival Cars (Red, Yellow, Blue, White)
- Roadside objects: Forest Tree 1, Forest Tree 2, Rock, Wood Log, Warning Signs, Checkpoint Banner
- Parallax background layers: Sky, Distant Hills, Forest Horizon
"""

import os
from PIL import Image, ImageDraw

SPRITES_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "assets", "sprites"))
os.makedirs(SPRITES_DIR, exist_ok=True)

def create_car_sprite(color_body="#006b3c", color_highlight="#109e58", color_shadow="#004325", 
                      steer=0, uphill=0, braking=False):
    """
    Generate pixel-art Lotus Elan SE rear view:
    width: 160, height: 80
    steer: -2 (hard left), -1 (slight left), 0 (straight), 1 (slight right), 2 (hard right)
    uphill: -1 (downhill), 0 (flat), 1 (uphill)
    """
    w, h = 160, 80
    im = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)

    cx = w // 2
    base_y = 56 + (uphill * -3)
    
    # Shadow
    shadow_w = 120
    shadow_h = 16
    d.ellipse([cx - shadow_w//2, base_y + 4, cx + shadow_w//2, base_y + 4 + shadow_h], fill=(0, 0, 0, 110))

    # Wheels / Tires
    tire_col = "#151515"
    rim_col = "#888888"
    rim_hi = "#dcdcdc"
    
    # Left tire
    lt_x1, lt_x2 = cx - 56 + steer*2, cx - 38 + steer*2
    d.rounded_rectangle([lt_x1, base_y - 4, lt_x2, base_y + 14], radius=3, fill=tire_col)
    d.rectangle([lt_x1 + 3, base_y, lt_x2 - 3, base_y + 10], fill=rim_col)
    d.line([lt_x1 + 5, base_y + 5, lt_x2 - 5, base_y + 5], fill=rim_hi, width=2)

    # Right tire
    rt_x1, rt_x2 = cx + 38 + steer*2, cx + 56 + steer*2
    d.rounded_rectangle([rt_x1, base_y - 4, rt_x2, base_y + 14], radius=3, fill=tire_col)
    d.rectangle([rt_x1 + 3, base_y, rt_x2 - 3, base_y + 10], fill=rim_col)
    d.line([rt_x1 + 5, base_y + 5, rt_x2 - 5, base_y + 5], fill=rim_hi, width=2)

    # Chassis / Underside
    d.rectangle([cx - 42, base_y + 4, cx + 42, base_y + 12], fill="#111111")
    # Dual exhausts
    d.ellipse([cx - 22, base_y + 7, cx - 14, base_y + 13], fill="#555555", outline="#222222")
    d.ellipse([cx - 20, base_y + 8, cx - 16, base_y + 12], fill="#000000")
    d.ellipse([cx - 12, base_y + 7, cx - 4, base_y + 13], fill="#555555", outline="#222222")
    d.ellipse([cx - 10, base_y + 8, cx - 6, base_y + 12], fill="#000000")

    # Main Car Body (Lotus Elan sleek aerodynamic wedge)
    # Bumper and Lower rear
    tilt = steer * 7
    by1 = base_y - 14
    by2 = base_y + 6
    
    # Body points
    body_pts = [
        (cx - 52 + tilt, by2),
        (cx - 55 + tilt*0.8, by1),
        (cx - 48 + tilt*0.5, by1 - 8),
        (cx - 36 + tilt*0.3, by1 - 16 - uphill*4), # rear deck
        (cx + 36 + tilt*0.3, by1 - 16 - uphill*4),
        (cx + 48 + tilt*0.5, by1 - 8),
        (cx + 55 + tilt*0.8, by1),
        (cx + 52 + tilt, by2)
    ]
    d.polygon(body_pts, fill=color_body)

    # Highlight & shading
    d.line([(cx - 48 + tilt*0.5, by1 - 8), (cx + 48 + tilt*0.5, by1 - 8)], fill=color_highlight, width=2)
    d.line([(cx - 52 + tilt, by2 - 2), (cx + 52 + tilt, by2 - 2)], fill=color_shadow, width=2)

    # Rear Bumper & License Plate
    d.rectangle([cx - 18 + tilt*0.8, by1 + 4, cx + 18 + tilt*0.8, by1 + 14], fill="#111111")
    d.rectangle([cx - 15 + tilt*0.8, by1 + 6, cx + 15 + tilt*0.8, by1 + 12], fill="#f5c010") # Yellow UK plate
    d.text((cx - 13 + tilt*0.8, by1 + 5), "LOTUS", fill="#000000")

    # Rear Taillight Cluster (signature Lotus strip)
    tl_color = "#ff1a1a" if not braking else "#ff6666"
    tl_glow = "#ff9999" if braking else "#990000"
    
    # Left tail light
    d.rectangle([cx - 48 + tilt*0.7, by1 - 3, cx - 22 + tilt*0.7, by1 + 4], fill="#440000", outline="#220000")
    d.rectangle([cx - 46 + tilt*0.7, by1 - 2, cx - 24 + tilt*0.7, by1 + 3], fill=tl_color)
    d.line([(cx - 46 + tilt*0.7, by1), (cx - 24 + tilt*0.7, by1)], fill=tl_glow, width=1)
    # Amber indicator
    d.rectangle([cx - 48 + tilt*0.7, by1 - 2, cx - 43 + tilt*0.7, by1 + 3], fill="#ff9900")

    # Right tail light
    d.rectangle([cx + 22 + tilt*0.7, by1 - 3, cx + 48 + tilt*0.7, by1 + 4], fill="#440000", outline="#220000")
    d.rectangle([cx + 24 + tilt*0.7, by1 - 2, cx + 46 + tilt*0.7, by1 + 3], fill=tl_color)
    d.line([(cx + 24 + tilt*0.7, by1), (cx + 46 + tilt*0.7, by1)], fill=tl_glow, width=1)
    # Amber indicator
    d.rectangle([cx + 43 + tilt*0.7, by1 - 2, cx + 48 + tilt*0.7, by1 + 3], fill="#ff9900")

    if braking:
        # High-mounted center brake light
        d.rectangle([cx - 10 + tilt*0.5, by1 - 10 - uphill*2, cx + 10 + tilt*0.5, by1 - 6 - uphill*2], fill="#ff2222", outline="#ffffff")

    # Cabin / Windshield / Soft-top (Lotus Elan Roadster or hardtop)
    top_y = by1 - 28 - uphill*6
    cabin_pts = [
        (cx - 32 + tilt*0.4, by1 - 14 - uphill*4),
        (cx - 24 + tilt*0.2, top_y),
        (cx + 24 + tilt*0.2, top_y),
        (cx + 32 + tilt*0.4, by1 - 14 - uphill*4)
    ]
    d.polygon(cabin_pts, fill="#1c1f24") # Dark tinted glass/roof
    d.line([(cx - 23 + tilt*0.2, top_y + 1), (cx + 23 + tilt*0.2, top_y + 1)], fill="#3a404a", width=2)

    # Driver and Passenger Helmets inside
    # Driver (Right side for UK RHD Lotus!)
    d.ellipse([cx + 6 + tilt*0.3, top_y + 5, cx + 18 + tilt*0.3, top_y + 17], fill="#eeeeee", outline="#222222")
    d.rectangle([cx + 8 + tilt*0.3, top_y + 9, cx + 16 + tilt*0.3, top_y + 13], fill="#111111") # Visor
    # Passenger (Left side)
    d.ellipse([cx - 18 + tilt*0.3, top_y + 5, cx - 6 + tilt*0.3, top_y + 17], fill="#ffff00", outline="#222222")
    d.rectangle([cx - 16 + tilt*0.3, top_y + 9, cx - 8 + tilt*0.3, top_y + 13], fill="#111111") # Visor

    # Side Mirrors
    d.rectangle([cx - 40 + tilt*0.3, top_y + 10, cx - 34 + tilt*0.3, top_y + 16], fill=color_body, outline="#111111")
    d.rectangle([cx + 34 + tilt*0.3, top_y + 10, cx + 40 + tilt*0.3, top_y + 16], fill=color_body, outline="#111111")

    # Rear Spoiler Wing
    wing_y = by1 - 15 - uphill*4
    d.rectangle([cx - 46 + tilt*0.4, wing_y - 3, cx + 46 + tilt*0.4, wing_y], fill=color_highlight)
    d.rectangle([cx - 46 + tilt*0.4, wing_y, cx + 46 + tilt*0.4, wing_y + 2], fill=color_shadow)

    return im

def generate_car_variations():
    # Player Car: British Racing Green Lotus Elan SE
    green_body = "#007a3d"
    green_hi = "#18b560"
    green_sh = "#004723"

    steer_names = { -2: "hard_left", -1: "left", 0: "straight", 1: "right", 2: "hard_right" }
    
    for steer_val, sname in steer_names.items():
        # Normal
        car = create_car_sprite(green_body, green_hi, green_sh, steer=steer_val, uphill=0, braking=False)
        car.save(os.path.join(SPRITES_DIR, f"player_elan_{sname}.png"))

        # Braking
        car_brk = create_car_sprite(green_body, green_hi, green_sh, steer=steer_val, uphill=0, braking=True)
        car_brk.save(os.path.join(SPRITES_DIR, f"player_elan_{sname}_brake.png"))

        # Uphill
        car_up = create_car_sprite(green_body, green_hi, green_sh, steer=steer_val, uphill=1, braking=False)
        car_up.save(os.path.join(SPRITES_DIR, f"player_elan_{sname}_up.png"))

    # Rival Cars
    rivals = [
        ("red", "#c81e1e", "#ff4a4a", "#780808"),
        ("yellow", "#e0b000", "#ffdf33", "#8a6a00"),
        ("blue", "#1050c8", "#4080ff", "#082878"),
        ("white", "#dcdcdc", "#ffffff", "#888888")
    ]
    for rname, bcol, hcol, scol in rivals:
        for steer_val, sname in [(-1, "left"), (0, "straight"), (1, "right")]:
            rcar = create_car_sprite(bcol, hcol, scol, steer=steer_val, uphill=0, braking=False)
            rcar.save(os.path.join(SPRITES_DIR, f"rival_{rname}_{sname}.png"))

    print("Car sprites generated!")

def generate_environment_sprites():
    # 1. Tall Pine Tree (Lotus 3 signature Forest Tree)
    w, h = 180, 320
    im = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    cx = w // 2

    # Trunk
    d.rectangle([cx - 10, h - 70, cx + 10, h - 6], fill="#4a2e12", outline="#2b1a09")
    # Tree tiers
    foliage_colors = [("#1b4d24", "#2d753b", "#0d2b14"), 
                      ("#17441f", "#246131", "#0b2410"), 
                      ("#123819", "#1d5229", "#081d0c")]
    tiers = [
        (h - 60, 80, 50),
        (h - 100, 72, 48),
        (h - 140, 64, 46),
        (h - 180, 56, 44),
        (h - 220, 46, 40),
        (h - 260, 34, 38),
        (h - 290, 20, 30)
    ]
    for y_base, width_half, tier_h in tiers:
        col_dark, col_mid, col_shadow = foliage_colors[y_base % 3]
        pts = [
            (cx - width_half, y_base),
            (cx - width_half * 0.7, y_base - tier_h * 0.5),
            (cx, y_base - tier_h),
            (cx + width_half * 0.7, y_base - tier_h * 0.5),
            (cx + width_half, y_base),
            (cx + width_half * 0.5, y_base - tier_h * 0.2),
            (cx, y_base - tier_h * 0.1),
            (cx - width_half * 0.5, y_base - tier_h * 0.2)
        ]
        d.polygon(pts, fill=col_mid, outline=col_shadow)
        # Foliage needles texture highlights
        d.line([(cx, y_base - tier_h), (cx - width_half * 0.5, y_base - tier_h * 0.3)], fill="#3ca652", width=3)
    im.save(os.path.join(SPRITES_DIR, "tree_pine.png"))

    # 2. Deciduous Bushy Tree
    im2 = Image.new("RGBA", (220, 260), (0, 0, 0, 0))
    d2 = ImageDraw.Draw(im2)
    cx = 110
    # Trunk with branches
    d2.polygon([(cx - 16, 250), (cx + 16, 250), (cx + 8, 160), (cx + 40, 120), (cx + 30, 115), (cx + 4, 150),
                (cx - 4, 150), (cx - 30, 115), (cx - 40, 120), (cx - 8, 160)], fill="#4e3218", outline="#2d1b0b")
    # Foliage clumps
    clumps = [
        (cx - 50, 110, 48, "#2d753b"),
        (cx + 50, 110, 48, "#286834"),
        (cx, 70, 56, "#368a46"),
        (cx - 35, 60, 45, "#42a656"),
        (cx + 35, 60, 45, "#308040"),
        (cx, 40, 38, "#4eb865")
    ]
    for x, y, r, col in clumps:
        d2.ellipse([x - r, y - r, x + r, y + r], fill=col, outline="#16401e", width=2)
        # highlight spot
        d2.ellipse([x - r*0.5, y - r*0.7, x + r*0.2, y - r*0.1], fill="#63d17b")
    im2.save(os.path.join(SPRITES_DIR, "tree_deciduous.png"))

    # 3. Wood Log (Lotus 3 signature road obstacle)
    im3 = Image.new("RGBA", (160, 60), (0, 0, 0, 0))
    d3 = ImageDraw.Draw(im3)
    # Log cylinder
    d3.ellipse([10, 10, 36, 50], fill="#caa06d", outline="#4a2e12", width=3) # left face
    d3.ellipse([16, 16, 30, 44], fill="#e0bc89", outline="#825626", width=2) # rings
    d3.polygon([(23, 10), (140, 10), (140, 50), (23, 50)], fill="#5c3a17", outline="#301e0a")
    d3.ellipse([125, 10, 150, 50], fill="#5c3a17", outline="#301e0a", width=2) # right curve
    # Bark grooves & moss
    d3.line([(30, 20), (135, 20)], fill="#7a5024", width=3)
    d3.line([(30, 38), (135, 38)], fill="#3d260e", width=3)
    d3.rectangle([60, 10, 85, 14], fill="#3d7529") # green moss
    im3.save(os.path.join(SPRITES_DIR, "obstacle_log.png"))

    # 4. Rock / Boulder
    im4 = Image.new("RGBA", (140, 90), (0, 0, 0, 0))
    d4 = ImageDraw.Draw(im4)
    rock_pts = [(15, 75), (30, 35), (65, 12), (105, 20), (128, 50), (120, 78), (25, 82)]
    d4.polygon(rock_pts, fill="#7b7e85", outline="#3b3d42", width=3)
    # Facets
    d4.polygon([(30, 35), (65, 12), (75, 45), (40, 60)], fill="#9ea2ab")
    d4.polygon([(65, 12), (105, 20), (115, 55), (75, 45)], fill="#666970")
    im4.save(os.path.join(SPRITES_DIR, "obstacle_rock.png"))

    # 5. Warning Chevron Signs (Left & Right)
    for direction in ["left", "right"]:
        im_sign = Image.new("RGBA", (100, 140), (0, 0, 0, 0))
        ds = ImageDraw.Draw(im_sign)
        # Post
        ds.rectangle([46, 60, 54, 138], fill="#999999", outline="#444444")
        # Sign board
        ds.rectangle([10, 10, 90, 65], fill="#ffffff", outline="#111111", width=3)
        ds.rectangle([12, 12, 88, 63], fill="#000000")
        # Chevrons (Yellow on Black)
        if direction == "left":
            for x in [30, 60]:
                ds.polygon([(x, 18), (x - 14, 37), (x, 56), (x + 8, 56), (x - 6, 37), (x + 8, 18)], fill="#ffea00")
        else:
            for x in [40, 70]:
                ds.polygon([(x - 8, 18), (x + 6, 37), (x - 8, 56), (x, 56), (x + 14, 37), (x, 18)], fill="#ffea00")
        im_sign.save(os.path.join(SPRITES_DIR, f"sign_chevron_{direction}.png"))

    # 6. Overhead Gantry (Start / Checkpoint banner)
    im_gantry = Image.new("RGBA", (480, 180), (0, 0, 0, 0))
    dg = ImageDraw.Draw(im_gantry)
    # Left pillar
    dg.rectangle([20, 20, 45, 175], fill="#444444", outline="#111111", width=2)
    # Right pillar
    dg.rectangle([435, 20, 460, 175], fill="#444444", outline="#111111", width=2)
    # Crossbeam
    dg.rectangle([20, 20, 460, 85], fill="#1b2438", outline="#0a0e17", width=3)
    # Striped hazard bottom
    for i in range(20, 455, 20):
        col = "#ffcc00" if (i // 20) % 2 == 0 else "#111111"
        dg.rectangle([i, 80, i + 20, 88], fill=col)
    # Banner Text Area
    dg.rectangle([55, 28, 425, 75], fill="#ffffff")
    dg.rectangle([58, 31, 422, 72], fill="#0a5c2d") # Lotus British Green banner
    dg.text((55, 38), "LOTUS III: ULTIMATE CHALLENGE", fill="#ffea00", stroke_width=2, stroke_fill="#000000")
    im_gantry.save(os.path.join(SPRITES_DIR, "gantry_start.png"))

    # Checkpoint Banner
    im_cp = Image.new("RGBA", (480, 180), (0, 0, 0, 0))
    dc = ImageDraw.Draw(im_cp)
    dc.rectangle([20, 20, 45, 175], fill="#555555", outline="#111111", width=2)
    dc.rectangle([435, 20, 460, 175], fill="#555555", outline="#111111", width=2)
    dc.rectangle([20, 20, 460, 85], fill="#301010", outline="#111111", width=3)
    for i in range(20, 455, 20):
        col = "#ffffff" if (i // 20) % 2 == 0 else "#cc1111"
        dc.rectangle([i, 80, i + 20, 88], fill=col)
    dc.rectangle([60, 30, 420, 75], fill="#ffff00")
    dc.text((120, 36), "CHECKPOINT", fill="#cc0000", stroke_width=3, stroke_fill="#ffffff")
    im_cp.save(os.path.join(SPRITES_DIR, "gantry_checkpoint.png"))

    print("Environment and roadside sprites generated!")

if __name__ == "__main__":
    generate_car_variations()
    generate_environment_sprites()
