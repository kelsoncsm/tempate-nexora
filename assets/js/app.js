/* ==========================================================================
   Nexora — app.js
   Inicialização global: sidebar, dropdowns, modais, tabs, marcação de item ativo
   ========================================================================== */

(function () {
  'use strict';

  function initSidebarToggle() {
    var shell = document.querySelector('.app-shell');
    var toggleBtn = document.querySelector('[data-action="toggle-sidebar"]');
    var backdrop = document.querySelector('.sidebar-backdrop');
    if (!shell || !toggleBtn) return;

    toggleBtn.addEventListener('click', function () {
      if (window.innerWidth <= 992) {
        shell.classList.toggle('sidebar-open');
      } else {
        shell.classList.toggle('sidebar-collapsed');
      }
    });

    if (backdrop) {
      backdrop.addEventListener('click', function () {
        shell.classList.remove('sidebar-open');
      });
    }
  }

  function initActiveNav() {
    var currentPage = document.body.getAttribute('data-page');
    if (!currentPage) return;
    document.querySelectorAll('.nav-item').forEach(function (item) {
      if (item.getAttribute('data-page') === currentPage) {
        item.classList.add('active');
      }
    });
  }

  function initDropdowns() {
    document.querySelectorAll('[data-dropdown-toggle]').forEach(function (btn) {
      var menu = document.getElementById(btn.getAttribute('data-dropdown-toggle'));
      if (!menu) return;
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        document.querySelectorAll('.dropdown-menu.open').forEach(function (m) {
          if (m !== menu) m.classList.remove('open');
        });
        menu.classList.toggle('open');
      });
    });
    document.addEventListener('click', function () {
      document.querySelectorAll('.dropdown-menu.open').forEach(function (m) { m.classList.remove('open'); });
    });
  }

  function openModal(id) {
    var modal = document.getElementById(id);
    if (modal) modal.classList.add('open');
  }
  function closeModal(el) {
    var modal = el.closest ? el.closest('.modal-overlay') : null;
    if (modal) modal.classList.remove('open');
  }

  function initModals() {
    document.querySelectorAll('[data-modal-open]').forEach(function (btn) {
      btn.addEventListener('click', function () { openModal(btn.getAttribute('data-modal-open')); });
    });
    document.querySelectorAll('[data-modal-close]').forEach(function (btn) {
      btn.addEventListener('click', function () { closeModal(btn); });
    });
    document.querySelectorAll('.modal-overlay').forEach(function (overlay) {
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) overlay.classList.remove('open');
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.open').forEach(function (m) { m.classList.remove('open'); });
      }
    });
  }

  function initTabs() {
    document.querySelectorAll('[data-tabs]').forEach(function (tabsWrap) {
      var tabButtons = tabsWrap.querySelectorAll('.tab-item');
      var targetSelector = tabsWrap.getAttribute('data-tabs');
      var panels = targetSelector ? document.querySelectorAll(targetSelector + ' [data-tab-panel]') : [];
      tabButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          tabButtons.forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');
          var target = btn.getAttribute('data-tab-target');
          panels.forEach(function (panel) {
            panel.style.display = panel.getAttribute('data-tab-panel') === target ? '' : 'none';
          });
        });
      });
    });
  }

  function initSubNav() {
    document.querySelectorAll('[data-subnav]').forEach(function (nav) {
      var items = nav.querySelectorAll('[data-subnav-target]');
      items.forEach(function (item) {
        item.addEventListener('click', function () {
          items.forEach(function (i) { i.classList.remove('active'); });
          item.classList.add('active');
          var target = item.getAttribute('data-subnav-target');
          document.querySelectorAll('[data-subnav-panel]').forEach(function (panel) {
            panel.style.display = panel.getAttribute('data-subnav-panel') === target ? '' : 'none';
          });
        });
      });
    });

    // Botões fora da nav que saltam para um painel (ex.: ação numa tabela)
    document.querySelectorAll('[data-subnav-goto]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = document.querySelector('[data-subnav-target="' + btn.getAttribute('data-subnav-goto') + '"]');
        if (item) item.click();
      });
    });
  }

  function initPasswordToggles() {
    document.querySelectorAll('[data-action="toggle-password"]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var input = btn.parentElement.querySelector('input');
        if (!input) return;
        var isPw = input.type === 'password';
        input.type = isPw ? 'text' : 'password';
        btn.innerHTML = isPw ? '<i class="fa-regular fa-eye-slash"></i>' : '<i class="fa-regular fa-eye"></i>';
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initSidebarToggle();
    initActiveNav();
    initDropdowns();
    initModals();
    initTabs();
    initSubNav();
    initPasswordToggles();
  });
})();
