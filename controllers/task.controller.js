const { readFileSync, writeFileSync } = require("../utils/fileDB.util");

function getAllTasks(req, res) {
    try {
        const tasks = readFileSync("./tasks.json");
        res.status(200).send(tasks);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
}

function createTask(req, res) {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).send("Title and description are required");
        }
        const task = {
            id: Date.now(),
            title,
            description,
            status: "pending",
            createdAt: new Date()
        }

        const tasks = readFileSync("./tasks.json");
        tasks.push(task);

        writeFileSync("./tasks.json", tasks);
        res.status(201).send("Task created successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
}


module.exports = {
    getAllTasks,
    createTask
}