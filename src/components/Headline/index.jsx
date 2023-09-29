import Image from "next/image";
import styles from "./Headline.module.css";

const PAGES = [
  {
    title: "home",
    href: "/",
  },
  {
    title: "profile",
    href: "/profile",
  },
];

export function Headline() {
  return (
    <div>
      <div className={styles.navigation}>
        {PAGES.map((page) => {
          return <span>{page.title}</span>;
        })}
      </div>
    </div>
  );
}
