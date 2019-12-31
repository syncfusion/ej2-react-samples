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
require("./default.css");
// tslint:disable:max-line-length
// *  Sample for CSS avatar component
var Default = (function (_super) {
    __extends(Default, _super);
    function Default() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Default.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: "sample_container avatar-default" },
                React.createElement("div", { className: "avatar-block" },
                    React.createElement("div", { className: "e-card e-avatar-showcase" },
                        React.createElement("div", { className: "e-card-content" },
                            React.createElement("div", { className: "e-avatar e-avatar-xsmall image" }),
                            React.createElement("div", { className: "e-avatar e-avatar-small image" }),
                            React.createElement("div", { className: "e-avatar image" }),
                            React.createElement("div", { className: "e-avatar e-avatar-large image" }),
                            React.createElement("div", { className: "e-avatar e-avatar-xlarge image" })),
                        React.createElement("div", { className: "e-card-content" },
                            React.createElement("div", null, "Default")))),
                React.createElement("div", { className: "circleAvatar avatar-block" },
                    React.createElement("div", { className: "e-card e-avatar-showcase" },
                        React.createElement("div", { className: "e-card-content" },
                            React.createElement("div", { className: "e-avatar e-avatar-xsmall e-avatar-circle image" }),
                            React.createElement("div", { className: "e-avatar e-avatar-small e-avatar-circle image" }),
                            React.createElement("div", { className: "e-avatar e-avatar-circle image" }),
                            React.createElement("div", { className: "e-avatar e-avatar-large e-avatar-circle image" }),
                            React.createElement("div", { className: "e-avatar e-avatar-xlarge e-avatar-circle image" })),
                        React.createElement("div", { className: "e-card-content" },
                            React.createElement("div", null, "Circle"))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates the default avatar and circle avatar in which the",
                    React.createElement("code", null, ".e-avatar"),
                    " and",
                    React.createElement("code", null, ".e-avatar-circle"),
                    " classes should be added, respectively to the target element.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The avatar is developed in pure CSS which is used to represents the profile picture or initials or icons in presentable way. It comes with two different shapes, they are listed below."),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        "Default avatar: To apply default avatar, add the",
                        React.createElement("code", null, ".e-avatar"),
                        " class to the target element."),
                    React.createElement("li", null,
                        "Circle avatar: To apply circle avatar, add the",
                        React.createElement("code", null, ".e-avatar-circle"),
                        " class to the target element.")),
                React.createElement("p", null, "The avatar comes with 5 different sizes, and are applied through modifier classes. They are:"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        "xSmall avatar: This can be applied by adding",
                        React.createElement("code", null, ".e-avatar-"),
                        " class."),
                    React.createElement("li", null,
                        "Small avatar: This can be applied by adding",
                        React.createElement("code", null, ".e-avatar-small"),
                        " class."),
                    React.createElement("li", null,
                        "Default avatar: This can be applied by adding",
                        React.createElement("code", null, ".e-avatar"),
                        " class. No additional class is needed for this."),
                    React.createElement("li", null,
                        "Large avatar: This can be applied by adding",
                        React.createElement("code", null, ".e-avatar-large"),
                        " class."),
                    React.createElement("li", null,
                        "xLarge avatar: This can be applied by adding",
                        React.createElement("code", null, ".e-avatar-xlarge"),
                        " class.")),
                React.createElement("p", null,
                    React.createElement("i", null,
                        "The",
                        React.createElement("code", null, ".e-avatar"),
                        " is the main class, which should be included in the target element to use any of the other avatar features.")),
                React.createElement("p", null, "The images can be added in the following two different ways to the avatar:"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        "Using CSS",
                        React.createElement("code", null, "background"),
                        " property on the avatar element. It doesn\u2019t require any additional element."),
                    React.createElement("li", null, "Using image tag. The image tag needs to be wrapped by the avatar element.")))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
