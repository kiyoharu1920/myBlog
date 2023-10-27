"use client";

import styles from "@/components/SendEMail/page.module.css";
import { useRef } from "react";

export function SendEmail() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  const handleSubmit = async (
    /** @type {React.FormEvent<HTMLFormElement>} */ e
  ) => {
    e.preventDefault();
    console.log(nameRef.current?.value);

    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      message: messageRef.current.value,
    };
    
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
      }else{
        console.log("200 NG");
      }
    });
  };

  return (
    <div>
      <form onSubmit={(e)=>handleSubmit(e)} className={styles.mailContainer}>
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
    </div>
  );
}
