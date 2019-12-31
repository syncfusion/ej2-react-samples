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
var Types = (function (_super) {
    __extends(Types, _super);
    function Types() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Types.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section badge-types-section' },
                React.createElement("div", { className: "sample_container badge-types" },
                    React.createElement("div", { className: "badge-block" },
                        React.createElement("div", { className: "e-card e-badge-showcase" },
                            React.createElement("div", { className: "e-card-content" },
                                React.createElement("div", { className: "badge-block-first" },
                                    React.createElement("button", { className: "e-btn" }, "Primary"),
                                    React.createElement("span", { className: "e-badge e-badge-primary e-badge-notification e-badge-overlap" }, "10"))),
                            React.createElement("div", { className: "e-card-content text" },
                                React.createElement("div", null,
                                    React.createElement("code", null, ".e-badge-primary"))))),
                    React.createElement("div", { className: "badge-block" },
                        React.createElement("div", { className: "e-card e-badge-showcase" },
                            React.createElement("div", { className: "e-card-content" },
                                React.createElement("button", { className: "e-btn" },
                                    "Secondary",
                                    React.createElement("span", { className: "e-badge e-badge-secondary e-badge-notification e-badge-overlap" }, "20"))),
                            React.createElement("div", { className: "e-card-content text" },
                                React.createElement("code", null, ".e-badge-secondary")))),
                    React.createElement("div", { className: "badge-block" },
                        React.createElement("div", { className: "e-card e-badge-showcase" },
                            React.createElement("div", { className: "e-card-content" },
                                React.createElement("button", { className: "e-btn" },
                                    "Success",
                                    React.createElement("span", { className: "e-badge e-badge-success e-badge-notification e-badge-overlap" }, "25"))),
                            React.createElement("div", { className: "e-card-content text" },
                                React.createElement("code", null, ".e-badge-success")))),
                    React.createElement("div", { className: "badge-block" },
                        React.createElement("div", { className: "e-card e-badge-showcase" },
                            React.createElement("div", { className: "e-card-content" },
                                React.createElement("button", { className: "e-btn" },
                                    "Danger",
                                    React.createElement("span", { className: "e-badge e-badge-danger e-badge-notification e-badge-overlap" }, "30"))),
                            React.createElement("div", { className: "e-card-content text" },
                                React.createElement("code", null, ".e-badge-danger")))),
                    React.createElement("div", { className: "badge-block" },
                        React.createElement("div", { className: "e-card e-badge-showcase" },
                            React.createElement("div", { className: "e-card-content" },
                                React.createElement("button", { className: "e-btn" },
                                    "Warning",
                                    React.createElement("span", { className: "e-badge e-badge-warning e-badge-notification e-badge-overlap" }, "40"))),
                            React.createElement("div", { className: "e-card-content text" },
                                React.createElement("code", null, ".e-badge-warning")))),
                    React.createElement("div", { className: "badge-block" },
                        React.createElement("div", { className: "e-card e-badge-showcase" },
                            React.createElement("div", { className: "e-card-content" },
                                React.createElement("button", { className: "e-btn" },
                                    "Info",
                                    React.createElement("span", { className: "e-badge e-badge-info e-badge-notification e-badge-overlap" }, "45"))),
                            React.createElement("div", { className: "e-card-content text" },
                                React.createElement("code", null, ".e-badge-info")))),
                    React.createElement("div", { className: "badge-block" },
                        React.createElement("div", { className: "e-card e-badge-showcase" },
                            React.createElement("div", { className: "e-card-content" },
                                React.createElement("button", { className: "e-btn e-info" },
                                    "Light",
                                    React.createElement("span", { className: "e-badge e-badge-light e-badge-notification e-badge-overlap" }, "50"))),
                            React.createElement("div", { className: "e-card-content text" },
                                React.createElement("code", null, ".e-badge-light")))),
                    React.createElement("div", { className: "badge-block" },
                        React.createElement("div", { className: "e-card e-badge-showcase" },
                            React.createElement("div", { className: "e-card-content" },
                                React.createElement("button", { className: "e-btn e-info" },
                                    "Dark",
                                    React.createElement("span", { className: "e-badge e-badge-dark e-badge-notification e-badge-overlap" }, "75"))),
                            React.createElement("div", { className: "e-card-content text" },
                                React.createElement("code", null, ".e-badge-dark")))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates 8-predefined badge colors for various scenarios which can be applied from the modifier class.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The badge supports the following 8 different essential colors for various situations. All the classes should be added with",
                    React.createElement("code", null, ".e-badge"),
                    " class."),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        "Primary: The",
                        React.createElement("code", null, ".e-badge-primary"),
                        " class applies the primary color."),
                    React.createElement("li", null,
                        "Secondary: The",
                        React.createElement("code", null, ".e-badge-secondary"),
                        " class applies the secondary color."),
                    React.createElement("li", null,
                        "Success: The",
                        React.createElement("code", null, ".e-badge-success"),
                        " class applies the success color."),
                    React.createElement("li", null,
                        "Danger: The",
                        React.createElement("code", null, ".e-badge-danger"),
                        " class applies the danger color."),
                    React.createElement("li", null,
                        "Warning: The",
                        React.createElement("code", null, ".e-badge-warning"),
                        " class applies the warning color."),
                    React.createElement("li", null,
                        "Info: The",
                        React.createElement("code", null, ".e-badge-info"),
                        " class applies the info color."),
                    React.createElement("li", null,
                        "Light: The",
                        React.createElement("code", null, ".e-badge-light"),
                        " class applies the light color."),
                    React.createElement("li", null,
                        "Dark: The",
                        React.createElement("code", null, ".e-badge-dark"),
                        " class applies the dark color.")))));
    };
    return Types;
}(sample_base_1.SampleBase));
exports.Types = Types;
