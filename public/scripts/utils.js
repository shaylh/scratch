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

    require.onResourceLoad = function (context, map, depMaps) {
        depMaps.forEach(function(depMap){
            var name = depMap.name;
            reverseDependencies[name] = reverseDependencies[name] || [];
            reverseDependencies[name].push(map.name);
        });
    };

    function listAllDependents(dep, array){
        array = array || [];
        array.push(dep);
        if(reverseDependencies[dep]){
            reverseDependencies[dep].forEach(function(childDep){
                listAllDependents(childDep, array);
            });
        }

        return array;
    }

    function hotReload(dep) {
        if (!reverseDependencies[dep]) {
            console.error('No such file:', dep);
            return;
        }
        require('react-dom').unmountComponentAtNode(document.getElementById('app'));
        undefList(listAllDependents(dep));
        defineApp();
    }

    function undefList(list) {
        list.map(require.undef);
        require(list);
    }

    window.hotReload = hotReload;
}

