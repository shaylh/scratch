define(['react', 'react-redux', 'core/store/store', 'core/components/scratch'], function (React, reactRedux, store, scratch) {
    'use strict';

    return function () {
        var props = {};
        var connectedApp = React.createElement(scratch, props);
        return React.createElement(reactRedux.Provider, {store: store}, connectedApp);
    };
});