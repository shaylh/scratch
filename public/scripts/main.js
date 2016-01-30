var config = getConfig(getPackages(), getParams(), packageCallback);

function getParams() {
    return location.search.substr(1).split('&').reduce(function (res, pair) {
        var split = pair.split('=');
        res[split[0]] = split[1];
        return res;
    }, {});
}

function packageCallback(packageName){
    loadCss('styles/' + packageName + '.css');
}

function loadCss(cssPath){
    var linkNode = document.createElement('link');
    linkNode.setAttribute('href', cssPath);
    linkNode.setAttribute('rel', 'stylesheet');
    linkNode.setAttribute('type', 'text/css');
    document.head.appendChild(linkNode);
}

require.config(config);

define(['react', 'react-dom', 'core', 'langs'], function (React, ReactDOM, core) {
    ReactDOM.render(React.createElement(core.scratch, {}), document.getElementById('app'));
});