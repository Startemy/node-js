import { innSubDir } from "./clientServer.js"

let dataPath = { dir: '' }

const ul = document.createElement('ul')
document.body.appendChild(ul)

dataPath.dir = document.location.pathname.replace('', '.')

if (dataPath.dir == '') {
  console.log('OK')
} else {
  innSubDir(dataPath)
}

window.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    const data = e.target.href.replace(/^.*\/\/[^\/]+/, '')
    e.preventDefault()
    const dataPathNext = { dir: `${dataPath.dir}${data}` }
    innSubDir(dataPathNext)
  }
})