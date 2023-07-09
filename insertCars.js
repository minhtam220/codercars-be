const fsSync = require("fs");

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

  //load cars from json
  let cars = JSON.parse(fsSync.readFileSync("cars.json")).cars;

  // Insert multiple documents
  collection.insertMany(cars, (insertErr, result) => {
    if (insertErr) {
      console.error("Error inserting documents:", insertErr);
      return;
    }
    console.log(`${result.insertedCount} documents inserted.`);

    // Close the connection
    client.close();
  });
});
