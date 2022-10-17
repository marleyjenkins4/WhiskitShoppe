import React from 'react';
import ReactDom from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import App from './../imports/ui/App'

Meteor.startup(function () {
    Tracker.autorun(function () {

        ReactDom.render(
            <App />,
            document.getElementById("react-target")
        )
    })
})