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
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_calendars_1 = require("@syncfusion/ej2-react-calendars");
var ej2_inputs_1 = require("@syncfusion/ej2-inputs");
var sample_base_1 = require("../common/sample-base");
require("./components-dialog.css");
var data_1 = require("./data");
var ComponentsDialog = (function (_super) {
    __extends(ComponentsDialog, _super);
    function ComponentsDialog(props) {
        var _this = _super.call(this, props) || this;
        _this.data1 = [
            { x: new Date(2005, 0, 1), y: 21 }, { x: new Date(2006, 0, 1), y: 24 },
            { x: new Date(2007, 0, 1), y: 36 }, { x: new Date(2008, 0, 1), y: 38 },
            { x: new Date(2009, 0, 1), y: 54 }, { x: new Date(2010, 0, 1), y: 57 },
            { x: new Date(2011, 0, 1), y: 70 }
        ];
        _this.data2 = [
            { x: new Date(2005, 0, 1), y: 28 }, { x: new Date(2006, 0, 1), y: 44 },
            { x: new Date(2007, 0, 1), y: 48 }, { x: new Date(2008, 0, 1), y: 50 },
            { x: new Date(2009, 0, 1), y: 66 }, { x: new Date(2010, 0, 1), y: 78 }, { x: new Date(2011, 0, 1), y: 84 }
        ];
        _this.headerText = [
            { "text": "Grid" },
            { "text": "Scheduler" },
            { "text": "Chart" },
            { "text": "Rich Text Editor" },
            { "text": "Form" }
        ];
        _this.state = {
            hideDialog: true
        };
        _this.buttonRef = function (element) {
            _this.buttonEle = element;
        };
        _this.buttons = [{
                click: function () {
                    _this.dialogInstance.hide();
                },
                buttonModel: {
                    content: 'OK',
                    isPrimary: true
                }
            },
            {
                click: function () {
                    _this.dialogInstance.hide();
                },
                buttonModel: {
                    content: 'CANCEL',
                }
            }];
        _this.animationSettings = { effect: 'None' };
        return _this;
    }
    ComponentsDialog.prototype.floatFocus = function (args) {
        args.target.parentElement.classList.add('e-input-focus');
    };
    ComponentsDialog.prototype.floatBlur = function (args) {
        args.target.parentElement.classList.remove('e-input-focus');
    };
    ComponentsDialog.prototype.onSubmitClick = function () {
        if (this.formObject.validate()) {
            this.formObject.element.reset();
        }
    };
    ComponentsDialog.prototype.onDragStart = function (args) {
        args.navigation.enable = true;
    };
    ComponentsDialog.prototype.content0 = function () {
        return (React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.gridData, allowPaging: true, pageSettings: { pageSize: 5, pageSizes: true } },
            React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '120', textAlign: 'Right' }),
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Customer Name', width: '150' }),
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderDate', headerText: 'Order Date', width: '130', format: 'yMd', textAlign: 'Right' }),
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '120', format: 'C2', textAlign: 'Right' }),
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShippedDate', headerText: 'Shipped Date', width: '130', format: 'yMd', textAlign: 'Right' }),
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCountry', headerText: 'Ship Country', width: '150' })),
            React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Page] })));
    };
    ComponentsDialog.prototype.content1 = function () {
        var _this = this;
        return (React.createElement(ej2_react_schedule_1.ScheduleComponent, { height: '300px', ref: function (schedule) { return _this.scheduleObj = schedule; }, selectedDate: new Date(2019, 0, 10), eventSettings: { dataSource: data_1.scheduleData }, dragStart: (this.onDragStart.bind(this)) },
            React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Day' }),
                React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Week' }),
                React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'WorkWeek' }),
                React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Month' }),
                React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Agenda' })),
            React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.WorkWeek, ej2_react_schedule_1.Month, ej2_react_schedule_1.Agenda, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })));
    };
    ComponentsDialog.prototype.content2 = function () {
        return (React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', primaryXAxis: {
                valueType: 'DateTime',
                labelFormat: 'y',
                intervalType: 'Years',
                edgeLabelPlacement: 'Shift',
                majorGridLines: { width: 0 }
            }, load: this.load.bind(this), primaryYAxis: {
                labelFormat: '{value}%',
                rangePadding: 'None',
                minimum: 0,
                maximum: 100,
                interval: 20,
                lineStyle: { width: 0 },
                majorTickLines: { width: 0 },
                minorTickLines: { width: 0 }
            }, chartArea: { border: { width: 0 } }, tooltip: { enable: true }, width: ej2_base_1.Browser.isDevice ? '100%' : '60%', title: 'Inflation - Consumer Price', loaded: this.onChartLoad.bind(this) },
            React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_charts_1.LineSeries, ej2_react_charts_1.DateTime, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip] }),
            React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: this.data1, xName: 'x', yName: 'y', name: 'Germany', width: 2, marker: { visible: true, width: 10, height: 10 }, type: 'Line' }),
                React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: this.data2, xName: 'x', yName: 'y', name: 'England', width: 2, marker: { visible: true, width: 10, height: 10 }, type: 'Line' }))));
    };
    ComponentsDialog.prototype.content3 = function () {
        var _this = this;
        return (React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { id: "defaultRTE", ref: function (richtexteditor) { _this.rteObj = richtexteditor; } },
            React.createElement("p", null, "The rich text editor component is WYSIWYG (\"what you see is what you get\") editor that provides the best user experience to create and update the content. Users can format their content using standard toolbar commands."),
            React.createElement("p", null,
                React.createElement("b", null, "Key features:")),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("p", null, "Provides <IFRAME> and <DIV> modes")),
                React.createElement("li", null,
                    React.createElement("p", null, "Capable of handling markdown editing.")),
                React.createElement("li", null,
                    React.createElement("p", null, "Contains a modular library to load the necessary functionality on demand.")),
                React.createElement("li", null,
                    React.createElement("p", null, "Provides a fully customizable toolbar.")),
                React.createElement("li", null,
                    React.createElement("p", null, "Provides HTML view to edit the source directly for developers.")),
                React.createElement("li", null,
                    React.createElement("p", null, "Supports third-party library integration.")),
                React.createElement("li", null,
                    React.createElement("p", null, "Allows preview of modified content before saving it.")),
                React.createElement("li", null,
                    React.createElement("p", null, "Handles images, hyperlinks, video, hyperlinks, uploads, etc.")),
                React.createElement("li", null,
                    React.createElement("p", null, "Contains undo/redo manager.")),
                React.createElement("li", null,
                    React.createElement("p", null, "Creates bulleted and numbered lists."))),
            React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_richtexteditor_1.HtmlEditor, ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.QuickToolbar] })));
    };
    ComponentsDialog.prototype.content4 = function () {
        return (React.createElement("div", { id: "formComponents" },
            React.createElement("h4", { className: "form-title" }, "Add Customer details"),
            React.createElement("div", { className: 'validation_wrapper' },
                React.createElement("form", { id: "formId", className: "form-horizontal" },
                    React.createElement("div", { className: "form-group" },
                        React.createElement("div", { className: "e-float-input" },
                            React.createElement("input", { type: "text", id: "user", name: "user", "data-msg-containerid": "userError" }),
                            React.createElement("span", { className: "e-float-line" }),
                            React.createElement("label", { className: "e-float-text e-label-top", htmlFor: "name" }, "User Name")),
                        React.createElement("div", { id: "userError" })),
                    React.createElement("div", { className: "form-group" },
                        React.createElement("div", { className: "e-float-input" },
                            React.createElement(ej2_react_calendars_1.DatePickerComponent, { placeholder: "Date of Birth", id: "dob", name: "dob", "data-msg-containerid": "dobError" }),
                            React.createElement("span", { className: "e-float-line" })),
                        React.createElement("div", { id: "dobError" })),
                    React.createElement("div", { className: "form-group" },
                        React.createElement("div", { className: "e-float-input" },
                            React.createElement("textarea", { id: "Address", name: "Address" }),
                            React.createElement("span", { className: "e-float-line" }),
                            React.createElement("label", { className: "e-float-text e-label-top", htmlFor: "mobile" }, "Address")),
                        React.createElement("div", { id: "noError" })),
                    React.createElement("div", { className: "form-group" },
                        React.createElement("div", { className: "e-float-input" },
                            React.createElement("input", { type: "text", id: "city", name: "city", "data-msg-containerid": "cityError" }),
                            React.createElement("span", { className: "e-float-line" }),
                            React.createElement("label", { className: "e-float-text e-label-top", htmlFor: "city" }, "City")),
                        React.createElement("div", { id: "cityError" })),
                    React.createElement("div", { className: "form-group" },
                        React.createElement("div", { className: "e-float-input" },
                            React.createElement("input", { type: "text", id: "state", name: "state", "data-msg-containerid": "stateError" }),
                            React.createElement("span", { className: "e-float-line" }),
                            React.createElement("label", { className: "e-float-text e-label-top", htmlFor: "state" }, "State")),
                        React.createElement("div", { id: "stateError" })),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "submitRow" },
                            React.createElement("div", { style: { display: 'inline-block' } },
                                React.createElement("button", { id: "submit-btn", className: "samplebtn e-control e-btn e-primary e-submit-btn", onClick: this.onSubmitClick = this.onSubmitClick.bind(this), type: "submit", "data-ripple": "true" }, "Add Customer")),
                            React.createElement("div", { style: { float: 'right' } },
                                React.createElement("button", { id: "resetbtn", className: "samplebtn e-control e-btn e-reset-btn", type: "reset", "data-ripple": "true" }, "Clear"))))),
                React.createElement("br", null),
                React.createElement("br", null))));
    };
    ComponentsDialog.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    ;
    ComponentsDialog.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    ComponentsDialog.prototype.buttonClick = function () {
        this.setState({ hideDialog: true });
    };
    ComponentsDialog.prototype.dialogClose = function () {
        this.setState({ hideDialog: false });
        this.buttonEle.style.display = "block";
    };
    ComponentsDialog.prototype.dialogOpen = function () {
        this.buttonEle.style.display = "none";
    };
    ComponentsDialog.prototype.rendereComplete = function () {
        var options = {
            // add the rules for validation
            rules: {
                'user': {
                    required: [true, '* Enter your name']
                },
                'dob': {
                    required: [true, '* Enter your date of birth']
                },
                'city': {
                    required: [true, '* Enter your city']
                },
                'state': {
                    required: [true, '* Enter your state']
                },
            }
        };
        // initialize the form validator
        this.formObject = new ej2_inputs_1.FormValidator('#formId', options);
    };
    ComponentsDialog.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { id: 'targetElement', className: 'control-section col-lg-12 defaultDialogComponent dialog-target' },
                React.createElement("button", { className: "e-control e-btn dlgbtn", ref: this.buttonRef, onClick: this.buttonClick.bind(this), id: "dialogBtn" }, " Open"),
                React.createElement(ej2_react_popups_1.DialogComponent, { id: "defaultDialog", showCloseIcon: true, animationSettings: this.animationSettings, visible: this.state.hideDialog, width: '700px', ref: function (dialog) { return _this.dialogInstance = dialog; }, target: '#targetElement', header: 'Syncfusion Components inside Dialog', buttons: this.buttons, open: this.dialogOpen.bind(this), close: this.dialogClose.bind(this) },
                    React.createElement(ej2_react_navigations_1.TabComponent, { id: "tab-wizard", ref: function (tab) { _this.tabObj = tab; } },
                        React.createElement(ej2_react_navigations_1.TabItemsDirective, null,
                            React.createElement(ej2_react_navigations_1.TabItemDirective, { header: this.headerText[0], content: this.content0.bind(this) }),
                            React.createElement(ej2_react_navigations_1.TabItemDirective, { header: this.headerText[1], content: this.content1.bind(this) }),
                            React.createElement(ej2_react_navigations_1.TabItemDirective, { header: this.headerText[2], content: this.content2.bind(this) }),
                            React.createElement(ej2_react_navigations_1.TabItemDirective, { header: this.headerText[3], content: this.content3.bind(this) }),
                            React.createElement(ej2_react_navigations_1.TabItemDirective, { header: this.headerText[4], content: this.content4.bind(this) }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example demonstrates the default rendering of the dialog component with minimum configuration. Click close or press EThis example demonstrates how to integrate other React UI components within the dialog control. In the below example, The dialog component renders with the Grid, Schedule, Chart, Rich Text Editor, Tabs and Form components.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "Since the dialog is container component, you can integrate other React UI components within the dialog. The dialog can be renders with simple plain-text, HTML string, or React UI components. In the above sample, used major components such as Grid, Schedule, Chart, and Rich Text Editor inside dialog."))));
    };
    return ComponentsDialog;
}(sample_base_1.SampleBase));
exports.ComponentsDialog = ComponentsDialog;
