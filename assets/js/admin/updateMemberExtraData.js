const getPlayerTag = btn => btn.closest('li')?.id.replace('T-', '');
const getIndicatorSpan = (playerTag, propertyName) => document.body.querySelector(`li#T-${playerTag} span.indicator-name-${propertyName}`);
const getUpdateStep = btn => parseInt(btn.parentElement.dataset.step);
const btns = Array.from(document.body.getElementsByClassName('update-indicator-btn'));
for(const btn of btns)
{
  btn.onclick = async e => {
    e.stopPropagation();
    e.preventDefault();

    const name = btn.dataset.name;
    const tag = getPlayerTag(btn);
    const indicatorSpan = getIndicatorSpan(tag, name);
    const oldValue = parseInt(indicatorSpan.textContent);
    const step = getUpdateStep(btn);

    let newValue = oldValue + (
      Array.from(btn.classList).indexOf('plus') != -1
        ? 1
        : -1
    ) * step;

    if(name == 'games_points' && newValue > 5000) newValue = 5000;
    if(newValue < 0) newValue = 0;
    indicatorSpan.textContent = newValue

    await fetch('/member/'+tag, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ name, newValue }),
    })
      .then(async res => {
        if(res.ok) return;
        const data = await res.json();
        console.error(data.msg);
        indicatorSpan.textContent = oldValue;
      });
  };
}
