"use client";

import { useCallback, useEffect, useState } from "react";

import styles from "./page.module.css";

/**
 * ToDoリスト機能を提供するカスタムフック
 * ローカルストレージを使用してToDoデータを永続化
 */
function useToDo() {
  /* 入力フィールドの状態管理 */
  const [text, setText] = useState("");
  const handleChange = useCallback(function (e) {
    setText(e.target.value);
  }, []);

  /* ToDoリストの状態管理 */
  const localStrageKey = "todoText"; /* localStrageに使うkey */
  const [todoList, setTodoList] = useState([]);

  /**
   * ToDoアイテムを追加する処理
   * 重複チェックとローカルストレージへの保存を行う
   */
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

  /**
   * Enterキー押下時の処理
   * フォーム送信を防止してToDo追加を実行
   */
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        e.preventDefault(); /* デフォルトのフォーム送信を防止 */

        handleClickAdd();
      }
    },
    [handleClickAdd]
  );

  /**
   * すべてのToDoを削除する処理
   * ローカルストレージからも削除
   */
  const handleClickAllDelete = useCallback(() => {
    setTodoList(() => []);
    localStorage.removeItem(localStrageKey);
  }, []);

  /**
   * コンポーネントマウント時にローカルストレージからToDoリストを復元
   */
  useEffect(() => {
    const lsTodoText = localStorage.getItem(localStrageKey);
    setTodoList(() => JSON.parse(lsTodoText) || []);
  }, []);

  /**
   * 特定のToDoアイテムを削除する処理
   * @param {Event} e - クリックイベント
   */
  const handleClickDelete = useCallback(function (/** @type {Event} */ e) {
    const index = e.target.name;

    setTodoList((prev) => {
      const cloneArray = structuredClone(prev);
      cloneArray.splice(index, 1);

      localStorage.setItem(localStrageKey, JSON.stringify(cloneArray));
      return cloneArray;
    });
  }, []);

  /**
   * ToDoアイテムのチェック状態を切り替える処理
   * チェック時は取り消し線を表示
   * @param {Event} e - チェックボックスクリックイベント
   */
  const handleClickCheck = useCallback(function (e) {
    const /** @type {number} */ index = e.target.name;
    const /** @type {HTMLElement} */ element = e.target;
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

/**
 * ToDoリストコンポーネント
 * ローカルストレージを使用したToDo管理機能
 */
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
      {/* ToDoリストのタイトル */}
      <div className={styles.title}>ToDoリスト</div>
      
      {/* 入力フォームと操作ボタン */}
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
      
      {/* ToDoリストの表示テーブル */}
      <div className={styles.todolist}>
        <table className={styles.table}>
          <tbody>
            {todoList.map((todoText, index) => {
              return (
                <tr key={todoText} className={styles.pointNone}>
                  {/* チェックボックス */}
                  <td>
                    <input
                      type="checkbox"
                      name={index}
                      onClick={handleClickCheck}
                    />
                  </td>
                  {/* ToDoテキスト */}
                  <td>
                    <span className={styles.text} name={index}>
                      {todoText}
                    </span>
                  </td>
                  {/* 削除ボタン */}
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
