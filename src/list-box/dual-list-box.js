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
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
var data = require("./dataSource.json");
require("./dual-list-box.css");
var DualListBox = /** @class */ (function (_super) {
    __extends(DualListBox, _super);
    function DualListBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dataA = data["groupa"];
        _this.dataB = data["groupb"];
        _this.fields = { text: 'Name' };
        _this.toolbarSettings = { items: ['moveUp', 'moveDown', 'moveTo', 'moveFrom', 'moveAllTo', 'moveAllFrom'] };
        return _this;
    }
    DualListBox.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: "control-section" },
                React.createElement("div", { className: "dual-list-wrapper" },
                    React.createElement("div", { className: "dual-list-groupa" },
                        React.createElement("h4", null, "Group A"),
                        React.createElement(ej2_react_dropdowns_1.ListBoxComponent, { dataSource: this.dataA, fields: this.fields, height: "330px", scope: "#combined-listbox", toolbarSettings: this.toolbarSettings })),
                    React.createElement("div", { className: "dual-list-groupb" },
                        React.createElement("h4", null, "Group B"),
                        React.createElement(ej2_react_dropdowns_1.ListBoxComponent, { id: "combined-listbox", dataSource: this.dataB, height: "330px", fields: this.fields })))),
            React.createElement("div", { id: 'action-description' },
                React.createElement("p", null,
                    "This sample demonstrates the functionalities of the dual list box. Select an item from Group A and click the ",
                    React.createElement("code", null, "moveTo"),
                    " button to move item from Group A to Group B.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The dual list box allows the user to move items between two list boxes. Dual list box can be created by listing items in the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/list-box/#toolbarsettings" },
                        React.createElement("code", null, "toolbarSettings")),
                    " property along with",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/list-box/#scope" },
                        React.createElement("code", null, "scope")),
                    " property. The supported operations are,"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "moveUp"),
                        " -  Moves the selected item in the upward direction."),
                    React.createElement("li", null,
                        React.createElement("code", null, "moveDown"),
                        " -  Moves the selected item in the downward direction."),
                    React.createElement("li", null,
                        React.createElement("code", null, "moveTo"),
                        " -  Moves the selected item to the Group B list box."),
                    React.createElement("li", null,
                        React.createElement("code", null, "moveFrom"),
                        " -  Moves the selected item from Group B list box to Group A."),
                    React.createElement("li", null,
                        React.createElement("code", null, "moveAllTo"),
                        " -  Moves all the items to the Group B list box."),
                    React.createElement("li", null,
                        React.createElement("code", null, "moveAllFrom"),
                        " -  Moves all the items from Group B list box to Group A.")),
                React.createElement("p", null,
                    " More information about the dual list box can be found in the",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/list-box/", target: "_blank" }, " documentation"),
                    " section."))));
    };
    return DualListBox;
}(sample_base_1.SampleBase));
exports.DualListBox = DualListBox;
