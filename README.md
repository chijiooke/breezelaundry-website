# breezelaundry — website

The marketing and partner-onboarding website for [breezelaundry](https://breezelaundry.ng) — an invisible operating system for clothing care, currently serving Lagos and Abuja.

---

## Tech stack

| Layer | Tool |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| Forms | Formik + Yup |
| Icons | @iconify/react — Lucide set (`lucide:*`) |
| Database | Notion (via `@notionhq/client`) |
| Language | TypeScript |

---

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env.local` file in the project root:

```env
NOTION_TOKEN=secret_...
NOTION_DATABASE_ID=...
```

| Variable | Where to get it |
|---|---|
| `NOTION_TOKEN` | Notion → Settings → Integrations → New integration |
| `NOTION_DATABASE_ID` | The ID in the URL of your Notion database page |

The Notion database must have these properties:

| Property | Type |
|---|---|
| Shop Name | Title |
| City | Select |
| Address | Rich Text |
| Staff Count | Number |
| Equipment | Multi-select |
| WhatsApp | Phone number |
| Submitted At | Date |

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project structure

```
src/
├── app/
│   ├── api/
│   │   └── partner/route.ts   # POST — writes partner submission to Notion
│   ├── page.tsx               # Partner waitlist page (/ route)
│   ├── layout.tsx             # Root layout
│   └── globals.css
└── components/
    └── PartnerWaitlist.tsx    # Partner onboarding form
```

---

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |

---

## Deployment

Deploy on [Vercel](https://vercel.com). Set `NOTION_TOKEN` and `NOTION_DATABASE_ID` under Project → Settings → Environment Variables.
