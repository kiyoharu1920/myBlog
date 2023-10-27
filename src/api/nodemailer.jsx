import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default function sendGmail(
  /** @type {NextApiRequest} */ req,
  /** @type {NextApiResponse} */ res
) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAILUSER,
      pass: process.env.GMAILPASSWORD,
    },
  });

  const toHostMailData = {
    from: req.body.email,
    to: "kiyoharu1920@gmail.com",
    subject: `${req.body.name}`,
    text: `${req.body.message} Send from ${req.body.email}`,
    html: `
  <p>name</p>
  <p>${req.body.email}</p>
  <p>subject</p>
  <p>${req.body.name}</p>
  <p>本文</p>
  <p>${req.body.message}</p>
  `,
  };

  transporter.sendMail(toHostMailData, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });

  return res.status(200);
}
