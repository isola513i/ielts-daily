# ADR 0002: Free browser-provided speech

Status: accepted, 2026-10-20.

Use SpeechSynthesis and SpeechSynthesisUtterance. User rejected services with a cost. Discover actual available voices, refresh on voiceschanged and explicit interaction, and select exactly en-US, en-GB or en-AU. Prefer conventional speech voices over novelty voices and retain the utterance until completion. Cancel earlier speech when its context changes. Never silently substitute accents.

Consequence: no speech API subscription or credentials. Voice availability, quality and network requirements depend on the device. Show actionable unavailable/error messages and preserve non-audio study. Automated tests prove voice selection and lifecycle logic; listening on a physical iPhone is a separate manual check.
