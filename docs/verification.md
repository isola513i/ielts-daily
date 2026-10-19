# Verification record

Local verification on 20 October 2026:

- `npm test`: 14 passing Node tests covering 150-card integrity, selection, retries, summaries, storage recovery, exact speech locale selection and cancellation notifications.
- `npm run test:browser -- --workers=2`: 14 passing tests across WebKit/iPhone 13 emulation and desktop Chromium, including complete rounds, rapid/duplicate taps, resume, accent persistence, unavailable storage/audio, repository prefix paths, keyboard skip link and axe WCAG 2 A/AA + 2.1 AA checks.
- axe scans wait for reveal motion to settle; transient opacity during a 200ms animation must not be mistaken for the final text contrast.
- Impeccable detector on the entry, CSS and UI module returned no deterministic findings.
- Inspected desktop and mobile home, recall, answer, summary and settings screenshots. Answer controls remain after the full example in normal flow on small screens. The actual in-app browser window at approximately 742px wide was also visually checked.
- Downloaded fonts from the Google Fonts repository and included the corresponding SIL Open Font License files.

Not performed: listening on physical iPhone hardware, real VoiceOver use, or proof that every device supplies all three accents. WebKit emulation and speech test doubles cannot establish these. The interface states voice availability honestly and remains usable without audio.

Independent Impeccable finish review assessed overall fidelity and correctness, then requested two fixes: notify the UI when canceled speech clears playback, and remove the redundant home eyebrow. Both were fixed; the cancellation regression was observed failing before the fix and passing afterward. The reviewer scored both fixes resolved, confirmed the recaptures and summary views, and returned `disposition: ship` for the scored fixes.

## Live deployment

GitHub Actions run [39294599486](https://github.com/isola513i/ielts-daily/actions/runs/39294599486) succeeded, including the 14 Node tests, 14 browser tests and deployment. The site is live at https://isola513i.github.io/ielts-daily/.

The live page was opened and its rendered interface verified in the user's in-app browser. Eleven deployed files (HTML, CSS, six JavaScript modules, favicon and both fonts) each returned HTTP 200 and matched the local published source by SHA-256. Documentation-only commits do not trigger another deployment.

DESIGN.md and .impeccable/design.json were written by the independent Impeccable documenter from the final source; application files were not changed by that handoff.

## Implementation choices

- Initialise a feature branch in the provided empty folder rather than create a worktree: no prior repository or user changes needed protecting. Publish its reviewed result as the new repository's main branch, as required for the chosen deployment.
- Preserve the user-approved code-first direction rather than restart visual selection. The Impeccable direction seed and route contract record the phrasebook interpretation; the reviewed working UI is the evidence.
- Keep mobile answer controls in normal document flow: the initial sticky dock obscured examples. This protects readable content, with a small amount of scrolling on short screens.
- Prefer conventional speaking voices within the exact selected locale over novelty voices. This improves selection on supported devices, but remains a heuristic rather than a guarantee of voice quality.

No deferred material findings remain from the scored review fixes. Physical iPhone audio and VoiceOver checks remain the explicit manual verification limit.
