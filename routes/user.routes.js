const router = require("express").Router();
const { getAllUsers, registerUser, loginUser } = require("../controllers/user.contoller");

router.get("/", getAllUsers);
router.post("/", registerUser);
router.post("/login", loginUser);

module.exports = router;