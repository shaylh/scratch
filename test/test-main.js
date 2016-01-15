var tests = [];
for (var file in window.__karma__.files) {
    if (/spec\.js$/.test(file)) {
        tests.push(file);
    }
}
console.log('Test files loaded: ' + tests.length + ' Files');
var config = getConfig(getPackages(), {debug: 'all'});

config.baseUrl = '/base/public/scripts';
config.callback = window.__karma__.start;
config.deps = tests;

requirejs.config(config);