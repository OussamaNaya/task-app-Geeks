const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/task.routes");
const userRoutes = require("./routes/user.routes");


const logger = require("./utils/logger");

const app = express();
app.use(cors());
app.use(express.json());
// app.use(express.static("public")); // API only now

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/api/v1/task", taskRoutes);
app.use("/api/v1/user", userRoutes);

// UI Routes - Moved to React Frontend
// app.get("/login", (req, res) => res.render("login"));
// app.get("/register", (req, res) => res.render("register"));
// app.get("/dashboard", (req, res) => res.render("dashboard"));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.server(PORT);
});