"use strict";
import { innDir, get} from "./clientServer.js"

const ul = document.createElement('ul')
document.body.appendChild(ul)

const dir = prompt('Введите директорию')
let intro = { dir }
innSubDir(intro)

window.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    const data = e.target.href.replace(/^.*\/\/[^\/]+/, '')
    get()
  }
})