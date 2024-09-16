// server.mjs
import { createServer } from "node:http";
import { MongoClient, ServerApiVersion } from "mongodb";

// Replace the placeholder with your db connection string
const uri = "mongodb://localhost:27017";

//create local server with nodejs
// const server = createServer((req, res) => {
//   res.writeHead(200, { "Content-Type": "text/plain" });
//   res.end("Hello World!\n");
//   // run().catch(console.dir);
// });

// // // starts a simple http server locally on port 3000
// server.listen(3000, "127.0.0.1", () => {
//   console.log("Listening on 127.0.0.1:3000");
// });

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });
// add the item in db
// async function run() {
//   try {
//     // Connect the client to the server (optional starting in v4.7)
//     await client.connect();

//     // insert item
//     const myDB = client.db("myDB");
//     //when a collection doesn't exists, that will be created
//     const myColl = myDB.collection("travelDestinations");
//      const doc = { name: "Neapolitan pizza", shape: "round" };
//      const result = await myColl.insertOne(doc);
//      console.log(`A document was inserted with the _id: ${result.insertedId}`);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

//send post request to our server which inserts a document into the db
// const options = { method: "POST", url: uri, headers: { "Content-Type": "application/json" }, body: { name: "Margherita Pizza", shape: "round" }, json: true };

const postServer = createServer(async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  if (req.method === "POST") {
    let body = "";
    //get data from the request
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    //on request end, parse the body
    req.on("end", async () => {
      try {
        const parsedBody = JSON.parse(body);
        //connect to db
        const client = new MongoClient(uri, {
          serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
          },
        });
        await client.connect();

        //specify which db
        const travelDB = client.db("travelDB");
        const destinations = travelDB.collection("destinations");

        //insert into db in the specified collection
        const result = await destinations.insertOne(parsedBody);

        await client.close(); //ask

        //give the 201 code message and respond with the id of the inserted destination
        res.writeHead(201);
        res.end(JSON.stringify(result));
        // console.log("result", result);
      } catch (err) {
        //generic error assuming you wrote json wrong
        console.error("Invalid JSON");
        res.writeHead(400);
        res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });
  } else {
    //any other request that is not a post will not be accepted
    res.writeHead(405); // Method not allowed if it's not a POST request
    res.end("Only POST requests are allowed\n");
  }
});
// starts a simple http server locally on port 3001
postServer.listen(3001, "127.0.0.1", () => {
  console.log("Listening on 127.0.0.1:3001");
});
