export async function verifySignature(
  data: string,
  signature: string,
  publicKeyPem: string
): Promise<boolean> {
  try {
    const pemContents = publicKeyPem
      .replace(/-----BEGIN PUBLIC KEY-----/, "")
      .replace(/-----END PUBLIC KEY-----/, "")
      .replace(/\s/g, "");

    const binaryDer = Uint8Array.from(atob(pemContents), (c) =>
      c.charCodeAt(0)
    );

    const key = await crypto.subtle.importKey(
      "spki",
      binaryDer.buffer,
      { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-384" } },
      false,
      ["verify"]
    );

    const encoder = new TextEncoder();
    return await crypto.subtle.verify(
      "RSASSA-PKCS1-v1_5",
      key,
      Uint8Array.from(atob(signature), (c) => c.charCodeAt(0)),
      encoder.encode(data)
    );
  } catch (error) {
    console.error("Signature verification failed:", error);
    return false;
  }
}
