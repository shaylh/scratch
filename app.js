var express = require('express');
var watch = require('glob-watcher');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var utils = require('./tasks/utils');

serveStaticFolder('public', 8080);
hotReload('public/scripts/packages/**/*.js');

function serveStaticFolder(folder, port) {
    app.use(express.static(folder));
    app.get('/', function (req, res) {
        res.sendfile('index.html');
    });
    http.listen(port, function () {
        console.log('Serving', folder, 'from port', port);
    });
}

function hotReload(glob) {
    var watcher = watch([glob]);
    watcher.on('change', function (event) {
        var path = event.path.replace(__dirname + '\\', '').replace(/\\/g, '/');
        var module = utils.getDefineName('public/scripts/packages/', path);
        io.emit('hot-reload', {module: module});
        console.log('hot-reloading', module);
    });
}
