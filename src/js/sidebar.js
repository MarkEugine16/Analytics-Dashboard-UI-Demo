/* ═══════════════════════════════════════════════════
   sidebar.js
   Responsibilities:
     - Desktop: collapse sidebar to icon-only rail
     - Mobile:  slide-in drawer with backdrop overlay
     - Nav item active state highlight
     - Topbar toggle button support
═══════════════════════════════════════════════════ */

(function initSidebar() {
  /* ─── Element References ──────────────────────── */
  const sidebar       = document.getElementById('sidebar');
  const mainContent   = document.getElementById('mainContent');
  const overlay       = document.getElementById('mobileOverlay');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const topbarToggle  = document.getElementById('topbarToggle');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');

  let sidebarCollapsed = false;

  /* ─── Helpers ─────────────────────────────────── */
  function isMobile() {
    return window.innerWidth < 641;
  }

  function openMobileDrawer() {
    sidebar.classList.add('mobile-open');
    overlay.classList.add('visible');
    overlay.setAttribute('aria-hidden', 'false');
  }

  function closeMobileDrawer() {
    sidebar.classList.remove('mobile-open');
    overlay.classList.remove('visible');
    overlay.setAttribute('aria-hidden', 'true');
  }

  function collapseDesktop() {
    sidebarCollapsed = true;
    sidebar.classList.add('collapsed');
    mainContent.classList.add('expanded');
  }

  function expandDesktop() {
    sidebarCollapsed = false;
    sidebar.classList.remove('collapsed');
    mainContent.classList.remove('expanded');
  }

  /* ─── Toggle Sidebar ──────────────────────────── */
  function toggleSidebar() {
    if (isMobile()) {
      sidebar.classList.contains('mobile-open')
        ? closeMobileDrawer()
        : openMobileDrawer();
    } else {
      sidebarCollapsed ? expandDesktop() : collapseDesktop();
    }
  }

  /* ─── Event Listeners ─────────────────────────── */
  sidebarToggle.addEventListener('click', toggleSidebar);
  topbarToggle.addEventListener('click',  toggleSidebar);
  mobileMenuBtn.addEventListener('click', toggleSidebar);

  // Close drawer when backdrop is tapped
  overlay.addEventListener('click', closeMobileDrawer);

  // Close drawer on resize if viewport grows past mobile breakpoint
  window.addEventListener('resize', () => {
    if (!isMobile() && sidebar.classList.contains('mobile-open')) {
      closeMobileDrawer();
    }
  });

  /* ─── Nav Item Active State ───────────────────── */
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      // Auto-close mobile drawer after navigation
      if (isMobile()) closeMobileDrawer();
    });
  });
})();
