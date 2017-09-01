var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var path = require('path');
var route = require('./routes/index');


app.use(express.static('./'));
app.get('/', function (req, res) {
    //res.send("hello world!");
    res.render("main.ejs");
});

app.use("/",route);

server.listen(8080, function () {
    console.log('Express server listening on port ' +server.address().port);
});

var exec = require('child_process').exec;
//커맨드 실행해서 리턴값 받아오기
function execute(command, callback){
    exec(command, function(error, stdout, stderr){ callback(stdout); });
};

io.on('connection',function(socket){
    //라즈베리파이 온도 출력하는 커맨드 실행
    execute('vcgencmd measure_temp',function(stdout){
        var temp = stdout;
        socket.emit('cpu',temp);
        console.log(temp);
    });
    //30초마다 cpu온도 체크
    setInterval(function() {
        execute('vcgencmd measure_temp',function(stdout){
            temp = stdout;
            socket.emit('cpu',temp);
            console.log(socket.id,temp);    
        });
    }, 30000);
});

/*
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
        }
        res.render('sftpList.ejs',{data:data});
    });
    //console.log(data, 'the data info');
}).catch((err) => {
    console.log(err, 'catch error');
});*/