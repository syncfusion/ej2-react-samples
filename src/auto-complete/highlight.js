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
var property_pane_1 = require("../common/property-pane");
require("./highlight.css");
var data = require("./dataSource.json");
var Highlight = /** @class */ (function (_super) {
    __extends(Highlight, _super);
    function Highlight() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.temp = 'countries';
        // define the JSON of data
        _this.countries = data[_this.temp];
        // maps the appropriate column to fields property
        _this.fields = { value: 'Name' };
        // define the array of data
        _this.filterData = ['Contains', 'StartsWith', 'EndsWith'];
        // set width size of DropDownList element.
        _this.width = '150px';
        return _this;
    }
    // bind change event to modify the filter type of AutoComplete.
    Highlight.prototype.onChange = function (args) {
        this.listObj.filterType = args.itemData.value;
    };
    Highlight.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-lg-8 control-wrappers' },
                    React.createElement("div", { id: 'highlight' },
                        React.createElement(ej2_react_dropdowns_1.AutoCompleteComponent, { id: "country", dataSource: this.countries, ref: function (autocomplete) { _this.listObj = autocomplete; }, fields: this.fields, placeholder: "e.g. Australia", highlight: true }))),
                React.createElement("div", { className: 'col-lg-4 property-section', id: "filter-property" },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: "property", title: "Properties", style: { width: "100%", marginTop: "15px" } },
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: "50%" } }, "FilterType :"),
                                React.createElement("td", null,
                                    " ",
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "filter-type", dataSource: this.filterData, change: this.onChange.bind(this), placeholder: "Select a type", text: 'Contains' }))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates the highlight functionalities of the AutoComplete. Type a character(s) in the autocomplete element and the typed characters are highlighted in the suggestion list. By default, ",
                    React.createElement("code", null, "Contains"),
                    " filter type is set in this sample and provided with the options to choose different filter type in the property panel.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The AutoComplete has built-in support to highlight the searched characters on the suggested list items when ",
                    React.createElement("code", null, "highlight"),
                    " is enabled."),
                React.createElement("p", null, "This sample illustrates that, the searched characters on the country suggestion list items are highlighted."),
                React.createElement("p", null,
                    " More information on the highlight search feature configuration can be found in the",
                    React.createElement("a", { href: "http://ej2.syncfusion.com/react/documentation/auto-complete/how-to.html#custom-highlight-search", target: "_blank" }, " documentation section"),
                    "."))));
    };
    return Highlight;
}(sample_base_1.SampleBase));
exports.Highlight = Highlight;
