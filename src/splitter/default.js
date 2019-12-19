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
var ej2_react_layouts_1 = require("@syncfusion/ej2-react-layouts");
require("./splitter.component.css");
/**
 * Splitter Basic rendering
 */
var Basic = (function (_super) {
    __extends(Basic, _super);
    function Basic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // horizontal Splitter content
    Basic.prototype.hPaneContent1 = function () {
        return (React.createElement("div", { className: "splitter-content" },
            React.createElement("div", null,
                " Left pane",
                React.createElement("div", { id: 'panetext' }, "size: 25%"),
                React.createElement("div", { id: 'panetext' }, "min: 60px"))));
    };
    ;
    Basic.prototype.hPaneContent2 = function () {
        return (React.createElement("div", { className: "splitter-content" },
            React.createElement("span", null,
                "Middle pane",
                React.createElement("div", { id: 'panetext' }, "size: 50%"),
                React.createElement("div", { id: 'panetext' }, "min: 60px"))));
    };
    ;
    Basic.prototype.hPaneContent3 = function () {
        return (React.createElement("div", { className: "splitter-content" },
            React.createElement("span", null,
                "Right pane",
                React.createElement("div", { id: 'panetext' }, "size: 25%"),
                React.createElement("div", { id: 'panetext' }, "min: 60px"))));
    };
    ;
    // vertical Splitter content
    Basic.prototype.vPaneContent1 = function () {
        return (React.createElement("div", { className: "splitter-content" },
            React.createElement("span", null,
                "Top pane",
                React.createElement("div", { id: 'panetext' }, "size: 30%"),
                React.createElement("div", { id: 'panetext' }, "min: 60px"))));
    };
    ;
    Basic.prototype.vPaneContent2 = function () {
        return (React.createElement("div", { className: "splitter-content" },
            React.createElement("span", null,
                "Middle pane",
                React.createElement("div", { id: 'panetext' }, "size: 40%"),
                React.createElement("div", { id: 'panetext' }, "min: 60px"))));
    };
    ;
    Basic.prototype.vPaneContent3 = function () {
        return (React.createElement("div", { className: "splitter-content" },
            React.createElement("span", null,
                "Bottom pane",
                React.createElement("div", { id: 'panetext' }, "size: 30%"),
                React.createElement("div", { id: 'panetext' }, "min: 60px"))));
    };
    ;
    Basic.prototype.render = function () {
        return (React.createElement("div", { id: "defaultSplitter", className: "control-section" },
            React.createElement("div", { className: "pane1" },
                React.createElement("div", { id: "pane-heading" }, "Horizontal Splitter"),
                React.createElement(ej2_react_layouts_1.SplitterComponent, { height: "110px", width: "100%", separatorSize: 4 },
                    React.createElement(ej2_react_layouts_1.PanesDirective, null,
                        React.createElement(ej2_react_layouts_1.PaneDirective, { size: "25%", min: "60px", content: this.hPaneContent1 }),
                        React.createElement(ej2_react_layouts_1.PaneDirective, { size: "50%", min: "60px", content: this.hPaneContent2 }),
                        React.createElement(ej2_react_layouts_1.PaneDirective, { size: "25%", min: "60px", content: this.hPaneContent3 })))),
            React.createElement("div", { className: "pane2" },
                React.createElement("div", { id: "pane-heading" }, "Vertical Splitter"),
                React.createElement(ej2_react_layouts_1.SplitterComponent, { height: "240px", width: "100%", orientation: "Vertical", separatorSize: 4 },
                    React.createElement(ej2_react_layouts_1.PanesDirective, null,
                        React.createElement(ej2_react_layouts_1.PaneDirective, { size: "30%", min: "60px", content: this.vPaneContent1 }),
                        React.createElement(ej2_react_layouts_1.PaneDirective, { size: "40%", min: "60px", content: this.vPaneContent2 }),
                        React.createElement(ej2_react_layouts_1.PaneDirective, { size: "30%", min: "60px", content: this.vPaneContent3 })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This example demonstrates the default functionalities of the ",
                    React.createElement("code", null, "Splitter"),
                    " control. To resize panes and increase the dimension of a pane, drag a separator (divider) bar.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The split panes of the Splitter control can be oriented horizontally or vertically using the Orientation property.",
                    React.createElement("ul", null,
                        React.createElement("li", null, "Set orientation property to Horizontal to create horizontal splitter, which align panels left-to-right."),
                        React.createElement("li", null, "Set orientation property to Vertical to create vertical splitter, which align panels top-to-bottom.")),
                    "The splitter allows resizing its panes when the drag separator (divider) bar is used to increase its dimension."))));
    };
    return Basic;
}(sample_base_1.SampleBase));
exports.Basic = Basic;
