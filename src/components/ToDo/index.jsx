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
  const localStrageKey = "todoText"; /* localStrageに使うkey */
  const [todoList, setTodoList] = useState([]);

  const handleClickAdd = useCallback(() => {
    /* フォームに入力された文字がすでにリストにあるか、未入力の場合は処理しない */
    if (todoList.includes(text) || text === "") {
      return;
    }

    setTodoList((prevList) => {
      const array = [...prevList, text];
      localStorage.setItem(localStrageKey, JSON.stringify(array));
      return array;
    }); /* listに追加 */

    setText((_) => ""); /* inputのvalueを削除 */
  }, [todoList, text]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        e.preventDefault(); /* デフォルトのフォーム送信を防止 */

        handleClickAdd();
      }
    },
    [handleClickAdd]
  );

  const handleClickAllDelete = useCallback(() => {
    setTodoList(() => []);
    localStorage.removeItem(localStrageKey);
  }, []);
  useEffect(() => {
    const lsTodoText = localStorage.getItem(localStrageKey);
    setTodoList(() => JSON.parse(lsTodoText) || []);
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

  const handleClickCheck = useCallback(function (e) {
    const /** @type {number} */ index = e.target.name;
    const /** @type {HTMLElement */ element = e.target;
    const /** @type {Boolean} */ checked = e.target.checked;

    const span = document.querySelector(`span[name="${index}"]`);

    /* チェックがtrueなら取り消し線を追加 */
    span.style.textDecoration = checked ? "line-through" : "none";
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
