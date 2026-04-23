const TRAIL_X_POS =
  'linear-gradient(to right, transparent 0%, rgba(79, 209, 197, 0.06) 50%, rgba(79, 209, 197, 0.32) 100%)';
const TRAIL_X_NEG =
  'linear-gradient(to left, transparent 0%, rgba(79, 209, 197, 0.06) 50%, rgba(79, 209, 197, 0.32) 100%)';
const TRAIL_Y_POS =
  'linear-gradient(to bottom, transparent 0%, rgba(79, 209, 197, 0.06) 50%, rgba(79, 209, 197, 0.32) 100%)';
const TRAIL_Y_NEG =
  'linear-gradient(to top, transparent 0%, rgba(79, 209, 197, 0.06) 50%, rgba(79, 209, 197, 0.32) 100%)';

/**
 * @param {HTMLElement | null} trailEl
 * @param {HTMLElement | null} starWrap
 * @param {{xPx:number,yPx:number,vx:number,vy:number,legStartX:number,legStartY:number,maxTrailPx:number}} s
 */
export function applyLandingLightStyles(trailEl, starWrap, s) {
  if (!starWrap) return;
  starWrap.style.transform = `translate3d(${s.xPx}px, ${s.yPx}px, 0) translate(-50%, -50%)`;

  if (!trailEl) return;

  const horiz = Math.abs(s.vy) < 0.001;
  const minTrail = 6;

  if (horiz) {
    let effLeg = s.legStartX;
    if (s.vx >= 0) effLeg = Math.max(s.legStartX, s.xPx - s.maxTrailPx);
    else effLeg = Math.min(s.legStartX, s.xPx + s.maxTrailPx);

    const left = Math.min(effLeg, s.xPx);
    const width = Math.abs(s.xPx - effLeg);
    if (width < minTrail) {
      trailEl.style.opacity = '0';
    } else {
      trailEl.style.opacity = '1';
      trailEl.style.left = `${left}px`;
      trailEl.style.top = `${s.yPx - 1}px`;
      trailEl.style.width = `${width}px`;
      trailEl.style.height = '2px';
      trailEl.style.transform = 'none';
      trailEl.style.background = s.vx >= 0 ? TRAIL_X_POS : TRAIL_X_NEG;
    }
    return;
  }

  let effLeg = s.legStartY;
  if (s.vy >= 0) effLeg = Math.max(s.legStartY, s.yPx - s.maxTrailPx);
  else effLeg = Math.min(s.legStartY, s.yPx + s.maxTrailPx);

  const top = Math.min(effLeg, s.yPx);
  const height = Math.abs(s.yPx - effLeg);
  if (height < minTrail) {
    trailEl.style.opacity = '0';
  } else {
    trailEl.style.opacity = '1';
    trailEl.style.left = `${s.xPx - 1}px`;
    trailEl.style.top = `${top}px`;
    trailEl.style.width = '2px';
    trailEl.style.height = `${height}px`;
    trailEl.style.transform = 'none';
    trailEl.style.background = s.vy >= 0 ? TRAIL_Y_POS : TRAIL_Y_NEG;
  }
}

