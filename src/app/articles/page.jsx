import Link from "next/link";
import styles from "./page.module.css";

import articleObjects from "@/pages/api/articleObjectsForImport";


export default async function Articles(props) {

  return (
    <div>
      <main>
        <span>Importで取得</span>
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
        }).reverse()}
      </main>
    </div>
  );
}
