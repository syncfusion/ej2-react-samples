"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_1 = require("./default");
var predefined_layouts_1 = require("./predefined-layouts");
var properties_1 = require("./properties");
var dynamic_1 = require("./dynamic");
var analytics_dashboard_1 = require("./analytics-dashboard");
exports.dashboardlayoutRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/dashboard-layout/default', component: default_1.Default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/dashboard-layout/predefined-layouts', component: predefined_layouts_1.PredefinedLayouts }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/dashboard-layout/properties', component: properties_1.Properties }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/dashboard-layout/dynamic', component: dynamic_1.DynamicWidget }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/dashboard-layout/analytics-dashboard', component: analytics_dashboard_1.SEODashboard })));
exports.dashboardlayoutCategory = { "default": { "name": "Default Functionalities", "category": "Dashboard Layout" }, "predefined-layouts": { "name": "Predefined Layouts", "category": "Dashboard Layout" }, "properties": { "name": "API", "category": "Dashboard Layout" }, "dynamic": { "name": "Editable Dashboard", "category": "Dashboard Layout" }, "analytics-dashboard": { "name": "SEO Analytics Dashboard", "category": "Use Case" }, "defaultSample": "dashboard-layout/default" };
