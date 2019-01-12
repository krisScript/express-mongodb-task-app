const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;
let db;
const mongoConnect = cb => {
    
    MongoClient.connect('Put your mongo connectection here',{ useNewUrlParser: true })
.then(
    client => {
        db = client.db()
        cb(client)
    }
).catch(
    error => {
        throw error
    }
)
}
const getDB = () => {
    if(db){
        return db
    }
    throw 'No database found'
}
exports.mongoConnect = mongoConnect
exports.getDB = getDB