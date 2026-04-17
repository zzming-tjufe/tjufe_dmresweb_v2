// @ts-check

const config = {
  title: '天财数管资源站',
  tagline: '面向新生与进阶学习者的文档资源站',

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
    navbar: {
      title: '天财数管资源站',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: '文档',
        },
        {
          href: 'https://github.com/MrDinO-0611/tjufe_dmres_web',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
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
      copyright: `© ${new Date().getFullYear()} 居居明，内容协议 CC BY-NC-SA 4.0`,
    },
    prism: {
      additionalLanguages: ['bash', 'powershell', 'python', 'java', 'sql', 'yaml'],
    },
  },
};

module.exports = config;
