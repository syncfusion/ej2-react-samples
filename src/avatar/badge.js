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
require("./badge.css");
// tslint:disable:max-line-length
// *  Sample for CSS avatar component
var Badge = /** @class */ (function (_super) {
    __extends(Badge, _super);
    function Badge() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Badge.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: "sample_container avatar-badge" },
                React.createElement("div", { className: "avatar-block" },
                    React.createElement("div", { className: "e-card e-avatar-showcase" },
                        React.createElement("div", { className: "e-card-content" },
                            React.createElement("div", { className: "avatar-sub-block" },
                                React.createElement("div", { className: "e-avatar e-avatar-xsmall" },
                                    React.createElement("img", { src: "./src/avatar/images/pic01.png", alt: "profile_pic" })),
                                React.createElement("span", { className: "e-badge e-badge-primary e-badge-overlap e-badge-notification e-badge-circle" }, "6")),
                            React.createElement("div", { className: "avatar-sub-block" },
                                React.createElement("div", { className: "e-avatar e-avatar-small" },
                                    React.createElement("img", { src: "./src/avatar/images/pic01.png", alt: "profile_pic" })),
                                React.createElement("span", { className: "e-badge e-badge-primary e-badge-overlap e-badge-notification e-badge-circle" }, "12")),
                            React.createElement("div", { className: "avatar-sub-block" },
                                React.createElement("div", { className: "e-avatar" },
                                    React.createElement("img", { src: "./src/avatar/images/pic01.png", alt: "profile_pic" })),
                                React.createElement("span", { className: "e-badge e-badge-primary e-badge-overlap e-badge-notification" }, "46")),
                            React.createElement("div", { className: "avatar-sub-block" },
                                React.createElement("div", { className: "e-avatar e-avatar-large" },
                                    React.createElement("img", { src: "./src/avatar/images/pic01.png", alt: "profile_pic" })),
                                React.createElement("span", { className: "e-badge e-badge-primary e-badge-overlap e-badge-notification" }, "82")),
                            React.createElement("div", { className: "avatar-sub-block" },
                                React.createElement("div", { className: "e-avatar e-avatar-xlarge" },
                                    React.createElement("img", { src: "./src/avatar/images/pic01.png", alt: "profile_pic" })),
                                React.createElement("span", { className: "e-badge e-badge-primary e-badge-overlap e-badge-notification" }, "99+"))))),
                React.createElement("div", { className: "circleAvatar avatar-block" },
                    React.createElement("div", { className: "e-card e-avatar-showcase" },
                        React.createElement("div", { className: "e-card-content" },
                            React.createElement("div", { className: "avatar-sub-block" },
                                React.createElement("div", { className: "e-avatar e-avatar-circle e-avatar-xsmall" },
                                    React.createElement("img", { src: "./src/avatar/images/pic01.png", alt: "profile_pic" })),
                                React.createElement("span", { className: "e-badge e-badge-primary e-badge-overlap e-badge-notification e-badge-circle" }, "6")),
                            React.createElement("div", { className: "avatar-sub-block" },
                                React.createElement("div", { className: "e-avatar e-avatar-circle e-avatar-small" },
                                    React.createElement("img", { src: "./src/avatar/images/pic01.png", alt: "profile_pic" })),
                                React.createElement("span", { className: "e-badge e-badge-primary e-badge-overlap e-badge-notification e-badge-circle" }, "12")),
                            React.createElement("div", { className: "avatar-sub-block" },
                                React.createElement("div", { className: "e-avatar e-avatar-circle" },
                                    React.createElement("img", { src: "./src/avatar/images/pic01.png", alt: "profile_pic" })),
                                React.createElement("span", { className: "e-badge e-badge-primary e-badge-overlap e-badge-notification" }, "46")),
                            React.createElement("div", { className: "avatar-sub-block" },
                                React.createElement("div", { className: "e-avatar e-avatar-circle e-avatar-large" },
                                    React.createElement("img", { src: "./src/avatar/images/pic01.png", alt: "profile_pic" })),
                                React.createElement("span", { className: "e-badge e-badge-primary e-badge-overlap e-badge-notification" }, "82")),
                            React.createElement("div", { className: "avatar-sub-block" },
                                React.createElement("div", { className: "e-avatar e-avatar-circle e-avatar-xlarge" },
                                    React.createElement("img", { src: "./src/avatar/images/pic01.png", alt: "profile_pic" })),
                                React.createElement("span", { className: "e-badge e-badge-primary e-badge-overlap e-badge-notification" }, "99+")))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the integration of avatar component with badges to create notification avatars.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The avatar can be used with badges to indicate the new activities to users. The container needs",
                    React.createElement("code", null, "position: relative"),
                    " property to achieve the notifications styled avatar. In this sample, the wrapper is applied with",
                    React.createElement("code", null, "position: relative"),
                    " property with avatar and badge elements inside it."),
                React.createElement("p", null, "Since the avatar is a supportive and dependent component, it can be used in many ways and have wide variety of use-cases."))));
    };
    return Badge;
}(sample_base_1.SampleBase));
exports.Badge = Badge;
