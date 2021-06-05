/*eslint-env node*/
const fs = require('fs')

const path = require('path').resolve(__dirname, './storybook-static/index.html')

let html = fs.readFileSync(path, 'utf-8')

html = html.replace('Storybook', 'UI | Decentraland')

fs.writeFileSync(path, html)

console.log(`Replaced "Storybook" with "UI | Decentraland" in ${path}`)
