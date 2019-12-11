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
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
require("./accordion.css");
var Accordion = /** @class */ (function (_super) {
    __extends(Accordion, _super);
    function Accordion() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // Assigning badge data
        _this.badgeContent = ['7 New', '27 New', '2 New', '14 New'];
        return _this;
    }
    Accordion.prototype.accordionTemplate = function () {
        return (React.createElement("div", null,
            React.createElement("li", { className: 'msg' },
                React.createElement("span", { className: 'e-acrdn-icons e-content-icon people' }),
                "Message Thread"),
            React.createElement("li", { className: 'msg' },
                React.createElement("span", { className: 'e-acrdn-icons e-content-icon people' }),
                "Message Thread")));
    };
    Accordion.prototype.onCreated = function () {
        // Appending Badge component after the accordion rendered in created event
        var element = document.getElementById('accordion');
        var iconElement = Array.prototype.slice.call(element.querySelectorAll('.e-toggle-icon'));
        for (var i = 0; i < iconElement.length; i++) {
            // Success Badge Element
            var badge = ej2_base_1.createElement('span', { className: 'e-badge e-badge-success' });
            badge.textContent = this.badgeContent[i];
            iconElement[i].appendChild(badge);
        }
    };
    Accordion.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section badge-samples' },
                React.createElement("div", { className: "sample_container badge-accordion" },
                    React.createElement(ej2_react_navigations_1.AccordionComponent, { id: "accordion", created: this.onCreated.bind(this) },
                        React.createElement(ej2_react_navigations_1.AccordionItemsDirective, null,
                            React.createElement(ej2_react_navigations_1.AccordionItemDirective, { header: 'Robert', iconCss: 'e-people e-acrdn-icons', expanded: true, content: this.accordionTemplate }),
                            React.createElement(ej2_react_navigations_1.AccordionItemDirective, { header: 'Kevin', iconCss: 'e-people e-acrdn-icons', content: this.accordionTemplate }),
                            React.createElement(ej2_react_navigations_1.AccordionItemDirective, { header: 'Eric', iconCss: 'e-people e-acrdn-icons', content: this.accordionTemplate }),
                            React.createElement(ej2_react_navigations_1.AccordionItemDirective, { header: 'Peter', iconCss: 'e-people e-acrdn-icons', content: this.accordionTemplate }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the integration of badges into the accordion component to display the thread notification count.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The badge can be integrated into the accordion with the help of templates to display the count of new messages in the message thread. Here, the success badge is used in the accordion. To add success badge, add the",
                    React.createElement("code", null, ".e-badge-success"),
                    " class."))));
    };
    return Accordion;
}(sample_base_1.SampleBase));
exports.Accordion = Accordion;
