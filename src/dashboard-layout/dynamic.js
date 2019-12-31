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
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
require("./dynamic.css");
var DynamicWidget = (function (_super) {
    __extends(DynamicWidget, _super);
    function DynamicWidget(props) {
        var _this = _super.call(this, props) || this;
        _this.count = 4;
        _this.cellSpacing = [10, 10];
        _this.state = {
            hideDialog: false
        };
        return _this;
    }
    DynamicWidget.prototype.btnClick = function () {
        if (this.btnobj.element.classList.contains('e-active')) {
            this.dashboardObj.allowDragging = true;
            this.dashboardObj.allowResizing = true;
            this.btnobj.content = "Save";
            this.btnobj.iconCss = 'save';
            document.getElementById('dialogBtn').style.display = 'block';
        }
        else {
            this.dashboardObj.allowDragging = false;
            this.dashboardObj.allowResizing = false;
            this.btnobj.content = "Edit";
            this.btnobj.iconCss = 'edit';
            document.getElementById('dialogBtn').style.display = 'none';
        }
    };
    DynamicWidget.prototype.onPanelResize = function (args) {
        if (args.element && args.element.querySelector('.e-panel-container .e-panel-content div div')) {
            var chartObj = (args.element.querySelector('.e-panel-container .e-panel-content div div')).ej2_instances[0];
            chartObj.height = '95%';
            chartObj.width = '100%';
            chartObj.refresh();
        }
    };
    DynamicWidget.prototype.content = function (data) {
        return (React.createElement("div", { id: "dialogcontent" },
            React.createElement("div", null,
                React.createElement("div", { id: "linetemplate" },
                    React.createElement("p", { className: "dialog-text" }, "Linechart (1x1) ")),
                React.createElement("div", { id: "pietemplate" },
                    React.createElement("p", { className: "dialog-text" }, "Piechart (1x1) ")),
                React.createElement("div", { id: "splinetemplate" },
                    React.createElement("p", { className: "dialog-text" }, "Splinechart (2x1) ")))));
    };
    DynamicWidget.prototype.onAdd = function () {
        var proxy = this;
        var panel = [{
                "id": this.count.toString() + "_layout", "sizeX": 2, "sizeY": 2, "row": 0, "col": 0,
                header: "<div>Panel" + this.count.toString() + "</div>", content: "<div></div>"
            }];
        this.count = this.count + 1;
        proxy.dashboardObj.addPanel(panel[0]);
    };
    DynamicWidget.prototype.splineTemplate = function () {
        var splineData1 = [
            { x: new Date(2002, 0, 1), y: 2.2 }, { x: new Date(2003, 0, 1), y: 3.4 },
            { x: new Date(2004, 0, 1), y: 2.8 }, { x: new Date(2005, 0, 1), y: 1.6 },
            { x: new Date(2006, 0, 1), y: 2.3 }, { x: new Date(2007, 0, 1), y: 2.5 },
            { x: new Date(2008, 0, 1), y: 2.9 }, { x: new Date(2009, 0, 1), y: 3.8 },
            { x: new Date(2010, 0, 1), y: 1.4 }, { x: new Date(2011, 0, 1), y: 3.1 }
        ];
        var splineData2 = [
            { x: new Date(2002, 0, 1), y: 2 }, { x: new Date(2003, 0, 1), y: 1.7 },
            { x: new Date(2004, 0, 1), y: 1.8 }, { x: new Date(2005, 0, 1), y: 2.1 },
            { x: new Date(2006, 0, 1), y: 2.3 }, { x: new Date(2007, 0, 1), y: 1.7 },
            { x: new Date(2008, 0, 1), y: 1.5 }, { x: new Date(2009, 0, 1), y: 2.8 },
            { x: new Date(2010, 0, 1), y: 1.5 }, { x: new Date(2011, 0, 1), y: 2.3 }
        ];
        return (React.createElement("div", { className: "template" },
            React.createElement(ej2_react_charts_1.ChartComponent, { style: { "height": "100%", "width": "100%", textAlign: "center" }, primaryXAxis: {
                    valueType: 'DateTime',
                    labelFormat: 'MMM',
                    majorGridLines: { width: 0 },
                    intervalType: 'Months',
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
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: splineData1, xName: 'x', yName: 'y', name: 'Jan', opacity: 0.5, type: 'SplineArea', width: 2, fill: 'rgb(239, 183, 202)' }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: splineData2, xName: 'x', yName: 'y', name: 'Feb', opacity: 0.5, type: 'SplineArea', width: 2, fill: 'rgb(0, 189, 174)' })))));
    };
    DynamicWidget.prototype.lineTemplate = function () {
        var data1 = [{ x: 'Jan', y: 46 }, { x: 'Feb', y: 27 }, { x: 'Mar', y: 26 }];
        var data2 = [{ x: 'Jan', y: 37 }, { x: 'Feb', y: 23 }, { x: 'Mar', y: 18 }];
        var data3 = [{ x: 'Jan', y: 38 }, { x: 'Feb', y: 17 }, { x: 'Mar', y: 26 }];
        return (React.createElement("div", { className: "template" },
            React.createElement(ej2_react_charts_1.ChartComponent, { style: { "height": "100%", "width": "100%" }, primaryXAxis: { valueType: 'Category', interval: 1, majorGridLines: { width: 0 } }, primaryYAxis: {
                    majorGridLines: { width: 0 },
                    majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelStyle: { color: 'transparent' }
                }, chartArea: { border: { width: 0 } }, tooltip: { enable: true } },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Category, ej2_react_charts_1.DataLabel] }),
                React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: data1, xName: 'x', yName: 'y', name: 'Jan', type: 'Column', marker: { dataLabel: { visible: false } }, fill: '#00bdae' }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: data2, xName: 'x', yName: 'y', name: 'Feb', type: 'Column', marker: { dataLabel: { visible: false } }, fill: '#e56691' }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: data3, xName: 'x', yName: 'y', name: 'Mar', type: 'Column', marker: { dataLabel: { visible: false } }, fill: '#357cd2' })))));
    };
    DynamicWidget.prototype.pieTemplate = function () {
        var pieData = [
            { "x": "Jan", y: 12.5, text: "January" },
            { "x": "Feb", y: 25, text: "February" },
            { "x": "Mar", y: 50, text: "March" },
        ];
        var piePalette = ["#00bdaed1", "#357cd2bf", "#e56691e8"];
        return (React.createElement("div", { className: "template" },
            React.createElement(ej2_react_charts_1.AccumulationChartComponent, { style: { "height": "100%", "width": "100%" }, legendSettings: { visible: false }, enableSmartLabels: true, enableAnimation: true, center: { x: '50%', y: '50%' }, tooltip: { enable: true, header: '<b>${point.x}</b>', format: 'Composition : <b>${point.y}%</b>' } },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.AccumulationLegend, ej2_react_charts_1.PieSeries, ej2_react_charts_1.AccumulationTooltip, ej2_react_charts_1.AccumulationDataLabel] }),
                React.createElement(ej2_react_charts_1.AccumulationSeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.AccumulationSeriesDirective, { dataSource: pieData, name: 'Earnings', xName: 'x', yName: 'y', dataLabel: { visible: true, position: 'Inside', name: 'value', font: { fontWeight: '600' } }, radius: '100%', innerRadius: "40%", palettes: ['#00bdae', '#357cd2', '#e56691'] })))));
    };
    DynamicWidget.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement("div", { id: 'edit_target', className: "control-section" },
                React.createElement("div", null,
                    React.createElement("div", { style: { "width": "100%", "height": "30px" } },
                        React.createElement(ej2_react_buttons_1.ButtonComponent, { cssClass: 'e-outline e-flat e-primary', ref: function (scope) { _this.btnobj = scope; }, iconCss: 'edit', isToggle: true, onClick: this.btnClick.bind(this), style: { "float": "right", "width": "75px" } }, "Edit")),
                    React.createElement("div", { style: { "padding": "5px", "text-align": "end" } },
                        React.createElement("div", { id: "dialogBtn", className: "add-widget-button e-control e-btn e-lib", onClick: this.dlgClick.bind(this) }, "Add New Widget"))),
                React.createElement(ej2_react_layouts_1.DashboardLayoutComponent, { id: "edit_dashboard", columns: 2, cellSpacing: this.cellSpacing, ref: function (scope) { _this.dashboardObj = scope; }, resizeStop: this.onPanelResize.bind(this), allowResizing: false, allowDragging: false },
                    React.createElement(ej2_react_layouts_1.PanelsDirective, null,
                        React.createElement(ej2_react_layouts_1.PanelDirective, { sizeX: 1, sizeY: 1, row: 0, col: 0, content: this.lineTemplate, header: "<div>Line Chart</div>" }),
                        React.createElement(ej2_react_layouts_1.PanelDirective, { sizeX: 1, sizeY: 1, row: 0, col: 1, content: this.pieTemplate, header: "<div>Pie Chart</div>" }),
                        React.createElement(ej2_react_layouts_1.PanelDirective, { sizeX: 2, sizeY: 1, row: 1, col: 0, content: this.splineTemplate, header: "<div>Spline Chart</div>" })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "The following sample demonstrates a editable dashboard layout. Initially the DashboardLayout component doesn't allow to ",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/dashboard-layout#allowdragging", target: "_blank" }, "drag"),
                    ",",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/dashboard-layout#allowresizing", target: "_blank" }, "resize"),
                    " or reorder the panels. After clicking the edit button, the layout becomes editable which allows to drag and reorder the panels as per the requirement and also you can add new panels to the layout with predefined templates by clicking the add new button and reorder them by dragging and placing in the required position. Drag and resizing of the panles are not applicable in mobile resolution.")),
            React.createElement("div", { id: "description" }, "The following sample demonstrates about using the dashboard layout as an editable layout."),
            React.createElement(ej2_react_popups_1.DialogComponent, { id: "listdialog", width: "500px", height: "260px", visible: this.state.hideDialog, header: "Add a widget", showCloseIcon: true, animationSettings: { effect: 'Zoom' }, isModal: true, target: '#edit_target', ref: function (scope) { _this.dialogObj = scope; }, content: this.content })));
    };
    DynamicWidget.prototype.dlgClick = function () {
        var _this = this;
        this.setState({ hideDialog: true });
        document.getElementById('linetemplate').onclick = function () {
            var countValue = _this.count.toString();
            var panel = [{
                    'id': '_layout' + countValue, 'sizeX': 1, 'sizeY': 1, 'row': 0, 'col': 0,
                    header: '<div>Line Chart</div>', content: _this.lineTemplate
                }];
            _this.count = _this.count + 1;
            _this.dashboardObj.addPanel(panel[0]);
            _this.setState({ hideDialog: false });
        };
        document.getElementById('pietemplate').onclick = function () {
            var countValue = _this.count.toString();
            var panel = [{
                    'id': '_layout' + countValue, 'sizeX': 1, 'sizeY': 1, 'row': 0, 'col': 0,
                    header: '<div>Pie Chart</div>', content: _this.pieTemplate
                }];
            _this.count = _this.count + 1;
            _this.dashboardObj.addPanel(panel[0]);
            _this.setState({ hideDialog: false });
        };
        document.getElementById('splinetemplate').onclick = function () {
            var countValue = _this.count.toString();
            var panel = [{
                    'id': '_layout' + countValue, 'sizeX': 2, 'sizeY': 1, 'row': 0, 'col': 0,
                    header: '<div>Spline Chart</div>', content: _this.splineTemplate
                }];
            _this.count = _this.count + 1;
            _this.dashboardObj.addPanel(panel[0]);
            _this.setState({ hideDialog: false });
        };
    };
    return DynamicWidget;
}(sample_base_1.SampleBase));
exports.DynamicWidget = DynamicWidget;
