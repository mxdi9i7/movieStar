var express = require('express');
var router = express.Router();
var request = require('request')
/* GET home page. */

const api_key = '46ce9ed4c1328f252f1df01a5aab79d7'

router.get('/fetch/people/byName/:name', function(req, res, next) {
  const { name } = req.params;
  request(`https://api.themoviedb.org/3/search/person/?api_key=${api_key}&query=${name}`, function(err, response, data) {
    res.send(data)
  })
});
router.get('/fetch/person/byId/:id', function(req, res, next) {
  const { id } = req.params;
  request(`https://api.themoviedb.org/3/person/${id}?api_key=${api_key}`, function(err, response, data) {
    res.send(data)
  })
});

module.exports = router;
