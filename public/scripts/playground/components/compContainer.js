define(['lodash', 'react', 'react-redux', '../core/actionsCreator', './compContainer.rt'], function (_, React, reactRedux, actionsCreator, template) {
    'use strict';

    function mapStateToProps(state) {
        return {
            compProps: state.get('compProps'),
            compContainerStyle: state.get('compContainerStyle')
        };
    }

    function mapDispatchToProps(dispatch) {
        return {
            setCompState: function (compState) {
                dispatch(actionsCreator.setCompState(compState));
            }
        };
    }

    var compContainerClass = React.createClass({
        displayName: 'compContainer',
        componentDidMount: function () {
            var compInstance = this.refs.comp;
            var callback = function () {
                this.props.setCompState(compInstance.state);
            }.bind(this);

            this.wrap(compInstance, 'componentDidUpdate', callback);
            callback();
        },
        wrap: function (compInstance, functionName, callback) {
            var tempFunction = compInstance[functionName] || _.noop;
            compInstance[functionName] = function () {
                tempFunction.apply(compInstance, arguments);
                callback(arguments);
            }.bind(this);
        },
        shouldComponentUpdate: function (nextProps) {
            return nextProps !== this.props;
        },
        render: template
    });

    return reactRedux.connect(mapStateToProps, mapDispatchToProps)(compContainerClass);
});