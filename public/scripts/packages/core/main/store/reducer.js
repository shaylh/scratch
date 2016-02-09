define([], function () {
    'use strict';

    function setAppTitle(state, title) {
        return state.set('appTitle', title);
    }

    return function (state, action) {
        switch (action.type) {
            case 'SET_APP_TITLE':
                return setAppTitle(state, action.title);
            default:
                return state;
        }
    };
});