"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_1 = require("./default");
var types_1 = require("./types");
var badge_1 = require("./badge");
var listview_1 = require("./listview");
var card_1 = require("./card");
exports.avatarRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/avatar/default', component: default_1.Default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/avatar/types', component: types_1.Types }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/avatar/badge', component: badge_1.Badge }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/avatar/listview', component: listview_1.Listview }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/avatar/card', component: card_1.Card })));
exports.avatarCategory = { "default": { "name": "Default", "category": "Avatar" }, "types": { "name": "Types", "category": "Avatar" }, "badge": { "name": "Badge", "category": "Integration" }, "listview": { "name": "ListView", "category": "Integration" }, "card": { "name": "Card", "category": "Integration" }, "defaultSample": "avatar/default" };
