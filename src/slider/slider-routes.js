"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_1 = require("./default");
var ticks_1 = require("./ticks");
var tooltip_1 = require("./tooltip");
var orientation_1 = require("./orientation");
var format_1 = require("./format");
var limits_1 = require("./limits");
var api_1 = require("./api");
var events_1 = require("./events");
var thumb_customization_1 = require("./thumb-customization");
var selection_bar_customization_1 = require("./selection-bar-customization");
var ticks_customization_1 = require("./ticks-customization");
var tooltip_customization_1 = require("./tooltip-customization");
var azure_pricing_1 = require("./azure-pricing");
exports.sliderRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/slider/default', component: default_1.Default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/slider/ticks', component: ticks_1.Ticks }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/slider/tooltip', component: tooltip_1.Tooltip }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/slider/orientation', component: orientation_1.Orientation }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/slider/format', component: format_1.Format }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/slider/limits', component: limits_1.Limits }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/slider/api', component: api_1.APIs }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/slider/events', component: events_1.Events }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/slider/thumb-customization', component: thumb_customization_1.Thumb }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/slider/selection-bar-customization', component: selection_bar_customization_1.Bar }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/slider/ticks-customization', component: ticks_customization_1.TicksCustomization }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/slider/tooltip-customization', component: tooltip_customization_1.TooltipCustomization }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/slider/azure-pricing', component: azure_pricing_1.Cloudpricing })));
exports.sliderCategory = { "default": { "name": "Default Functionalities", "category": "Range Slider" }, "ticks": { "name": "Ticks", "category": "Range Slider" }, "tooltip": { "name": "Tooltip", "category": "Range Slider" }, "orientation": { "name": "Vertical Orientation", "category": "Range Slider" }, "format": { "name": "Formatting", "category": "Range Slider" }, "limits": { "name": "Limits", "category": "Range Slider" }, "api": { "name": "API", "category": "Range Slider" }, "events": { "name": "Events", "category": "Range Slider" }, "thumb-customization": { "name": "Thumb", "category": "Customization" }, "selection-bar-customization": { "name": "Bar", "category": "Customization" }, "ticks-customization": { "name": "Ticks", "category": "Customization" }, "tooltip-customization": { "name": "Tooltip", "category": "Customization" }, "azure-pricing": { "name": "Cloud Pricing", "category": "Use Case" }, "defaultSample": "slider/default" };
