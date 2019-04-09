const MongoClient = require('mongodb')
const url = 'mongodb://localhost:27017'

const Carts = {
	// 插入数据
	insertion: (data, dataBaseName = 'carts', tableName = 'site') => {
		if (!data) return false
		MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
			if (err) throw err
			const dbo = db.db(dataBaseName)
			dbo.collection(tableName).insertOne(data, (err, res) => {
				if (err) throw err
				console.log(dataBaseName + '文档插入', data)
				db.close()
			})
		})
	},
	// 查询所有
	allList: (dataBaseName = 'carts', tableName = 'site', condition = {}) => {
		let allList = null
		MongoClient.connect(url, { useNewUrlParser: true }, async function(err, db) {
			if (err) throw err
			var dbo = db.db(dataBaseName)
			await	dbo.collection(tableName).find(condition).toArray(function(err, result) {
				// 返回集合中所有数据
				if (err) throw err
				
				db.close()
				allList = result
			})
		})
		return allList
	}
}

module.exports = Carts
