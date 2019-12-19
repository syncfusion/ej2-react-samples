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
require("./types.css");
// tslint:disable:max-line-length
// *  Sample for CSS avatar component
var Types = (function (_super) {
    __extends(Types, _super);
    function Types() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Types.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: "sample_container avatar-types" },
                React.createElement("div", { className: "avatar-block" },
                    React.createElement("div", { className: "e-card e-avatar-showcase" },
                        React.createElement("div", { className: "e-card-content" },
                            React.createElement("div", { className: "e-avatar e-avatar-xlarge e-avatar-circle" },
                                React.createElement("img", { className: "image", src: "./src/avatar/images/pic01.png", alt: "avatar" }))),
                        React.createElement("div", { className: "e-card-content" },
                            React.createElement("div", null, "Image")))),
                React.createElement("div", { className: "avatar-block" },
                    React.createElement("div", { className: "e-card e-avatar-showcase" },
                        React.createElement("div", { className: "e-card-content" },
                            React.createElement("div", { className: "e-avatar e-avatar-xlarge e-avatar-circle" },
                                React.createElement("div", { className: "svg_icons chrome" }))),
                        React.createElement("div", { className: "e-card-content" },
                            React.createElement("div", null, "SVG")))),
                React.createElement("div", { className: "avatar-block" },
                    React.createElement("div", { className: "e-card e-avatar-showcase" },
                        React.createElement("div", { className: "e-card-content" },
                            React.createElement("div", { className: "e-avatar e-avatar-xlarge e-avatar-circle" }, "GR")),
                        React.createElement("div", { className: "e-card-content" },
                            React.createElement("div", null, "Initial")))),
                React.createElement("div", { className: "avatar-block" },
                    React.createElement("div", { className: "e-card e-avatar-showcase" },
                        React.createElement("div", { className: "e-card-content" },
                            React.createElement("div", { className: "e-avatar e-avatar-xlarge e-avatar-circle" },
                                React.createElement("div", { className: "e-people icons" }))),
                        React.createElement("div", { className: "e-card-content" },
                            React.createElement("div", null, "Font Icon")))),
                React.createElement("div", { className: "avatar-block" },
                    React.createElement("div", { className: "e-card e-avatar-showcase" },
                        React.createElement("div", { className: "e-card-content" },
                            React.createElement("div", { className: "e-avatar e-avatar-xlarge e-avatar-circle" }, "User")),
                        React.createElement("div", { className: "e-card-content" },
                            React.createElement("div", null, "Word")))),
                React.createElement("div", { className: "avatar-block" },
                    React.createElement("div", { className: "e-card e-avatar-showcase" },
                        React.createElement("div", { className: "e-card-content" },
                            React.createElement("div", { className: "e-avatar e-avatar-xlarge e-avatar-circle custom" },
                                React.createElement("div", { className: "e-people icons" }))),
                        React.createElement("div", { className: "e-card-content" },
                            React.createElement("div", null, "Custom"))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the different types of content that are used with avatar component like SVG icons, Font icons, words, letters, and images.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The avatar component is flexible to support various types of icons and images. In this sample, the content like SVG, font icons, and letters will be wrapped by the avatar element."))));
    };
    return Types;
}(sample_base_1.SampleBase));
exports.Types = Types;
