import Link from "next/link";
import styles from "./page.module.css"

import articleObjects from "@/api/articleObjects";

export default function Articles(props) {
  return (
    <div>
      <main>
        {articleObjects.map((article, i) => {
          return (
            <div key={i + article.title} className={styles.articles}>
              <Link href={`./articles/${i}`}>
                <div><h2>{article.title}</h2></div>
                <div>{article.description}</div>
              </Link>
            </div>
          );
        })}
      </main>
    </div>
  );
}
