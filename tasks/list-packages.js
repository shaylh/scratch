module.exports = function (grunt, scriptsPath, packagesPath) {

    var paths = grunt.file.expand(packagesPath + '*');
    var packages = paths.map(function (path) {
        return path.replace(packagesPath, '');
    });
    var fileContent = 'var packages = ' + JSON.stringify(packages) + ';';
    grunt.file.write(scriptsPath + 'packages.js', fileContent);
};