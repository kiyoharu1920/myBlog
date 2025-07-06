"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

type CommentData = {
  _id: string;
  userName?: string;
  comment?: string;
  time?: string;
};

export default function MongoDB() {
  const [comments, setComments] = useState<CommentData[]>([]);

  useEffect(() => {
    fetch("/api/mongodb/getComment")
      .then((res) => res.json())
      .then((data: CommentData[]) => setComments(data))
      .catch(console.error);
  }, []);

  const [userName, setUserName] = useState("");
  const userNameInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const [userComment, setUserComment] = useState("");
  const userCommentInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserComment(e.target.value);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const clickPostHandler = async (e: React.MouseEvent<HTMLInputElement>) => {
    setIsSubmitting(true);
    e.preventDefault();
    const target = e.currentTarget;
    target.disabled = true;

    try {
      if (userName === "" || userComment === "") {
        alert("ユーザー名とコメントを入力してください。");
        throw new Error("ユーザー名とコメントを入力してください。");
      }
      if (userName.match(/<script/i) || userComment.match(/<script/i)) {
        alert("無効な文字列が含まれています。");
        throw new Error("無効な文字列が含まれています。");
      }
      if (userName.match(/[;]/i) || userComment.match(/[;]/i)) {
        alert("無効な文字列が含まれています。");
        throw new Error("無効な文字列が含まれています。");
      }

      const now = new Date().toISOString();
      await fetch("/api/mongodb/postComment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: userName,
          comment: userComment,
          time: now,
        }),
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const res = await fetch("/api/mongodb/getComment");
      const json = await res.json();
      setComments(json);
    } catch (error) {
      console.error(error);
    } finally {
      setUserName("");
      setUserComment("");
      target.disabled = false;
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>MongoDB テスト</h1>
      <div className={styles.formWrapper}>
        <input
          type="text"
          placeholder="名前"
          name="name"
          value={userName}
          className={styles.inputName}
          onChange={userNameInputHandler}
        />
        <input
          type="text"
          placeholder="コメント"
          name="comment"
          value={userComment}
          className={styles.inputComment}
          onChange={userCommentInputHandler}
        />
        <input
          type="submit"
          disabled={isSubmitting}
          value={isSubmitting ? "投稿中..." : "投稿"}
          className={styles.submitButton}
          onClick={clickPostHandler}
        />
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ユーザー名</th>
              <th>コメント</th>
              <th>投稿時間</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((data) => {
              let { _id, userName, comment, time } = data;
              const config: Intl.DateTimeFormatOptions = {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
                timeZone: "Asia/Tokyo",
              };
              time = time ? new Date(time).toLocaleString("ja-JP", config) : "";
              return (
                <tr key={_id}>
                  <td>{userName ?? "No name"}</td>
                  <td>{comment ?? ""}</td>
                  <td>{time ?? ""}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
