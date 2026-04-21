# UI 样式规范

本规范用于统一全站的颜色、字体、间距、按钮与动效策略，降低“页面各写各的”导致的不一致与回归风险。

## 1. 颜色与语义（Design Tokens）

全站颜色以 `src/css/theme/tokens.css` 为**单一来源**：

- **主色**：`--ifm-color-primary`（浅/深主题各一套）
- **背景**：
  - `--ifm-background-color`（页面底色）
  - `--ifm-background-surface-color`（卡片/浮层底色）
- **文字**：
  - `--ifm-font-color-base`（正文）
  - `--ifm-heading-color`（标题）
  - `--site-text-muted`（次要说明）
  - `--site-text-subtle`（更弱的说明）
- **链接**：
  - `--site-link-color` / `--site-link-hover-color` / `--site-link-visited-color`
- **按钮前景**：
  - `--site-on-primary`（主按钮文字颜色，需与主色对比充足）

原则：

- **不要在页面里硬编码“主题主色”**。组件应尽量通过 `var(--ifm-color-primary)` 与 `color-mix(...)` 自动跟随。
- **落地页（`/`）可用独立视觉变量**（如 `landing.module.css` 的 `--rag-*`），但必须通过 `Layout` 的 `body.landing-ragflow-theme` 做隔离，避免串台。

## 2. 字体

基础字体栈由 `--ifm-font-family-base` 统一控制（已包含中英文优先级）。

- **正文与 UI**：`--ifm-font-family-base`
- **代码**：`--ifm-font-family-monospace`

## 3. 间距与圆角

建议在页面/组件内优先复用以下“常用档位”，避免出现大量不成体系的数值：

- **间距**：`0.25rem / 0.5rem / 0.75rem / 1rem / 1.5rem / 2.25rem / 3.5rem`
- **圆角**：`12px / 14px`（卡片与分页卡片目前统一偏 14px）

## 4. 交互与可访问性（focus/active）

全站统一：

- **焦点可见**：使用 `--site-focus-ring` / `--site-focus-shadow` / `--site-focus-ring-offset`
- **按压反馈**：使用 `--site-lift-1` / `--site-lift-2`

对应实现位置：`src/css/theme/components.css`

## 5. 动效节奏与降级策略

全站统一动效时长与缓动：

- `--site-motion-fast` / `--site-motion-base` / `--site-motion-slow`
- `--site-ease-out`

降级策略（必须满足）：

- **`prefers-reduced-motion: reduce`**：页面仍完整可读，动效应降级为静态或低负载表现。
- **低性能设备**（如开启省流量、低内存/低核心数）：优先关闭 `mask`、弱化 `blur`、减少拖尾/高频动画。

## 6. 断点与布局（Landing 特例）

落地页采用“状态化布局”而非碎片化覆盖：

- **stack**：默认单栏（窄屏/半屏/低高度优先）
- **split-compact**：宽屏但高度偏低
- **split-wide**：真正大屏

对应实现位置：`src/pages/landing.module.css`
