import React from 'react';
import clsx from 'clsx';
import {useThemeTransition} from '../ThemeTransitionContext';

function getLabel(value) {
  return value === 'dark' ? '切换到浅色模式' : '切换到深色模式';
}

export default function ColorModeToggle({className, value, onChange}) {
  const {runThemeTransition} = useThemeTransition();
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
