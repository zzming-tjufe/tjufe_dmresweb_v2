---
title: "本站搭建纪实：从构想到上线"
description: "Docsify 时期选型与搭建步骤复盘，并增补 Docusaurus 迁移动机与本地/发布流程。"
sidebar_position: 2
---

本文档旨在完整记录本资源站的搭建过程、技术选型与实现细节。它并非一份标准的教程，而是一份**个人的决策记录和实战复盘**，希望能为有意自行搭建类似文档站点的同学提供一份具参考价值的路径说明。

> **2026 年更新**：下文 **「二、技术选型」** 仍以 **Docsify 时期**的决策为主干，便于理解历史；当前仓库已叠加 **Docusaurus** 作为对外站点生成方式，详见文末 **「六、后续演进」**。

#### 一、项目初衷与目标

作为大数据管理与应用专业的学生，我积累了许多离散的学习经验、工具指南和项目心得。我希望：
1.  **系统化**：将这些知识进行结构化整理，形成体系。
2.  **可共享**：创建一个易于访问、更新的平台，与同学共享。
3.  **低成本实践**：亲身实践一次从开发到部署的完整流程。

最终目标是构建一个**聚焦内容、易于维护、访问快速**的静态文档网站。

#### 二、技术选型与核心决策

选择合适的技术栈是项目成功的基础。我的核心考量是：**简单、高效、专注内容**。

1.  **静态站点生成器：为什么是 Docsify？**
    *   **对比**：我评估了 Hexo（需要本地生成）、VuePress（功能强大但配置稍复杂）和 Docusaurus（更适合大型文档）。
    *   **决策**：Docsify 的 **“运行时渲染”** 特性吸引了我。它无需在本地构建静态HTML文件，只需编写 `*.md` 文件，网站即可实时预览。这极大地简化了写作和迭代流程，让我能完全专注于 Markdown 内容本身。
    *   **结论**：对于内容驱动、迭代频繁的个人知识库，Docsify 的学习成本和维护成本最低。

2.  **部署平台：为什么是 GitHub/GitLab Pages？**
    *   **无缝集成**：GitHub/GitLab Pages 是为静态网站量身定制的免费托管服务。
    *   **流程自动化**：配合 Git，可以实现“推送即发布”。
      *   对于GitHub，我将仓库设置为 `main` 分支的 `/docs` 目录 分支自动部署。
      *   对于GitLab，我按照上课所讲严格编写 `.gitlab-ci.yml` 文件，并设置 `main` 分支的 `/docs` 目录及其同级文件为自动部署。
    *   **可靠性**：由 GitHub/GitLab 维护，具备优秀的可用性。

3.  **版本控制：Git**
    *   这是项目的基石。所有文档的修订历史、网站配置都通过 Git 管理，确保了可追溯性和协作可能性。

#### 三、核心搭建步骤

以下是关键的实现步骤概览。

**1. 项目初始化**
```bash
# 在GitHub创建新仓库，如 `my-knowledge-base`
git clone https://github.com/yourname/my-knowledge-base.git
cd my-knowledge-base
```

**2. 本地引入 Docsify**
```bash
# 全局安装 docsify-cli 工具
npm i docsify-cli -g

# 在项目目录初始化
docsify init ./docs

# 启动本地实时预览服务器
docsify serve docs
```
访问 `http://localhost:3000` 即可看到默认页面。

**3. 基础配置 (`./docs/index.html`)**
在 `window.$docsify` 中进行主要配置：
```javascript
window.$docsify = {
  name: '天财数管资源站',
  repo: 'https://github.com/yourname/my-knowledge-base',
  loadSidebar: true,
      sidebar: {
        collaspe: true
      },
      coverpage: true,
      subMaxLevel: 3, // 支持三级目录
      auto2top: true, // 切换页面时自动滚动到顶部
      homepage: 'README.md', // 明确指定主页文件
      notFoundPage: true, // 自动显示404页面，可创建 _404.md 自定义
      executeScript: true, // 执行页面中的 script 标签（慎用）
      themeColor: '#3F51B5', // 动态主题色，会覆盖主题CSS
      alias: {
        '/.*/_sidebar.md': '/_sidebar.md'//防止意外回退
      }
}
```

**4. 内容结构设计**
我采用了以下目录组织方式，追求清晰与可扩展性：
```
docs/
├── README.md          # 首页
├── _sidebar.md        # 侧边栏导航
├── basic/       # 新手必读
│   ├── envs.md      # 如何配置编程环境
│   ├── markdown.md   # Markdown入门指南
│   └── ...
├── ai-tools/       # 生成式人工智能
│   ├── dify.md # 无代码创建智能体和工作流
│   ├── comfyui.md # 无代码文生图AI
└── lesson/ # 课程模块介绍
    └── ...
...
```
`_sidebar.md` 文件手动定义导航树，结构一目了然：
```markdown
- [🏠 首页](/README.md)
- [💻 数字时代开源工具实践](/guide/lesson/opensourcetools.md)
  - [命令行的使用](/guide/basic/powershell.md)
  - [Docker 指南](/guide/development/docker.md)
  - [Git 指南](/guide/development/git.md)
  - [Anaconda 指南](/guide/development/anaconda.md)
...
```


#### 四、功能增强与细节优化

1.  **样式微调**
    在 `index.html` 中通过 `<style>` 标签覆盖默认样式，调整了字体、颜色和布局间距，使其更符合阅读习惯。

2.  **插件集成**
    *   **代码高亮**：Docsify 默认支持 Prism，已足够。
    *   **图片缩放**：曾短暂试用 zoom-image 插件，后因需求不大而移除。

#### 五、踩坑与心得复盘

**1. 遇到的主要问题**
*   **侧边栏高亮问题**：初始时，侧边栏的当前页面高亮不准确。通过仔细核对 `_sidebar.md` 中的路径与文件实际路径，并确保 `loadSidebar: true` 和 `alias` 配置正确得以解决。
*   **中文搜索失效**：默认的搜索插件对中文分词支持不佳。解决方案是引入 `docsify-search` 插件并进行适当配置，优化了中文搜索体验。

**2. 核心收获**
*   **内容优先**：工具链应服务于内容生产。Docsify 让我摆脱了构建步骤的干扰，写作心流更连贯。
*   **版本控制即备份**：所有内容存于 Git，再无丢失之虞，且历史版本可随时追溯。
*   **文档即产品**：网站结构本身也是产品设计的一部分。清晰的信息架构能极大提升访客的获取效率。

#### 六、后续演进：叠加 Docusaurus（约 2026 年起）

在保留 `docs/` 下原有 Markdown 与 Docsify 静态入口的前提下，仓库引入 **Docusaurus**：

- **动机**：更强的信息架构（侧栏、站内搜索潜力）、首页与主题能力、React/MDX 扩展空间，并逐步向「现代文档站」体验靠拢。
- **做法**：在仓库根目录增加 `docusaurus.config.js`、`sidebars.js`，文档内容仍主要放在 `docs/**/*.md`；通过 `exclude` 等配置忽略 Docsify 专用文件（如 `_sidebar.md` 片段），避免与 Docusaurus 路由冲突。
- **本地与发布**：`npm install` → `npm run start` 本地预览 → `npm run build` 生成静态站点，部署到 GitHub Pages（`baseUrl` 等与 `docusaurus.config.js` 中一致）。

原 Docsify 流程（`docsify serve docs`）仍可用于对照旧版行为，**以项目 README 与当前分支实际脚本为准**。

#### 结语

本网站的搭建是一次“用技术滋养学习，以学习反哺技术”的实践。它现在不仅是一个知识容器，其构建过程本身也成为了值得记录和分享的经验。

**本纪实文档与站内所有指南一样，采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 许可协议共享。** 如果你有更好的建议或发现了任何问题，欢迎通过 GitHub Issues 提出或直接 Fork 项目进行改进。

希望这份记录对你有用。从阅读者到构建者，第一步往往始于一次简单的 `docsify init`。

---

> 2026年1月22日 初稿；2026年4月19日 增补「六、后续演进：Docusaurus」  
> 数管2501 周泽铭（zzming-tjufe）