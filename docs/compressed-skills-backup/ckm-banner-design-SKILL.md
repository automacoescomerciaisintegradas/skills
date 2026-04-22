---
name: ckm:banner-design
description: "Banner builder: Social, Ads, Hero, Print. Art styles + AI visuals. Actions: design, create, generate banner."
---

# Banner Design

Create multi-format banners. Uses `ui-ux-pro-max`, `frontend-design`, `ai-artist`, `ai-multimodal`.

## Workflow
Ask (Purpose/Platform/Content/Brand/Style/Qty) -> Research (Pinterest) -> Design (HTML/CSS + AI Assets) -> Export (Screenshot) -> Present.

## Sizes (px)
| Platform | Size | Platform | Size |
|----------|------|----------|------|
| FB Cover | 820x312 | IG Story | 1080x1920 |
| X Header | 1500x500 | IG Post | 1080x1080 |
| LI Pers | 1584x396 | GAds Rec | 300x250 |
| YT Chan | 2560x1440 | Web Hero | 1920x1080 |

## Art Styles
- **Styles**: Minimalist, Bold Typo, Gradient, Photo, Geometric, Retro, Glass, Neon, Editorial, 3D.
- **Models**: Standard (Flash) for bgs/patterns; Pro for detailed hero/products. Ratios: 1:1, 16:9, 9:16, 3:2.

## Commands
```bash
# Generate Visuals (Flash or Pro)
python3 .../gemini_batch_process.py --task generate --model [flash|pro] --prompt "..." --aspect-ratio [ratio]
# Export PNG
node .../screenshot.js --url "http://..." --width [W] --height [H] --output "assets/banners/..."
```

## Rules
- **Safe zones**: Central 80%.
- **CTA**: One per banner, bottom-right, min 44px.
- **Text**: Under 20% (ads); Max 2 fonts; min 16px body, 32px headline.
- **Print**: 300 DPI, CMYK, 3-5mm bleed.
- **Filenames**: `{style}-{width}x{height}.png` in `assets/banners/{campaign}/`.
