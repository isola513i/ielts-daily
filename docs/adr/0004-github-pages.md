# ADR 0004: GitHub Pages publication

Status: accepted, 2026-10-20.

Publish the public repository isola513i/ielts-daily to GitHub Pages using a workflow that first runs unit and WebKit/Chromium browser tests, then uploads only web/. The user chose GitHub Pages after considering free hosting alternatives. No paid API, hosting upgrade or purchased domain is needed for the selected public static website configuration.

Consequence: website and source are public; local progress stays in the browser. Development documents and tests remain in the source repository but are excluded from the deployed website artifact.
