const MongoClient = require('mongodb')
const url = 'mongodb://localhost:27017'

// 插入数据
insertion = (data) => {
	if (!data) return false
	MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
		if (err) throw err
		const dbo = db.db('carts')
		dbo.collection('site').insertOne(data, (err, res) => {
			if (err) throw err
			console.log('文档插入', data)
			db.close()
		})
	})
}

module.exports = insertion