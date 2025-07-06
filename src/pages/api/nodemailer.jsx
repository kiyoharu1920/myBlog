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
    from: req.body.email,           // 送信者（フォーム入力）
    to: "kiyoharu1920@gmail.com",   // 受信者（固定）
    subject: `${req.body.name}`,    // 件名（フォーム入力の名前）
    text: `${req.body.message} Send from ${req.body.email}`, // プレーンテキスト
    html: `
  <p>name</p>
  <p>${req.body.email}</p>
  <p>subject</p>
  <p>${req.body.name}</p>
  <p>本文</p>
  <p>${req.body.message}</p>
  `, // HTML形式のメール本文
  };

  // メール送信実行
  transporter.sendMail(toHostMailData, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });

  return res.status(200);
}
