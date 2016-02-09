define(['redux', 'immutable', 'core/store/reducer'], function (redux, Immutable, reducer) {
    'use strict';

    return redux.createStore(reducer, new Immutable.Map({
        appTitle: 'initial title'
    }));
});