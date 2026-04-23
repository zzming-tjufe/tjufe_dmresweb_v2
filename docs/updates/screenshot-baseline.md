---
title: 截图基线规范
description: UI 变更前后对比的截图目录与命名约定。
---

用于规范 UI 回归截图，避免“有截图但不可比较”。

## 目录约定

- 建议目录：`docs/about/assets/baseline/`
- 子目录按日期：`YYYYMMDD/`

示例：

- `docs/about/assets/baseline/20260420/`

## 必截页面

- `/`（落地页）
- `/home`（站内导航）
- 任意文档详情页（含 TOC + 分页卡片）

## 建议视口

- `1366x768`
- `1920x1080`
- `2560x1440`（可选）

## 命名规范

- `YYYYMMDD_{page}_{viewport}_{theme}.png`

示例：

- `20260420_landing_1366x768_light.png`
- `20260420_landing_1366x768_dark.png`
- `20260420_docs-article_1920x1080_dark.png`
