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
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
require("./sample.css");
var Clipboard = (function (_super) {
    __extends(Clipboard, _super);
    function Clipboard() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.selectionsettings = { type: 'Multiple' };
        _this.toolbarOptions = [{ text: 'Copy', tooltipText: 'Copy', prefixIcon: 'e-copy', id: 'copy' }, { text: 'Copy With Header', tooltipText: 'Copy With Header', prefixIcon: 'e-copy', id: 'copyHeader' }];
        _this.visible = false;
        _this.animationSettings = { effect: 'None' };
        _this.alertButtons = [{
                // Click the footer buttons to hide the Dialog
                click: function () {
                    _this.alertDialogInstance.hide();
                },
                buttonModel: { content: 'OK', isPrimary: true }
            }];
        return _this;
    }
    Clipboard.prototype.clickHandler = function (args) {
        if (this.gridInstance.getSelectedRecords().length > 0) {
            var withHeader = false;
            if (args.item.id === 'copyHeader') {
                withHeader = true;
            }
            this.gridInstance.copy(withHeader);
        }
        else {
            this.alertDialogInstance.show();
        }
    };
    Clipboard.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.data, ref: function (grid) { return _this.gridInstance = grid; }, enableHover: false, allowPaging: true, pageSettings: { pageCount: 5 }, selectionSettings: this.selectionsettings, toolbar: this.toolbarOptions, toolbarClick: this.clickHandler.bind(this) },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '120', textAlign: "Right" }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Customer Name', width: '150' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderDate', headerText: 'Order Date', width: '130', format: 'yMd', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '120', format: 'C2', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShippedDate', headerText: 'Shipped Date', width: '130', format: "yMd", textAlign: "Right" })),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Page, ej2_react_grids_1.Selection, ej2_react_grids_1.Toolbar] }))),
            React.createElement(ej2_react_popups_1.DialogComponent, { id: "alertDialog", header: 'Copy with Header', visible: this.visible, animationSettings: this.animationSettings, width: '300px', content: 'Atleast one row should be selected to copy with header', ref: function (alertdialog) { return _this.alertDialogInstance = alertdialog; }, target: '.control-section', buttons: this.alertButtons }),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates copy to clipboard functionality of the Grid component. Select rows and click Copy button from toolbar to copy content. To copy with header click Copy with header button from toolbar.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Selected rows or cells data in the Grid can be copied into the clipboard using the Keyboard shortcuts and ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-grid.html#copy" }, "copy")),
                    " method."),
                React.createElement("p", null, "In this demo, selected rows data can be copied into the clipboard using the below Keyboard shortcuts or toolbar interactions."),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Ctrl + C"),
                        " - Selected rows or cells data without header."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Ctrl + Shift + H"),
                        " - Selected rows or cells data with header.")),
                React.createElement("p", null,
                    "More information on the Clipboard feature can be found in this ",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/grid/clipboard.html" }, "documentation section"),
                    "."))));
    };
    return Clipboard;
}(sample_base_1.SampleBase));
exports.Clipboard = Clipboard;
