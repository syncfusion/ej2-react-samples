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
require("./default.css");
var data = require("./dataSource.json");
var Default = (function (_super) {
    __extends(Default, _super);
    function Default() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.temp = 'sportsData';
        // define the array of string
        _this.sportsData = data[_this.temp];
        return _this;
    }
    Default.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { id: 'combodefault', className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-lg-12 control-wrappers' },
                    React.createElement("div", { id: 'default' },
                        React.createElement(ej2_react_dropdowns_1.AutoCompleteComponent, { id: "games", dataSource: this.sportsData, ref: function (AutoComplete) { _this.listObj = AutoComplete; }, placeholder: "e.g. Basketball" })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the default functionalities of the AutoComplete. Type a character in the autocomplete element and choose an item from the suggestion list.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "AutoComplete"),
                    " component provides the matched suggestion list when a character is typed in the input, from that the user can select one."),
                " By default, the filter type value is ",
                React.createElement("code", null, "contains"),
                ".",
                React.createElement("p", null, "The default sample illustrates the use of AutoComplete that allows the end-users to select an item from the suggestion list."),
                React.createElement("p", null,
                    " More information on the AutoComplete instantiation can be found in the",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/auto-complete/getting-started/", target: "_blank" }, " documentation section"),
                    "."))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
