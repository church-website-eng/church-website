import nodemailer from "nodemailer";

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  return transporter;
}

export async function sendNotification(subject: string, html: string) {
  const adminEmail = process.env.ADMIN_EMAIL;
  const t = getTransporter();

  if (!t || !adminEmail) {
    console.warn("[Email] SMTP not configured — skipping notification:", subject);
    return;
  }

  try {
    await t.sendMail({
      from: process.env.SMTP_USER,
      to: adminEmail,
      subject,
      html,
    });
  } catch (err) {
    console.error("[Email] Failed to send:", err);
  }
}

export async function sendEmail(to: string, subject: string, html: string) {
  const t = getTransporter();

  if (!t) {
    console.warn("[Email] SMTP not configured — skipping email to:", to);
    return;
  }

  try {
    await t.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      html,
    });
  } catch (err) {
    console.error("[Email] Failed to send:", err);
  }
}
