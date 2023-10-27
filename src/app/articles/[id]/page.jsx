import articles from "@/pages/api/articleObjectsForImport";

export default function ArticleDetail(props) {
  const id = props.params.id;
  return (
    <div>
      <main>
          <h1>{articles[id].title}</h1>
        <div>
          <pre>{articles[id].bodyText}</pre>
        </div>
      </main>
    </div>
  );
}
