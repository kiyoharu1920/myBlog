// ★ package.json に "type": "module" を設定しておくと import/export が使えます
import { MongoClient, ServerApiVersion } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * MongoDBにコメントを投稿するAPI
 * POSTリクエストでコメントデータを受け取り、データベースに保存
 */
export default async function testAPI(req, res) {
  // 環境変数からMongoDB接続URLを取得
  const uri = process.env.MONGODB_URL;
  if (!uri) throw new Error("環境変数 MONGODB_URL が設定されていません");

  // MongoDBクライアントの設定
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  /**
   * MongoDB に 1 度だけ接続し、再利用する
   * 既に接続済みの場合は既存の接続を返す
   */
  async function connect() {
    if (!client.topology?.isConnected()) {
      await client.connect();
    }
    return client;
  }

  /**
   * 接続確認用 (ping)
   * MongoDBへの接続が正常かどうかを確認
   */
  async function checkConnection() {
    try {
      const client = await connect();
      await client.db("admin").command({ ping: 1 });
      console.log("✅ Connection OK – successfully connected to MongoDB");

      return true;
    } catch (err) {
      console.error("❌ Connection NG – cannot connect to MongoDB:", err);
      return false;
    }
  }

  /**
   * コメント一覧を取得
   * Commentsコレクションから全てのコメントを取得
   */
  async function getComments() {
    try {
      const client = await connect();
      const collection = client.db("Comments").collection("Comments");
      return await collection.find({}).toArray();
    } catch (err) {
      console.error("DB Error (getComments):", err);
      return [];
    }
  }

  /**
   * コメントを追加する
   * リクエストボディからコメントデータを取得してデータベースに保存
   * @param {Object} req - Next.jsのリクエストオブジェクト
   */
  async function addComment(req) {
    console.log(req);
    console.log(req.body);
    const { userName, comment, time } = req.body
    console.log("addComment", userName, comment, time);
    try {
      const client = await connect();
      const collection = client.db("Comments").collection("Comments");
      await collection.insertOne({ userName, comment, time });

      console.log("✅ Comment added");
    } catch (err) {
      console.error("DB Error (addComment):", err);
    }
  }

  /**
   * 明示的に切断したいとき用
   * MongoDBクライアントの接続を閉じる
   */
  async function close() {
    await client.close();
  }

  // コメントを追加して成功レスポンスを返す
  await addComment(req);

  return res.status(200).json({ message: "成功しました" });
}
