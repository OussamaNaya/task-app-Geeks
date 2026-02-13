const chalk = require("chalk");
const emoji = require("node-emoji");

const logger = {
    info: (msg) => {
        console.log(chalk.blue(emoji.get("information_source") + " INFO: ") + msg);
    },
    success: (msg) => {
        console.log(chalk.green(emoji.get("white_check_mark") + " SUCCESS: ") + msg);
    },
    error: (msg) => {
        console.log(chalk.red(emoji.get("x") + " ERROR: ") + msg);
    },
    warning: (msg) => {
        console.log(chalk.yellow(emoji.get("warning") + " WARNING: ") + msg);
    },
    server: (port) => {
        console.log(chalk.magenta.bold(emoji.get("rocket") + " Server is blasting off on port ") + chalk.cyan.underline(port));
    }
};

module.exports = logger;
