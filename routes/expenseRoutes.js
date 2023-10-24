const express = require("express");
const {
  postExpenseController,
  getExpenseController,
  deleteExpenseController,
} = require("../controllers/expenseControllers");
const { extractToken } = require("../middleware/extractToken");
const router = express.Router();

// router.use(extractToken);
router.get("/", extractToken, getExpenseController);
router.post("/", extractToken, postExpenseController);
router.delete("/:id", extractToken, deleteExpenseController);
module.exports = router;
