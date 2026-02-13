const express = require("express");
const router = express.Router();
const { getAllTasks, createTask } = require("../controllers/task.controller");
const authMiddleware = require("../middleware/auth.middleware");


router.get("/", getAllTasks);
router.post("/", authMiddleware, createTask);

module.exports = router;