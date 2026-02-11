# NeuroStack Atlas

Educational biohacking knowledge hub built with Next.js, Tailwind CSS, and typed data normalization from `data.md`.

## Core Features

- Full catalog browsing and filtering by category, evidence, stimulation profile, cycling, and search text.
- Detail pages for every entry with dosage/protocol, timing, warnings, and synergies.
- Rule-based compatibility checker (`synergy` / `caution` / `avoid` / `unknown`).
- Strict medical guardrails and legal disclaimers across UI and API.
- Read-only APIs for categories, entries, single entry, compatibility, and disclaimers.

## Data Pipeline

Source file: `data.md`

Generation command:

```bash
npm run generate:data
```

Generated files:

- `data/categories.json`
- `data/entries.json`
- `data/compatibility-rules.json`

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Testing

```bash
npm run test
```

## Safety Notice

This project is educational only and does not provide medical advice, diagnosis, or treatment.
Always consult a licensed healthcare professional before using any substance or intervention.
