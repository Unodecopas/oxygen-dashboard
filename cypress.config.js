const { defineConfig } = require('cypress')

module.exports = defineConfig({
  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack'
    }
  },
  viewportWidth: 1400,
  viewportHeight: 1260,

  e2e: {
    setupNodeEvents (on, config) {
      // implement node event listeners here
    }
  }
})
