var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);

app.get('/',function(req,res){
    res.send("hello world!");
});

app.get('/world.html',function(req,res){
    res.send("222");
});

server.listen(80,function(){
    console.log('Express server listening on port ' + server.address().port);w
});