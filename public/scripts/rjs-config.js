function getConfig(packages, queryParams, packageCallback) {
    var debugPackages = queryParams.debug ? queryParams.debug.split(',') : [];
    var debugLibs = isLocalDev() || shouldDebug(debugPackages, 'libs');
    var config = {
        paths: {
            io: '/socket.io/socket.io.js',
            immutable: getPath('libs/immutable/dist/immutable', debugLibs),
            lodash: getPath('libs/lodash/dist/lodash', debugLibs),
            react: getPath('libs/react/react', debugLibs),
            'react-dom': getPath('libs/react/react-dom', debugLibs),
            redux: 'libs/redux/index',
            'react-redux': 'libs/react-redux/index'
        },
        packages: [],
        waitSeconds: 15,
        map: {
            '*': {
                'react/addons': 'react'
            }
        }
    };

    packages.forEach(function (packageName) {
        if (packageCallback) {
            packageCallback(packageName);
        }
        if (shouldDebug(debugPackages, packageName)) {
            config.packages.push({
                name: packageName,
                location: 'packages/' + packageName + '/main',
                main: packageName
            });
        } else {
            config.paths[packageName] = 'packages-bin/' + packageName + '.min'
        }
    });

    function includes(array, item) {
        if (array.includes) {
            return array.includes(item);
        }
        var i, len = array.length;
        for (i = 0; i < len; i++) {
            if (array[i] === item) {
                return true;
            }
        }

        return false;
    }

    function shouldDebug(debugPackages, name) {
        return includes(debugPackages, 'all') || includes(debugPackages, name);
    }

    function getPath(path, debugLibs) {
        return path + (debugLibs ? '' : '.min');
    }

    function isLocalDev() {
        return typeof location !== 'undefined' && location.hostname === 'localhost';
    }

    return config;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = getConfig;
}