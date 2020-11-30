const express = require("express");
const jwt = require("jsonwebtoken");
const port = 5000;
const app = express();

app.get("/api", function (req, res) {
    res.json({
        message: "Welcome To The API.",
    });
});

app.post("/api/post", verifyToken, function (req, res) {
    jwt.verify(req.token, "secretKey", function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: "Post Route Created.",
                data: data
            });
        }
    });
});

app.post("/api/login", function (req, res) {
    const user = {
        id: 1,
        userName: "siddhesh",
        gmail: "siddhesh.salunkhe@wohlig.com"
    }
    // jwt.sign({ user: user }, "secretKey", { expiresIn: '30s' }, function (err, token) {
    jwt.sign({ user: user }, "secretKey", function (err, token) {
        res.json({
            token: token
        });
    });
});

// verify token
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== "undefined") {
        const getTokenValue = bearerHeader.split(" ");
        const actualIndex = getTokenValue[1];
        req.token = actualIndex;
        next();
    } else {
        res.sendStatus(403);
    }
}


app.listen(port, function () {
    console.log("Server Listening On Port :- ", port);
});
