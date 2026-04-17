---
title: "Docker Desktop 安装与配置指南"
description: "Docker Desktop 安装与配置指南 page"
sidebar_position: 2
---

# Docker Desktop 安装与配置指南

> 本指南适用于 Windows 系统。

## 核心概念
Docker 是一个用于开发、发布和运行应用程序的开放平台。它能将应用与依赖环境打包成容器，实现**一次构建，处处运行**。

## 下载与安装
1.  **官方下载**：强烈建议从 [Docker 官方文档站](https://docs.docker.com/desktop/install/windows-install/) 获取最新稳定版安装程序。
2.  **系统要求**：确保你的 Windows 10/11 已启用 **WSL 2** 或 **Hyper-V** 功能。（开启虚拟化）
3.  **安装步骤**：双击下载的 `Docker Desktop Installer.exe`，按提示完成安装，安装后需**重启电脑**。

## 基础使用验证
安装完成后，在终端（PowerShell 或 CMD）中运行以下命令验证：
```bash
docker --version
docker run hello-world
```
如果看到欢迎信息，表明 Docker 已正确安装并运行。

## 常见问题
- 错误：Docker Desktop requires a newer WSL kernel version

   解决方案：更新 WSL 内核。以管理员身份打开 PowerShell（终端管理员），运行：wsl --update

- 如何加速镜像下载？
   配置国内镜像源（如阿里云、中科大源）。

## 免责声明：Docker 是 Docker, Inc. 的商标。本指南仅提供安装引导，请遵循其官方许可协议。

--- 

> 本指南由居居明维护，如有疑问请联系：`zzming2019@hotmail.com`  
> 最后更新：2026年1月17日