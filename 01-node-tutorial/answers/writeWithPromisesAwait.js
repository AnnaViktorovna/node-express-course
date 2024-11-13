const { writeFile, readFile } = require("fs").promises;
const filepath = "./temp.txt"


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

async function reader() {
    try {
        const data = await readFile('temp.txt', 'utf8')
        console.log('Content', data)
    } catch(error) {
        console.error("Error reading to file:", error)
    }
}

async function readWrite() {
    await writer();
    await reader();
  }

  readWrite()