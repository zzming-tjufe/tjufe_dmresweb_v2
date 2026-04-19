import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useLocation} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import styles from './styles.module.css';

function parseReply(data) {
  if (!data || typeof data !== 'object') {
    return null;
  }
  if (typeof data.reply === 'string') {
    return data.reply;
  }
  const choice = data.choices?.[0];
  const content = choice?.message?.content ?? choice?.text;
  if (typeof content === 'string') {
    return content;
  }
  return null;
}

function getWelcomeMessage({embedUrl, apiUrl}) {
  if (embedUrl) {
    return '已启用嵌入模式：下方窗口由你配置的地址加载（常见文档问答产品会提供「嵌入 / 分享」链接）。若页面空白，多半是对方禁止 iframe，请用下方「新窗口打开」。';
  }
  if (apiUrl) {
    return '已配置问答接口，可直接在下方输入问题。';
  }
  return [
    '你不需要自己做「传统后端」，也能有交互问答，常用做法是二选一：',
    '',
    '1）嵌入（推荐）：在支持「上传文档 + 托管对话」的产品里创建机器人，把对方给你的可嵌入页面地址，填到构建环境变量 CHAT_EMBED_URL。',
    '',
    '2）进阶：若以后有人提供 HTTP 接口，再设置 CHAT_API_URL（密钥只能放在对方服务器上，不要写进本站）。',
    '',
    '当前尚未配置 CHAT_EMBED_URL / CHAT_API_URL。',
  ].join('\n');
}

export default function SiteChatAssistant() {
  const {siteConfig} = useDocusaurusContext();
  const location = useLocation();
  const chatApiUrl = siteConfig.customFields?.chatApiUrl || '';
  const chatEmbedUrl = siteConfig.customFields?.chatEmbedUrl || '';

  const embedMode = Boolean(chatEmbedUrl);

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState(() => [
    {
      id: 'welcome',
      role: 'assistant',
      content: getWelcomeMessage({embedUrl: chatEmbedUrl, apiUrl: chatApiUrl}),
    },
  ]);

  const listRef = useRef(null);

  const pageContext = useMemo(
    () => ({
      path: `${location.pathname}${location.search || ''}`,
    }),
    [location.pathname, location.search],
  );

  useEffect(() => {
    if (!open) {
      return;
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  useEffect(() => {
    if (embedMode || !open || !listRef.current) {
      return;
    }
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [embedMode, open, messages, loading]);

  const appendMessage = useCallback((message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const send = useCallback(async () => {
    if (embedMode) {
      return;
    }

    const text = input.trim();
    if (!text || loading) {
      return;
    }

    const userMessage = {id: `u-${Date.now()}`, role: 'user', content: text};
    appendMessage(userMessage);
    setInput('');
    setLoading(true);

    if (!chatApiUrl) {
      appendMessage({
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: getWelcomeMessage({embedUrl: chatEmbedUrl, apiUrl: chatApiUrl}),
      });
      setLoading(false);
      return;
    }

    const threadForApi = [...messages, userMessage].filter(
      (message) => message.role === 'user' || message.role === 'assistant',
    );
    const payload = {
      messages: threadForApi
        .filter((message) => message.id !== 'welcome')
        .map(({role, content}) => ({role, content})),
      page: pageContext,
    };

    try {
      const response = await fetch(chatApiUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) {
        const detail =
          (data && (data.error || data.message)) || `HTTP ${response.status}`;
        appendMessage({
          id: `e-${Date.now()}`,
          role: 'error',
          content: `请求失败：${detail}`,
        });
        return;
      }

      const reply = parseReply(data);
      if (!reply) {
        appendMessage({
          id: `e-${Date.now()}`,
          role: 'error',
          content: '接口返回格式无法识别。请返回 `{ "reply": "..." }` 或 OpenAI 兼容结构。',
        });
        return;
      }

      appendMessage({id: `a-${Date.now()}`, role: 'assistant', content: reply});
    } catch (error) {
      appendMessage({
        id: `e-${Date.now()}`,
        role: 'error',
        content: `网络错误：${error?.message || String(error)}`,
      });
    } finally {
      setLoading(false);
    }
  }, [
    appendMessage,
    chatApiUrl,
    chatEmbedUrl,
    embedMode,
    input,
    loading,
    messages,
    pageContext,
  ]);

  return (
    <>
      <button
        type="button"
        className={`${styles.fab} ${open ? styles.fabActive : ''}`}
        aria-label={open ? '关闭问答' : '打开问答'}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}>
        {open ? '✕' : '💬'}
      </button>

      {open ? (
        <>
          <button
            type="button"
            className={styles.backdrop}
            aria-label="关闭问答面板"
            onClick={() => setOpen(false)}
          />
          <section
            className={`${styles.panel} ${embedMode ? styles.panelEmbed : ''}`}
            aria-label="站点问答">
            <header className={styles.header}>
              <div className={styles.title}>问答</div>
              <button
                type="button"
                className={styles.close}
                aria-label="关闭"
                onClick={() => setOpen(false)}>
                ×
              </button>
            </header>

            <div className={styles.hint}>
              当前页面：{pageContext.path}
              {embedMode ? ' · 嵌入模式' : ''}
              {!embedMode && chatApiUrl ? ' · 已配置接口' : ''}
              {!embedMode && !chatApiUrl ? ' · 未配置接口' : ''}
            </div>

            {embedMode ? (
              <>
                <div className={styles.embedWrap}>
                  <iframe
                    title="问答嵌入页"
                    className={styles.embedFrame}
                    src={chatEmbedUrl}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className={styles.embedFallback}>
                  若此处为空白，多半是对方禁止被 iframe 嵌入。请{' '}
                  <a href={chatEmbedUrl} target="_blank" rel="noreferrer noopener">
                    在新窗口打开
                  </a>
                  。
                </div>
              </>
            ) : (
              <>
                <div ref={listRef} className={styles.messages}>
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`${styles.bubble} ${
                        message.role === 'user'
                          ? styles.bubbleUser
                          : message.role === 'error'
                            ? styles.bubbleError
                            : styles.bubbleAssistant
                      }`}>
                      {message.content}
                    </div>
                  ))}
                  {loading ? (
                    <div className={`${styles.bubble} ${styles.bubbleAssistant}`}>正在思考…</div>
                  ) : null}
                </div>

                <div className={styles.composer}>
                  <textarea
                    className={styles.textarea}
                    rows={2}
                    value={input}
                    placeholder="输入问题后发送…"
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' && !event.shiftKey) {
                        event.preventDefault();
                        send();
                      }
                    }}
                  />
                  <button type="button" className={styles.send} disabled={loading} onClick={send}>
                    发送
                  </button>
                </div>
              </>
            )}
          </section>
        </>
      ) : null}
    </>
  );
}
