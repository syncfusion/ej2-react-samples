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
var ej2_navigations_1 = require("@syncfusion/ej2-navigations");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var sample_base_1 = require("../common/sample-base");
var AjaxContent = /** @class */ (function (_super) {
    __extends(AjaxContent, _super);
    function AjaxContent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nestAcrdn = ej2_react_navigations_1.AccordionComponent;
        return _this;
    }
    AjaxContent.prototype.rendereComplete = function () {
        var _this = this;
        var ajax = new ej2_base_1.Ajax('./src/accordion/ajax-content.html', 'GET', true);
        ajax.send().then();
        ajax.onSuccess = function (data) {
            // Load Accordion content on AJAX success
            _this.acrdnObj.items[0].content = data;
            // Refreshing Accoridon Component with AJAX content
            _this.acrdnObj.refresh();
        };
    };
    AjaxContent.prototype.expand = function (e) {
        var checkMaterial = document.body.classList.contains('material');
        if (e.isExpanded && [].indexOf.call(this.acrdnObj.items, e.item) === 1) {
            if (e.element.querySelectorAll('.e-accordion').length > 0) {
                return;
            }
            //Initialize Nested Accordion component
            var nestAcrdn = new ej2_navigations_1.Accordion({
                expandMode: 'Single',
                items: [
                    { header: 'Sensor', content: '#Sensor_features' },
                    { header: 'Camera', content: '#Camera_features' },
                    { header: 'Video Recording', content: '#Video_Rec_features' },
                ]
            });
            //Render initialized Nested Accordion component
            nestAcrdn.appendTo('#nested_Acc');
        }
    };
    AjaxContent.prototype.render = function () {
        var _this = this;
        function networkHeader() {
            return (React.createElement("div", null, "Network & Connectivity"));
        }
        function featureheader() {
            return (React.createElement("div", null, "Feature"));
        }
        function hardwareheader() {
            return (React.createElement("div", null, "Hardware & Software"));
        }
        function HWSW() {
            return (React.createElement("div", { id: "Hard_Soft_features", style: { display: 'none' } },
                React.createElement("table", null,
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("th", { rowSpan: 3 }, " Hardware"),
                            React.createElement("td", { rowSpan: 2 }, "Chip"),
                            React.createElement("td", null, "Apple A11 Bionic chip with 64-bit architecture")),
                        React.createElement("tr", null,
                            React.createElement("td", null, "Embedded M11 motion coprocessor")),
                        React.createElement("tr", null,
                            React.createElement("td", null, "Capacity"),
                            React.createElement("td", null, "64GB/256GB")),
                        React.createElement("tr", null,
                            React.createElement("th", null, " Software"),
                            React.createElement("td", null, "Operating System"),
                            React.createElement("td", null, "iOS 11"))))));
        }
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section accordion-control-section' },
                React.createElement("div", { className: 'product_title' }, " iPhone X Product Specification "),
                React.createElement(ej2_react_navigations_1.AccordionComponent, { expandMode: 'Single', expanding: this.expand.bind(this), ref: function (accordion) { return _this.acrdnObj = accordion; } },
                    React.createElement(ej2_react_navigations_1.AccordionItemsDirective, null,
                        React.createElement(ej2_react_navigations_1.AccordionItemDirective, { header: networkHeader, expanded: true }),
                        React.createElement(ej2_react_navigations_1.AccordionItemDirective, { header: featureheader, content: '<div id="nested_Acc"></div>' }),
                        React.createElement(ej2_react_navigations_1.AccordionItemDirective, { header: hardwareheader, content: HWSW }))),
                React.createElement("div", { id: "Sensor_features", style: { display: 'none' } },
                    React.createElement("table", null,
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", null, "Proximity sensor"),
                                React.createElement("td", null, "Yes")),
                            React.createElement("tr", null,
                                React.createElement("td", null, "Face ID"),
                                React.createElement("td", null, "Yes")),
                            React.createElement("tr", null,
                                React.createElement("td", null, "Accelerometer"),
                                React.createElement("td", null, "Yes"))))),
                React.createElement("div", { id: "Video_Rec_features", style: { display: 'none' } },
                    React.createElement("table", null,
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("th", { rowSpan: 9 }, "Video Recording")),
                            React.createElement("tr", null,
                                React.createElement("td", null, "4K video recording")),
                            React.createElement("tr", null,
                                React.createElement("td", null, "1080p & 720p HD video recording")),
                            React.createElement("tr", null,
                                React.createElement("td", null, "Optical zoom, 6x digital zoom")),
                            React.createElement("tr", null,
                                React.createElement("td", null, "Slow motion video support")),
                            React.createElement("tr", null,
                                React.createElement("td", null, "Take 8MP still photos while recording 4K video")),
                            React.createElement("tr", null,
                                React.createElement("td", null, "Noise reduction"))))),
                React.createElement("div", { id: "Camera_features", style: { display: 'none' } },
                    React.createElement("table", null,
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("th", { rowSpan: 3 }, "Camera"),
                                React.createElement("td", null, " 12MP wide-angle")),
                            React.createElement("tr", null,
                                React.createElement("td", null, "Live Photos with stabilization")),
                            React.createElement("tr", null,
                                React.createElement("td", null, "Body and face detection")),
                            React.createElement("tr", null,
                                React.createElement("th", { rowSpan: 4 }, "TrueDepth Camera"),
                                React.createElement("td", null, " 7MP camera")),
                            React.createElement("tr", null,
                                React.createElement("td", null, " Animoji")),
                            React.createElement("tr", null,
                                React.createElement("td", null, " Face detection")))))),
            React.createElement("div", { id: 'source_link' },
                "Source: \u00A0",
                React.createElement("a", { href: "https://www.apple.com/iphone-x/specs/", target: '_blank' }, "www.apple.com/iphone-x/specs/")),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates rendering ",
                    React.createElement("code", null, "Accordion"),
                    " content from external source using ",
                    React.createElement("code", null, "Ajax"),
                    " library. The content of panel \u201CNetwork & Connectivity\u201D is loaded from external element.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "This sample illustrates the external webpage content loaded inside the Accordion panel by using AJAX library."),
                React.createElement("p", null,
                    "More information about Accordion can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/accordion/getting-started/" }, "documentation"),
                    " section."))));
    };
    return AjaxContent;
}(sample_base_1.SampleBase));
exports.AjaxContent = AjaxContent;
