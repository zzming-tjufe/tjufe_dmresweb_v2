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
 * @param {number} xPx
 * @param {number} yPx
 * @param {number} vx
 * @param {number} vy
 * @param {number} legStartX
 * @param {number} legStartY
 */
function applyLightStyles(trailEl, starWrap, xPx, yPx, vx, vy, legStartX, legStartY) {
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
      trailEl.style.background = vx >= 0 ? TRAIL_X_POS : TRAIL_X_NEG;
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
      trailEl.style.background = vy >= 0 ? TRAIL_Y_POS : TRAIL_Y_NEG;
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

/** 一级落地页：四角星 + 网格拖尾，固定四向循环直行；出界后等拖尾离开再刷新 */
export default function LandingPage() {
  const heroRef = useRef(null);
  const trailRef = useRef(null);
  const starWrapRef = useRef(null);
  const cycleRef = useRef(0);

  useEffect(() => {
    // 仅做首页专属外观类，不直接改全站 data-theme，避免与 Docusaurus 主题机制冲突。
    document.body.classList.add('landing-ragflow-theme');
    return () => {
      document.body.classList.remove('landing-ragflow-theme');
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
      applyLightStyles(trailEl, starWrap, ix, iy, 0, 0, ix, iy);
      if (trailEl) trailEl.style.opacity = '0';
      return;
    }

    /** 场景尺寸缓存，避免每帧 getBoundingClientRect 引发卡顿 */
    let w = 0;
    let h = 0;
    let maxIx = 1;
    let maxIy = 1;
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

    function updateStage() {
      const r = hero.getBoundingClientRect();
      w = r.width;
      h = r.height;
      maxIx = Math.max(1, Math.floor(r.width / GRID_CELL));
      maxIy = Math.max(1, Math.floor(r.height / GRID_CELL));
    }

    /** 光点与拖尾从四条边按固定周期进入，速度指向场内 */
    function refresh() {
      if (w < 16 || h < 16) return;

      const edge = cycleRef.current % 4;
      cycleRef.current += 1;
      const maxGridX = maxIx * GRID_CELL;
      const maxGridY = maxIy * GRID_CELL;
      const centerIx = Math.floor(maxIx / 2);
      const centerIy = Math.floor(maxIy / 2);

      if (edge === 0) {
        const iy = centerIy;
        lockedY = Math.min(iy * GRID_CELL, maxGridY, h);
        xPx = 0;
        yPx = lockedY;
        vx = MOVE_SPEED;
        vy = 0;
      } else if (edge === 1) {
        const ix = centerIx;
        lockedX = Math.min(ix * GRID_CELL, maxGridX, w);
        xPx = lockedX;
        yPx = 0;
        vx = 0;
        vy = MOVE_SPEED;
      } else if (edge === 2) {
        const iy = centerIy;
        lockedY = Math.min(iy * GRID_CELL, maxGridY, h);
        xPx = Math.min(maxGridX, w);
        yPx = lockedY;
        vx = -MOVE_SPEED;
        vy = 0;
      } else {
        const ix = centerIx;
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

    function tick(now) {
      if (cancelled) return;
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
        applyLightStyles(trailEl, starWrap, xPx, yPx, vx, vy, legStartX, legStartY);
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
        applyLightStyles(trailEl, starWrap, xPx, yPx, vx, vy, legStartX, legStartY);
        rafId = requestAnimationFrame(tick);
        return;
      }

      if (Math.abs(vy) < 0.001) {
        yPx = lockedY;
        xPx = nx;
      } else {
        xPx = lockedX;
        yPx = ny;
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

      applyLightStyles(trailEl, starWrap, xPx, yPx, vx, vy, legStartX, legStartY);
      rafId = requestAnimationFrame(tick);
    }

    const ro = new ResizeObserver(() => {
      updateStage();
      refresh();
      applyLightStyles(trailEl, starWrap, xPx, yPx, vx, vy, legStartX, legStartY);
    });
    ro.observe(hero);

    updateStage();
    refresh();
    applyLightStyles(trailEl, starWrap, xPx, yPx, vx, vy, legStartX, legStartY);
    rafId = requestAnimationFrame(() => requestAnimationFrame(tick));

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
            <div className={styles.splitHero}>
              <section className={styles.leftPane}>
                <h1 className={styles.leftTitle}>天财数管资源站</h1>
                <p className={styles.leftSub}>
                  面向新生的开源工具、生成式 AI、网络与方法论导航。从总览进入文档，或在站内导航里按模块直达。
                </p>
              </section>
              <div className={styles.divider} aria-hidden />
              <section className={styles.rightPane}>
                <h2 className={styles.rightTitle}>
                  为学习与工具实践
                  <br />
                  构建<span className={styles.titleAccent}> 更可信的资源导航</span>
                </h2>
                <div className={styles.rightActions}>
                  <Link className={clsx('button button--lg', styles.primaryBtn)} to="/docs">
                    开始阅读
                  </Link>
                  <Link className={clsx('button button--lg', styles.secondaryBtn)} to="/home">
                    站内导航
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </header>
      </div>
    </Layout>
  );
}
