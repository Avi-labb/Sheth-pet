import nodemailer from "nodemailer";

let transporter = null;
let verified = false;
let verifyPromise = null;

function createTransporter() {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT, 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    console.warn("⚠️  [SMTP] Missing SMTP env vars (SMTP_HOST/PORT/USER/PASS) — email sending disabled.");
  }

  transporter = nodemailer.createTransport({
    host: host || "smtp.gmail.com",
    port: port || 587,
    secure: false,
    auth: {
      user: user || "",
      pass: pass || "",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  return transporter;
}

function verifyTransporter() {
  if (verified) return Promise.resolve(true);
  if (verifyPromise) return verifyPromise;

  const t = createTransporter();
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
    verified = false;
    return Promise.resolve(false);
  }

  verifyPromise = new Promise((resolve) => {
    t.verify((error, success) => {
      if (error) {
        console.warn("⚠️  [SMTP] Cannot connect to email server — outgoing emails will fail.");
        console.warn("   Details:", error.message || error.code || error);
        verified = false;
      } else {
        console.log("✅ [SMTP] Server is ready to send emails!");
        verified = true;
      }
      resolve(verified);
    });
  });

  return verifyPromise;
}

export function getTransporter() {
  return createTransporter();
}

export function isSmtpReady() {
  return verified;
}

export async function initSmtp() {
  return verifyTransporter();
}

const wrappedDefault = {
  sendMail: async (options) => {
    const t = createTransporter();
    await verifyTransporter().catch(() => {});
    return t.sendMail(options);
  },
  verify: verifyTransporter,
  getTransporter: createTransporter,
};

export default wrappedDefault;
