import React, {useMemo, useRef, useState} from 'react';
import {useLocation} from '@docusaurus/router';
import Layout from '@theme-original/Layout';
import {ThemeTransitionProvider} from '../ThemeTransitionContext';

import styles from './styles.module.css';

export default function LayoutWrapper(props) {
  const location = useLocation();
  const cleanupTimerRef = useRef(null);
  const [overlayState, setOverlayState] = useState({
    active: false,
    x: 0,
    y: 0,
    radius: 0,
    maxRadius: 0,
    color: '#ffffff',
  });

  const transitionApi = useMemo(
    () => ({
      runThemeTransition(event, nextMode, applyModeChange) {
        const reduceMotion =
          typeof window !== 'undefined' &&
          window.matchMedia &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (reduceMotion || typeof window === 'undefined') {
          applyModeChange();
          return;
        }

        const rect = event?.currentTarget?.getBoundingClientRect?.();
        const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
        const y = rect ? rect.top + rect.height / 2 : 24;
        const maxRadius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
        const color = nextMode === 'dark' ? '#1f1c19' : '#f7f4ee';

        if (cleanupTimerRef.current) {
          window.clearTimeout(cleanupTimerRef.current);
        }

        setOverlayState({
          active: true,
          x,
          y,
          radius: 0,
          maxRadius,
          color,
        });

        window.requestAnimationFrame(() => {
          applyModeChange();
          window.requestAnimationFrame(() => {
            setOverlayState((prev) => ({...prev, radius: prev.maxRadius}));
          });
        });

        cleanupTimerRef.current = window.setTimeout(() => {
          setOverlayState((prev) => ({...prev, active: false, radius: 0}));
        }, 620);
      },
    }),
    [],
  );

  return (
    <ThemeTransitionProvider value={transitionApi}>
      <Layout {...props}>
        {overlayState.active && (
          <div
            className={styles.themeRevealOverlay}
            style={{
              '--reveal-x': `${overlayState.x}px`,
              '--reveal-y': `${overlayState.y}px`,
              '--reveal-radius': `${overlayState.radius}px`,
              '--reveal-color': overlayState.color,
            }}
          />
        )}
        <div key={location.pathname} className={`${styles.routeTransition} site-theme-claude`}>
          {props.children}
        </div>
      </Layout>
    </ThemeTransitionProvider>
  );
}
