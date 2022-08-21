
import fs from "fs"
import { writeIPLog } from "./read"

export const generateFile = () => {

  const writeStream: fs.WriteStream = fs.createWriteStream('./readFile/access.log', { flags: 'a', encoding: 'utf8' })


  fs.stat('./readFile/access.log', (err, stat) => {
    if (err) {
      setTimeout(() => { }, 3000)
      writeFile(writeStream)
    } else {
      writeFile(writeStream)
    }

  })
}

export const writeFile = (writeStream: fs.WriteStream) => {
  const date: Date = new Date();

  function formatDate(date: Date) {
    return date.getFullYear() + '/' +
      (date.getMonth() + 1) + '/' +
      date.getDate() + ':' +
      date.getHours() + ':' +
      date.getMinutes() + ':' +
      date.getSeconds() + ' ' +
      date.getTimezoneOffset();
  }

  const randomIp = () => Array(2).fill(0).map((_, i) => Math.floor(Math.random() * 254)).join('.')

  let size: number = fs.statSync('./readFile/access.log').size / (1024 * 1024)
  for (let i = 0; i <= 1000000; i++) {
    if (size >= 90 && size <= 100) {
      console.log('Файл достиг 100Mb')
      break;
    } else {
      writeStream.write(`log${[i + 1]} - 10.170.${randomIp()} - - [${formatDate(date)}} ] "POST /foo HTTP/1.1"200 0 "-" "curl/7.47.0" \n`)
    }
  }
  writeStream.end(() => {})
  console.log(`Запись закончена`)
  writeIPLog()
}

generateFile()