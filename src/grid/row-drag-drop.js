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
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var Source = (function (_super) {
    __extends(Source, _super);
    function Source() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = data_1.orderDetails;
        _this.rowDropSettings = { targetID: 'DestGrid' };
        _this.srcSelectionSettings = { type: 'Multiple' };
        _this.destSelectionSettings = { type: 'Multiple' };
        _this.rowDropSettings2 = { targetID: 'Grid' };
        return _this;
    }
    Source.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("p", null, "Drag and Drop Rows between two Grids"),
                React.createElement("div", { style: { display: 'inline-block' } },
                    React.createElement("div", { style: { float: 'left', width: '49%' } },
                        React.createElement(ej2_react_grids_1.GridComponent, { id: "Grid", dataSource: this.data, allowPaging: true, pageSettings: { pageCount: 1 }, allowRowDragAndDrop: true, rowDropSettings: this.rowDropSettings, selectionSettings: this.srcSelectionSettings },
                            React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '120', textAlign: 'Right' }),
                                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Customer Name', width: '130' }),
                                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '120', format: 'C2', textAlign: 'Right' })),
                            React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Page, ej2_react_grids_1.RowDD] }))),
                    React.createElement("div", { style: { float: 'Right', width: '49%' } },
                        React.createElement(ej2_react_grids_1.GridComponent, { id: "DestGrid", allowPaging: true, pageSettings: { pageCount: 2 }, allowRowDragAndDrop: true, rowDropSettings: this.rowDropSettings2, selectionSettings: this.destSelectionSettings },
                            React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '120', textAlign: 'Right' }),
                                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Customer Name', width: '130' }),
                                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '120', format: 'C2', textAlign: 'Right' })),
                            React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Page, ej2_react_grids_1.RowDD] }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the Grid component with the row drag and drop feature. Drag and drop rows between Grids to move rows.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "Grid rows can be dragged and dropped to another Grid or custom controlled by enabling ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#allowrowdraganddrop-boolean" }, "allowRowDragAndDrop")),
                    " property. The target control on which the Grid rows has to be dropped can be set by using ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#rowdropsettings-rowdropsettingsmodel" }, "rowDropSettings->targetID")),
                    " property."),
                React.createElement("p", null, "The Selection feature should be enabled to select the rows. Multiple rows can be selected by simply clicking and dragging inside the Grid."),
                React.createElement("p", null, "In this demo, we have demonstrated how to drag and drop the rows between Grids. Row drag and drop feature is enabled in both the Grids. To drag and drop rows between Grids select rows, drag and drop them in the adjacent Grid."),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module:"),
                React.createElement("p", null,
                    "Grid component features are segregated into individual feature-wise modules. To use row, drag and drop feature we need to inject",
                    React.createElement("code", null, "RowDD"),
                    " module into the ",
                    React.createElement("code", null, "services"),
                    ". Since the selection feature is required to select rows, we also need to inject the ",
                    React.createElement("code", null, "Selection"),
                    " module."),
                React.createElement("p", null,
                    "More information on the row drag and drop can be found in this",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#rowdropsettings-rowdropsettingsmodel" }, "documentation section"),
                    "."))));
    };
    return Source;
}(sample_base_1.SampleBase));
exports.Source = Source;
