"use client";

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
    <div className="container mt-5">
      <h1 className="text-center mb-4">MongoDB テスト</h1>
      <div
        className="d-flex flex-column gap-2 mb-4 align-items-center justify-content-center mx-auto"
        style={{ maxWidth: "300px" }}
      >
        <input
          type="text"
          placeholder="名前"
          value={userName}
          className="form-control w-75"
          onChange={userNameInputHandler}
        />
        <input
          type="text"
          placeholder="コメント"
          value={userComment}
          className="form-control w-100"
          onChange={userCommentInputHandler}
        />
        <input
          type="submit"
          disabled={isSubmitting}
          value={isSubmitting ? "投稿中..." : "投稿"}
          className="btn btn-primary w-50"
          onClick={clickPostHandler}
        />
      </div>

      <div className="table-responsive">
        <table className="table table-bordered text-center">
          <thead className="table-light">
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
