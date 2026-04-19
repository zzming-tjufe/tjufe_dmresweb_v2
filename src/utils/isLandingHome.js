/**
 * 判断当前是否为站点根路径（一级落地页），需与 baseUrl 一致。
 * @param {string} pathname
 * @param {string} baseUrl Docusaurus 配置中的 baseUrl，如 `/tjufe_dmres_web/`
 */
export function isLandingHomePathname(pathname, baseUrl) {
  const base = (baseUrl || '').replace(/\/+$/, '');
  const path = (pathname || '/').replace(/\/+$/, '') || '/';
  if (!base) {
    return path === '/' || path === '';
  }
  return path === base;
}
