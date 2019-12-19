"use strict";
/**
 * Tooltip default sample
 */
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
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var Default = (function (_super) {
    __extends(Default, _super);
    function Default(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { position: 'TopCenter' };
        return _this;
    }
    //Handle tooltip position based on drop-down value change
    Default.prototype.change = function (args) {
        this.setState({
            position: args.currentTarget.value
        });
    };
    Default.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-lg-8', style: { minHeight: '350px' } },
                    React.createElement(ej2_react_popups_1.TooltipComponent, { content: 'Lets go green & Save Earth !!!', position: this.state.position, tabIndex: 0, style: { display: 'block', position: 'absolute', left: 'calc( 50% - 60px)', top: '45%' } },
                        React.createElement(ej2_react_buttons_1.ButtonComponent, { tabIndex: -1 }, "Show Tooltip"))),
                React.createElement("div", { className: 'col-lg-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '30%', paddingTop: '4px' } },
                                    React.createElement("div", null, "Position")),
                                React.createElement("td", { style: { width: '70%', paddingRight: '10px' } },
                                    React.createElement("div", null,
                                        React.createElement("select", { id: 'ddl', name: 'ddl', onChange: this.change.bind(this), className: 'form-control', style: { padding: '6px' } },
                                            React.createElement("option", { value: "TopLeft" }, "Top Left"),
                                            React.createElement("option", { value: "TopCenter", selected: true }, "Top Center"),
                                            React.createElement("option", { value: "TopRight" }, "Top Right"),
                                            React.createElement("option", { value: "BottomLeft" }, "Bottom Left"),
                                            React.createElement("option", { value: "BottomCenter" }, "Bottom Center"),
                                            React.createElement("option", { value: "BottomRight" }, "Bottom Right"),
                                            React.createElement("option", { value: "LeftTop" }, "Left Top"),
                                            React.createElement("option", { value: "LeftCenter" }, "Left Center"),
                                            React.createElement("option", { value: "LeftBottom" }, "Left Bottom"),
                                            React.createElement("option", { value: "RightTop" }, "Right Top"),
                                            React.createElement("option", { value: "RightCenter" }, "Right Center"),
                                            React.createElement("option", { value: "RightBottom" }, "Right Bottom"))))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the default functionalities of the Tooltip which will open by Hover or Touch-hold action on button and displayed in 12 different positions.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "This sample illustrates a tooltip, that gets opened on hovering the target labelled \u201CShow Tooltip\u201D. The tooltip can be shown on 12 possible positions, by selecting the appropriate position values provided in the dropdown. The applicable tooltip positions are as follows:"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "TopLeft")),
                    React.createElement("li", null,
                        React.createElement("code", null, "TopCenter")),
                    React.createElement("li", null,
                        React.createElement("code", null, "TopRight")),
                    React.createElement("li", null,
                        React.createElement("code", null, "BottomLeft")),
                    React.createElement("li", null,
                        React.createElement("code", null, "BottomCenter")),
                    React.createElement("li", null,
                        React.createElement("code", null, "BottomRight")),
                    React.createElement("li", null,
                        React.createElement("code", null, "LeftTop")),
                    React.createElement("li", null,
                        React.createElement("code", null, "LeftCenter")),
                    React.createElement("li", null,
                        React.createElement("code", null, "LeftBottom")),
                    React.createElement("li", null,
                        React.createElement("code", null, "RightTop")),
                    React.createElement("li", null,
                        React.createElement("code", null, "RightCenter")),
                    React.createElement("li", null,
                        React.createElement("code", null, "RightBottom"))),
                React.createElement("p", null, "In case, if the tooltip needs to be opened on mobile devices, tap hold on the target labelled \u201CShow Tooltip\u201D instead of hovering and by default, it closes after 1.5 seconds on lift."),
                React.createElement("p", null,
                    "More information on the Tooltip instantiation can be found in the",
                    React.createElement("a", { href: "http://ej2.syncfusion.com/react/documentation/tooltip/getting-started.html", target: "_blank" }, " documentation section"),
                    "."))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
