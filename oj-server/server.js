var express = require('express');
var express = require("express");
var app = express();
var restRouter = require("./routes/rest");
var indexRouter = require("./routes/index");
var mongoose = require("mongoose");
var path = require("path");

mongoose.connect("mongodb://evelyn:hsl0054829531@ds059365.mlab.com:59365/coj");

app.use("/api/v1", restRouter);
app.use('/', indexRouter);
app.use(express.static(path.join(__dirname, '../public')));
app.listen(3000, function(){
    console.log('Example app listening on port 3000!')
});
app.use(function(req, res) {
    // send index.html to start client side
    res.sendFile("index.html", { root: path.join(__dirname, '../public/') });
});