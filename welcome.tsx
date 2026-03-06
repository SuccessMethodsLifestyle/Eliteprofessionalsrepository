‘use client’
import { useEffect, useState } from ‘react’
import { useRouter } from ‘next/navigation’

export default function WelcomePage() {
const router = useRouter()
const [show, setShow] = useState(false)
const groupLink = process.env.NEXT_PUBLIC_TELEGRAM_GROUP_LINK || ‘https://t.me/+your_group_invite_code’
const channelLink = process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL_LINK || ‘https://t.me/EliteProfessionals’

useEffect(() => { setTimeout(() => setShow(true), 100) }, [])

return (
<>
<style>{`
@import url(‘https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap’);
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html,body{min-height:100%;background:#060607;color:#f4f0e8;font-family:‘DM Sans’,sans-serif;font-weight:300;overflow-x:hidden}
body::after{content:’’;position:fixed;inset:-200%;width:400%;height:400%;
background-image:url(“data:image/svg+xml,%3Csvg xmlns=‘http://www.w3.org/2000/svg’%3E%3Cfilter id=‘n’%3E%3CfeTurbulence type=‘fractalNoise’ baseFrequency=‘0.75’ numOctaves=‘4’ stitchTiles=‘stitch’/%3E%3C/filter%3E%3Crect width=‘100%25’ height=‘100%25’ filter=‘url(%23n)’ opacity=‘0.028’/%3E%3C/svg%3E”);
pointer-events:none;z-index:9999;animation:grain .5s steps(2) infinite}
@keyframes grain{0%,100%{transform:translate(0,0)}25%{transform:translate(-1%,-1%)}50%{transform:translate(1%,0)}75%{transform:translate(0,1%)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
@keyframes pop{0%{transform:scale(.4);opacity:0}70%{transform:scale(1.12)}100%{transform:scale(1);opacity:1}}
@keyframes shimmer{0%{background-position:200% center}100%{background-position:-200% center}}
.glow{position:fixed;top:-20vh;left:50%;transform:translateX(-50%);width:900px;height:600px;pointer-events:none;z-index:0;
background:radial-gradient(ellipse at 50% 0%, rgba(240,165,0,0.1) 0%, transparent 65%)}
.wrap{position:relative;z-index:1;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:64px 24px 80px;max-width:600px;margin:0 auto;text-align:center}
.mark{width:64px;height:64px;border-radius:50%;border:1.5px solid #f0a500;display:flex;align-items:center;justify-content:center;font-size:1.6rem;margin:0 auto 28px;animation:pop .5s ease .1s both}
h2{font-family:‘Playfair Display’,serif;font-size:clamp(2rem,5vw,3.4rem);font-weight:900;line-height:1.1;margin-bottom:14px;animation:fadeUp .6s ease .2s both}
.sub{font-size:1rem;color:rgba(244,240,232,.45);line-height:1.7;max-width:440px;margin:0 auto 40px;animation:fadeUp .6s ease .3s both}
.sub strong{color:#f4f0e8;font-weight:500}

```
    .tg-cards{display:flex;flex-direction:column;gap:14px;width:100%;margin-bottom:36px;animation:fadeUp .6s ease .42s both}
    .tg-card{display:flex;align-items:center;gap:18px;background:rgba(255,255,255,.04);border:1px solid rgba(240,165,0,.18);border-radius:10px;padding:20px 24px;text-decoration:none;color:#f4f0e8;transition:background .2s,border-color .2s,transform .2s;position:relative;overflow:hidden}
    .tg-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,#f0a500,transparent);opacity:0;transition:opacity .2s}
    .tg-card:hover{background:rgba(240,165,0,.07);border-color:rgba(240,165,0,.35);transform:translateY(-2px)}
    .tg-card:hover::before{opacity:1}
    .tg-icon{font-size:1.8rem;flex-shrink:0}
    .tg-info{flex:1;text-align:left}
    .tg-label{font-size:.58rem;letter-spacing:.22em;text-transform:uppercase;color:#f0a500;font-weight:500;margin-bottom:4px}
    .tg-title{font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:700;margin-bottom:3px}
    .tg-desc{font-size:.74rem;color:rgba(244,240,232,.42);line-height:1.4}
    .tg-arrow{font-size:1.1rem;color:#f0a500;flex-shrink:0}

    .pack-box{background:rgba(240,165,0,.06);border:1px solid rgba(240,165,0,.22);border-radius:10px;padding:22px 24px;width:100%;animation:fadeUp .6s ease .54s both}
    .pack-top{font-size:.58rem;letter-spacing:.22em;text-transform:uppercase;color:#f0a500;font-weight:500;margin-bottom:10px}
    .pack-body{font-size:.84rem;color:rgba(244,240,232,.6);line-height:1.6}
    .pack-body strong{color:#f4f0e8;font-weight:500}
    .shine{display:inline-block;background:linear-gradient(90deg,#f0a500 0%,#ffbe3d 40%,#f0a500 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 3s linear infinite}
    .note{font-size:.65rem;color:rgba(244,240,232,.28);margin-top:20px;animation:fadeUp .6s ease .66s both;line-height:1.6}
  `}</style>

  <div className="glow" />
  <div className="wrap">
    <div className="mark">✦</div>
    <h2>You&apos;re officially <span className="shine">Elite.</span></h2>
    <p className="sub">
      Your <strong>Verified Insider Information Pack — March 2026</strong> is being sent to your inbox right now.<br />
      While you wait — join the community:
    </p>

    <div className="tg-cards">
      <a className="tg-card" href={groupLink} target="_blank" rel="noopener noreferrer">
        <div className="tg-icon">💬</div>
        <div className="tg-info">
          <div className="tg-label">Step 1 — Join the Community</div>
          <div className="tg-title">EliteProfessionals Group</div>
          <div className="tg-desc">Connect with 2,800+ ambitious professionals. Deals, insights, accountability.</div>
        </div>
        <div className="tg-arrow">→</div>
      </a>

      <a className="tg-card" href={channelLink} target="_blank" rel="noopener noreferrer">
        <div className="tg-icon">📡</div>
        <div className="tg-info">
          <div className="tg-label">Step 2 — Follow the Channel</div>
          <div className="tg-title">EliteProfessionals Channel</div>
          <div className="tg-desc">Daily insider tips, broadcast intelligence, and brand updates straight to you.</div>
        </div>
        <div className="tg-arrow">→</div>
      </a>
    </div>

    <div className="pack-box">
      <div className="pack-top">📦 Your pack is on its way</div>
      <div className="pack-body">
        Check your inbox (and spam folder) for the <strong>Verified Insider Information Pack — March 2026</strong>.<br />
        It should arrive within the next few minutes.
      </div>
    </div>

    <p className="note">
      Didn&apos;t get the email? Check your spam folder or <span style={{color:'rgba(240,165,0,.6)',cursor:'pointer'}} onClick={()=>router.push('/')}>return to the homepage</span>.
    </p>
  </div>
</>
```

)
}