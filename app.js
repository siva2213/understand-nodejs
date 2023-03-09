const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({extended: false}))

app.use('/add-product', (req, res, next) => {
    res.send('<form action="/product" method="POST"><input type="text" name="title"/> <button type="submit">Add Product</button></form>')
})

app.post('/product', (req, res, next) => {
    console.log(JSON.parse(JSON.stringify(req.body)), 'value')
    res.redirect('/')
})

app.use('/', (req, res, next) => {
    res.send('Hello express js')
})

app.listen(3000)