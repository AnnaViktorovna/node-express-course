let http = require("http");
let fs = require("fs");

http.createServer(function (req, res) {
    const fileStream = fs.readFileSync("../content/big.txt", "utf-8");
    fileStream.on("open", () => {
        fileStream.pipe();
    });
    fileStream.on("error", (error) => {
        res.end(error);
    });
})