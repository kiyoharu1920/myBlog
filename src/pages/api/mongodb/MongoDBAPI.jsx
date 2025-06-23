// ★ package.json に "type": "module" を設定しておくと import/export が使えます
import { MongoClient, ServerApiVersion } from "mongodb";

export default class MongoDB {
  /** @type {MongoClient} */
  #client;

  constructor() {
    const uri = process.env.MONGODB_URL;
    if (!uri) throw new Error("環境変数 MONGODB_URL が設定されていません");

    this.#client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
  }

  /** MongoDB に 1 度だけ接続し、再利用する */
  async connect() {
    if (!this.#client.topology?.isConnected()) {
      await this.#client.connect();
    }
    return this.#client;
  }

  /** 接続確認用 (ping) */
  async checkConnection() {
    try {
      const client = await this.connect();
      await client.db("admin").command({ ping: 1 });
      console.log("✅ Connection OK – successfully connected to MongoDB");

      return true;
    } catch (err) {
      console.error("❌ Connection NG – cannot connect to MongoDB:", err);
      return false;
    }
  }

  /** コメント一覧を取得 */
  async getComments() {
    try {
      const client = await this.connect();
      const collection = client.db("Comments").collection("Comments");
      return await collection.find({}).toArray();
    } catch (err) {
      console.error("DB Error (getComments):", err);
      return [];
    }
  }

  /** コメントを追加 */
  async addComment(comment) {
    try {
      const client = await this.connect();
      const collection = client.db("Comments").collection("Comments");
      await collection.insertOne(comment);
      console.log("✅ Comment added");
      //後で追加
    } catch (err) {
      console.error("DB Error (addComment):", err);
    }
  }

  /** 明示的に切断したいとき用 */
  async close() {
    await this.#client.close();
  }
}
