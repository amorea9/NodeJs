// import { MongoClient, ServerApiVersion } from "mongodb";

// // Replace the placeholder with your Atlas connection string
// const uri = "mongodb://localhost:27017";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function run() {
//   try {
//     // Connect the client to the server (optional starting in v4.7)
//     await client.connect();

//     // insert item
//     const myDB = client.db("myDB");
//     //when a collection doesn't exists, that will be created
//     const myColl = myDB.collection("pizzaMenu");
//     const doc = { name: "Neapolitan pizza", shape: "round" };
//     const result = await myColl.insertOne(doc);
//     console.log(`A document was inserted with the _id: ${result.insertedId}`);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }

// run().catch(console.dir);
