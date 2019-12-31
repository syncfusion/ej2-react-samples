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
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_data_1 = require("@syncfusion/ej2-data");
var sample_base_1 = require("../common/sample-base");
var data = require("./dataSource.json");
require("./drag-and-drop.css");
var DragAndDrop = (function (_super) {
    __extends(DragAndDrop, _super);
    function DragAndDrop() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dataA = new ej2_data_1.DataManager({
            json: data["dragAndDropA"]
        });
        _this.dataB = new ej2_data_1.DataManager({
            json: data["dragAndDropB"]
        });
        _this.fields = { text: 'Name' };
        _this.modifiedDataA = { addedRecords: [], deletedRecords: [], changedRecords: [] };
        _this.modifiedDataB = { addedRecords: [], deletedRecords: [], changedRecords: [] };
        return _this;
    }
    DragAndDrop.prototype.saveChanges = function () {
        this.dataA.saveChanges(this.modifiedDataA, this.fields.text);
        this.dataB.saveChanges(this.modifiedDataB, this.fields.text);
        this.modifiedDataA.addedRecords = [];
        this.modifiedDataB.addedRecords = [];
    };
    DragAndDrop.prototype.onDropGroupA = function (args) {
        var _this = this;
        args.items.forEach(function (item) {
            if (!_this.listObj1.getDataByValue(item[_this.fields.text])) {
                _this.modifiedDataB.addedRecords.push(item);
                _this.modifiedDataA.deletedRecords.push(item);
            }
        });
    };
    DragAndDrop.prototype.onDropGroupB = function (args) {
        var _this = this;
        args.items.forEach(function (item) {
            if (!_this.listObj2.getDataByValue(item[_this.fields.text])) {
                _this.modifiedDataA.addedRecords.push(item);
                _this.modifiedDataB.deletedRecords.push(item);
            }
        });
    };
    DragAndDrop.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'col-lg-12 control-section', style: { minHeight: '450px' } },
                React.createElement("div", { id: "drag-drop-wrapper" },
                    React.createElement("div", { className: "listbox-control" },
                        React.createElement("h4", null, "Group A"),
                        React.createElement(ej2_react_dropdowns_1.ListBoxComponent, { ref: function (scope) { _this.listObj1 = scope; }, dataSource: this.dataA, scope: "combined-list", height: "330px", allowDragAndDrop: true, fields: this.fields, drop: this.onDropGroupA.bind(this) })),
                    React.createElement("span", { className: "e-swap-icon" }),
                    React.createElement("div", { className: "listbox-control" },
                        React.createElement("h4", null, "Group B"),
                        React.createElement(ej2_react_dropdowns_1.ListBoxComponent, { ref: function (scope) { _this.listObj2 = scope; }, dataSource: this.dataB, scope: "combined-list", height: "330px", allowDragAndDrop: true, fields: this.fields, drop: this.onDropGroupB.bind(this) }),
                        React.createElement("button", { className: "e-btn", onClick: this.saveChanges.bind(this) }, "Update")))),
            React.createElement("div", { id: 'action-description' },
                React.createElement("p", null, "This sample demonstrates the drag and drop functionalities of a ListBox. Drag an item or a group of selected items and drop it within the same list box or into another list box.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null, "The ListBox component allows the user to drag and drop a desired item from one list box into another list box. The drag and drop feature can be enabled by using the following properties,"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        "To drag and drop a desired item within the ListBox, the ",
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/list-box/#allowdraganddrop" },
                            React.createElement("code", null, "allowDragAndDrop")),
                        " property should be set to ",
                        React.createElement("code", null, "true.")),
                    React.createElement("li", null,
                        "To drag and drop between two listboxes, the ",
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/list-box/#scope" },
                            React.createElement("code", null, "scope")),
                        " property should be set to both the listboxes.")),
                React.createElement("p", null,
                    "In this sample, a list of countries is loaded in Group A and another list of countries is loaded in Group B. You can drag and drop an item or multiple items from Group A to Group B, and vice versa. By clicking update button, user can save the changes to the corresponding JSON using Datamanager ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/data/dataManager/#savechanges" },
                        React.createElement("code", null, "saveChanges")),
                    " method."),
                React.createElement("p", null,
                    "More information about drag and drop functionalities in the ListBox can be found in the",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/list-box/", target: "_blank" }, " documentation"),
                    " section."))));
    };
    return DragAndDrop;
}(sample_base_1.SampleBase));
exports.DragAndDrop = DragAndDrop;
