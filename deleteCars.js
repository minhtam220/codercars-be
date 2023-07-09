const fsSync = require("fs");
const csv = require("csvtojson");

const MongoClient = require("mongodb").MongoClient;

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "shop";

// Collection Name
const collectionName = "cars";

// Create a new MongoClient
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connect to the MongoDB server
client.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }

  // Get the database
  const db = client.db(dbName);

  // Get the collection
  const collection = db.collection(collectionName);

  // Delete all documents in the collection
  collection.deleteMany({}, (deleteErr, result) => {
    if (deleteErr) {
      console.error("Error deleting documents:", deleteErr);
      return;
    }
    console.log(`${result.deletedCount} documents deleted.`);

    // Close the connection
    client.close();
  });
});
