"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_1 = require("./default");
var types_1 = require("./types");
var notification_1 = require("./notification");
var listview_1 = require("./listview");
var accordion_1 = require("./accordion");
var toolbar_1 = require("./toolbar");
exports.badgeRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/badge/default', component: default_1.Default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/badge/types', component: types_1.Types }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/badge/notification', component: notification_1.Notification }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/badge/listview', component: listview_1.ListView }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/badge/accordion', component: accordion_1.Accordion }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/badge/toolbar', component: toolbar_1.Toolbar })));
exports.badgeCategory = { "default": { "name": "Default", "category": "Badge" }, "types": { "name": "Types", "category": "Badge" }, "notification": { "name": "Notification", "category": "Badge" }, "listview": { "name": "ListView", "category": "Integration" }, "accordion": { "name": "Accordion", "category": "Integration" }, "toolbar": { "name": "Toolbar", "category": "Integration" }, "defaultSample": "badge/default" };
