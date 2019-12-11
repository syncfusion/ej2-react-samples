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
var ej2_react_querybuilder_1 = require("@syncfusion/ej2-react-querybuilder");
var data_source_1 = require("./data-source");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
require("./default.css");
var Default = /** @class */ (function (_super) {
    __extends(Default, _super);
    function Default() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.columnData = [
            {
                field: 'EmployeeID', label: 'EmployeeID', type: 'number', operators: [{ key: 'Equal', value: 'equal' },
                    { key: 'Greater than', value: 'greaterthan' }, { key: 'Less than', value: 'lessthan' }]
            },
            { field: 'FirstName', label: 'FirstName', type: 'string' },
            { field: 'TitleOfCourtesy', label: 'Title Of Courtesy', type: 'boolean', values: ['Mr.', 'Mrs.'] },
            { field: 'Title', label: 'Title', type: 'string' },
            { field: 'HireDate', label: 'HireDate', type: 'date', format: 'dd/MM/yyyy' },
            { field: 'Country', label: 'Country', type: 'string' },
            { field: 'City', label: 'City', type: 'string' }
        ];
        _this.importRules = {
            'condition': 'and',
            'rules': [{
                    'label': 'EmployeeID',
                    'field': 'EmployeeID',
                    'type': 'number',
                    'operator': 'equal',
                    'value': 1
                },
                {
                    'label': 'Title',
                    'field': 'Title',
                    'type': 'string',
                    'operator': 'equal',
                    'value': 'Sales Manager'
                }]
        };
        return _this;
    }
    Default.prototype.createdControl = function () {
        if (ej2_base_1.Browser.isDevice) {
            this.qbObj.summaryView = true;
        }
    };
    Default.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'row' },
                    React.createElement("div", { className: 'col-lg-12 control-section' },
                        React.createElement(ej2_react_querybuilder_1.QueryBuilderComponent, { width: '70%', dataSource: data_source_1.employeeData, columns: this.columnData, rule: this.importRules, created: this.createdControl.bind(this), ref: function (scope) { _this.qbObj = scope; } })))),
            React.createElement("div", { id: 'action-description' },
                React.createElement("p", null, "This sample demonstrates the default functionalities of the Query Builder component . Click the plus button to add group or conditions.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null, "The Query Builder component is used to create or edit the filters. You can edit the filters by changing the appropriate fields."),
                React.createElement("p", null, " In mobile mode it is shown in vertical mode."),
                React.createElement("p", null,
                    "More information about Query Builder can be found in this",
                    React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/query-builder/getting-started/' }, "documentation section"),
                    "."))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
