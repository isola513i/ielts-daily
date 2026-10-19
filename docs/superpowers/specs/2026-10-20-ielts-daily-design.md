# IELTS Daily design specification

Approved in chat on 20 October 2026. Build a mobile-first personal vocabulary app for iPhone Safari, using static HTML/CSS/JavaScript and free GitHub Pages hosting.

## Study experience
Home offers all words or one topic: daily life, work, housing, travel, and study/public services (30 cards each, 150 total). A new session draws 10 unique cards, prioritising unseen and last-missed words. Each card teaches one sense: term, part of speech, simple English definition, natural Thai meaning, English example. Front shows term and pronunciation; reveal exposes the answer and remembered/needs-practice buttons. A missed card returns to the queue tail, with at most three total presentations in that session. Summary counts unique words by their final answer and lists words still needing practice. Persist unfinished sessions and allow resume.

## Speech
Use browser speech synthesis only. Settings selects en-US (initial default), en-GB or en-AU. Read the same accent for terms and examples, on explicit user taps only. Discover voices initially, on voiceschanged and on interaction. Assign an actual matching voice, not just a language hint. Never substitute another locale. Show unavailable voices and recovery instructions; allow study without audio. Cancel playback when changing card, accent, route or starting new audio.

## Persistence and delivery
Version localStorage data for settings, latest answers and unfinished sessions. Handle malformed or blocked storage without crashing; in storage failure mode study continues in memory with a visible notice. Use hash navigation and relative asset paths for repository-based Pages hosting. Publish public repository isola513i/ielts-daily; no user progress is uploaded.

## Interface
Thai controls and English material. Light warm background, dark ink and teal primary controls. A focused single-column study surface with at least 44px touch targets, visible keyboard focus, reduced-motion support and iPhone safe areas. Reveal as an accessible content expansion, not a visually rotating card. No answer information in the front-side accessibility tree. Home, session, summary and settings are the four primary states.

## Acceptance
Node tests cover data contracts, session selection/repetition/summary, save/resume/recovery and speech selection/lifecycle. Browser tests exercise a complete session, reload, settings and rendering under a repository path. Inspect mobile and desktop together. Real iPhone Safari listening and VoiceOver require hardware; explicitly report if not performed.
