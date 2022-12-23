const { MongoClient, ObjectId } = require("mongodb");

const connectionUrl ="mongodb://localhost:27017/gig";
const dbName = "gig";

let db;

const init = () =>
    MongoClient.connect(connectionUrl, { useNewUrlParser: true }).then(
        (client) => {
            db = client.db(dbName);
        }
    );

const getItem = (id) => {
    const collection = db.collection("gig");
    return collection.findOne({ id: id });
};

const getItems = () => {
    const collection = db.collection("gig");
    return collection.find({}).toArray();
};

module.exports = { init, getItem, getItems };

