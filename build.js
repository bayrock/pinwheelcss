const fs = require('fs/promises')
const postcss = require('postcss')
const { plugins } = require('./postcss.config')
const schema = require('./package.json')

const config = new Map()
    .set('source', 'src/css/pinwheel.pcss')
    .set('directory', `dist/@${schema.version}`)
    .set('filename', `pinwheel.min.css`)

const path = `${config.get('directory')}/${config.get('filename')}`
const tag = `[${schema.name}@${schema.version}]`

fs.readFile(config.get('source'))
    .then(precompiled => postcss(plugins).process(precompiled, { from: config.get('source'), to: path }))
    .then(processed => fs.mkdir(config.get('directory'), { recursive: true }).then(() => processed.css))
    .then(compiled => fs.writeFile(path, compiled)).then(() => console.log(`${tag} Build successful!`))
    .catch(error => console.log(`${tag} Build error:\n${error.message}`))
