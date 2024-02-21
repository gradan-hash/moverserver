import express from "express";

import { VerifyToken } from "../../middlewares/jwt.js";
import {
  UpdatependingTrip,
  completeTrip,
  createTrip,
  getAllCompletedTrips,
  getAllPendingTrips,
  getAllTrips,
  getUnconfirmedTrips,
  singleTrip,
} from "../../controllers/users/Trips.js";
const router = express.Router();

router.post("/posttrip", VerifyToken, createTrip);
router.get("/singleTrip/:id", VerifyToken, singleTrip);

router.get("/getAllTrips", VerifyToken, getAllTrips);
router.post("/completeTrip", VerifyToken, completeTrip);
router.get("/getAllCompletedTrips", VerifyToken, getAllCompletedTrips);

router.get("/getAllPendingTrips", VerifyToken, getAllPendingTrips);
router.post("/updatependingTrip", VerifyToken, UpdatependingTrip);
router.get("/getUnconfirmedTrips", VerifyToken, getUnconfirmedTrips);
export default router;
