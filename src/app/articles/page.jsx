import Link from "next/link";
import styles from "./page.module.css";

import articleObjects from "@/api/articleObjectsForImport";

async function getItems() {
  const res = await fetch("http://localhost:3000/api/articleObjectsForFetch");
  return res.json();
}

export default async function Articles(props) {
  const articlesFetch = await getItems();

  return (
    <div>
      <main>
        Fetchで取得
        {articlesFetch.map((article, i) => {
          return (
            <div key={i + article.title} className={styles.articles}>
              <Link href={`./articles/${i}`}>
                <div>
                  <h2>{article.title}</h2>
                </div>
                <div>{article.description}</div>
              </Link>
            </div>
          );
        })}

        Importで取得
        {articleObjects.map((article, i) => {
          return (
            <div key={i + article.title} className={styles.articles}>
              <Link href={`./articles/${i}`}>
                <div>
                  <h2>{article.title}</h2>
                </div>
                <div>{article.description}</div>
              </Link>
            </div>
          );
        })}
      </main>
    </div>
  );
}
