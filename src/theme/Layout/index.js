import React, {useMemo} from 'react';
import {useLocation} from '@docusaurus/router';
import Layout from '@theme-original/Layout';
// 问答入口：组件保留在 `src/components/SiteChatAssistant/`，需要时取消下面两行注释并恢复 JSX 中的 `<SiteChatAssistant />`。
// import SiteChatAssistant from '@site/src/components/SiteChatAssistant';
import {ThemeTransitionProvider} from '../ThemeTransitionContext';

import styles from './styles.module.css';

export default function LayoutWrapper(props) {
  const location = useLocation();

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
        const root = document.documentElement;
        const lightBg =
          getComputedStyle(root).getPropertyValue('--site-reveal-bg-light').trim() || '#f7f4ee';
        const darkBg =
          getComputedStyle(root).getPropertyValue('--site-reveal-bg-dark').trim() || '#1f1c19';
        const color = nextMode === 'dark' ? darkBg : lightBg;

        // Let pages (e.g. homepage hero) decide where to render the reveal layer.
        if (typeof window !== 'undefined') {
          window.dispatchEvent(
            new CustomEvent('theme-reveal', {
              detail: {x, y, color},
            }),
          );
        }

        window.requestAnimationFrame(() => {
          applyModeChange();
        });
      },
    }),
    [],
  );

  return (
    <ThemeTransitionProvider value={transitionApi}>
      <Layout {...props}>
        <div key={location.pathname} className={`${styles.routeTransition} site-theme-claude`}>
          {props.children}
        </div>
      </Layout>
      {/* <SiteChatAssistant /> */}
    </ThemeTransitionProvider>
  );
}
