"use strict";
/**
 * ListView Virtualization Sample
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
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_popups_1 = require("@syncfusion/ej2-popups");
var ej2_base_1 = require("@syncfusion/ej2-base");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
require("./virtualization.css");
var UiVirtualization = /** @class */ (function (_super) {
    __extends(UiVirtualization, _super);
    function UiVirtualization() {
        var _this = _super.call(this) || this;
        _this.commonData = [];
        _this.dataSource = {};
        // Set customized list template
        _this.template = '<div class="e-list-wrapper e-list-avatar">' +
            '<span class="e-avatar e-avatar-circle ${icon} ${$imgUrl ? \'hideUI\' : \'showUI\' }">' +
            '${icon}</span> <img class="e-avatar e-avatar-circle ${$imgUrl ? \'showUI\' : \'hideUI\' }" ' +
            'src="${$imgUrl ?  $imgUrl : \' \' }" />' +
            '<span class="e-list-content">${name}</span></div>';
        // Set dropdown list data
        _this.ddlDatasource = [
            { value: '1', text: '1k' },
            { value: '5', text: '5k' },
            { value: '10', text: '10k' },
            { value: '25', text: '25k' }
        ];
        //Map the appropriate columns to DropDownList fields property
        _this.ddlFields = { text: 'text', value: 'value' };
        //Map the appropriate columns to ListView fields property
        _this.fields = { text: 'name' };
        _this.commonData = [
            { name: 'Nancy', icon: 'N', id: '0', },
            { name: 'Andrew', icon: 'A', id: '1' },
            { name: 'Janet', icon: 'J', id: '2' },
            { name: 'Margaret', imgUrl: './src/listview/images/margaret.png', id: '3' },
            { name: 'Steven', icon: 'S', id: '4' },
            { name: 'Laura', imgUrl: './src/listview/images/laura.png', id: '5' },
            { name: 'Robert', icon: 'R', id: '6' },
            { name: 'Michael', icon: 'M', id: '7' },
            { name: 'Albert', imgUrl: './src/listview/images/albert.png', id: '8' },
            { name: 'Nolan', icon: 'N', id: '9' }
        ];
        [[1010, 'data1'], [5010, 'data5'], [10010, 'data10'], [25010, 'data25']].forEach(function (ds) {
            var data = _this.commonData.slice();
            var index;
            var spyIndex;
            for (var i = 10; i <= ds[0]; i++) {
                while (index === spyIndex) {
                    index = parseInt((Math.random() * 10).toString(), 10);
                }
                data.push({ name: data[index].name, icon: data[index].icon, imgUrl: data[index].imgUrl, id: i.toString() });
                spyIndex = index;
            }
            _this.dataSource[ds[1]] = data;
        });
        return _this;
    }
    UiVirtualization.prototype.onActionComplete = function () {
        this.liElement = document.getElementById('ui-list');
        if (ej2_base_1.Browser.isDevice) {
            this.liElement.classList.add('ui-mobile');
        }
        ej2_popups_1.createSpinner({
            target: this.liElement
        });
        this.endTime = new Date();
        document.getElementById('time').innerText = (this.endTime.getTime() - this.startTime.getTime()) + ' ms';
    };
    UiVirtualization.prototype.onActionBegin = function () {
        this.startTime = new Date();
    };
    UiVirtualization.prototype.onChange = function (e) {
        ej2_popups_1.showSpinner(this.liElement);
        this.startTime = new Date();
        this.listviewInstance.dataSource = this.dataSource['data' + e.value];
        this.listviewInstance.dataBind();
        this.endTime = new Date();
        document.getElementById('time').innerText = (this.endTime.getTime() - this.startTime.getTime()) + ' ms';
        ej2_popups_1.hideSpinner(this.liElement);
    };
    UiVirtualization.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'ui-control-section control-section' },
                React.createElement("div", { className: 'col-lg-8' },
                    React.createElement("div", { className: "content-wrapper" },
                        React.createElement(ej2_react_lists_1.ListViewComponent, { id: 'ui-list', dataSource: this.dataSource.data1, enableVirtualization: true, headerTitle: "Contacts", fields: this.fields, cssClass: "e-list-template", height: 500, template: this.template, actionComplete: this.onActionComplete.bind(this), ref: function (listview) { _this.listviewInstance = listview; }, actionBegin: this.onActionBegin.bind(this), showHeader: true },
                            React.createElement(ej2_react_lists_1.Inject, { services: [ej2_react_lists_1.Virtualization] })))),
                React.createElement("div", { id: "#slider_event", className: 'col-lg-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: "Properties", title: "Tooltip", className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: '50%' } },
                                        React.createElement("div", { className: "userselect" }, "Load data")),
                                    React.createElement("td", { style: { width: '50%', paddingRight: '10px' } },
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: 'ddl', dataSource: this.ddlDatasource, fields: this.ddlFields, index: 0, change: this.onChange.bind(this), placeholder: "Select a range", popupHeight: "200px" })))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: '50%' } },
                                        React.createElement("div", { className: "userselect" }, "Time taken")),
                                    React.createElement("td", { style: { width: '50%', paddingRight: '10px' } },
                                        React.createElement("div", { style: { paddingLeft: '10px', paddingTop: '0px' } },
                                            React.createElement("span", { id: "time" }, "0 ms"))))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the default functionalities of UI virtualization. Scroll list item to experience UI virtualization.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "UI virtualization is an optimization technique to avoid unnecessarily constructing and rendering objects for list items by loading only visible list items in a view port. This helps improve list view performance when loading a large number of items. The list items are updated dynamically while users scroll the list. The virtualization can be enabled by using ",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/documentation/list-view/api-listView.html?lang=typescript#enablevirtualization" }, "enablevirtualization"),
                    " API in Listview."))));
    };
    return UiVirtualization;
}(sample_base_1.SampleBase));
exports.UiVirtualization = UiVirtualization;
