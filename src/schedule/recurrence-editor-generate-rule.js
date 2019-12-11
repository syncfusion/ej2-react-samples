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
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
require("./recurrence-editor-rule.css");
var sample_base_1 = require("../common/sample-base");
/**
 * Recurrence editor generate rule
 */
var RuleGenerate = /** @class */ (function (_super) {
    __extends(RuleGenerate, _super);
    function RuleGenerate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // call the change event's function after initialized the component.
    RuleGenerate.prototype.rendereComplete = function () {
        var outputElement = document.querySelector('#rule-output');
        this.recObject.setRecurrenceRule('FREQ=DAILY;INTERVAL=2;COUNT=8');
        outputElement.innerText = this.recObject.value;
    };
    RuleGenerate.prototype.onChange = function (args) {
        var outputElement = document.querySelector('#rule-output');
        outputElement.innerText = args.value;
    };
    RuleGenerate.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'content-wrapper recurrence-editor-wrap' },
                    React.createElement("div", { className: 'generate-rule', style: { paddingBottom: '15px' } },
                        React.createElement("label", null, "Rule Output"),
                        React.createElement("div", { className: 'rule-output-container' },
                            React.createElement("div", { id: 'rule-output' }))),
                    React.createElement("div", { className: 'RecurrenceEditor' },
                        React.createElement(ej2_react_schedule_1.RecurrenceEditorComponent, { id: 'RecurrenceEditor', ref: function (t) { return _this.recObject = t; }, change: this.onChange.bind(this) })))),
            React.createElement("div", { id: 'action-description' },
                React.createElement("p", null,
                    "This demo showcases the recurrence rule generation based on the options selected from the Recurrence editor and it usually follows the ",
                    React.createElement("a", { href: 'https://tools.ietf.org/html/rfc5545#section-3.3.10', target: '_blank' }, "iCalendar"),
                    " specifications. This generated recurrence rule string is a valid one to be used with the Scheduler event\u2019s recurrence rule field.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "In this demo, a specific rule has been set to the recurrence editor manually by making use of the ",
                    React.createElement("code", null, "setRecurrenceRule"),
                    " method which will be displayed on the label placed at the top of it. Also, when the user dynamically change the options in recurrence editor, the modified rule value as per the selection will be displayed on it which is retrieved within the ",
                    React.createElement("code", null, "change"),
                    " event."))));
    };
    return RuleGenerate;
}(sample_base_1.SampleBase));
exports.RuleGenerate = RuleGenerate;
