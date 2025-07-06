"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import styles from "@/components/SendEMail/page.module.css";
import { useRef } from "react";

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

  /**
   * フォーム送信時の処理
   * 入力データをAPIに送信してメールを送信
   */
  const handleSubmit = async (
    /** @type {React.FormEvent<HTMLFormElement>} */ e
  ) => {
    e.preventDefault();
    console.log(nameRef.current?.value);

    // フォームデータをオブジェクトにまとめる
    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      message: messageRef.current.value,
    };

    // メール送信APIを呼び出し
    await fetch("api/nodemailer", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status === 200) {
        console.log("200 OK");
      } else {
        console.log("200 NG");
      }
    });
  };

  return (
    <div>
      {/* Bootstrapフォーム */}
      <Form onSubmit={(e) => handleSubmit(e)}>
        {/* メールアドレス入力欄 */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>返信先メールアドレス</Form.Label>
          <Form.Control type="email" placeholder="Enter email" ref={emailRef} />
        </Form.Group>

        {/* 名前入力欄 */}
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>名前（ユーザーネーム）</Form.Label>
          <Form.Control type="text" placeholder="佐藤 太郎" ref={nameRef} />
        </Form.Group>
        
        {/* メッセージ入力欄 */}
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>本文</Form.Label>
          <Form.Control as="textarea" rows={3} ref={messageRef} />
        </Form.Group>
        
        {/* 送信ボタン */}
        <Button variant="primary" type="submit">
          送信
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
