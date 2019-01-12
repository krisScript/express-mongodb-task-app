const getDB = require('../util/database').getDB;
const mongodb = require('mongodb')
class Task {
  constructor(title, description,id) {
    this.title = title;
    this.description = description;
    this._id = id ? new mongodb.ObjectId(id) : null;
  }

  save() {
    const db = getDB();
    let dbOp;
    if (this._id) {
      dbOp = db
        .collection('tasks')
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = db.collection('tasks').insertOne(this);
    }
    return dbOp
      .then(result => {
     
      })
      .catch(error => {
       throw error
      });
  }
  static fetchAll(){
    const db = getDB()
    return db.collection('tasks').find().toArray()
    .then(tasks => {
      return tasks
    })
    .catch(error => {
      throw error
    })
  }
  static findById(taskId) {
    const db = getDB();
    return db
      .collection('tasks')
      .find({ _id: new mongodb.ObjectId(taskId) })
      .next()
      .then(task => {
        return task;
      })
      .catch(error => {
        throw error
      });
  }
  static deleteById(taskId) {
    const db = getDB();
    return db
      .collection('tasks')
      .deleteOne({ _id: new mongodb.ObjectId(taskId) })
      .then(result => {
      
      })
      .catch(err => {
        throw error
      });
  }
}
module.exports = Task;
