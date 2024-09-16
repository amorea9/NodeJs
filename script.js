// server.mjs
import { createServer } from "node:http";
import { MongoClient, ServerApiVersion } from "mongodb";

// Replace the placeholder with your db connection string
const uri = "mongodb://localhost:27017";

const server = createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello World!\n");
  run().catch(console.dir);
});

// starts a simple http server locally on port 3000
server.listen(3000, "127.0.0.1", () => {
  console.log("Listening on 127.0.0.1:3000");
});

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
//add the item in db
async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // insert item
    const myDB = client.db("myDB");
    //when a collection doesn't exists, that will be created
    const myColl = myDB.collection("pizzaMenu");
    const doc = { name: "Neapolitan pizza", shape: "round" };
    const result = await myColl.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
