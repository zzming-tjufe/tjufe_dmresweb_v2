---
title: "面向大一新生的 Anaconda 使用指南"
description: "Anaconda 安装、Navigator 与终端、conda 环境与 Jupyter 入门，以及镜像与常见问题。"
sidebar_position: 5
titleIcon: /img/examples/anaconda-logo.webp
titleIconAlt: Anaconda 标志
---

> 本指南专为刚接触编程和数据科学的大一新生设计，手把手教你安装、配置和使用 Anaconda —— 一个强大的 Python 数据科学平台。

---
## 1. 什么是 Anaconda？

**Anaconda** 是一个开源的 Python 和 R 语言的发行版，专为数据科学、机器学习、大数据处理等任务设计。它包含：

- **Python 解释器**
- **1500+ 预装的数据科学包**（如 NumPy, Pandas, Matplotlib, Scikit-learn）
- **Conda**：一个强大的包管理器和环境管理器
- **Anaconda Navigator**：图形化界面，方便管理环境和启动应用（如 Jupyter Notebook）

> 💡 对于初学者，Anaconda 能帮你避免“依赖地狱”——不用手动安装各种库和解决版本冲突！    

如图：  
![Anaconda 界面示例](/img/examples/anaconda.webp)

---

## 2. 为什么选择 Anaconda？

| 优势       | 说明                                 |
| ---------- | ------------------------------------ |
| ✅ 一键安装 | 自动安装 Python 和常用科学计算库     |
| ✅ 环境隔离 | 可为不同项目创建独立环境，互不干扰   |
| ✅ 跨平台   | 支持 Windows、macOS、Linux           |
| ✅ 图形界面 | Navigator 提供可视化操作（适合新手） |
| ✅ 社区支持 | 全球数百万用户，文档丰富             |

> 🎯 特别适合课程项目、科研入门、竞赛准备（如数学建模、Kaggle）！

---

## 3. 安装 Anaconda

### 3.1 下载 Anaconda

1. 打开官网：[https://www.anaconda.com/products/distribution](https://www.anaconda.com/products/distribution)
2. 选择你的操作系统（Windows / macOS / Linux）
3. 推荐下载 **Python 3.x** 版本（目前最新为 Python 3.11+）
4. 点击 **Download** 按钮（免费，无需注册）

> ⚠️ 注意：不要下载 Miniconda（除非你明确知道自己在做什么）。Miniconda 是精简版，适合高级用户。


> （进一步解释） Miniconda只提供conda基础的包管理功能，所以安装包较小。但是由于我们专业后期会涉及到数据清洗，需要用到Jupyter notebook，所以建议直接安装anaconda。

### 3.2 安装步骤（Windows / macOS / Linux）

#### 🪟 Windows

1. 双击下载的 `.exe` 文件
2. 点击 “Next” → “I Agree”
3. 选择 **Just Me (recommended)**
4. 选择安装路径（建议默认，不要带中文或空格）
5. **关键一步**：勾选 ✅ **Add Anaconda to my PATH environment variable**（可选，但推荐勾选以便在命令行使用）
   > 如果不确定，可以不勾选，后续通过 Anaconda Prompt 使用
6. 点击 “Install”，等待完成（约 5–10 分钟）
7. 完成后点击 “Next” → “Finish”

#### 🍏 macOS

1. 双击下载的 `.pkg` 文件
2. 按照提示点击 “Continue” → “Agree”
3. 选择安装位置（默认即可）
4. 输入密码授权安装
5. 等待安装完成，点击 “Close”

#### 🐧 Linux

打开终端，运行以下命令（以 Python 3.11 为例）：

```bash
# 在浏览器打开 https://repo.anaconda.com/archive/ ，下载与你 CPU 架构匹配的 Anaconda3-*-Linux-x86_64.sh（文件名随版本变化）
# 进入下载目录后执行（把下面两行里的文件名改成你下载的真实文件名）：
# wget https://repo.anaconda.com/archive/<Anaconda3-...-Linux-x86_64.sh>
# bash <Anaconda3-...-Linux-x86_64.sh>

# 按提示阅读协议并输入 yes；默认安装路径多为 ~/anaconda3
# 最后询问是否初始化 conda 时建议输入 yes
```

安装完成后重启终端，或运行：

```bash
source ~/.bashrc  # 或 source ~/.zshrc（如果你用 zsh）
```

---

## 4. 初次使用：Anaconda Navigator 与终端

安装完成后，你会看到几个新程序：

- **Anaconda Navigator**：图形化控制面板（咱们专业不太用得到）
- **Anaconda Prompt**（Windows）或 **Terminal**（macOS/Linux）：命令行工具（本专业常用）
- **Jupyter Notebook / JupyterLab**：交互式编程环境

### 启动方式

- **Windows**：开始菜单 → Anaconda3 → Anaconda Navigator
- **macOS**：Launchpad → Anaconda-Navigator
- **Linux**：终端输入 `anaconda-navigator`

> 🔍 第一次启动可能较慢，请耐心等待。

---

## 5. 管理环境：Conda 基础命令

**环境（Environment）** 是 Conda 的核心功能。每个环境可以有自己独立的 Python 版本和包，避免项目之间冲突。

### 常用命令（在终端或 Anaconda Prompt 中运行）
**重要**

| 命令                                    | 作用                                        |
| --------------------------------------- | ------------------------------------------- |
| `conda --version`                       | 查看 conda 版本                             |
| `conda info --envs` 或 `conda env list` | 列出所有环境                                |
| `conda create -n myenv python=3.10`     | 创建名为 `myenv` 的新环境，使用 Python 3.10 |
| `conda activate myenv`                  | 激活环境 `myenv`                            |
| `conda deactivate`                      | 退出当前环境                                |
| `conda remove -n myenv --all`           | 删除整个环境 `myenv`                        |
>注：myenv只是一个名字，你可以选择任何名字，但请勿使用特殊字符。


> ✅ 建议：为每门课程或项目创建独立环境！例如：
> ```bash
> conda create -n math_modeling python=3.10
> conda activate math_modeling
> ```

---

## 6. 安装与卸载包

### 安装包

```bash
# 方法1：使用 conda（推荐优先使用）
conda install numpy pandas matplotlib

# 方法2：使用 pip（当 conda 没有该包时）
pip install requests
```

> 📌 优先使用 `conda install`，因为 Conda 能更好地处理依赖关系。


> 本专业在学习过程中会遇到需要安装依赖requirements.txt的情况，请按照github相关页面输入指令，不要盲目使用conda install。
### 卸载包

```bash
conda remove numpy
# 或
pip uninstall requests
```

### 查看已安装的包

```bash
conda list
```

---
>以下内容大一暂时用不到
## 7. 使用 Jupyter Notebook

Jupyter Notebook 是一个基于浏览器的交互式编程工具，非常适合学习 Python 和数据分析。

### 启动 Jupyter Notebook

- **方法1（推荐）**：打开 Anaconda Navigator → 点击 Jupyter Notebook 的 “Launch”
- **方法2（命令行）**：
  ```bash
  jupyter notebook
  ```
  浏览器会自动打开 `http://localhost:8888`

### 基本操作

- 点击 “New” → “Python 3” 创建新笔记本
- 在单元格（Cell）中输入代码，按 `Shift + Enter` 运行
- 支持 Markdown（用于写说明文字）和代码混合排版

> 💡 小技巧：按 `Esc` 进入命令模式，按 `H` 查看快捷键帮助！

---

## 8. 常见问题与解决方案

### ❓ 安装后命令行无法识别 `conda` 或 `python`

- **Windows**：重新运行安装程序，勾选 “Add to PATH”；或使用 **Anaconda Prompt** 而非普通 CMD。
- **macOS/Linux**：运行 `conda init`，然后重启终端。

### ❓ Jupyter 打不开或报错

尝试更新：
```bash
conda update jupyter
```

### ❓ 包安装慢？

**配置国内镜像源（如清华源）：**

```bash
# 添加清华源
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
conda config --set show_channel_urls yes
```

> 更多镜像设置参考：[https://mirrors.tuna.tsinghua.edu.cn/help/anaconda/](https://mirrors.tuna.tsinghua.edu.cn/help/anaconda/)

---

## 9. 进阶建议

- ✅ 学会使用 `requirements.txt` 或 `environment.yml` 导出环境，便于团队协作
- ✅ 尝试 **JupyterLab**（比 Notebook 更强大）
- ✅ 学习 Git + GitHub，结合 Jupyter 做版本控制
- ✅ 探索 VS Code + Python 插件（可集成 Conda 环境）

> 🌟 记住：Anaconda 是工具，真正的核心是 **动手实践**！从一个小项目开始吧！

---

## 📚 推荐资源

- [官方文档](https://docs.anaconda.com/)
- [Conda 用户手册](https://docs.conda.io/projects/conda/en/latest/user-guide/index.html)
- [Jupyter 官网](https://jupyter.org/)
- B站搜索 “Anaconda 新手教程” 有很多视频讲解


--- 

> 本指南由zzming-tjufe维护，如有疑问请联系：`zzming2019@hotmail.com`  
> 最后更新：2026年4月19日