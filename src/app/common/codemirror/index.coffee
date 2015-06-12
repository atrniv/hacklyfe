angular = require('angular')
codemirror = require('angular-ui-codemirror')

angular.module(codemirror)
  .config(['uiCodemirrorConfig', (uiCodemirrorConfig) ->
    uiCodemirrorConfig.codemirror = {
      lineNumbers: true
      theme: 'liquibyte'
    }
  ])

module.exports = codemirror
