define(['react', 'react-redux', './stateContainer.rt'], function (React, reactRedux, template) {
    'use strict';

    function mapStateToProps(state) {
        return {
            compState: JSON.stringify(state.get('compState').toJS(), null, '    ')
        };
    }

    var stateContainerClass = React.createClass({
        displayName: 'stateContainer',
        render: template
    });

    return reactRedux.connect(mapStateToProps)(stateContainerClass);
});