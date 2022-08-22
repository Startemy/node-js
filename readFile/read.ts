import fs from "fs"
import readline from "readline"

export const writeIPLog = () => {

  const writeFile = (ip: string, line: string) => {
    fs.createWriteStream(`./ipLog/${ip}.log`, { flags: 'a', encoding: 'utf8' }).write(`${line} \n`)
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  const readFile:fs.ReadStream = fs.createReadStream('./access.log', { encoding: 'utf8' })
  const maxSize: number = 100

  let size: number = fs.statSync('./access.log').size / (1024 * 1024)

  if (size <= maxSize) {
    const inputIPQuestion = async (ip: string) => new Promise((resolve) => rl.question(ip, resolve));

    (async () => {
      const inputIP = await inputIPQuestion('Введите IP для поиска логов (10.170.*.*) > ')
      
      readFile.on('data', (data: string) => {
        const lines = data.split('\n')
        for (const line of lines) {
          const listIp = line.split(' ')[2]
          if (listIp === inputIP) {
            writeFile(inputIP, line)
          }
        }
      }).on('end', () => {
        console.log(`Логфайл для IP: ${inputIP} создан`)
        process.exit(0);
      })
    })()
  } else {
    console.log('Файл слишком большой')
  }
}