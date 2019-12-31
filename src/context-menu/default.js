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
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
require("./context-menu.css");
var Default = (function (_super) {
    __extends(Default, _super);
    function Default() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.animationSettings = {
            effect: ej2_base_1.Browser.isDevice ? 'ZoomIn' : 'SlideDown'
        };
        _this.content = ej2_base_1.Browser.isDevice ? 'Touch hold to open the ContextMenu' :
            'Right click/Touch hold to open the ContextMenu';
        //ContextMenu items definition
        _this.menuItems = [
            {
                text: 'Cut',
                iconCss: 'e-cm-icons e-cut'
            },
            {
                text: 'Copy',
                iconCss: 'e-cm-icons e-cm-copy'
            },
            {
                text: 'Paste',
                iconCss: 'e-cm-icons e-paste',
                items: [
                    {
                        text: 'Paste Text',
                        iconCss: 'e-cm-icons e-pastetext'
                    },
                    {
                        text: 'Paste Special',
                        iconCss: 'e-cm-icons e-pastespecial'
                    }
                ]
            },
            {
                separator: true
            },
            {
                text: 'Link',
                iconCss: 'e-cm-icons e-link'
            },
            {
                text: 'New Comment',
                iconCss: 'e-cm-icons e-comment'
            }
        ];
        // Event triggers while rendering each menu item where “Link” menu item is disabled
        _this.addDisabled = function (args) {
            if (args.item.text === 'Link') {
                args.element.classList.add('e-disabled');
            }
        };
        return _this;
    }
    Default.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'contextmenu-section' },
                    React.createElement("div", { id: 'contextmenu-control' },
                        React.createElement("div", { id: "contextmenutarget" }, this.content),
                        React.createElement(ej2_react_navigations_1.ContextMenuComponent, { target: '#contextmenutarget', items: this.menuItems, animationSettings: this.animationSettings, beforeItemRender: this.addDisabled })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the default functionalities of the ContextMenu. Right click/Touch hold the rectangular area to open the ContextMenu.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "ContextMenu is a graphical user interface that appears on the user right click/touch hold action. It has support to provide single level/multiple level of ContextMenu."),
                React.createElement("p", null,
                    "In this demo, ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/context-menu/#target" },
                        React.createElement("code", null, "target")),
                    " property is set as '#contextmenutarget'. Hence, on right clicking the target element, the ContextMenu will open."),
                React.createElement("p", null, "In mobile, the sub menu opens in a single layer with option for switching back to parent menu."),
                React.createElement("p", null,
                    "More information about ContextMenu can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/context-menu/getting-started" }, "documentation section"),
                    "."))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
