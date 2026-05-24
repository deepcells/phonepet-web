// 点击复制邮箱。失败时自动回退到「选中文字让用户手动 ⌘+C」。
// 任何例外都不会向用户抛错——按稳定优先原则，必须有兜底反馈。
document.addEventListener('click', async (e) => {
  const btn = e.target.closest('.copy-email');
  if (!btn) return;

  const email = btn.dataset.email;
  if (!email) return;

  e.preventDefault();
  const original = btn.textContent;

  const restore = () => {
    btn.textContent = original;
    btn.classList.remove('copy-email--done');
  };

  try {
    await navigator.clipboard.writeText(email);
    btn.textContent = '✓ 已复制';
    btn.classList.add('copy-email--done');
  } catch {
    // 老浏览器 / 非 HTTPS / 权限被拒：选中文字让用户手动复制
    const range = document.createRange();
    range.selectNodeContents(btn);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    btn.classList.add('copy-email--done');
  }
  setTimeout(restore, 1800);
});
