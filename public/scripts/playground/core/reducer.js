define(['immutable'], function (Immutable) {
    'use strict';

    function setCompProp(state, propName, propValue) {
        var obj = {};

        obj[propName] = propValue;

        return state.mergeIn(['compProps'], Immutable.Map(obj));
    }

    function setCompState(state, compState) {
        return state.mergeIn(['compState'], compState);
    }

    function setCompContainerStyle(state, styleName, styleValue) {
        var obj = {};

        obj[styleName] = styleValue;

        return state.mergeIn(['compContainerStyle'], Immutable.Map(obj));
    }

    return function (state, action) {
        switch (action.type) {
            case 'SET_COMP_PROP':
                return setCompProp(state, action.propName, action.propValue);
            case 'SET_COMP_STATE':
                return setCompState(state, action.compState);
            case 'SET_COMP_CONTAINER_STYLE':
                return setCompContainerStyle(state, action.styleName, action.styleValue);
            default:
                return state
        }
    }
});