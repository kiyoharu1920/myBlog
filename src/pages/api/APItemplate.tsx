import { NextApiRequest, NextApiResponse } from "next";

export default function testJSONplaceholder(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return res.status(200).json({ name: "test" });
}
