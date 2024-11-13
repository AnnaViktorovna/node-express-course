const { writeFile, readFile } = require("fs").promises;

function writer() {
    return writeFile("./temp.txt", "Here is line 1\n")
        .then(() => writeFile("./temp.txt", "Here is line 2\n", { flag: "a" }))
        .then(() => writeFile("./temp.txt", "Here is line 3\n", { flag: "a" }))
        .then(() => console.log("All lines written to temp.txt successfully."))

        .catch((error) => {
            console.error("Error writing to file:", error);
        });
}

writer();

function reader() {
    return readFile("temp.txt", "utf8")
        .then((data) => console.log("Content", data))

        .catch((error) => {
            console.error("Error reading to file:", error);
        });
}

reader();
