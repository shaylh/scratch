define([], function () {
    'use strict';

    return {
        setCompProp: function (propName, propValue) {
            return {type: 'SET_COMP_PROP', propName: propName, propValue: propValue};
        },
        setCompContainerStyle: function (styleName, styleValue) {
            return {type: 'SET_COMP_CONTAINER_STYLE', styleName: styleName, styleValue: styleValue};
        },
        setCompState: function (compState) {
            return {type: 'SET_COMP_STATE', compState: compState};
        }
    };
});