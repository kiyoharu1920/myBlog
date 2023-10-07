"use client";

import { useCallback, useEffect, useState } from "react";

import styles from "./page.module.css";

function useToDo() {
  /* input */
  const [text, setText] = useState("");
  const handleChange = useCallback(function (e) {
    setText(e.target.value);
  }, []);

  /* button */
  const localStrageKey = "todoText";
  const [todoList, setTodoList] = useState([]);

  const addTodoList = function () {
    if (todoList.includes(text) || text === "") {
      return;
    }
    setTodoList((list) => [...list, text]); /* listに追加 */
    setText((_) => ""); /* inputのvalueを削除 */
    localStorage.setItem(localStrageKey, JSON.stringify(todoList));
  };

  const handleClickAdd = useCallback(addTodoList, [todoList, text]);
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        e.preventDefault(); /* デフォルトのフォーム送信を防止 */
        addTodoList();
      }
    },
    [todoList, text]
  );

  const handleClickAllDelete = useCallback(() => {
    setTodoList(() => []);
    localStorage.removeItem(localStrageKey);
  }, []);
  useEffect(() => {
    const lsTodoText = localStorage.getItem(localStrageKey);
    setTodoList(() => JSON.parse(lsTodoText) || []);
  }, []);

  const handleClickCheck = useCallback(function (e) {
    const /** @type {number} */ index = e.target.name;
    const /** @type {HTMLElement */ element = e.target;
    const /** @type {Boolean} */ checked = e.target.checked;

    const span = document.querySelector(`span[name="${index}"]`);

    span.style.textDecoration = checked ? "line-through" : "none";
  }, []);

  const handleClickDelete = useCallback(function (/** @type {Event} */ e) {
    const index = e.target.name;

    setTodoList((prev) => {
      const cloneArray = structuredClone(prev);
      cloneArray.splice(index, 1);

      localStorage.setItem(localStrageKey, JSON.stringify(cloneArray));
      return cloneArray;
    });
  }, []);

  return {
    text,
    handleChange,
    todoList,
    handleKeyDown,
    handleClickAdd,
    handleClickCheck,
    handleClickAllDelete,
    handleClickDelete,
  };
}

export function ToDo() {
  const {
    text,
    handleChange,
    todoList,
    handleKeyDown,
    handleClickAdd,
    handleClickCheck,
    handleClickAllDelete,
    handleClickDelete,
  } = useToDo();

  return (
    <div className={styles.container}>
      <div className={styles.title}>ToDoリスト</div>
      <div className={styles.forms}>
        <input
          type="text"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={text}
        />
        <button onClick={handleClickAdd}>追加</button>
        <button onClick={handleClickAllDelete}>すべて削除</button>
      </div>
      <div className={styles.todolist}>
        <table className={styles.table}>
          <tbody>
            {todoList.map((todoText, index) => {
              return (
                <tr key={todoText} className={styles.pointNone}>
                  <td>
                    <input
                      type="checkbox"
                      name={index}
                      onClick={handleClickCheck}
                    />
                  </td>
                  <td>
                    <span className={styles.text} name={index}>
                      {todoText}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={handleClickDelete}
                      className={styles.crossButton}
                      name={index}
                    >
                      ☓
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
