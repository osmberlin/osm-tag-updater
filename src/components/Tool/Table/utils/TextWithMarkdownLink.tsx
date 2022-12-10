import React from 'react'

type Props = { children: string }

export const TextWithMarkdownLink: React.FC<Props> = ({
  children: stringWithMarkdownLink,
}) => {
  // Thanks at https://dev.to/mattkenefick/regex-convert-markdown-links-to-html-anchors-f7j
  const html = stringWithMarkdownLink.replace(
    /\[([^\]]+)\]\(([^)]+)\)/,
    '<a target="_blank" rel="noreferrer" href="$2">$1</a>'
  )
  return <span dangerouslySetInnerHTML={{ __html: html }} />
}
