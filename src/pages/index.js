import React, {useEffect, useRef} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import clsx from 'clsx';

import styles from './landing.module.css';
import {landingAnimConfig} from '../landing/animConfig';
import {applyLandingLightStyles} from '../landing/dom';
import {createLandingMotion, detectLowPerf} from '../landing/motion';

/** 一级落地页：四角星 + 网格拖尾，固定四向循环直行；出界后等拖尾离开再刷新 */
export default function LandingPage() {
  const heroRef = useRef(null);
  const trailRef = useRef(null);
  const starWrapRef = useRef(null);
  const cycleRef = useRef(0);

  // landing-ragflow-theme 由全局 Layout 根据路由统一控制，避免串台。

  useEffect(() => {
    const hero = heroRef.current;
    const trailEl = trailRef.current;
    const starWrap = starWrapRef.current;
    if (!hero) return;

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const lowPerf = detectLowPerf(reduceMotion);
    if (lowPerf) {
      hero.setAttribute('data-lowperf', 'true');
    }

    if (reduceMotion) {
      const r = hero.getBoundingClientRect();
      const ix = Math.max(0, Math.floor(r.width / landingAnimConfig.gridCell / 2)) * landingAnimConfig.gridCell;
      const iy =
        Math.max(0, Math.floor((r.height * 3) / 4 / landingAnimConfig.gridCell)) * landingAnimConfig.gridCell;
      applyLandingLightStyles(trailEl, starWrap, {
        xPx: ix,
        yPx: iy,
        vx: 0,
        vy: 0,
        legStartX: ix,
        legStartY: iy,
        maxTrailPx: landingAnimConfig.maxTrailPx,
      });
      if (trailEl) trailEl.style.opacity = '0';
      return;
    }

    let lastT = performance.now();
    let rafId = 0;
    let cancelled = false;

    const motion = createLandingMotion({hero, cycleRef, lowPerf});

    function tick(now) {
      if (cancelled) return;
      const maxDt = lowPerf ? landingAnimConfig.maxDtLowPerf : landingAnimConfig.maxDt;
      const dt = Math.min(maxDt, Math.max(0, (now - lastT) / 1000));
      lastT = now;
      motion.step(dt);
      applyLandingLightStyles(trailEl, starWrap, motion.state);
      rafId = requestAnimationFrame(tick);
    }

    const ro = new ResizeObserver(() => {
      motion.updateStage();
      motion.refresh();
      applyLandingLightStyles(trailEl, starWrap, motion.state);
    });
    ro.observe(hero);

    motion.updateStage();
    motion.refresh();
    applyLandingLightStyles(trailEl, starWrap, motion.state);
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
                  <Link className={clsx('button button--lg', styles.secondaryBtn)} to="/docs/guide/getting-started">
                    三步上手
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
