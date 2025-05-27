import fs from "fs";
import { marked } from "marked";
import mustache from "mustache";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import * as path from 'path';
import { getUserInfobyid } from "./user";
import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";

dotenv.config();

const saltround: number = Number(process.env.SALTROUNDS ?? 10);

const codes: { [id: number]: string } = {};

let markdownTemplate: string;
try {
  markdownTemplate = fs.readFileSync(path.join(__dirname, "codeform.md"), "utf8");
} catch (error) {
  console.error("Failed to load codeform.md template:", error);
  markdownTemplate = ""; // Or set a default template, or throw error based on your needs
}

async function generateEmail(data: any): Promise<string> {
  const populatedMarkdown = mustache.render(markdownTemplate, data);
  return await marked(populatedMarkdown);
}

async function sendEmail(to: string, subject: string, data: any) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false // Allow self-signed certificates
      }
    });

    const emailHtml = await generateEmail(data);

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html: emailHtml,
    });

    console.log("✅ Email verzonden:", info.response);
  } catch (error) {
    console.error("❌ Fout bij verzenden:", error);
  }
}

export async function checkIfUserHas2FFAcode(id: number, trycode: string) {
  if (!codes[id]) {
    await generate2FFA(id);
    return false; // New code was generated, so the attempted code is invalid
  }

  if (codes[id] === trycode) {
    delete codes[id]; // Clear the code after successful use
    return true;
  }

  return false;
}

function generateRandomString(i: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let j = 0; j < i; j++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }
  return result;
}

async function generate2FFA(id: number) {
  const userdetails = await getUserInfobyid(id);
  if (!userdetails || userdetails == null) {
    throw new Error('User not found');
  }

  const generatedcode: string = generateRandomString(5);
  codes[id] = generatedcode;

  await sendEmail(
    userdetails.mail,
    '2FA Code',
    {
      username: userdetails.name,
      code: generatedcode
    }
  )
};

export function checkJwt(req: Request, res: Response, next: NextFunction) {
    const token: string | undefined = req.cookies?.jwt;
    if (!token) {
        return res.redirect("/login");
    }
    
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET!) as { id: number; name: string };
        res.locals.user = user;
        next();
    } catch (err) {
        console.log("Invalid token:", err);
        return res.redirect("/login");
    }
}