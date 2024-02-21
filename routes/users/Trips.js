import express from "express";

import { VerifyToken } from "../../middlewares/jwt.js";
import {
  completeTrip,
  createTrip,
  getAllTrips,
  singleTrip,
} from "../../controllers/users/Trips.js";
const router = express.Router();

router.post("/posttrip", VerifyToken, createTrip);
router.get("/singleTrip/:id", VerifyToken, singleTrip);

router.get("/getAllTrips", VerifyToken, getAllTrips);
router.post("/completeTrip", VerifyToken, completeTrip);

export default router;
