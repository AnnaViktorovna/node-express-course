const http = require("http");
var StringDecoder = require("string_decoder").StringDecoder;

const getBody = (req, callback) => {
    const decode = new StringDecoder("utf-8");
    let body = "";
    req.on("data", function (data) {
        body += decode.write(data);
    });
    req.on("end", function () {
        body += decode.end();
        const body1 = decodeURI(body);
        const bodyArray = body1.split("&");
        const resultHash = {};
        bodyArray.forEach((part) => {
            const partArray = part.split("=");
            resultHash[partArray[0]] = partArray[1];
        });
        callback(resultHash);
    });
};

let color = "pink";

const form = () => {
    return `
  <body style='background-color: ${color}'>
  <p style='font-size: 36px; color: gray;' >Choose color:</p>
  <form method="POST">
  <select name="color" style='height: 25px; border-radius: 5px'>
        <option value="pink">Pink</option>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
        <option value="yellow">Yellow</option>
       </select> 
  <button type="submit" style='border: 2px solid grey; border-radius: 8px; height: 25px'>Submit</button>
  </form>
  </body>
  `;
};

const server = http.createServer((req, res) => {
    console.log("req.method is ", req.method);
    console.log("req.url is ", req.url);
    if (req.method === "POST") {
        getBody(req, (body) => {
            console.log("The body of the post is ", body);

            if (body["color"]) {
                color = body["color"];
            } else {
                color = "grey";
            }

            res.writeHead(303, {
                Location: "/",
            });
            res.end();
        });
    } else {
        res.end(form());
    }
});
server.on("request", (req) => {  
    console.log("event received: ", req.method, req.url);  
  });  
  
server.listen(3000);
console.log("The server is listening on port 3000.");
