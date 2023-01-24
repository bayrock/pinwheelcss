const presetenv = require('postcss-preset-env')

const defaults = Object.freeze([
    require('postcss-import'),
    require('postcss-simple-vars'),
    require('postcss-for')
])

module.exports = {
    plugins: defaults,
    minify: [
        require('cssnano')({preset: 'default'})
    ],
    aspirational: [
        ...defaults,
        presetenv({stage: 0})
    ],
    experimental: [
        ...defaults,
        presetenv({stage: 1})
    ],
    allowable: [
        ...defaults,
        presetenv({stage: 2})
    ],
    embraced: [
        ...defaults,
        presetenv({stage: 3})
    ],
    stable: [
        ...defaults,
        presetenv({stage: 4})
    ]
}