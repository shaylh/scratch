module.exports = function (grunt, scriptsPath, packages) {
    var fileContent = 'function getPackages(){return ' + JSON.stringify(packages) + ';}';
    grunt.file.write(scriptsPath + 'packages.js', fileContent);
};