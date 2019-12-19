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
var DragWithinGrid = (function (_super) {
    __extends(DragWithinGrid, _super);
    function DragWithinGrid() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DragWithinGrid.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.orderDetails, allowRowDragAndDrop: true, height: '400', selectionSettings: { type: 'Multiple' } },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', isPrimaryKey: true, headerText: 'Order ID', width: '120', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Customer Name', width: '150' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderDate', headerText: 'Order Date', width: '100', format: 'yMd', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '120', format: 'C2', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCity', headerText: 'Ship City', width: '150' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCountry', headerText: 'Ship Country', width: '150' })),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.RowDD, ej2_react_grids_1.Selection] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the Grid component with the row drag and drop feature within same grid. You can rearrange the grid rows by using drag icon in left side of grid column.Here you can drag and drop the grid rows between the decided rows.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Row drag and drop enabled by settting",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/documentation/grid/api-grid.html#allowrowdraganddrop-boolean" }, "allowRowDragAndDrop")),
                    " property as true."),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module:"),
                React.createElement("p", null,
                    "Grid features are segregated into individual feature-wise modules. To use row, drag and drop feature we need to inject",
                    React.createElement("code", null, "RowDD"),
                    " module using the ",
                    React.createElement("code", null, "Grid.Inject(RowDD)"),
                    " section."))));
    };
    return DragWithinGrid;
}(sample_base_1.SampleBase));
exports.DragWithinGrid = DragWithinGrid;
