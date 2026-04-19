import React, {useEffect, useRef} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import clsx from 'clsx';

import styles from './landing.module.css';

const GRID_CELL = 120;
const MOVE_SPEED = 260;
/** 拖尾最大长度（px），避免过长 */
const MAX_TRAIL_PX = 200;
/** 退场时拖尾末端追向星点的速度倍率（>1 才能快过星点） */
const EXIT_CATCH_MULT = 2.05;
/** 在网格交点尝试 90° 转弯的概率 */
const TURN_PROB = 0.36;

/**
 * @param {HTMLElement | null} trailEl
 * @param {HTMLElement | null} starWrap
 * @param {number} w
 * @param {number} h
 * @param {number} xPx
 * @param {number} yPx
 * @param {number} vx
 * @param {number} vy
 * @param {number} legStartX
 * @param {number} legStartY
 */
function applyLightStyles(trailEl, starWrap, w, h, xPx, yPx, vx, vy, legStartX, legStartY) {
  if (!starWrap) return;

  starWrap.style.left = `${xPx}px`;
  starWrap.style.top = `${yPx}px`;

  if (!trailEl) return;

  const horiz = Math.abs(vy) < 0.001;
  const minTrail = 6;

  if (horiz) {
    let effLeg = legStartX;
    if (vx >= 0) effLeg = Math.max(legStartX, xPx - MAX_TRAIL_PX);
    else effLeg = Math.min(legStartX, xPx + MAX_TRAIL_PX);

    const left = Math.min(effLeg, xPx);
    const width = Math.abs(xPx - effLeg);
    if (width < minTrail) {
      trailEl.style.opacity = '0';
    } else {
      trailEl.style.opacity = '1';
      trailEl.style.left = `${left}px`;
      trailEl.style.top = `${yPx - 1}px`;
      trailEl.style.width = `${width}px`;
      trailEl.style.height = '2px';
      trailEl.style.transform = 'none';
      trailEl.style.background =
        vx >= 0
          ? 'linear-gradient(to right, transparent 0%, rgba(79, 209, 197, 0.06) 50%, rgba(79, 209, 197, 0.32) 100%)'
          : 'linear-gradient(to left, transparent 0%, rgba(79, 209, 197, 0.06) 50%, rgba(79, 209, 197, 0.32) 100%)';
    }
  } else {
    let effLeg = legStartY;
    if (vy >= 0) effLeg = Math.max(legStartY, yPx - MAX_TRAIL_PX);
    else effLeg = Math.min(legStartY, yPx + MAX_TRAIL_PX);

    const top = Math.min(effLeg, yPx);
    const height = Math.abs(yPx - effLeg);
    if (height < minTrail) {
      trailEl.style.opacity = '0';
    } else {
      trailEl.style.opacity = '1';
      trailEl.style.left = `${xPx - 1}px`;
      trailEl.style.top = `${top}px`;
      trailEl.style.width = '2px';
      trailEl.style.height = `${height}px`;
      trailEl.style.transform = 'none';
      trailEl.style.background =
        vy >= 0
          ? 'linear-gradient(to bottom, transparent 0%, rgba(79, 209, 197, 0.06) 50%, rgba(79, 209, 197, 0.32) 100%)'
          : 'linear-gradient(to top, transparent 0%, rgba(79, 209, 197, 0.06) 50%, rgba(79, 209, 197, 0.32) 100%)';
    }
  }
}

function trailFullyOutsideViewport(legStartX, xPx, legStartY, yPx, vx, vy, w, h) {
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

/** 一级落地页：四角星 + 网格拖尾，可 90° 转弯；出界后等拖尾离开再刷新 */
export default function LandingPage() {
  const heroRef = useRef(null);
  const trailRef = useRef(null);
  const starWrapRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    const prev = root.getAttribute('data-theme');
    root.setAttribute('data-theme', 'dark');
    document.body.classList.add('landing-ragflow-theme');
    return () => {
      document.body.classList.remove('landing-ragflow-theme');
      if (prev === 'light' || prev === 'dark') {
        root.setAttribute('data-theme', prev);
      }
    };
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const trailEl = trailRef.current;
    const starWrap = starWrapRef.current;
    if (!hero) return;

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      const r = hero.getBoundingClientRect();
      const ix = Math.max(0, Math.floor(r.width / GRID_CELL / 2)) * GRID_CELL;
      const iy = Math.max(0, Math.floor((r.height * 3) / 4 / GRID_CELL)) * GRID_CELL;
      applyLightStyles(trailEl, starWrap, r.width, r.height, ix, iy, 0, 0, ix, iy);
      if (trailEl) trailEl.style.opacity = '0';
      return;
    }

    let xPx = 0;
    let yPx = 0;
    let vx = MOVE_SPEED;
    let vy = 0;
    let legStartX = 0;
    let legStartY = 0;
    /** 水平移动时锁定的 y（格线）；竖直移动时不用 */
    let lockedY = 0;
    /** 竖直移动时锁定的 x；水平移动时不用 */
    let lockedX = 0;
    let exiting = false;
    let lastT = performance.now();
    let rafId = 0;
    let cancelled = false;

    function dims() {
      const r = hero.getBoundingClientRect();
      return {
        w: r.width,
        h: r.height,
        maxIx: Math.max(1, Math.floor(r.width / GRID_CELL)),
        maxIy: Math.max(1, Math.floor(r.height / GRID_CELL)),
      };
    }

    /** 光点与拖尾一定从四条边之一进入，速度指向场内 */
    function refresh() {
      const {w, h, maxIx, maxIy} = dims();
      if (w < 16 || h < 16) return;

      const edge = Math.floor(Math.random() * 4);
      const maxGridX = maxIx * GRID_CELL;
      const maxGridY = maxIy * GRID_CELL;

      if (edge === 0) {
        const iy = Math.floor(Math.random() * (maxIy + 1));
        lockedY = Math.min(iy * GRID_CELL, maxGridY, h);
        xPx = 0;
        yPx = lockedY;
        vx = MOVE_SPEED;
        vy = 0;
      } else if (edge === 1) {
        const iy = Math.floor(Math.random() * (maxIy + 1));
        lockedY = Math.min(iy * GRID_CELL, maxGridY, h);
        xPx = Math.min(maxGridX, w);
        yPx = lockedY;
        vx = -MOVE_SPEED;
        vy = 0;
      } else if (edge === 2) {
        const ix = Math.floor(Math.random() * (maxIx + 1));
        lockedX = Math.min(ix * GRID_CELL, maxGridX, w);
        xPx = lockedX;
        yPx = 0;
        vx = 0;
        vy = MOVE_SPEED;
      } else {
        const ix = Math.floor(Math.random() * (maxIx + 1));
        lockedX = Math.min(ix * GRID_CELL, maxGridX, w);
        xPx = lockedX;
        yPx = Math.min(maxGridY, h);
        vx = 0;
        vy = -MOVE_SPEED;
      }

      legStartX = xPx;
      legStartY = yPx;
      exiting = false;
    }

    /**
     * 在网格交点 (x,y) 随机尝试 90° 或保持直行；禁止 180°（当前向量的反向）。
     */
    function tryTurnAtIntersection(x, y) {
      const {w, h} = dims();
      /** @type {{vx: number; vy: number}[]} */
      let cand = [];

      if (Math.abs(vy) < 0.001) {
        if (vx > 0) {
          cand = [
            {vx: MOVE_SPEED, vy: 0},
            {vx: 0, vy: -MOVE_SPEED},
            {vx: 0, vy: MOVE_SPEED},
          ];
        } else {
          cand = [
            {vx: -MOVE_SPEED, vy: 0},
            {vx: 0, vy: -MOVE_SPEED},
            {vx: 0, vy: MOVE_SPEED},
          ];
        }
      } else {
        if (vy > 0) {
          cand = [
            {vx: 0, vy: MOVE_SPEED},
            {vx: MOVE_SPEED, vy: 0},
            {vx: -MOVE_SPEED, vy: 0},
          ];
        } else {
          cand = [
            {vx: 0, vy: -MOVE_SPEED},
            {vx: MOVE_SPEED, vy: 0},
            {vx: -MOVE_SPEED, vy: 0},
          ];
        }
      }

      const filtered = cand.filter((c) => {
        const tx = x + Math.sign(c.vx) * GRID_CELL * 0.25;
        const ty = y + Math.sign(c.vy) * GRID_CELL * 0.25;
        return tx >= -4 && tx <= w + 4 && ty >= -4 && ty <= h + 4;
      });
      if (filtered.length === 0) return false;
      if (Math.random() > TURN_PROB) return false;

      const c = filtered[Math.floor(Math.random() * filtered.length)];
      xPx = x;
      yPx = y;
      if (c.vx === vx && c.vy === vy) {
        return false;
      }
      vx = c.vx;
      vy = c.vy;
      legStartX = x;
      legStartY = y;
      if (Math.abs(vy) < 0.001) {
        lockedY = y;
      } else {
        lockedX = x;
      }
      return true;
    }

    function tick(now) {
      if (cancelled) return;
      const {w, h} = dims();
      const dt = Math.min(0.032, Math.max(0, (now - lastT) / 1000));
      lastT = now;

      if (exiting) {
        xPx += vx * dt;
        yPx += vy * dt;
        const catchStep = MOVE_SPEED * EXIT_CATCH_MULT * dt;
        if (Math.abs(vx) > 0.1) {
          if (legStartX < xPx) legStartX = Math.min(xPx, legStartX + catchStep);
          else legStartX = Math.max(xPx, legStartX - catchStep);
        }
        if (Math.abs(vy) > 0.1) {
          if (legStartY < yPx) legStartY = Math.min(yPx, legStartY + catchStep);
          else legStartY = Math.max(yPx, legStartY - catchStep);
        }

        if (trailFullyOutsideViewport(legStartX, xPx, legStartY, yPx, vx, vy, w, h)) {
          refresh();
        }
        applyLightStyles(trailEl, starWrap, w, h, xPx, yPx, vx, vy, legStartX, legStartY);
        rafId = requestAnimationFrame(tick);
        return;
      }

      const ox = xPx;
      const oy = yPx;
      let nx = ox + vx * dt;
      let ny = oy + vy * dt;

      const wouldExit =
        (vx > 0 && nx > w) ||
        (vx < 0 && nx < 0) ||
        (vy > 0 && ny > h) ||
        (vy < 0 && ny < 0);

      if (wouldExit) {
        exiting = true;
        xPx = nx;
        yPx = ny;
        applyLightStyles(trailEl, starWrap, w, h, xPx, yPx, vx, vy, legStartX, legStartY);
        rafId = requestAnimationFrame(tick);
        return;
      }

      if (Math.abs(vy) < 0.001) {
        yPx = lockedY;
        const oix = Math.floor(ox / GRID_CELL);
        const nix = Math.floor(nx / GRID_CELL);
        if (nix !== oix) {
          const lineX = vx > 0 ? (oix + 1) * GRID_CELL : oix * GRID_CELL;
          xPx = Math.min(Math.max(lineX, 0), w);
          tryTurnAtIntersection(xPx, yPx);
        } else {
          xPx = nx;
        }
      } else {
        xPx = lockedX;
        const oiy = Math.floor(oy / GRID_CELL);
        const niy = Math.floor(ny / GRID_CELL);
        if (niy !== oiy) {
          const lineY = vy > 0 ? (oiy + 1) * GRID_CELL : oiy * GRID_CELL;
          yPx = Math.min(Math.max(lineY, 0), h);
          tryTurnAtIntersection(xPx, yPx);
        } else {
          yPx = ny;
        }
      }

      if (Math.abs(vy) < 0.001) {
        yPx = lockedY;
        yPx = Math.min(Math.max(yPx, 0), h);
        xPx = Math.min(Math.max(xPx, 0), w);
      } else {
        xPx = lockedX;
        xPx = Math.min(Math.max(xPx, 0), w);
        yPx = Math.min(Math.max(yPx, 0), h);
      }

      applyLightStyles(trailEl, starWrap, w, h, xPx, yPx, vx, vy, legStartX, legStartY);
      rafId = requestAnimationFrame(tick);
    }

    const ro = new ResizeObserver(() => {
      refresh();
      const {w, h} = dims();
      applyLightStyles(trailEl, starWrap, w, h, xPx, yPx, vx, vy, legStartX, legStartY);
    });
    ro.observe(hero);

    refresh();
    const {w, h} = dims();
    applyLightStyles(trailEl, starWrap, w, h, xPx, yPx, vx, vy, legStartX, legStartY);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  return (
    <Layout title="天财数管资源站" description="面向新生与进阶学习者的文档资源站">
      <div className={styles.page}>
        <header ref={heroRef} className={styles.hero} data-landing-ragflow>
          <div className={styles.bg} aria-hidden>
            <div className={styles.grid} />
            <div ref={trailRef} className={styles.lightTrail} />
            <div ref={starWrapRef} className={styles.lightWrap}>
              <div className={styles.lightGlow} aria-hidden />
              <div className={styles.lightStar} aria-hidden />
            </div>
          </div>
          <div className={styles.inner}>
            <p className={styles.kicker}>文档 · 工具 · 共建</p>
            <h1 className={styles.title}>
              为学习与工具实践
              <br />
              构建<span className={styles.titleAccent}> 更可信的资源导航</span>
            </h1>
            <p className={styles.sub}>
              面向新生的开源工具、生成式 AI、网络与方法论导航。从总览进入文档，或在站内导航里按模块直达。
            </p>
            <div className={styles.actions}>
              <Link className={clsx('button button--lg', styles.primaryBtn)} to="/docs">
                开始阅读
              </Link>
              <Link className={clsx('button button--lg', styles.secondaryBtn)} to="/home">
                站内导航
              </Link>
            </div>
            <p className={styles.hint}>
              需要按章节浏览时使用顶部 <code>文档</code>；快速进模块卡片请打开 <code>站内导航</code>。
            </p>
          </div>
        </header>
      </div>
    </Layout>
  );
}
