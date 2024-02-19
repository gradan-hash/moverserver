import express from "express";

import {
  createMessage,
  GetMessages,
} from "../../controllers/users/Messages.js";

import { VerifyToken } from "../../middlewares/jwt.js";
const router = express.Router();

router.post("/postmessage", VerifyToken, createMessage);
router.get("/getmessage/:id", VerifyToken, GetMessages);

export default router;
