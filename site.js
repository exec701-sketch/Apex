
function openLinkedDetail() {
  const detail = document.getElementById(window.location.hash.slice(1));
  if (detail instanceof HTMLDetailsElement) {
    detail.open = true;
    detail.scrollIntoView({ block: 'start' });
  }
}
window.addEventListener('hashchange', openLinkedDetail);
openLinkedDetail();

const form = document.querySelector('.rfq form');
if (form) {
  const submit = form.querySelector('button[type="submit"]');
  const status = form.querySelector('[role="status"]');
  form.addEventListener('submit', async event => {
    event.preventDefault();
    submit.disabled = true;
    status.removeAttribute('data-error');
    status.textContent = 'Saving your request…';
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new URLSearchParams(new FormData(form)),
      });
      const { message } = await response.json();
      status.textContent = message;
      if (response.ok) form.reset();
      else status.setAttribute('data-error', '');
    } catch {
      status.textContent = 'The status of your request could not be confirmed. Please try again.';
      status.setAttribute('data-error', '');
    } finally {
      submit.disabled = false;
    }
  });
}
