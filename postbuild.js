const fs = require('fs')

const path = './storybook-static/index.html'

let html = fs.readFileSync(path, 'utf-8')

html = html.replace('Storybook', 'UI | Decentraland')

fs.writeFileSync(path, html)
