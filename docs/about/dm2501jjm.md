---
title: "📚 关于与贡献：从学习者到共建者"
description: "项目背景、协作方式与版权许可说明。"
sidebar_position: 1
---

# 📚 关于与贡献：从学习者到共建者


## 我的代码仓库
虽然无法直接嵌入动态页面，但你可以通过以下链接访问我的主页，查看我的其他项目和贡献记录：  
**GitHub**: `https://github.com/zzming-tjufe/tjufe_dmresweb_v2`  
**GitLab**: `https://gitlab.drcheng.group/zhouzeming/dm_res_web_test/-/tree/main?ref_type=heads`

**欢迎反馈与协作**：
 -  如果你在本指南中发现任何问题，或者有想补充的优秀内容，欢迎通过仓库的 **Issue** 功能提出。（建议使用GitHub告知或者使用邮箱告知，本人不常使用GitLab）
-   如果你希望直接参与完善，可以通过 **Fork & Pull Request** 的方式提交你的修改建议。

## 版权与许可(License)
本资源站及其附属内容（除非特别说明）采用 **知识共享 署名-非商业性使用-相同方式共享 4.0 国际 许可协议** 进行许可。

**这意味着您可以自由地：**

*   **分享** — 在任何媒介或格式中复制和分发本作品。
*   **改编** — 基于本作品进行混合、转换或创作。
   
**惟须遵守以下条件：**

*   **署名** — 您必须给出适当的署名，提供指向本许可协议的链接，并**明确标示是否对原始作品进行了修改**。您可以用任何合理的方式来署名，但不得以任何方式暗示许可人为您或您的使用方式背书。
*   **非商业性使用** — 您不得将本作品用于商业目的。
*   **相同方式共享** — 如果您再混合、转换或者基于本作品进行创作，您必须基于**与原先相同的许可协议**分发您的贡献作品。

**通俗理解：** 欢迎将本指南分享给你的同学、老师，用于个人学习和教学。如果你修改或扩充了内容，请同样开放地分享出来，并**注明原作者（我）和本指南的来源**。请不要将本指南用于任何收费课程、出版或商业推广。

---
## 如何提供署名（建议格式）

当您转载或改编本作品时，一个规范的署名示例如下：

> 本文档基于 zzming-tjufe 创作的《天财数管资源站》（原文链接示例：[GitHub Pages](https://github.com/zzming-tjufe/tjufe_dmresweb_v2/) 或 [GitLab Pages 镜像](https://pages.drcheng.group/zhouzeming/dm_res_web_test/)）在 CC BY-NC-SA 4.0 许可协议下进行使用/改编。

**协议全文：** 要查看该许可协议的完整法律文本，请访问 [https://creativecommons.org/licenses/by-nc-sa/4.0/](https://creativecommons.org/licenses/by-nc-sa/4.0/)。

© 2026 zzming-tjufe。本站内容在 **CC BY-NC-SA 4.0** 下发布；转载与改编请遵守上文「署名 / 非商业 / 相同方式共享」条款（并非「闭源保留一切权利」意义上的 All Rights Reserved）。

---
## 本站的技术栈与搭建纪实

### 技术栈（当前）

- **站点框架**：Docusaurus（React + Markdown/MDX），见仓库根目录 `docusaurus.config.js`、`sidebars.js`
- **内容**：以 Markdown 为主，部分页面可渐进迁移为 MDX
- **版本控制**：Git
- **部署**：GitHub Pages（主）、GitLab Pages（历史镜像仍可访问时请以页面为准）
- **工具链**：Node.js / npm（本地预览：`npm run start`，构建：`npm run build`）

原 **Docsify** 入口与侧边栏仍保留在 `docs/` 内（如 `index.html`、`_sidebar.md`），便于对照与回退，**线上阅读以 Docusaurus 构建结果为准**。

### 搭建纪实

[本站搭建纪实：从构想到上线（含 Docsify 时期记录与后续 Docusaurus 增补）](./record)