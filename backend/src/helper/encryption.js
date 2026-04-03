import crypto from "crypto";

const algorithm = "aes-256-cbc";
const secretKey = process.env.ENC_SECRET_KEY;
const iv = crypto.randomBytes(16);

export const encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
};

export const decrypt = (text) => {
  const [ivHex, encryptedText] = text.split(":");
  const iv = Buffer.from(ivHex, "hex");

  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(secretKey),
    iv,
  );

  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};
