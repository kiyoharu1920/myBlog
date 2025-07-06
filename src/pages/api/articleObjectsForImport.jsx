/**
 * 記事データのサンプル配列
 * 記事のインポート用に使用されるダミーデータ
 * 各記事はid、title、description、bodyTextのプロパティを持つ
 */
const articleObjects = [
  {
    id: 1,
    title: "タイトル",
    description: "概要",
    bodyText: `
    本文です
    `,
  },
  {
    id: 2,
    title: "タイトル2",
    description: "概要2",
    bodyText: `
    本文です
    本文です
    本文です
    本文です
    本文です
    `,
  },
];

export default articleObjects;
