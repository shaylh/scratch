define(['lodash', 'react', 'react-redux', '../core/actionsCreator', './app.rt'], function (_, React, reactRedux, actionsCreator, template) {
    'use strict';

    var PROP_TYPES = _.map(React.PropTypes, function (value, key) {
        return {type: key, value: value};
    });

    var INPUT_TYPES = {
        number: 'number',
        bool: 'checkbox'
    };

    function getPropType(prop) {
        var isRequired;
        var propTypeCandidate = _.find(PROP_TYPES, function (propType) {
            return propType.value === prop || propType.value.isRequired === prop;
        });

        if (propTypeCandidate) {
            isRequired = prop === propTypeCandidate.value.isRequired;
            return propTypeCandidate.type + (isRequired ? '.required' : '');
        }

        return '{complex}';
    }

    function mapStateToProps(state) {
        return {
            compProps: state.get('compProps').toJS(),
            compContainerStyle: state.get('compContainerStyle').toJS()
        };
    }

    function mapDispatchToProps(dispatch) {
        return {
            setCompProp: function (propName, propValue) {
                dispatch(actionsCreator.setCompProp(propName, propValue));
            },
            setCompContainerStyle: function (styleName, styleValue) {
                dispatch(actionsCreator.setCompContainerStyle(styleName, styleValue));
            }
        };
    }

    function locFunction(functionName, value) {
        if (value) {
            return function () {
                console.log('props.' + functionName, value);
            }
        }
    }

    var appClass = React.createClass({
        displayName: 'app',
        getCompPropTypes: function (comp) {
            var rawPropTypes = comp.propTypes;
            var defaultProps = comp.getDefaultProps && comp.getDefaultProps();
            return _.map(rawPropTypes, function (value, key) {
                var type = getPropType(value);
                var inputType = INPUT_TYPES[type] || 'text';
                var initialValue = this.getDefaultValue(defaultProps, key);
                return {
                    name: key,
                    placeholder: type,
                    onChange: this.setCompProp.bind(this, key, type),
                    type: inputType,
                    defaultValue: type !== 'bool' ? initialValue : null,
                    defaultChecked: type === 'bool' ? initialValue : null
                };
            }.bind(this));
        },
        getDefaultValue: function (defaultProps, propName) {
            if (!defaultProps) {
                return '';
            }
            try {
                return JSON.stringify(defaultProps[propName]);
            } catch (e) {
                return defaultProps[propName];
            }
        },
        setCompProp: function (propName, propType, e) {
            var rawValue = e.target.value;
            var rawType = _.first(propType.split('.'));
            var value;

            switch (rawType) {
                case 'number':
                    value = parseInt(rawValue, 10);
                    break;
                case 'bool':
                    value = e.target.checked;
                    break;
                case 'func':
                    value = locFunction(propName, rawValue);
                    break;
                case 'object':
                case 'array':
                    try {
                        value = JSON.parse(rawValue);
                    }
                    catch (e) {
                        value = rawValue;
                    }
                    break;
                default:
                    value = rawValue;
                    break;
            }

            this.props.setCompProp(propName, value);
        },
        setCompContainerStyle: function (styleName, e) {
            this.props.setCompContainerStyle(styleName, e.target.value);
        },
        render: template
    });

    return reactRedux.connect(mapStateToProps, mapDispatchToProps)(appClass);
});