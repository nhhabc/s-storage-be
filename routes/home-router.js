var express = require('express');
/* GET home page. */
const router = express.Router();

router.get('/', function(req, res, next) {
    res.json({response: "Welcome to my app!"});
});

module.exports = router;