import Image from "next/image";
import styles from "./page.module.css";

const ARTICLES = [
  {
    id: 1,
    title: "自己紹介",
    description: "はじめの挨拶",
  },
];

export function Articles() {
  return (
    <div>
      {ARTICLES.map((element) => {
        return (
          <div>
            <a href="">
              <div>{element.title}</div>
              <div>{element.description}</div>{" "}
            </a>
          </div>
        );
      })}
    </div>
  );
}
