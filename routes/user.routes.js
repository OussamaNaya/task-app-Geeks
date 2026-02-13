const router = require("express").Router();
const { getAllUsers, registerUser, loginUser, getUserById } = require("../controllers/user.contoller");

router.get("/", getAllUsers);
router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/:id", getUserById);

module.exports = router;