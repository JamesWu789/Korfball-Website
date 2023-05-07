const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

class Work {
    constructor(worker, workItem, specification, quantity, location, date, id, userId) {
        this.worker = worker;
        this.workItem = workItem;
        this.specification = specification;
        this.quantity = quantity;
        this.location = location;
        this.date = date;
        this._id = id ? new mongodb.ObjectId(id) : null;    // 待研究 (下方save在更改資料時用)
        this.userId = userId;                               // 待研究
    }

    save() {
        const db = getDb();      //getDb就直接連接到資料庫
        let db_tem;
        if (this._id) {
            db_tem = db
                .collection('work')
                .updateOne({ _id: this._id }, { $set: this });
        } else {
            db_tem = db
                .collection('work')     //集合
                .insertOne(this);           //也可以insertMany([{} {}]) 
        }
        return db_tem
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    }

    static fetchAll() {
        const db = getDb();
        return db
            .collection('work')
            .find()
            .toArray()              // 將所有檔案變成array(最好在檔案很多時用)
            .then(work => {
                console.log(work);
                return work;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static findById(workId) {
        const db = getDb();
        return db
            .collection('work')
            .find({ _id: new mongodb.ObjectId(workId) })
            .next()
            .then(work => {
                console.log(work);
                return work;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static deleteById(workId) {
        const db = getDb();
        return db
            .collection('work')
            .deleteOne({ _id: new mongodb.ObjectId(workId) })
            .then(result => {
                console.log('Deleted');
            })
            .catch(err => {
                console.log(err);
            });
    }
}

module.exports = Work;
