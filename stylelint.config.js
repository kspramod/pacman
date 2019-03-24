module.exports = {
  processors: ['stylelint-processor-styled-components'],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-styled-components'
  ],
  rules: {
    indentation: 2,
    'selector-pseudo-element-colon-notation': 'single',
    'comment-empty-line-before': [
      'never',
      {
        except: ['first-nested'],
        ignore: ['after-comment', 'stylelint-commands']
      }
    ]
  },
  syntax: 'scss'
}
