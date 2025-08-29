document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('track');
  const prevBtn = document.getElementById('btnPrev');
  const nextBtn = document.getElementById('btnNext');
  if (!track || !prevBtn || !nextBtn) return;

  track.addEventListener('wheel', e => e.preventDefault(), { passive: false });
  track.addEventListener('touchmove', e => e.preventDefault(), { passive: false });

  const getItemSize = () => {
    const item = track.querySelector('.item');
    if (!item) return Math.floor(track.clientWidth * 0.8);
    const gap = parseFloat(getComputedStyle(track).gap) || 16;
    return Math.round(item.offsetWidth + gap);
  };

  const getVisibleCount = (itemSize) => Math.max(1, Math.floor(track.clientWidth / itemSize));

  const updateButtons = () => {
    prevBtn.disabled = track.scrollLeft <= 0;
    nextBtn.disabled = Math.ceil(track.scrollLeft + track.clientWidth) >= track.scrollWidth;
  };

  const scrollToTarget = (target) => {
    const max = track.scrollWidth - track.clientWidth;
    const clamped = Math.max(0, Math.min(target, max));
    track.scrollTo({ left: clamped, behavior: 'smooth' });
    setTimeout(updateButtons, 350);
  };

  prevBtn.addEventListener('click', () => {
    const itemSize = getItemSize();
    const visible = getVisibleCount(itemSize);
    const amount = itemSize * visible;
    const target = track.scrollLeft - amount;
    scrollToTarget(target);
  });

  nextBtn.addEventListener('click', () => {
    const itemSize = getItemSize();
    const visible = getVisibleCount(itemSize);
    const amount = itemSize * visible;
    const target = track.scrollLeft + amount;
    scrollToTarget(target);
  });

  window.addEventListener('resize', updateButtons);
  track.addEventListener('scroll', updateButtons);

  updateButtons();
});
