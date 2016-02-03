define(['redux', 'immutable', './reducer'], function (redux, Immutable, reducer) {
    'use strict';

    return redux.createStore(reducer, Immutable.Map({
        compProps: Immutable.Map({}),
        compState: Immutable.Map({}),
        compContainerStyle: Immutable.Map({width: '500px'})
    }));
});