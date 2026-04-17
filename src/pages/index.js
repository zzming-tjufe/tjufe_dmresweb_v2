import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import clsx from 'clsx';

import styles from './index.module.css';

const modules = [
  {
    title: '开源工具实践',
    description: '命令行、Docker、Git、Anaconda 等核心工具的上手路线。',
    to: '/docs/guide/lesson/opensourcetools',
    tags: ['工具', '实操'],
  },
  {
    title: '生成式 AI 导论',
    description: '从入门到能用：ComfyUI 与 Dify 的学习与实践入口。',
    to: '/docs/guide/lesson/generativeai',
    tags: ['AI', '工作流'],
  },
  {
    title: '科学上网',
    description: '网络访问与工具配置的学习指引与常用方案。',
    to: '/docs/guide/lesson/scienceweb',
    tags: ['网络', '配置'],
  },
  {
    title: '新手必读',
    description: 'Markdown、环境配置、搜索技巧、英文文档阅读方法。',
    to: '/docs/guide/lesson/freshman',
    tags: ['新生', '方法论'],
  },
  {
    title: '关于与贡献',
    description: '项目背景、许可协议、以及如何参与共建。',
    to: '/docs/about/dm2501jjm',
    tags: ['共建', '协议'],
  },
  {
    title: '迁移与插图规范',
    description: '静态资源规范 + Markdown -> MDX 渐进迁移模板。',
    to: '/docs/about/mdx-migration-guide',
    tags: ['MDX', '规范'],
  },
];

function ModuleCard({title, description, to, tags}) {
  return (
    <div className={clsx('col col--4', styles.cardCol)}>
      <Link className={styles.card} to={to}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <div className={styles.cardTags}>
            {tags?.map((t) => (
              <span key={t} className={styles.tag}>
                {t}
              </span>
            ))}
          </div>
        </div>
        <p className={styles.cardDesc}>{description}</p>
        <div className={styles.cardAction}>进入模块 →</div>
      </Link>
    </div>
  );
}

const quickStart = [
  {
    step: '1',
    title: '先读导航页',
    to: '/docs',
    note: '从总览了解模块结构与入口。',
  },
  {
    step: '2',
    title: '学会写 Markdown',
    to: '/docs/guide/basic/markdown',
    note: '后续自己补充内容会更顺手。',
  },
  {
    step: '3',
    title: '配置编程环境',
    to: '/docs/guide/basic/envs',
    note: '把基础环境搭好，再做工具与课程实践。',
  },
  {
    step: '4',
    title: '掌握 Git（强烈推荐）',
    to: '/docs/guide/development/git',
    note: '方便协作、提交与回退，也是迁移过程的保障。',
  },
];

export default function Home() {
  return (
    <Layout
      title="天财数管资源站"
      description="基于 Docusaurus 的现代文档站基础框架">
      <header className={styles.heroBanner}>
        <div className="container">
          <h1 className={styles.heroTitle}>天财数管资源站</h1>
          <p className={styles.heroSubtitle}>专为新生打造的学习资源导航站。</p>
          <div className={styles.heroButtons}>
            <Link className={clsx('button button--lg', styles.heroPrimaryBtn)} to="/docs">
              开始阅读
            </Link>
            <Link className={clsx('button button--lg', styles.heroSecondaryBtn)} to="/docs/about/mdx-migration-guide">
              迁移与插图规范
            </Link>
          </div>
        </div>
      </header>
      <main className="container margin-vert--lg">
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>模块入口</h2>
            <p className={styles.sectionSubtitle}>按主题进入对应模块，快速定位你需要的内容。</p>
          </div>
          <div className="row">
            {modules.map((m) => (
              <ModuleCard key={m.title} {...m} />
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>新手起步路径</h2>
            <p className={styles.sectionSubtitle}>如果你不知道从哪里开始，按这个顺序读更省时间。</p>
          </div>
          <ol className={styles.steps}>
            {quickStart.map((s) => (
              <li key={s.step}>
                <Link className={styles.step} to={s.to}>
                  <div className={styles.stepBadge}>{s.step}</div>
                  <div className={styles.stepBody}>
                    <div className={styles.stepTitle}>{s.title}</div>
                    <div className={styles.stepNote}>{s.note}</div>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      </main>
    </Layout>
  );
}
