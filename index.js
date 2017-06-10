var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);

app.get('/',function(req,res){
    //res.send("hello world!");
    res.render("main.ejs");
});

app.get('/world.html',function(req,res){
    res.send("222");
});

server.listen(8080,function(){
    console.log('Express server listening on port ' + server.address().port);
});