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
var sample_CSS = "{ width: 100% }";
var Alignment = (function (_super) {
    __extends(Alignment, _super);
    function Alignment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Alignment.prototype.render = function () {
        function template() {
            return (React.createElement("div", { className: "e-folder" },
                React.createElement("div", { className: "e-folder-name" }, "Inbox(33)"),
                React.createElement("div", { className: "e-mail-id" }, "user@example.com")));
        }
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section tbar-control-section' },
                React.createElement("div", { className: 'control tbar-sample', style: { margin: '25px 0' } },
                    React.createElement(ej2_react_navigations_1.ToolbarComponent, null,
                        React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-tbar-menu-icon tb-icons', tooltipText: 'Menu' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { template: template, align: 'Center' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-tbar-search-icon tb-icons', tooltipText: 'Search', align: 'Right' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-tbar-settings-icon tb-icons', tooltipText: 'Popup', align: 'Right' }))),
                    React.createElement("div", { className: 'e-mail-items' },
                        React.createElement("div", { className: 'e-mail-item' },
                            React.createElement("div", { className: 'e-mail-image' },
                                React.createElement("div", { className: "e-def-avator" },
                                    React.createElement("span", null, "MA"))),
                            React.createElement("div", { className: 'e-mail-content' },
                                React.createElement("span", { className: "e-mail-header" }, "Maria Anders"),
                                React.createElement("span", { className: 'e-mail-time' }, "11:27AM"),
                                React.createElement("div", { className: "e-mail-subject" }, " Sales Representative "),
                                React.createElement("div", { className: "e-mail-description" }, " Can we schedule Meeting Appointment for today? "))),
                        React.createElement("div", { className: 'e-mail-item' },
                            React.createElement("div", { className: 'e-mail-image' },
                                React.createElement("div", { className: "e-def-avator" },
                                    React.createElement("span", null, "VA"))),
                            React.createElement("div", { className: 'e-mail-content' },
                                React.createElement("span", { className: "e-mail-header" }, "Victoria Ashworth"),
                                React.createElement("span", { className: "e-mail-time" }, "Fri 7:50AM"),
                                React.createElement("div", { className: "e-mail-subject" }, " Sales Representative "),
                                React.createElement("div", { className: "e-mail-description" }, " Yes we are available for meeting tomorrow "))),
                        React.createElement("div", { className: 'e-mail-item' },
                            React.createElement("div", { className: 'e-mail-image' },
                                React.createElement("div", { className: "e-def-avator" },
                                    React.createElement("span", null, "TH"))),
                            React.createElement("div", { className: 'e-mail-content' },
                                React.createElement("span", { className: "e-mail-header" }, "Thomas Hardey"),
                                React.createElement("span", { className: "e-mail-time" }, "Fri 7:50AM"),
                                React.createElement("div", { className: "e-mail-subject" }, " Sales Representative "),
                                React.createElement("div", { className: "e-mail-description" }, "Customer has accepted our proposal. Would it be possible for arrange meeting tomorrow? ")))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates the aligning the ",
                    React.createElement("code", null, "Toolbar"),
                    " commands in left , right and center position.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    React.createElement("strong", null, "Toolbar"),
                    " commands can be aligned in left , right and center positions. By default, all the commands are left aligned. User can customize the alignment of each toolbar item using ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/toolbar/item/#align" }, "  align")),
                    " property. Possible values are as follows."),
                React.createElement("br", null),
                React.createElement("table", { style: { sample_CSS: sample_CSS } },
                    React.createElement("tr", null,
                        React.createElement("th", null,
                            React.createElement("strong", null, "Alignment Option")),
                        React.createElement("th", null,
                            React.createElement("strong", null, "Description"))),
                    React.createElement("tr", null,
                        React.createElement("td", null,
                            React.createElement("code", null, "Left (default)"),
                            " "),
                        React.createElement("td", null, "To align commands to the left side of the toolbar.")),
                    React.createElement("tr", null,
                        React.createElement("td", null,
                            React.createElement("code", null, "Center"),
                            " "),
                        React.createElement("td", null, "To align commands to the center of the toolbar.")),
                    React.createElement("tr", null,
                        React.createElement("td", null,
                            React.createElement("code", null, "Right")),
                        React.createElement("td", null, "To align commands to the right side of the toolbar."))))));
    };
    return Alignment;
}(sample_base_1.SampleBase));
exports.Alignment = Alignment;
