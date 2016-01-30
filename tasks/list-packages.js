module.exports = function (grunt, scriptsPath, packages) {
    var fileContent = 'function getPackages(){return ' + JSON.stringify(packages) + ';} if (typeof module !== \'undefined\' && module.exports) {module.exports = getPackages;}';
    grunt.file.write(scriptsPath + 'packages.js', fileContent);
};