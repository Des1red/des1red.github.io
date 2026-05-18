// Cursor
  const cursor = document.getElementById('cursor');
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  const hoverTargets = document.querySelectorAll('#monitor, .term-tab, .dot-close, #btn-back, .t-link');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
  });

  // State
  let terminalOpen = false;

  const camera = document.getElementById('camera');
  const overlay = document.getElementById('terminal-overlay');
  const monitor = document.getElementById('monitor');
  const btnBack = document.getElementById('btn-back');
  const clickHint = document.getElementById('click-hint');

  // Open terminal
  monitor.addEventListener('click', () => {
    if (terminalOpen) return;
    terminalOpen = true;

    clickHint.style.display = 'none';

    // Push camera forward
    camera.style.transform = 'translateZ(400px)';
    camera.style.transition = 'transform 1.4s cubic-bezier(0.77,0,0.175,1)';

    // Fade scene items
    document.getElementById('setup').style.opacity = '0';

    // Show terminal overlay
    overlay.classList.add('active');

    // Show back button
    btnBack.classList.add('visible');
  });

  // Close terminal
  function closeTerminal() {
    if (!terminalOpen) return;
    terminalOpen = false;

    overlay.classList.remove('active');
    btnBack.classList.remove('visible');

    setTimeout(() => {
      camera.style.transform = 'translateZ(0px)';
      document.getElementById('setup').style.opacity = '1';
    }, 200);
  }

  btnBack.addEventListener('click', closeTerminal);
  document.getElementById('dot-close').addEventListener('click', closeTerminal);

  // Tabs
  document.querySelectorAll('.term-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.term-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('tab-' + tab.dataset.tab).classList.add('active');

      // Update cursor hover on new tabs
      tab.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    });
  });

  // Escape to close
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeTerminal();
  });
