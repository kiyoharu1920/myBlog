import Link from "next/link";
import styles from "./page.module.css";

const PAGES = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Articles",
    href: "/articles",
  },
  {
    title: "Tools",
    href: "/tools",
  },
  {
    title: "Profile",
    href: "/profile",
  },
];

export function Headline() {
  return (
    <div className={styles.center}>
      <div className={styles.headline}>
        {PAGES.map((page) => {
          return (
            <span className={styles.anchor} key={page.title}>
              <Link href={page.href} >
                {page.title}
              </Link>
            </span>
          );
        })}
      </div>
    </div>
  );
}
