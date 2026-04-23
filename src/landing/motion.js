import {landingAnimConfig} from './animConfig';

/**
 * @param {number} legStartX
 * @param {number} xPx
 * @param {number} legStartY
 * @param {number} yPx
 * @param {number} vx
 * @param {number} vy
 * @param {number} w
 * @param {number} h
 */
export function trailFullyOutsideViewport(legStartX, xPx, legStartY, yPx, vx, vy, w, h) {
  if (Math.abs(vy) < 0.001) {
    const lo = Math.min(legStartX, xPx);
    const hi = Math.max(legStartX, xPx);
    if (yPx < 0 || yPx > h) return true;
    return hi <= 0 || lo >= w;
  }
  const lo = Math.min(legStartY, yPx);
  const hi = Math.max(legStartY, yPx);
  if (xPx < 0 || xPx > w) return true;
  return hi <= 0 || lo >= h;
}

export function detectLowPerf(reduceMotion) {
  if (reduceMotion) return true;
  if (typeof navigator === 'undefined') return false;
  const conn = navigator.connection;
  if (conn && conn.saveData) return true;
  const hc = navigator.hardwareConcurrency;
  if (typeof hc === 'number' && hc > 0 && hc <= landingAnimConfig.lowPerf.maxHardwareConcurrency) return true;
  const dm = navigator.deviceMemory;
  if (typeof dm === 'number' && dm > 0 && dm <= landingAnimConfig.lowPerf.maxDeviceMemoryGb) return true;
  return false;
}

/**
 * 创建落地页动效状态机（不直接操作 DOM）
 * @param {{hero:HTMLElement, cycleRef:{current:number}, lowPerf:boolean}} args
 */
export function createLandingMotion(args) {
  const hero = args.hero;
  const cycleRef = args.cycleRef;
  const {gridCell, moveSpeed, exitCatchMult, speedLowPerfMult} = landingAnimConfig;

  /** 场景尺寸缓存 */
  let w = 0;
  let h = 0;
  let maxIx = 1;
  let maxIy = 1;

  /** 状态 */
  const speed = args.lowPerf ? moveSpeed * speedLowPerfMult : moveSpeed;
  const s = {
    xPx: 0,
    yPx: 0,
    vx: speed,
    vy: 0,
    legStartX: 0,
    legStartY: 0,
    lockedY: 0,
    lockedX: 0,
    exiting: false,
    maxTrailPx: landingAnimConfig.maxTrailPx,
  };

  function updateStage() {
    const r = hero.getBoundingClientRect();
    w = r.width;
    h = r.height;
    maxIx = Math.max(1, Math.floor(r.width / gridCell));
    maxIy = Math.max(1, Math.floor(r.height / gridCell));
  }

  /** 从四条边按固定周期进入，速度指向场内 */
  function refresh() {
    if (w < 16 || h < 16) return;

    const edge = (cycleRef.current || 0) % 4;
    cycleRef.current = (cycleRef.current || 0) + 1;

    const maxGridX = maxIx * gridCell;
    const maxGridY = maxIy * gridCell;
    const centerIx = Math.floor(maxIx / 2);
    const centerIy = Math.floor(maxIy / 2);

    if (edge === 0) {
      const iy = centerIy;
      s.lockedY = Math.min(iy * gridCell, maxGridY, h);
      s.xPx = 0;
      s.yPx = s.lockedY;
      s.vx = speed;
      s.vy = 0;
    } else if (edge === 1) {
      const ix = centerIx;
      s.lockedX = Math.min(ix * gridCell, maxGridX, w);
      s.xPx = s.lockedX;
      s.yPx = 0;
      s.vx = 0;
      s.vy = speed;
    } else if (edge === 2) {
      const iy = centerIy;
      s.lockedY = Math.min(iy * gridCell, maxGridY, h);
      s.xPx = Math.min(maxGridX, w);
      s.yPx = s.lockedY;
      s.vx = -speed;
      s.vy = 0;
    } else {
      const ix = centerIx;
      s.lockedX = Math.min(ix * gridCell, maxGridX, w);
      s.xPx = s.lockedX;
      s.yPx = Math.min(maxGridY, h);
      s.vx = 0;
      s.vy = -speed;
    }

    s.legStartX = s.xPx;
    s.legStartY = s.yPx;
    s.exiting = false;
  }

  /**
   * @param {number} dt seconds
   */
  function step(dt) {
    if (s.exiting) {
      s.xPx += s.vx * dt;
      s.yPx += s.vy * dt;

      const catchStep = moveSpeed * exitCatchMult * dt;
      if (Math.abs(s.vx) > 0.1) {
        if (s.legStartX < s.xPx) s.legStartX = Math.min(s.xPx, s.legStartX + catchStep);
        else s.legStartX = Math.max(s.xPx, s.legStartX - catchStep);
      }
      if (Math.abs(s.vy) > 0.1) {
        if (s.legStartY < s.yPx) s.legStartY = Math.min(s.yPx, s.legStartY + catchStep);
        else s.legStartY = Math.max(s.yPx, s.legStartY - catchStep);
      }

      if (trailFullyOutsideViewport(s.legStartX, s.xPx, s.legStartY, s.yPx, s.vx, s.vy, w, h)) {
        refresh();
      }
      return {s, didRefresh: false};
    }

    const ox = s.xPx;
    const oy = s.yPx;
    const nx = ox + s.vx * dt;
    const ny = oy + s.vy * dt;

    const wouldExit =
      (s.vx > 0 && nx > w) ||
      (s.vx < 0 && nx < 0) ||
      (s.vy > 0 && ny > h) ||
      (s.vy < 0 && ny < 0);

    if (wouldExit) {
      s.exiting = true;
      s.xPx = nx;
      s.yPx = ny;
      return {s, didRefresh: false};
    }

    if (Math.abs(s.vy) < 0.001) {
      s.yPx = s.lockedY;
      s.yPx = Math.min(Math.max(s.yPx, 0), h);
      s.xPx = nx;
      s.xPx = Math.min(Math.max(s.xPx, 0), w);
    } else {
      s.xPx = s.lockedX;
      s.xPx = Math.min(Math.max(s.xPx, 0), w);
      s.yPx = ny;
      s.yPx = Math.min(Math.max(s.yPx, 0), h);
    }

    return {s, didRefresh: false};
  }

  return {updateStage, refresh, step, state: s, getStage: () => ({w, h, maxIx, maxIy, gridCell})};
}

