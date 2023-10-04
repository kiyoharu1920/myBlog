import Link from "next/link";
import styles from "./page.module.css";

const PAGES = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Profile",
    href: "/profile",
  },
  {
    title: "Articles",
    href: "/articles/2",
  },
];

export function Headline() {
  return (
    <div className={styles.center}>
      <div className={styles.headline}>
        {PAGES.map((page) => {
          return (
            <span className={styles.anchor}>
              <Link href={page.href} key={page.title}>
                {page.title}
              </Link>
            </span>
          );
        })}
      </div>
    </div>
  );
}
