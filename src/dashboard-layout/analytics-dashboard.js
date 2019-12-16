"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_layouts_1 = require("@syncfusion/ej2-react-layouts");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_maps_1 = require("@syncfusion/ej2-maps");
var ej2_react_maps_1 = require("@syncfusion/ej2-react-maps");
require("./analytics.css");
var data = require("./default-datasource.json");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
exports.expensedata = [
    {
        'UniqueId': 'T100003',
        'DateTime': new Date(1488359820000),
        'Category': 'Food',
        'PaymentMode': 'Cash',
        'TransactionType': 'Expense',
        'Description': 'Confederate cush',
        'Amount': '900',
        'MonthShort': 'Mar',
        'MonthFull': 'March, 2017',
        'FormattedDate': '03/01/2017 08:53 PM',
        'Device': 'Tablet'
    }, {
        'UniqueId': 'T100004',
        'DateTime': new Date(1491038220000),
        'Category': 'Transportation',
        'PaymentMode': 'Credit Card',
        'TransactionType': 'Expense',
        'Description': 'Public and other transportation',
        'Amount': '1200',
        'MonthShort': 'Apr',
        'MonthFull': 'April, 2017',
        'FormattedDate': '04/01/2017 10:44 AM',
        'Device': 'Desktop'
    }, {
        'UniqueId': 'T100005',
        'DateTime': new Date(1493630220000),
        'Category': 'Transportation',
        'PaymentMode': 'Cash',
        'TransactionType': 'Expense',
        'Description': 'Public and other transportation',
        'Amount': '600',
        'MonthShort': 'May',
        'MonthFull': 'May, 2017',
        'FormattedDate': '05/01/2017 03:25 PM',
        'Device': 'Mobile'
    },
];
exports.data1 = [
    { x: new Date(2002, 0, 1), y: 2.2 }, { x: new Date(2003, 0, 1), y: 3.4 },
    { x: new Date(2004, 0, 1), y: 2.8 }, { x: new Date(2005, 0, 1), y: 1.6 },
    { x: new Date(2006, 0, 1), y: 2.3 }, { x: new Date(2007, 0, 1), y: 2.5 },
    { x: new Date(2008, 0, 1), y: 2.9 }, { x: new Date(2009, 0, 1), y: 3.8 },
    { x: new Date(2010, 0, 1), y: 1.4 }, { x: new Date(2011, 0, 1), y: 3.1 }
];
exports.data2 = [
    { x: new Date(2002, 0, 1), y: 2 }, { x: new Date(2003, 0, 1), y: 1.7 },
    { x: new Date(2004, 0, 1), y: 1.8 }, { x: new Date(2005, 0, 1), y: 2.1 },
    { x: new Date(2006, 0, 1), y: 2.3 }, { x: new Date(2007, 0, 1), y: 1.7 },
    { x: new Date(2008, 0, 1), y: 1.5 }, { x: new Date(2009, 0, 1), y: 2.8 },
    { x: new Date(2010, 0, 1), y: 1.5 }, { x: new Date(2011, 0, 1), y: 2.3 }
];
var datasource = data;
var markers = [
    { name: 'Asia', latitude: 50.32087157990324, longitude: 90.015625 },
    { name: 'Australia', latitude: -25.88583769986199, longitude: 134.296875 },
    { name: 'Africa', latitude: 16.97274101999902, longitude: 16.390625 },
    { name: 'Europe', latitude: 49.95121990866204, longitude: 18.468749999999998 },
    { name: 'North America', latitude: 59.88893689676585, longitude: -109.3359375 },
    { name: 'South America', latitude: -6.64607562172573, longitude: -55.54687499999999 }
];
var SEODashboard = /** @class */ (function (_super) {
    __extends(SEODashboard, _super);
    function SEODashboard() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cellSpacing = [5, 5];
        return _this;
    }
    SEODashboard.prototype.btnClick = function () {
        var proxy = this;
        var count = 8;
        var panel = [{
                'id': count.toString() + '_layout', 'sizeX': 1, 'sizeY': 1, 'row': 0, 'col': 0,
                content: '<span id="close" className="e-template-icon e-clear-icon"></span><div className="text-align">' + count.toString() + '</div>'
            }];
        count = count + 1;
        proxy.dashboardObj.addPanel(panel[0]);
    };
    SEODashboard.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/contrast/i, 'Contrast');
    };
    SEODashboard.prototype.Chartload = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/contrast/i, 'Contrast');
        if (selectedTheme === 'highcontrast') {
            args.chart.series[0].marker.dataLabel.fill = '#000000';
            args.chart.series[1].marker.dataLabel.fill = '#000000';
        }
    };
    ;
    SEODashboard.prototype.Mapload = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/contrast/i, 'Contrast');
    };
    ;
    SEODashboard.prototype.card1 = function () {
        return (React.createElement("div", { className: "card" },
            React.createElement("span", { className: "e-icons session" }),
            React.createElement("div", { className: "card-content text" }, "Session"),
            React.createElement("div", { className: "card-content number" }, "124,444")));
    };
    SEODashboard.prototype.card2 = function () {
        return (React.createElement("div", { className: "card" },
            React.createElement("span", { className: "e-icons profile" }),
            React.createElement("div", { className: "card-content text" }, "Users"),
            React.createElement("div", { className: "card-content number" }, "64,496")));
    };
    SEODashboard.prototype.card3 = function () {
        return (React.createElement("div", { className: "card" },
            React.createElement("span", { className: "e-icons views" }),
            React.createElement("div", { className: "card-content text" }, "Views"),
            React.createElement("div", { className: "card-content number" }, "442,278")));
    };
    SEODashboard.prototype.map = function () {
        return (React.createElement("div", { style: { height: "100%", width: "100%" } },
            React.createElement(ej2_react_maps_1.MapsComponent, { id: "maps", load: this.Mapload, zoomSettings: {
                    enable: false
                }, legendSettings: {
                    visible: false
                } },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_maps_1.Marker, ej2_react_maps_1.Legend, ej2_react_maps_1.MapsTooltip] }),
                React.createElement(ej2_react_maps_1.LayersDirective, null,
                    React.createElement(ej2_react_maps_1.LayerDirective, { shapeData: new ej2_maps_1.MapAjax('./src/dashboard-layout/world-map.json'), shapePropertyPath: 'continent', shapeDataPath: 'continent', dataSource: datasource.default, shapeSettings: {
                            colorValuePath: 'color'
                        } },
                        React.createElement(ej2_react_maps_1.MarkersDirective, null,
                            React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, template: '<div style="font-size: 12px;color:white;text-shadow: 0px 1px 1px black;font-weight: 500;width:50px">{{:name}}</div>', animationDuration: 0, dataSource: markers }),
                            React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, shape: 'Image', imageUrl: './src/dashboard-layout/ballon.png', height: 20, width: 20, offset: {
                                    y: -10,
                                    x: 0
                                }, animationDuration: 0, tooltipSettings: {
                                    visible: true,
                                    valuePath: 'name'
                                }, dataSource: [
                                    { latitude: 37.6276571, longitude: -122.4276688, name: 'San Bruno' },
                                    { latitude: 33.5302186, longitude: -117.7418381, name: 'Laguna Niguel' },
                                    { latitude: 40.7424509, longitude: -74.0081468, name: 'New York' },
                                    { latitude: -23.5268201, longitude: -46.6489927, name: 'Bom Retiro' },
                                    { latitude: 43.6533855, longitude: -79.3729994, name: 'Toronto' },
                                    { latitude: 48.8773406, longitude: 2.3299627, name: 'Paris' },
                                    { latitude: 52.4643089, longitude: 13.4107368, name: 'Berlin' },
                                    { latitude: 19.1555762, longitude: 72.8849595, name: 'Mumbai' },
                                    { latitude: 35.6628744, longitude: 139.7345469, name: 'Minato' },
                                    { latitude: 51.5326602, longitude: -0.1262422, name: 'London' }
                                ] })))))));
    };
    SEODashboard.prototype.pie = function () {
        return (React.createElement("div", { style: { height: "100%", width: "100%" } },
            React.createElement(ej2_react_charts_1.AccumulationChartComponent, { id: 'pie', legendSettings: { visible: false }, enableSmartLabels: true, height: "100%", width: "100%", enableAnimation: false, selectionMode: "Point", center: { x: '50%', y: '50%' }, tooltip: { enable: false, header: "<b>${point.x}</b>", format: 'Composition : <b>${point.y}%</b>' }, load: this.load.bind(this) },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.AccumulationLegend, ej2_react_charts_1.PieSeries, ej2_react_charts_1.AccumulationTooltip, ej2_react_charts_1.AccumulationDataLabel] }),
                React.createElement(ej2_react_charts_1.AccumulationSeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.AccumulationSeriesDirective, { dataSource: exports.expensedata, name: 'Revenue', xName: 'Device', yName: 'Amount', explode: false, dataLabel: {
                            visible: true,
                            position: 'Inside', name: 'text',
                            font: {
                                fontWeight: '600'
                            }
                        }, radius: '100%', innerRadius: '35%', palettes: ['#357cd2', '#00bdae', '#e36593'] })))));
    };
    SEODashboard.prototype.visitorsChart = function () {
        return (React.createElement("div", { style: { height: "100%", width: "100%" } },
            React.createElement(ej2_react_charts_1.ChartComponent, { id: 'visitorsChart', style: { textAlign: "center" }, load: this.Chartload.bind(this), legendSettings: { visible: false }, primaryXAxis: {
                    valueType: 'DateTime',
                    labelFormat: 'y',
                    majorGridLines: { width: 0 },
                    intervalType: 'Years',
                    edgeLabelPlacement: 'Shift'
                }, primaryYAxis: {
                    labelFormat: '{value}%',
                    lineStyle: { width: 0 },
                    maximum: 4, interval: 1,
                    majorTickLines: { width: 0 },
                    minorTickLines: { width: 0 }
                }, chartArea: { border: { width: 0 } } },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.SplineAreaSeries, ej2_react_charts_1.DateTime, ej2_react_charts_1.Legend] }),
                React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', name: 'Jan', opacity: 0.5, type: 'SplineArea', width: 2, fill: "rgb(239, 183, 202)" }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data2, xName: 'x', yName: 'y', name: 'Feb', opacity: 0.5, type: 'SplineArea', width: 2, fill: "rgb(14, 64, 152, .6)" })))));
    };
    SEODashboard.prototype.pieChart = function () {
        return (React.createElement("div", { style: { height: "100%", width: "100%" } },
            React.createElement(ej2_react_charts_1.AccumulationChartComponent, { id: 'pieChart', legendSettings: { visible: false }, enableSmartLabels: true, height: "100%", width: "100%", enableAnimation: false, selectionMode: "Point", center: { x: '50%', y: '50%' }, tooltip: { enable: false, header: "<b>${point.x}</b>", format: 'Composition : <b>${point.y}%</b>' }, load: this.load.bind(this) },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.AccumulationLegend, ej2_react_charts_1.PieSeries, ej2_react_charts_1.AccumulationTooltip, ej2_react_charts_1.AccumulationDataLabel] }),
                React.createElement(ej2_react_charts_1.AccumulationSeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.AccumulationSeriesDirective, { dataSource: [
                            { 'x': 'Desktop', y: 37, text: '60%' }, { 'x': 'Mobile', y: 17, text: '10%' },
                            { 'x': 'Tablet', y: 19, text: '20%' }
                        ], xName: 'x', yName: 'y', explode: true, explodeIndex: 2, explodeOffset: "10%", dataLabel: {
                            visible: true,
                            position: 'Inside', name: 'text',
                            font: {
                                fontWeight: '600'
                            }
                        }, radius: '100%' })))));
    };
    SEODashboard.prototype.colChart = function () {
        return (React.createElement("div", { style: { height: "100%", width: "100%" } },
            React.createElement(ej2_react_charts_1.ChartComponent, { id: 'colChart', style: { textAlign: "center" }, load: this.Chartload.bind(this), legendSettings: { visible: false }, primaryXAxis: { valueType: 'Category', interval: 1, majorGridLines: { width: 0 } }, primaryYAxis: {
                    majorGridLines: { width: 0 },
                    majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelStyle: { color: 'transparent' }
                }, chartArea: { border: { width: 0 } }, tooltip: { enable: true } },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Category, ej2_react_charts_1.DataLabel] }),
                React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: [{ x: 'Jan', y: 46 }, { x: 'Feb', y: 27 }, { x: 'Mar', y: 26 }], xName: 'x', yName: 'y', name: 'Desktop', type: 'Column', marker: { dataLabel: { visible: false, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } } }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: [{ x: 'Jan', y: 37 }, { x: 'Feb', y: 23 }, { x: 'Mar', y: 18 }], xName: 'x', yName: 'y', name: 'Mobile', type: 'Column', marker: { dataLabel: { visible: false, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }, fill: '#e56691' }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: [{ x: 'Jan', y: 38 }, { x: 'Feb', y: 17 }, { x: 'Mar', y: 26 }], xName: 'x', yName: 'y', name: 'Tablet', type: 'Column', marker: { dataLabel: { visible: false, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } } })))));
    };
    SEODashboard.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("div", { className: "control-section", id: "target_dash" },
                React.createElement("div", { className: "col-lg-12 col-sm-12 col-md-12", id: "dashboard_sidebar_section" },
                    React.createElement("div", { id: "analytic_head" },
                        React.createElement("div", { className: "header" },
                            React.createElement("div", { className: "menu" },
                                React.createElement("span", { className: "e-icons expand" })),
                            React.createElement("div", { className: "searchContent" },
                                React.createElement("div", { className: "analysis" }, "SEO Analysis Dashboard")),
                            React.createElement("div", { className: "right-content" },
                                React.createElement("div", { className: "information" },
                                    React.createElement("span", { className: "e-avatar e-avatar-medium e-avatar-circle image" }),
                                    React.createElement("div", { className: "text-content" }, "John"))))),
                    React.createElement(ej2_react_navigations_1.SidebarComponent, { id: "dockSideDash", type: "Over", dockSize: "60px", enableDock: true, closeOnDocumentClick: true, target: "#analytic_target" },
                        React.createElement("div", { className: "content-area" },
                            React.createElement("div", { className: "dock" },
                                React.createElement("ul", null,
                                    React.createElement("li", { className: "sidebar-item" },
                                        React.createElement("span", { className: "e-icons home" })),
                                    React.createElement("li", { className: "sidebar-item filterHover" },
                                        React.createElement("span", { className: "e-icons filter" })),
                                    React.createElement("li", { className: "sidebar-item" },
                                        React.createElement("span", { className: "e-icons analyticsChart" })),
                                    React.createElement("li", { className: "sidebar-item" },
                                        React.createElement("span", { className: "e-icons settings" })),
                                    React.createElement("li", { className: "sidebar-item" },
                                        React.createElement("span", { className: "e-icons analytics" })))))),
                    React.createElement("div", { id: "analytic_target" },
                        React.createElement("div", { className: "sidebar-content" },
                            React.createElement("div", { className: "dashboardParent" },
                                React.createElement(ej2_react_layouts_1.DashboardLayoutComponent, { id: "analytic_dashboard", cellAspectRatio: 100 / 85, cellSpacing: this.cellSpacing, columns: 6 },
                                    React.createElement(ej2_react_layouts_1.PanelsDirective, null,
                                        React.createElement(ej2_react_layouts_1.PanelDirective, { sizeX: 2, sizeY: 1, row: 0, col: 0, content: this.card1 }),
                                        React.createElement(ej2_react_layouts_1.PanelDirective, { sizeX: 2, sizeY: 1, row: 0, col: 2, content: this.card2 }),
                                        React.createElement(ej2_react_layouts_1.PanelDirective, { sizeX: 2, sizeY: 1, row: 0, col: 4, content: this.card3 }),
                                        React.createElement(ej2_react_layouts_1.PanelDirective, { sizeX: 2, sizeY: 2, row: 1, col: 0, content: this.pie.bind(this), header: "<div>Active Visitors</div>" }),
                                        React.createElement(ej2_react_layouts_1.PanelDirective, { sizeX: 2, sizeY: 2, row: 1, col: 2, content: this.map.bind(this), header: "<div>Regional Map</div>" }),
                                        React.createElement(ej2_react_layouts_1.PanelDirective, { sizeX: 2, sizeY: 2, row: 1, col: 4, content: this.colChart.bind(this), header: "<div>Visitors by Type</div>" }),
                                        React.createElement(ej2_react_layouts_1.PanelDirective, { sizeX: 2, sizeY: 2, row: 3, col: 0, content: this.pieChart.bind(this), header: "<div>Useage Statistics</div>" }),
                                        React.createElement(ej2_react_layouts_1.PanelDirective, { sizeX: 4, sizeY: 2, row: 3, col: 2, content: this.visitorsChart.bind(this), header: "<div>Traffic History</div>" })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "The following sample demonstrates the usecase of DashboardLayout component in realtime SEO data analysis.")),
            React.createElement("div", { id: "description" }, "The sample demonstrates the realtime SEO data analytics dashboard layout.")));
    };
    return SEODashboard;
}(sample_base_1.SampleBase));
exports.SEODashboard = SEODashboard;
