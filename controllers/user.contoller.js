const { readFileSync, writeFileSync } = require("../utils/fileDB.util");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function getAllUsers(req, res) {
    try {
        const users = readFileSync("./users.json");
        res.status(200).send(users);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
}

async function registerUser(req, res) {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).send("Username, email and password are required");
        }
        const user = {
            id: Date.now(),
            username,
            email,
            password: await bcrypt.hash(password, 10)
        }

        const users = readFileSync("./users.json");
        if (users.find(u => u.email === user.email)) {
            return res.status(400).send("User already exists");
        }
        users.push(user);

        writeFileSync("./users.json", users);
        res.status(201).send("User registered successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
}

function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send("Email and password are required");
        }
        const users = readFileSync("./users.json");
        const user = users.find(u => u.email === email);
        if (!user) {
            return res.status(404).send("User not found");
        }
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send("Invalid password");
        }
        const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).send({ token });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
}

module.exports = {
    getAllUsers,
    registerUser,
    loginUser
}
