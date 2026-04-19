import React from 'react';
import clsx from 'clsx';
import {useLocation} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useThemeTransition} from '../ThemeTransitionContext';
import {isLandingHomePathname} from '@site/src/utils/isLandingHome';

function getLabel(value) {
  return value === 'dark' ? '切换到浅色模式' : '切换到深色模式';
}

export default function ColorModeToggle({className, value, onChange}) {
  const {runThemeTransition} = useThemeTransition();
  const {pathname} = useLocation();
  const {
    siteConfig: {baseUrl},
  } = useDocusaurusContext();

  if (isLandingHomePathname(pathname, baseUrl)) {
    return null;
  }

  const nextMode = value === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      className={clsx('clean-btn', className, 'theme-toggle-reveal-btn')}
      title={getLabel(value)}
      aria-label={getLabel(value)}
      onClick={(event) => {
        runThemeTransition(event, nextMode, () => onChange(nextMode));
      }}>
      <span className="theme-toggle-icon" aria-hidden="true">
        {value === 'dark' ? '🌙' : '☀️'}
      </span>
    </button>
  );
}
