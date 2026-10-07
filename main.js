(function () {
  var root = document.documentElement;
  var buttons = document.querySelectorAll('[data-set-lang]');

  function setLang(lang) {
    root.lang = lang === 'en' ? 'en' : 'zh-Hant';
    buttons.forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.setLang === lang));
    });
    try { localStorage.setItem('lang', lang); } catch (e) {}
  }

  var saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) {}
  setLang(saved === 'en' ? 'en' : 'zh');
  buttons.forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.dataset.setLang); });
  });

  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.dataset.copy;
      var done = function () {
        var label = root.lang === 'en' ? 'Copied' : '已複製';
        var old = btn.innerHTML;
        btn.textContent = label;
        setTimeout(function () { btn.innerHTML = old; }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { selectEmail(); });
      } else {
        selectEmail();
      }
    });
  });

  function selectEmail() {
    var el = document.getElementById('email');
    var range = document.createRange();
    range.selectNodeContents(el);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }
})();
