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
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_base_1 = require("@syncfusion/ej2-base");
var Print = /** @class */ (function (_super) {
    __extends(Print, _super);
    function Print() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.secondChildGrid = {
            dataSource: data_1.customerData,
            queryString: 'CustomerID',
            columns: [
                { field: 'CustomerID', headerText: 'Customer ID', textAlign: 'Right', width: 75 },
                { field: 'ContactName', headerText: 'Contact Name', width: 100 },
                { field: 'Address', headerText: 'Address', width: 120 },
                { field: 'Country', headerText: 'Country', width: 100 }
            ]
        };
        _this.childGrid = {
            dataSource: data_1.hierarchyOrderdata,
            queryString: 'EmployeeID',
            hierarchyPrintMode: 'All',
            allowPaging: true,
            pageSettings: { pageSize: 6, pageCount: 5 },
            columns: [
                { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120 },
                { field: 'ShipCity', headerText: 'Ship City', width: 120 },
                { field: 'Freight', headerText: 'Freight', width: 120 },
                { field: 'ShipName', headerText: 'Ship Name', width: 150 }
            ],
            childGrid: _this.secondChildGrid
        };
        return _this;
    }
    Print.prototype.click = function (e) {
        var element = e.target;
        if (!element.classList.contains('e-tbar-btn-text') && !element.classList.contains('e-tbar-btn')) {
            return;
        }
        element = (element.tagName === 'BUTTON' ? element.firstElementChild : element);
        ej2_base_1.removeClass([].slice.apply(document.getElementsByClassName('e-ghidden')), 'e-ghidden');
        ej2_base_1.addClass([element.parentElement.parentElement], 'e-ghidden');
        this.grid.hierarchyPrintMode = this.grid.childGrid.hierarchyPrintMode = element.innerHTML;
    };
    Print.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'e-statustext' }, "Select Hierarchy PrintMode"),
                React.createElement(ej2_react_navigations_1.ToolbarComponent, { id: "toolbar", onClick: this.click.bind(this) },
                    React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                        React.createElement(ej2_react_navigations_1.ItemDirective, { text: "Expanded" }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { text: "All", cssClass: "e-ghidden" }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { text: "None" }))),
                React.createElement("br", null),
                React.createElement(ej2_react_grids_1.GridComponent, { ref: function (r) { return _this.grid = r; }, dataSource: data_1.employeeData, childGrid: this.childGrid, toolbar: ['Print'], allowSorting: true, hierarchyPrintMode: 'All' },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'EmployeeID', headerText: 'Employee ID', width: '125', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FirstName', headerText: 'Name', width: '125' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Title', headerText: 'Title', width: '180' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'HireDate', headerText: 'Hire Date', width: '135', format: 'yMd', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ReportsTo', headerText: 'Reports To', width: '135', textAlign: 'Right' })),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.DetailRow, ej2_react_grids_1.Toolbar, ej2_react_grids_1.Sort] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the different options to print the hierarchy Grid. Select the hierarchy grid's print mode in the toobar and click the print button from the grids's toolbar item to print Grid.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The Grid can be printed using the ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/api/grid#print" }, "print")),
                    " method. While printing the pager and scrollbar will be removed if they are enabled in Grid. By default, all pages will be printed. We can print current page alone by setting the ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/api/grid#printmode" }, "printMode")),
                    " property value as ",
                    React.createElement("code", null, "currentpage"),
                    ". The child grid allows us to print the grid with following options,"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Expanded"),
                        " - Prints the master grid with expanded child grids."),
                    React.createElement("li", null,
                        React.createElement("code", null, "All"),
                        " - Prints the master grid with all the child grids."),
                    React.createElement("li", null,
                        React.createElement("code", null, "None"),
                        " - Prints the master grid alone.")),
                React.createElement("p", null,
                    "We can change the child grid's print option by using the ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/api/grid#hierarchyprintmode" }, "hierarchyPrintMode")),
                    " property."),
                React.createElement("p", null,
                    "In this demo, we have set the hierarchyPrintMode as",
                    React.createElement("code", null, "All"),
                    ". You can change the hierarchy grid's print mode by selecting the toolbar and click the print icon to print the Grid."),
                React.createElement("p", { style: { fontWeight: 500 } }, " Injecting Module: "),
                React.createElement("p", null,
                    "Grid features are segregated into individual feature-wise modules, To use Hierarchy Grid feature, we need to inject ",
                    React.createElement("code", null, "DetailRow"),
                    " module into the ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the print feature can be found in this",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/grid/print" }, "documentation section"),
                    "."))));
    };
    return Print;
}(sample_base_1.SampleBase));
exports.Print = Print;
