const fs = require("fs");
const path = require("path");

function readTasks(fileName) {
    try {
        const tasks = fs.readFileSync(path.join(__dirname, fileName), "utf-8");
        const parsedTasks = JSON.parse(tasks);
        return parsedTasks;
    } catch (error) {
        console.log(error);
        return [];
    }
}

function writeTask(fileName, task) {
    try {
        fs.writeFileSync(path.join(__dirname, fileName), JSON.stringify(task, null, 2));
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    readTasks,
    writeTask
};