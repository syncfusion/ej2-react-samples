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
require("./sample.css");
var MasterDetail = /** @class */ (function (_super) {
    __extends(MasterDetail, _super);
    function MasterDetail() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.key = null;
        _this.detail = [];
        _this.names = ['AROUT', 'BERGS', 'BLONP', 'CHOPS', 'ERNSH'];
        _this.master = data_1.customerData.filter(function (e) { return _this.names.indexOf(e.CustomerID) !== -1; });
        return _this;
    }
    ;
    MasterDetail.prototype.rowselect = function (args) {
        var selRecord = args.data;
        var selecteMessage = document.getElementsByClassName('e-statustext')[0];
        var message = selecteMessage.querySelector('b');
        message.textContent = selRecord.ContactName;
        this.detailGrid.dataSource = data_1.data.filter(function (record) { return record.CustomerName === selRecord.ContactName; }).slice(0, 5);
    };
    MasterDetail.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_grids_1.GridComponent, { dataSource: this.master, selectedRowIndex: 2, rowSelected: this.rowselect.bind(this) },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ContactName', headerText: 'Customer Name', width: '150' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CompanyName', headerText: 'Company Name', width: '150' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Address', headerText: 'Address', width: '150' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Country', headerText: 'Country', width: '130' })),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Selection] })),
                React.createElement("div", { className: 'e-statustext' },
                    " Showing orders of Customer:  ",
                    React.createElement("b", null)),
                React.createElement(ej2_react_grids_1.GridComponent, { dataSource: this.detail, allowSelection: false, ref: function (grid) { return _this.detailGrid = grid; } },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '100' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '100', format: 'C2', type: 'number' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipName', headerText: 'Ship Name', width: '150' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCountry', headerText: 'Ship Country', width: '150' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipAddress', headerText: 'Ship Address', width: '150' })))),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null, "Master-Detail Grid is a use case scenario, in which the details of a Master Grid record, is viewed in a separate Grid(Detail Grid) by clicking the particular row."),
                React.createElement("p", null, "The steps to achieve this scenario is as follows,"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        " Get the selected record of Master Grid in the ",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#rowselected--emittyperowselecteventargs" }, "rowSelected")),
                        " event."),
                    React.createElement("li", null,
                        " Filter the data based on the selected record and bind the result to the Detail Grid`s ",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#datasource-object---datamanager" }, "dataSource")),
                        " property.")),
                React.createElement("p", null, "The above demo is implemented as follows."),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        "Created a React component named ",
                        React.createElement("code", null, "DetailComponent(ej-griddetail)"),
                        " to show details of selected row from Master Grid."),
                    React.createElement("li", null,
                        "The ",
                        React.createElement("code", null, "DetailComponent"),
                        " has an ",
                        React.createElement("code", null, "Input"),
                        " property ",
                        React.createElement("code", null, "key"),
                        ", based on which the data will be filtered and set to the Detail Grid. Here the ",
                        React.createElement("strong", null, "CustomerID"),
                        " value is used as key value."),
                    React.createElement("li", null,
                        "Created an another React component named ",
                        React.createElement("code", null, "MasterComponent"),
                        " which has Master Grid component with ",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#rowselected--emittyperowselecteventargs" }, "rowSelected")),
                        " event bound to it."),
                    React.createElement("li", null,
                        "The ",
                        React.createElement("code", null, "MasterComponent"),
                        " uses ",
                        React.createElement("code", null, "DetailComponent"),
                        " and it updates ",
                        React.createElement("code", null, "key"),
                        " property when a row is selected in the Master Grid."),
                    React.createElement("li", null, "Now based on the key value, the data is filtered and the Detail Grid is updated with the filtered data.")),
                React.createElement("p", null,
                    "Use ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#selectedrowindex-number" }, "selectedRowIndex")),
                    " to select a row at the initial rendering."),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
                React.createElement("p", null,
                    "Grid component features are segregated into individual feature-wise modules. To implement this use case, the selection feature need to be enabled and also we need to inject",
                    React.createElement("code", null, "Selection"),
                    " module into the ",
                    React.createElement("code", null, "services"),
                    "."))));
    };
    return MasterDetail;
}(sample_base_1.SampleBase));
exports.MasterDetail = MasterDetail;
