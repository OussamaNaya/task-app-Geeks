const { readFileSync, writeFileSync } = require("../utils/fileDB.util");
const bcrypt = require("bcrypt");

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

module.exports = {
    getAllUsers,
    registerUser
}
