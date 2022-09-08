import http from 'http';
import path from 'path';
import fs from 'fs';
(async () => {
  const isFile = (path: string) => fs.lstatSync(path).isFile();

  http
    .createServer((req: any, res: any) => {
      const fullPath = path.join(process.cwd(), req.url);
      if (!fs.existsSync(fullPath)) return res.end('Файл или папка не найдены');
      if (isFile(fullPath)) {
        return fs.createReadStream(fullPath).pipe(res);
      }

      let linkList = '';
      const urlParams = req.url.match(/[\d\w\.]+/gi);

      if (urlParams) {
        urlParams.pop();
        const prevUrl = urlParams.join('/');
        linkList = urlParams.length
          ? `<li><a href = "/${prevUrl}">..back to ${prevUrl}</a></li>`
          : `<li><a href = "/">..back</a></li>`;
      }
      fs.readdirSync(fullPath).forEach((fileName) => {
        const filePath = path.join(req.url, fileName);
        linkList += `<li><a href = "${filePath}" style="liststyle='none'">${fileName}</a></li>`;
      });
      const HTML = fs
        .readFileSync(path.join('index.html'), 'utf-8')
        .replace('##Links', linkList);
      res.writeHead(200, {
        'Content-Type': 'text/html',
      });
      return res.end(HTML);
    })
    .listen(3000);
})();