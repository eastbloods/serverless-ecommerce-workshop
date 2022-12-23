const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const { getItem, getItems } = require("./db");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
    bodyParser.urlencoded({
        // to support URL-encoded bodies
        extended: true,
    })
);

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

app.get("/gigs", async (req, res) => {
    try {
        const result = await getItems();
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: "Could not fetch data from database" });
    }
});

app.get("/gigs/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const result = await getItem(id);
        if (!result) {
            res.status(404).json({ error: `Gig "${id}" not found!` });
        }
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: "Could not fetch data from database" });
    }
});

app.post("/purchase", (req, res) => {
    try {
        data = req.body;
    } catch (err) {
        res.status(400).json({ error: "Invalid content, expected valid JSON" });
    }

    const errors = [];

    for (const field of [
        "gigId",
        "name",
        "email",
        "nameOnCard",
        "cardNumber",
        "cardExpiryMonth",
        "cardExpiryYear",
        "cardCVC",
        "disclaimerAccepted",
    ]) {
        if (!data[field]) {
            errors.push(`Missing or invalid field "${field}"`);
        }
    }

    if (errors.length) {
        res.status(400).json({ error: `Invalid request: ${errors.join(", ")}` });
    }

    res.status(202).json({});
});

app.listen(port, () => {
    console.log(`Demo app listening on port ${port}`);
});

module.exports = app;

