const express = require("express");
const dotenv = require("dotenv");
const taskRoutes = require("./routes/task.routes");
const userRoutes = require("./routes/user.routes");
dotenv.config();


const logger = require("./utils/logger");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/api/v1/task", taskRoutes);
app.use("/api/v1/user", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.server(PORT);
});