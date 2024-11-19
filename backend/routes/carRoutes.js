const express = require("express");
const { createCar, getUserCars, searchCars, getCarDetails, updateCar, deleteCar, getAllCars, searchUserCars } = require("../controllers/carController");
const authenticate = require("../middlewares/authMiddleware");
const { verifyOwnership } = require("../middlewares/verifyOwnership");
const upload = require("../middlewares/multer"); 

const router = express.Router();

router.get("/all",authenticate, getAllCars);
router.get("/search", authenticate, searchCars);
router.get("/user/search", authenticate, searchUserCars);
router.get("/:id",authenticate, getCarDetails);
router.get("/user/:id", authenticate, getUserCars);
router.post("/", authenticate, upload.array("images", 10), createCar);
router.put("/:id", authenticate,  upload.array("images", 10), verifyOwnership, updateCar);
router.delete("/:id", authenticate, verifyOwnership, deleteCar);

module.exports = router;
