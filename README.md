# EliteProfessionals — Lead Capture & Admin Platform

A full-stack Next.js web app built for the **EliteProfessionals** brand. Visitors see a high-converting landing page, create an account to receive the Verified Insider Pack, then get directed to your Telegram group and channel.

---

## 🗺️ Pages

| Route | Description |
|---|---|
| `/` | Landing page — pack offer, urgency counter, CTA |
| `/signup` | Account creation form — captures full lead data |
| `/welcome` | Post-signup page — Telegram group & channel links |
| `/admin` | Password-protected admin dashboard |
| `/api/register` | POST — saves a new lead |
| `/api/login` | POST — authenticates admin |
| `/api/admin/leads` | GET — returns all leads + stats (admin only) |
| `/api/admin/export` | GET — downloads leads as CSV (admin only) |
| `/api/leads` | GET — returns public count for social proof |

---

## 🚀 DEPLOY TO VERCEL — Step by Step

### Prerequisites
- A [Vercel account](https://vercel.com) (free tier works)
- A [GitHub account](https://github.com) (free)
- Node.js 18+ installed on your computer

---

### Step 1 — Install dependencies locally

Open your terminal in this project folder and run:

```bash
npm install
```

Test it works locally:

```bash
npm run dev
```

Visit `http://localhost:3000` — you should see the landing page.

---

### Step 2 — Push to GitHub

```bash
# Initialise git (if not already done)
git init
git add .
git commit -m "Initial commit — EliteProfessionals app"

# Create a new repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/eliteprofessionals.git
git branch -M main
git push -u origin main
```

---

### Step 3 — Connect to Vercel

1. Go to **[vercel.com](https://vercel.com)** and sign in
2. Click **"Add New Project"**
3. Click **"Import Git Repository"** — select your `eliteprofessionals` repo
4. Vercel auto-detects Next.js — leave all settings as default
5. **Before clicking Deploy**, scroll to **"Environment Variables"** and add:

| Variable Name | Your Value |
|---|---|
| `JWT_SECRET` | A long random string — [generate one here](https://generate-secret.vercel.app/64) |
| `ADMIN_PASSWORD` | Your chosen admin password e.g. `EliteAdmin2026!` |
| `TELEGRAM_GROUP_LINK` | Your Telegram group invite link e.g. `https://t.me/+abc123` |
| `TELEGRAM_CHANNEL_LINK` | Your Telegram channel link e.g. `https://t.me/EliteProfessionals` |

6. Click **"Deploy"** — Vercel builds and deploys in ~60 seconds
7. Your site is live at `https://your-project-name.vercel.app`

---

### Step 4 — Set a Custom Domain (optional)

1. In Vercel dashboard → your project → **"Domains"**
2. Click **"Add"** → type your domain e.g. `eliteprofessionals.com`
3. Follow Vercel's DNS instructions (add A or CNAME records in your domain registrar)
4. SSL is automatic and free

---

### Step 5 — Access Your Admin Panel

Visit: `https://your-site.vercel.app/admin`

Enter the `ADMIN_PASSWORD` you set in Step 3. You'll see:
- All leads with full details (name, email, phone, industry, goal, IP, timestamp)
- Search and filter leads
- Stats breakdown by industry and goal
- Export all leads to CSV

---

## ⚠️ Important: Data Persistence on Vercel

By default this app uses **in-memory storage** which works great but **resets when Vercel's serverless functions cold-start** (typically after ~30 minutes of inactivity or on redeploy).

### For production use, add Vercel KV (free tier available):

1. In your Vercel project → **"Storage"** tab → **"Create Database"** → select **KV**
2. Vercel automatically adds `KV_REST_API_URL` and `KV_REST_API_TOKEN` to your env vars
3. Install the KV package:
   ```bash
   npm install @vercel/kv
   ```
4. Replace `src/lib/store.ts` with this persistent version:

```typescript
import { kv } from '@vercel/kv'
import type { Lead } from './store'

export const store = {
  async addLead(lead: Omit<Lead, 'id' | 'createdAt'>): Promise<Lead> {
    const id = `lead_${Date.now()}`
    const full = { ...lead, id, createdAt: new Date().toISOString() }
    await kv.hset('leads', { [id]: JSON.stringify(full) })
    await kv.incr('lead_count')
    return full
  },
  async getAllLeads(): Promise<Lead[]> {
    const all = await kv.hgetall('leads') || {}
    return Object.values(all).map(v => JSON.parse(v as string))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  },
  async getCount(): Promise<number> {
    return (await kv.get<number>('lead_count')) || 347
  },
  async emailExists(email: string): Promise<boolean> {
    const leads = await this.getAllLeads()
    return leads.some(l => l.email.toLowerCase() === email.toLowerCase())
  },
  async getStats() {
    const leads = await this.getAllLeads()
    const industries: Record<string,number> = {}
    const goals: Record<string,number> = {}
    leads.forEach(l => {
      industries[l.industry] = (industries[l.industry] || 0) + 1
      goals[l.goal] = (goals[l.goal] || 0) + 1
    })
    return { total: leads.length, today: leads.filter(l => l.createdAt.startsWith(new Date().toISOString().slice(0,10))).length, industries, goals }
  }
}
```

---

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Copy env template
cp .env.example .env.local
# Edit .env.local with your values

# Run dev server
npm run dev
# → http://localhost:3000

# Build for production
npm run build
npm start
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              ← Landing page
│   ├── signup/page.tsx       ← Account creation form
│   ├── welcome/page.tsx      ← Post-signup Telegram links
│   ├── admin/page.tsx        ← Admin dashboard
│   ├── layout.tsx            ← Root layout + SEO metadata
│   └── api/
│       ├── register/route.ts ← Save new lead
│       ├── login/route.ts    ← Admin auth
│       ├── leads/route.ts    ← Public count
│       └── admin/
│           ├── leads/route.ts  ← Get all leads
│           └── export/route.ts ← CSV export
└── lib/
    ├── store.ts              ← Data layer (swap for KV in production)
    ├── auth.ts               ← JWT helper
    └── styles.ts             ← Shared style constants
```

---

## 🔒 Security Notes

- Admin password is checked server-side, never exposed to the browser
- Admin sessions use HttpOnly JWT cookies (can't be stolen by JS)
- All admin API routes verify the JWT on every request
- Set a strong `ADMIN_PASSWORD` and long random `JWT_SECRET` in production

---

*EliteProfessionals © 2026 — Excellence, Growth, Collaboration, Execution.*
