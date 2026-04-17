---
title: "Git 入门指南（面向大一新生）"
description: "Git 入门指南（面向大一新生） page"
sidebar_position: 3
---

# Git 入门指南（面向大一新生）

欢迎来到 Git 的世界！本指南将帮助你从零开始掌握 Git 的基本使用，包括在三大主流操作系统（Windows、macOS、Linux）上安装 Git，以及常用命令的详解。无论你是计算机专业新生，还是对编程感兴趣的初学者，这份指南都将为你打下坚实的基础。

---

## 一、Git 是什么？

Git 是一个**分布式版本控制系统**，用于跟踪文件的修改历史，尤其适用于代码管理。它可以帮助你：

- 记录每一次文件的变更；
- 回退到任意历史版本；
- 多人协作开发而不互相干扰；
- 管理不同功能分支（如开发新功能、修复 bug）。

> 💡 小贴士：GitHub、GitLab、Gitee 等平台是基于 Git 构建的代码托管服务，但 Git 本身是一个本地工具。

---

## 二、安装 Git

### 1. Windows 系统

1. 访问 [Git 官网下载页面](https://git-scm.com/download/win)
2. 下载 **64-bit Git for Windows Setup**（或 32 位，视系统而定）
3. 双击运行安装程序，一路“Next”即可（建议保留默认选项）
4. 安装完成后，在任意文件夹中右键，若出现 **Git Bash Here**，说明安装成功

> ✅ 验证安装：  
> 按 `Win + R` 输入 `cmd` 打开命令提示符，输入：
> ```bash
> git --version
> ```
> 若显示版本号（如 `git version 2.xx.x.windows.1`），则安装成功。

---

### 2. macOS 系统

#### 方法一：通过 Homebrew（推荐）

1. 若未安装 Homebrew，先在终端运行：
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
2. 安装 Git：
   ```bash
   brew install git
   ```

#### 方法二：直接下载安装包

1. 访问 [Git 官网下载页面](https://git-scm.com/download/mac)
2. 下载 `.dmg` 文件并双击安装
3. 按照提示完成安装

> ✅ 验证安装：  
> 打开 **终端（Terminal）**，输入：
> ```bash
> git --version
> ```

---

### 3. Linux 系统（以 Ubuntu/Debian 为例）

大多数 Linux 发行版已预装 Git，若未安装或版本过旧：

```bash
sudo apt update
sudo apt install git
```

> 对于 CentOS/RHEL/Fedora 用户：
> ```bash
> sudo dnf install git      # Fedora
> sudo yum install git      # CentOS 7 及以下
> ```

> ✅ 验证安装：
> ```bash
> git --version
> ```

---

## 三、配置 Git

首次使用 Git 前，需设置你的**用户名**和**邮箱**（用于标识提交者）：

```bash
git config --global user.name "你的名字"
git config --global user.email "your@email.com"
```

> 🔒 注意：  
> - `--global` 表示全局配置，对所有项目生效；  
> - 邮箱建议使用与 GitHub/Gitee 账号一致的邮箱，便于关联贡献记录。

查看当前配置：
```bash
git config --list
```

---

## 四、基础命令详解

### 1. 初始化仓库

在项目文件夹中创建一个新的 Git 仓库：

```bash
git init
```

执行后，该目录下会生成一个隐藏文件夹 `.git`，用于存储版本信息。

---

### 2. 查看状态

```bash
git status
```

- 显示哪些文件被修改、哪些未被跟踪、哪些已暂存；
- 绿色表示已暂存（staged），红色表示未暂存（unstaged）。

---

### 3. 添加文件到暂存区

```bash
git add         # 添加单个文件
git add .               # 添加当前目录下所有修改（包括新增和修改）
git add -A              # 添加所有变更（包括删除）
```

> 📌 暂存区（Staging Area）是 Git 的核心概念之一，相当于“准备提交的快照”。

---

### 4. 提交更改

```bash
git commit -m "提交说明"
```

- `-m` 后跟提交信息，应简洁明了（如 "添加登录功能"、"修复首页样式 bug"）；
- 每次提交都会生成一个唯一的 SHA-1 哈希值作为版本 ID。

> 💡 提交前务必 `git add`，否则修改不会被记录！

---

### 5. 查看提交历史

```bash
git log                 # 详细日志（按 q 退出）
git log --oneline       # 简洁一行显示
git log --graph         # 图形化分支历史
```

---

### 6. 连接远程仓库（如 GitHub）

假设你在 GitHub 上创建了一个空仓库 `https://github.com/username/my-project.git`：

```bash
git remote add origin https://github.com/username/my-project.git
```

- `origin` 是远程仓库的默认别名，可自定义；
- 此命令只需执行一次。

---

### 7. 推送代码到远程仓库

首次推送需指定主分支（通常为 `main` 或 `master`）：

```bash
git push -u origin main
```

- `-u` 参数将本地 `main` 分支与远程 `origin/main` 关联，后续只需 `git push` 即可；
- 若你的仓库默认分支是 `master`，请将 `main` 替换为 `master`。

> ⚠️ 首次推送可能需要输入 GitHub 用户名和密码（或 Personal Access Token）。

---

### 8. 克隆远程仓库

从远程获取已有项目：

```bash
git clone https://github.com/username/project-name.git
```

- 自动创建同名文件夹，并初始化本地仓库；
- 已包含完整的提交历史。

---

### 9. 拉取最新代码

当他人推送了新代码，你需要同步到本地：

```bash
git pull origin main
```

- 相当于 `git fetch` + `git merge`；
- 建议在 `pull` 前先 `commit` 本地修改，避免冲突。

---

### 10. 查看差异

```bash
git diff                # 查看工作区与暂存区的差异
git diff --staged       # 查看暂存区与上次提交的差异
git diff HEAD           # 查看工作区与最新提交的差异
```

---

## 五、常见问题与技巧

### Q1：如何撤销未提交的修改？
```bash
git checkout --    # 丢弃工作区修改
```

### Q2：如何取消暂存（但保留修改）？
```bash
git reset HEAD 
```

### Q3：如何回退到上一个版本？
```bash
git reset --hard HEAD~1    # 谨慎使用！会丢失最近一次提交的所有修改
```

### Q4：`.gitignore` 是什么？
- 用于指定**不被 Git 跟踪的文件**（如编译产物、日志、IDE 配置等）；
- 在项目根目录创建 `.gitignore` 文件，每行写一个忽略规则，例如：
  ```
  *.log
  node_modules/
  .vscode/
  ```

---
## 六、下一步学习建议

掌握 Git 基础命令只是开始，要真正高效地使用 Git 进行开发和协作，建议你继续深入以下内容：

### 1. **分支管理（Branching）**
- 学习创建、切换和合并分支：
  ```bash
  git branch              # 查看所有分支
  git branch feature-x    # 创建新分支
  git checkout feature-x  # 切换到该分支
  git switch feature-x    # （Git 2.23+）更清晰的切换命令
  git merge feature-x     # 将 feature-x 合并到当前分支
  ```
- 理解 **主分支（main/master）** 与 **功能分支（feature）** 的工作流；
- 尝试 **Git Flow** 或 **GitHub Flow** 等常用协作模型。

---

### 2. **解决合并冲突（Merge Conflicts）**
- 当多人修改同一文件的同一区域时，Git 无法自动合并，会提示冲突；
- 学会在编辑器中识别冲突标记（`<<<<<<<`, `=======`, `>>>>>>>`）；
- 手动编辑保留正确代码后，执行 `git add` 和 `git commit` 完成合并。

---

### 3. **查看历史与版本回溯**
- 使用 `git log --oneline --graph --all` 可视化分支历史；
- 用 `git reflog` 查看所有 HEAD 变更记录（即使被 reset 也能找回）；
- 安全回退：优先使用 `git revert <commit-id>`（生成反向提交），而非 `reset --hard`（会丢失历史）。

---

### 4. **远程协作进阶**
- 理解 `fetch` 与 `pull` 的区别：`fetch` 仅下载，`pull = fetch + merge`；
- 学会使用 `git push --force-with-lease`（比 `--force` 更安全）；
- 配置 SSH 密钥，避免每次输入账号密码：
  ```bash
  ssh-keygen -t ed25519 -C "your_email@example.com"
  ```
  然后将公钥（`~/.ssh/id_ed25519.pub`）添加到 GitHub/Gitee 账户。

---

### 5. **使用图形化工具辅助理解**
- **VS Code**：内置 Git 支持，可直观查看 diff、暂存、提交；
- **Sourcetree / GitKraken**：可视化 Git 历史与分支结构；
- **GitHub Desktop**：适合初学者的 GUI 工具。

---

### 6. **参与开源或团队项目**
- 在 GitHub 上 Fork 一个项目，克隆到本地，创建分支修改，再提交 Pull Request；
- 学习阅读项目的 `CONTRIBUTING.md` 和 `.gitignore` 规范；
- 练习使用 **Issue** 和 **PR（Pull Request）** 进行沟通。

---

### 7. **深入学习资源推荐**
- 📚 书籍：《Pro Git》（[中文在线版免费](https://git-scm.com/book/zh/v2)）
- 🎥 视频：Bilibili 搜索 “Git 教程 廖雪峰” 或 “Git 入门到精通”
- 🧪 实践：[Learn Git Branching](https://learngitbranching.js.org/)（交互式学习网站）

> 💡 **记住**：Git 不是“背命令”，而是理解其**对象模型（blob, tree, commit, tag）** 和**工作区 → 暂存区 → 仓库**的三区概念。多动手、多犯错、多修复，你会越来越熟练。

---

> 本指南由居居明维护，如有疑问请联系：`zzming2019@hotmail.com`  
> 最后更新：2026年1月17日