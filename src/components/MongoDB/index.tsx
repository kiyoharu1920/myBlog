"use client";

import { use, useEffect, useState } from "react";

// コメント型定義
type CommentData = {
  _id: string;
  userName?: string;
  comment?: string;
  time?: string; // ISO形式の日付が文字列で入ってくる想定
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
    console.log(userName);
  };

  const [userComment, setUserComment] = useState("");
  const userCommentInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserComment(e.target.value);
    console.log(userComment);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const clickPostHandler = async (e: React.MouseEvent<HTMLInputElement>) => {
    // ボタンを押したらローディングアイコンを表示
    setIsSubmitting(true);
    // フォームの送信をキャンセル
    e.preventDefault();
    // 連続してクリックさせないようにする
    const target = e.currentTarget;
    target.disabled = true;

    try {
      // バリデーション
      if (userName === "" || userComment === "") {
        alert("ユーザー名とコメントを入力してください。");
        throw new Error("ユーザー名とコメントを入力してください。");
      }
      // HTMLインジェンクション対策
      if (userName.match(/<script/i) || userComment.match(/<script/i)) {
        alert("無効な文字列が含まれています。");
        throw new Error("無効な文字列が含まれています。");
      }
      // SQLインジェクション対策
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
      console.log({ json });
      console.log({ comments });
    } catch (error) {
      console.error(error);
    } finally {
      // フォームの値をクリア
      setUserName("");
      setUserComment("");

      // ボタンを再度有効にする
      target.disabled = false;
      // ローディングアイコンを非表示
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-center">MongoDB テスト</h1>
      <div className="flex flex-col gap-2 mb-6 items-center justify-center max-w-xs mx-auto w-full">
        <input
          type="text"
          placeholder="名前"
          value={userName}
          className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-32"
          onChange={userNameInputHandler}
        />
        <input
          type="text"
          placeholder="コメント"
          value={userComment}
          className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-48"
          onChange={userCommentInputHandler}
        />
        <input
          type="submit"
          disabled={isSubmitting}
          value={isSubmitting ? "投稿中..." : "投稿"}
          className="bg-blue-500 text-black rounded px-2 py-1 font-semibold text-sm hover:bg-blue-600 transition cursor-pointer w-20"
          onClick={clickPostHandler}
        />
      </div>

      <table
        border={1}
        cellPadding="8"
        style={{ borderCollapse: "collapse" }}
        className="w-auto mx-auto text-center border border-gray-300"
      >
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
              year: "numeric" as const,
              month: "2-digit" as const,
              day: "2-digit" as const,
              hour: "2-digit" as const,
              minute: "2-digit" as const,
              second: "2-digit" as const,
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
  );
}
