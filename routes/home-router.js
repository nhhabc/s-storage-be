var express = require('express');
/* GET home page. */
const router = require("./folder-router");

router.get('/', function(req, res, next) {
    res.json({response: "Welcome to my app!"});
});

module.exports = router;