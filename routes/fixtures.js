var express = require('express');
var router = express.Router();
var fixture_controller = require('../controllers/FixtureController');


router.get('/', function(req, res, next) {
    res.send('respond with a resource fxidsddsd');
  });
router.get('/:id',fixture_controller.fixture_detail);


module.exports = router;