# ADR 0003: Versioned local progress

Status: accepted, 2026-10-20.

Store a version-1 record under ieltsDaily:v1 containing accent preference, per-card latest verdict/seen count and the current session queue. Validate restored data against known IDs and queue invariants. Recover invalid records rather than crash. If storage access or writes fail, retain the current state in memory and visibly report that it is not saved.

Consequence: no personal study history is uploaded. Progress is specific to the current browser and origin and can be lost when site data is cleared. Latest recall is a learning aid, not a mastery or band-score estimate.
