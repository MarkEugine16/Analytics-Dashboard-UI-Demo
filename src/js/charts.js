/* ═══════════════════════════════════════════════════
   charts.js
   Responsibilities:
     - Chart.js global defaults
     - Revenue line chart  (revenueChart)
     - Traffic sources pie chart (pieChart)
     - Orders by channel bar chart (barChart) with quarter filter
     - Weekly activity area chart (areaChart)

   Depends on: DATA (defined in dashboard.js, loaded first)
═══════════════════════════════════════════════════ */

/* ─── Chart.js Global Defaults ──────────────────── */
Chart.defaults.font.family = "'DM Sans', sans-serif";
Chart.defaults.font.size   = 12;
Chart.defaults.color       = '#7A7A8C';

/* ─── Shared Tooltip Config ─────────────────────── */
const tooltipDefaults = {
  backgroundColor: '#1C1C28',
  titleColor:      '#ffffff',
  bodyColor:       'rgba(255,255,255,0.7)',
  padding:         10,
  cornerRadius:    8
};

/* ─── 1. Revenue Line Chart ─────────────────────── */
(function initRevenueChart() {
  const ctx  = document.getElementById('revenueChart').getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 0, 220);
  grad.addColorStop(0, 'rgba(212,168,67,0.2)');
  grad.addColorStop(1, 'rgba(212,168,67,0)');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels:   DATA.revenue.labels,
      datasets: [
        {
          label:            'Actual',
          data:             DATA.revenue.actual,
          borderColor:      '#D4A843',
          backgroundColor:  grad,
          borderWidth:      2.5,
          pointRadius:      3,
          pointHoverRadius: 6,
          pointBackgroundColor: '#D4A843',
          tension:          0.4,
          fill:             true
        },
        {
          label:            'Target',
          data:             DATA.revenue.target,
          borderColor:      '#4B7BE5',
          backgroundColor:  'transparent',
          borderWidth:      2,
          borderDash:       [5, 4],
          pointRadius:      0,
          pointHoverRadius: 5,
          tension:          0.4
        }
      ]
    },
    options: {
      responsive:          true,
      maintainAspectRatio: true,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend:  { display: false },
        tooltip: {
          ...tooltipDefaults,
          callbacks: {
            label: ctx => ' $' + ctx.raw.toLocaleString()
          }
        }
      },
      scales: {
        x: { grid: { display: false }, border: { display: false } },
        y: {
          grid:   { color: 'rgba(20,20,32,0.05)' },
          border: { display: false },
          ticks:  { callback: v => '$' + (v >= 1000 ? Math.round(v / 1000) + 'k' : v) }
        }
      }
    }
  });
})();

/* ─── 2. Traffic Sources Pie / Doughnut Chart ───── */
(function initPieChart() {
  const ctx = document.getElementById('pieChart').getContext('2d');

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels:   DATA.pie.labels,
      datasets: [{
        data:             DATA.pie.data,
        backgroundColor:  DATA.pie.colors,
        borderWidth:      3,
        borderColor:      '#FDFCFA',
        hoverBorderColor: '#FDFCFA',
        hoverOffset:      6
      }]
    },
    options: {
      responsive:          true,
      maintainAspectRatio: true,
      cutout: '68%',
      plugins: {
        legend:  { display: false },
        tooltip: {
          ...tooltipDefaults,
          callbacks: {
            label: ctx => ` ${ctx.label}: ${ctx.raw}%`
          }
        }
      }
    }
  });

  // Custom legend
  const pieLegend = document.getElementById('pieLegend');
  DATA.pie.labels.forEach((label, i) => {
    pieLegend.innerHTML += `
      <div class="legend-item">
        <span class="legend-dot" style="background:${DATA.pie.colors[i]}"></span>
        ${label} <strong style="color:var(--text-primary)">${DATA.pie.data[i]}%</strong>
      </div>`;
  });
})();

/* ─── 3. Orders by Channel Bar Chart ────────────── */
let barChartInst = null;

function renderBarChart(quarter) {
  const d   = DATA.bar[quarter];
  const ctx = document.getElementById('barChart').getContext('2d');

  if (barChartInst) barChartInst.destroy();

  barChartInst = new Chart(ctx, {
    type: 'bar',
    data: {
      labels:   d.labels,
      datasets: [{
        label:           'Orders',
        data:            d.data,
        backgroundColor: ['#D4A843','#4B7BE5','#2ECC8F','#E8526A','#9B59B6','#F39C12'],
        borderRadius:    6,
        borderSkipped:   false
      }]
    },
    options: {
      responsive:          true,
      maintainAspectRatio: true,
      plugins: {
        legend:  { display: false },
        tooltip: tooltipDefaults
      },
      scales: {
        x: { grid: { display: false }, border: { display: false } },
        y: { grid: { color: 'rgba(20,20,32,0.05)' }, border: { display: false } }
      }
    }
  });
}

// Initial render + quarter filter
renderBarChart('q4');
document.getElementById('barFilter').addEventListener('change', e => renderBarChart(e.target.value));

/* ─── 4. Weekly Activity Area Chart ─────────────── */
(function initAreaChart() {
  const ctx  = document.getElementById('areaChart').getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 0, 200);
  grad.addColorStop(0, 'rgba(75,123,229,0.18)');
  grad.addColorStop(1, 'rgba(75,123,229,0)');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels:   DATA.weekly.labels,
      datasets: [{
        data:                 DATA.weekly.data,
        borderColor:          '#4B7BE5',
        backgroundColor:      grad,
        borderWidth:          2.5,
        pointRadius:          4,
        pointHoverRadius:     7,
        pointBackgroundColor: '#4B7BE5',
        pointBorderColor:     '#FDFCFA',
        pointBorderWidth:     2,
        tension:              0.4,
        fill:                 true
      }]
    },
    options: {
      responsive:          true,
      maintainAspectRatio: true,
      plugins: {
        legend:  { display: false },
        tooltip: {
          ...tooltipDefaults,
          callbacks: {
            label: ctx => ` ${ctx.raw}h avg session`
          }
        }
      },
      scales: {
        x: { grid: { display: false }, border: { display: false } },
        y: {
          grid:   { color: 'rgba(20,20,32,0.05)' },
          border: { display: false },
          ticks:  { callback: v => v + 'h' }
        }
      }
    }
  });
})();
