const express = require("express");
const usersSchema = require("../schema/usersSchema");
const route = express.Router();

route.post("/create-user", (req, res, next) => {
    usersSchema.create(req.body, (err, data) => {
        if (err) {
            return next(err);
        } else {
            return res.json(data);
        }
    });
});

module.exports = route;