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
require("./toolbar.component.css");
var Default = (function (_super) {
    __extends(Default, _super);
    function Default() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Default.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section tbar-control-section' },
                React.createElement("div", { className: 'control toolbar-sample tbar-sample', style: { margin: '25px 0' } },
                    React.createElement(ej2_react_navigations_1.ToolbarComponent, null,
                        React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-cut-icon tb-icons', tooltipText: 'Cut' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-copy-icon tb-icons', tooltipText: 'Copy' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-paste-icon tb-icons', tooltipText: 'Paste' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Separator' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-bold-icon tb-icons', tooltipText: 'Bold' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-underline-icon tb-icons', tooltipText: 'Underline' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-italic-icon tb-icons', tooltipText: 'Italic' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-color-icon tb-icons', tooltipText: 'Color-Picker' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Separator' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-alignleft-icon tb-icons', tooltipText: 'Align_Left' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-alignright-icon tb-icons', tooltipText: 'Align_Right' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-aligncenter-icon tb-icons', tooltipText: 'Align_Center' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-alignjustify-icon tb-icons', tooltipText: 'Align_Justify' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Separator' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-bullets-icon tb-icons', tooltipText: 'Bullets' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-numbering-icon tb-icons', tooltipText: 'Numbering' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Separator' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-bullets-icon tb-icons', tooltipText: 'Bullets' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-numbering-icon tb-icons', tooltipText: 'Numbering' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Separator' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-ascending-icon tb-icons', tooltipText: 'Sort A - Z' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-descending-icon tb-icons', tooltipText: 'Sort Z - A' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Separator' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-indent-icon tb-icons', tooltipText: 'Text Indent' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-outdent-icon tb-icons', tooltipText: 'Text Outdent' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Separator' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-clear-icon tb-icons', tooltipText: 'Clear' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-reload-icon tb-icons', tooltipText: 'Reload' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-export-icon tb-icons', tooltipText: 'Export' }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates the default functionalities of the ",
                    React.createElement("code", null, "Toolbar"),
                    ". Select any command or click the left/right navigation icon or touch swipe to see the hidden commands of the Toolbar")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    React.createElement("strong", null, "Toolbar"),
                    " is a graphical control on which commands / buttons will be displayed in horizontal order. By default scrolling display mode enabled when content exceeds the available viewing area."),
                React.createElement("br", null),
                React.createElement("p", null, "You can use left / right navigation icon or touch swipe to see the hidden commands of the toolbar."),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        "Initially toolbar rendered with the ",
                        React.createElement("code", null, " left and right navigation"),
                        " icon and you can see hidden commands by ",
                        React.createElement("code", null, "moving in right or left"),
                        "            direction."),
                    React.createElement("li", null,
                        "When you reach ",
                        React.createElement("code", null, "right / left end of toolbar"),
                        ", corresponding  navigation direction will be disabled."),
                    React.createElement("li", null, "You can continuously scroll the toolbar content by holding on the navigation icon."),
                    React.createElement("li", null,
                        "In ",
                        React.createElement("code", null, "devices"),
                        " navigation icons are not available. you can touch swipe to see the hidden commands of the toolbar.")))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
