var queryParams = getParams();
var config = getConfig(getPackages(), queryParams, packageCallback);

require.config(config);

if(queryParams.hasOwnProperty('hotReload') || queryParams.debug === 'all'){
    allowHotReload();
}

function defineApp() {
    define('mainApp', ['lodash', 'react', 'react-dom', 'core'], function (_, React, ReactDOM, core) {
        window._ = _;
        window.ReactDOM = ReactDOM;
        window.React = React;
        //window.rendered = ReactDOM.render(React.createElement(core.scratch, {}), document.getElementById('app'));
        window.rendered = ReactDOM.render(core.provider(), document.getElementById('app'));
    });
    require(['mainApp']);
}

defineApp();