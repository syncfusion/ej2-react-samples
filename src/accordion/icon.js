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
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var sample_base_1 = require("../common/sample-base");
require("./accordion.component.css");
var Icons = /** @class */ (function (_super) {
    __extends(Icons, _super);
    function Icons() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Icons.prototype.render = function () {
        function acrdnHeader1() {
            return (React.createElement("div", null, "Athletics"));
        }
        function acrdnHeader2() {
            return (React.createElement("div", null, "Water Games"));
        }
        function acrdnHeader3() {
            return (React.createElement("div", null, "Racing"));
        }
        function acrdnHeader4() {
            return (React.createElement("div", null, "Indoor Games"));
        }
        function athletics() {
            return (React.createElement("div", { id: "athletics" },
                React.createElement("li", null,
                    React.createElement("span", { className: 'e-acrdn-icons e-content-icon marathon' }),
                    "Marathon"),
                React.createElement("li", null,
                    React.createElement("span", { className: 'e-acrdn-icons e-content-icon javelin' }),
                    "Javelin Throw"),
                React.createElement("li", null,
                    React.createElement("span", { className: 'e-acrdn-icons e-content-icon discus' }),
                    "Discus Throw"),
                React.createElement("li", null,
                    React.createElement("span", { className: 'e-acrdn-icons e-content-icon highjump' }),
                    "High Jump"),
                React.createElement("li", null,
                    React.createElement("span", { className: 'e-acrdn-icons e-content-icon longjump' }),
                    "Long Jump")));
        }
        function water_games() {
            return (React.createElement("div", { id: "water_games" },
                React.createElement("li", null,
                    React.createElement("span", { className: 'e-acrdn-icons e-content-icon dive' }),
                    "Diving"),
                React.createElement("li", null,
                    React.createElement("span", { className: 'e-acrdn-icons e-content-icon swimming' }),
                    "Swimming"),
                React.createElement("li", null,
                    React.createElement("span", { className: 'e-acrdn-icons e-content-icon marathan_swim' }),
                    "Marathon Swimming"),
                React.createElement("li", null,
                    React.createElement("span", { className: 'e-acrdn-icons e-content-icon sync_swim' }),
                    "Synchronized Swimming"),
                React.createElement("li", null,
                    React.createElement("span", { className: 'e-acrdn-icons e-content-icon waterpolo' }),
                    "Water Polo")));
        }
        function racing_games() {
            return (React.createElement("div", { id: "racing_games" },
                React.createElement("li", null,
                    React.createElement("span", { className: 'e-acrdn-icons e-content-icon cycle_BMX' }),
                    "Cycling BMX"),
                React.createElement("li", null,
                    React.createElement("span", { className: 'e-acrdn-icons e-content-icon cycle_Mountain' }),
                    "Cycling Mountain Bike"),
                React.createElement("li", null,
                    React.createElement("span", { className: 'e-acrdn-icons e-content-icon cycle' }),
                    "Cycle Racing"),
                React.createElement("li", null,
                    React.createElement("span", { className: 'e-acrdn-icons e-content-icon sailing' }),
                    "Sailing"),
                React.createElement("li", null,
                    React.createElement("span", { className: 'e-acrdn-icons e-content-icon rowing' }),
                    "Rowing")));
        }
        function indoor_games() {
            return (React.createElement("div", { id: "indoor_games" },
                React.createElement("li", null,
                    React.createElement("span", { className: 'e-acrdn-icons e-content-icon tennis' }),
                    "Table Tennis"),
                React.createElement("li", null,
                    React.createElement("span", { className: 'e-acrdn-icons e-content-icon badminton' }),
                    "Badminton"),
                React.createElement("li", null,
                    React.createElement("span", { className: 'e-acrdn-icons e-content-icon volleyball' }),
                    "Volleyball"),
                React.createElement("li", null,
                    React.createElement("span", { className: 'e-acrdn-icons e-content-icon boxing' }),
                    "Boxing"),
                React.createElement("li", null,
                    React.createElement("span", { className: 'e-acrdn-icons e-content-icon swimming_In' }),
                    "Swimming")));
        }
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section accordion-control-section' },
                React.createElement("div", { className: 'control Accordion-sample', style: { margin: '25px 0' } },
                    React.createElement(ej2_react_navigations_1.AccordionComponent, null,
                        React.createElement(ej2_react_navigations_1.AccordionItemsDirective, null,
                            React.createElement(ej2_react_navigations_1.AccordionItemDirective, { header: acrdnHeader1, iconCss: 'e-athletics e-acrdn-icons', content: athletics, expanded: true }),
                            React.createElement(ej2_react_navigations_1.AccordionItemDirective, { header: acrdnHeader2, iconCss: 'e-water-game e-acrdn-icons', content: water_games }),
                            React.createElement(ej2_react_navigations_1.AccordionItemDirective, { header: acrdnHeader3, iconCss: 'e-racing-games e-acrdn-icons', content: racing_games }),
                            React.createElement(ej2_react_navigations_1.AccordionItemDirective, { header: acrdnHeader4, iconCss: 'e-indoor-games e-acrdn-icons', content: indoor_games }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates the icon representation of the ",
                    React.createElement("code", null, "Accordion"),
                    ". Click on the header element to expand/collapse the corresponding Accordion panel, and displays its content.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    React.createElement("p", null,
                        "This Accordion is populated with icons which renders by mapping the ",
                        React.createElement("code", null, "iconCss"),
                        " field. This sample illustrates the some of the games list."),
                    React.createElement("p", null,
                        "More information about Accordion can be found in this ",
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/accordion/getting-started/" }, "documentation"),
                        " section.")))));
    };
    return Icons;
}(sample_base_1.SampleBase));
exports.Icons = Icons;
