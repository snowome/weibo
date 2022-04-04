module.exports = {
    parser: '@babel/eslint-parser',
    rules: {
        indent: ['error', 4],
        quotes: ['error', 'single', { allowTemplateLiterals: true }],
        semi: ['error', 'never']
    }
}
