// @ts-check

const config = {
  title: '天财数管资源站',
  tagline: '面向新生与进阶学习者的文档资源站',
  favicon: 'img/examples/校徽.jpg',

  /**
   * 构建时注入（勿写密钥）：
   * - CHAT_EMBED_URL：第三方「文档问答 / 机器人」提供的可嵌入页面（iframe），无需自建后端。
   * - CHAT_API_URL：可选，自建 HTTP 接口时使用（见 SiteChatAssistant 组件约定）。
   */
  customFields: {
    chatApiUrl: process.env.CHAT_API_URL || '',
    chatEmbedUrl: process.env.CHAT_EMBED_URL || '',
  },

  future: {
    v4: true,
  },

  url: 'https://mrdino-0611.github.io',
  baseUrl: '/tjufe_dmres_web/',

  organizationName: 'MrDinO-0611',
  projectName: 'tjufe_dmres_web',
  trailingSlash: false,

  onBrokenLinks: 'warn',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs',
          routeBasePath: 'docs',
          sidebarPath: './sidebars.js',
          exclude: ['**/_sidebar.md', '**/_coverpage.md', '**/index.html', '**/scripts/**'],
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      /** 首次访问未手动选择时，跟随系统浅色/深色偏好 */
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: '天财数管资源站',
      logo: {
        alt: '天津财经大学校徽',
        src: 'img/examples/校徽.jpg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: '文档',
        },
        {
          to: '/home',
          label: '站内导航',
          position: 'left',
        },
        {
          href: 'https://github.com/MrDinO-0611/tjufe_dmres_web',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      /** 与全站 tokens 统一，由 custom CSS 控制页脚背景与文字色 */
      style: 'light',
      links: [
        {
          title: '文档',
          items: [
            {
              label: '开始阅读',
              to: '/docs',
            },
          ],
        },
        {
          title: '社区',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/MrDinO-0611/tjufe_dmres_web',
            },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} zzming-tjufe，内容协议 CC BY-NC-SA 4.0`,
    },
    prism: {
      additionalLanguages: ['bash', 'powershell', 'python', 'java', 'sql', 'yaml'],
    },
  },
};

module.exports = config;
