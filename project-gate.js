/**
 * Portfolio project gate — hides case study until unlocked.
 * Future: validate password in #project-gate-form and call unlock().
 */
(function () {
  const script = document.currentScript;
  const projectId = script?.dataset?.project || 'default';
  const storageKey = 'portfolio-unlock-' + projectId;
  const gate = document.getElementById('project-gate');
  const content = document.getElementById('project-content');

  if (!gate || !content) return;

  function unlock() {
    sessionStorage.setItem(storageKey, '1');
    gate.hidden = true;
    content.hidden = false;
    content.removeAttribute('aria-hidden');
  }

  function lock() {
    gate.hidden = false;
    content.hidden = true;
    content.setAttribute('aria-hidden', 'true');
  }

  if (sessionStorage.getItem(storageKey)) {
    unlock();
  } else {
    lock();
  }

  window.portfolioProjectGate = { unlock, lock, projectId, storageKey };

  const form = document.getElementById('project-gate-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      // Password validation will be added when pages are ready.
    });
  }
})();
