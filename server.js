var net = require('net');
var color = require('colors');
var server = net.createServer();
server.listen(
    {
        host: 'localhost',
        port: '9000'
    }
);
server.on('listening', ()=>{
    console.log('Server listening to %j', server.address())   
})
server.on('connection', (socket)=>{
    var remoteAddress = socket.remoteAddress + ':' +socket.remotePort;
    console.log('New client connection is made %s'.green, remoteAddress);
    socket.on('data', function(data){
       console.log('Data from %s: %s'.cyan, remoteAddress,data);
       socket.write('Hello %s' + data)
    });
    socket.once('close', function(){
        console.log('Connection from %s close'.yellow, remoteAddress);
    });
    socket.on('error', function(err){
        console.log('Connection %s error: %s'.red, remoteAddress, err.message)
    })
});
