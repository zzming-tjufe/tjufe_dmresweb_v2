# Tiancai Data Management Resource Station

> An open-source resource guide dedicated to supporting the studies of the Big Data Management and Application major at Tianjin University of Finance and Economics.

![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-online-aurora?logo=Github)
![GitLab Pages](https://img.shields.io/badge/GitLab%20Pages-online-blue?logo=Gitlab)
![License](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-gold)
![Status](https://img.shields.io/badge/Status-Continuously%20Updating-coral)

> If this site has been helpful to you, please give it a Star. Thank you!

## 🎯 Project Introduction

This is an open-source learning resource and guide website for students of the **Big Data Management and Application major** (and related fields) at **Tianjin University of Finance and Economics**. It aggregates systematic documentation ranging from core professional skills to cutting-edge tool practices, aiming to be:

*   **A growth map for beginners**
*   **A continuously updated toolkit of skills**
*   **A pool of open-source, shared knowledge**

The project is fully open-source, written in clear Markdown, and rendered in real-time using Docsify, striving for practical content, clear structure, and easy access.

**Online Access URLs**:

👉 GitLab: [https://pages.drcheng.group/zhouzeming/dm_res_web_test/](https://pages.drcheng.group/zhouzeming/dm_res_web_test/)  
👉 GitHub: [https://zzming-tjufe.github.io/tjufe_dmres_web/](https://zzming-tjufe.github.io/tjufe_dmres_web/)

## 📖 Content Guide

The website content is organized into modules for easy reference:

- **🔨 Core Skills Module**: Essential "survival skills" for professional study, such as Markdown, environment setup, searching, and reading.
- **🤖 Introduction to Generative AI**: Practical guides focusing on AIGC, including introductions and applications of tools like ComfyUI and Dify.
- **🌐 Open-Source Tool Practices**: Deep dives into foundational tools that build digital productivity, such as command line, Git, and Docker.
- **📝 Site Development Chronicle**: Transparently documents the complete technical journey and thought process behind this site's creation, from conception to launch.

## 🚀 Quick Start

### Method 1: Online Browsing (Recommended)
Directly visit the **Online Access URLs** above for the best reading experience. All content is optimized for web browsing.

### Method 2: Local Development & Preview
If you wish to view, modify, or contribute to the content locally, you can clone this repository and start a local server:

```bash
# 1. Clone the project locally
git clone https://gitlab.drcheng.group/zhouzeming/dm_res_web_test.git

cd dm_res_web_test

# 2. Install docsify-cli globally (if not already installed)
npm install docsify-cli -g

# 3. Enter the documentation directory and start the local live preview server
docsify serve docs

# 4. Open your browser and visit http://localhost:3000
```

## 🤝 How to Contribute

We firmly believe that knowledge reaches its greatest value through sharing and collaboration. Welcome to become a **co-builder** of this content!

You can participate in the following ways:
1.  **Provide Feedback**: Submit an [Issue](https://github.com/yourname/your-repo/issues) in the GitHub repository to report bugs or suggest content improvements.
2.  **Direct Improvements**:
    *   Fork this repository.
    *   Create a new branch (`git checkout -b feature/YourGreatIdea`).
    *   Edit or add new Markdown documents.
    *   Commit your changes (`git commit -m 'Add some amazing content'`).
    *   Push the branch (`git push origin feature/YourGreatIdea`).
    *   Submit a Pull Request.

Please follow the existing documentation style for contributions and ensure information is accurate and readable.

## 📄 License

All original content on this site (unless otherwise specified) is licensed under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0) License](https://creativecommons.org/licenses/by-nc-sa/4.0/).

**In simple terms**:
- **You are free to**: Share and adapt the material for personal learning or teaching.
- **Under the following terms**: **Attribution** (credit the original author and source), **NonCommercial use**, and **ShareAlike** (share derivative works under the same license).

## ✨ Acknowledgments

Thanks to all the open-source projects, technical documentation, and community friends that have provided inspiration and assistance for this resource station. We hope this guide, condensed with practice and reflection, can accompany you steadily and further on your exploration journey within this major.

---
**Stay curious, share willingly, build continuously.** 🚀

## 🧱 Migration Bootstrap (Docusaurus)

The repository now includes a minimal Docusaurus scaffold for progressive migration from Docsify.

### Local Start (Docusaurus)

```bash
npm install
npm run start
```

Then open `http://localhost:3000/`.

### Notes

- Existing Docsify source files are intentionally kept in `docs/` and not deleted.
- Current docs content remains Markdown-first and can be upgraded to MDX incrementally.

## 🗺️ Future Roadmap

> Updated: 2026/4/17

* Phase 1 (Done): Initialize Docusaurus skeleton and preserve existing Docsify/Markdown assets.
* Phase 2 (In Progress): Improve information architecture with frontmatter, migration guide, and static image conventions.
* Phase 3 (Current): Improve UX smoothness using route transition animation and theme-switch transition tuning.
* Phase 4 (Next): Build stronger visual identity (logo, favicon, social card, unified illustration style).
* Phase 5 (Later): Gradually upgrade key pages from Markdown to MDX with reusable components.
