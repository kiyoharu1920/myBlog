// ★ package.json に "type": "module" を設定しておくと import/export が使えます
import { MongoClient, ServerApiVersion } from "mongodb";

/**
 * MongoDB操作を管理するクラス
 * コメントの取得・追加などのデータベース操作を提供
 */
export default class MongoDB {
  /** @type {MongoClient} */
  #client;

  /**
   * MongoDBクラスのコンストラクタ
   * 環境変数から接続URLを取得してクライアントを初期化
   */
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

  /**
   * MongoDB に 1 度だけ接続し、再利用する
   * 既に接続済みの場合は既存の接続を返す
   */
  async connect() {
    if (!this.#client.topology?.isConnected()) {
      await this.#client.connect();
    }
    return this.#client;
  }

  /**
   * 接続確認用 (ping)
   * MongoDBへの接続が正常かどうかを確認
   */
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

  /**
   * コメント一覧を取得
   * Commentsコレクションから全てのコメントを取得
   */
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

  /**
   * コメントを追加
   * Commentsコレクションに新しいコメントを挿入
   * @param {Object} comment - 追加するコメントオブジェクト
   */
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

  /**
   * 明示的に切断したいとき用
   * MongoDBクライアントの接続を閉じる
   */
  async close() {
    await this.#client.close();
  }
}
