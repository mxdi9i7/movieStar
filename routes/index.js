var express = require('express');
var router = express.Router();
var request = require('request')
/* GET home page. */


router.get('/api/:name', function(req, res, next) {
  const { name } = req.params;
  request('https://api.themoviedb.org/3/search/person/?api_key=46ce9ed4c1328f252f1df01a5aab79d7&query='+ name, function(err, response, data) {
    res.send(data)
  })
});

module.exports = router;
