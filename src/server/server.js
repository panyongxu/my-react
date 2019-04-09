var express = require('express')
const MongoClient = require('mongodb')
const url = 'mongodb://localhost:27017'
var app = express()
var Carts = require('./mongodb')

// 添加到购物车
app.get('/addCarts', function(req, res) {
	res.header('Access-Control-Allow-Origin', '*')
	const data = { ...req.query }
	Carts.insertion(data, 'carts', 'list')
	res.send(data)
})

// 购物车列表
app.get('/cartList', async function(req, res) {
	res.header('Access-Control-Allow-Origin', '*')
	MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
		if (err) throw err
		var dbo = db.db('carts')
	  dbo.collection('list').find({}).toArray(function(err, result) {
			// 返回集合中所有数据
			if (err) throw err
			res.send(result)
			db.close()
		})	
	})
	

})

app.listen(8080)
