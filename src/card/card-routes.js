"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var basic_1 = require("./basic");
var vertical_1 = require("./vertical");
var horizontal_1 = require("./horizontal");
var swipeable_1 = require("./swipeable");
var flip_1 = require("./flip");
var reveal_1 = require("./reveal");
var tile_1 = require("./tile");
exports.cardRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/card/basic', component: basic_1.Basic }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/card/vertical', component: vertical_1.Vertical }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/card/horizontal', component: horizontal_1.Horizontal }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/card/swipeable', component: swipeable_1.Swipeable }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/card/flip', component: flip_1.Flip }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/card/reveal', component: reveal_1.Reveal }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/card/tile', component: tile_1.Tile })));
exports.cardCategory = { "basic": { "name": "Basic Card", "category": "Cards" }, "vertical": { "name": "Vertical Card", "category": "Cards" }, "horizontal": { "name": "Horizontal Card", "category": "Cards" }, "swipeable": { "name": "Swipeable Card", "category": "Cards" }, "flip": { "name": "Flip Card", "category": "Cards" }, "reveal": { "name": "Reveal Card", "category": "Cards" }, "tile": { "name": "Tile View", "category": "Cards" }, "defaultSample": "card/basic" };
