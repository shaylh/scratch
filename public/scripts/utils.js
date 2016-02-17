function getParams() {
    return location.search.substr(1).split('&').reduce(function (res, pair) {
        var split = pair.split('=');
        res[split[0]] = split[1];
        return res;
    }, {});
}

function packageCallback(packageName) {
    loadCss('styles/' + packageName + '.css');
}

function loadCss(cssPath) {
    var linkNode = document.createElement('link');
    linkNode.setAttribute('href', cssPath);
    linkNode.setAttribute('rel', 'stylesheet');
    linkNode.setAttribute('type', 'text/css');
    document.head.appendChild(linkNode);
}

function allowHotReload() {
    var reverseDependencies = {};

    loadSocketIO();

    require.onResourceLoad = function (context, map, depMaps) {
        depMaps.forEach(function (depMap) {
            var name = depMap.name;
            reverseDependencies[name] = reverseDependencies[name] || [];
            reverseDependencies[name].push(map.name);
        });
    };

    function listAllDependents(dep, array) {
        array = array || [];
        array.push(dep);
        if (reverseDependencies[dep]) {
            reverseDependencies[dep].forEach(function (childDep) {
                listAllDependents(childDep, array);
            });
        }

        return array;
    }

    function hotReloadJS(dep) {
        console.log('hot-reload js:', dep);
        if (!reverseDependencies[dep]) {
            console.error('No such file:', dep);
            return;
        }
        require('react-dom').unmountComponentAtNode(document.getElementById('app'));
        undefList(listAllDependents(dep));
        defineApp();
    }

    function hotReloadCSS(package){
        console.log('hot-reload css:', package);
        var cssPath = 'styles/' + package + '.css';
        var existingNode = document.querySelector('link[href="' + cssPath + '"]');

        document.head.removeChild(existingNode);

        loadCss(cssPath);
    }

    function undefList(list) {
        list.map(require.undef);
        require(list);
    }

    function loadSocketIO() {
        require(['io'], function (io) {
            var socket = io('http://localhost:8080');
            socket.on('hot-reload-js', function (data) {
                if (data.module) {
                    hotReloadJS(data.module);
                }
            });
            socket.on('hot-reload-css', function (data) {
                if (data.package) {
                    hotReloadCSS(data.package);
                }
            });
        });
    }
}

