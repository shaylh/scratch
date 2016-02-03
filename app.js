var express = require('express');

serveStaticFolder('public', 8080);

function serveStaticFolder(folder, port){
    var app = express();
    app.use(express.static(folder));
    app.listen(port);

    console.log('Serving', folder, 'from port', port);
}