var config = getConfig(getPackages(), {debug: 'all'}, packageCallback);
var queryParams = getParams();

config.paths.comp = 'packages/' + queryParams.package + '/main/' + queryParams.comp;

require.config(config);

define(['react-dom', './playground/core/provider'], function (ReactDom, provider) {
    var compName = _.last(queryParams.comp.split('/'));

    ReactDom.render(provider(compName), document.getElementById('app'));
});
