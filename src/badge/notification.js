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
require("./notification.css");
var Notification = /** @class */ (function (_super) {
    __extends(Notification, _super);
    function Notification() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Notification.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section badge-samples' },
                React.createElement("div", { className: "sample_container badge-notification" },
                    React.createElement("div", { className: "layout" },
                        React.createElement("div", { className: "margin" },
                            React.createElement("div", { className: "margin fontSize" }, "Notification"),
                            React.createElement("div", { className: "badge-block" },
                                React.createElement("div", { className: "badge_whatsapp svg_icons" }),
                                React.createElement("span", { className: "e-badge e-badge-warning e-badge-notification e-badge-overlap" }, "99+")),
                            React.createElement("div", { className: "badge-block" },
                                React.createElement("div", { className: "badge_twitter svg_icons" }),
                                React.createElement("span", { className: "e-badge e-badge-primary e-badge-notification e-badge-overlap" }, "7")),
                            React.createElement("div", { className: "badge-block" },
                                React.createElement("div", { className: "badge_facebook svg_icons" }),
                                React.createElement("span", { className: "e-badge e-badge-danger e-badge-notification e-badge-overlap" }, "99+")),
                            React.createElement("div", { className: "badge-block" },
                                React.createElement("div", { className: "badge_skype svg_icons" }),
                                React.createElement("span", { className: "e-badge e-badge-secondary e-badge-notification e-badge-overlap" }, "18")),
                            React.createElement("div", { className: "margin fontSize" }, "Circle"),
                            React.createElement("div", { className: "badge-block" },
                                React.createElement("div", { className: "badge_whatsapp svg_icons" }),
                                React.createElement("span", { className: "e-badge e-badge-warning e-badge-notification e-badge-overlap e-badge-circle" }, "19")),
                            React.createElement("div", { className: "badge-block" },
                                React.createElement("div", { className: "badge_twitter svg_icons" }),
                                React.createElement("span", { className: "e-badge e-badge-primary e-badge-notification e-badge-overlap e-badge-circle" }, "27")),
                            React.createElement("div", { className: "badge-block" },
                                React.createElement("div", { className: "badge_facebook svg_icons" }),
                                React.createElement("span", { className: "e-badge e-badge-danger e-badge-notification e-badge-overlap e-badge-circle" }, "3")),
                            React.createElement("div", { className: "badge-block" },
                                React.createElement("div", { className: "badge_skype svg_icons" }),
                                React.createElement("span", { className: "e-badge e-badge-secondary e-badge-notification e-badge-overlap e-badge-circle" }, "85")),
                            React.createElement("div", { className: "margin fontSize" }, "Dot"),
                            React.createElement("div", { className: "badge-block" },
                                React.createElement("div", { className: "badge_contact svg_icons" }),
                                React.createElement("span", { className: "e-badge e-badge-success e-badge-overlap e-badge-dot e-badge-bottom" })),
                            React.createElement("div", { className: "badge-block" },
                                React.createElement("div", { className: "badge_skype svg_icons" }),
                                React.createElement("span", { className: "e-badge e-badge-success e-badge-overlap e-badge-dot e-badge-bottom" })),
                            React.createElement("div", { className: "badge-block" },
                                React.createElement("div", { className: "badge_facebook svg_icons" }),
                                React.createElement("span", { className: "e-badge e-badge-info e-badge-overlap e-badge-dot" })),
                            React.createElement("div", { className: "badge-block" },
                                React.createElement("div", { className: "badge_pinterest svg_icons" }),
                                React.createElement("span", { className: "e-badge e-badge-danger e-badge-overlap e-badge-dot" })))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates the types of the notification badge. To apply the notification badge, add",
                    React.createElement("code", null, ".e-badge-notification"),
                    " class or",
                    React.createElement("code", null, ".e-badge-dot"),
                    " class to the dot badge along with",
                    React.createElement("code", null, ".e-badge"),
                    " class.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "There are 3 types of notification badges and they are listed as follows. When using the notification badge, always apply",
                    React.createElement("code", null, "position: relative"),
                    " to the container element."),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        "Default notification: The",
                        React.createElement("code", null, ".e-badge-notification"),
                        " applies general notification badge."),
                    React.createElement("li", null,
                        "Circle notification: The",
                        React.createElement("code", null, ".e-badge-circle"),
                        " with .e-badge-notification applies the circle notification badge."),
                    React.createElement("li", null,
                        "Dot notification: The",
                        React.createElement("code", null, ".e-badge-dot"),
                        " applies the dot badge to the target element.")),
                React.createElement("p", null,
                    "The position can be changed to the bottom by adding the",
                    React.createElement("code", null, ".e-badge-bottom"),
                    " class."))));
    };
    return Notification;
}(sample_base_1.SampleBase));
exports.Notification = Notification;
