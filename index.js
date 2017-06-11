var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var server = http.createServer(app);

app.use(express.static('./'));
//app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function (req, res) {
    //res.send("hello world!");
    res.render("main.ejs");
});

app.get('/world.html', function (req, res) {
    res.send("222");
});


app.get('/ss',function(req,res){
    res.send("hell");
});

server.listen(8080, function () {
    console.log('Express server listening on port ' + server.address().port);
});


let Client = require('ssh2-sftp-client');
let sftp = new Client();
sftp.connect({
    host: 'jkhila.com',
    port: '22',
    username: 'gunny',
    password: 'wh168168'
}).then(() => {
    return sftp.list('/home/gunny/Videos');
}).then((data) => {
    app.get('/sftp',function(req,res){
        /*var a = "";
        for(var i = 0;i<data.length;i++){
            a += data[i].name+"\r\n";
        }*/
        res.render('sftpList.ejs',{data:data});
    });
    //console.log(data, 'the data info');
}).catch((err) => {
    console.log(err, 'catch error');
});