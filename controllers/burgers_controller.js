var express = require("express");
var router = express.Router();

var burger = require("../models/burger.js");

router.get("/", function(req, res) {
	burger.selectAll(function(data) {
		var burgerObj = {
			burger: data
		};
		console.log(burgerObj);
		res.render("index", burgerObj);
	});
});

router.post("/", function(req, res) {
	burger.insertOne(
	    ["burger_name"], [req.body.burger_name], function() {
	    res.redirect("/");
  	});
});

router.put("/:id", function(req, res) {
	var condition = "id = " + req.params.id;
	console.log("condition", condition);

	burger.updateOne({
		devoured: req.body.devoured
	}, condition, function() {
		res.redirect("/");
	});
});

router.post("/:id", function(req, res) {
	console.log('in delete');
    var condition = "id = " + req.params.id;

    burger.deleteOne(condition, function(result) {
        if (result.affectedRows == 0) {
            return res.status(200).end();
        } else {
            res.status(200).end();
		}
    });
});

module.exports = router;