"use client"; // App Routerでクライアントコンポーネントとして明示

import styles from "./page.module.css"; // CSS Modulesのインポート
import { useEffect, useState } from "react";

/**
 * コメントデータの型定義
 * MongoDBから取得されるコメントの構造
 */
type CommentData = {
  _id: string;        // MongoDBのドキュメントID
  userName?: string;  // ユーザー名（オプション）
  comment?: string;   // コメント内容（オプション）
  time?: string;      // 投稿時間（オプション）
};

/**
 * MongoDBコメント投稿・表示コンポーネント
 * ユーザーがコメントを投稿し、既存のコメント一覧を表示する機能
 */
export default function MongoDB() {
  // 投稿済みコメント一覧のState
  const [comments, setComments] = useState<CommentData[]>([]);

  // 初回マウント時にコメント一覧を取得
  useEffect(() => {
    fetch("/api/mongodb/getComment")
      .then((res) => res.json())
      .then((data: CommentData[]) => setComments(data))
      .catch(console.error);
  }, []);

  // ユーザー名入力用Stateとハンドラ
  const [userName, setUserName] = useState("");
  const userNameInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  // コメント入力用Stateとハンドラ
  const [userComment, setUserComment] = useState("");
  const userCommentInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserComment(e.target.value);
  };

  // 投稿中かどうかのState（ボタン多重クリック防止）
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * 投稿ボタンクリック時の処理
   * 入力バリデーション → API呼び出し → コメント一覧更新
   */
  const clickPostHandler = async (e: React.MouseEvent<HTMLInputElement>) => {
    setIsSubmitting(true); // 投稿中フラグON
    e.preventDefault();
    const target = e.currentTarget;
    target.disabled = true; // 連続クリック防止

    try {
      // 入力バリデーション：必須項目チェック
      if (userName === "" || userComment === "") {
        alert("ユーザー名とコメントを入力してください。");
        throw new Error("ユーザー名とコメントを入力してください。");
      }
      
      // セキュリティチェック：XSS攻撃防止
      if (userName.match(/<script/i) || userComment.match(/<script/i)) {
        alert("無効な文字列が含まれています。");
        throw new Error("無効な文字列が含まれています。");
      }
      
      // セキュリティチェック：SQLインジェクション防止
      if (userName.match(/[;]/i) || userComment.match(/[;]/i)) {
        alert("無効な文字列が含まれています。");
        throw new Error("無効な文字列が含まれています。");
      }

      // 現在時刻をISO形式で取得
      const now = new Date().toISOString();

      // コメントをPOST APIで送信
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

      // POST後少し待機（UX調整用）
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 再度コメント一覧を取得してState更新
      const res = await fetch("/api/mongodb/getComment");
      const json = await res.json();
      setComments(json);
    } catch (error) {
      console.error(error);
    } finally {
      // 入力欄クリア & 投稿ボタン復帰
      setUserName("");
      setUserComment("");
      target.disabled = false;
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>MongoDB テスト</h1>
      
      {/* コメント投稿フォーム */}
      <div className={styles.formWrapper}>
        {/* 名前入力欄 */}
        <input
          type="text"
          placeholder="名前"
          name="name"
          value={userName}
          className={styles.inputName}
          onChange={userNameInputHandler}
        />

        {/* コメント入力欄 */}
        <input
          type="text"
          placeholder="コメント"
          name="comment"
          value={userComment}
          className={styles.inputComment}
          onChange={userCommentInputHandler}
        />

        {/* 投稿ボタン */}
        <input
          type="submit"
          disabled={isSubmitting}
          value={isSubmitting ? "投稿中..." : "投稿"}
          className={styles.submitButton}
          onClick={clickPostHandler}
        />
      </div>

      {/* コメント一覧表示テーブル */}
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
              
              // 日時フォーマット設定（日本時間）
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
              
              // ISO文字列を日本時間に変換
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
