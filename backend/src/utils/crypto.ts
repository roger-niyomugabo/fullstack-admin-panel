import crypto from "crypto";
import fs from "fs";
import path from "path";

const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: { type: "spki", format: "pem" },
  privateKeyEncoding: { type: "pkcs8", format: "pem" },
});

fs.writeFileSync(path.join(process.cwd(), "public.pem"), publicKey);

export function hashEmail(email: string): string {
  return crypto
    .createHash("sha384")
    .update(email.trim().toLowerCase())
    .digest("hex");
}

export function signData(email: string): {
  emailHash: string;
  signature: string;
} {
  const emailHash = hashEmail(email);
  const signer = crypto.createSign("SHA384");
  signer.update(emailHash);
  signer.end();
  const signature = signer.sign(privateKey, "base64");
  return { emailHash, signature };
}

export function getPublicKey(): string {
  return publicKey;
}
