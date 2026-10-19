---
name: IELTS Daily
description: A bilingual pocket phrasebook for short Thai and English vocabulary practice.
colors:
  paper: "#f7f8f5"
  surface: "#fff"
  ink: "#202e32"
  muted: "#5c6c6b"
  line: "#dce3dc"
  teal: "#17695d"
  teal-hover: "#105448"
  teal-soft: "#e9f2ed"
  warm: "#f0eee4"
  focus: "#17695d"
  rail: "#eff2ec"
  nav-hover: "#e4eae1"
  nav-active: "#dbe9df"
  nav-active-ink: "#165747"
  control-border-hover: "#8aafa0"
  topic-hover: "#edf2eb"
  progress-track: "#cdded3"
  progress-ink: "#41665b"
  audio-hover: "#cde3d7"
  example-audio-hover: "#dce9e0"
  example-paper: "#f2f5ef"
typography:
  display:
    fontFamily: "DM Sans, Noto Sans Thai, sans-serif"
    fontSize: "48px"
    fontWeight: 550
    lineHeight: 1.2
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "DM Sans, Noto Sans Thai, sans-serif"
    fontSize: "42px"
    fontWeight: 600
    lineHeight: 1.45
    letterSpacing: "-0.025em"
  title:
    fontFamily: "DM Sans, Noto Sans Thai, sans-serif"
    fontSize: "28px"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "-0.025em"
  body:
    fontFamily: "DM Sans, Noto Sans Thai, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  definition:
    fontFamily: "DM Sans, Noto Sans Thai, sans-serif"
    fontSize: "19px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "DM Sans, Noto Sans Thai, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.65
  button:
    fontFamily: "DM Sans, Noto Sans Thai, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.6
rounded:
  tag: "5px"
  step: "6px"
  compact: "8px"
  control: "10px"
  choice: "12px"
  surface: "14px"
  accent-link: "24px"
  circle: "50%"
spacing:
  gap-xs: "8px"
  gap-sm: "10px"
  gap-md: "12px"
  gap-lg: "16px"
  inset-sm: "18px"
  inset-md: "20px"
  mobile-gutter: "22px"
  inset-lg: "24px"
  section-sm: "28px"
  section-md: "32px"
  section-lg: "36px"
  desktop-gutter: "56px"
  column-gap: "64px"
components:
  button-primary:
    backgroundColor: "{colors.teal}"
    textColor: "{colors.surface}"
    rounded: "{rounded.control}"
    typography: "{typography.button}"
    padding: "13px 20px"
  button-primary-hover:
    backgroundColor: "{colors.teal-hover}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    typography: "{typography.button}"
    padding: "13px 20px"
  sound-button:
    backgroundColor: "{colors.teal-soft}"
    textColor: "{colors.teal}"
    rounded: "{rounded.circle}"
    size: "48px"
  word-entry:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.surface}"
    padding: "28px 36px 30px"
  part-of-speech:
    backgroundColor: "{colors.teal-soft}"
    textColor: "{colors.teal}"
    rounded: "{rounded.tag}"
    padding: "2px 9px"
  accent-choice:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.choice}"
    padding: "18px 20px"
  accent-choice-selected:
    backgroundColor: "{colors.teal-soft}"
  nav-active:
    backgroundColor: "{colors.nav-active}"
    textColor: "{colors.nav-active-ink}"
    rounded: "{rounded.control}"
    padding: "12px 16px"
---

# Design System: IELTS Daily

## Overview

**Creative North Star: "A bilingual pocket phrasebook"**

Warm pale paper, deep ink and restrained teal frame real study text. DM Sans and Noto Sans Thai share one font stack, so English entries and Thai guidance feel like the same book. Ruled topic rows and compact numeric references supply structure without ornament.

This is a calm, personal study interface: generous space around the current word, compact supporting instructions and a clear next action. The shipped visual system uses authored SVG line icons and self-hosted fonts; it has no photographic or generated raster imagery.

**Key Characteristics:**
- Warm pale surfaces with dark ink and teal actions.
- Large English entries with bilingual supporting text.
- Ruled topic rows and quiet reading notes.
- Desktop rail, mobile bottom navigation and a stripped-back study view.

## Colors

The palette combines paper neutrals with a deep green teal; frontmatter preserves source color values. Sidecar tonal ramps are synthesized OKLCH swatch previews, not additional shipped color tokens.

### Primary
- **Deep Teal** (`teal`): primary actions, audio controls, progress fills and selected accents.
- **Deep Teal Hover** (`teal-hover`): filled primary button hover.
- **Pale Teal** (`teal-soft`): progress note, selected accent choice, audio control and word-class tag.
- **Focus Teal** (`focus`): the shared keyboard outline, deliberately the same source value as teal.
- **Audio greens** (`audio-hover`, `example-audio-hover`): playback/hover feedback on the two sound controls.

### Neutral
- **Pale Paper** (`paper`): page and mobile navigation background.
- **White Surface** (`surface`): word entry, secondary buttons and unselected accent choices.
- **Deep Ink** (`ink`): primary text; **Muted Ink** (`muted`): guidance, metadata and secondary text.
- **Rule Green** (`line`): dividers and default control borders; **Warm Paper** (`warm`): replace-round confirmation.
- **Rail and navigation tones** (`rail`, `nav-hover`, `nav-active`, `nav-active-ink`): desktop navigation hierarchy.
- **Progress tones** (`progress-track`, `progress-ink`): track and note text. **Example Paper** (`example-paper`): the contextual sentence inset.
- **Interaction tones** (`control-border-hover`, `topic-hover`): hover borders and ruled-row hover.
- The source also declares an unused `subtle` custom property; it is not promoted into the normative tokens here.

**The Teal Action Rule.** Use teal for the next study action and state feedback; keep supporting content on quiet paper tones.

## Typography

**Display Font:** DM Sans, with Noto Sans Thai and sans-serif fallbacks.
**Body Font:** The same stack; Thai glyphs are supplied by Noto Sans Thai.

Both variable fonts are self-hosted, use normal style and `font-display: swap`. DM Sans declares weights 100–1000; Noto Sans Thai declares 100–900. There is no separate mono face or fixed mathematical type scale.

### Hierarchy
- **Display:** English word entry uses the frontmatter display role; below 620px it becomes 38px, below 360px 34px. Long words can wrap anywhere.
- **Headline:** Home invitation uses the headline role; 46px at 1600px and above, 36px at 901–1190px, 34px at 621–900px, 35px at 361–620px and 32px at 360px and below.
- **Title:** Settings heading uses the title role; 25px below 620px and 23px below 360px. Summary heading is 28px with inherited 1.65 line height, becoming 26px below 620px.
- **Body:** Base text uses the body role. Home supporting copy is 15px/1.9 on wide screens and 13px below 900px. English definition is 19px/1.5 (18px on phones); Thai meaning is 17px/500 (16px on phones); example is 17px/1.65 (16px on phones).
- **Label:** Labels vary by context from 10px to 14px. The final phone override keeps topic counts, section metadata, word/session metadata, study hints, speech status and accent availability at 11px. Footer and course metadata remain smaller; these are utility exceptions, not a general reading-text scale.
- **Numbers:** Progress counts and entry/session references use tabular numerals. Summary totals are 42px/550/1.3; the home progress number is 34px, becoming 25px on phones.

**The Word First Rule.** The English entry is the strongest typographic element on a study card; definitions and Thai meanings remain clearly subordinate.

## Layout

The desktop workspace offsets a fixed left rail (240px wide, 40px 24px padding). Content is centered with a 1180px maximum and 38px 56px 52px padding. The home grid uses `minmax(0,1.55fr) minmax(230px,.8fr)` with a 64px gap. Study, settings and summary have independent reading widths of 640px, 620px and 520px.

At 901–1190px, the rail is 206px, content padding is 28px 36px 40px and the home columns become `minmax(0,1fr) 230px` with 32px gap. At 900px and below the rail disappears, the compact header and fixed bottom navigation appear, and the content maximum becomes 760px with 28px horizontal padding. Home remains two columns with a 235px notes column until 620px. At 1600px and above, content top padding is 54px and the home gap is 88px.

At 620px and below, home becomes one column, general gutters are 22px, study gutters are 18px, and notes follow topics. At 360px and below, general gutters shrink to 18px. Home topic rows are 88px minimum on desktop and 82px on phones. The footer reserves 104px bottom padding when the mobile navigation is visible. Safe-area environment insets protect the mobile header and bottom navigation.

Mobile study hides the global header, bottom navigation and footer at 900px and below. Study controls stay in normal document flow: a final phone override explicitly sets their position to static. Answers use two equal button columns; replace-round actions stack on phones. Spacing is a practical set of 8–36px gaps and insets with larger section and column gaps, not a strict single-unit scale.

## Elevation & Depth

Depth comes primarily from tonal layers and fine rules. The word entry alone carries a very faint ambient shadow (`0 4px 24px #20382c06`). There are no hard offset shadows, gradients or floating card stacks.

**The Paper Depth Rule.** Use background tone and ruled separation for ordinary hierarchy; reserve the existing soft shadow for the word entry.

## Shapes

Surfaces use the shared 14px radius; controls and navigation use 10px, accent choices 12px, compact code badges 8px and word-class tags 5px. Audio and completion marks are circles; the accent link is a 24px-radius capsule. Topic rows are flat, square and separated by 1px rules. Icons use 24px view boxes, round line caps/joins and a 1.75px current-color stroke, rendered at sizes appropriate to their controls.

## Components

### Buttons

Confident, legible actions with gently curved corners. Standard buttons have 52px minimum height; home start is 60px on desktop and 56px on phones; answer buttons are 56px. Primary uses teal and white; secondary uses white, ink and a fine rule border. Hover darkens primary or tints secondary. Background/color/shadow transition over 160ms; pressing moves a button down 1px. Keyboard focus uses a 3px teal outline with 4px offset. Disabled buttons use opacity .6 and a waiting cursor.

### Word entry and example

The white entry uses shared surface corners, the single ambient shadow and generous 28px 36px 30px inset (22px 24px 24px on phones). A large term and circular sound control lead the entry. Reveal adds a top rule and bilingual content with a 200ms clip/opacity animation; it does not flip the card. The example is a softly tinted 10px-radius inset, padded 16px 20px (12px 16px on phones). Reduced-motion preferences remove animations and transitions.

### Word-class tag

A compact italic label uses pale teal, teal ink and the tag radius. It identifies grammar; it is not an interactive filter chip.

### Accent choice

The whole radio row is the click target (100px minimum height), with a 42px by 46px code badge, descriptive text and a circular selection indicator. The actual native radio is transparent across the row, retaining semantics and keyboard behavior. Selected rows gain a teal border and pale teal fill; focus outlines the containing row. Phone padding is 16px and below 360px the badge width is 34px. There are no text-entry fields in the shipped interface.

### Navigation

Desktop links use muted text and tinted hover/active surfaces, with the active item at weight 650. Mobile bottom links stack icon and label; active mobile navigation uses teal without a filled active background. Two destinations remain explicit: practice and settings. Study on mobile uses its own pause and accent links. Text links and the accent link have at least 44px target height; phone sound controls are 44px circles (48px on desktop).

### Ruled topic index

Each full-width button combines an authored line icon, Thai topic name, smaller English name, a tabular progress/count reference and chevron. Bottom rules and the list's top rule create chapter continuity. Hover tints the whole row; remembered progress adds a small teal dot alongside the count.

### Progress and summary

Native progress elements are styled as 5px rounded teal tracks; session progress is 4px. The home progress note uses pale teal and a large numeric count; on phones its title and count share one grid row. Summary totals occupy two equal columns separated by one vertical rule and enclosed by horizontal rules. Words to review remain a ruled text list.

## Do's and Don'ts

### Do:
- **Do** keep Thai guidance and English study material in the shared self-hosted font stack.
- **Do** preserve visible keyboard focus and the existing generous touch targets.
- **Do** separate topic and review rows with fine rules.
- **Do** keep mobile study controls in document flow and honor reduced motion.

### Don't:
- **Don't** replace the authored SVG line icons with text glyph icons.
- **Don't** add a 3D card flip to the reveal interaction.
- **Don't** turn incidental tiny footer/course labels into the default size for study guidance.
- **Don't** add decorative kicker labels above content headings; the removed home eyebrow is not part of this system.
