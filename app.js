var express = require('express');
var watch = require('glob-watcher');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var utils = require('./tasks/utils');

serveStaticFolder('public', 8080);
hotReloadJS('public/scripts/packages/**/*.js');
hotReloadCSS('public/styles/*.css');

function serveStaticFolder(folder, port) {
    app.use(express.static(folder));
    app.get('/', function (req, res) {
        res.sendfile('index.html');
    });
    http.listen(port, function () {
        console.log('Serving', folder, 'from port', port);
    });
}

function hotReloadJS(glob) {
    var watcher = watch([glob]);
    watcher.on('change', function (event) {
        var path = event.path.replace(__dirname + '\\', '').replace(/\\/g, '/');
        var module = utils.getDefineName('public/scripts/packages/', path);
        io.emit('hot-reload-js', {module: module});
        console.log('hot-reloading-js', module);
    });
}

function hotReloadCSS(glob){
    var watcher = watch([glob]);
    watcher.on('change', function (event) {
        var fileName = event.path.replace(__dirname + '\\public\\styles\\', '');
        var package = fileName.substr(0, fileName.indexOf('.'));
        io.emit('hot-reload-css', {package: package});
        console.log('hot-reloading-css', package);
    });
    watcher.on('error', function(){
       console.log(arguments);
    });
}