"use strict";
/**
 * ListView CallHistory Sample
 */
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
var ej2_react_lists_1 = require("@syncfusion/ej2-react-lists");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var listData_1 = require("./listData");
require("./call-history.css");
var CallHistory = (function (_super) {
    __extends(CallHistory, _super);
    function CallHistory() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //Map the appropriate columns to fields property
        _this.fields = { text: 'text', groupBy: 'category' };
        _this.styleNone = { display: "none" };
        _this.listObjects = [];
        _this.headerText = [
            { "text": "All" },
            { "text": "Received" },
            { "text": "Missed" }
        ];
        _this.type = ['', 'received', 'missed'];
        return _this;
    }
    // Set customized list template
    CallHistory.prototype.listTemplate = function (data) {
        return (React.createElement("div", { className: "e-list-wrapper e-list-avatar e-list-multi-line" },
            React.createElement("span", { className: "e-avatar e-icon" }),
            React.createElement("span", { className: "e-list-item-header" }, data.text),
            " ",
            React.createElement("span", { className: data.type + " e-list-content" },
                data.group,
                ", ",
                data.time)));
    };
    // EventHandler to filter data while selecting tab
    CallHistory.prototype.filterData = function (dataSource, value) {
        var newData = [];
        dataSource.filter(function (data) {
            if ((data.id).indexOf(value) !== -1) {
                newData.push(data);
            }
        });
        return newData;
    };
    // EventHandler to check the device mode
    CallHistory.prototype.onCreated = function () {
        if (!ej2_base_1.Browser.isDevice) {
            document.getElementsByClassName('layoutWrapper')[0].classList.add('e-device-layout');
        }
        else {
            document.getElementsByClassName('tabContainer')[0].classList.add('e-visbile-layer');
        }
    };
    // EventHandler to select the tab
    CallHistory.prototype.selectedHanlder = function (args) {
        if (this.allInstance !== undefined) {
            this.listObjects = [this.allInstance, this.receivedInstance, this.missedInstance];
            var newData = void 0;
            newData = this.filterData(listData_1.callHistoryData, this.type[args.selectedIndex]); // Filter the data while selecting tab
            this.listObjects[args.selectedIndex].dataSource = newData; // Append the filtered data
        }
    };
    CallHistory.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'slider-call-history col-lg-12 control-section' },
                React.createElement("div", { className: "layoutWrapper" },
                    React.createElement("div", { className: "speaker" },
                        React.createElement("div", { className: "camera" })),
                    React.createElement("div", { className: "layout" },
                        React.createElement("div", { id: "list-container" },
                            React.createElement("div", { className: "tabContainer" },
                                React.createElement(ej2_react_navigations_1.TabComponent, { id: "tab", ref: function (tab) { return _this.tab = tab; }, selected: this.selectedHanlder.bind(this), created: this.onCreated },
                                    React.createElement(ej2_react_navigations_1.TabItemsDirective, null,
                                        React.createElement(ej2_react_navigations_1.TabItemDirective, { header: this.headerText[0], content: "#all" }),
                                        React.createElement(ej2_react_navigations_1.TabItemDirective, { header: this.headerText[1], content: "#received" }),
                                        React.createElement(ej2_react_navigations_1.TabItemDirective, { header: this.headerText[2], content: "#missed" })))),
                            React.createElement(ej2_react_lists_1.ListViewComponent, { id: "all", dataSource: listData_1.callHistoryData, fields: this.fields, style: this.styleNone, cssClass: 'e-list-template', template: this.listTemplate, ref: function (listview) { _this.allInstance = listview; } }),
                            React.createElement(ej2_react_lists_1.ListViewComponent, { id: "received", dataSource: listData_1.callHistoryData, fields: this.fields, style: this.styleNone, cssClass: 'e-list-template', template: this.listTemplate, ref: function (listview) { _this.receivedInstance = listview; } }),
                            React.createElement(ej2_react_lists_1.ListViewComponent, { id: "missed", dataSource: listData_1.callHistoryData, fields: this.fields, style: this.styleNone, cssClass: 'e-list-template', template: this.listTemplate, ref: function (listview) { _this.missedInstance = listview; } }))),
                    React.createElement("div", { className: "outerButton" }, " "))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the call history application using listview. Click on the checklist to filter the data in contacts list.")),
            React.createElement("div", { id: "description", className: "descriptionLayout" },
                React.createElement("p", null,
                    "This sample filters out the data from listview based on the data selected from the checklist. Here, listview utilizes the",
                    React.createElement("code", null, "template"),
                    React.createElement("code", null, "showIcon"),
                    " properties to repesent the call history application. The Tab component is used in this sample for navigation purposes."))));
    };
    return CallHistory;
}(sample_base_1.SampleBase));
exports.CallHistory = CallHistory;
