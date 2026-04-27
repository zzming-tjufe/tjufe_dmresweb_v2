import React from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Heading from '@theme/Heading';
import MDXContent from '@theme/MDXContent';

function useSyntheticTitle() {
  const {metadata, frontMatter, contentTitle} = useDoc();
  const shouldRender = !frontMatter.hide_title && typeof contentTitle === 'undefined';
  if (!shouldRender) {
    return null;
  }
  return metadata.title;
}

function resolveIconUrl(icon, withBaseUrl) {
  if (!icon || typeof icon !== 'string') {
    return null;
  }
  if (/^(?:[a-z]+:)?\/\//i.test(icon) || icon.startsWith('data:')) {
    return icon;
  }
  if (icon.startsWith('/static/')) {
    return withBaseUrl(icon.replace(/^\/static\//, '/'));
  }
  return withBaseUrl(icon);
}

export default function DocItemContent({children}) {
  const syntheticTitle = useSyntheticTitle();
  const {frontMatter} = useDoc();
  const iconUrl = resolveIconUrl(frontMatter?.titleIcon, useBaseUrl);
  const iconAlt = frontMatter?.titleIconAlt || '';

  return (
    <div className={clsx(ThemeClassNames.docs.docMarkdown, 'markdown')}>
      {syntheticTitle && (
        <header className={iconUrl ? 'doc-title-with-icon-wrap' : undefined}>
          {iconUrl && (
            <span className="doc-title-icon" aria-hidden={iconAlt ? undefined : true}>
              <img src={iconUrl} alt={iconAlt} />
            </span>
          )}
          <div className="doc-title-with-icon-title">
            <Heading as="h1">{syntheticTitle}</Heading>
          </div>
        </header>
      )}
      <MDXContent>{children}</MDXContent>
    </div>
  );
}
