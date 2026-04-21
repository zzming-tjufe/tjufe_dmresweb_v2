/**
 * 由 Docsify `_sidebar.md` 映射而来，便于后续平滑迁移。
 */
const sidebars = {
  tutorialSidebar: [
    'README',
    {
      type: 'category',
      label: '数字时代开源工具实践',
      link: {type: 'doc', id: 'guide/lesson/opensourcetools'},
      items: [
        'guide/basic/powershell',
        'guide/development/vscode',
        'guide/development/docker',
        'guide/development/git',
        'guide/development/anaconda',
      ],
    },
    {
      type: 'category',
      label: '生成式人工智能导论',
      link: {type: 'doc', id: 'guide/lesson/generativeai'},
      items: ['guide/ai-tools/comfyui', 'guide/ai-tools/dify'],
    },
    {
      type: 'category',
      label: '科学上网',
      link: {type: 'doc', id: 'guide/lesson/scienceweb'},
      items: ['guide/network/clash-verge'],
    },
    {
      type: 'category',
      label: '新手必读',
      link: {type: 'doc', id: 'guide/lesson/freshman'},
      items: [
        'guide/basic/markdown',
        'guide/basic/envs',
        'guide/basic/search',
        'guide/basic/reading',
      ],
    },
    {
      type: 'category',
      label: '关于与贡献',
      items: [
        'about/dm2501jjm',
        'about/record',
        'about/mdx-migration-guide',
        'about/ui-style-guide',
        'about/viewport-regression-matrix',
      ],
    },
  ],
};

module.exports = sidebars;
