module.exports = {
  devServer: {
    port: 8081,
    proxy: {
      '/img': {
        target: 'http://localhost:8080',
      },
      // '/api': {
      //   target: 'http://localhost:8080'
      // }
    },
  },
}
