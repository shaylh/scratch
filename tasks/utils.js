function getDefineName(packagesPath, srcPath) {
    var srcNoJS = srcPath.replace(packagesPath, '').replace('.js', '');
    var splitSrc = srcNoJS.split('/');
    var packageName = splitSrc[0];
    var fileNameArray = splitSrc.slice(2);

    if (fileNameArray.length === 1) {
        return packageName;
    }

    return packageName + '/' + fileNameArray.join('/');
}

function getPackages(grunt, packagesPath){
    var paths = grunt.file.expand(packagesPath + '*');
    return paths.map(function (path) {
        return path.replace(packagesPath, '');
    });
}

module.exports.getDefineName = getDefineName;
module.exports.getPackages = getPackages;