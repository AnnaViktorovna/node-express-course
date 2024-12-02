const express = require("express");
const { products } = require("./data");
const app = express();
const peopleRouter = require("./routes/people");

app.use(express.static("./methods-public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1/people", peopleRouter);

const logger = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const time = new Date().getFullYear();
    console.log(method, url, time);
    next();
};





app.get("/api/v1/test", (req, res) => {
    res.json({ message: "It worked!" });
});

app.get("/api/v1/products", (req, res) => {
    res.json(products);
});

app.get("/api/v1/products/:productID", (req, res) => {
    const idToFind = parseInt(req.params.productID);
    const product = products.find((p) => p.id === idToFind);

    if (!product) {
        return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
});

app.get("/api/v1/query", (req, res) => {
    const { search, limit, price, maxPrice, minPrice } = req.query;
    let results = [...products];

    if (search) {
        results = results.filter((product) => {
            return product.name.toLowerCase().includes(search);
        });
    }

    if (maxPrice) {
        const price = parseFloat(maxPrice);
        if (!isNaN(price)) {
            results = results.filter((product) => product.price <= price);
        } else {
            return res.status(400).json({ error: "Invalid price value" });
        }
    }
    if (minPrice) {
        const price = parseFloat(minPrice);
        if (!isNaN(price)) {
            results = results.filter((product) => product.price >= price);
        } else {
            return res.status(400).json({ error: "Invalid price value" });
        }
    }

    if (limit) {
        const limitNumber = parseInt(limit);
        if (!isNaN(limitNumber) && limitNumber > 0) {
            results = results.slice(0, limitNumber);
        } else {
            return res.status(400).json({ error: "Invalid limit value" });
        }
    }
    res.json(results);
});


app.use(["/path1", "/path2"], logger);

app.get("/path1", (req, res) => {
    res.send("You are at Path 1");
});

app.get("/path2", (req, res) => {
    res.send("You are at Path 2");
});



 app.get("/", logger, (req, res) => {
    res.send("Home");
}); 

app.listen(3000, () => {
    console.log("server listening on port 3000...");
});

app.all("*", (req, res) => {
    res.status(404).send("<h1>Page Not Found</h1>");
});

console.log("Express Tutorial");
