/* ==========================================================================
   Nexora — sidebar.js
   Ajustes de responsividade da sidebar ao redimensionar a janela
   ========================================================================== */

(function () {
  'use strict';

  function handleResize() {
    var shell = document.querySelector('.app-shell');
    if (!shell) return;
    if (window.innerWidth > 992) {
      shell.classList.remove('sidebar-open');
    } else {
      shell.classList.remove('sidebar-collapsed');
    }
  }

  window.addEventListener('resize', handleResize);
  document.addEventListener('DOMContentLoaded', handleResize);
})();
