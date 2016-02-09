var resolver = require('dependency-tree-resolver');
var utils = require('./utils');
var _ = require('lodash');

function getDependencyTree(grunt, packagesPath) {
    var innerMappings = grunt.file.expand([packagesPath + '/**/*.js', '!' + packagesPath + '/**/*.spec.js']);
    var tree = _.reduce(innerMappings, function (res, filePath) {
        var fileContent = grunt.file.read(filePath);
        var from = fileContent.indexOf('[') + 1;
        var to = fileContent.indexOf(']');
        var deps = fileContent.substring(from, to).replace(/[^a-zA-Z0-9\/\.,]+/g, '');
        res[utils.getDefineName(packagesPath, filePath)] = _.compact(deps.split(','));
        return res;
    }, {});
    return tree;
}

module.exports = function (grunt, scriptsPath, packagesPath) {
    var tree = getDependencyTree(grunt, packagesPath);
    var filesInOrder = resolver(tree, {exclude: ['react', 'lodash', 'react/addons', 'reactredux', 'redux', 'immutable']});
    return _.reduce(filesInOrder, function (res, file) {
        var split = file.split('/');
        var packageName = _.first(split);
        var minifiedPath = scriptsPath + 'packages-bin/' + packageName + '.min.js';
        res[minifiedPath] = res[minifiedPath] || [];
        res[minifiedPath].push('target/' + packageName + '/main/' + split.slice(1).join('/') + (split.length === 1 ? packageName : '') + '.js');
        return res;
    }, {});
};
