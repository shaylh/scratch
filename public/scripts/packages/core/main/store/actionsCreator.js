define([], function () {
    'use strict';

    return {
        setAppTitle: function(title){
            return {type: 'SET_APP_TITLE', title: title};
        }
    };
});