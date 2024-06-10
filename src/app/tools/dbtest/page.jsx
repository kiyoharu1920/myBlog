"use client";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/users");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setUsers(data.results);
    };

    fetchData();
  }, []);

  const clickHandler = useCallback(function () {
    console.log(users);
  });

  return (
    <div>
      <h1>Users</h1>
      <button onClick={clickHandler}>更新</button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
