import { useCallback, useState } from "react";

import styles from "./page.module.css";

export function ToDo() {
  /* input */
  const [text, setText] = useState("");
  const handleChange = useCallback(
    function (e) {
      setText(e.target.value);
    },
    [text]
  );

  /* button */
  const [todoList, setTodoList] = useState([]);
  const handleClick = useCallback(
    function () {
      if (todoList.includes(text) || text === "") {
        return;
      }
      setTodoList((list) => [...list, text]); /* listに追加 */
      setText((_) => ""); /* inputのvalueを削除 */
    },
    [todoList, text]
  );

  return (
    <div className={styles.container}>
      ToDoリスト
      <input type="text" onChange={handleChange} value={text} />
      <button onClick={handleClick}>追加</button>
      <ul>
        {todoList.map((todo) => {
          return <li key={todo} className={styles.pointNone}><input type="checkbox" />{todo}</li>;
        })}
      </ul>
    </div>
  );
}
