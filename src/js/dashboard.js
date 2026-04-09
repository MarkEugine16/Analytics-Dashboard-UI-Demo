/* ═══════════════════════════════════════════════════
   dashboard.js
   Responsibilities:
     - Mock JSON data (single source of truth)
     - KPI card rendering with skeleton loader
     - Period filter (7D / 30D / 90D / 1Y)
     - Sortable, filterable, paginated orders table
     - Activity feed
     - Top products list
═══════════════════════════════════════════════════ */

/* ─── Mock Data ─────────────────────────────────── */
const DATA = {
  kpis: {
    "7d":  { revenue:"$24,180",  users:"1,842",  orders:"318",    conv:"3.8%", revT:"+8.2",  usersT:"+5.1",  ordersT:"+11.4", convT:"+0.4" },
    "30d": { revenue:"$98,420",  users:"7,291",  orders:"1,248",  conv:"4.2%", revT:"+12.4", usersT:"+8.7",  ordersT:"+9.1",  convT:"+0.8" },
    "90d": { revenue:"$287,530", users:"21,480", orders:"3,940",  conv:"4.8%", revT:"+18.3", usersT:"+14.2", ordersT:"+21.6", convT:"+1.2" },
    "1y":  { revenue:"$1.14M",   users:"84,300", orders:"15,820", conv:"5.1%", revT:"+31.7", usersT:"+27.9", ordersT:"+35.4", convT:"+2.1" }
  },

  revenue: {
    labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    actual: [52000,61000,55000,72000,84000,78000,91000,99000,87000,105000,114000,128000],
    target: [60000,65000,70000,75000,80000,85000,90000,95000,100000,105000,110000,115000]
  },

  pie: {
    labels: ["Organic","Paid Search","Social","Referral","Email","Direct"],
    data:   [34,22,18,12,8,6],
    colors: ["#D4A843","#4B7BE5","#2ECC8F","#E8526A","#9B59B6","#F39C12"]
  },

  bar: {
    q1: { labels:["Web","Mobile","Email","Affiliate","Partner","Other"], data:[320,280,190,130,90,45]  },
    q2: { labels:["Web","Mobile","Email","Affiliate","Partner","Other"], data:[360,310,210,150,100,55] },
    q3: { labels:["Web","Mobile","Email","Affiliate","Partner","Other"], data:[390,355,230,170,120,65] },
    q4: { labels:["Web","Mobile","Email","Affiliate","Partner","Other"], data:[420,380,260,190,140,80] }
  },

  weekly: {
    labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
    data:   [3.2,4.8,5.1,4.4,6.2,3.8,2.9]
  },

  orders: [
    {id:"#8824",product:"Pro License",    emoji:"⚡",category:"Software",   customer:"Jordan Lee",   amount:249,  conversion:88,  status:"Completed",  date:"Apr 8, 2026"},
    {id:"#8823",product:"Analytics Suite",emoji:"📊",category:"SaaS",       customer:"Priya Sharma", amount:599,  conversion:72,  status:"Processing", date:"Apr 8, 2026"},
    {id:"#8822",product:"Starter Pack",   emoji:"🚀",category:"Bundle",     customer:"Marcus Chen",  amount:79,   conversion:95,  status:"Completed",  date:"Apr 7, 2026"},
    {id:"#8821",product:"Enterprise Plan",emoji:"🏢",category:"Enterprise", customer:"Sarah Kim",    amount:1899, conversion:60,  status:"Pending",    date:"Apr 7, 2026"},
    {id:"#8820",product:"Design Kit",     emoji:"🎨",category:"Creative",   customer:"Tom Walsh",    amount:149,  conversion:100, status:"Completed",  date:"Apr 6, 2026"},
    {id:"#8819",product:"Data Hub",       emoji:"🗄️",category:"Data",       customer:"Leila Nouri",  amount:349,  conversion:40,  status:"Refunded",   date:"Apr 6, 2026"},
    {id:"#8818",product:"Pro License",    emoji:"⚡",category:"Software",   customer:"Ben Davis",    amount:249,  conversion:82,  status:"Completed",  date:"Apr 5, 2026"},
    {id:"#8817",product:"Analytics Suite",emoji:"📊",category:"SaaS",       customer:"Anya Patel",   amount:599,  conversion:65,  status:"Processing", date:"Apr 5, 2026"},
    {id:"#8816",product:"Mobile SDK",     emoji:"📱",category:"Developer",  customer:"Chris O'Brien",amount:129,  conversion:91,  status:"Completed",  date:"Apr 4, 2026"},
    {id:"#8815",product:"Starter Pack",   emoji:"🚀",category:"Bundle",     customer:"Nina Park",    amount:79,   conversion:100, status:"Completed",  date:"Apr 4, 2026"},
    {id:"#8814",product:"Enterprise Plan",emoji:"🏢",category:"Enterprise", customer:"Derek Munn",   amount:1899, conversion:55,  status:"Pending",    date:"Apr 3, 2026"},
    {id:"#8813",product:"Design Kit",     emoji:"🎨",category:"Creative",   customer:"Zoe Blake",    amount:149,  conversion:100, status:"Completed",  date:"Apr 3, 2026"},
    {id:"#8812",product:"Data Hub",       emoji:"🗄️",category:"Data",       customer:"Omar Faris",   amount:349,  conversion:78,  status:"Completed",  date:"Apr 2, 2026"},
    {id:"#8811",product:"Pro License",    emoji:"⚡",category:"Software",   customer:"Sam Rivera",   amount:249,  conversion:90,  status:"Completed",  date:"Apr 2, 2026"},
    {id:"#8810",product:"Analytics Suite",emoji:"📊",category:"SaaS",       customer:"Mia Torres",   amount:599,  conversion:48,  status:"Pending",    date:"Apr 1, 2026"},
    {id:"#8809",product:"Starter Pack",   emoji:"🚀",category:"Bundle",     customer:"Eli James",    amount:79,   conversion:100, status:"Completed",  date:"Apr 1, 2026"},
    {id:"#8808",product:"Mobile SDK",     emoji:"📱",category:"Developer",  customer:"Fiona Grant",  amount:129,  conversion:85,  status:"Completed",  date:"Mar 31, 2026"},
    {id:"#8807",product:"Enterprise Plan",emoji:"🏢",category:"Enterprise", customer:"Kai Nakamura", amount:1899, conversion:30,  status:"Refunded",   date:"Mar 31, 2026"},
    {id:"#8806",product:"Design Kit",     emoji:"🎨",category:"Creative",   customer:"Lena Gross",   amount:149,  conversion:100, status:"Completed",  date:"Mar 30, 2026"},
    {id:"#8805",product:"Data Hub",       emoji:"🗄️",category:"Data",       customer:"Victor Tran",  amount:349,  conversion:68,  status:"Processing", date:"Mar 30, 2026"}
  ],

  activity: [
    {name:"Jordan Lee",   initials:"JL", color:"#4B7BE5", action:"purchased",          detail:"Pro License",          time:"2 min ago"},
    {name:"Priya Sharma", initials:"PS", color:"#2ECC8F", action:"upgraded to",         detail:"Analytics Suite",      time:"14 min ago"},
    {name:"System",       initials:"SY", color:"#D4A843", action:"alert:",              detail:"CPU spike 92%",        time:"28 min ago"},
    {name:"Leila Nouri",  initials:"LN", color:"#E8526A", action:"requested refund for",detail:"Data Hub",             time:"1 hr ago"},
    {name:"Ben Davis",    initials:"BD", color:"#9B59B6", action:"renewed",             detail:"Pro License (annual)", time:"2 hr ago"},
    {name:"Marcus Chen",  initials:"MC", color:"#F39C12", action:"signed up via",       detail:"Organic Search",       time:"3 hr ago"}
  ],

  topProducts: [
    {name:"Enterprise Plan", cat:"Enterprise", rev:"$37,980", change:"+18.4"},
    {name:"Analytics Suite", cat:"SaaS",       rev:"$28,752", change:"+11.2"},
    {name:"Pro License",     cat:"Software",   rev:"$21,392", change:"+8.7"},
    {name:"Data Hub",        cat:"Data",       rev:"$14,196", change:"-2.1"},
    {name:"Design Kit",      cat:"Creative",   rev:"$8,202",  change:"+5.4"},
    {name:"Mobile SDK",      cat:"Developer",  rev:"$6,450",  change:"+22.8"},
    {name:"Starter Pack",    cat:"Bundle",     rev:"$4,108",  change:"+3.1"}
  ]
};

/* ─── Current Date ──────────────────────────────── */
document.getElementById('currentDate').textContent =
  new Date().toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
  });

/* ─── KPI Cards ─────────────────────────────────── */
let activePeriod = '30d';

function renderKPIs(period) {
  const d = DATA.kpis[period];

  const defs = [
    {
      label: 'Total Revenue', val: d.revenue, trend: d.revT,
      dir: parseFloat(d.revT) >= 0 ? 'up' : 'down',
      icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4A843" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
      iconBg: '#F5E9CB', accent: '#D4A843'
    },
    {
      label: 'Active Users', val: d.users, trend: d.usersT,
      dir: parseFloat(d.usersT) >= 0 ? 'up' : 'down',
      icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4B7BE5" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
      iconBg: '#EBF0FC', accent: '#4B7BE5'
    },
    {
      label: 'Total Orders', val: d.orders, trend: d.ordersT,
      dir: parseFloat(d.ordersT) >= 0 ? 'up' : 'down',
      icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2ECC8F" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
      iconBg: '#E0F7F0', accent: '#2ECC8F'
    },
    {
      label: 'Conv. Rate', val: d.conv, trend: d.convT,
      dir: parseFloat(d.convT) >= 0 ? 'up' : 'down',
      icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E8526A" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
      iconBg: '#FCEDF0', accent: '#E8526A'
    }
  ];

  const grid = document.getElementById('kpiGrid');
  grid.innerHTML = defs.map((k, i) => `
    <div class="kpi-card fade-up" style="--card-accent:${k.accent};animation-delay:${i * 0.07}s">
      <div class="kpi-header">
        <span class="kpi-label">${k.label}</span>
        <span class="kpi-icon" style="--icon-bg:${k.iconBg}">${k.icon}</span>
      </div>
      <div class="kpi-value">${k.val}</div>
      <div class="kpi-footer">
        <span class="trend ${k.dir}">${k.dir === 'up' ? '↑' : '↓'} ${k.trend}%</span>
        <span class="kpi-period">vs. last period</span>
      </div>
    </div>
  `).join('');
}

// Simulate skeleton loading delay
setTimeout(() => renderKPIs(activePeriod), 800);

// Period filter buttons
document.querySelectorAll('.filter-btn[data-period]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn[data-period]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activePeriod = btn.dataset.period;
    renderKPIs(activePeriod);
  });
});

/* ─── Orders Table ──────────────────────────────── */
let tableData    = [...DATA.orders];
let sortCol      = 'date';
let sortDir      = 1;
let currentPage  = 1;
const PAGE_SIZE  = 5;
let filterStatus = '';

function statusBadge(s) {
  const map = {
    Completed:  'badge-green',
    Pending:    'badge-amber',
    Refunded:   'badge-red',
    Processing: 'badge-blue'
  };
  return `<span class="status-badge ${map[s] || ''}"><span class="badge-dot"></span>${s}</span>`;
}

function renderTable() {
  let data = filterStatus
    ? tableData.filter(r => r.status === filterStatus)
    : tableData;

  // Sort
  data.sort((a, b) => {
    let va = a[sortCol], vb = b[sortCol];
    if (sortCol === 'amount' || sortCol === 'conversion') { va = +va; vb = +vb; }
    return va > vb ? sortDir : va < vb ? -sortDir : 0;
  });

  const total = data.length;
  const start = (currentPage - 1) * PAGE_SIZE;
  const end   = start + PAGE_SIZE;
  const page  = data.slice(start, end);

  document.getElementById('tableBody').innerHTML = page.map(r => `
    <tr>
      <td class="mono" style="color:var(--text-muted)">${r.id}</td>
      <td>
        <div class="t-product">
          <span class="product-icon" style="background:var(--accent-soft);font-size:1rem">${r.emoji}</span>
          <div><div class="t-label">${r.product}</div><div class="t-sub">${r.category}</div></div>
        </div>
      </td>
      <td>${r.customer}</td>
      <td class="mono">$${r.amount.toLocaleString()}</td>
      <td>
        <div class="t-bar-wrap">
          <div class="t-bar"><div class="t-bar-fill" style="width:${r.conversion}%"></div></div>
          <span class="t-bar-pct">${r.conversion}%</span>
        </div>
      </td>
      <td>${statusBadge(r.status)}</td>
      <td style="color:var(--text-muted);font-size:0.8rem">${r.date}</td>
    </tr>
  `).join('');

  const showing = `Showing ${total === 0 ? 0 : start + 1}–${Math.min(end, total)} of ${total}`;
  document.getElementById('paginationInfo').textContent = showing;
  document.getElementById('tableCount').textContent     = `${showing} orders`;
  renderPagination(total);
}

function renderPagination(total) {
  const pages = Math.ceil(total / PAGE_SIZE);
  const cont  = document.getElementById('paginationBtns');
  cont.innerHTML = '';

  // Prev button
  const prev = document.createElement('button');
  prev.className = 'page-btn';
  prev.innerHTML = '‹';
  prev.disabled  = currentPage === 1;
  prev.addEventListener('click', () => { currentPage--; renderTable(); });
  cont.appendChild(prev);

  // Page number buttons
  for (let i = 1; i <= pages; i++) {
    const btn = document.createElement('button');
    btn.className = 'page-btn' + (i === currentPage ? ' active' : '');
    btn.textContent = i;
    btn.addEventListener('click', () => { currentPage = i; renderTable(); });
    cont.appendChild(btn);
  }

  // Next button
  const next = document.createElement('button');
  next.className = 'page-btn';
  next.innerHTML = '›';
  next.disabled  = currentPage === pages || pages === 0;
  next.addEventListener('click', () => { currentPage++; renderTable(); });
  cont.appendChild(next);
}

// Column sort on header click
document.querySelectorAll('thead th[data-col]').forEach(th => {
  th.addEventListener('click', () => {
    const col = th.dataset.col;
    if (sortCol === col) sortDir *= -1;
    else { sortCol = col; sortDir = 1; }
    document.querySelectorAll('thead th').forEach(t => t.classList.remove('sorted'));
    th.classList.add('sorted');
    th.querySelector('.sort-icon').textContent = sortDir === 1 ? '↑' : '↓';
    currentPage = 1;
    renderTable();
  });
  th.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') th.click(); });
});

// Status filter dropdown
document.getElementById('statusFilter').addEventListener('change', e => {
  filterStatus = e.target.value;
  currentPage  = 1;
  renderTable();
});

renderTable();

/* ─── Activity Feed ─────────────────────────────── */
const feedEl = document.getElementById('activityFeed');
DATA.activity.forEach(a => {
  feedEl.innerHTML += `
    <div class="feed-item">
      <div class="feed-avatar" style="background:${a.color}">${a.initials}</div>
      <div class="feed-content">
        <div class="feed-text"><strong>${a.name}</strong> ${a.action} <strong>${a.detail}</strong></div>
        <div class="feed-time">${a.time}</div>
      </div>
    </div>`;
});

/* ─── Top Products ──────────────────────────────── */
const prodEl = document.getElementById('topProductsList');
DATA.topProducts.forEach((p, i) => {
  const up = !p.change.startsWith('-');
  prodEl.innerHTML += `
    <div class="product-row">
      <span class="product-rank">${String(i + 1).padStart(2, '0')}</span>
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div class="product-cat">${p.cat}</div>
      </div>
      <div style="text-align:right">
        <div class="product-rev">${p.rev}</div>
        <div class="product-change ${up ? 'up' : 'down'}">${p.change}%</div>
      </div>
    </div>`;
});
