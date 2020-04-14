var readline = require('readline-sync');
var color = require('colors');
var net = require('net');

var HOST = 'localhost';
var PORT = '9000';
var client = null;
function openConnection(){
    if(client){
        console.log("..Connection is already opened".red)
        setTimeout(()=>{
            menu()
        },2000);
        return;
    }
    client = new net.Socket()
    client.on('error',(er)=>{
        client.destroy();
        client=null;
        console.log('Error: Connection could not be open, msg: %s'.red, er.message)
        setTimeout(()=>{
            menu()
         },2000)
    })
    client.on('data', (data)=>{
        console.log('Received %s'.cyn, data);
        setTimeout(()=>{
            menu()
         },2000)
    });
    client.connect(PORT,HOST, () =>{
        console.log('Connection Open Succcessfully'.green);
        setTimeout(()=>{
            menu()
         },2000)
    })
}
function sendData(data){
    if(!client){
      console.log('Connection is not open or close...'.red)
      setTimeout(()=>{
        menu()
     },2000)
     return;
    }   
    client.write(data);
}
function closeConnection(){
    if(!client){
        console.log('Connection is not open or already closed'.red)
        setTimeout(()=>{
            menu()
         },2000);
         return
    };
    client.destroy();
    client = null;
    console.log('Connection closed successfully'.yellow);
    setTimeout(()=>{
        menu()
     },2000);
}
function menu(){
    var readLine = readline.question('\n\nEnter Option (1-open, 2-send, 3-close, 4-Quit):');
    switch (readLine){
        case '1':
           openConnection()
        break;
        case '2':
          var data = readline.question('Enter data to be send');
          sendData(data)
        break;
        case '3':
          closeConnection()
        break;
        case '4':
          return;
           break;
           default:
            setTimeout(()=>{
                menu()
             },2000)
           break;
    }
}
setTimeout(()=>{
   menu()
},2000)