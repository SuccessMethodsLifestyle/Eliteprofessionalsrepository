‘use client’
import { useState, useEffect } from ‘react’
import { useRouter } from ‘next/navigation’

export default function LandingPage() {
const router = useRouter()
const [count, setCount] = useState(347)
const spotsTotal = 400
const spotsLeft = Math.max(spotsTotal - count, 8)
const pct = Math.min(Math.round((count / spotsTotal) * 100), 97)

useEffect(() => {
fetch(’/api/leads’).then(r => r.json()).then(d => { if (d.count) setCount(d.count) }).catch(() => {})
const iv = setInterval(() => {
if (Math.random() < 0.3) setCount(c => c + 1)
}, 35000)
return () => clearInterval(iv)
}, [])

return (
<>
<style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap'); *,*::before,*::after{box-sizing:border-box;margin:0;padding:0} html,body{min-height:100%;background:#060607;color:#f4f0e8;font-family:'DM Sans',sans-serif;font-weight:300;overflow-x:hidden} body::after{content:'';position:fixed;inset:-200%;width:400%;height:400%; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.028'/%3E%3C/svg%3E"); pointer-events:none;z-index:9999;animation:grain .5s steps(2) infinite} @keyframes grain{0%,100%{transform:translate(0,0)}25%{transform:translate(-1%,-1%)}50%{transform:translate(1%,0)}75%{transform:translate(0,1%)}} @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}} @keyframes blink{0%,100%{opacity:1}50%{opacity:.3}} @keyframes barIn{from{width:0}to{width:${pct}%}} .fu{animation:fadeUp .6s ease both} .d1{animation-delay:.08s}.d2{animation-delay:.2s}.d3{animation-delay:.32s}.d4{animation-delay:.44s}.d5{animation-delay:.56s}.d6{animation-delay:.68s} .glow{position:fixed;top:-20vh;left:50%;transform:translateX(-50%);width:900px;height:600px;pointer-events:none;z-index:0; background:radial-gradient(ellipse at 50% 0%, rgba(240,165,0,0.08) 0%, transparent 65%)} .wrap{position:relative;z-index:1;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:64px 24px 80px;max-width:660px;margin:0 auto} .badge{display:inline-flex;align-items:center;gap:8px;border:1px solid rgba(240,165,0,0.22);background:rgba(240,165,0,0.11);border-radius:100px;padding:6px 16px 6px 8px;margin-bottom:36px} .bdot{width:7px;height:7px;border-radius:50%;background:#f0a500;animation:blink 1.8s ease-in-out infinite} .btxt{font-size:.67rem;letter-spacing:.12em;text-transform:uppercase;color:#f0a500;font-weight:500} h1{font-family:'Playfair Display',serif;font-size:clamp(2.5rem,6.5vw,4.8rem);font-weight:900;line-height:1.06;text-align:center;margin-bottom:18px} h1 em{font-style:italic;color:#f0a500;display:block} .sub{font-size:clamp(.95rem,2.2vw,1.1rem);color:rgba(244,240,232,.42);text-align:center;line-height:1.68;max-width:480px;margin-bottom:40px} .sub strong{color:#f4f0e8;font-weight:500} .card{background:rgba(255,255,255,.03);border:1px solid rgba(240,165,0,.18);border-radius:10px;padding:28px;width:100%;position:relative;overflow:hidden;margin-bottom:32px} .card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,#f0a500,transparent)} .clabel{font-size:.6rem;letter-spacing:.25em;text-transform:uppercase;color:#f0a500;font-weight:500;margin-bottom:12px} .ctitle{font-family:'Playfair Display',serif;font-size:1.28rem;font-weight:700;margin-bottom:16px} .items{display:flex;flex-direction:column;gap:10px} .item{display:flex;align-items:flex-start;gap:11px;font-size:.81rem;color:rgba(244,240,232,.76);line-height:1.45} .iicon{color:#f0a500;font-size:.72rem;margin-top:3px;flex-shrink:0} .itag{display:inline-block;background:rgba(240,165,0,.12);border:1px solid rgba(240,165,0,.28);border-radius:4px;padding:2px 7px;font-size:.56rem;letter-spacing:.12em;text-transform:uppercase;color:#ffbe3d;margin-left:6px;vertical-align:middle;font-weight:500} .urgency{display:flex;align-items:center;justify-content:center;gap:10px;margin-bottom:28px;width:100%} .ubar-wrap{flex:1;max-width:180px;height:4px;background:rgba(244,240,232,.07);border-radius:2px;overflow:hidden} .ubar{height:100%;background:linear-gradient(90deg,#f0a500,#ffbe3d);border-radius:2px;animation:barIn 1.4s ease .8s both;width:${pct}%} .utxt{font-size:.67rem;color:rgba(244,240,232,.42);letter-spacing:.05em;white-space:nowrap} .utxt strong{color:#ffbe3d;font-weight:500} .btn{background:#f0a500;color:#000;border:none;border-radius:8px;padding:17px 28px;font-family:'DM Sans',sans-serif;font-size:.88rem;font-weight:600;letter-spacing:.03em;cursor:pointer;width:100%;transition:background .2s,transform .15s;margin-bottom:12px} .btn:hover{background:#ffbe3d;transform:translateY(-1px)} .note{font-size:.62rem;color:rgba(244,240,232,.35);text-align:center;line-height:1.6} .faces{display:flex;margin-bottom:10px} .face{width:32px;height:32px;border-radius:50%;border:2px solid #060607;background:rgba(244,240,232,.07);margin-left:-8px;display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',serif;font-size:.75rem;color:#f0a500;font-weight:700} .face:first-child{margin-left:0} .ptxt{font-size:.68rem;color:rgba(244,240,232,.42);text-align:center;letter-spacing:.05em} .ptxt strong{color:#f4f0e8;font-weight:500} .proof{display:flex;flex-direction:column;align-items:center;gap:10px;margin-top:44px} @media(max-width:480px){h1{font-size:2.3rem}.card{padding:22px 18px}}`}</style>

```
  <div className="glow" />
  <div className="wrap">
    <div className="badge fu d1">
      <div className="bdot" />
      <span className="btxt">Available now · March 2026</span>
    </div>

    <h1 className="fu d2">
      The Pack That Insiders<br />
      <em>Don&apos;t Want You To Have</em>
    </h1>

    <p className="sub fu d3">
      <strong>EliteProfessionals Verified Insider Information Pack — March 2026.</strong><br />
      The exact intelligence, contacts, and strategies our top members are using right now. Delivered free the moment you create your account.
    </p>

    <div className="card fu d4">
      <div className="clabel">✦ What&apos;s Inside the Pack</div>
      <div className="ctitle">Verified Insider Information Pack<br />March 2026 Edition</div>
      <div className="items">
        {[
          { text: <>The <strong>5 industries</strong> our members are quietly pivoting into this quarter — before mainstream catches on</>, tag: 'Exclusive' },
          { text: <><strong>Verified deal flow &amp; opportunities</strong> curated from our network of 2,800+ professionals across 40 countries</>, tag: null },
          { text: <>The <strong>exact scripts &amp; frameworks</strong> top earners in our community use to close, pitch, and grow</>, tag: null },
          { text: <><strong>March 2026 market intelligence</strong> — what&apos;s moving, who&apos;s hiring, and where the money is going</>, tag: 'New' },
          { text: <>Instant access to the <strong>EliteProfessionals private Telegram</strong> — the conversation behind the pack</>, tag: null },
        ].map((item, i) => (
          <div className="item" key={i}>
            <span className="iicon">◆</span>
            <span>{item.text}{item.tag && <span className="itag">{item.tag}</span>}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="urgency fu d5">
      <span className="utxt"><strong>{count}</strong> claimed</span>
      <div className="ubar-wrap"><div className="ubar" /></div>
      <span className="utxt">Only <strong>{spotsLeft}</strong> left</span>
    </div>

    <div className="fu d6" style={{ width: '100%' }}>
      <button className="btn" onClick={() => router.push('/signup')}>
        Claim My Free Pack — Create Account →
      </button>
      <p className="note">Free. No credit card. Takes 60 seconds.</p>
    </div>

    <div className="proof fu" style={{ animationDelay: '.78s' }}>
      <div className="faces">
        {['A','K','R','M','J','+'].map((l,i) => <div className="face" key={i}>{l}</div>)}
      </div>
      <p className="ptxt">Joined by <strong>2,847 professionals</strong> across finance, tech, consulting &amp; more</p>
    </div>
  </div>
</>
```

)
}