const express = require("express");
const protect = require("../middlewares/authMiddleware");

const {
  createGrievance,
  getGrievances,
  getGrievanceById,
  updateGrievance,
  deleteGrievance,
  searchGrievances
} = require("../controllers/grievanceController");

const router = express.Router();

router.use(protect);

router.post("/", createGrievance);
router.get("/", getGrievances);
router.get("/search", searchGrievances);
router.get("/:id", getGrievanceById);
router.put("/:id", updateGrievance);
router.delete("/:id", deleteGrievance);

module.exports = router;