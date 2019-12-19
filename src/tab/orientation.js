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
var property_pane_1 = require("../common/property-pane");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_lists_1 = require("@syncfusion/ej2-react-lists");
var sample_base_1 = require("../common/sample-base");
require("./tab.component.css");
var Orientation = (function (_super) {
    __extends(Orientation, _super);
    function Orientation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // Mapping ListView component dataSource property
        _this.romeEmployees = [
            { id: '1', name: 'Anne Dodsworth', role: 'Product Manager' },
            { id: '2', name: 'Laura Callahan', role: 'Team Lead' },
            { id: '3', name: 'Andrew Fuller', role: 'Developer' }
        ];
        // Mapping ListView component dataSource property
        _this.parisEmployees = [
            { id: '4', name: 'Robert King', role: 'Team Lead' },
            { id: '5', name: 'Michael Suyama', role: 'Developer' },
            { id: '6', name: 'Margaret Peacock', role: 'Developer' }
        ];
        // Mapping ListView component dataSource property
        _this.londonEmployees = [
            { id: '7', name: 'Janet Leverling', role: 'CEO' },
            { id: '8', name: 'Steven Buchanan', role: 'HR' },
            { id: '9', name: 'Nancy Davolio', role: 'Product Manager' }
        ];
        // Mapping DropDownList dataSource property
        _this.oData = [
            { 'value': 'top', 'text': 'Top' }, { 'value': 'bottom', 'text': 'Bottom' },
            { 'value': 'left', 'text': 'Left' }, { 'value': 'right', 'text': 'Right' }
        ];
        // Mapping DropDownList fields property
        _this.fields = { text: 'text', value: 'value' };
        //Map the appropriate columns to fields property
        _this.listfields = { text: 'name', id: 'id' };
        // Mapping DropDownList value property
        _this.orientVal = 'top';
        // Mapping DropDownList dataSource property
        _this.hData = [
            { 'value': 'default', 'text': 'Default' }, { 'value': 'fill', 'text': 'Fill' }, { 'value': 'accent', 'text': 'Accent' }
        ];
        // Mapping DropDownList value property
        _this.hdrVal = 'default';
        return _this;
    }
    // Change event funtion for DropDownList component   
    Orientation.prototype.changeOrientationMode = function (e) {
        var placement = document.getElementById('orientation').value;
        this.tabObj.headerPlacement = placement;
        this.tabObj.dataBind();
    };
    // Change event funtion for DropDownList component   
    Orientation.prototype.changeHeaderStyles = function (e) {
        this.removeStyleClass();
        var name = document.getElementById('headerStyles').value;
        if (name === 'Fill') {
            this.tabObj.element.classList.add('e-fill');
        }
        else if (name === 'Accent') {
            this.tabObj.element.classList.add('e-background');
            this.tabObj.element.classList.add('e-accent');
        }
    };
    Orientation.prototype.removeStyleClass = function () {
        this.tabObj.element.classList.remove('e-fill');
        this.tabObj.element.classList.remove('e-background');
        this.tabObj.element.classList.remove('e-accent');
    };
    Orientation.prototype.templateString = function (data) {
        return (React.createElement("div", { className: "template-container" },
            React.createElement("div", { className: "left" },
                React.createElement("img", { className: 'empImg', src: "src/tab/Employees/" + data.id + ".png", alt: '${data.id}' }),
                React.createElement("div", { className: "left info-div" },
                    React.createElement("div", { className: "name" },
                        " ",
                        data.name),
                    React.createElement("div", { className: "role" },
                        " ",
                        data.role)))));
    };
    Orientation.prototype.render = function () {
        var _this = this;
        function template1() {
            return (React.createElement(ej2_react_lists_1.ListViewComponent, { id: "rome", dataSource: this.romeEmployees, template: this.templateString }));
        }
        function template2() {
            return (React.createElement(ej2_react_lists_1.ListViewComponent, { id: "paris", dataSource: this.parisEmployees, template: this.templateString }));
        }
        function template3() {
            return (React.createElement(ej2_react_lists_1.ListViewComponent, { id: "london", dataSource: this.londonEmployees, template: this.templateString }));
        }
        // Mapping Tab items Header property
        var headertext;
        headertext = [{ text: "Rome" }, { text: "Paris" }, { text: "London" }];
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section tab-control-section row' },
                React.createElement("div", { className: 'col-lg-8' },
                    React.createElement(ej2_react_navigations_1.TabComponent, { ref: function (tab) { _this.tabObj = tab; }, showCloseButton: true, heightAdjustMode: 'None', height: 320 },
                        React.createElement(ej2_react_navigations_1.TabItemsDirective, null,
                            React.createElement(ej2_react_navigations_1.TabItemDirective, { header: headertext[0], content: template1.bind(this) }),
                            React.createElement(ej2_react_navigations_1.TabItemDirective, { header: headertext[1], content: template2.bind(this) }),
                            React.createElement(ej2_react_navigations_1.TabItemDirective, { header: headertext[2], content: template3.bind(this) })))),
                React.createElement("div", { className: 'col-lg-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table' },
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: '50%' } },
                                        React.createElement("div", null, "Header Placement")),
                                    React.createElement("td", { style: { width: '50%' } },
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: 'orientation', dataSource: this.oData, fields: this.fields, value: this.orientVal, width: '90%', change: this.changeOrientationMode.bind(this) })))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: '50%' } },
                                        React.createElement("div", null, "Header Styles")),
                                    React.createElement("td", { style: { width: '50%' } },
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: 'headerStyles', dataSource: this.hData, fields: this.fields, value: this.hdrVal, width: '90%', change: this.changeHeaderStyles.bind(this) }))))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates the ",
                    React.createElement("code", null, "header"),
                    " orientation of the ",
                    React.createElement("code", null, "Tab"),
                    ". Select option from drop-downs to switch header placement and changing the header style in properties panel.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "Tab"),
                    " allows to place the header section inside the Tab component either at",
                    React.createElement("code", null, "top / bottom / left / right"),
                    " position by using ",
                    React.createElement("code", null, "headerPlacement"),
                    " property."),
                React.createElement("p", null,
                    "This sample illustrates the use of header placement and ",
                    React.createElement("code", null, "showCloseButton"),
                    " property. Users can change the header position by changing the drop-down value options and can close the Tab item by clicking close icon in header.",
                    React.createElement("br", null),
                    React.createElement("br", null),
                    "The User can also view different header styles of Tab component by selecting options from `Header Styles` drop-down. Header styles changed by adding predefined classes in Tab root element and it class names listed below",
                    React.createElement("br", null),
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            "Material and Fabric theme differentiates all the available tab header styles such as ",
                            React.createElement("code", null, "e-fill"),
                            ", ",
                            React.createElement("code", null, "e-background e-accent"),
                            "."),
                        React.createElement("li", null,
                            "In bootstrap theme, all the styles such as ",
                            React.createElement("code", null, "e-fill"),
                            " & ",
                            React.createElement("code", null, "e-background e-accent"),
                            " will have the same look with no difference.")),
                    "If above classes not included in root element default style will applied in Tab component."),
                React.createElement("p", null,
                    "More information about Tab can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/tab/getting-started/" }, "documentation"),
                    " section."))));
    };
    return Orientation;
}(sample_base_1.SampleBase));
exports.Orientation = Orientation;
