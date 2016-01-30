function getConfig(packages, queryParams, packageCallback) {
    var debugPackages = queryParams.debug ? queryParams.debug.split(',') : [];
    var config = {
        paths: {
            lodash: 'libs/lodash/lodash',
            react: 'libs/react/react'
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
        if (queryParams.debug && (includes(debugPackages, 'all') || includes(debugPackages, packageName))) {
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

    return config;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = getConfig;
}