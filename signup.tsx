‘use client’
import { useState } from ‘react’
import { useRouter, useSearchParams } from ‘next/navigation’
import { Suspense } from ‘react’

const INDUSTRIES = [
‘Finance & Investment’, ‘Technology & Startups’, ‘Consulting & Strategy’,
‘Law & Compliance’, ‘Healthcare & Life Sciences’, ‘Marketing & Growth’,
‘Real Estate & Development’, ‘Entrepreneurship’, ‘Other’
]
const GOALS = [
‘Expand my network’, ‘Find clients or deals’, ‘Mentorship & guidance’,
‘Career advancement’, ‘Business partnerships’, ‘Knowledge & insights’
]

function SignupForm() {
const router = useRouter()
const params = useSearchParams()
const ref = params.get(‘ref’)

const [form, setForm] = useState({ firstName:’’, lastName:’’, email:’’, phone:’’, industry:’’, goal:’’ })
const [errors, setErrors] = useState<Record<string,string>>({})
const [loading, setLoading] = useState(false)
const [serverErr, setServerErr] = useState(’’)

const set = (k: string, v: string) => {
setForm(f => ({ …f, [k]: v }))
setErrors(e => ({ …e, [k]: ‘’ }))
setServerErr(’’)
}

const validate = () => {
const e: Record<string,string> = {}
if (!form.firstName.trim()) e.firstName = ‘Required’
if (!form.lastName.trim()) e.lastName = ‘Required’
if (!/^[^\s@]+@[^\s@]+.[^\s@]+$/.test(form.email)) e.email = ‘Valid email required’
if (!form.industry) e.industry = ‘Select your industry’
if (!form.goal) e.goal = ‘Select your goal’
setErrors(e)
return Object.keys(e).length === 0
}

const submit = async () => {
if (!validate()) return
setLoading(true)
try {
const res = await fetch(’/api/register’, {
method: ‘POST’,
headers: { ‘Content-Type’: ‘application/json’ },
body: JSON.stringify({ …form, ref }),
})
const data = await res.json()
if (!res.ok) { setServerErr(data.error || ‘Something went wrong.’); setLoading(false); return }
router.push(’/welcome’)
} catch {
setServerErr(‘Network error. Please try again.’)
setLoading(false)
}
}

return (
<>
<style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap'); *,*::before,*::after{box-sizing:border-box;margin:0;padding:0} html,body{min-height:100%;background:#060607;color:#f4f0e8;font-family:'DM Sans',sans-serif;font-weight:300;overflow-x:hidden} body::after{content:'';position:fixed;inset:-200%;width:400%;height:400%; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.028'/%3E%3C/svg%3E"); pointer-events:none;z-index:9999;animation:grain .5s steps(2) infinite} @keyframes grain{0%,100%{transform:translate(0,0)}25%{transform:translate(-1%,-1%)}50%{transform:translate(1%,0)}75%{transform:translate(0,1%)}} @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}} .fu{animation:fadeUp .55s ease both} .d1{animation-delay:.06s}.d2{animation-delay:.14s}.d3{animation-delay:.22s}.d4{animation-delay:.3s}.d5{animation-delay:.38s}.d6{animation-delay:.46s}.d7{animation-delay:.54s} .glow{position:fixed;top:-20vh;left:50%;transform:translateX(-50%);width:900px;height:600px;pointer-events:none;z-index:0; background:radial-gradient(ellipse at 50% 0%, rgba(240,165,0,0.07) 0%, transparent 65%)} .wrap{position:relative;z-index:1;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:64px 24px 80px;max-width:580px;margin:0 auto} .back{align-self:flex-start;font-size:.72rem;color:rgba(244,240,232,.4);cursor:pointer;border:none;background:none;padding:0 0 24px;transition:color .2s;letter-spacing:.04em} .back:hover{color:#f0a500} .step{font-size:.6rem;letter-spacing:.25em;text-transform:uppercase;color:#f0a500;font-weight:500;margin-bottom:12px} h2{font-family:'Playfair Display',serif;font-size:clamp(1.9rem,5vw,3rem);font-weight:900;line-height:1.1;margin-bottom:10px} .sub{font-size:.88rem;color:rgba(244,240,232,.42);margin-bottom:32px;line-height:1.6} .card{background:rgba(255,255,255,.03);border:1px solid rgba(240,165,0,.16);border-radius:10px;padding:32px;width:100%;position:relative;overflow:hidden} .card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,#f0a500,transparent)} .grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px} .field{display:flex;flex-direction:column;gap:6px} label{font-size:.58rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(244,240,232,.42);font-weight:500} input,select{width:100%;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:6px;padding:13px 15px;color:#f4f0e8;font-family:'DM Sans',sans-serif;font-size:.84rem;font-weight:300;outline:none;transition:border-color .2s,background .2s;appearance:none;-webkit-appearance:none} input::placeholder{color:rgba(244,240,232,.2)} input:focus,select:focus{border-color:rgba(240,165,0,.45);background:rgba(255,255,255,.07)} input.err,select.err{border-color:rgba(224,82,82,.55)} select{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%237a7570'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 14px center;cursor:pointer} select option{background:#111;color:#f4f0e8} .emsg{font-size:.6rem;color:#e05252;min-height:14px} .full{grid-column:1/-1} .srv-err{background:rgba(224,82,82,.1);border:1px solid rgba(224,82,82,.3);border-radius:6px;padding:11px 16px;font-size:.78rem;color:#e05252;margin-bottom:18px;text-align:center} .consent{display:flex;align-items:flex-start;gap:10px;margin:18px 0 22px} .consent input[type=checkbox]{width:14px;height:14px;flex-shrink:0;margin-top:3px;accent-color:#f0a500;cursor:pointer} .consent-txt{font-size:.65rem;color:rgba(244,240,232,.38);line-height:1.6} .btn{background:#f0a500;color:#000;border:none;border-radius:8px;padding:16px 28px;font-family:'DM Sans',sans-serif;font-size:.88rem;font-weight:600;letter-spacing:.03em;cursor:pointer;width:100%;transition:background .2s,transform .15s} .btn:hover:not(:disabled){background:#ffbe3d;transform:translateY(-1px)} .btn:disabled{opacity:.45;cursor:not-allowed} @media(max-width:480px){.grid{grid-template-columns:1fr}.card{padding:22px 18px}}`}</style>

```
  <div className="glow" />
  <div className="wrap">
    <button className="back fu d1" onClick={() => router.push('/')}>← Back</button>

    <div className="step fu d2">Step 1 of 1 — Create Your Account</div>
    <h2 className="fu d3">Almost there.</h2>
    <p className="sub fu d4">Fill in your details and your Insider Pack drops instantly.</p>

    <div className="card fu d5">
      {serverErr && <div className="srv-err">{serverErr}</div>}

      <div className="grid">
        <div className="field">
          <label>First Name</label>
          <input className={errors.firstName?'err':''} placeholder="Jane" value={form.firstName} onChange={e=>set('firstName',e.target.value)} />
          <span className="emsg">{errors.firstName}</span>
        </div>
        <div className="field">
          <label>Last Name</label>
          <input className={errors.lastName?'err':''} placeholder="Smith" value={form.lastName} onChange={e=>set('lastName',e.target.value)} />
          <span className="emsg">{errors.lastName}</span>
        </div>
        <div className="field full">
          <label>Email Address</label>
          <input type="email" className={errors.email?'err':''} placeholder="jane@example.com" value={form.email} onChange={e=>set('email',e.target.value)} />
          <span className="emsg">{errors.email}</span>
        </div>
        <div className="field full">
          <label>Phone Number <span style={{color:'rgba(244,240,232,.25)',fontStyle:'italic',letterSpacing:0}}>optional</span></label>
          <input type="tel" placeholder="+44 7700 000000" value={form.phone} onChange={e=>set('phone',e.target.value)} />
        </div>
        <div className="field">
          <label>Your Industry</label>
          <select className={errors.industry?'err':''} value={form.industry} onChange={e=>set('industry',e.target.value)}>
            <option value="" disabled>Select industry</option>
            {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
          </select>
          <span className="emsg">{errors.industry}</span>
        </div>
        <div className="field">
          <label>Primary Goal</label>
          <select className={errors.goal?'err':''} value={form.goal} onChange={e=>set('goal',e.target.value)}>
            <option value="" disabled>Select goal</option>
            {GOALS.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
          <span className="emsg">{errors.goal}</span>
        </div>
      </div>

      <div className="consent">
        <input type="checkbox" id="consent" defaultChecked />
        <label htmlFor="consent" className="consent-txt">
          I agree to receive the Insider Pack and occasional updates from EliteProfessionals. I can unsubscribe at any time.
        </label>
      </div>

      <button className="btn" disabled={loading} onClick={submit}>
        {loading ? 'Creating your account…' : 'Get My Insider Pack →'}
      </button>
    </div>
  </div>
</>
```

)
}

export default function SignupPage() {
return <Suspense><SignupForm /></Suspense>
}