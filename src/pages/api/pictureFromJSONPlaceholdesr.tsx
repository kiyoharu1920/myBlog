import { NextApiRequest, NextApiResponse } from "next";

const API_URL = "https://jsonplaceholder.typicode.com/";

export default async function testJSONplaceholder(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const json = await fetch(API_URL + "/photos");

  return res.status(200).json(json);
}
