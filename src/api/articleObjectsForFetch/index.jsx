import { NextApiRequest, NextApiResponse } from "next";

/**
 * @type {Object[]}
 */
const articleObjects = [
  {
    id: 1,
    title: "最初の記事",
    description: "最初",
    bodyText: "本文です",
  },
  {
    id: 2,
    title: "自己紹介",
    description: "挨拶",
    bodyText: "本文です",
  },
];

/**
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default async function articleObjectsForFetch(req, res) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  res.status(200).json(articleObjects);
}
