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
var Paging = (function (_super) {
    __extends(Paging, _super);
    function Paging() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Paging.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.data, allowPaging: true, height: 365, pageSettings: { pageCount: 4, pageSizes: true } },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '120', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Customer Name', width: '150' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderDate', headerText: 'Order Date', width: '130', format: 'yMd', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '120', format: 'C2', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCountry', headerText: 'Ship Country', width: '170' })),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Page] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the Grid paging feature. In this sample, click the numeric items to navigate to particular page. You can also change the page size using the dropdown.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "Paging allows you to display the contents of the Grid component in page segments. By default, paging is disabled. To enable paging, set ",
                    React.createElement("code", null,
                        React.createElement("a", { target: '_blank', className: 'code', href: 'http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#allowpaging-boolean' }, "allowPaging")),
                    " property to true.",
                    React.createElement("code", null,
                        React.createElement("a", { target: '_blank', className: 'code', href: 'http://ej2.syncfusion.com/react/documentation/grid/api-pageSettings.html#pagesizes-boolean---number' }, "pageSettings->pagesizes")),
                    "property enables a dropdown in pager which allows you to change the number of records in the Grid dynamically."),
                React.createElement("p", null,
                    "In this demo, the Grid is rendered with",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-pageSettings.html#pagesizes-boolean---number" }, "pageSettings->pageSizes")),
                    " set to true and",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-pageSettings.html#pagesizes-boolean---number" }, "pageSettings->pageCount")),
                    " set to 4."),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module:"),
                React.createElement("p", null,
                    "Grid component features are segregated into individual feature-wise modules. To use paging feature, we need to inject ",
                    React.createElement("code", null, "Page"),
                    " module into the ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the paging feature configuration can be found in this",
                    React.createElement("a", { target: '_blank', href: 'http://ej2.syncfusion.com/react/documentation/grid/paging.html' }, " documentation section"),
                    "."))));
    };
    return Paging;
}(sample_base_1.SampleBase));
exports.Paging = Paging;
