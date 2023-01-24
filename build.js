const fs = require('fs/promises')
const postcss = require('postcss')
const { plugins, minify } = require('./postcss.presets')
const schema = require('./package.json')

const tag = `[${schema.name}@${schema.version}]`

const directory = new Map()
    .set('source', 'src/css')
    .set('distribution', `dist/@${schema.version}`)

const buildPinwheel = async (sourcefiles) => {
    await fs.mkdir(directory.get('distribution'), { recursive: true })

    const writes = []
    for (const filename of sourcefiles) {
        const srcpath = `${directory.get('source')}/${filename}`
        const distpath = `${directory.get('distribution')}/${filename}`.replace('.pcss', '.css')
        const minpath = distpath.replace('.css', '.min.css')

        const raw = await fs.readFile(srcpath)
        const uncompressed = await postcss(plugins).process(raw, { from: srcpath, to: distpath })
        const compressed = await postcss(minify).process(uncompressed, { from: srcpath, to: minpath })

        writes.push(fs.writeFile(distpath, uncompressed.css))
        writes.push(fs.writeFile(minpath, compressed.css))
    }

    return Promise.all(writes)
}

fs.readdir(directory.get('source'))
    .then(files => buildPinwheel(files)).then(() => console.log(`${tag} Build successful!`))
    .catch(error => console.log(`${tag} Build error:\n${error.message}`))