const path = require('path');

const publicPath = path.join(__dirname, './../public');

const express = require('express');
const port = 3000;
console.log(__dirname+'/../public');

console.log(publicPath);

app = express();


app.use(express.static(publicPath));

app.listen(port,()=>{
  console.log('app is up on port ',port);
});
