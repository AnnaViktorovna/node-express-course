const http = require("http");

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.end("Home page");
    }
    else if (req.url === "/about") {
        res.end("Some information");
    }
    else if (req.url === "/contact") {
        res.end("contact information");
    }
    else {
        res.end(
        `<h1>Error</h><p>You can navigate to home page</p><a href='/'>Home page</a>`
    )};
});
server.listen(3000);
