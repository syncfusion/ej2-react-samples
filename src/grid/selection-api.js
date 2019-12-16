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
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var SelectionAPI = /** @class */ (function (_super) {
    __extends(SelectionAPI, _super);
    function SelectionAPI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.selectionsettings = { type: 'Multiple' };
        return _this;
    }
    SelectionAPI.prototype.click = function (e) {
        var element = e.target;
        var options = {
            type: { class: '.e-gtype', val: function (mode) { return mode === 'Single' ? 'Multiple' : 'Single'; } },
            mode: { class: '.e-gmode', val: function (mode) { return mode === 'Row' ? 'Cell' : 'Row'; } },
        };
        if (!element.classList.contains('e-tbar-btn-text') && !element.classList.contains('e-tbar-btn')) {
            return;
        }
        element = (element.tagName === 'BUTTON' ? element.firstElementChild : element);
        var isType = element.parentElement.parentElement.classList.contains('e-gtype');
        var opt = options[isType ? 'type' : 'mode'];
        var parent = document.querySelector('.e-gridlist');
        var typeEle = parent.querySelector(opt.class + ' .e-tbar-btn-text');
        var type = typeEle.innerHTML;
        var val = opt.val(type);
        typeEle.innerHTML = val;
        this.gridInstance.selectionSettings = isType ? { type: val } : { mode: val };
        this.gridInstance.refresh();
    };
    SelectionAPI.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'e-statustext' }, "Selection Type / Selection Mode"),
                React.createElement(ej2_react_navigations_1.ToolbarComponent, { className: "e-gridlist", ref: function (toolbar) { return _this.ToolbarInstance = toolbar; }, onClick: this.click.bind(this) },
                    React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                        React.createElement(ej2_react_navigations_1.ItemDirective, { text: "Multiple", cssClass: 'e-gtype' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { text: "Row", cssClass: 'e-gmode' }))),
                React.createElement("br", null),
                React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.data, ref: function (grid) { return _this.gridInstance = grid; }, enableHover: false, allowPaging: true, pageSettings: { pageCount: 5 }, selectionSettings: this.selectionsettings },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '120', textAlign: "Right" }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Customer Name', width: '150' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderDate', headerText: 'Order Date', width: '130', format: 'yMd', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '120', format: 'C2', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShippedDate', headerText: 'Shipped Date', width: '130', format: "yMd", textAlign: "Right" })),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Page, ej2_react_grids_1.Selection] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the selection functionality of the Grid, you can select the type and mode from the desired button")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "Selection provides an interactive support to highlight the row or cell that you select. Selection can be done through simple Mouse down or Keyboard interaction. To enable selection, set ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#allowselection-boolean" }, "allowSelection")),
                    " as true."),
                React.createElement("p", null,
                    "Grid component supports two types of selection which can be set using ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#selectionsettings-selectionsettingsmodel" }, "selectionSettings->type")),
                    " property. They are,"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Single"),
                        " - Enabled by default. Allows the user to select single row/cell at a time."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Multiple"),
                        " - Allows the user to select more than one row/cell at a time.")),
                React.createElement("p", null,
                    "Also, supports three modes of selection which can be set using ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#selectionsettings-selectionsettingsmodel" }, "selectionSettings->mode")),
                    " property. They are,"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Row"),
                        " - Enabled by default. Enables row selection in Grid."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Cell"),
                        " - Enables cell selection in Grid."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Both"),
                        " - Enables both row and cell selection in Grid. Clicking any cell will select both the row and cell simultaneously")),
                React.createElement("p", null,
                    "To perform the multi-selection, hold ",
                    React.createElement("strong", null, "CTRL"),
                    " key and click the desired rows/cells. To select range of rows/cells, hold ",
                    React.createElement("strong", null, "SHIFT"),
                    " key and click the rows/cells."),
                React.createElement("p", null, "While using the Grid in a touch device environment, there is an option for multi-selection through a single tap on the row and it will show a popup with the multi-selection symbol. Tap the icon to enable multi-selection in a single tap."),
                React.createElement("p", null, "In this demo, click the toolbar options to toggle between the selection type and selection mode available in Grid."),
                React.createElement("p", null,
                    "More information on the selection configuration can be found in this",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/api/grid/#selectrows" }, " documentation section"),
                    "."))));
    };
    return SelectionAPI;
}(sample_base_1.SampleBase));
exports.SelectionAPI = SelectionAPI;
