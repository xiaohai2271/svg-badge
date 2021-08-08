const express = require('express')
const app = express()
const port = 3000
var http = require('https');

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});


app.get('/svg/posts', (req, res) => {
  http.get(`https://api.celess.cn/articles?count=1&page=${req.query.offset || 1}`, function (httpRes,) {
    httpRes.on('data', d => {
      const data = JSON.parse(d)
      res.set('Content-Type', 'image/svg+xml')
      res.send(
        `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
        "http://www.w3.org/TR/2001/REC-SVG-20050904/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="500"
      height="20" baseProfile="full">
    <g>
        <a xlink:href="http://www.celess.cn/article/${data.result.list[0].id}" target="new" id="post-link">
            <text id="post" x="0" y="15" fill="blue">${data.result.list[0].title}</text>
        </a>
    </g>
</svg>`
      )
    })
  })
})

app.get('*', (req, res) => {
  res.set("Content-Type", "text/html")
  res.send(`
  <p style="text-align:center">
  Hi 👋, you came to the wrong address, what you need may be this address -> <a href="https://www.celess.cn">www.celess.cn</a>
</p>`);
});



app.listen(port, () => {
  console.log(`Svg Application  listening at http://localhost:${port}`)
})