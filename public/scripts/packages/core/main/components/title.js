define(['react', 'lodash', 'core/components/title.rt'], function (React, _, template) {
    'use strict';

    return React.createClass({
        displayName: 'title',
        propTypes: {
            title: React.PropTypes.string.isRequired,
            subtitle: React.PropTypes.string
        },
        render: template
    });
});
