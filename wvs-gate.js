/* Password gate for the Windows case study.
   This is a courtesy lock, not security: the page ships to the browser either way.
   The password is stored only as a SHA-256 hash so it is not readable in the source. */
(function () {
  var HASH = '9401dcb7f2a865ede297155d3cff58fc163da795b245d46a460c9e0f7b3f59c4';
  var KEY = 'wvs-unlocked';
  var TARGET = 'windows-visual-systems.html';

  function unlocked() { try { return sessionStorage.getItem(KEY) === '1'; } catch (e) { return false; } }
  function remember() { try { sessionStorage.setItem(KEY, '1'); } catch (e) {} }

  function sha256(text) {
    var data = new TextEncoder().encode(text);
    return crypto.subtle.digest('SHA-256', data).then(function (buf) {
      return Array.prototype.map.call(new Uint8Array(buf), function (b) { return ('0' + b.toString(16)).slice(-2); }).join('');
    });
  }

  function wire(form, onPass) {
    var input = form.querySelector('.wg-input');
    var msg = form.parentNode.querySelector('.wg-msg');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var guess = (input.value || '').trim().toLowerCase().replace(/\s+/g, '');
      if (!guess) { input.focus(); return; }
      sha256(guess).then(function (h) {
        if (h === HASH) { try { sessionStorage.setItem('wvs-pw-once', guess); } catch (e) {}
          remember();
          msg.className = 'wg-msg is-ok';
          msg.textContent = 'Welcome in. Booting up...';
          setTimeout(onPass, 450);
        } else {
          msg.className = 'wg-msg is-error';
          msg.textContent = 'Not quite. Hint: how long Windows is sticking around.';
          form.classList.remove('is-shake'); void form.offsetWidth; form.classList.add('is-shake');
          input.select();
        }
      });
    });
  }

  var mode = document.currentScript && document.currentScript.dataset.mode;

  if (mode === 'launcher') {
    var dlg = document.getElementById('wg-dialog');
    var opener = document.querySelectorAll('[data-wg-open]');
    if (!dlg) return;
    opener.forEach(function (btn) {
      if (btn.tagName !== 'BUTTON') btn.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
      });
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        if (unlocked()) { location.href = TARGET; return; }
        if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
        setTimeout(function () { dlg.querySelector('.wg-input').focus(); }, 60);
      });
    });
    dlg.querySelector('.wg-close').addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    wire(dlg.querySelector('.wg-form'), function () { location.href = TARGET; });
  }

  if (mode === 'page') {
    var root = document.documentElement;
    if (unlocked()) { root.classList.remove('wg-locked'); return; }
    var cover = document.getElementById('wg-cover');
    if (!cover) { root.classList.remove('wg-locked'); return; }
    wire(cover.querySelector('.wg-form'), function () {
      root.classList.remove('wg-locked');
      window.scrollTo(0, 0);
    });
    setTimeout(function () { var i = cover.querySelector('.wg-input'); if (i) i.focus(); }, 80);
  }
})();
