import { Pool } from "pg";

// PostgreSQL接続プールの設定
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

/**
 * ユーザーを追加するAPI
 * POSTリクエストでユーザー名を受け取り、PostgreSQLに保存
 */
export default async (req, res) => {
  // POSTメソッドのみ許可
  if (req.method === "POST") {
    const { name } = req.body;

    // ユーザー名の必須チェック
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    try {
      // データベース接続を取得
      const client = await pool.connect();
      
      // ユーザーを追加して追加されたレコードを返す
      const result = await client.query(
        "INSERT INTO users (name) VALUES ($1) RETURNING *",
        [name]
      );
      
      // 接続を解放
      client.release();
      
      // 成功レスポンスを返す
      return res.status(200).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    // POST以外のメソッドは許可しない
    return res.status(405).json({ error: "Method not allowed" });
  }
};
