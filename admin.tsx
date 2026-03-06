‘use client’
import { useState, useEffect, useCallback } from ‘react’

interface Lead {
id: string; firstName: string; lastName: string; email: string;
phone: string; industry: string; goal: string; ref: string|null; ip: string|null; createdAt: string;
}
interface Stats { total: number; today: number; industries: Record<string,number>; goals: Record<string,number>; }

export default function AdminPage() {
const [authed, setAuthed] = useState(false)
const [pw, setPw] = useState(’’)
const [loginErr, setLoginErr] = useState(’’)
const [logging, setLogging] = useState(false)
const [leads, setLeads] = useState<Lead[]>([])
const [stats, setStats] = useState<Stats|null>(null)
const [loading, setLoading] = useState(false)
const [search, setSearch] = useState(’’)
const [sortBy, setSortBy] = useState<‘createdAt’|‘firstName’|‘industry’>(‘createdAt’)
const [tab, setTab] = useState<‘leads’|‘stats’>(‘leads’)

const loadData = useCallback(async () => {
setLoading(true)
try {
const r = await fetch(’/api/admin/leads’)
if (r.status === 401) { setAuthed(false); return }
const d = await r.json()
setLeads(d.leads || [])
setStats(d.stats || null)
} finally { setLoading(false) }
}, [])

const login = async () => {
setLogging(true); setLoginErr(’’)
const r = await fetch(’/api/login’, { method:‘POST’, headers:{‘Content-Type’:‘application/json’}, body:JSON.stringify({password:pw}) })
if (r.ok) { setAuthed(true); loadData() }
else { const d = await r.json(); setLoginErr(d.error || ‘Invalid password.’) }
setLogging(false)
}

const filtered = leads
.filter(l => {
if (!search) return true
const q = search.toLowerCase()
return [l.firstName,l.lastName,l.email,l.industry,l.goal].some(v => v?.toLowerCase().includes(q))
})
.sort((a,b) => {
if (sortBy === ‘createdAt’) return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
if (sortBy === ‘firstName’) return a.firstName.localeCompare(b.firstName)
return a.industry.localeCompare(b.industry)
})

const topIndustry = stats ? Object.entries(stats.industries).sort((a,b)=>b[1]-a[1])[0] : null
const topGoal = stats ? Object.entries(stats.goals).sort((a,b)=>b[1]-a[1])[0] : null

if (!authed) return (
<>
<style>{loginStyles}</style>
<div className="glow" />
<div className="wrap">
<div className="logo">Elite<span>Professionals</span></div>
<div className="card">
<div className="card-top" />
<h2>Admin Panel</h2>
<p className="sub">Enter your admin password to continue.</p>
{loginErr && <div className="err-box">{loginErr}</div>}
<div className="field">
<label>Password</label>
<input type=“password” value={pw} onChange={e=>{setPw(e.target.value);setLoginErr(’’)}}
onKeyDown={e=>e.key===‘Enter’&&login()} placeholder=”••••••••” autoFocus />
</div>
<button className="btn" disabled={logging||!pw} onClick={login}>
{logging ? ‘Verifying…’ : ‘Access Dashboard →’}
</button>
</div>
</div>
</>
)

return (
<>
<style>{dashStyles}</style>
<div className="admin-wrap">
{/* SIDEBAR */}
<aside className="sidebar">
<div className="sidebar-logo">EP<span>Admin</span></div>
<nav className="nav">
<button className={`nav-item ${tab==='leads'?'active':''}`} onClick={()=>setTab(‘leads’)}>
<span>👥</span> Leads
</button>
<button className={`nav-item ${tab==='stats'?'active':''}`} onClick={()=>setTab(‘stats’)}>
<span>📊</span> Stats
</button>
</nav>
<div className="sidebar-foot">
<button className=“logout” onClick={()=>{ document.cookie=‘ep_admin=;Max-Age=0;path=/’; setAuthed(false) }}>
Sign out
</button>
</div>
</aside>

```
    {/* MAIN */}
    <main className="dash-main">
      {/* HEADER */}
      <div className="dash-header">
        <div>
          <h1 className="dash-title">{tab === 'leads' ? 'All Leads' : 'Analytics'}</h1>
          <p className="dash-sub">EliteProfessionals — March 2026</p>
        </div>
        <div className="header-actions">
          <button className="btn-refresh" onClick={loadData} disabled={loading}>
            {loading ? '⟳ Loading…' : '⟳ Refresh'}
          </button>
          <a className="btn-export" href="/api/admin/export" download>
            ↓ Export CSV
          </a>
        </div>
      </div>

      {tab === 'leads' && (
        <>
          {/* STAT CHIPS */}
          <div className="chips">
            <div className="chip"><span className="chip-n">{stats?.total ?? leads.length}</span><span className="chip-l">Total Leads</span></div>
            <div className="chip"><span className="chip-n">{stats?.today ?? 0}</span><span className="chip-l">Today</span></div>
            <div className="chip"><span className="chip-n">{topIndustry?.[0] ?? '—'}</span><span className="chip-l">Top Industry</span></div>
            <div className="chip"><span className="chip-n">{topGoal?.[0] ?? '—'}</span><span className="chip-l">Top Goal</span></div>
          </div>

          {/* SEARCH + SORT */}
          <div className="toolbar">
            <input className="search" placeholder="Search name, email, industry…" value={search} onChange={e=>setSearch(e.target.value)} />
            <select className="sort-sel" value={sortBy} onChange={e=>setSortBy(e.target.value as typeof sortBy)}>
              <option value="createdAt">Sort: Newest first</option>
              <option value="firstName">Sort: Name A→Z</option>
              <option value="industry">Sort: Industry</option>
            </select>
          </div>

          {/* TABLE */}
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>#</th><th>Name</th><th>Email</th><th>Phone</th>
                  <th>Industry</th><th>Goal</th><th>Ref</th><th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr><td colSpan={8} style={{textAlign:'center',padding:'40px',color:'rgba(244,240,232,.3)'}}>
                    {loading ? 'Loading leads…' : 'No leads yet.'}
                  </td></tr>
                )}
                {filtered.map((l, i) => (
                  <tr key={l.id}>
                    <td className="num">{i+1}</td>
                    <td className="name">{l.firstName} {l.lastName}</td>
                    <td><a href={`mailto:${l.email}`} className="email-link">{l.email}</a></td>
                    <td className="muted">{l.phone || '—'}</td>
                    <td><span className="tag">{l.industry}</span></td>
                    <td className="muted">{l.goal}</td>
                    <td className="muted">{l.ref || '—'}</td>
                    <td className="muted">{new Date(l.createdAt).toLocaleDateString('en-GB',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'})}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab === 'stats' && stats && (
        <div className="stats-grid">
          <div className="stat-section">
            <h3 className="section-title">By Industry</h3>
            {Object.entries(stats.industries).sort((a,b)=>b[1]-a[1]).map(([k,v]) => (
              <div className="bar-row" key={k}>
                <span className="bar-label">{k}</span>
                <div className="bar-track"><div className="bar-fill" style={{width:`${Math.round((v/stats.total)*100)}%`}} /></div>
                <span className="bar-val">{v}</span>
              </div>
            ))}
          </div>
          <div className="stat-section">
            <h3 className="section-title">By Goal</h3>
            {Object.entries(stats.goals).sort((a,b)=>b[1]-a[1]).map(([k,v]) => (
              <div className="bar-row" key={k}>
                <span className="bar-label">{k}</span>
                <div className="bar-track"><div className="bar-fill" style={{width:`${Math.round((v/stats.total)*100)}%`}} /></div>
                <span className="bar-val">{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  </div>
</>
```

)
}

const loginStyles = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap'); *,*::before,*::after{box-sizing:border-box;margin:0;padding:0} html,body{min-height:100%;background:#060607;color:#f4f0e8;font-family:'DM Sans',sans-serif;font-weight:300} .glow{position:fixed;top:-20vh;left:50%;transform:translateX(-50%);width:700px;height:500px;pointer-events:none;z-index:0;background:radial-gradient(ellipse at 50% 0%,rgba(240,165,0,0.07) 0%,transparent 65%)} .wrap{position:relative;z-index:1;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 24px;max-width:420px;margin:0 auto} .logo{font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:900;letter-spacing:.1em;color:#f0a500;margin-bottom:32px} .logo span{color:rgba(244,240,232,.45);font-weight:700} .card{background:rgba(255,255,255,.03);border:1px solid rgba(240,165,0,.16);border-radius:10px;padding:32px;width:100%;position:relative;overflow:hidden} .card-top{position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,#f0a500,transparent)} h2{font-family:'Playfair Display',serif;font-size:1.7rem;font-weight:900;margin-bottom:8px} .sub{font-size:.82rem;color:rgba(244,240,232,.4);margin-bottom:24px} .err-box{background:rgba(224,82,82,.1);border:1px solid rgba(224,82,82,.3);border-radius:6px;padding:10px 14px;font-size:.78rem;color:#e05252;margin-bottom:18px} .field{display:flex;flex-direction:column;gap:6px;margin-bottom:20px} label{font-size:.58rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(244,240,232,.4);font-weight:500} input{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:6px;padding:13px 15px;color:#f4f0e8;font-family:'DM Sans',sans-serif;font-size:.86rem;outline:none;transition:border-color .2s} input:focus{border-color:rgba(240,165,0,.45)} input::placeholder{color:rgba(244,240,232,.2)} .btn{background:#f0a500;color:#000;border:none;border-radius:7px;padding:14px 20px;font-family:'DM Sans',sans-serif;font-size:.85rem;font-weight:600;cursor:pointer;width:100%;transition:background .2s} .btn:hover:not(:disabled){background:#ffbe3d} .btn:disabled{opacity:.45;cursor:not-allowed}`

const dashStyles = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap'); *,*::before,*::after{box-sizing:border-box;margin:0;padding:0} html,body{height:100%;background:#060607;color:#f4f0e8;font-family:'DM Sans',sans-serif;font-weight:300;overflow-x:hidden} .admin-wrap{display:flex;min-height:100vh} .sidebar{width:220px;flex-shrink:0;background:#0a0a0c;border-right:1px solid rgba(240,165,0,.1);display:flex;flex-direction:column;padding:28px 0;position:sticky;top:0;height:100vh} .sidebar-logo{font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:900;color:#f0a500;padding:0 24px 32px;letter-spacing:.05em} .sidebar-logo span{color:rgba(244,240,232,.35)} .nav{display:flex;flex-direction:column;gap:4px;padding:0 12px;flex:1} .nav-item{background:none;border:none;color:rgba(244,240,232,.45);padding:10px 14px;border-radius:7px;font-family:'DM Sans',sans-serif;font-size:.82rem;cursor:pointer;text-align:left;display:flex;align-items:center;gap:9px;transition:background .15s,color .15s;font-weight:400} .nav-item:hover,.nav-item.active{background:rgba(240,165,0,.1);color:#f0a500} .sidebar-foot{padding:16px 24px} .logout{background:none;border:1px solid rgba(255,255,255,.07);color:rgba(244,240,232,.3);padding:8px 14px;border-radius:6px;font-family:'DM Sans',sans-serif;font-size:.72rem;cursor:pointer;transition:all .2s;width:100%} .logout:hover{border-color:rgba(224,82,82,.3);color:#e05252} .dash-main{flex:1;padding:36px 36px 60px;overflow:auto;min-width:0} .dash-header{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:28px;flex-wrap:wrap} .dash-title{font-family:'Playfair Display',serif;font-size:1.8rem;font-weight:900;line-height:1} .dash-sub{font-size:.72rem;color:rgba(244,240,232,.35);margin-top:5px;letter-spacing:.05em} .header-actions{display:flex;gap:10px} .btn-refresh{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);color:rgba(244,240,232,.6);padding:9px 16px;border-radius:6px;font-family:'DM Sans',sans-serif;font-size:.76rem;cursor:pointer;transition:all .2s} .btn-refresh:hover{border-color:rgba(240,165,0,.3);color:#f0a500} .btn-refresh:disabled{opacity:.4;cursor:not-allowed} .btn-export{background:#f0a500;color:#000;border:none;border-radius:6px;padding:9px 16px;font-family:'DM Sans',sans-serif;font-size:.76rem;font-weight:600;cursor:pointer;text-decoration:none;transition:background .2s} .btn-export:hover{background:#ffbe3d} .chips{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:24px} .chip{background:rgba(255,255,255,.03);border:1px solid rgba(240,165,0,.14);border-radius:8px;padding:16px 18px} .chip-n{display:block;font-family:'Playfair Display',serif;font-size:1.35rem;font-weight:700;color:#f0a500;margin-bottom:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis} .chip-l{font-size:.6rem;letter-spacing:.15em;text-transform:uppercase;color:rgba(244,240,232,.38)} .toolbar{display:flex;gap:12px;margin-bottom:16px;flex-wrap:wrap} .search{flex:1;min-width:200px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);border-radius:7px;padding:11px 14px;color:#f4f0e8;font-family:'DM Sans',sans-serif;font-size:.82rem;outline:none;transition:border-color .2s} .search:focus{border-color:rgba(240,165,0,.35)} .search::placeholder{color:rgba(244,240,232,.2)} .sort-sel{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);border-radius:7px;padding:11px 14px;color:rgba(244,240,232,.7);font-family:'DM Sans',sans-serif;font-size:.8rem;outline:none;cursor:pointer;appearance:none;-webkit-appearance:none} .sort-sel option{background:#111;color:#f4f0e8} .table-wrap{overflow-x:auto;border-radius:8px;border:1px solid rgba(240,165,0,.12)} table{width:100%;border-collapse:collapse;min-width:780px} thead{background:rgba(240,165,0,.06)} th{padding:11px 14px;text-align:left;font-size:.6rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(244,240,232,.42);font-weight:500;border-bottom:1px solid rgba(240,165,0,.12)} td{padding:12px 14px;font-size:.8rem;border-bottom:1px solid rgba(255,255,255,.04);vertical-align:middle} tr:last-child td{border-bottom:none} tr:hover td{background:rgba(240,165,0,.03)} .num{color:rgba(244,240,232,.3);font-size:.72rem} .name{font-weight:500;color:#f4f0e8} .email-link{color:#f0a500;text-decoration:none;font-size:.78rem} .email-link:hover{text-decoration:underline} .muted{color:rgba(244,240,232,.45);font-size:.77rem} .tag{display:inline-block;background:rgba(240,165,0,.1);border:1px solid rgba(240,165,0,.2);border-radius:4px;padding:2px 8px;font-size:.66rem;color:#f0a500;white-space:nowrap} .stats-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px} .stat-section{background:rgba(255,255,255,.03);border:1px solid rgba(240,165,0,.14);border-radius:10px;padding:24px} .section-title{font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:700;margin-bottom:20px;color:#f0a500} .bar-row{display:flex;align-items:center;gap:12px;margin-bottom:12px} .bar-label{font-size:.75rem;color:rgba(244,240,232,.6);width:160px;flex-shrink:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis} .bar-track{flex:1;height:6px;background:rgba(255,255,255,.06);border-radius:3px;overflow:hidden} .bar-fill{height:100%;background:linear-gradient(90deg,#f0a500,#ffbe3d);border-radius:3px;transition:width .8s ease} .bar-val{font-size:.75rem;color:#f0a500;font-weight:500;width:24px;text-align:right;flex-shrink:0} @media(max-width:900px){.sidebar{display:none}.dash-main{padding:24px 20px 60px}.chips{grid-template-columns:1fr 1fr}.stats-grid{grid-template-columns:1fr}} @media(max-width:600px){.chips{grid-template-columns:1fr 1fr}}`