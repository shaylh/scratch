var params = getParams();
var config = {
    paths: {
        lodash: 'libs/lodash/lodash',
        react: 'libs/react/react'
    },
    packages: [],
    waitSeconds: 15,
    map: {
        '*': {
            'react/addons': 'react'
        }
    }
};
var debugPackages = params.debug ?  params.debug.split(',') : [];
packages.forEach(function(package){
    loadCss('styles/' + package + '.css');
    if(params.debug && (debugPackages.includes('all') || debugPackages.includes(package))){
        config.packages.push({
            name: package,
            location: 'packages/' + package + '/main',
            main: package
        });
    } else {
        config.paths[package] = 'packages-bin/' + package + '.min'
    }
});

function getParams() {
    return location.search.substr(1).split('&').reduce(function (res, pair) {
        var split = pair.split('=');
        res[split[0]] = split[1];
        return res;
    }, {});
}

function loadCss(cssPath){
    var linkNode = document.createElement('link');
    linkNode.setAttribute('href', cssPath);
    linkNode.setAttribute('rel', 'stylesheet');
    linkNode.setAttribute('type', 'text/css');
    document.head.appendChild(linkNode);
}

require.config(config);

define(['react', 'core', 'langs'], function (React, core) {
    React.render(React.createElement(core.scratch, {}), document.getElementById('app'));
});