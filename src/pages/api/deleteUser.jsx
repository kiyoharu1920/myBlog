import { Pool } from "pg";

// PostgreSQL接続プールの設定
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

/**
 * ユーザーを削除するAPI
 * DELETEリクエストでユーザーIDを受け取り、PostgreSQLから削除
 */
export default async (req, res) => {
  // DELETEメソッドのみ許可
  if (req.method === "DELETE") {
    const { id } = req.body;

    // ユーザーIDの必須チェック
    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    try {
      // データベース接続を取得
      const client = await pool.connect();
      
      // 指定されたIDのユーザーを削除して削除されたレコードを返す
      const result = await client.query(
        "DELETE FROM users WHERE id = $1 RETURNING *",
        [id]
      );
      
      // 接続を解放
      client.release();

      // 削除対象のユーザーが見つからない場合
      if (result.rowCount === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      // 成功レスポンスを返す
      return res.status(200).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    // DELETE以外のメソッドは許可しない
    return res.status(405).json({ error: "Method not allowed" });
  }
};
