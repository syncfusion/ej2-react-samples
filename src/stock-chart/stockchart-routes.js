"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_1 = require("./default");
var ohlc_1 = require("./ohlc");
var multi_pane_1 = require("./multi-pane");
var multiple_series_1 = require("./multiple-series");
var spline_1 = require("./spline");
var area_1 = require("./area");
var spline_area_1 = require("./spline-area");
var inversed_area_1 = require("./inversed-area");
var plot_line_1 = require("./plot-line");
var strip_line_1 = require("./strip-line");
var period_customization_1 = require("./period-customization");
var disabled_navigator_1 = require("./disabled-navigator");
var disabled_period_1 = require("./disabled-period");
var stock_events_1 = require("./stock-events");
exports.stockchartRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/stock-chart/default', component: default_1.Default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/stock-chart/ohlc', component: ohlc_1.OHLC }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/stock-chart/multi-pane', component: multi_pane_1.MultiPane }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/stock-chart/multiple-series', component: multiple_series_1.MultipleSeries }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/stock-chart/spline', component: spline_1.Spline }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/stock-chart/area', component: area_1.Area }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/stock-chart/spline-area', component: spline_area_1.SplineArea }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/stock-chart/inversed-area', component: inversed_area_1.InversedArea }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/stock-chart/plot-line', component: plot_line_1.PlotLine }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/stock-chart/strip-line', component: strip_line_1.StripLines }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/stock-chart/period-customization', component: period_customization_1.PeroidCustomization }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/stock-chart/disabled-navigator', component: disabled_navigator_1.Navigator }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/stock-chart/disabled-period', component: disabled_period_1.PeriodSelector }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/stock-chart/stock-events', component: stock_events_1.StockEvents })));
exports.stockchartCategory = { "default": { "name": "Default", "category": "Stock Chart" }, "ohlc": { "name": "OHLC", "category": "Stock Chart" }, "multi-pane": { "name": "Candlestick and volume", "category": "Stock Chart" }, "multiple-series": { "name": "Multiple Series", "category": "Stock Chart" }, "spline": { "name": "Spline", "category": "Stock Chart" }, "area": { "name": "Area", "category": "Stock Chart" }, "spline-area": { "name": "Spline Area", "category": "Stock Chart" }, "inversed-area": { "name": "Inversed Area", "category": "Stock Chart" }, "plot-line": { "name": "Plot lines", "category": "Stock Chart" }, "strip-line": { "name": "Plot band", "category": "Stock Chart" }, "period-customization": { "name": "Intraday", "category": "Stock Chart" }, "disabled-navigator": { "name": "Hide Range Selector", "category": "Stock Chart" }, "disabled-period": { "name": "Hide Period Selector", "category": "Stock Chart" }, "stock-events": { "name": "Stock Events", "category": "Stock Chart" }, "defaultSample": "stock-chart/default" };
