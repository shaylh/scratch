define(['react-redux'], function (reactRedux) {
    'use strict';

    var isPlayground = location.pathname === '/playground.html';

    return {
        connect: function (reactClass, mapStateToProps, mapDispatchToProps) {
            if (isPlayground) {
                return reactClass;
            }
            return reactRedux.connect(mapStateToProps, mapDispatchToProps)(reactClass);
        }
    };
});