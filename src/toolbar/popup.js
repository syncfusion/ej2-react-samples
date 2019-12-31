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
var Popup = (function (_super) {
    __extends(Popup, _super);
    function Popup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Popup.prototype.render = function () {
        var today = new Date();
        var ele = '<div class = "e-tool-name">' + today.toLocaleString('en-us', { month: 'long' }) + ' ' + today.getFullYear() + '</div>';
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section tbar-control-section' },
                React.createElement("div", { className: 'control toolbar-sample tbar-sample', style: { margin: '25px 0' } },
                    React.createElement(ej2_react_navigations_1.ToolbarComponent, { overflowMode: 'Popup' },
                        React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-cut-icon tb-icons', tooltipText: 'Cut', text: 'Cut', showTextOn: 'Overflow', overflow: 'Show' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-copy-icon tb-icons', tooltipText: 'Copy', showTextOn: 'Overflow', overflow: 'Show' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-paste-icon tb-icons', tooltipText: 'Paste', showTextOn: 'Overflow', overflow: 'Show' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Separator' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-bold-icon tb-icons', tooltipText: 'Bold', text: 'Bold', showTextOn: 'Overflow', overflow: 'Show' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-underline-icon tb-icons', tooltipText: 'Underline', text: 'Underline', showTextOn: 'Overflow', overflow: 'Show' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-italic-icon tb-icons', tooltipText: 'Italic', text: 'Italic', showTextOn: 'Overflow', overflow: 'Show' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Separator' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-bullets-icon tb-icons', tooltipText: 'Bullets', overflow: 'Show', text: 'Bullets' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-numbering-icon tb-icons', tooltipText: 'Numbering', overflow: 'Show', text: 'Numbering' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Separator' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-tbar-undo-icon tb-icons', tooltipText: 'Undo', text: 'Undo' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-tbar-redo-icon tb-icons', tooltipText: 'Redo', text: 'Redo' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Separator' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-alignleft-icon tb-icons', tooltipText: 'Align_Left', text: 'Left', showTextOn: 'Overflow', overflow: 'Show' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-alignright-icon tb-icons', tooltipText: 'Align_Right', text: 'Right', showTextOn: 'Overflow', overflow: 'Show' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-aligncenter-icon tb-icons', tooltipText: 'Align_Center', text: 'Center', showTextOn: 'Overflow', overflow: 'Show' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-alignjustify-icon tb-icons', tooltipText: 'Align_Justify', text: 'justify', showTextOn: 'Overflow', overflow: 'Show' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Separator' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-radar-icon tb-icons', text: 'Radar', tooltipText: 'Radar Chart', showTextOn: 'Overflow' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-line-icon tb-icons', text: 'Line', tooltipText: 'Line Chart', showTextOn: 'Overflow' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-doughnut-icon tb-icons', text: 'Doughnut', tooltipText: 'Doughnut Chart', showTextOn: 'Overflow' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-bubble-icon tb-icons', text: 'Bubble', tooltipText: 'Bubble Chart', showTextOn: 'Overflow' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-table-icon tb-icons', text: 'Table', tooltipText: 'Table Chart', showTextOn: 'Overflow' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-picture-icon tb-icons', text: 'Picture', tooltipText: 'Picture Chart', showTextOn: 'Overflow' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-design-icon tb-icons', text: 'Design', tooltipText: 'Design Chart', showTextOn: 'Overflow' }))),
                    React.createElement("br", null),
                    React.createElement("br", null),
                    React.createElement(ej2_react_navigations_1.ToolbarComponent, { overflowMode: 'Popup', id: "toolbar_popalways" },
                        React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                            React.createElement(ej2_react_navigations_1.ItemDirective, { template: ele, overflow: 'Show' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icon-day e-icons', tooltipText: 'Today', text: 'Today', overflow: 'Hide', align: 'Right' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Separator' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icon-week e-icons', tooltipText: 'Week', text: 'Week', overflow: 'Hide', align: 'Right' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icon-month e-icons', tooltipText: 'Month', text: 'Month', overflow: 'Hide', align: 'Right' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icon-year e-icons', tooltipText: 'Year', text: 'Year', overflow: 'Hide', align: 'Right' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-print e-icons', tooltipText: 'Print', text: 'Print', overflow: 'Hide', showAlwaysInPopup: true }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-reccurence-icon e-icons', tooltipText: 'Sync', text: 'Sync', overflow: 'Hide', showAlwaysInPopup: true }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates the Popup mode in the ",
                    React.createElement("code", null, "Toolbar"),
                    ". Click the drop-down icon to open the ",
                    React.createElement("code", null, "popup"),
                    " and see the hidden commands of the Toolbar.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "Popup mode display can be enabled to view primary priority items in toolbar and secondary priority items in the popup."),
                React.createElement("ul", null,
                    React.createElement("li", null, "In first Toolbar, the popup will be shown when the content exceeds the available viewing area."),
                    React.createElement("li", null,
                        "The second Toolbar is set with priority for specific toolbar items using ",
                        React.createElement("strong", null,
                            React.createElement("code", null,
                                " ",
                                React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/toolbar/item/#showalwaysinpopup" }, "showAlwaysInPopup")),
                            " "),
                        ", which is always displayed in the popup.")),
                React.createElement("br", null),
                React.createElement("p", null,
                    "You can set priority to toolbar item using ",
                    React.createElement("strong", null,
                        React.createElement("code", null,
                            " ",
                            React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/toolbar/item/#overflow" }, " overflow")),
                        " "),
                    "        property. Possible values are as follows,"),
                React.createElement("table", { style: { width: "100%" } },
                    React.createElement("tr", null,
                        React.createElement("th", null,
                            React.createElement("strong", null, "Overflow")),
                        React.createElement("th", null,
                            React.createElement("strong", null, "Description"))),
                    React.createElement("tr", null,
                        React.createElement("td", null,
                            React.createElement("code", null, "Show"),
                            " "),
                        React.createElement("td", null, "To display the commands in toolbar with primary priority.")),
                    React.createElement("tr", null,
                        React.createElement("td", null,
                            React.createElement("code", null, "Hide"),
                            " "),
                        React.createElement("td", null, "To display the commands in popup with secondary priority.")),
                    React.createElement("tr", null,
                        React.createElement("td", null,
                            React.createElement("code", null, "None (default) ")),
                        React.createElement("td", null, "To display the commands with normal order without any priority."))))));
    };
    return Popup;
}(sample_base_1.SampleBase));
exports.Popup = Popup;
