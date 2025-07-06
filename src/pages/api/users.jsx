// pages/api/users.js
import { Pool } from 'pg';

// PostgreSQL接続プールの設定
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

/**
 * ユーザー一覧を取得するAPI
 * PostgreSQLから全てのユーザーデータを取得して返す
 */
export default async (req, res) => {
  try {
    // データベース接続を取得
    const client = await pool.connect();
    
    // 全ユーザーを取得
    const result = await client.query('SELECT * FROM users');
    const results = { 'results': (result) ? result.rows : null };
    
    // 成功レスポンスを返す（正しいJSON形式）
    res.status(200).json(results);
    
    // 接続を解放
    client.release();
  } catch (err) {
    console.error(err);
    // エラーレスポンスを返す（JSON形式）
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
