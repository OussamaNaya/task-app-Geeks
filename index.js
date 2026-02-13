const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const taskRoutes = require("./routes/task.routes");
const userRoutes = require("./routes/user.routes");


const logger = require("./utils/logger");

const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/api/v1/task", taskRoutes);
app.use("/api/v1/user", userRoutes);

// UI Routes
app.get("/login", (req, res) => res.render("login"));
app.get("/register", (req, res) => res.render("register"));
app.get("/dashboard", (req, res) => res.render("dashboard"));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.server(PORT);
});