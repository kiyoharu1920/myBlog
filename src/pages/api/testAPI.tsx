import { NextApiRequest, NextApiResponse } from "next";

/**
 * テスト用API
 * APIの動作確認用にシンプルなJSONレスポンスを返す
 * @param {NextApiRequest} req - Next.jsのリクエストオブジェクト
 * @param {NextApiResponse} res - Next.jsのレスポンスオブジェクト
 */
export default function testAPI(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // テスト用のJSONデータを返す
  return res.status(200).json({ name: "test" });
}
