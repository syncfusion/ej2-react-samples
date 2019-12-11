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
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var VirtualScrolling = /** @class */ (function (_super) {
    __extends(VirtualScrolling, _super);
    function VirtualScrolling() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VirtualScrolling.prototype.render = function () {
        data_1.dataSource();
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.virtualData, childMapping: 'Crew', enableVirtualization: true, treeColumnIndex: 1, height: '400' },
                    React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'TaskID', headerText: 'Player Jersey', width: '120', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'FIELD1', headerText: 'Player Name', width: '120' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'FIELD2', headerText: 'Year', width: '100', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'FIELD3', headerText: 'Stint', width: '120', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'FIELD4', headerText: 'TMID', width: '120', textAlign: 'Right' })),
                    React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.VirtualScroll] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the TreeGrid component with the virtual scrolling feature. Scroll the TreeGrid content vertically to load rows.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The TreeGrid UI virtualization allows you to render only rows visible within the view-port without buffering the entire datasource. To enable the virtualization, set",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/treegrid/#enablevirtualization" }, "enableVirtualization")),
                    " property as true."),
                React.createElement("p", null,
                    "Note: The ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/treegrid/#height" }, "height")),
                    " property must be defined when enabling ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/treegrid/#enablevirtualization" }, "enableVirtualization"))),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module:"),
                React.createElement("p", null,
                    "TreeGrid features are segregated into individual feature-wise modules. To use virtual scrolling feature, we need to inject",
                    React.createElement("code", null, " VirtualScroll "),
                    " module into the ",
                    React.createElement("code", null, "services"),
                    "."))));
    };
    return VirtualScrolling;
}(sample_base_1.SampleBase));
exports.VirtualScrolling = VirtualScrolling;
