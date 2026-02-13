const router = require("express").Router();
const { getAllUsers, registerUser } = require("../controllers/user.contoller");

router.get("/", getAllUsers);
router.post("/", registerUser);

module.exports = router;