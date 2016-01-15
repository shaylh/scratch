var express = require('express');
var app = express();
var PORT = 8080;

app.use(express.static('public'));
app.listen(PORT);

console.log('Started http server at port', PORT);