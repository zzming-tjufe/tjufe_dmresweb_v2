---
title: "ComfyUI 新生入门指南"
description: "从安装到首图：Anaconda 分显卡（NVIDIA / AMD DirectML / Intel DirectML）配置、基础节点工作流与 CosyVoice 类 TTS 插件入门。"
sidebar_position: 1
---

# ComfyUI 新生入门指南

本指南专为数管大一新生编写，无论你是否具备编程基础，都能一步步上手这款强大的图形化 Stable Diffusion 工作流工具。我们将从零开始，涵盖安装、基础使用，并特别针对 **AMD Radeon 780M/880M** 和 **Intel Arc/Arc Pro/集成显卡（如 Iris Xe、Arc A370M 等）** 用户给出优化建议，最后还会教你如何安装热门插件 **CosyVoice**。

> 💡 本指南默认使用 **Anaconda** 管理 Python 虚拟环境，请确保你已安装 [Anaconda](https://www.anaconda.com/products/distribution) 或 Miniconda。

---

## 一、什么是 ComfyUI？

ComfyUI 是一个基于节点（Node-based）的 Stable Diffusion 图形界面工具。它允许你通过拖拽模块（如加载模型、生成图像、保存结果等）来构建图像生成流程，比传统 WebUI 更灵活、更高效，尤其适合学习扩散模型的工作原理。

> 💡 **为什么推荐新生用 ComfyUI？**  
> - 可视化流程，理解 AI 图像生成逻辑  
> - 资源占用更低，对低配电脑更友好  
> - 支持自定义工作流，便于复用和分享  

如图：
![comfyui](/img/examples/comfyui.webp)

---

## 二、下载与安装 ComfyUI

### 1. 系统要求
- 操作系统：Windows 10/11（推荐）、Linux、macOS（部分功能受限）
- 显卡：
  - NVIDIA（最佳支持，原生 CUDA）
  - AMD（Radeon RX 6000/7000 系列或 780M/880M 集显，需 DirectML）
  - Intel（Arc 独显或 Iris Xe / Arc 核显，需 DirectML）
- 内存：至少 8GB RAM（建议 16GB）
- 存储：至少 10GB 可用空间（用于模型和缓存）

### 2. 下载方式（两种任选）

#### ✅ 推荐方式：使用 `git clone`（便于更新）
> 适合希望长期使用、未来一键同步官方最新版的同学。

1. 打开 **Anaconda Prompt** 或 **终端**
2. 进入你希望存放 ComfyUI 的目录（例如 `D:\AI`）：
   ```bash
   cd D:
   mkdir AI && cd AI
   ```
3. 执行克隆命令：
   ```bash
   git clone https://github.com/comfyanonymous/ComfyUI.git
   ```
4. 完成后，ComfyUI 将位于 `D:\AI\ComfyUI`

> 💡 优势：未来只需在该目录运行 `git pull` 即可更新到最新版本。

#### 📦 备选方式：下载 ZIP 包
1. 打开 GitHub 仓库：[https://github.com/comfyanonymous/ComfyUI](https://github.com/comfyanonymous/ComfyUI)
2. 点击绿色 **Code** 按钮 → **Download ZIP**
3. 解压到任意文件夹（路径不要含中文或空格，例如 `D:\ComfyUI`）

> ⚠️ 注意：ZIP 方式无法直接更新，每次升级需重新下载。

---

## 三、按显卡类型配置环境（使用 Anaconda）

我们根据你的 GPU 型号提供三种配置方案。请先确认你的显卡型号（可在“设备管理器 > 显示适配器”中查看）。

---

### 方案 A：AMD Radeon 780M / 880M 用户（Ryzen 7040/8040 系列笔记本）

#### 步骤 1：创建并激活 Conda 环境
```bash
cd D:\ComfyUI
conda create -n comfy_amd python=3.11 -y
conda activate comfy_amd
```

#### 步骤 2：安装 DirectML 后端
```bash
pip install torch-directml
pip install -r requirements.txt
```

#### 步骤 3：创建启动脚本 `run_amd.bat`
```bat
@echo off
call conda activate comfy_amd
python main.py --listen --directml --lowvram
pause
```

> 💡 **提示**：780M/880M 共享系统内存，务必使用 `--lowvram`，分辨率建议 ≤ 512×512。

---

### 方案 B：Intel 核显/独显用户（Iris Xe、Arc A370M、A770 等）

Intel GPU 在 Windows 上主要通过 **DirectML** 提供加速支持（Linux 可用 oneAPI + OpenVINO，但配置复杂，本指南仅覆盖 Windows）。

#### 步骤 1：创建并激活 Conda 环境
```bash
cd D:\ComfyUI
conda create -n comfy_intel python=3.11 -y
conda activate comfy_intel
```

#### 步骤 2：安装 DirectML 后端
```bash
pip install torch-directml
pip install -r requirements.txt
```

> ✅ 验证：运行 `python -c "import torch; print(torch.directml.device_count())"` 应返回 ≥1

#### 步骤 3：创建启动脚本 `run_intel.bat`
```bat
@echo off
call conda activate comfy_intel
python main.py --listen --directml --lowvram
pause
```

> 💡 **Intel 用户性能提示**：
> - Iris Xe（如 i5-1135G7）性能较弱，建议分辨率 ≤ 384×384，步数 ≤ 20
> - Arc 独显（如 A770）性能接近 RTX 3060，可尝试 512×512 + 30 步
> - 确保已安装最新 [Intel GPU 驱动](https://www.intel.cn/content/www/cn/zh/download-center/home.html)

---

### 方案 C：NVIDIA 用户（标准配置，供参考）

```bash
conda create -n comfy_nvidia python=3.11 -y
conda activate comfy_nvidia
# CUDA 轮子版本请以 PyTorch 官网与 ComfyUI README 为准；以下为 CUDA 12.1 示例。
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121
pip install -r requirements.txt
```

启动脚本 `run_nvidia.bat`：
```bat
@echo off
call conda activate comfy_nvidia
python main.py --listen
pause
```

---

## 四、ComfyUI 基础使用

### 1. 界面介绍
打开浏览器访问 `http://127.0.0.1:8188`，你会看到空白画布。

常用节点：
- **Load Checkpoint**：加载主模型（如 `realisticVision.safetensors`）
- **CLIP Text Encode**：输入正向/反向提示词
- **KSampler**：设置采样步数、CFG、种子等
- **VAE Decode**：将潜变量转为图像
- **Save Image**：保存结果

### 2. 第一个图像生成流程

1. 右键画布 → **Add Node** → **Loaders** → **Load Checkpoint**
2. 点击节点上的文件夹图标，选择你的 `.safetensors` 模型（需自行下载放入 `models/checkpoints/`）
3. 添加两个 **CLIP Text Encode** 节点：
   - Positive：输入 `"masterpiece, best quality, a cute cat"`
   - Negative：输入 `"blurry, low quality"`
4. 添加 **Empty Latent Image**（设置分辨率，如 512x512）
5. 添加 **KSampler**，连接所有输入
6. 添加 **VAE Decode** 和 **Save Image**
7. 点击顶部 **Queue Prompt** 生成！

> 📌 提示：可从 [CivitAI](https://civitai.com/) 下载免费模型，放入 `ComfyUI/models/checkpoints/`

---

## 五、安装 CosyVoice 类 TTS 插件（语音生成）

社区里有多套 **CosyVoice × ComfyUI** 的适配仓库，节点命名与模型下载方式会随仓库更新而变化；安装前请**以所选仓库的 README 为准**。下面以维护较活跃、文档较全的一套为例（若链接失效，在 GitHub 搜索 `CosyVoice ComfyUI` 替换即可）。

### 安装步骤（适用于 AMD / Intel / NVIDIA）

1. 激活你当前使用的环境（如 `comfy_amd` 或 `comfy_intel`）：
   ```bash
   conda activate comfy_amd    # 或 comfy_intel / comfy_nvidia
   ```
2. 进入插件目录：
   ```bash
   cd D:\ComfyUI\custom_nodes
   ```
3. 克隆插件仓库（示例）：
   ```bash
   git clone https://github.com/AIFSH/CosyVoice-ComfyUI.git
   ```
4. 安装依赖：
   ```bash
   cd CosyVoice-ComfyUI
   pip install -r requirements.txt
   ```

> ⚠️ **注意**：  
> - 推理负载与是否走 GPU 取决于具体节点实现与模型，请按仓库说明准备 **FFmpeg**、权重下载方式等。  
> - 若报错缺少 `torchaudio`，执行：`pip install torchaudio`

### 使用方法
1. 重启 ComfyUI（重新运行对应 `.bat` 脚本）
2. 在节点菜单中按**该仓库文档**查找 CosyVoice 相关节点（名称可能为 Loader / TTS 等，与旧版「CosyVoiceLoader」不一定一致）
3. 模型体积与下载路径以仓库说明为准（常见为首次运行自动拉取或需手动放置到指定目录）
4. 按节点面板选择文本、音色等参数，生成 `.wav` 或其他音频格式

> 🎧 输出音频默认多保存在 `ComfyUI/output/`（具体见节点或工作流配置）

---

## 六、环境管理小贴士（Anaconda 专属）

- **查看所有环境**：`conda env list`
- **删除环境（重装时用）**：`conda env remove -n 环境名`
- **导出环境配置**：
  ```bash
  conda activate comfy_amd
  conda env export > comfy_amd.yml
  ```
- **跨平台注意**：导出的 `.yml` 文件可能包含平台特定包，分享时建议只记录关键依赖

---

## 七、常见问题（FAQ）

**Q：我的 Intel UHD Graphics（如 UHD 620）能用吗？**  
A：不建议。UHD 620 属于老旧核显，无 FP16 加速能力，即使使用 DirectML 也会极慢。建议使用 `--cpu` 模式（纯 CPU 运行），但生成一张图可能需数分钟。

**Q：AMD/Intel 用户生成时卡死或黑屏？**  
A：这是显存溢出的典型表现。请：
- 降低分辨率（384×384 起步）
- 添加 `--lowvram` 和 `--force-fp16`
- 关闭其他占用 GPU 的程序（如 Chrome 硬件加速）

**Q：如何知道 ComfyUI 是否在用我的 GPU？**  
A：在任务管理器 → 性能 → GPU 中观察“3D”或“Compute_0”利用率。若为 0%，说明回退到了 CPU。

**Q：模型放哪里？**  
A：标准路径：
- 主模型：`ComfyUI/models/checkpoints/`
- VAE：`ComfyUI/models/vae/`
- Lora：`ComfyUI/models/loras/`

---

## 八、下一步学习建议

- 尝试导入别人分享的 `.json` 工作流（拖入画布即可）
- 学习使用 **Lora** 和 **ControlNet** 节点提升控制力
- 安装 **ComfyUI Manager** 插件（通过 custom_nodes 安装，一键管理插件）

> 本指南由zzming-tjufe维护，如有疑问请联系：`zzming2019@hotmail.com`  
> 最后更新：2026年4月19日（修订：CosyVoice 插件仓库与节点名以社区当前 README 为准；NVIDIA 侧 PyTorch/CUDA 索引请以 PyTorch 与 ComfyUI 官方说明为准。）