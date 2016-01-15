define(['lodash'], function (_) {
    'use strict';

    function parseQueryParams(queryString) {
        if (queryString.indexOf('?') === 0) {
            queryString = queryString.substr(1);
        }
        return _.reduce(queryString.split('&'), function (res, pair) {
            var pairSplit = pair.split('=');
            res[pairSplit[0]] = pairSplit[1];
            return res;
        }, {});
    }

    return {
        parseQueryParams: parseQueryParams
    };
});
