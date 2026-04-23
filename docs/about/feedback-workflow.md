---
title: 反馈与共建流程
description: 问题反馈、优先级规则、处理节奏与 PR 协作说明。
sidebar_position: 2
---

为保证站点持续可用、可维护，本页定义统一的反馈闭环。

## 1. 反馈入口

- **问题反馈（首选）**：GitHub Issues  
  - [Issues](https://github.com/zzming-tjufe/tjufe_dmresweb_v2/issues)
- **协作修改**：Fork + Pull Request  
  - [Pull Requests](https://github.com/zzming-tjufe/tjufe_dmresweb_v2/pulls)
- **紧急沟通**：邮件 `zzming2019@hotmail.com`

## 2. 提交问题时请包含

- 问题页面 URL（或文档路径）
- 复现步骤（尽量 1-2-3 列清楚）
- 期望结果与实际结果
- 截图/报错信息（如有）
- 设备与浏览器信息（桌面/移动端，Chrome 版本等）

## 3. 优先级规则（SLA）

- **P0（阻断）**：站点不可用、构建失败、首页/文档严重错乱  
  - 目标：24 小时内确认并开始处理
- **P1（高优）**：核心路径受损（搜索、导航、关键文档错误）  
  - 目标：3 个自然日内处理
- **P2（常规）**：文案优化、样式细节、非阻断建议  
  - 目标：按周迭代

## 4. 标签建议

- `bug`：功能异常
- `docs`：文档内容修正
- `ui/ux`：视觉与交互体验
- `performance`：性能问题
- `good first issue`：适合新贡献者

## 5. PR 约定（最小）

- 变更要说明 **为什么改**
- 涉及 UI 改动建议附 1-2 张截图
- 本地至少通过一次 `npm run build`
- 不提交与本次无关的大量格式化改动
