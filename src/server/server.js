var express = require('express')
var app = express()
var insertion = require('./mongodb')

app.get('/', function(req, res) {
	const data = { name: req.query.name, age: req.query.age }
	insertion(data)
	res.send(data)
})

app.listen(8080)
