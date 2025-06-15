import { MongoClient, ServerApiVersion } from "mongodb";

const uri = "mongodb+srv://kiyoharu1920:19205184@cluster0.57idiw5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function getUsers() {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    await client.connect();
    const db = client.db("Comments");
    const collection = db.collection("Comments");

    const users = await collection.find({}).toArray();
    return users;
  } catch (err) {
    console.error("DB Error:", err);
    return [];
  } finally {
    await client.close();
  }
}

export default async function MongoDBPage() {
  const users = await getUsers();

  return (
    <div>
      <h1>MongoDB テスト</h1>
      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ユーザー名</th>
            <th>コメント</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.userName ?? "No name"}</td>
              <td>{user.comment ?? ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
