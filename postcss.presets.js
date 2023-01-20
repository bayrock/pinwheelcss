const presetenv = require('postcss-preset-env')

const plugins = Object.freeze([
    require('postcss-import'),
    require('postcss-simple-vars'),
    require('postcss-for'),
    require('cssnano')({preset: 'default'})
])

module.exports = {
    defaults: plugins,
    aspirational: [
        ...plugins,
        presetenv({stage: 0}),
    ],
    experimental: [
        ...plugins,
        presetenv({stage: 1}),
    ],
    allowable: [
        ...plugins,
        presetenv({stage: 2}),
    ],
    embraced: [
        ...plugins,
        presetenv({stage: 3}),
    ],
    stable: [
        ...plugins,
        presetenv({stage: 4}),
    ]
}