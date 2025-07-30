import nodemailer from 'nodemailer';
import fs from 'fs';
import { fileURLToPath } from "url";
import path, { dirname } from 'path';
import { ResponseError } from '../error/response-error.js';

const sendMultiMail = (subject, email, errorMessage, tempFileName, contentReplace) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const template = fs.readFileSync(path.join(__dirname, `../email/${tempFileName}`), 'utf8');
  let content = template;

  for(const value of contentReplace) {
    content = content.replace(value.key, value.value);
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mail = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    html: content
  };

  transporter.sendMail(mail, (error, info) => {
    if (error) {
      throw new ResponseError(404, errorMessage);
    }
  });  
}

const sendMail = (subject, email, errorMessage, tempFileName, key, value) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const template = fs.readFileSync(path.join(__dirname, `../email/${tempFileName}`), 'utf8');
  const content = template.replace(key, value);

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mail = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    html: content
  };

  transporter.sendMail(mail, (error, info) => {
    if (error) {
      throw new ResponseError(404, errorMessage);
    }
  });  
}

export default {
  sendMultiMail,
  sendMail
}