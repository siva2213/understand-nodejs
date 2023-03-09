const http = require('http')
const fs = require('fs')
const server = http.createServer((req, res) => {
    // console.log(req.method)
    // console.log(req.url)
    // console.log(req.headers)
    const url = req.url
    const method = req.method
    if(url === '/') {
        res.write('<html>')
        res.write('<body><form action="/message" method="POST"> <input name="message" type="text"/> <button type="submit"> Add Message </button></form></body>')
        res.write('</html>')
        return res.end()
    }
    if(url === '/message' && method === "POST") {
        const body = []
        req.on('data', (chunk) => {
            console.log(chunk, 'chunk')
            body.push(chunk)
        })
        return req.on('end', () => {
            const parsedData = Buffer.concat(body).toString()
            const message = parsedData.split('=')[1]
            fs.writeFile('demo.txt', message, (err) => {
                res.statusCode = 302
                res.setHeader('Location', '/')
                return res.end()
            }) 
        })
    }
    res.setHeader('Content-Type', 'text/html')
    res.write('<html><h1>Welcome  to node js Server</h1></html>')
    res.end()

})

server.listen(3000)