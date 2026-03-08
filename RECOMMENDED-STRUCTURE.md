# 📁 Recommended Project Structure - Production Ready

## Current Status: NEEDS CLEANUP
```
lumeza-website/
├── 📂 app/                          ✅ Keep - Core pages
├── 📂 components/                   ✅ Keep - React components
├── 📂 lib/                          ✅ Keep - Utilities & helpers
├── 📂 prisma/                       ✅ Keep - Database
├── 📂 public/                       ✅ Keep - Static assets
├── 📂 styles/                       ✅ Keep - CSS/Tailwind
├── 📂 node_modules/                 ✅ Keep - Dependencies
├── .env.local                       ✅ Keep - Local config
├── .gitignore                       ✅ Update
├── package.json                     ✅ Keep
├── tsconfig.json                    ✅ Keep
├── README.md                        ⚠️  Update
├── 
├── ❌ MASSIVE CLEANUP NEEDED:
│   ├── check-products.js
│   ├── test-db.js
│   ├── test.js
│   ├── check-types.ps1
│   ├── ALL 12 .ps1 files
│   ├── ALL 25+ .md files (temp docs)
│   ├── server.log
│   └── vercel.json.backup.*
│
└── ✅ NEED TO ADD:
    ├── .dev-scripts/               (move dev files here)
    ├── app/legal/                  (terms, privacy, etc)
    ├── app/support/                (support page)
    ├── public/images/              (product images)
    └── docs/                       (if needed)
```

---

## RECOMMENDED: Final Production Structure

```
lumeza-website/
│
├─ 📂 .dev-scripts/                 (Development scripts only)
│  ├── check-products.js
│  ├── test-db.js
│  ├── check-types.ps1
│  ├── fix-all.ps1
│  ├── README-DEV.md               (How to use dev scripts)
│  └── ... (all 12 PS1 files)
│
├─ 📂 .github/                      (GitHub templates - optional)
│  ├── ISSUE_TEMPLATE.md
│  └── PULL_REQUEST_TEMPLATE.md
│
├─ 📂 app/                          (Next.js App Router)
│  ├─ 📂 api/
│  │  ├─ contact/
│  │  ├─ products/
│  │  ├─ download/
│  │  └── health/route.ts           (Health check for monitoring)
│  │
│  ├─ 📂 legal/                     [NEW] Legal pages
│  │  ├── layout.tsx
│  │  ├── page.tsx                  (Legal hub)
│  │  ├── 📂 terms/page.tsx
│  │  ├── 📂 privacy/page.tsx
│  │  ├── 📂 cookies/page.tsx
│  │  └── 📂 refund/page.tsx
│  │
│  ├─ 📂 support/                   [NEW] Support pages
│  │  ├── page.tsx                  (FAQ, contact, support)
│  │  └── 📂 faq/page.tsx
│  │
│  ├── layout.tsx
│  ├── page.tsx
│  ├── error.tsx
│  ├── loading.tsx
│  ├── not-found.tsx
│  ├── robots.ts
│  └── sitemap.ts
│
├─ 📂 components/                   (Reusable React components)
│  ├─ 📂 forms/
│  ├─ 📂 layout/
│  ├─ 📂 products/
│  ├─ 📂 ui/
│  └─ 📂 sections/                  [NEW] Page sections
│     ├── Hero.tsx
│     ├── Features.tsx
│     └── CTA.tsx
│
├─ 📂 config/                       [NEW] Configuration
│  ├── constants.ts
│  ├── metadata.ts                  (Global metadata)
│  └── navigation.ts                (Navigation items)
│
├─ 📂 lib/                          (Utilities & helpers)
│  ├─ 📂 constants/
│  ├─ 📂 data/
│  ├─ 📂 hooks/
│  ├─ 📂 types/
│  ├─ 📂 utils/
│  ├── prisma.ts
│  ├── resend.ts
│  ├── seo.ts
│  └── validators.ts                [NEW] Input validation
│
├─ 📂 prisma/                       (Database)
│  ├─ 📂 migrations/
│  ├── schema.prisma
│  ├── seed.ts
│  └── .dev-scripts/seed-*.js       (Move here)
│
├─ 📂 public/                       (Static files)
│  ├─ 📂 images/
│  │  ├── logo.png
│  │  ├── logo-dark.png
│  │  ├── favicon.ico
│  │  └── 📂 products/             [NEW] Product images
│  │
│  ├─ 📂 fonts/                     [NEW] Custom fonts
│  └── robots.txt                   [NEW] Robots file
│
├─ 📂 styles/                       (CSS/Tailwind)
│  ├── globals.css
│  └── variables.css
│
├─ 📂 docs/                         [NEW] Documentation
│  ├── DEPLOYMENT.md
│  ├── ARCHITECTURE.md
│  └── API.md
│
├── .env.example                    [UPDATE] Clean version
├── .env.local                      [IGNORE] Local only
├── .gitignore                      [UPDATE]
├── .prettierrc                     [NEW] Code formatting
├── .eslintrc.json                  [UPDATE] Linting rules
├── eslint.config.mjs               [EXISTING]
├── next.config.js                  [UPDATE] Security headers
├── tailwind.config.js               [EXISTING]
├── tsconfig.json                   [EXISTING]
├── package.json                    [UPDATE] Version 1.0.0
├── package-lock.json
│
├── README.md                       [UPDATE] Professional version
├── LICENSE                         [NEW] MIT or Apache 2.0
├── CHANGELOG.md                    [NEW] Version history
│
├── vercel.json                     [KEEP] Production config
└── .git/                           [KEEP] Version control
```

---

## Step-by-Step File Organization

### Step 1: Create New Directories
```bash
mkdir -p .dev-scripts
mkdir -p app/legal
mkdir -p app/legal/terms
mkdir -p app/legal/privacy
mkdir -p app/legal/cookies
mkdir -p app/legal/refund
mkdir -p app/support
mkdir -p components/sections
mkdir -p config
mkdir -p public/images/products
mkdir -p public/fonts
mkdir -p docs
```

### Step 2: Move Files
```bash
# Move dev scripts
mv check-products.js .dev-scripts/
mv test-db.js .dev-scripts/
mv test.js .dev-scripts/
mv check-types.ps1 .dev-scripts/
mv fix-all.ps1 .dev-scripts/
mv fix-vercel-config.ps1 .dev-scripts/
mv git-automate.ps1 .dev-scripts/
mv launch.ps1 .dev-scripts/
mv redeploy-simple.ps1 .dev-scripts/
mv redeploy-vercel.ps1 .dev-scripts/
mv reset-db.ps1 .dev-scripts/
mv vercel-deploy.ps1 .dev-scripts/

# Move seed scripts
mv prisma/seed-better-sqlite.js prisma/.dev-scripts/  (if needed)
```

### Step 3: Create Missing Files Structure
```
app/legal/Terms.tsx        → /terms/page.tsx
app/legal/Privacy.tsx      → /privacy/page.tsx
app/legal/Cookies.tsx      → /cookies/page.tsx
app/legal/Refund.tsx       → /refund/page.tsx
app/support/FAQ.tsx        → /support/faq/page.tsx
```

### Step 4: Delete Temporary Documentation
```bash
rm ALL-FIXES-SUMMARY.md
rm AUTOMATION-GUIDE.md
# ... (all 25+ temp files - see cleanup script)
```

### Step 5: Create New Documentation
```
docs/DEPLOYMENT.md         → Deployment guide
docs/ARCHITECTURE.md       → Architecture overview
docs/API.md               → API documentation
.dev-scripts/README.md    → Dev scripts guide
```

---

## File Count Comparison

### BEFORE (Current - Messy):
```
Root files: 60+
Temporary docs: 25+
Dev scripts: 12
↪️  TOTAL: 97+ files at root level ❌ UNPROFESSIONAL
```

### AFTER (Proposed - Clean):
```
Root files: 15-20
Organized subfolders: 8
Total: ~100 files (organized) ✅ PROFESSIONAL
```

---

## Environment Variables (.env structure)

### `.env.example` (Commit this)
```env
# Database
DATABASE_URL="file:./prisma/dev.db"

# Email Service
RESEND_API_KEY=re_example_key

# Email Config
NEXT_PUBLIC_FROM_EMAIL=noreply@lumeza.com
NEXT_PUBLIC_CONTACT_EMAIL=contact@lumeza.com

# Website URLs
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Analytics
NEXT_PUBLIC_GA_ID=G-EXAMPLE
NEXT_PUBLIC_SENTRY_DSN=

# Image Service (Optional)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Payment (Optional)
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=
MIDTRANS_SERVER_KEY=
```

### `.env.local` (DO NOT COMMIT)
```env
# Same as above but with REAL values
DATABASE_URL="file:./prisma/dev.db"
RESEND_API_KEY=re_actual_key_here
...
```

---

## .gitignore (Updated)

```gitignore
# Environment
.env
.env.local
.env.*.local
.env.backup

# Dev only
.dev-scripts/
debug.env

# Next.js
.next/
out/
.turbo/
.turbopack/

# Development
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.vscode/
.DS_Store
Thumbs.db

# Build
dist/
build/
.next/
.expo/

# Database
*.db
*.sqlite
prisma/dev.db
dev.db*

# IDE
.idea/
*.swp
*.swo
*~

# Logs
logs/
*.log
server.log

# Testing
coverage/
.nyc_output/

# Temp
temp/
tmp/
*.tmp

# Archive
*.zip
*.tar.gz
```

---

## package.json (Scripts Update)

```json
{
  "name": "lumeza-website",
  "version": "1.0.0",
  "description": "Digital marketplace for creative assets",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:seed": "prisma db seed",
    "db:push": "prisma db push",
    "db:reset": "prisma migrate reset",
    "analytics": "vercel analytics"
  }
}
```

---

## Quick Migration Commands

```bash
#!/bin/bash

# 1. Backup current state
cp -r lumeza-website lumeza-website.backup

# 2. Create structure
mkdir -p .dev-scripts app/legal app/support components/sections docs

# 3. Move dev scripts
mv *.ps1 .dev-scripts/
mv test*.js .dev-scripts/
mv check-*.js .dev-scripts/

# 4. Delete temp docs
rm ALL-FIXES-SUMMARY.md AUTOMATION-*.md COMPLETE-*.md DEPLOYMENT.md ...

# 5. Create legal pages
touch app/legal/page.tsx
touch app/legal/terms/page.tsx
touch app/legal/privacy/page.tsx

# 6. Copy cleanup script
cp cleanup-for-public.sh .dev-scripts/

# 7. Commit
git add .
git commit -m "refactor: organize structure for public launch"
git push
```

---

## Checklist After Reorganization

```
Structure:
- [x] .dev-scripts/ created with all dev files
- [x] app/legal/ created with legal pages
- [x] app/support/ created with support pages
- [x] config/ created with configuration
- [x] docs/ created with documentation
- [x] public/images/products/ created
- [x] Temporary .md files deleted
- [x] .gitignore updated

Configuration:
- [x] .env.example cleaned up
- [x] package.json scripts updated
- [x] .prettierrc created (if needed)
- [x] .eslintrc.json reviewed

Documentation:
- [x] README.md updated & professional
- [x] docs/DEPLOYMENT.md created
- [x] docs/ARCHITECTURE.md created
- [x] .dev-scripts/README.md created

Git:
- [x] .gitignore updated
- [x] All changes committed
- [x] Ready for public
```

---

## Result After Reorganization

✅ **Professional File Structure**
✅ **Clean Root Directory** (15-20 files max)
✅ **Organized Development Scripts** (.dev-scripts/)
✅ **Complete Legal Pages** (app/legal/)
✅ **Documentation Available** (docs/, README.md)
✅ **Ready for Public** (looks professional)

---

**Next:** Follow PUBLIC-LAUNCH-ACTION-PLAN.md for the 2-week launch roadmap!