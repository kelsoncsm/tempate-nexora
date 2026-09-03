/* ==========================================================================
   Nexora — components.js
   Gráficos (Chart.js), busca em tabelas, wizard do onboarding
   ========================================================================== */

(function () {
  'use strict';

  var C = {
    primary: '#6C5CE7',
    primarySoft: 'rgba(108, 92, 231, 0.14)',
    green: '#22C55E',
    greenSoft: 'rgba(34, 197, 94, 0.12)',
    red: '#EF4444',
    redSoft: 'rgba(239, 68, 68, 0.10)',
    orange: '#F59E0B',
    blue: '#3B82F6',
    grid: '#EEF0F6'
  };

  var lineBase = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    elements: { point: { radius: 0 } },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#B0B4C6', font: { size: 10 } } },
      y: { grid: { color: C.grid }, ticks: { color: '#B0B4C6', font: { size: 10 } } }
    }
  };

  function spark(id, data, color) {
    var el = document.getElementById(id);
    if (!el || typeof Chart === 'undefined') return;
    new Chart(el, {
      type: 'line',
      data: { labels: data.map(function (_, i) { return i; }), datasets: [{
        data: data, borderColor: color, backgroundColor: 'transparent', fill: false, tension: 0.4, borderWidth: 2
      }] },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        elements: { point: { radius: 0 } },
        scales: { x: { display: false }, y: { display: false } }
      }
    });
  }

  function initDashboardCharts() {
    spark('sparkReceita', [12, 15, 14, 18, 17, 22, 24, 23, 27, 30], C.primary);
    spark('sparkClientes', [8, 9, 11, 10, 13, 14, 15, 17, 18, 20], C.blue);
    spark('sparkAtend', [20, 22, 25, 24, 28, 30, 29, 33, 36, 40], C.green);
    spark('sparkPend', [6, 8, 7, 9, 8, 7, 6, 5, 6, 4], C.red);

    var evo = document.getElementById('chartEvolucao');
    if (evo && typeof Chart !== 'undefined') {
      new Chart(evo, {
        type: 'line',
        data: {
          labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
          datasets: [
            { label: 'Receitas', data: [21, 26, 24, 27, 25, 31, 29, 28, 30, 27, 29, 32], borderColor: C.green, backgroundColor: C.greenSoft, fill: true, tension: 0.4, borderWidth: 2.5 },
            { label: 'Despesas', data: [8, 12, 13, 12, 15, 18, 16, 14, 17, 15, 16, 18], borderColor: C.red, backgroundColor: C.redSoft, fill: true, tension: 0.4, borderWidth: 2.5 }
          ]
        },
        options: Object.assign({}, lineBase, {
          plugins: { legend: { display: true, position: 'top', align: 'start', labels: { boxWidth: 8, usePointStyle: true, color: '#8A8FA3' } } }
        })
      });
    }

    var mod = document.getElementById('chartModulos');
    if (mod && typeof Chart !== 'undefined') {
      new Chart(mod, {
        type: 'doughnut',
        data: { labels: ['Ativos', 'Disponíveis', 'Limite'], datasets: [{ data: [8, 7, 0], backgroundColor: [C.green, '#E7E9F2', '#F4F5FA'], borderWidth: 0 }] },
        options: { responsive: true, maintainAspectRatio: false, cutout: '72%', plugins: { legend: { display: false } } }
      });
    }
  }

  function initReportChart() {
    var el = document.getElementById('chartProdutividade');
    if (!el || typeof Chart === 'undefined') return;
    new Chart(el, {
      type: 'bar',
      data: {
        labels: ['Marina S.', 'Carlos E.', 'Beatriz R.', 'Thiago A.'],
        datasets: [{ data: [42, 35, 28, 19], backgroundColor: C.primary, borderRadius: 6, barThickness: 26 }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { x: { grid: { display: false }, ticks: { color: '#B0B4C6', font: { size: 10 } } }, y: { grid: { color: C.grid }, ticks: { color: '#B0B4C6', font: { size: 10 } } } }
      }
    });
  }

  function initTableSearch() {
    document.querySelectorAll('[data-table-search]').forEach(function (input) {
      var table = document.querySelector(input.getAttribute('data-table-search'));
      if (!table) return;
      input.addEventListener('input', function () {
        var term = input.value.trim().toLowerCase();
        table.querySelectorAll('tbody tr').forEach(function (row) {
          row.style.display = row.textContent.toLowerCase().indexOf(term) !== -1 ? '' : 'none';
        });
      });
    });
  }

  /* Wizard genérico: [data-wizard] com [data-step] e botões [data-wizard-next]/[data-wizard-prev] */
  function initWizard() {
    var wiz = document.querySelector('[data-wizard]');
    if (!wiz) return;
    var steps = Array.prototype.slice.call(wiz.querySelectorAll('[data-step]'));
    var dots = Array.prototype.slice.call(document.querySelectorAll('.wizard-steps li'));
    var current = 0;

    function render() {
      steps.forEach(function (s, i) { s.style.display = i === current ? '' : 'none'; });
      dots.forEach(function (d, i) {
        d.classList.toggle('active', i === current);
        d.classList.toggle('done', i < current);
      });
    }
    wiz.addEventListener('click', function (e) {
      if (e.target.closest('[data-wizard-next]')) {
        if (current < steps.length - 1) { current++; render(); }
      }
      if (e.target.closest('[data-wizard-prev]')) {
        if (current > 0) { current--; render(); }
      }
    });
    /* seleção visual das opções */
    wiz.querySelectorAll('.choices').forEach(function (group) {
      group.addEventListener('click', function (e) {
        var c = e.target.closest('.choice');
        if (!c) return;
        group.querySelectorAll('.choice').forEach(function (x) { x.classList.remove('selected'); });
        c.classList.add('selected');
      });
    });
    render();
  }

  document.addEventListener('DOMContentLoaded', function () {
    initDashboardCharts();
    initReportChart();
    initTableSearch();
    initWizard();
  });
})();
