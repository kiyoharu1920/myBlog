const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.MONGODB_URL;

const test = async function () {
  console.log("mongoDB");
  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
      );
    } finally {
      // Ensures that the client will close when you finish/error
      // await client.close();
    }
  }
  await run().catch(console.dir);

  async function getUsers() {
    try {
      await client.connect();
      const db = client.db("Comments"); // データベース名を指定
      const collection = db.collection("Comments"); // コレクション名を指定

      const users = await collection.find({}).toArray(); // 全件取得
      console.log("取得したデータ:", users);

      return users;
    } catch (err) {
      console.error("エラー:", err);
    } finally {
      await client.close();
    }
  }
  return await getUsers();
};

export function MongoDB() {
  const json = test();
  console.log(json);
  return (
    <div>
      MongoDB
      <div>{json.map((item) => item.name)}</div>
    </div>
  );
}
