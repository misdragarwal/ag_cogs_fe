'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL:'"http://localhost:7777"',
API_KEY:'"730d84a872b5987b66d7b3b91cd8b8ca7c3c4fdcfd00022fd4d32f1f142f072fa505235a06821746edcbe430fcd9d21ce78025c5ebe647bebd6cef207a7cae2b"'
})
