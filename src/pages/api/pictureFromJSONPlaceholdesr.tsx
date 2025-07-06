import { NextApiRequest, NextApiResponse } from "next";

// JSONPlaceholder APIのベースURL
const API_URL = "https://jsonplaceholder.typicode.com/";

/**
 * JSONPlaceholderから写真データを取得するAPI
 * 外部APIから写真情報を取得してクライアントに返す
 * @param {NextApiRequest} req - Next.jsのリクエストオブジェクト
 * @param {NextApiResponse} res - Next.jsのレスポンスオブジェクト
 */
export default async function testJSONplaceholder(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // JSONPlaceholder APIから写真データを取得
  const json = await fetch(API_URL + "/photos");

  // 取得したデータをJSON形式でレスポンス
  return res.status(200).json(json);
}
