const { writeFile, readFile } = require("fs").promises;

async function writer() {
    try {
        await writeFile("temp.txt", "Here is line 1\n");
        await writeFile("temp.txt", "Here is line 2\n", { flag: "a" });
        await writeFile("temp.txt", "Here is line 3\n", { flag: "a" });
        console.log("All lines written to temp.txt successfully.");
    } catch (error) {
        console.error("Error writing to file:", error);
    }
}

writer();
