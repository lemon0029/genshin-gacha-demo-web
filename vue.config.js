module.exports = {
  devServer: {
    port: 8000,
    proxy: {
      '/img': {
        target: 'http://localhost:8080',
      }
    },
  },
}
