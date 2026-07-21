---
name: Obsidian Terminal
colors:
  surface: '#0c160c'
  surface-dim: '#0c160c'
  surface-bright: '#313c30'
  surface-container-lowest: '#071007'
  surface-container-low: '#141e14'
  surface-container: '#182218'
  surface-container-high: '#222d22'
  surface-container-highest: '#2d372c'
  on-surface: '#dae6d5'
  on-surface-variant: '#b9ccb5'
  inverse-surface: '#dae6d5'
  inverse-on-surface: '#293328'
  outline: '#849581'
  outline-variant: '#3b4b3a'
  surface-tint: '#00e55b'
  primary: '#edffe8'
  on-primary: '#003911'
  primary-container: '#00ff66'
  on-primary-container: '#007128'
  inverse-primary: '#006e27'
  secondary: '#bec9c0'
  on-secondary: '#28332c'
  secondary-container: '#414c45'
  on-secondary-container: '#b0bbb2'
  tertiary: '#fcf9fc'
  on-tertiary: '#303032'
  tertiary-container: '#dfdddf'
  on-tertiary-container: '#626163'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6bff83'
  primary-fixed-dim: '#00e55b'
  on-primary-fixed: '#002107'
  on-primary-fixed-variant: '#00531b'
  secondary-fixed: '#dae5dc'
  secondary-fixed-dim: '#bec9c0'
  on-secondary-fixed: '#141e18'
  on-secondary-fixed-variant: '#3f4942'
  tertiary-fixed: '#e4e2e4'
  tertiary-fixed-dim: '#c8c6c8'
  on-tertiary-fixed: '#1b1b1d'
  on-tertiary-fixed-variant: '#474649'
  background: '#0c160c'
  on-background: '#dae6d5'
  surface-variant: '#2d372c'
typography:
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  body-lg:
    fontFamily: JetBrains Mono
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  body-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Courier Prime
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.1em
  metadata:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '400'
    lineHeight: '1'
    letterSpacing: 0.05em
spacing:
  unit: 4px
  container-margin: 24px
  gutter: 16px
  panel-padding: 12px
---

## Brand & Style
The design system is an ultra-dark, high-contrast digital environment inspired by subterranean command centers and secure terminal interfaces. The personality is cold, disciplined, and functional, evoking a sense of "clandestine operations."

The aesthetic is a hybrid of **Brutalism** and **Tactile Retro-Futurism**. It prioritizes information density and technical precision over decorative flourishes. Visual interest is generated through thin structural lines, industrial textures, and the "glow" of data against an absolute void. 

**Key Principles:**
- **The Void:** Pure black backgrounds emphasize the weight of the data presented.
- **Low-Light Utility:** Minimal use of saturated colors to preserve "night vision" and focus.
- **Industrial Rigidity:** Strict adherence to grid systems and mechanical framing.
- **Technical Fidelity:** Use of scanlines and metadata strings to suggest a live, monitored system.

## Colors
The palette is dominated by absolute black and industrial grays, with the signature green reserved for high-priority signaling.

- **Backgrounds:** Pure `#000000` is mandatory for the base layer to create the "void" effect.
- **Primary (Signal):** Neon Green (`#00ff66`) is used exclusively for active cursors, critical alerts, and small status pips. 
- **Secondary (Subsurface):** A desaturated Forest Green (`#1a241e`) is used for subtle borders and active state highlights.
- **Surface (Industrial):** Dark Gunmetal/Charcoal (`#2c2c2e`) is used for panel headers and structural dividers to provide a mechanical feel without the brightness of green.
- **Typography:** Body text uses a muted silver-gray to prevent eye strain and eliminate excessive bloom, while labels may use a dim, desaturated green.

## Typography
The typography system uses a mix of technical monospaced fonts and geometric headers to simulate a sophisticated OS.

- **Headlines:** Use **Space Grotesk** for a futuristic, structured look. Headers should be tight and impactful.
- **Body:** **JetBrains Mono** provides high legibility for data-heavy views. It should remain sharp with no text-shadow/glow effects.
- **Labels & Metadata:** **Courier Prime** or small-caps Mono fonts are used for technical annotations and "system readouts."
- **Formatting:** Monospacing is strictly enforced for any numerical data or timestamps to ensure perfect vertical alignment in columns.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy, resembling a physical hardware console or a multi-monitor terminal setup.

- **Grid Model:** 12-column grid with narrow 16px gutters to maintain high information density.
- **Panel Logic:** Content is organized into "Modules" or "Cells" defined by 1px gunmetal borders. 
- **Density:** Spacing is compact. A 4px baseline grid governs all internal padding.
- **Adaptive Behavior:** On mobile, modules stack vertically, but maintain their "framed" appearance. On desktop, modules occupy fixed coordinates to simulate a dashboard.

## Elevation & Depth
Depth is created through **Tonal Layering** and structural framing rather than shadows.

- **Tier 1 (Base):** Absolute black (#000000).
- **Tier 2 (Panels):** Defined by 1px solid borders in Gunmetal (#2c2c2e).
- **Tier 3 (Headers):** Panel headers use a dark charcoal fill to distinguish them from the panel body.
- **Atmospherics:** A global, low-opacity scanline overlay (2% opacity) is applied to the entire viewport to provide the CRT texture. 
- **No Shadows:** Shadows are strictly forbidden. Objects do not "float"; they are "etched" or "embedded" into the interface.

## Shapes
The shape language is **Sharp (0px)**. 

Every element—buttons, panels, input fields, and images—must have perfectly square corners. This reinforces the industrial, unyielding nature of the system. In rare cases, a 45-degree "clipped corner" (dog-ear) can be used for primary action buttons to suggest a mechanical tab.

## Components

- **Buttons:** Rectangular with 1px gunmetal borders. The "Hover" state shifts the border to Neon Green and fills the background with a 10% opacity green tint. Text remains sharp.
- **Panel Headers:** Solid charcoal backgrounds with uppercase metadata labels. Usually contains a "Window Control" icon set (min/max/close) in the top right.
- **Input Fields:** Pure black background with a bottom-only border in Gunmetal. The focus state triggers a blinking Neon Green terminal cursor block.
- **Status Indicators:** Small 8px squares or circles. Gray = Offline, Dim Green = Standby, Pulsing Neon Green = Active/Critical.
- **Data Tables:** High-density, no vertical lines. Horizontal dividers are 1px charcoal lines with 20% opacity.
- **Terminal Output:** A dedicated component for scrolling logs, using the metadata font style and limited to the bottom 20% of the screen or a specific sidebar.