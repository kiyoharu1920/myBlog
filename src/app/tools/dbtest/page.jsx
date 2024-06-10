"use client";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [nameForAdd, setNameForAdd] = useState("");

  const [idForDelete, setIdForDelete] = useState("");

  const updateUser = () => {
    const fetchData = async () => {
      const res = await fetch("/api/users");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setUsers(data.results);
    };

    fetchData();
  };

  useEffect(updateUser, []);

  const addUser = async (name) => {
    const response = await fetch("/api/addUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      throw new Error("Failed to add user");
    }

    const user = await response.json();
    return user;
  };

  const deleteUser = async (id) => {
    const response = await fetch("/api/deleteUser", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error("Failed to delete user");
    }

    const user = await response.json();
    return user;
  };

  const clickAddHandler = useCallback(function () {
    addUser(nameForAdd);
    updateUser();
  });

  const clickDeleteHandler = useCallback(function () {
    deleteUser(idForDelete);
    updateUser();
  });

  return (
    <div>
      <h1>Users</h1>
      <div>
        <div>
          <input
            type="text"
            placeholder="name"
            id="name_for_addUser"
            onChange={() => {
              setNameForAdd(document.querySelector(`#name_for_addUser`).value);
            }}
          />
          <button onClick={clickAddHandler}>追加</button>
        </div>
        <div>
          <input
            type="text"
            placeholder="id"
            id="id_for_deleteUser"
            onChange={() => {
              setIdForDelete(
                document.querySelector(`#id_for_deleteUser`).value
              );
            }}
          />
          <button onClick={clickDeleteHandler}>削除</button>
        </div>
      </div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.id} {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
