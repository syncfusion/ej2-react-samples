"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_1 = require("./default");
var template_1 = require("./template");
var ajaxcontent_1 = require("./ajaxcontent");
var smartposition_1 = require("./smartposition");
var tooltip_menu_1 = require("./tooltip-menu");
var html_content_1 = require("./html-content");
var api_1 = require("./api");
exports.tooltipRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/tooltip/default', component: default_1.Default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/tooltip/template', component: template_1.TemplateTooltip }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/tooltip/ajaxcontent', component: ajaxcontent_1.AjaxContentTooltip }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/tooltip/smartposition', component: smartposition_1.DraggableTooltip }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/tooltip/tooltip-menu', component: tooltip_menu_1.TooltipMenu }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/tooltip/html-content', component: html_content_1.HtmlContentTooltip }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/tooltip/api', component: api_1.ApiTooltip })));
exports.tooltipCategory = { "default": { "name": "Default Functionalities", "category": "Tooltip" }, "template": { "name": "Template", "category": "Tooltip" }, "ajaxcontent": { "name": "Ajax Content", "category": "Tooltip" }, "smartposition": { "name": "Smart Positioning", "category": "Tooltip" }, "tooltip-menu": { "name": "Tooltip Menu", "category": "Tooltip" }, "html-content": { "name": "HTML Content", "category": "Tooltip" }, "api": { "name": "API", "category": "Tooltip" }, "defaultSample": "tooltip/default" };
