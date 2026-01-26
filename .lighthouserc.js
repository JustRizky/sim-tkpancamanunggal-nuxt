module.exports = {
  ci: {
    assert: {
      preset: 'lighthouse:recomended',
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
