var config = getConfig(getPackages(), {debug: 'all'}, packageCallback);
var queryParams = getParams();

config.paths.comp = 'packages/' + queryParams.package + '/main/' + queryParams.comp;

require.config(config);
allowHotReload();

function defineApp() {
    define('mainApp', ['react-dom', './playground/core/provider'], function (ReactDOM, provider) {
        var compName = _.last(queryParams.comp.split('/'));

        ReactDOM.render(provider(compName), document.getElementById('app'));
    });
    require(['mainApp']);
}

defineApp();