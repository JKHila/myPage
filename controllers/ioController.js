var io = require('socket.io')

exports.cpu = function(req,res){
    io.on('connection',function(socket){
        console.log("sdf");
    });
}