define(['react', 'utils', 'lodash', 'core/store/actionsCreator', 'core/components/title.rt'], function (React, utils, _, actionsCreator, template) {
    'use strict';

    function mapStateToProps(state) {
        return {
            title: state.get('appTitle')
        };
    }

    function mapDispatchToProps(dispatch) {
        return {
            setAppTitle: function (title) {
                dispatch(actionsCreator.setAppTitle(title));
            }
        };
    }

    var titleClass = React.createClass({
        displayName: 'title',
        propTypes: {
            title: React.PropTypes.string.isRequired,
            subtitle: React.PropTypes.string
        },
        getTitle: function(){
            return this.props.title;
        },
        render: template
    });

    return utils.reduxUtils.connect(titleClass, mapStateToProps, mapDispatchToProps);
});
