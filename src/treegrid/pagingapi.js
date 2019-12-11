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
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var data_1 = require("./data");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var PagingAPI = /** @class */ (function (_super) {
    __extends(PagingAPI, _super);
    function PagingAPI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = [
            { id: 'All', type: 'All' },
            { id: 'Root', type: 'Root' }
        ];
        return _this;
    }
    PagingAPI.prototype.onChange = function (args) {
        this.treegridObj.allowPaging = args.checked;
        this.toggleInputs(this.treegridObj.allowPaging, true);
    };
    PagingAPI.prototype.changeNum = function () {
        this.pageSizeObj.value = this.pageSizeObj.value > this.treegridObj.pageSettings.totalRecordsCount ?
            this.treegridObj.pageSettings.totalRecordsCount : this.pageSizeObj.value;
        this.treegridObj.pageSettings.pageSize = this.pageSizeObj.value;
        this.currentPageObj.max = Math.ceil(this.treegridObj.pageSettings.totalRecordsCount / this.treegridObj.pageSettings.pageSize);
    };
    PagingAPI.prototype.countChange = function () {
        this.pageCountObj.value = this.pageCountObj.value > 8 ? 8 : this.pageCountObj.value;
        this.treegridObj.pageSettings.pageCount = this.pageCountObj.value;
    };
    PagingAPI.prototype.currentPageChange = function () {
        this.currentPageObj.value = this.currentPageObj.value > this.currentPageObj.max ? this.currentPageObj.max : this.currentPageObj.value;
        var pageNumber = this.currentPageObj.value;
        this.treegridObj.goToPage(pageNumber);
    };
    PagingAPI.prototype.change = function (args) {
        var type = ej2_react_grids_1.getObject('value', args);
        if (type === 'Root') {
            this.treegridObj.pageSettings = { pageSizeMode: 'Root', pageSize: 2 };
        }
        else {
            this.treegridObj.pageSettings = { pageSizeMode: 'All', pageSize: this.pageSizeObj.value };
        }
        this.toggleInputs(type === 'All');
    };
    PagingAPI.prototype.toggleInputs = function (state, isPager) {
        if (!ej2_base_1.isNullOrUndefined(isPager)) {
            var element = document.getElementsByClassName('con-prop1')[0];
            element.style.display = state ? 'table-row' : 'none';
        }
        var flag = this.sizemodeObj.value === 'All';
        var elem = document.getElementsByClassName('con-prop2');
        for (var i = 0; i < elem.length; i++) {
            var element = elem[i];
            element.style.display = state && flag ? 'table-row' : 'none';
        }
    };
    PagingAPI.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-md-9' },
                    React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, treeColumnIndex: 1, childMapping: 'subtasks', allowPaging: 'true', ref: function (treegrid) { return _this.treegridObj = treegrid; }, pageSettings: { pageCount: 2 } },
                        React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskID', headerText: 'Task ID', width: '80', textAlign: 'Right' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskName', headerText: 'Task Name', width: '200' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'startDate', headerText: 'Start Date', width: '100', type: 'date', format: 'yMd', textAlign: 'Right' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'duration', headerText: 'Duration', width: '90', textAlign: 'Right' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'progress', headerText: 'progress', width: '90', textAlign: 'Right' })),
                        React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Page] }))),
                React.createElement("div", { className: 'col-md-3 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", null, " Allow Paging ")),
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: true, change: this.onChange.bind(this) })))),
                            React.createElement("tr", { className: 'con-prop1' },
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", { style: { paddingTop: '7px' } }, " Page Size Mode ")),
                                React.createElement("td", { style: { width: '50%', paddingTop: '10px 10px 10px 0px' } },
                                    React.createElement("div", { id: 'dropdown' },
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "90px", id: "sizemode", change: this.change.bind(this), dataSource: this.type, fields: { text: 'type', value: 'id' }, value: "All", ref: function (dropdown) { return _this.sizemodeObj = dropdown; } })))),
                            React.createElement("tr", { className: 'con-prop2' },
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", { style: { paddingTop: '7px' } }, " Page Size ")),
                                React.createElement("td", { style: { width: '50%', paddingTop: '10px 10px 10px 0px' } },
                                    React.createElement("div", { id: 'numericbox' },
                                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: 'pagesize', format: '##', min: 1, max: 200, value: 12, width: '110px', ref: function (numeric) { return _this.pageSizeObj = numeric; }, change: this.changeNum.bind(this) })))),
                            React.createElement("tr", { className: 'con-prop2' },
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", { style: { paddingTop: '7px' } }, " Page Count ")),
                                React.createElement("td", { style: { width: '50%', paddingTop: '10px 10px 10px 0px' } },
                                    React.createElement("div", { id: 'numericbox' },
                                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: 'pagecount', format: '##', min: 1, max: 4, value: 2, width: '110px', ref: function (numeric) { return _this.pageCountObj = numeric; }, change: this.countChange.bind(this) })))),
                            React.createElement("tr", { className: 'con-prop2' },
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", { style: { paddingTop: '7px' } }, " Current Page ")),
                                React.createElement("td", { style: { width: '50%', paddingTop: '10px 10px 10px 0px' } },
                                    React.createElement("div", { id: 'numericbox' },
                                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: 'currentpage', format: '##', min: 1, max: 17, value: 1, width: '110px', ref: function (numeric) { return _this.currentPageObj = numeric; }, change: this.currentPageChange.bind(this) })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the usage of paging API in TreeGrid. In this sample, use the properties panel to change the page size mode, page size, page count and current page of the TreeGrid.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Paging allows you to display the contents of the TreeGrid in page segments. The number of items on a page is determined by the ",
                    React.createElement("code", null, "pageSettings->pageSize"),
                    " property. If no value is specified for the ",
                    React.createElement("code", null, "pageSettings->pageSize"),
                    " property, the TreeGrid will display 12 items on a page. By default, paging is disabled. To enable paging, set ",
                    React.createElement("code", null, "allowPaging"),
                    " property to true."),
                React.createElement("p", null, "In this demo,"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        "Click the ",
                        React.createElement("strong", null, "Allow Paging"),
                        " check box to enable/disable paging feature."),
                    React.createElement("li", null,
                        "Change the value of ",
                        React.createElement("strong", null, "Page Size Mode"),
                        " Dropdown to change ",
                        React.createElement("code", null, "pageSettings->pageSizeMode.")),
                    React.createElement("li", null,
                        "Change the value of ",
                        React.createElement("strong", null, "Page Size"),
                        " textbox to change ",
                        React.createElement("code", null, "pageSettings->pageSize.")),
                    React.createElement("li", null,
                        "Change the value of ",
                        React.createElement("strong", null, "Page Count"),
                        " textbox to change ",
                        React.createElement("code", null, "pageSettings->pageCount.")),
                    React.createElement("li", null,
                        "Change the value of ",
                        React.createElement("strong", null, "Current Page"),
                        " textbox to change",
                        React.createElement("code", null, " pageSettings->currentPage."))),
                React.createElement("p", null, "Injecting Module:"),
                React.createElement("p", null,
                    "TreeGrid features are segregated into individual feature-wise modules. To use paging feature, we need to inject",
                    React.createElement("code", null, "Page"),
                    " module into the ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null, "More information on the paging configuration can be found in the  documentation section."))));
    };
    return PagingAPI;
}(sample_base_1.SampleBase));
exports.PagingAPI = PagingAPI;
