---
title: "Clash Verge 使用指南"
description: "Clash Verge 使用指南 page"
sidebar_position: 1
---

# Clash Verge 使用指南

> 本指南旨在介绍网络调试工具的安装，请确保你了解并遵守所在地法律法规及学校网络使用规定。

## 软件简介
Clash Verge 是一个跨平台的、基于 Clash 内核的 GUI 客户端，支持多种代理协议，界面友好。

## 获取与安装
### 1. 找到正确的发布页
**切勿下载源码（Source Code）！** 正确步骤如下：
1.  访问项目的 [GitHub Releases 页面](https://github.com/zzzgydi/clash-verge/releases)。
2.  在 “Assets” 折叠栏下，找到适用于你系统的安装包（如 `.exe`, `.dmg`, `.AppImage`）。

### 2. 验证文件安全性（重要！）
在 Releases 页面，作者通常会提供文件的 **SHA256 或 SHA512 校验和**。
1.  在 Windows PowerShell 中，计算你下载文件的哈希值：
    ```powershell
    Get-FileHash -Path "你下载的文件路径\Clash.Verge_1.3.8_x64-setup.exe" -Algorithm SHA256
    ```
2.  将计算出的哈希值与 Releases 页面公布的进行比对，**确保完全一致**后再安装。

### 3. 安装与运行
下载完成后，按常规软件流程安装即可。

## 基础配置
1.  首次运行后，你需要获取或订阅一个配置文件（`.yaml` 格式）。
2.  在软件界面中导入该配置文件。
3.  选择节点并启用系统代理。

## 注意事项与风险
- **安全风险**：配置文件可能来自第三方，请从可信渠道获取。
- **合规使用**：仅用于教育科研等合法目的，严格遵守《网络安全法》。
- **资源消耗**：长期后台运行会占用少量内存和网络资源。
--- 

> 本指南由居居明维护，如有疑问请联系：`zzming2019@hotmail.com`  
> 最后更新：2026年1月15日