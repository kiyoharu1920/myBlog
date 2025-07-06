"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import styles from "@/components/SendEMail/page.module.css";
import { useRef, useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

/**
 * メール送信フォームコンポーネント
 * Bootstrapを使用したメール送信機能
 */
export function SendEmail() {
  // フォーム要素への参照を作成
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  // 送信状態管理
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  /**
   * フォームのバリデーション
   * @returns {Object} バリデーション結果
   */
  const validateForm = () => {
    const name = nameRef.current?.value?.trim();
    const email = emailRef.current?.value?.trim();
    const message = messageRef.current?.value?.trim();

    // 必須項目チェック
    if (!name || !email || !message) {
      return { isValid: false, error: "名前、メールアドレス、本文は必須項目です" };
    }

    // 名前の長さチェック
    if (name.length < 1 || name.length > 50) {
      return { isValid: false, error: "名前は1文字以上50文字以下で入力してください" };
    }

    // メールアドレスの形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { isValid: false, error: "有効なメールアドレスを入力してください" };
    }

    // 本文の長さチェック
    if (message.length < 1 || message.length > 1000) {
      return { isValid: false, error: "本文は1文字以上1000文字以下で入力してください" };
    }

    return { isValid: true };
  };

  /**
   * フォームをクリアする
   */
  const clearForm = () => {
    if (nameRef.current) nameRef.current.value = "";
    if (emailRef.current) emailRef.current.value = "";
    if (messageRef.current) messageRef.current.value = "";
  };

  /**
   * フォーム送信時の処理
   * 入力データをAPIに送信してメールを送信
   */
  const handleSubmit = async (
    /** @type {React.FormEvent<HTMLFormElement>} */ e
  ) => {
    e.preventDefault();

    // 送信中フラグを設定
    setIsSubmitting(true);
    setSubmitMessage("");

    // バリデーション実行
    const validation = validateForm();
    if (!validation.isValid) {
      setSubmitMessage(validation.error);
      setIsSubmitting(false);
      return;
    }

    // フォームデータをオブジェクトにまとめる
    const data = {
      name: nameRef.current.value.trim(),
      email: emailRef.current.value.trim(),
      message: messageRef.current.value.trim(),
    };

    try {
      // メール送信APIを呼び出し
      const response = await fetch("api/nodemailer", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitMessage("メールを送信しました");
        clearForm(); // フォームをクリア
      } else {
        setSubmitMessage(result.error || "送信に失敗しました");
      }
    } catch (error) {
      console.error("送信エラー:", error);
      setSubmitMessage("送信に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* 送信結果メッセージ */}
      {submitMessage && (
        <div className={`alert ${submitMessage.includes("送信しました") ? "alert-success" : "alert-danger"}`}>
          {submitMessage}
        </div>
      )}

      {/* Bootstrapフォーム */}
      <Form onSubmit={(e) => handleSubmit(e)}>
        {/* メールアドレス入力欄 */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>返信先メールアドレス</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email" 
            ref={emailRef}
            disabled={isSubmitting}
            required
          />
        </Form.Group>

        {/* 名前入力欄 */}
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>名前（ユーザーネーム）</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="佐藤 太郎" 
            ref={nameRef}
            disabled={isSubmitting}
            required
          />
        </Form.Group>
        
        {/* メッセージ入力欄 */}
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>本文</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={3} 
            ref={messageRef}
            disabled={isSubmitting}
            required
          />
        </Form.Group>
        
        {/* 送信ボタン */}
        <Button 
          variant="primary" 
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "送信中..." : "送信"}
        </Button>
      </Form>

      {/* コメントアウトされたオリジナルフォーム（参考用） */}
      {/*       <form onSubmit={(e)=>handleSubmit(e)} className={styles.mailContainer}>
        <div>メール送信</div>
        <span>返信先メールアドレス</span>
        <input id="email" ref={emailRef} type="email" />
        <span>名前（ユーザーネーム）</span>
        <input id="name" ref={nameRef} type="text" />
        <span>本文</span>
        <textarea
          name=""
          id="message"
          ref={messageRef}
          cols="30"
          rows="10"
        ></textarea>
        <button type="submit">送信</button>
      </form>

       */}
    </div>
  );
}
