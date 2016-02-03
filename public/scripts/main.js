var config = getConfig(getPackages(), getParams(), packageCallback);

require.config(config);

define(['react', 'react-dom', 'core', 'langs'], function (React, ReactDOM, core) {
    ReactDOM.render(React.createElement(core.scratch, {}), document.getElementById('app'));
});