define(['react', 'react-redux', './store', '../components/app'], function (React, reactRedux, store, app) {

    return function (compName) {
        var connectedApp = React.createElement(app, {compName: compName});
        return React.createElement(reactRedux.Provider, {store: store}, connectedApp)
    };
});