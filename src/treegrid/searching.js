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
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var Search = (function (_super) {
    __extends(Search, _super);
    function Search() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.modes = [
            { text: 'Parent', value: 'Parent' },
            { text: 'Child', value: 'Child' },
            { text: 'Both', value: 'Both' },
            { text: 'None', value: 'None' },
        ];
        _this.toolbarOptions = ['Search'];
        return _this;
    }
    Search.prototype.onChange = function (sel) {
        var mode = sel.value.toString();
        this.treegridInstance.search('');
        this.treegridInstance.searchSettings.hierarchyMode = mode;
    };
    Search.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-md-9' },
                    React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, ref: function (treegrid) { return _this.treegridInstance = treegrid; }, treeColumnIndex: 1, childMapping: 'subtasks', allowPaging: 'true', toolbar: this.toolbarOptions },
                        React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskID', headerText: 'Task ID', width: '70', textAlign: 'Right' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskName', headerText: 'Task Name', width: '200' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'startDate', headerText: 'Start Date', width: '90', format: 'yMd', textAlign: 'Right' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'duration', headerText: 'Duration', width: '80', textAlign: 'Right' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'progress', headerText: 'Progress', width: '80', textAlign: 'Right' })),
                        React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Filter, ej2_react_treegrid_1.Page, ej2_react_treegrid_1.Toolbar] }))),
                React.createElement("div", { className: 'col-md-3 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", { style: { paddingTop: '10px' } }, " Hierarchy Mode ")),
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", id: "selmode", change: this.onChange.bind(this), dataSource: this.modes, value: "Parent" })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, " This sample demonstrates the TreeGrid searching feature. In this sample, use the search box from toolbar to search TreeGrid records and the hierarchy mode of searching can be changed using property panel.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The TreeGrid has an option to search its content using the search method with search key as the parameter."),
                React.createElement("p", null,
                    "The tree grid supports different types of search mode through the ",
                    React.createElement("code", null, "searchSettings.hierarchyMode property"),
                    "."),
                React.createElement("p", null, "The following are the types of search modes available in the tree grid."),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Parent"),
                        " - This is the default search hierarchy mode in the tree grid. It displays a searched record with its parent records. If the searched records do not have any parent record, it displays only the searched record."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Child"),
                        " - Displays the searched record with its child record. If the searched records do not have any child record, it displays only the searched record."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Both"),
                        " - Displays the searched record with both its parent and child records. If the searched records do not have any parent and child records, it displays only the searched record."),
                    React.createElement("li", null,
                        React.createElement("code", null, "None"),
                        " - Displays only the searched record.")),
                React.createElement("p", null, "In this demo, The TreeGrid toolbar provides an option to search the TreeGrid's records. The user can type the text box in the toolbar and click search button or press Enter key to perform search operation.And also we have an option to change the searching hierarchy mode through the dropdown."),
                React.createElement("p", null, "Injecting Module:"),
                React.createElement("p", null,
                    "TreeGrid features are segregated into individual feature-wise modules. To use searching feature, we need to inject ",
                    React.createElement("code", null, "Filter"),
                    "module into the ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null, "More information on the searching configuration can be found in this documentation section."))));
    };
    return Search;
}(sample_base_1.SampleBase));
exports.Search = Search;
