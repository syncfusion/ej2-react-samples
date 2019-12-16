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
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var ej2_base_1 = require("@syncfusion/ej2-base");
var slidercss = "\n.content-wrapper {\n    width: 52%;\n    margin: 0 auto;\n    min-width: 185px;\n}\n\n.sliderwrap {\n    margin-top: 60px;\n}\n\n.userselect {\n    -webkit-user-select: none;\n    /* Safari 3.1+ */\n    -moz-user-select: none;\n    /* Firefox 2+ */\n    -ms-user-select: none;\n    /* IE 10+ */\n    user-select: none;\n    /* Standard syntax */\n}\n\n#EventLog b {\n    color: #388e3c;\n}\n\nhr {\n    margin-top: 6px;\n    margin-bottom: 6px;\n}\n\n";
var Events = /** @class */ (function (_super) {
    __extends(Events, _super);
    function Events() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultTooltip = { isVisible: true, placement: 'Before', showOn: 'Focus' };
        _this.defaultTicks = { placement: 'Both', largeStep: 20, smallStep: 5, showSmallTicks: true };
        return _this;
    }
    //Handler for create event trace
    Events.prototype.onCreated = function () {
        this.appendElement('Slider control has been <b>created</b><hr>');
    };
    //Handler for change event trace
    Events.prototype.onChange = function (args) {
        this.appendElement('Slider value is <b>changing</b> from ' + args.previousValue + '  to  ' + args.value + '<hr>');
    };
    //Handler for changed event trace
    Events.prototype.onChanged = function (args) {
        this.appendElement('Slider value has been <b>changed</b> from ' + args.previousValue + '  to  ' + args.value + '<hr>');
    };
    //Display event log
    Events.prototype.appendElement = function (html) {
        var span = document.createElement('span');
        span.innerHTML = html;
        var log = document.getElementById('EventLog');
        log.insertBefore(span, log.firstChild);
    };
    // Clears the event log details
    Events.prototype.onclick = function () {
        document.getElementById('EventLog').innerHTML = '';
    };
    Events.prototype.refreshTooltip = function (e) {
        if (this.defaultObj) {
            this.defaultObj.refreshTooltip(this.defaultObj.tooltipTarget);
        }
    };
    Events.prototype.render = function () {
        var _this = this;
        if (!ej2_base_1.isNullOrUndefined(document.getElementById('right-pane'))) {
            document.getElementById('right-pane').addEventListener('scroll', this.refreshTooltip.bind(this));
        }
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, slidercss),
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-lg-8' },
                    React.createElement("div", { className: "content-wrapper" },
                        React.createElement("div", { className: 'sliderwrap' },
                            React.createElement(ej2_react_inputs_1.SliderComponent, { id: 'minrange', value: 30, type: 'MinRange', tooltip: this.defaultTooltip, ticks: this.defaultTicks, ref: function (slider) { _this.defaultObj = slider; }, changed: this.onChanged.bind(this), created: this.onCreated.bind(this), change: this.onChange.bind(this) })))),
                React.createElement("div", { id: "slider_event", className: "col-lg-4 property-section" },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: "property", title: "Event Trace", className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", { className: "eventarea", style: { height: '245px', overflow: 'auto' } },
                                            React.createElement("span", { className: "EventLog", id: "EventLog", style: { wordbreak: 'normal' } })))),
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", { className: "evtbtn", style: { paddingbottom: '10px' } },
                                            React.createElement("input", { id: "clear", type: "button", className: "btn btn-default", value: "Clear", onClick: this.onclick }))))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the events that have been triggered on the Slider operations with the help of Event Trace panel. Drag the thumb over the bar between min and max to know the event details.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "Slider component triggers event based on its actions. The events can be used as an extension point to perform custom operations."),
                React.createElement("p", null, "In this demo, Slider performs following action like created, change, changed Which can be traced by event trace panel."),
                React.createElement("ul", null,
                    React.createElement("li", null, "created - Triggers when Slider is created."),
                    React.createElement("li", null, "changee - Triggers when the Slider value is changed."),
                    React.createElement("li", null, "changed - Triggers when the Slider action is completed with change in Slider value.")),
                React.createElement("p", null,
                    "For more information, we can refer the",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/documentation/slider/api-slider.html?lang=es6#events" }, "events"),
                    " API from the documentation."))));
    };
    return Events;
}(sample_base_1.SampleBase));
exports.Events = Events;
