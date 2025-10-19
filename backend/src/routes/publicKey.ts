import express from "express";
import { getPublicKey } from "../utils/crypto";

const router = express.Router();

router.get("/", (req, res) => {
  res.setHeader("Content-Type", "application/x-pem-file");
  res.send(getPublicKey());
});

export default router;
