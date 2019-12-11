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
require("./default.css");
var Default = /** @class */ (function (_super) {
    __extends(Default, _super);
    function Default() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = data["info"];
        return _this;
    }
    Default.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'col-lg-12 control-section' },
                React.createElement("div", { id: 'listbox-control' },
                    React.createElement("h4", null, "Select your favorite car:"),
                    React.createElement(ej2_react_dropdowns_1.ListBoxComponent, { dataSource: this.data }))),
            React.createElement("div", { id: 'action-description' },
                React.createElement("p", null, "This sample demonstrates the default functionalities of a ListBox. Click any item to select a single item or ctrl + click to select multiple items.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "ListBox"),
                    " is a graphical user interface component used to display a list of items. Users can select one or more items in the list using a checkbox or by keyboard selection. It supports sorting, grouping, reordering, and drag and drop of items."),
                React.createElement("p", null,
                    "In this sample, data is bound to the ListBox using the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/list-box/#datasource" },
                        React.createElement("code", null, "dataSource")),
                    " property. You can select your favorite cars from the ListBox."),
                React.createElement("p", null,
                    " More information about the ListBox can be found in the",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/list-box/getting-started", target: "_blank" }, " documentation"),
                    " section."))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
