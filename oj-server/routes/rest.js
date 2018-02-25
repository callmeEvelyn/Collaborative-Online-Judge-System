var express = require("express");
var router = express.Router();
var problemService = require("../services/problemService");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

var node_rest_client = require('node-rest-client').Client;
var rest_client = new node_rest_client();

EXECUTOR_SERVER_URL = "http://localhost:5000/build_and_run";

rest_client.registerMethod('build_and_run', EXECUTOR_SERVER_URL, 'POST');

router.get("/problems", function (req, res) {
    problemService.getProblems()
        .then(problems => res.json(problems));
});

router.get("/problems/:id", function (req, res) {
    var id = req.params.id;
    problemService.getProblem(+id)
        .then(problem => res.json(problem));
});

router.post("/problems", jsonParser, function (req, res) {
    problemService.addProblem(req.body)
        .then(function (problem) {
            res.json(problem);
        }, function (error) {
            res.status(400).send("Problem name already exists!");
        });
});

module.exports = router;