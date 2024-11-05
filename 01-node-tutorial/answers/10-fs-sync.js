const { writeFileSync, readFileSync } = require("fs");
const filepath = "./temporary/fileA.txt";

writeFileSync(filepath, `Here is 10-fs-sync: line 1 `),
writeFileSync(filepath, "Here is line 2 ", { flag: "a" });
writeFileSync(filepath, "Here is line 3 ", { flag: "a" });

const read = readFileSync(filepath, "utf8");
console.log("read files", read);
