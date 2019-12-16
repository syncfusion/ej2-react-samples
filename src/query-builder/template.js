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
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var data_source_1 = require("./data-source");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
require("./template.css");
var Template = /** @class */ (function (_super) {
    __extends(Template, _super);
    function Template() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.txtAreaElem = document.getElementById('ruleContent');
        _this.filter = [
            {
                field: 'Category', label: 'Category', type: 'string',
            },
            {
                field: 'PaymentMode', label: 'Payment Mode', type: 'string', template: {
                    create: function () {
                        _this.elem = document.createElement('input');
                        _this.elem.setAttribute('type', 'text');
                        return _this.elem;
                    },
                    destroy: function (args) {
                        _this.dropDownObj = ej2_base_1.getComponent(document.getElementById(args.elementId), 'dropdownlist');
                        if (_this.dropDownObj) {
                            _this.dropDownObj.destroy();
                        }
                    },
                    write: function (args) {
                        var ds = ['Cash', 'Debit Card', 'Credit Card', 'Net Banking', 'Wallet'];
                        _this.dropDownObj = new ej2_react_dropdowns_1.DropDownList({
                            dataSource: ds,
                            value: args.values ? args.values : ds[0],
                            change: function (e) {
                                _this.qryBldrObj.notifyChange(e.itemData.value, e.element);
                            }
                        });
                        _this.dropDownObj.appendTo('#' + args.elements.id);
                    }
                },
                operators: [
                    { key: 'Equal', value: 'equal' },
                    { key: 'Not Equal', value: 'notequal' }
                ]
            },
            {
                field: 'TransactionType', label: 'Transaction Type', type: 'boolean', template: {
                    create: function () {
                        _this.elem = document.createElement('input');
                        _this.elem.setAttribute('type', 'checkbox');
                        return _this.elem;
                    },
                    destroy: function (args) {
                        ej2_base_1.getComponent(document.getElementById(args.elementId), 'checkbox').destroy();
                    },
                    write: function (args) {
                        _this.checked = args.values === 'IsExpensive' ? true : false;
                        _this.boxObj = new ej2_react_buttons_1.CheckBox({
                            label: 'Is Expensive',
                            checked: _this.checked,
                            change: function (e) {
                                _this.qryBldrObj.notifyChange(e.checked ? 'expensive' : 'income', e.event.target);
                            }
                        });
                        _this.boxObj.appendTo('#' + args.elements.id);
                    }
                },
                operators: [
                    { key: 'Equal', value: 'equal' },
                    { key: 'Not Equal', value: 'notequal' }
                ]
            },
            { field: 'Description', label: 'Description', type: 'string' },
            { field: 'Date', label: 'Date', type: 'date' },
            {
                field: 'Amount', label: 'Amount', type: 'number', template: {
                    create: function () {
                        _this.elem = document.createElement('div');
                        _this.elem.setAttribute('class', 'ticks_slider');
                        return _this.elem;
                    },
                    destroy: function (args) {
                        ej2_base_1.getComponent(document.getElementById(args.elementId), 'slider').destroy();
                    },
                    write: function (args) {
                        var slider = new ej2_react_inputs_1.Slider({
                            value: args.values,
                            min: 0,
                            max: 100,
                            type: 'MinRange',
                            tooltip: { isVisible: true, placement: 'Before', showOn: 'Hover' },
                            change: function (e) {
                                _this.qryBldrObj.notifyChange(e.value, args.elements);
                            }
                        });
                        slider.appendTo('#' + args.elements.id);
                    }
                },
                operators: [
                    { key: 'Equal', value: 'equal' },
                    { key: 'Not equal', value: 'notequal' },
                    { key: 'Greater than', value: 'greaterthan' },
                    { key: 'Less than', value: 'lessthan' },
                    { key: 'Less than or equal', value: 'lessthanorequal' },
                    { key: 'Greater than or equal', value: 'greaterthanorequal' }
                ]
            }
        ];
        _this.importRules = {
            'condition': 'and',
            'rules': [{
                    'label': 'Category',
                    'field': 'Category',
                    'type': 'string',
                    'operator': 'equal',
                    'value': ['Clothing']
                },
                {
                    'condition': 'or',
                    'rules': [{
                            'label': 'TransactionType',
                            'field': 'TransactionType',
                            'type': 'boolean',
                            'operator': 'equal',
                            'value': 'Income'
                        },
                        {
                            'label': 'PaymentMode',
                            'field': 'PaymentMode',
                            'type': 'string',
                            'operator': 'equal',
                            'value': 'Cash'
                        }]
                }, {
                    'label': 'Amount',
                    'field': 'Amount',
                    'type': 'number',
                    'operator': 'equal',
                    'value': 10
                }
            ]
        };
        return _this;
    }
    Template.prototype.updateRule = function (args) {
        this.txtAreaElem = document.getElementById('ruleContent');
        if (this.radioButton.checked) {
            this.txtAreaElem.value = this.qryBldrObj.getSqlFromRules(args.rule);
        }
        else {
            this.txtAreaElem.value = JSON.stringify(args.rule, null, 4);
        }
    };
    Template.prototype.changeValue = function () {
        this.txtAreaElem = document.getElementById('ruleContent');
        this.validRule = this.qryBldrObj.getValidRules(this.qryBldrObj.rule);
        if (this.radioButton.checked) {
            this.txtAreaElem.value = this.qryBldrObj.getSqlFromRules(this.validRule);
        }
        else {
            this.txtAreaElem.value = JSON.stringify(this.validRule, null, 4);
        }
    };
    Template.prototype.onCreated = function () {
        document.getElementById('ruleContent').value = JSON.stringify(this.qryBldrObj.getValidRules(this.qryBldrObj.rule), null, 4);
    };
    // Handler used to reposition the tooltip on page scroll
    Template.prototype.onScroll = function () {
        var tooltip = document.getElementsByClassName('e-handle e-control e-tooltip');
        var i;
        var len = tooltip.length, tooltipObj;
        for (i = 0; i < len; i++) {
            tooltipObj = tooltip[i].ej2_instances[0];
            tooltipObj.refresh(tooltipObj.element);
        }
    };
    Template.prototype.render = function () {
        var _this = this;
        if (!ej2_base_1.isNullOrUndefined(document.getElementById('right-pane'))) {
            document.getElementById('right-pane').addEventListener('scroll', this.onScroll);
        }
        return (React.createElement("div", { className: 'control-pane querybuilder-pane' },
            React.createElement("div", { className: 'col-lg-8 control-section' },
                React.createElement(ej2_react_querybuilder_1.QueryBuilderComponent, { dataSource: data_source_1.expenseData, columns: this.filter, width: '100%', rule: this.importRules, ref: function (scope) { _this.qryBldrObj = scope; }, created: this.onCreated.bind(this), ruleChange: this.updateRule.bind(this) })),
            React.createElement("div", { className: 'col-lg-4 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'qbproperypane', title: 'Properties' },
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("div", { className: "row" },
                                    React.createElement(ej2_react_buttons_1.RadioButtonComponent, { label: 'JSON', name: 'rule', value: 'sql', checked: true, change: this.changeValue.bind(this), ref: function (scope) { _this.radioButton = scope; } }))),
                            React.createElement("td", null,
                                React.createElement("div", { className: "row" },
                                    React.createElement(ej2_react_buttons_1.RadioButtonComponent, { label: 'SQL', name: 'rule', value: 'sql', change: this.changeValue.bind(this), ref: function (scope) { _this.radioButton = scope; } })))),
                        React.createElement("tr", null,
                            React.createElement("td", { colSpan: 2 },
                                React.createElement("textarea", { id: 'ruleContent', readOnly: true })))))),
            React.createElement("div", { id: 'action-description' },
                React.createElement("p", null, "This sample demonstrates the integration of DropdownList, Slider components as Templates in the Query Builder control.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    " This sample illustrates the way to integrate drop-down components, Slider, Checkbox with Query Builder. The applicable types of templates are:",
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("code", null, "DropDownList")),
                        React.createElement("li", null,
                            React.createElement("code", null, "AutoComplete")),
                        React.createElement("li", null,
                            React.createElement("code", null, "CheckBox")),
                        React.createElement("li", null,
                            React.createElement("code", null, "Slider")))),
                React.createElement("p", null, " In this sample also illustrates the created filters in JSON and SQL mode. "),
                React.createElement("p", null,
                    "More information about Query Builder can be found in this",
                    React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/query-builder/getting-started/' }, "documentation section"),
                    "."))));
    };
    return Template;
}(sample_base_1.SampleBase));
exports.Template = Template;
