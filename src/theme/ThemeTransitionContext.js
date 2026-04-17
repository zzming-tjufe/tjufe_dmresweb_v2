import React, {createContext, useContext} from 'react';

const ThemeTransitionContext = createContext({
  runThemeTransition: (_event, _nextMode, applyModeChange) => applyModeChange(),
});

export function ThemeTransitionProvider({value, children}) {
  return <ThemeTransitionContext.Provider value={value}>{children}</ThemeTransitionContext.Provider>;
}

export function useThemeTransition() {
  return useContext(ThemeTransitionContext);
}
