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
require("./card.css");
// tslint:disable:max-line-length
// *  Sample for CSS avatar component
var Card = /** @class */ (function (_super) {
    __extends(Card, _super);
    function Card() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Card.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: "sample_container card_sample" },
                React.createElement("div", { className: "e-card e-custom-card" },
                    React.createElement("div", { className: "e-card-header" },
                        React.createElement("div", { className: "e-avatar e-avatar-circle e-avatar-xlarge" },
                            React.createElement("img", { src: "./src/avatar/images/pic02.png", alt: "profile_pic" })),
                        "\u00A0"),
                    React.createElement("div", { className: "e-card-header" },
                        React.createElement("div", { className: "e-card-header-caption center" },
                            React.createElement("div", { className: "e-card-header-title name" }, "Laura Callahan"),
                            React.createElement("div", { className: "e-card-sub-title" }, "Sales Coordinator"))),
                    React.createElement("div", { className: "e-card-content" },
                        React.createElement("p", { className: "avatar-content" }, " Laura received a BA in psychology from the University of Washington. She has also completed a course in business French. She reads and writes French.")))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the integration of avatar component with card component to create business cards.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The circle avatar is integrated into card component to design business cards. The image element is wrapped by the avatar container to apply circle style to avatar and add",
                    React.createElement("code", null, ".e-avatar-circle"),
                    " class to the avatar container."))));
    };
    return Card;
}(sample_base_1.SampleBase));
exports.Card = Card;
