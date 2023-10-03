export function GetArticles() {
  const a = 3;
  const articles = fetch(`http://localhost:3000/api/articles.json`).then((res) => {
    console.log(res.ok);
    return res.json();
  });
  
  return (
    <div>
      {a}
      <div>記事です</div>
      <div>記事です</div>
      <div>記事です</div>
    </div>
  );
}
