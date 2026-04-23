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
  baseUrl: '/tjufe_dmres_web_v2/',

  organizationName: 'zzming-tjufe',
  projectName: 'tjufe_dmresweb_v2',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
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
          editUrl: 'https://github.com/zzming-tjufe/tjufe_dmresweb_v2/tree/main/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          exclude: ['**/_sidebar.md', '**/_coverpage.md', '**/index.html', '**/scripts/**'],
        },
        blog: false,
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  plugins: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        indexDocs: true,
        indexBlog: false,
        indexPages: true,
        language: ['zh'],
        docsRouteBasePath: '/docs',
        removeDefaultStemmer: true,
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
      },
    ],
  ],

  themeConfig: {
    image: 'img/examples/校徽.jpg',
    metadata: [
      {name: 'description', content: '天财数管资源站：面向新生与进阶学习者的文档资源站。'},
      {property: 'og:type', content: 'website'},
      {property: 'og:site_name', content: '天财数管资源站'},
      {property: 'og:locale', content: 'zh_CN'},
      {name: 'twitter:card', content: 'summary_large_image'},
      {name: 'twitter:title', content: '天财数管资源站'},
      {name: 'twitter:description', content: '面向新生与进阶学习者的文档资源站。'},
    ],
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
          href: 'https://github.com/zzming-tjufe/tjufe_dmresweb_v2',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub 仓库',
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
          title: '反馈',
          items: [
            {
              label: '提交问题',
              href: 'https://github.com/zzming-tjufe/tjufe_dmresweb_v2/issues/new/choose',
            },
            {
              label: '参与编辑',
              href: 'https://github.com/zzming-tjufe/tjufe_dmresweb_v2',
            },
          ],
        },
        {
          title: '社区',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/zzming-tjufe/tjufe_dmresweb_v2',
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
