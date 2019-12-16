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
var Fuse = require("fuse.js");
require("./custom-filtering.css");
var data = require("./dataSource.json");
var CustomFiltering = /** @class */ (function (_super) {
    __extends(CustomFiltering, _super);
    function CustomFiltering() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.temp = 'booksData';
        _this.booksData = data[_this.temp];
        // maps the appropriate column to fields property
        _this.fields = { value: 'BookName' };
        return _this;
    }
    //Bind the filter event
    CustomFiltering.prototype.onFiltering = function (e) {
        var options = {
            keys: ['BookName'],
            includeMatches: true,
            findAllMatches: true
        };
        // create object from Fuse constructor
        var fuse = new Fuse(this.booksData, options);
        // store the search result data based on typed characters
        var result = fuse.search(e.text);
        var data = [];
        for (var i = 0; i < result.length; i++) {
            data.push(result[i].item);
        }
        // pass the filter data source to updateData method.
        e.updateData(data, null);
        var lists = document.getElementById('books_popup').querySelectorAll('.e-list-item');
        // For highlight the typed characters, pass the result data and list items to highlightSearch method.
        this.highlightSearch(lists, result);
    };
    CustomFiltering.prototype.highlightSearch = function (listItems, result) {
        if (result.length > 0) {
            for (var i = 0; i < listItems.length; i++) {
                var innerHTML = listItems[i].innerHTML;
                for (var j = result[i].matches[0].indices.length - 1; j >= 0; j--) {
                    var indexes = result[i].matches[0].indices[j];
                    innerHTML = innerHTML.substring(0, indexes[0]) + '<span class="e-highlight">' +
                        innerHTML.substring(indexes[0], (indexes[1] + 1)) + '</span>' + innerHTML.substring(indexes[1] + 1);
                    listItems[i].innerHTML = innerHTML;
                }
            }
        }
    };
    CustomFiltering.prototype.render = function () {
        return (React.createElement("div", { id: 'autocustom', className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { id: 'custom-filtering' },
                    React.createElement(ej2_react_dropdowns_1.AutoCompleteComponent, { id: "books", dataSource: this.booksData, filtering: this.onFiltering.bind(this), fields: this.fields, placeholder: "e.g. Node.js Succinctly" }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the custom filtering functionalities of the AutoComplete. You can choose an item from the suggestion list that filtered items based on approximate string matching technique.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    " The AutoComplete can be customized to showcase the suggestion list by using ",
                    React.createElement("code", null, "filtering"),
                    " event. In that, you can use your own libraries to filter the data and update it to AutoComplete suggestion list via ",
                    React.createElement("code", null, "updateData"),
                    " method."),
                React.createElement("p", null, "In this sample, used Fuse.js library for custom filtering of books data."),
                React.createElement("p", null,
                    "For more information about Fuse.js can be found in this ",
                    React.createElement("a", { href: "http://fusejs.io/", target: "_blank" }, " reference link"),
                    "."))));
    };
    return CustomFiltering;
}(sample_base_1.SampleBase));
exports.CustomFiltering = CustomFiltering;
