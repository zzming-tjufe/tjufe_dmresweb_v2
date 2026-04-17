---
title: "Dify 新手入门指南（面向大一新生）"
description: "Dify 新手入门指南（面向大一新生） page"
sidebar_position: 2
---

# Dify 新手入门指南（面向大一新生）

> 本指南旨在帮助刚接触人工智能与低代码开发的大一新生快速上手 **Dify** —— 一个开源的 LLM 应用开发平台。你将学习如何使用网页版 Dify、本地部署 Dify，并掌握其核心概念和节点使用方法。

---

## 一、什么是 Dify？

**Dify** 是一个开源的 LLM（大语言模型）应用开发平台，允许用户通过可视化界面或 API 快速构建基于大模型的应用，如智能客服、知识问答系统、自动化工作流等。它支持多种模型（如 OpenAI、Claude、本地部署的 Llama 系列等），并提供 **Prompt 编排、RAG（检索增强生成）、Agent 工作流** 等高级功能。

Dify 的核心优势：
- 无需编程即可搭建 AI 应用（低代码）
- 支持私有化部署，保障数据安全
- 提供丰富的节点类型，灵活组合逻辑
- 开源免费（GitHub 项目：[langgenius/dify](https://github.com/langgenius/dify)）

---

## 二、使用网页版 Dify（快速体验）

### 1. 注册账号
访问官方在线平台：[https://cloud.dify.ai](https://cloud.dify.ai)  
点击右上角 **“Sign Up”**，使用邮箱或 GitHub 账号注册。

### 2. 创建第一个应用
- 登录后点击 **“+ Create App”**
- 选择应用类型：
  - **Chatbot**：对话式 AI（如客服机器人）
  - **Agent**：具备工具调用能力的智能体
  - **Workflow**：复杂逻辑编排（推荐进阶使用）
- 输入应用名称（如 “新生问答助手”），点击 **Create**

### 3. 配置模型与 Prompt
- 在 **Prompt Engineering** 页面，编写系统提示词（System Prompt），例如：
  ```text
  你是一个面向大学新生的校园助手，回答问题时要亲切、简洁、准确。
  如果不知道答案，请说“我还不了解这个问题，建议咨询辅导员”。
  ```
- 在右侧可选择模型（如 GPT-4、Claude 等），需先在 **Settings → Model Provider** 中配置 API Key。

### 4. 测试与发布
- 点击右上角 **“Preview”** 实时测试对话效果
- 满意后可点击 **“Publish”** 获取嵌入代码或分享链接

> 💡 提示：网页版适合快速原型验证，但涉及敏感数据或长期使用建议本地部署。

---

## 三、本地使用 Docker 部署 Dify

### 前提条件
- 安装 [Docker](https://www.docker.com/) 和 [Docker Compose](https://docs.docker.com/compose/install/)
- 至少 4GB 内存，推荐 Linux / macOS / WSL2（Windows 用户建议使用 WSL2）

### 部署步骤

#### 1. 克隆官方仓库
```bash
git clone https://github.com/langgenius/dify.git
cd dify
```

#### 2. 进入 docker 目录
```bash
cd docker
```

#### 3. 复制环境配置文件
```bash
cp .env.example .env
cp docker-compose.yaml.example docker-compose.yaml
```

#### 4. 修改 `.env` 文件（关键配置）
```env
# 设置你的公开访问地址（本地可设为 http://localhost）
CONSOLE_API_URL=http://localhost:3001
WEB_API_URL=http://localhost:3001

# 可选：配置默认模型（如使用 OpenAI）
OPENAI_API_KEY=your_openai_api_key_here
```

> ⚠️ 注意：若不使用外部模型，可跳过 API Key，后续在 Web 界面中配置。

#### 5. 启动服务
```bash
docker-compose up -d
```

#### 6. 访问本地 Dify
- 控制台（管理界面）：[http://localhost:3000](http://localhost:3000)
- API 服务：[http://localhost:3001](http://localhost:3001)

首次访问会引导你创建管理员账号。

#### 7. 停止服务（可选）
```bash
docker-compose down
```

> ✅ 成功！你现在拥有一个完全私有的 Dify 实例，所有数据保存在本地。

---

## 四、Dify 的基本应用类型

Dify 支持三种主要应用类型，适用于不同场景：

| 类型         | 适用场景                     | 特点                                                 |
| ------------ | ---------------------------- | ---------------------------------------------------- |
| **Chatbot**  | 简单问答、客服、知识库查询   | 基于 RAG（检索增强生成），可上传 PDF/Word 构建知识库 |
| **Agent**    | 需要调用工具、多步推理的任务 | 支持函数调用（如查天气、发邮件）、自主决策           |
| **Workflow** | 复杂业务流程自动化           | 可视化拖拽节点，实现条件分支、循环、并行等逻辑       |

> 📌 建议初学者从 **Chatbot** 开始，再逐步尝试 Agent 和 Workflow。

---

## 五、节点的使用方法（以 Workflow 为例）

在 **Workflow 模式** 下，你可以通过拖拽“节点”构建复杂逻辑。以下是常用节点详解：

### 1. **Start 节点**
- 入口节点，定义用户输入变量（如 `query`, `user_id`）
- 所有流程从此开始

### 2. **LLM 节点**
- 调用大语言模型生成文本
- 可配置：
  - 模型（GPT-4、Claude、本地模型等）
  - Prompt 模板（支持变量插入，如 `{{query}}`）
  - 输出变量名（如 `llm_output`）

> 示例 Prompt：
> ```text
> 请根据以下问题生成一个简短回答：{{query}}
> ```

### 3. **Knowledge Retrieval（知识检索）节点**
- 从已上传的知识库中检索相关内容
- 用于 RAG 场景
- 输出检索到的文档片段，可作为 LLM 的上下文

### 4. **Code 节点（Python）**
- 执行自定义 Python 代码
- 可处理数据、调用 API、计算等
- 输入/输出通过变量传递

> 示例：提取关键词
> ```python
> import re
> keywords = re.findall(r'\b\w{3,}\b', inputs['text'])
> outputs = {'keywords': ', '.join(keywords[:5])}
> ```

### 5. **Condition（条件）节点**
- 实现 if-else 逻辑
- 根据表达式判断走向不同分支
- 表达式示例：`{{score}} > 80`

### 6. **HTTP Request 节点**
- 调用外部 API（如天气、翻译、数据库）
- 支持 GET/POST，可设置 Headers、Body
- 返回 JSON 数据可被后续节点使用

### 7. **End 节点**
- 流程出口，定义最终返回给用户的内容
- 可组合多个变量，如：
> ```text
> {{answer}}\n\n参考来源：{{source}}
> ```

---

## 六、实用技巧与建议

1. **变量命名规范**：使用小写+下划线（如 `user_query`），避免空格和特殊符号
2. **调试技巧**：在每个节点后添加 **Debug 节点**（或查看执行日志）观察变量值
3. **知识库优化**：上传文档后，在 Knowledge Retrieval 节点调整“Top K”和“相似度阈值”
4. **本地模型支持**：可通过 Ollama 或 vLLM 部署本地 LLM，并在 Dify 中配置为模型提供商
5. **版本控制**：Dify 支持应用版本快照，重要修改前记得“Save as Version”

---

## 七、常见问题（FAQ）

**Q：Dify 能免费使用吗？**  
A：开源版本完全免费，可私有部署。官方云平台有免费额度，超出后按量计费。

**Q：需要编程基础吗？**  
A：基础 Chatbot 无需代码；Workflow 和 Code 节点需要简单 Python 或逻辑思维。

**Q：能连接学校数据库吗？**  
A：可以！通过 HTTP Request 节点或自定义 Code 节点调用内部 API（需网络互通）。

**Q：支持中文吗？**  
A：完全支持，包括界面、Prompt、知识库文档等。

---

> 🎓 祝你在 AI 开发之旅中收获满满！如有疑问，可查阅 [Dify 官方文档](https://docs.dify.ai) 或加入社区讨论。


> 本指南由居居明维护，如有疑问请联系：`zzming2019@hotmail.com`  
> 最后更新：2026年1月17日