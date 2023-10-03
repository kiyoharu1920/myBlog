import Link from "next/link";

const PAGES = [
  {
    title: "home",
    href: "/",
  },
  {
    title: "profile",
    href: "/profile",
  },
  {
    title: "articles",
    href: "/articles/1",
  },
];

export function Headline() {
  return (
    <div>
      <div>
        {PAGES.map((page) => {
          return (
            <Link href={page.href} key={page.title}>
              {page.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
