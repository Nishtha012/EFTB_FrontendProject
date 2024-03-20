const fs = require("fs");
/*
fs.open("config.txt","w",(err,file)=>{
    if(err) throw err;
    console.log(file);
});
*/
fs.writeFile('sample.txt', 'helloooo',function(err){
    if(err) throw err;
    console.log('file saved');
});