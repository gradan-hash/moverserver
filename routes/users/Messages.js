import express from "express";

import {
  createMessage,
  GetMessages,
  getProviderMessages,
  updateReplyMessage,
} from "../../controllers/users/Messages.js";

import { VerifyToken } from "../../middlewares/jwt.js";
const router = express.Router();

router.post("/postmessage", VerifyToken, createMessage);
router.get("/getmessage/:id", VerifyToken, GetMessages);
router.get("/providermesages/:id", VerifyToken, getProviderMessages);
router.post("/replymessage", VerifyToken, updateReplyMessage);

export default router;
