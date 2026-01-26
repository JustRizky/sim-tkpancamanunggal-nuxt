module.exports = {
  ci: {
    assert: {
      assertions: {
        'bf-cache': ['warn'],
        'color-contrast': ['warn'],
        'document-title': ['warn'],
        'errors-in-console': ['warn'],
        'html-has-lang': ['warn'],
        'image-delivery-insight': ['warn'],
        'link-name': ['warn'],
        'meta-description': ['warn'],
        'network-dependency-tree-insight': ['warn'],
        'unused-javascript': ['warn'],
        'largest-contentful-paint': ['warn'],
        'legacy-javascript': ['warn'],
        'modern-image-formats': ['warn'],
        'render-blocking-insight': ['warn'],
        'render-blocking-resources': ['warn'],
      },
    },
    collect: {
      staticDistDir: './.output/public',
      url: 'http://localhost/',
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}
