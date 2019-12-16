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
require("./checkbox.css");
var CheckBox = /** @class */ (function (_super) {
    __extends(CheckBox, _super);
    function CheckBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = data["info"];
        _this.selectionSettings = { showCheckbox: true };
        return _this;
    }
    CheckBox.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { id: 'listbox-selection' },
                    React.createElement(ej2_react_dropdowns_1.ListBoxComponent, { dataSource: this.data, selectionSettings: this.selectionSettings },
                        React.createElement(ej2_react_dropdowns_1.Inject, { services: [ej2_react_dropdowns_1.CheckBoxSelection] })))),
            React.createElement("div", { id: 'action-description' },
                React.createElement("p", null, "This sample demonstrates the checkbox functionalities of the ListBox. Click one or more items from the list of items in the ListBox.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "ListBox"),
                    " component has built-in support to select multiple items from the list. The Checkbox selection can be enabled by setting the",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/list-box/selectionSettingsModel/#showcheckbox" },
                        React.createElement("code", null, "showCheckbox")),
                    " as ",
                    React.createElement("code", null, "true"),
                    "in the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/list-box/#selectionsettings" },
                        React.createElement("code", null, "selectionSettings")),
                    " property."),
                React.createElement("p", null,
                    "To perform the checkbox feature in the ListBox, the ",
                    React.createElement("code", null, "CheckBoxSelection"),
                    " module has to be injected at the application level."),
                React.createElement("p", null,
                    "More information about checkbox selection in ListBox can be found in the",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/list-box/", target: "_blank" }, " documentation"),
                    " section."))));
    };
    return CheckBox;
}(sample_base_1.SampleBase));
exports.CheckBox = CheckBox;
