#!/usr/bin/env python3
"""
Generate Lotus 3 specific sprites:
1. Lotus M200 Speedster (Futuristic silver concept car with twin headrest nacelles & aero spoiler)
2. Lotus Esprit Turbo (Signature red wedge supercar)
3. Roadworks (공사장) assets:
   - Traffic cone (주황색 삼각 꼬깔콘)
   - Hazard barrier (노랑/검정 스트라이프 공사 바리케이드)
   - Construction drum / barrel (원형 공사용 드럼통)
   - Warning sign: "ROAD WORKS AHEAD"
   - Warning sign: "DETOUR / ARROW"
4. Roadworks Industrial Background:
   - Industrial sky with construction cranes & girders
5. Snow / Winter assets:
   - Snow-capped pine tree
   - Frozen mountain background
"""

import os
import math
from PIL import Image, ImageDraw

SPRITES_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "assets", "sprites"))
os.makedirs(SPRITES_DIR, exist_ok=True)

# -------------------------------------------------------------
# 1. LOTUS M200 SPEEDSTER (Silver Futuristic Concept Car)
# -------------------------------------------------------------
def create_m200_sprite(steer=0, uphill=0, braking=False):
    w, h = 160, 80
    im = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)

    cx = w // 2
    base_y = 56 + (uphill * -3)
    tilt = steer * 7

    # Shadow
    d.ellipse([cx - 58 + steer*2, base_y + 4, cx + 58 + steer*2, base_y + 18], fill=(0, 0, 0, 120))

    # Wide Low-Profile Racing Tires with dynamic camber
    tire_col = "#111111"
    rim_col = "#999999"
    # Left tire
    lt1, lt2 = cx - 58 + steer*3, cx - 38 + steer*3
    d.rounded_rectangle([lt1, base_y - 6 + steer, lt2, base_y + 14 + steer], radius=3, fill=tire_col)
    d.rectangle([lt1 + 4, base_y - 1 + steer, lt2 - 4, base_y + 10 + steer], fill=rim_col)
    # Right tire
    rt1, rt2 = cx + 38 + steer*3, cx + 58 + steer*3
    d.rounded_rectangle([rt1, base_y - 6 - steer, rt2, base_y + 14 - steer], radius=3, fill=tire_col)
    d.rectangle([rt1 + 4, base_y - 1 - steer, rt2 - 4, base_y + 10 - steer], fill=rim_col)

    # Silver futuristic body
    body_silver = "#b8bcc4"
    hi_silver = "#e4e8f0"
    sh_silver = "#747882"
    dark_gray = "#242830"

    by1 = base_y - 14
    by2 = base_y + 6

    # Rear bumper / diffuser
    d.rectangle([cx - 44, base_y + 2, cx + 44, base_y + 10], fill=dark_gray)
    # Dual center high-mount exhaust
    d.ellipse([cx - 10, base_y + 4, cx - 2, base_y + 10], fill="#555555", outline="#111111")
    d.ellipse([cx + 2, base_y + 4, cx + 10, base_y + 10], fill="#555555", outline="#111111")

    # Aerodynamic wedge body
    body_pts = [
        (cx - 54 + tilt, by2),
        (cx - 56 + tilt*0.8, by1),
        (cx - 48 + tilt*0.5, by1 - 10),
        (cx - 38 + tilt*0.3, by1 - 18 - uphill*4),
        (cx + 38 + tilt*0.3, by1 - 18 - uphill*4),
        (cx + 48 + tilt*0.5, by1 - 10),
        (cx + 56 + tilt*0.8, by1),
        (cx + 54 + tilt, by2)
    ]
    d.polygon(body_pts, fill=body_silver)
    d.line([(cx - 48 + tilt*0.5, by1 - 10), (cx + 48 + tilt*0.5, by1 - 10)], fill=hi_silver, width=2)
    d.line([(cx - 54 + tilt, by2 - 1), (cx + 54 + tilt, by2 - 1)], fill=sh_silver, width=2)

    # M200 Signature: Continuous Horizontal LED Taillight Strip
    strip_color = "#ff1e1e" if not braking else "#ff6666"
    strip_glow = "#ff9999" if braking else "#990000"
    strip_y = by1 - 4
    d.rectangle([cx - 48 + tilt*0.7, strip_y, cx + 48 + tilt*0.7, strip_y + 6], fill="#330000", outline="#111111")
    d.rectangle([cx - 46 + tilt*0.7, strip_y + 1, cx + 46 + tilt*0.7, strip_y + 5], fill=strip_color)
    d.line([(cx - 44 + tilt*0.7, strip_y + 2), (cx + 44 + tilt*0.7, strip_y + 2)], fill=strip_glow, width=1)

    if braking:
        # Extra high center brake glow
        d.rectangle([cx - 16 + tilt*0.5, strip_y - 6 - uphill*2, cx + 16 + tilt*0.5, strip_y - 2 - uphill*2], fill="#ffffff")

    # M200 Signature: Twin Flying Buttress Headrest Nacelles (오픈탑 미래형 유선형 페어링)
    top_y = by1 - 26 - uphill*6
    # Left nacelle
    d.ellipse([cx - 24 + tilt*0.3, top_y, cx - 8 + tilt*0.3, top_y + 20], fill=body_silver, outline=sh_silver)
    d.line([(cx - 18 + tilt*0.3, top_y + 2), (cx - 14 + tilt*0.3, top_y + 18)], fill=hi_silver, width=2)
    # Right nacelle (with driver helmet)
    d.ellipse([cx + 8 + tilt*0.3, top_y, cx + 24 + tilt*0.3, top_y + 20], fill=body_silver, outline=sh_silver)
    d.line([(cx + 14 + tilt*0.3, top_y + 2), (cx + 18 + tilt*0.3, top_y + 18)], fill=hi_silver, width=2)

    # Driver racing helmet
    d.ellipse([cx + 10 + tilt*0.3, top_y + 4, cx + 22 + tilt*0.3, top_y + 16], fill="#e0e0e0", outline="#111111")
    d.rectangle([cx + 12 + tilt*0.3, top_y + 8, cx + 20 + tilt*0.3, top_y + 12], fill="#111111") # Visor

    # Cockpit tub
    d.rectangle([cx - 26 + tilt*0.3, top_y + 14, cx + 26 + tilt*0.3, by1 - 10], fill="#15171c")

    # Integrated Aero Wing Spoiler
    wing_y = by1 - 16 - uphill*4
    d.rectangle([cx - 48 + tilt*0.4, wing_y - 3, cx + 48 + tilt*0.4, wing_y + 1], fill=hi_silver)
    d.rectangle([cx - 48 + tilt*0.4, wing_y + 1, cx + 48 + tilt*0.4, wing_y + 3], fill=dark_gray)

    return im

def generate_m200_sprites():
    steers = { -2: "hard_left", -1: "left", 0: "straight", 1: "right", 2: "hard_right" }
    for s_val, s_name in steers.items():
        im = create_m200_sprite(steer=s_val, uphill=0, braking=False)
        im.save(os.path.join(SPRITES_DIR, f"player_m200_{s_name}.png"))
        im_brk = create_m200_sprite(steer=s_val, uphill=0, braking=True)
        im_brk.save(os.path.join(SPRITES_DIR, f"player_m200_{s_name}_brake.png"))
        im_up = create_m200_sprite(steer=s_val, uphill=1, braking=False)
        im_up.save(os.path.join(SPRITES_DIR, f"player_m200_{s_name}_up.png"))
    print("Lotus M200 Speedster sprites generated!")

# -------------------------------------------------------------
# 2. ROADWORKS (공사장) ASSETS
# -------------------------------------------------------------
def generate_roadworks_assets():
    # A. Traffic Cone (주황색/흰색 공사용 삼각 꼬깔콘)
    w_cone, h_cone = 70, 90
    im_cone = Image.new("RGBA", (w_cone, h_cone), (0, 0, 0, 0))
    d_cone = ImageDraw.Draw(im_cone)
    cx = w_cone // 2

    # Black rubber base
    d_cone.polygon([(10, 84), (60, 84), (54, 76), (16, 76)], fill="#1a1a1a", outline="#0a0a0a")
    # Orange cone body
    cone_pts = [(18, 76), (cx - 5, 12), (cx + 5, 12), (52, 76)]
    d_cone.polygon(cone_pts, fill="#ff5500", outline="#b33600")
    # White reflective band
    d_cone.polygon([(26, 56), (cx - 7, 36), (cx + 7, 36), (44, 56)], fill="#ffffff")
    d_cone.polygon([(30, 48), (cx - 6, 38), (cx + 6, 38), (40, 48)], fill="#e0e0e0")
    # Tip
    d_cone.ellipse([cx - 5, 10, cx + 5, 16], fill="#ff5500")
    im_cone.save(os.path.join(SPRITES_DIR, "obstacle_cone.png"))

    # B. Construction Hazard Barricade (노랑/검정 빗살무늬 바리케이드)
    w_bar, h_bar = 200, 110
    im_bar = Image.new("RGBA", (w_bar, h_bar), (0, 0, 0, 0))
    d_bar = ImageDraw.Draw(im_bar)

    # Steel A-frame legs
    d_bar.rectangle([20, 30, 30, 105], fill="#777777", outline="#333333", width=2)
    d_bar.rectangle([170, 30, 180, 105], fill="#777777", outline="#333333", width=2)
    d_bar.polygon([(10, 105), (40, 105), (32, 95), (18, 95)], fill="#444444")
    d_bar.polygon([(160, 105), (190, 105), (182, 95), (168, 95)], fill="#444444")

    # Flashing warning amber light on top
    d_bar.rectangle([20, 12, 30, 30], fill="#ffaa00", outline="#333333")
    d_bar.ellipse([18, 6, 32, 20], fill="#ffee00", outline="#ff8800")
    d_bar.rectangle([170, 12, 180, 30], fill="#ffaa00", outline="#333333")
    d_bar.ellipse([168, 6, 182, 20], fill="#ffee00", outline="#ff8800")

    # Main horizontal board with yellow & black hazard stripes
    bx1, by1, bx2, by2 = 10, 28, 190, 68
    d_bar.rectangle([bx1, by1, bx2, by2], fill="#ffcc00", outline="#111111", width=3)
    # Diagonal black stripes
    stripe_w = 24
    for sx in range(bx1 - 40, bx2 + 40, stripe_w * 2):
        s_pts = [(sx, by2), (sx + 20, by2), (sx + 40, by1), (sx + 20, by1)]
        # Clip to board
        d_bar.polygon(s_pts, fill="#111111")
    # Re-stroke board frame
    d_bar.rectangle([bx1, by1, bx2, by2], outline="#111111", width=3)
    im_bar.save(os.path.join(SPRITES_DIR, "obstacle_barricade.png"))

    # C. Construction Warning Sign ("ROAD WORKS AHEAD")
    w_sgn, h_sgn = 120, 150
    im_sgn = Image.new("RGBA", (w_sgn, h_sgn), (0, 0, 0, 0))
    d_sgn = ImageDraw.Draw(im_sgn)
    # Post
    d_sgn.rectangle([56, 75, 64, 148], fill="#888888", outline="#444444")
    # Diamond Yellow Construction Sign
    diamond_pts = [(60, 10), (115, 65), (60, 120), (5, 65)]
    d_sgn.polygon(diamond_pts, fill="#ffaa00", outline="#111111", width=3)
    d_sgn.polygon([(60, 16), (109, 65), (60, 114), (11, 65)], outline="#111111", width=2)
    # Worker digging pictogram
    d_sgn.ellipse([54, 30, 66, 42], fill="#000000") # head
    d_sgn.line([(60, 42), (58, 68)], fill="#000000", width=4) # torso
    d_sgn.line([(58, 68), (44, 90)], fill="#000000", width=4) # leg
    d_sgn.line([(58, 68), (72, 88)], fill="#000000", width=4) # leg
    d_sgn.line([(60, 48), (76, 58), (72, 78)], fill="#000000", width=3) # shovel arm
    d_sgn.line([(70, 75), (82, 85)], fill="#000000", width=4) # shovel blade
    im_sgn.save(os.path.join(SPRITES_DIR, "sign_roadworks.png"))

    # D. Construction Drum / Barrel (주황색 공사용 원형 드럼통)
    w_drm, h_drm = 90, 110
    im_drm = Image.new("RGBA", (w_drm, h_drm), (0, 0, 0, 0))
    d_drm = ImageDraw.Draw(im_drm)
    d_drm.rounded_rectangle([15, 10, 75, 105], radius=8, fill="#ff5500", outline="#992200", width=3)
    # White horizontal stripes
    d_drm.rectangle([16, 28, 74, 42], fill="#ffffff")
    d_drm.rectangle([16, 62, 74, 76], fill="#ffffff")
    # Rim highlights
    d_drm.line([(18, 16), (72, 16)], fill="#ff8844", width=2)
    d_drm.line([(18, 98), (72, 98)], fill="#771100", width=2)
    im_drm.save(os.path.join(SPRITES_DIR, "obstacle_drum.png"))

    # E. Oil Slick (검은색 유출 오일 웅덩이 - 스핀 유발)
    w_oil, h_oil = 180, 65
    im_oil = Image.new("RGBA", (w_oil, h_oil), (0, 0, 0, 0))
    d_oil = ImageDraw.Draw(im_oil)
    # Dark viscous puddle
    d_oil.ellipse([10, 8, 170, 58], fill=(15, 15, 18, 230))
    d_oil.ellipse([18, 14, 162, 52], fill=(22, 20, 28, 250))
    # Iridescent sheen (무지개빛 오일 광택)
    d_oil.ellipse([30, 20, 140, 44], fill=(35, 30, 48, 210))
    d_oil.ellipse([50, 24, 110, 38], fill=(45, 55, 75, 190))
    # Specular liquid reflections
    d_oil.line([(40, 28), (85, 26)], fill="#7588a3", width=2)
    d_oil.line([(100, 34), (145, 32)], fill="#5c697e", width=2)
    im_oil.save(os.path.join(SPRITES_DIR, "obstacle_oil.png"))

    # F. Jump Ramp (공사장 경사 점프대 - 공중 도약 기믹)
    w_ramp, h_ramp = 200, 70
    im_ramp = Image.new("RGBA", (w_ramp, h_ramp), (0, 0, 0, 0))
    d_ramp = ImageDraw.Draw(im_ramp)
    # Under ramp shadow
    d_ramp.ellipse([15, 48, 185, 68], fill=(0, 0, 0, 140))
    # Wooden/steel wedge incline
    ramp_pts = [(20, 56), (180, 56), (170, 14), (30, 14)]
    d_ramp.polygon(ramp_pts, fill="#825c34", outline="#4a3016", width=2)
    # Ramp surface planks
    for px in range(35, 170, 18):
        d_ramp.line([(px, 15), (px - 5, 55)], fill="#664624", width=2)
    # Steel approach lip
    d_ramp.polygon([(20, 56), (180, 56), (175, 50), (25, 50)], fill="#555555")
    # Takeoff edge yellow/black hazard board
    d_ramp.rectangle([28, 12, 172, 24], fill="#ffcc00", outline="#111111", width=2)
    for hx in range(32, 165, 16):
        d_ramp.polygon([(hx, 23), (hx + 8, 23), (hx + 14, 13), (hx + 6, 13)], fill="#111111")
    im_ramp.save(os.path.join(SPRITES_DIR, "obstacle_ramp.png"))

    # G. Construction Excavator / Digger (대형 굴착기 - 노변 중장비)
    w_exc, h_exc = 240, 170
    im_exc = Image.new("RGBA", (w_exc, h_exc), (0, 0, 0, 0))
    d_exc = ImageDraw.Draw(im_exc)
    # Shadow
    d_exc.ellipse([15, 142, 225, 168], fill=(0, 0, 0, 130))
    # Caterpillar continuous tracks (무한궤도 트랙)
    d_exc.rounded_rectangle([30, 118, 170, 154], radius=14, fill="#252528", outline="#111111", width=3)
    # Sprocket wheels inside track
    for wx in [48, 76, 100, 124, 152]:
        d_exc.ellipse([wx - 10, 124, wx + 10, 148], fill="#444448", outline="#111111", width=2)
    # Revolving superstructure body (Caterpillar Yellow)
    cat_yellow = "#e6a800"
    cat_hi = "#ffc820"
    cat_dark = "#996e00"
    d_exc.rectangle([40, 72, 155, 120], fill=cat_yellow, outline="#111111", width=3)
    d_exc.line([(42, 74), (153, 74)], fill=cat_hi, width=3)
    d_exc.rectangle([135, 78, 155, 115], fill="#333333") # Counterweight
    # Operator Glass Cabin
    d_exc.rectangle([48, 42, 92, 85], fill="#1c2836", outline="#111111", width=3)
    d_exc.rectangle([54, 48, 86, 76], fill="#6eb5e6") # Glass
    d_exc.line([(56, 50), (75, 74)], fill="#ffffff", width=2) # Glass reflection
    # Engine exhaust pipe
    d_exc.rectangle([140, 52, 146, 72], fill="#444444", outline="#111111")
    # Hydraulic Boom Arm & Bucket
    d_exc.line([(85, 82), (130, 20)], fill=cat_yellow, width=12) # Main boom
    d_exc.line([(85, 82), (130, 20)], fill="#111111", width=2)
    d_exc.line([(130, 20), (195, 65)], fill=cat_yellow, width=9) # Stick arm
    # Excavator Bucket
    b_pts = [(195, 65), (218, 72), (212, 98), (185, 92)]
    d_exc.polygon(b_pts, fill="#38383c", outline="#111111", width=2)
    # Bucket teeth
    d_exc.polygon([(218, 72), (226, 78), (216, 82)], fill="#c0c0c0")
    im_exc.save(os.path.join(SPRITES_DIR, "obstacle_excavator.png"))

    # H. Steel Road Trench Plate (공사용 도로 복공판 / 철판)
    w_stp, h_stp = 160, 50
    im_stp = Image.new("RGBA", (w_stp, h_stp), (0, 0, 0, 0))
    d_stp = ImageDraw.Draw(im_stp)
    # Dark recessed trench shadow
    d_stp.rectangle([12, 10, 148, 44], fill="#1a1c20")
    # Steel textured plate
    d_stp.polygon([(16, 38), (144, 38), (140, 14), (20, 14)], fill="#7a828e", outline="#40454d", width=2)
    # Diamond tread cross lines
    for lx in range(25, 135, 15):
        d_stp.line([(lx, 16), (lx + 8, 36)], fill="#9aa2af", width=1)
        d_stp.line([(lx + 8, 16), (lx, 36)], fill="#5c626c", width=1)
    # Lifting bolt holes
    d_stp.ellipse([30, 22, 38, 30], fill="#22252a")
    d_stp.ellipse([122, 22, 130, 30], fill="#22252a")
    im_stp.save(os.path.join(SPRITES_DIR, "obstacle_steel_plate.png"))

    print("Roadworks obstacle sprites generated!")

# -------------------------------------------------------------
# 3. ROADWORKS BACKGROUND (Industrial Skyline & Construction Cranes)
# -------------------------------------------------------------
def generate_roadworks_background():
    w = 1280
    h_sky = 360
    im_sky = Image.new("RGBA", (w, h_sky))
    d_sky = ImageDraw.Draw(im_sky)

    # Dusk / Industrial hazy amber sky gradient
    for y in range(h_sky):
        ratio = y / h_sky
        r = int(60 + (190 - 60) * ratio)
        g = int(45 + (130 - 45) * ratio)
        b = int(40 + (80 - 40) * ratio)
        d_sky.line([(0, y), (w, y)], fill=(r, g, b, 255))
    im_sky.save(os.path.join(SPRITES_DIR, "bg_roadworks_sky.png"))

    # Industrial skyline with Tower Cranes and girders
    h_ind = 240
    im_ind = Image.new("RGBA", (w, h_ind), (0, 0, 0, 0))
    d_ind = ImageDraw.Draw(im_ind)

    # Draw city/industrial silhouettes
    for i in range(0, w, 60):
        bldg_h = 60 + int(45 * math.sin(i * 0.05)) + (i % 30)
        d_ind.rectangle([i, h_ind - bldg_h, i + 55, h_ind], fill=(45, 38, 36, 255))
        # Factory windows / lights
        for wy in range(h_ind - bldg_h + 10, h_ind - 10, 16):
            d_ind.rectangle([i + 8, wy, i + 18, wy + 8], fill=(255, 200, 100, 180))
            d_ind.rectangle([i + 28, wy, i + 38, wy + 8], fill=(255, 200, 100, 180))

    # Giant Construction Tower Cranes (Lotus 3 signature background!)
    for crane_x in [180, 520, 880, 1160]:
        crane_top = 25
        crane_base = h_ind - 20
        # Mast tower
        d_ind.rectangle([crane_x - 4, crane_top, crane_x + 4, crane_base], fill=(220, 160, 20, 255))
        # Cross truss lines
        for ty in range(crane_top, crane_base, 14):
            d_ind.line([(crane_x - 4, ty), (crane_x + 4, ty + 14)], fill=(120, 80, 10, 255))
        # Operator cab
        d_ind.rectangle([crane_x - 8, crane_top + 6, crane_x + 8, crane_top + 22], fill=(20, 20, 20, 255))
        # Long horizontal boom arm
        d_ind.line([(crane_x - 40, crane_top + 6), (crane_x + 110, crane_top + 6)], fill=(220, 160, 20, 255), width=3)
        # Counterweight
        d_ind.rectangle([crane_x - 40, crane_top + 3, crane_x - 25, crane_top + 15], fill=(50, 50, 50, 255))
        # Support tie cables
        d_ind.line([(crane_x, crane_top - 10), (crane_x - 35, crane_top + 6)], fill=(180, 180, 180, 255))
        d_ind.line([(crane_x, crane_top - 10), (crane_x + 70, crane_top + 6)], fill=(180, 180, 180, 255))
        # Hanging hoist hook
        d_ind.line([(crane_x + 65, crane_top + 6), (crane_x + 65, crane_top + 50)], fill=(200, 200, 200, 255))
        d_ind.rectangle([crane_x + 61, crane_top + 50, crane_x + 69, crane_top + 58], fill=(255, 50, 20, 255))

    im_ind.save(os.path.join(SPRITES_DIR, "bg_roadworks_skyline.png"))
    print("Roadworks industrial background generated!")

# -------------------------------------------------------------
# 4. SNOW / WINTER ASSETS
# -------------------------------------------------------------
def generate_snow_assets():
    # Snow-capped Pine Tree
    w, h = 180, 320
    im = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    cx = w // 2
    # Trunk
    d.rectangle([cx - 10, h - 70, cx + 10, h - 6], fill="#382512")
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
        pts = [
            (cx - width_half, y_base),
            (cx - width_half * 0.7, y_base - tier_h * 0.5),
            (cx, y_base - tier_h),
            (cx + width_half * 0.7, y_base - tier_h * 0.5),
            (cx + width_half, y_base),
            (cx, y_base - tier_h * 0.1)
        ]
        d.polygon(pts, fill="#1c3a28")
        # Heavy snow on top
        snow_pts = [
            (cx - width_half * 0.8, y_base - tier_h * 0.3),
            (cx, y_base - tier_h),
            (cx + width_half * 0.8, y_base - tier_h * 0.3),
            (cx, y_base - tier_h * 0.5)
        ]
        d.polygon(snow_pts, fill="#e8f4fc")
    im.save(os.path.join(SPRITES_DIR, "tree_snow.png"))
    print("Snow scenery sprites generated!")

if __name__ == "__main__":
    generate_m200_sprites()
    generate_roadworks_assets()
    generate_roadworks_background()
    generate_snow_assets()
