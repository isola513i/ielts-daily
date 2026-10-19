# IELTS Daily implementation plan

## Goal and architecture
Implement the approved static mobile vocabulary app. Runtime modules in web/js own vocabulary, sessions, storage, speech and rendering; web/index.html and web/styles.css form the shell. No server API or runtime dependency. See ../specs/2026-10-20-ielts-daily-design.md.

## Tasks
1. Write failing tests for session selection, queue limits, latest-answer summaries, storage recovery and locale-exact speech. Implement the isolated modules and run node tests.
2. Write the 150 original cards with a schema/count/uniqueness test. Build the four UI states, accessible controls and responsive styling. Add browser acceptance tests before the interaction implementation.
3. Verify complete study, resume, storage failure, missing/late speech voices, mobile/desktop rendering and Pages base paths. Fix material defects and run an independent whole-project review.
4. Record product/design decisions, glossary and usage instructions. Commit and publish the site to a new public GitHub repository, configure GitHub Pages, wait for deployment and verify live assets.

## Review focus
Malformed persisted data, double taps advancing two cards, delayed voice discovery, accidental accent substitution, and repository subpath asset failures.

## Defaults
10 unique words per round; 3 total presentations per word; en-US initially selected; latest verdict defines remembered vs needs practice. Prioritise unseen/last-missed words, then draw known words to fill the round. Keep the selected topic when restarting. When data cannot be persisted, continue in memory and visibly report that saving is unavailable.
