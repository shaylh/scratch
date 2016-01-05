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

module.exports.getDefineName = getDefineName;