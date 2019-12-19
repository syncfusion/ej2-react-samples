"use strict";
/**
 * Loading HTML content sample
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
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var React = require("react");
var sample_base_1 = require("../common/sample-base");
require("./html-content.css");
var HtmlContentTooltip = (function (_super) {
    __extends(HtmlContentTooltip, _super);
    function HtmlContentTooltip() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HtmlContentTooltip.prototype.onClick = function (args) {
        if (!args.target.classList.contains('e-control') &&
            !args.target.classList.contains('e-btn')) {
            if (document.getElementsByClassName('e-tooltip-wrap').length > 0) {
                this.tooltipObj.close();
            }
        }
    };
    HtmlContentTooltip.prototype.onScroll = function () {
        if (document.getElementsByClassName('e-tooltip-wrap').length > 0) {
            this.tooltipObj.close();
        }
    };
    HtmlContentTooltip.prototype.created = function () {
        if (document.getElementById('right-pane')) {
            document.getElementById('right-pane').addEventListener('click', this.onClick.bind(this));
            document.getElementById('right-pane').addEventListener('scroll', this.onScroll.bind(this));
        }
    };
    HtmlContentTooltip.prototype.render = function () {
        var _this = this;
        function tooltipTemplate() {
            return (React.createElement("div", { id: "democontent", className: "democontent" },
                React.createElement("h3", { style: { marginTop: '10px' } }, "Eastern Bluebird"),
                React.createElement("img", { id: "bird", src: './src/tooltip/images/bird.png', alt: "bird_image" }),
                React.createElement("p", null,
                    "The",
                    React.createElement("a", { href: "https://en.wikipedia.org/wiki/Eastern_bluebird", target: "_blank" }, " Eastern Bluebird "),
                    "is easily found in open fields and sparse woodland areas, including along woodland edges. These are cavity-nesting birds and a pair of eastern bluebirds will raise 2-3 broods annually, with 2-8 light blue or whitish eggs per brood."),
                React.createElement("hr", { style: { marginTop: '10px 0px' } }),
                React.createElement("p", null, "Eastern bluebirds can be very vocal in flocks. Their calls include a rapid, mid-tone chatter and several long dropping pitch calls."),
                React.createElement("p", null,
                    "Source:",
                    React.createElement("br", null),
                    React.createElement("a", { href: "https://en.wikipedia.org/wiki/Eastern_bluebird", target: "_blank" }, "https://en.wikipedia.org/wiki/Eastern_bluebird"))));
        }
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { id: "htmlTemplate", className: "col-lg-12 control-section" },
                    React.createElement(ej2_react_popups_1.TooltipComponent, { id: 'content', created: this.created.bind(this), content: tooltipTemplate, opensOn: 'Click', cssClass: 'e-tooltip-template-css', target: "#content", ref: function (t) { return _this.tooltipObj = t; } },
                        React.createElement("div", { id: "customization" },
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { cssClass: 'e-outline', isPrimary: true, className: "text", id: "content" }, "HTML Template"))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates customizing tooltip content to display a HTML page.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, " Tooltip content has been customized using HTML tags and CSS, i.e. the content can be loaded with HTML tags such as <img>, <a>,<b>, etc. Title can also be added to the content. Overall, the tooltip content can be customized to appear like a web page."))));
    };
    return HtmlContentTooltip;
}(sample_base_1.SampleBase));
exports.HtmlContentTooltip = HtmlContentTooltip;
