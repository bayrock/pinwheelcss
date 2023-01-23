const fs = require('fs/promises')
const postcss = require('postcss')
const { plugins } = require('./postcss.config')
const schema = require('./package.json')

const config = Object.freeze({
    source: 'src/css/pinwheel.pcss',
    directory: `dist/@${schema.version}`,
    filename: `pinwheel.min.css`
})

const path = `${config.directory}/${config.filename}`
const tag = `[${schema.name}@${schema.version}]`

fs.readFile(config.source)
    .then(precompiled => postcss(plugins).process(precompiled, { from: config.source, to: path }))
    .then(processed => fs.mkdir(config.directory, { recursive: true }).then(() => processed.css))
    .then(compiled => fs.writeFile(path, compiled)).then(() => console.log(`${tag} Build successful!`))
    .catch(error => console.log(`${tag} Build error:\n${error.message}`))
