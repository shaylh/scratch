module.exports = function (grunt, scriptsPath, packages) {
    var fileContent = 'var packages = ' + JSON.stringify(packages) + ';';
    grunt.file.write(scriptsPath + 'packages.js', fileContent);
};