import sanitizeHtml from 'sanitize-html'

export default (dirtyHtml = '') => {
  const cleanhtml = sanitizeHtml(dirtyHtml, {
    allowedTags: [
      'p',
      'em',
      'u',
      's',
      'ol',
      'ul',
      'li',
      'br'
    ],
    allowedAttributes: {},
    enforceHtmlBoundary: true
  })

  return cleanhtml
}
