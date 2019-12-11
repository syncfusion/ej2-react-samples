"use strict";
/**
 * Loading ajax content sample
 */
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
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var ej2_react_lists_1 = require("@syncfusion/ej2-react-lists");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
require("./tooltip-sample.css");
var AjaxContentTooltip = /** @class */ (function (_super) {
    __extends(AjaxContentTooltip, _super);
    function AjaxContentTooltip(props) {
        var _this = _super.call(this, props) || this;
        //Define an Array of JSON data
        _this.listViewData = [
            { id: '1', text: 'Australia' },
            { id: '2', text: 'Bhutan' },
            { id: '3', text: 'China' },
            { id: '4', text: 'Cuba' },
            { id: '5', text: 'India' },
            { id: '6', text: 'Switzerland' },
            { id: '7', text: 'United States' }
        ];
        //Map appropriate columns to fields property.
        _this.fields = { text: 'text', tooltip: 'id' };
        _this.state = { content: 'Loading...' };
        return _this;
    }
    //Process tooltip ajax content.
    AjaxContentTooltip.prototype.onBeforeRender = function (args) {
        var _this = this;
        var ajax = new ej2_base_1.Ajax('./src/tooltip/tooltipdata.json', 'GET', true);
        ajax.send().then(function (result) {
            result = JSON.parse(result);
            for (var i = 0; i < result.length; i++) {
                if (result[i].Id === args.target.getAttribute('data-content')) {
                    _this.setState({
                        content: "<div class='contentWrap'><span class=" + result[i].Class + "></span><div class='def'>" + result[i].Sports + "</div></div>"
                    });
                }
            }
        }, function (reason) {
            _this.setState({
                content: reason.message
            });
        });
    };
    AjaxContentTooltip.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("h4", { className: "list-header" }, "National Sports"),
                React.createElement(ej2_react_popups_1.TooltipComponent, { className: "e-prevent-select", cssClass: "e-ajax-content", content: this.state.content, target: "#countrylist [title]", position: 'RightCenter', beforeRender: this.onBeforeRender.bind(this) },
                    React.createElement(ej2_react_lists_1.ListViewComponent, { id: "countrylist", dataSource: this.listViewData, fields: this.fields }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the AJAX functionalities of the Tooltip which will open by Hover or Touch-hold action on list-item.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "This sample illustrates the way to load the content of a tooltip dynamically using AJAX request. Here, when the user hovers/tap on the country names, its respective data (national game of each country and its related game icon) will be retrieved dynamically and then assigned to the tooltip\u2019s content."),
                React.createElement("p", null,
                    "The AJAX request should be made within the ",
                    React.createElement("code", null, "beforeRender"),
                    " event of the tooltip, and on every success, the corresponding retrieved data will be set to the ",
                    React.createElement("code", null, "content"),
                    " property of the tooltip."),
                React.createElement("p", null,
                    "More information on loading dynamic tooltip content can be found in the",
                    React.createElement("a", { href: "http://ej2.syncfusion.com/react/documentation/tooltip/content.html#dynamic-content-via-ajax", target: "_blank" }, " documentation section"),
                    "."))));
    };
    return AjaxContentTooltip;
}(sample_base_1.SampleBase));
exports.AjaxContentTooltip = AjaxContentTooltip;
