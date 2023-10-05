import articles from "@/api/articleObjects";

export default function ArticleDetail(props) {
  const id = props.params.id;
  return (
    <div>
      <main>
        <div>
          <h1>{articles[id].title}</h1>
        </div>
        <div>
          <div>{articles[id].bodyText}</div>
        </div>
      </main>
    </div>
  );
}
