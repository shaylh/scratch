var requirejs = require('requirejs');
var getConfig = require('../public/scripts/rjs-config');
var getPackages = require('../public/scripts/packages');
var config = getConfig(getPackages(), {debug: 'all'});

config.baseUrl = 'public/scripts';
config.nodeRequire = require;

requirejs.config(config);

global.define = function(required, cb) {
    if (cb) {
        cb.apply(null, required.map(requirejs))
    }
};