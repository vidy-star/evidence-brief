# EvidenceBrief

A modern legal-tech web application that helps tenants organize evidence and generate hearing-ready documents.

Built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and the **App Router**.

## Features

- **File upload** — PDF, JPG, PNG, and DOCX (drag-and-drop or browse)
- **Evidence table** — view uploaded files with type, size, and date
- **Generate Hearing Package** — one-click document generation
- **Output sections:**
  - Chronology
  - Evidence Index
  - Hearing Summary
  - Draft T2 Allegations
  - Draft T6 Allegations

## Project Structure

```
EvidenceBrief/
├── public/
│   └── manifest.json
├── src/
│   ├── app/
│   │   ├── globals.css          # Tailwind + global styles
│   │   ├── layout.tsx           # Root layout, fonts, metadata
│   │   └── page.tsx             # Home page
│   ├── components/
│   │   ├── Dashboard.tsx        # Main application shell
│   │   ├── evidence/
│   │   │   ├── EvidenceTable.tsx
│   │   │   ├── FileUpload.tsx
│   │   │   ├── GenerateButton.tsx
│   │   │   └── OutputSections.tsx
│   │   └── layout/
│   │       └── Header.tsx
│   ├── lib/
│   │   ├── evidence.ts          # File validation & package generation
│   │   ├── file-icons.tsx       # File type icons & badges
│   │   └── utils.ts             # Utility helpers
│   └── types/
│       └── evidence.ts          # TypeScript interfaces
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Terminal Commands

Run these commands from the project folder (`CEvidenceBrief`).

### 1. Install dependencies

```bash
npm install
```

Downloads all packages listed in `package.json` (Next.js, React, Tailwind, etc.) into `node_modules/`.

### 2. Start the development server

```bash
npm run dev
```

Starts Next.js in development mode with hot reload. Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production

```bash
npm run build
```

Compiles and optimizes the app for deployment. Run this before deploying.

### 4. Start the production server

```bash
npm run start
```

Serves the production build locally (run `npm run build` first).

### 5. Lint the codebase

```bash
npm run lint
```

Runs ESLint to check for code quality issues.

## Prerequisites

- **Node.js 18.18+** (Node 20+ recommended)
- **npm** (included with Node.js)

Check your versions:

```bash
node --version
npm --version
```

## MVP Notes

This is an MVP. File uploads are stored in browser memory only (no server persistence). Generated documents are template-based drafts and should be reviewed by a legal professional before filing.

## License

Private — All rights reserved.
