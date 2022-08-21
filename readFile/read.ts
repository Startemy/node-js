import fs from "fs"
import readline from "readline"

export const writeIPLog = () => {

  const writeFile = (ip: string, line: string) => {
    fs.createWriteStream(`./readFile/ipLog/${ip}.log`, { flags: 'a', encoding: 'utf8' }).write(`${line} \n`)
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  const readFile = fs.createReadStream('./readFile/access.log', { encoding: 'utf8' })
  const maxSize = 100

  let size: number = fs.statSync('./readFile/access.log').size / (1024 * 1024)

  if (size <= maxSize) {

    setTimeout(() => {
      process.stdout.write('Введите IP для поиска логов (10.170.*.*) > ')
    }, 2000)

    rl.on('line', (input: string) => {
      readFile.on('data', (data: string) => {
        const lines = data.split('\n')
        lines.forEach((line) => {
          const ip = line.split(' ')[2]
          if (ip === input) {
            writeFile(ip, line)
          }
        })
      }).on('end', () => {
        console.log(`Логфайл для IP: ${input} создан`)
      })
    })
  } else {
    console.log('Файл слишком большой')
  }
}








