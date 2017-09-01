var express = require('express');
var index = express.Router();
var ioCon = require('../controllers/ioController');

index.post('/io',function(req,res){
    ioCon.cpu(req.res);
});

module.exports = index;