import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

/**
 * Gmail送信API
 * フォームから送信されたメールデータをGmailで送信
 * @param {NextApiRequest} req - Next.jsのリクエストオブジェクト
 * @param {NextApiResponse} res - Next.jsのレスポンスオブジェクト
 */
export default function sendGmail(
  /** @type {NextApiRequest} */ req,
  /** @type {NextApiResponse} */ res
) {
  // POSTメソッドのみ許可
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  // バリデーション: 必須項目のチェック
  if (!name || !email || !message) {
    return res.status(400).json({ 
      error: "名前、メールアドレス、本文は必須項目です" 
    });
  }

  // バリデーション: 名前の長さチェック
  if (name.trim().length < 1 || name.trim().length > 50) {
    return res.status(400).json({ 
      error: "名前は1文字以上50文字以下で入力してください" 
    });
  }

  // バリデーション: メールアドレスの形式チェック
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      error: "有効なメールアドレスを入力してください" 
    });
  }

  // バリデーション: 本文の長さチェック
  if (message.trim().length < 1 || message.trim().length > 1000) {
    return res.status(400).json({ 
      error: "本文は1文字以上1000文字以下で入力してください" 
    });
  }

  // Gmail SMTP設定
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAILUSER,
      pass: process.env.GMAILPASSWORD,
    },
  });

  // 送信するメールデータの設定
  const toHostMailData = {
    from: email,                     // 送信者（フォーム入力）
    to: "kiyoharu1920@gmail.com",   // 受信者（固定）
    subject: `${name}`,             // 件名（フォーム入力の名前）
    text: `${message} Send from ${email}`, // プレーンテキスト
    html: `
  <p>name</p>
  <p>${email}</p>
  <p>subject</p>
  <p>${name}</p>
  <p>本文</p>
  <p>${message}</p>
  `, // HTML形式のメール本文
  };

  // メール送信実行
  transporter.sendMail(toHostMailData, function (err, info) {
    if (err) {
      console.error("メール送信エラー:", err);
      return res.status(500).json({ error: "メール送信に失敗しました" });
    } else {
      console.log("メール送信成功:", info);
      return res.status(200).json({ message: "メールを送信しました" });
    }
  });
}
