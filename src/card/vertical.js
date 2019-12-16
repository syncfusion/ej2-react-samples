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
require("./card.component.css");
// tslint:disable:max-line-length
// *  Sample for CSS Basic Layout Cards.
var Vertical = /** @class */ (function (_super) {
    __extends(Vertical, _super);
    function Vertical() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Vertical.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section card-control-section vertical_card_layout' },
                React.createElement("div", { className: "e-card-resize-container" },
                    React.createElement("div", { className: 'row' },
                        React.createElement("div", { className: "row card-layout" },
                            React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                                React.createElement("div", { className: "e-card", id: "vertical_business" },
                                    React.createElement("div", { className: "e-card-header" },
                                        React.createElement("div", { className: "e-card-header-caption" },
                                            React.createElement("div", { className: "e-card-header-title" }, "Mayumi Ohno"),
                                            React.createElement("div", { className: "e-card-sub-title" }, "Marketing Representative"))),
                                    React.createElement("div", { className: "e-card-actions" },
                                        React.createElement("button", { className: "e-card-btn" },
                                            React.createElement("div", { className: "e-email e-card-btn-txt" }, "mayum@mail.com")),
                                        React.createElement("button", { className: "e-card-btn" },
                                            React.createElement("div", { className: "e-email e-card-btn-txt" }, "011-232-221")),
                                        React.createElement("button", { className: "e-card-btn" },
                                            React.createElement("div", { className: "e-email e-card-btn-txt" }, "www.mayum.com"))))),
                            React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                                React.createElement("div", { className: "e-card", id: "vertical_business_profile" },
                                    React.createElement("div", { className: "e-card-header" },
                                        React.createElement("div", { className: "e-card-header-caption" },
                                            React.createElement("div", { className: "e-card-header-title" }, "John Doe"),
                                            React.createElement("div", { className: "e-card-sub-title" }, "Real Estate Agent"))),
                                    React.createElement("div", { className: "e-card-content e-card-left", style: { textAlign: 'left' } },
                                        React.createElement("table", null,
                                            React.createElement("tr", null,
                                                React.createElement("td", null, "johndoe@mail.com")),
                                            React.createElement("tr", null,
                                                React.createElement("td", null, "011-141-221")),
                                            React.createElement("tr", null,
                                                React.createElement("td", null, "www.johndoe.com")))))),
                            React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                                React.createElement("div", { className: "e-card profile", style: { justifyContent: 'flex-start' } },
                                    React.createElement("div", { className: "e-card-header" },
                                        React.createElement("div", { className: "e-card-header-image e-card-corner" })),
                                    React.createElement("div", { className: "e-card-header" },
                                        React.createElement("div", { className: "e-card-header-caption center" },
                                            React.createElement("div", { className: "e-card-header-title" }, "Laura Callahan"),
                                            React.createElement("div", { className: "e-card-sub-title" }, "Sales Coordinator"))),
                                    React.createElement("div", { className: "e-card-separator" }),
                                    React.createElement("div", { className: "e-card-content" }, "Laura received a BA in psychology from the University of Washington. She has also completed a course in business French. She reads and writes French."),
                                    React.createElement("div", { className: "e-card-actions center" },
                                        React.createElement("button", { className: "e-card-btn", title: "E-mail" },
                                            React.createElement("span", { className: "e-mail-icon cb-icons " })),
                                        React.createElement("button", { className: "e-card-btn", title: "Google+" },
                                            React.createElement("span", { className: "e-google-icon cb-icons " })),
                                        React.createElement("button", { className: "e-card-btn", title: "Facebook" },
                                            React.createElement("span", { className: "e-fb-icon cb-icons " })),
                                        React.createElement("button", { className: "e-card-btn", title: "Tweets" },
                                            React.createElement("span", { className: "e-tweet-icon cb-icons " }))))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates rendering of vertical layout ",
                    React.createElement("code", null, "card"),
                    " with business and profile card information.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The vertical card sample illustrate card contents in vertically aligned layout with header, content, and action buttons.",
                    React.createElement("p", null,
                        "More information about Card can be found in this",
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/card/getting-started/" }, "documentation"),
                        " section.")))));
    };
    return Vertical;
}(sample_base_1.SampleBase));
exports.Vertical = Vertical;
