// ========================================
// CRONOLABS - Premium Snippet Hub
// Vanilla JS Engine v2
// ========================================

// ------ i18n ------
const i18n = {
  it: {
    badge: "Marketplace Premium",
    heroTitle: 'I migliori <span>Snippet</span> per il tuo progetto.',
    heroSub: "Sfoglia la nostra collezione curata di componenti UI premium, animazioni fluide e layout professionali.",
    sectionTitle: "Marketplace",
    sectionDesc: "Sfoglia la nostra collezione curata di componenti premium.",
    all: "Tutti",
    free: "Gratis",
    premium: "Premium",
    preview: "Preview",
    sourceCode: "Codice Sorgente",
    locked: "Codice bloccato",
    paywallTitle: "Contenuto Premium",
    paywallDesc: "Sblocca il codice sorgente completo, con supporto prioritario e aggiornamenti futuri.",
    feat1: "Codice sorgente completo (HTML, CSS, JS)",
    feat2: "Licenza commerciale inclusa",
    feat3: "Aggiornamenti futuri gratuiti",
    oneTime: "pagamento unico",
    paypal: "Acquista con PayPal",
    secure: "Pagamento sicuro via PayPal",
    copy: "Copia",
    download: "Scarica ZIP",
    copied: "Copiato!",
    downloaded: "Download ZIP avviato!",
    devMode: "Modalita Dev",
    footer: 'Costruito con passione da <a href="#">Cronolabs</a>. Tutti i diritti riservati.',
    navMarketplace: "Marketplace",
    html: "HTML",
    css: "CSS",
    js: "JS",
    themeLight: "Chiaro",
    themeDark: "Scuro",
    themeSystem: "Sistema",
    categories: {
      "UI Widget": "Widget UI",
      "Animation": "Animazione",
      "Layout": "Layout",
      "Effect": "Effetto",
    }
  },
  en: {
    badge: "Premium Marketplace",
    heroTitle: 'The best <span>Snippets</span> for your project.',
    heroSub: "Browse our curated collection of premium UI components, fluid animations and professional layouts.",
    sectionTitle: "Marketplace",
    sectionDesc: "Browse our curated collection of premium components.",
    all: "All",
    free: "Free",
    premium: "Premium",
    preview: "Preview",
    sourceCode: "Source Code",
    locked: "Code locked",
    paywallTitle: "Premium Content",
    paywallDesc: "Unlock the full source code, with priority support and future updates.",
    feat1: "Full source code (HTML, CSS, JS)",
    feat2: "Commercial license included",
    feat3: "Free future updates",
    oneTime: "one-time payment",
    paypal: "Buy with PayPal",
    secure: "Secure payment via PayPal",
    copy: "Copy",
    download: "Download ZIP",
    copied: "Copied!",
    downloaded: "ZIP download started!",
    devMode: "Dev Mode",
    footer: 'Built with passion by <a href="#">Cronolabs</a>. All rights reserved.',
    navMarketplace: "Marketplace",
    html: "HTML",
    css: "CSS",
    js: "JS",
    themeLight: "Light",
    themeDark: "Dark",
    themeSystem: "System",
    categories: {
      "UI Widget": "UI Widget",
      "Animation": "Animation",
      "Layout": "Layout",
      "Effect": "Effect",
    }
  }
};

let currentLang = "it";
function t(key) { return i18n[currentLang][key] || key; }
function tCat(cat) { return i18n[currentLang].categories[cat] || cat; }

// ------ THEME ------
let currentTheme = "system"; // "light" | "dark" | "system"

function getResolvedTheme() {
  if (currentTheme === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return currentTheme;
}
// ------ PAYPAL CHECKOUT ------
window.addEventListener('DOMContentLoaded', function () {
  if (window.paypal) {
    paypal.Buttons({
      style: {
        layout: 'vertical',
        color: 'gold',
        shape: 'rect',
        label: 'paypal'
      },
      createOrder: function (data, actions) {
        // Esempio: acquisto di un prodotto premium
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: '9.99', // Cambia valore secondo il prodotto
              currency_code: 'EUR'
            },
            description: 'Snippet Premium CronoLab'
          }]
        });
      },
      onApprove: function (data, actions) {
        return actions.order.capture().then(function (details) {
          // Invia orderID al backend per verifica
          fetch('/verify-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ orderID: data.orderID })
          })
          .then(res => res.json())
          .then(result => {
            if (result.status === 'COMPLETED') {
              showToast('Pagamento completato!');
              // Erogazione servizio, redirect, ecc.
            } else {
              showToast('Pagamento non valido.');
            }
          })
          .catch(() => showToast('Errore di verifica pagamento.'));
        });
      },
      onError: function (err) {
        showToast('Errore PayPal: ' + err);
      },
      onCancel: function (data) {
        showToast('Pagamento annullato.');
      }
    }).render('#paypal-button-container');
  }
});

function showToast(msg) {
  const toast = document.querySelector('.toast');
  if (toast) {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }
}

function applyTheme() {
  document.documentElement.setAttribute("data-theme", getResolvedTheme());
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = getResolvedTheme() === "dark" ? "#0a0a0f" : "#f2f2f7";
}

// Listen for system theme changes
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
  if (currentTheme === "system") applyTheme();
});

// ------ WIDGET DATABASE ------
const widgets = [
  // === FREE ===
  {
    id: 1,
    title: "iOS Switch",
    description: { it: "Toggle fluido con effetto sfocatura e animazione spring.", en: "Fluid toggle with blur effect and spring animation." },
    category: "UI Widget",
    price: 0, premium: false,
    html: `<div class="switch-demo">
  <label class="ios-switch">
    <input type="checkbox" checked>
    <span class="slider"></span>
  </label>
  <p class="switch-label">Attivo</p>
</div>`,
    css: `body { display:flex; align-items:center; justify-content:center; min-height:100vh; margin:0; background:#0a0a0f; font-family:system-ui; }
.switch-demo { text-align:center; }
.switch-label { color:#86868b; font-size:14px; margin-top:16px; font-weight:500; }
.ios-switch { position:relative; display:inline-block; width:56px; height:32px; }
.ios-switch input { opacity:0; width:0; height:0; }
.slider { position:absolute; inset:0; cursor:pointer; background:#39393d; border-radius:32px; transition:all .35s cubic-bezier(.34,1.56,.64,1); }
.slider::before { content:''; position:absolute; width:26px; height:26px; left:3px; bottom:3px; background:#fff; border-radius:50%; transition:all .35s cubic-bezier(.34,1.56,.64,1); box-shadow:0 2px 8px rgba(0,0,0,.3); }
input:checked + .slider { background:#30d158; }
input:checked + .slider::before { transform:translateX(24px); }`,
    js: `const input = document.querySelector('input');
const label = document.querySelector('.switch-label');
input.addEventListener('change', () => {
  label.textContent = input.checked ? 'Attivo' : 'Disattivo';
});`
  },
  {
    id: 2,
    title: "Magnetic Button",
    description: { it: "Pulsante che segue il cursore con effetto magnetico fluido.", en: "Button that follows the cursor with a fluid magnetic effect." },
    category: "UI Widget",
    price: 0, premium: false,
    html: `<div class="mag-wrapper"><button class="mag-btn" id="magBtn"><span>Hover me</span></button></div>`,
    css: `body { display:flex; align-items:center; justify-content:center; min-height:100vh; margin:0; background:#0a0a0f; font-family:system-ui; }
.mag-wrapper { padding:80px; display:flex; align-items:center; justify-content:center; }
.mag-btn { position:relative; padding:16px 40px; background:linear-gradient(135deg,#0a84ff,#5e5ce6); border:none; border-radius:16px; color:#fff; font-size:15px; font-weight:700; cursor:pointer; transition:transform .3s cubic-bezier(.34,1.56,.64,1), box-shadow .3s ease; }
.mag-btn:hover { box-shadow:0 8px 40px rgba(10,132,255,.35); }
.mag-btn span { display:block; position:relative; z-index:1; transition:transform .3s cubic-bezier(.34,1.56,.64,1); }`,
    js: `const btn = document.getElementById('magBtn');
const span = btn.querySelector('span');
btn.addEventListener('mousemove', e => {
  const r = btn.getBoundingClientRect();
  const x = e.clientX - r.left - r.width/2;
  const y = e.clientY - r.top - r.height/2;
  btn.style.transform = \`translate(\${x*.3}px, \${y*.3}px)\`;
  span.style.transform = \`translate(\${x*.1}px, \${y*.1}px)\`;
});
btn.addEventListener('mouseleave', () => { btn.style.transform=''; span.style.transform=''; });`
  },
  {
    id: 3,
    title: "Pulse Loader",
    description: { it: "Loader minimalista con impulsi concentrici animati.", en: "Minimal loader with animated concentric pulses." },
    category: "Animation",
    price: 0, premium: false,
    html: `<div class="loader"><span></span><span></span><span></span></div>`,
    css: `body { display:flex; align-items:center; justify-content:center; min-height:100vh; margin:0; background:#0a0a0f; }
.loader { position:relative; width:60px; height:60px; }
.loader span { position:absolute; inset:0; border-radius:50%; border:2px solid #0a84ff; opacity:0; animation:pulse-ring 1.8s ease-out infinite; }
.loader span:nth-child(2) { animation-delay:.4s; }
.loader span:nth-child(3) { animation-delay:.8s; }
@keyframes pulse-ring { 0% { transform:scale(.3); opacity:1; } 100% { transform:scale(1.2); opacity:0; } }`,
    js: ``
  },
  {
    id: 4,
    title: "Glassmorphism Card",
    description: { it: "Card con effetto vetro satinato e sfocatura avanzata.", en: "Card with frosted glass effect and advanced blur." },
    category: "UI Widget",
    price: 0, premium: false,
    html: `<div class="glass-card">
  <div class="glass-card__icon">&#9733;</div>
  <h3 class="glass-card__title">Glass Card</h3>
  <p class="glass-card__text">Beautiful frosted glass effect with deep blur.</p>
</div>
<div class="bg-blobs"><div class="blob b1"></div><div class="blob b2"></div></div>`,
    css: `body { display:flex; align-items:center; justify-content:center; min-height:100vh; margin:0; background:#0a0a0f; font-family:system-ui; overflow:hidden; }
.bg-blobs { position:fixed; inset:0; z-index:0; pointer-events:none; }
.blob { position:absolute; border-radius:50%; filter:blur(80px); }
.b1 { width:300px; height:300px; background:rgba(10,132,255,.3); top:20%; left:10%; }
.b2 { width:250px; height:250px; background:rgba(191,90,242,.25); bottom:10%; right:15%; }
.glass-card { position:relative; z-index:1; padding:32px; border-radius:24px; background:rgba(255,255,255,.06); backdrop-filter:blur(25px) saturate(180%); -webkit-backdrop-filter:blur(25px) saturate(180%); border:1px solid rgba(255,255,255,.1); max-width:280px; text-align:center; }
.glass-card__icon { font-size:32px; margin-bottom:12px; }
.glass-card__title { font-size:20px; font-weight:700; color:#f5f5f7; margin-bottom:8px; }
.glass-card__text { font-size:13px; color:#86868b; line-height:1.6; }`,
    js: ``
  },
  {
    id: 5,
    title: "Skeleton Loader",
    description: { it: "Placeholder animato per il caricamento di contenuti.", en: "Animated placeholder for content loading states." },
    category: "Animation",
    price: 0, premium: false,
    html: `<div class="skeleton-card">
  <div class="skel skel--avatar"></div>
  <div class="skel skel--line skel--w80"></div>
  <div class="skel skel--line skel--w60"></div>
  <div class="skel skel--block"></div>
</div>`,
    css: `body { display:flex; align-items:center; justify-content:center; min-height:100vh; margin:0; background:#0a0a0f; font-family:system-ui; }
.skeleton-card { width:280px; padding:24px; border-radius:20px; background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.08); }
.skel { background:linear-gradient(90deg, rgba(255,255,255,.04) 25%, rgba(255,255,255,.08) 50%, rgba(255,255,255,.04) 75%); background-size:200% 100%; animation:shimmer 1.5s ease-in-out infinite; border-radius:8px; }
.skel--avatar { width:48px; height:48px; border-radius:50%; margin-bottom:16px; }
.skel--line { height:12px; margin-bottom:10px; }
.skel--w80 { width:80%; }
.skel--w60 { width:60%; }
.skel--block { height:100px; margin-top:8px; }
@keyframes shimmer { 0% { background-position:200% 0; } 100% { background-position:-200% 0; } }`,
    js: ``
  },

  // === PREMIUM ===
  {
    id: 6,
    title: "Dynamic Island",
    description: { it: "Componente che si espande come il Dynamic Island di Apple.", en: "Component that fluidly expands like Apple's Dynamic Island." },
    category: "Animation",
    price: 9.99, premium: true,
    html: `<div class="island-wrapper">
  <div class="island" id="island">
    <div class="island__content">
      <div class="island__icon">&#9835;</div>
      <div class="island__info"><span class="island__title">Now Playing</span><span class="island__artist">Cronolabs Radio</span></div>
      <div class="island__wave"><span></span><span></span><span></span></div>
    </div>
  </div>
  <button class="island-toggle" id="islandToggle">Toggle</button>
</div>`,
    css: `body { display:flex; align-items:center; justify-content:center; min-height:100vh; margin:0; background:#0a0a0f; font-family:system-ui; }
.island-wrapper { text-align:center; }
.island { margin:0 auto; padding:8px 14px; min-width:120px; max-width:320px; background:#1c1c1e; border-radius:40px; transition:all .55s cubic-bezier(.34,1.56,.64,1); overflow:hidden; cursor:pointer; }
.island.expanded { padding:14px 20px; min-width:300px; border-radius:36px; }
.island__content { display:flex; align-items:center; gap:12px; opacity:0; max-height:0; transition:all .4s cubic-bezier(.34,1.56,.64,1); }
.island.expanded .island__content { opacity:1; max-height:60px; }
.island__icon { font-size:22px; color:#ff375f; }
.island__info { display:flex; flex-direction:column; text-align:left; }
.island__title { font-size:13px; font-weight:700; color:#f5f5f7; }
.island__artist { font-size:11px; color:#86868b; }
.island__wave { display:flex; gap:3px; align-items:flex-end; margin-left:auto; }
.island__wave span { width:3px; background:#ff375f; border-radius:2px; animation:wave-bar .8s ease-in-out infinite; }
.island__wave span:nth-child(1) { height:12px; animation-delay:0s; }
.island__wave span:nth-child(2) { height:18px; animation-delay:.15s; }
.island__wave span:nth-child(3) { height:10px; animation-delay:.3s; }
@keyframes wave-bar { 0%,100% { transform:scaleY(.5); } 50% { transform:scaleY(1); } }
.island-toggle { margin-top:28px; padding:10px 28px; border:1px solid rgba(255,255,255,.1); background:rgba(255,255,255,.05); color:#86868b; border-radius:20px; font-size:13px; font-weight:600; cursor:pointer; transition:all .25s ease; }
.island-toggle:hover { color:#f5f5f7; border-color:rgba(255,255,255,.2); }`,
    js: `const island = document.getElementById('island');
const btn = document.getElementById('islandToggle');
let expanded = false;
function toggle() { expanded=!expanded; island.classList.toggle('expanded',expanded); }
btn.addEventListener('click', toggle);
island.addEventListener('click', toggle);`
  },
  {
    id: 7,
    title: "Bento Dashboard",
    description: { it: "Layout completo per interfacce admin stile Apple.", en: "Complete layout for Apple-style admin interfaces." },
    category: "Layout",
    price: 14.99, premium: true,
    html: `<div class="bento">
  <div class="bento__card bento__card--wide"><div class="bento__label">Revenue</div><div class="bento__value">$48,290</div>
    <div class="bento__chart"><div class="bar" style="height:40%"></div><div class="bar" style="height:65%"></div><div class="bar" style="height:45%"></div><div class="bar" style="height:80%"></div><div class="bar" style="height:60%"></div><div class="bar" style="height:90%"></div><div class="bar active" style="height:75%"></div></div>
  </div>
  <div class="bento__card"><div class="bento__label">Users</div><div class="bento__value">12.4k</div><div class="bento__change up">+18.2%</div></div>
  <div class="bento__card"><div class="bento__label">Sessions</div><div class="bento__value">8.7k</div><div class="bento__change up">+7.4%</div></div>
  <div class="bento__card bento__card--wide"><div class="bento__label">Activity</div><div class="bento__dots"><span class="dot lg"></span><span class="dot md"></span><span class="dot sm"></span><span class="dot lg"></span><span class="dot md"></span><span class="dot sm"></span><span class="dot lg"></span></div></div>
</div>`,
    css: `body { display:flex; align-items:center; justify-content:center; min-height:100vh; margin:0; background:#0a0a0f; font-family:system-ui; }
.bento { display:grid; grid-template-columns:repeat(2,1fr); gap:12px; padding:16px; max-width:420px; width:100%; }
.bento__card { background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.08); border-radius:20px; padding:20px; }
.bento__card--wide { grid-column:span 2; }
.bento__label { font-size:12px; color:#86868b; font-weight:600; text-transform:uppercase; letter-spacing:.04em; }
.bento__value { font-size:28px; font-weight:800; color:#f5f5f7; margin-top:4px; letter-spacing:-.03em; }
.bento__change { font-size:13px; font-weight:600; margin-top:6px; }
.bento__change.up { color:#30d158; }
.bento__chart { display:flex; align-items:flex-end; gap:6px; height:60px; margin-top:14px; }
.bar { flex:1; background:rgba(10,132,255,.25); border-radius:4px; transition:background .3s; }
.bar.active { background:#0a84ff; }
.bento__dots { display:flex; gap:8px; align-items:center; margin-top:14px; flex-wrap:wrap; }
.dot { border-radius:50%; background:#5e5ce6; }
.dot.lg { width:24px; height:24px; }
.dot.md { width:16px; height:16px; opacity:.6; }
.dot.sm { width:10px; height:10px; opacity:.3; }`,
    js: ``
  },
  {
    id: 8,
    title: "Gradient Text Reveal",
    description: { it: "Testo che appare con animazione gradiente al caricamento.", en: "Text appearing with gradient animation on load." },
    category: "Effect",
    price: 4.99, premium: true,
    html: `<h1 class="reveal-text">Premium Gradient Text</h1>`,
    css: `body { display:flex; align-items:center; justify-content:center; min-height:100vh; margin:0; background:#0a0a0f; font-family:system-ui; }
.reveal-text { font-size:clamp(28px,6vw,52px); font-weight:800; letter-spacing:-.04em; background:linear-gradient(135deg,#0a84ff,#5e5ce6,#bf5af2,#ff375f); background-size:300% 300%; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; animation:gradient-shift 4s ease-in-out infinite, fade-up .8s cubic-bezier(.34,1.56,.64,1) both; }
@keyframes gradient-shift { 0%,100% { background-position:0% 50%; } 50% { background-position:100% 50%; } }
@keyframes fade-up { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }`,
    js: ``
  },
  {
    id: 9,
    title: "Floating Action Menu",
    description: { it: "Menu flottante con espansione radiale e animazioni spring.", en: "Floating menu with radial expansion and spring animations." },
    category: "UI Widget",
    price: 7.99, premium: true,
    html: `<div class="fab-container">
  <button class="fab" id="fab">+</button>
  <button class="fab-item" style="--i:1">&#9733;</button>
  <button class="fab-item" style="--i:2">&#9829;</button>
  <button class="fab-item" style="--i:3">&#9998;</button>
</div>`,
    css: `body { display:flex; align-items:center; justify-content:center; min-height:100vh; margin:0; background:#0a0a0f; font-family:system-ui; }
.fab-container { position:relative; width:56px; height:56px; }
.fab { width:56px; height:56px; border-radius:50%; background:linear-gradient(135deg,#0a84ff,#5e5ce6); border:none; color:#fff; font-size:28px; font-weight:300; cursor:pointer; z-index:2; position:relative; transition:transform .4s cubic-bezier(.34,1.56,.64,1), box-shadow .3s ease; box-shadow:0 4px 20px rgba(10,132,255,.3); }
.fab:hover { transform:scale(1.08); box-shadow:0 8px 30px rgba(10,132,255,.4); }
.fab.open { transform:rotate(45deg); }
.fab-item { position:absolute; width:44px; height:44px; border-radius:50%; background:rgba(255,255,255,.08); backdrop-filter:blur(12px); border:1px solid rgba(255,255,255,.12); color:#f5f5f7; font-size:18px; cursor:pointer; top:50%; left:50%; transform:translate(-50%,-50%) scale(0); opacity:0; transition:all .4s cubic-bezier(.34,1.56,.64,1); transition-delay:calc(var(--i) * 0.06s); }
.fab.open ~ .fab-item:nth-child(2) { transform:translate(-50%, calc(-50% - 70px)) scale(1); opacity:1; }
.fab.open ~ .fab-item:nth-child(3) { transform:translate(calc(-50% + 60px), calc(-50% - 40px)) scale(1); opacity:1; }
.fab.open ~ .fab-item:nth-child(4) { transform:translate(calc(-50% + 60px), calc(-50% + 30px)) scale(1); opacity:1; }
.fab-item:hover { background:rgba(255,255,255,.14); }`,
    js: `const fab = document.getElementById('fab');
fab.addEventListener('click', () => fab.classList.toggle('open'));`
  },
  {
    id: 10,
    title: "Animated Counter",
    description: { it: "Contatore numerico con animazione fluida incrementale.", en: "Numeric counter with smooth incremental animation." },
    category: "Animation",
    price: 0, premium: false,
    html: `<div class="counter-box">
  <div class="counter" id="counter">0</div>
  <p class="counter-label">Active Users</p>
</div>`,
    css: `body { display:flex; align-items:center; justify-content:center; min-height:100vh; margin:0; background:#0a0a0f; font-family:system-ui; }
.counter-box { text-align:center; padding:40px; border-radius:24px; background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.08); }
.counter { font-size:64px; font-weight:800; color:#f5f5f7; letter-spacing:-.04em; font-variant-numeric:tabular-nums; }
.counter-label { font-size:14px; color:#86868b; margin-top:8px; font-weight:500; }`,
    js: `const el = document.getElementById('counter');
const target = 12847;
const duration = 2000;
let start = null;
function animate(ts) {
  if (!start) start = ts;
  const progress = Math.min((ts - start) / duration, 1);
  const eased = 1 - Math.pow(1 - progress, 3);
  el.textContent = Math.floor(eased * target).toLocaleString();
  if (progress < 1) requestAnimationFrame(animate);
}
requestAnimationFrame(animate);`
  },
  {
    id: 11,
    title: "Notification Stack",
    description: { it: "Stack di notifiche con animazioni stagger e gestione dismiss.", en: "Notification stack with stagger animations and dismiss handling." },
    category: "Layout",
    price: 12.99, premium: true,
    html: `<div class="notif-stack" id="stack">
  <div class="notif"><div class="notif__dot"></div><div class="notif__body"><strong>New message</strong><span>Hey, check this out!</span></div><button class="notif__close">&times;</button></div>
  <div class="notif"><div class="notif__dot notif__dot--warn"></div><div class="notif__body"><strong>Update available</strong><span>v2.1 is ready</span></div><button class="notif__close">&times;</button></div>
  <div class="notif"><div class="notif__dot notif__dot--success"></div><div class="notif__body"><strong>Saved</strong><span>Changes synced</span></div><button class="notif__close">&times;</button></div>
</div>`,
    css: `body { display:flex; align-items:flex-start; justify-content:center; padding-top:60px; min-height:100vh; margin:0; background:#0a0a0f; font-family:system-ui; }
.notif-stack { display:flex; flex-direction:column; gap:10px; width:320px; }
.notif { display:flex; align-items:center; gap:12px; padding:14px 16px; border-radius:16px; background:rgba(255,255,255,.05); backdrop-filter:blur(20px); border:1px solid rgba(255,255,255,.08); animation:notif-in .5s cubic-bezier(.34,1.56,.64,1) both; }
.notif:nth-child(2) { animation-delay:.1s; }
.notif:nth-child(3) { animation-delay:.2s; }
@keyframes notif-in { from { opacity:0; transform:translateX(-20px) scale(.95); } to { opacity:1; transform:translateX(0) scale(1); } }
.notif__dot { width:10px; height:10px; border-radius:50%; background:#0a84ff; flex-shrink:0; }
.notif__dot--warn { background:#ff9f0a; }
.notif__dot--success { background:#30d158; }
.notif__body { flex:1; display:flex; flex-direction:column; gap:2px; }
.notif__body strong { font-size:13px; color:#f5f5f7; }
.notif__body span { font-size:11px; color:#86868b; }
.notif__close { background:none; border:none; color:#48484a; font-size:18px; cursor:pointer; padding:4px; transition:color .2s; }
.notif__close:hover { color:#f5f5f7; }`,
    js: `document.querySelectorAll('.notif__close').forEach(btn => {
  btn.addEventListener('click', () => {
    const n = btn.closest('.notif');
    n.style.transition = 'all .3s ease';
    n.style.opacity = '0';
    n.style.transform = 'translateX(40px) scale(.95)';
    setTimeout(() => n.remove(), 300);
  });
});`
  },
  {
    id: 12,
    title: "Blur Tabs",
    description: { it: "Barra di navigazione a tab con sfocatura e transizione fluida.", en: "Tab navigation bar with blur effect and fluid transition." },
    category: "UI Widget",
    price: 5.99, premium: true,
    html: `<div class="blur-tabs">
  <button class="blur-tab active">General</button>
  <button class="blur-tab">Profile</button>
  <button class="blur-tab">Settings</button>
  <div class="blur-tab__indicator"></div>
</div>`,
    css: `body { display:flex; align-items:center; justify-content:center; min-height:100vh; margin:0; background:#0a0a0f; font-family:system-ui; }
.blur-tabs { position:relative; display:inline-flex; gap:4px; padding:4px; border-radius:16px; background:rgba(255,255,255,.04); backdrop-filter:blur(20px); border:1px solid rgba(255,255,255,.08); }
.blur-tab { position:relative; z-index:1; padding:10px 22px; border:none; background:none; color:#86868b; font-size:14px; font-weight:600; cursor:pointer; border-radius:12px; transition:color .3s ease; }
.blur-tab.active { color:#fff; }
.blur-tab__indicator { position:absolute; top:4px; left:4px; height:calc(100% - 8px); border-radius:12px; background:rgba(10,132,255,.8); backdrop-filter:blur(8px); transition:all .35s cubic-bezier(.34,1.56,.64,1); z-index:0; pointer-events:none; }`,
    js: `const tabs = document.querySelectorAll('.blur-tab');
const indicator = document.querySelector('.blur-tab__indicator');
function updateIndicator(tab) {
  indicator.style.width = tab.offsetWidth + 'px';
  indicator.style.left = tab.offsetLeft + 'px';
}
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    updateIndicator(tab);
  });
});
updateIndicator(document.querySelector('.blur-tab.active'));`
  }
];

// ------ STATE ------
let activeFilter = "All";
let isDevUnlocked = false;
let currentWidget = null;
let modalTab = "preview";
let codeTab = "html";

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ------ INIT ------
document.addEventListener("DOMContentLoaded", () => {
  applyTheme();
  renderAll();
  setupParallax();
  setupDevBackdoor();
  setupLangToggle();
  setupThemeToggle();
});

function renderAll() {
  renderNavbar();
  renderHero();
  renderFilters();
  renderGrid();
  renderFooter();
}

// ------ PARALLAX ------
function setupParallax() {
  let ticking = false;
  document.addEventListener("mousemove", (e) => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      document.querySelectorAll(".bg-orb").forEach((orb, i) => {
        const f = (i + 1) * 10;
        orb.style.transform = `translate(${x * f}px, ${y * f}px)`;
      });
      ticking = false;
    });
  });
}

// ------ DEV BACKDOOR ------
function setupDevBackdoor() {
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key.toLowerCase() === "h") {
      e.preventDefault();
      isDevUnlocked = !isDevUnlocked;
      const indicator = $(".dev-indicator");
      if (indicator) indicator.classList.toggle("visible", isDevUnlocked);
      if (currentWidget) openModal(currentWidget, modalTab);
    }
  });
}

// ------ LANGUAGE ------
function setupLangToggle() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".lang-btn");
    if (btn) {
      currentLang = btn.dataset.lang;
      renderAll();
      if (currentWidget) {
        const overlay = $(".modal-overlay");
        if (overlay && overlay.classList.contains("open")) openModal(currentWidget, modalTab);
      }
    }
  });
}

// ------ THEME ------
function setupThemeToggle() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".theme-btn");
    if (btn) {
      currentTheme = btn.dataset.theme;
      applyTheme();
      renderNavbar();
    }
  });
}

// ------ NAVBAR ------
function renderNavbar() {
  const nav = $(".navbar");
  if (!nav) return;
  const link = nav.querySelector(".navbar__link");
  if (link) link.textContent = t("navMarketplace");

  // Language
  nav.querySelectorAll(".lang-btn").forEach(b => b.classList.toggle("active", b.dataset.lang === currentLang));

  // Theme buttons
  nav.querySelectorAll(".theme-btn").forEach(b => b.classList.toggle("active", b.dataset.theme === currentTheme));
}

// ------ HERO ------
function renderHero() {
  const hero = $(".hero");
  if (!hero) return;
  hero.querySelector(".hero__badge").innerHTML = t("badge");
  hero.querySelector(".hero__title").innerHTML = t("heroTitle");
  hero.querySelector(".hero__subtitle").textContent = t("heroSub");
}

// ------ FILTERS ------
function renderFilters() {
  const container = $(".filters");
  if (!container) return;
  const categories = ["All", "UI Widget", "Animation", "Layout", "Effect"];
  container.innerHTML = categories.map(cat => {
    const label = cat === "All" ? t("all") : tCat(cat);
    return `<button class="filter-pill${activeFilter === cat ? " active" : ""}" data-cat="${cat}">${label}</button>`;
  }).join("");

  container.querySelectorAll(".filter-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      activeFilter = pill.dataset.cat;
      renderFilters();
      renderGrid();
    });
  });
}

// ------ BENTO GRID ------
function renderGrid() {
  const grid = $(".bento-grid");
  if (!grid) return;

  const filtered = activeFilter === "All" ? widgets : widgets.filter(w => w.category === activeFilter);

  grid.innerHTML = filtered.map(w => {
    const desc = typeof w.description === "object" ? w.description[currentLang] : w.description;
    const priceLabel = w.premium
      ? `<span class="bento-card__price bento-card__price--premium">$${w.price.toFixed(2)}</span>`
      : `<span class="bento-card__price bento-card__price--free">${t("free")}</span>`;
    const premiumBadge = w.premium
      ? `<div class="bento-card__premium-badge">&#9733; ${t("premium")}</div>`
      : "";

    return `
      <div class="bento-card" data-id="${w.id}">
        <div class="bento-card__preview">
          ${premiumBadge}
          <iframe srcdoc="${escapeAttr(buildSrcdoc(w))}" sandbox="allow-scripts" loading="lazy"></iframe>
        </div>
        <div class="bento-card__body">
          <div class="bento-card__category">${tCat(w.category)}</div>
          <div class="bento-card__title">${w.title}</div>
          <div class="bento-card__desc">${desc}</div>
          <div class="bento-card__footer">
            ${priceLabel}
            <div class="bento-card__actions">
              <button class="bento-card__btn bento-card__btn--preview" data-action="preview" data-id="${w.id}">&#9655; ${t("preview")}</button>
              <button class="bento-card__btn bento-card__btn--source" data-action="source" data-id="${w.id}">&#60;/&#62; ${t("sourceCode")}</button>
            </div>
          </div>
        </div>
      </div>`;
  }).join("");

  grid.querySelectorAll(".bento-card__btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      const widget = widgets.find(w => w.id === id);
      if (widget) openModal(widget, btn.dataset.action);
    });
  });

  grid.querySelectorAll(".bento-card").forEach(card => {
    card.addEventListener("click", (e) => {
      if (e.target.closest(".bento-card__btn")) return;
      const id = parseInt(card.dataset.id);
      const widget = widgets.find(w => w.id === id);
      if (widget) openModal(widget, "preview");
    });
  });
}

// ------ SRCDOC ------
function buildSrcdoc(w) {
  return `<!DOCTYPE html><html><head><style>${w.css}</style></head><body>${w.html}<script>${w.js}<\/script></body></html>`;
}
function escapeAttr(str) {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function escapeHTML(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ------ MODAL ------
function openModal(widget, tab) {
  currentWidget = widget;
  modalTab = tab || "preview";
  codeTab = "html";

  const overlay = $(".modal-overlay");
  const isFreeAccess = !widget.premium || isDevUnlocked;

  let badgeHTML = "";
  if (isDevUnlocked) {
    badgeHTML = `<span class="modal__header-badge modal__header-badge--dev">&#9881; ${t("devMode")}</span>`;
  } else if (widget.premium) {
    badgeHTML = `<span class="modal__header-badge modal__header-badge--premium">&#9733; $${widget.price.toFixed(2)}</span>`;
  } else {
    badgeHTML = `<span class="modal__header-badge modal__header-badge--free">${t("free")}</span>`;
  }

  const sourceTabLabel = isFreeAccess
    ? `<span class="modal__tab-icon">&#60;/&#62;</span>${t("sourceCode")}`
    : `<span class="modal__tab-icon">&#60;/&#62;</span>${t("sourceCode")}<span class="lock-icon">&#128274;</span>`;
  const sourceTabClass = isFreeAccess ? "" : " modal__tab--locked";

  overlay.querySelector(".modal").innerHTML = `
    <div class="modal__header">
      <div class="modal__header-left">
        <div class="modal__header-title">${widget.title}</div>
        <div class="modal__header-meta"><span>${tCat(widget.category)}</span><span>&middot;</span>${badgeHTML}</div>
      </div>
      <button class="modal__close" id="modalClose">&times;</button>
    </div>
    <div class="modal__tabs">
      <button class="modal__tab${modalTab === "preview" ? " active" : ""}" data-tab="preview"><span class="modal__tab-icon">&#9655;</span>${t("preview")}</button>
      <button class="modal__tab${modalTab === "source" ? " active" : ""}${sourceTabClass}" data-tab="source">${sourceTabLabel}</button>
    </div>
    <div class="modal__content">
      <div class="preview-panel${modalTab === "preview" ? " active" : ""}" id="previewPanel">
        <iframe srcdoc="${escapeAttr(buildSrcdoc(widget))}" sandbox="allow-scripts"></iframe>
      </div>
      <div class="source-panel${modalTab === "source" && isFreeAccess ? " active" : ""}" id="sourcePanel">
        <div class="code-tabs">
          <button class="code-tab active" data-code="html">${t("html")}</button>
          <button class="code-tab" data-code="css">${t("css")}</button>
          ${widget.js && widget.js.trim() ? `<button class="code-tab" data-code="js">${t("js")}</button>` : ""}
        </div>
        <div class="code-display"><pre id="codeContent">${escapeHTML(widget.html)}</pre></div>
        <div class="code-toolbar">
          <button class="code-toolbar__btn code-toolbar__btn--copy" id="copyBtn">&#128203; ${t("copy")}</button>
          <button class="code-toolbar__btn code-toolbar__btn--download" id="downloadBtn">&#8595; ${t("download")}</button>
        </div>
      </div>
      <div class="paywall-panel${modalTab === "source" && !isFreeAccess ? " active" : ""}" id="paywallPanel">
        <div class="paywall__lock">&#128274;</div>
        <div class="paywall__title">${t("paywallTitle")}</div>
        <div class="paywall__desc">${t("paywallDesc")}</div>
        <ul class="paywall__features"><li>${t("feat1")}</li><li>${t("feat2")}</li><li>${t("feat3")}</li></ul>
        <div class="paywall__price">$${widget.price ? widget.price.toFixed(2) : "0.00"}</div>
        <div class="paywall__price-label">${t("oneTime")}</div>
        <button id="paypal-button-container">${t("paypal")}</button>
        <div class="paywall__secure">&#128275; ${t("secure")}</div>
      </div>
    </div>`;

  overlay.classList.add("open");

  // Close
  $("#modalClose").addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) closeModal(); });

  // Tab switching
  overlay.querySelectorAll(".modal__tab").forEach(tab => {
    tab.addEventListener("click", () => {
      modalTab = tab.dataset.tab;
      overlay.querySelectorAll(".modal__tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      $("#previewPanel").classList.remove("active");
      $("#sourcePanel").classList.remove("active");
      $("#paywallPanel").classList.remove("active");
      if (modalTab === "preview") {
        $("#previewPanel").classList.add("active");
      } else if (modalTab === "source") {
        if (isFreeAccess) { $("#sourcePanel").classList.add("active"); }
        else { $("#paywallPanel").classList.add("active"); }
      }
    });
  });

  // Code tab switching
  overlay.querySelectorAll(".code-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      codeTab = tab.dataset.code;
      overlay.querySelectorAll(".code-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      $("#codeContent").textContent = widget[codeTab] || "";
    });
  });

  // Copy
  const copyBtn = $("#copyBtn");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(widget[codeTab] || "").then(() => showToast(t("copied")));
    });
  }

  // Download ZIP
  const downloadBtn = $("#downloadBtn");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => downloadZip(widget));
  }

  // Escape
  const escHandler = (e) => { if (e.key === "Escape") { closeModal(); document.removeEventListener("keydown", escHandler); } };
  document.addEventListener("keydown", escHandler);
}

function closeModal() {
  $(".modal-overlay").classList.remove("open");
  currentWidget = null;
}

// ------ ZIP DOWNLOAD (using JSZip CDN) ------
let jsZipLoaded = false;
function ensureJSZip() {
  return new Promise((resolve, reject) => {
    if (jsZipLoaded && window.JSZip) { resolve(); return; }
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js";
    script.onload = () => { jsZipLoaded = true; resolve(); };
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

async function downloadZip(widget) {
  try {
    await ensureJSZip();
    const zip = new JSZip();
    const slug = widget.title.toLowerCase().replace(/\s+/g, "-");

    // Build a combined HTML file that references the separate css/js
    const combinedHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${widget.title} - Cronolabs</title>
  <link rel="stylesheet" href="snippet.css">
</head>
<body>
${widget.html}
${widget.js && widget.js.trim() ? '<script src="snippet.js"><\/script>' : ''}
</body>
</html>`;

    zip.file("snippet.html", combinedHTML);
    zip.file("snippet.css", widget.css);
    if (widget.js && widget.js.trim()) {
      zip.file("snippet.js", widget.js);
    }

    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slug}.zip`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(t("downloaded"));
  } catch (err) {
    console.error("ZIP download error:", err);
    showToast("Download error");
  }
}

// ------ FOOTER ------
function renderFooter() {
  const footer = $(".footer__text");
  if (footer) footer.innerHTML = `&copy; 2026 ${t("footer")}`;
}

// ------ TOAST ------
function showToast(msg) {
  const toast = $(".toast");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}
