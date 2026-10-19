# ADR 0001: Static browser application

Status: accepted, 2026-10-20.

Use semantic HTML, CSS and ES modules with no runtime dependencies. The first feature needs local interactions and 150 fixed vocabulary cards, not a backend. Keep study state, persistence, audio and rendering in separate modules. Use hash routes and relative URLs so reloads and assets work under a GitHub Pages repository prefix.

Consequence: straightforward free hosting and no application login. Cross-device accounts, custom vocabulary management and cloud sync are outside v1.
