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
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var ej2_grids_1 = require("@syncfusion/ej2-grids");
var ej2_base_1 = require("@syncfusion/ej2-base");
require("./treegrid-overview.css");
var Overview = /** @class */ (function (_super) {
    __extends(Overview, _super);
    function Overview() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Filter = {
            type: 'Excel',
            itemTemplate: '#flagtemplate'
        };
        _this.flagtemplate = _this.gridTemplate;
        _this.gdptemplate = _this.treegridTemplate;
        _this.ratingtemplate = _this.treeratingTemplate;
        _this.unemploymentTemplate = _this.treeunemployTemplate;
        _this.locationtemplate = _this.treelocationTemplate;
        _this.areatemplate = _this.treeareaTemplate;
        _this.timezonetemplate = _this.treezoneTemplate;
        return _this;
    }
    Overview.prototype.gridTemplate = function (props) {
        return (React.createElement("div", { style: { display: 'inline' } },
            React.createElement("div", { style: { display: 'inline-block' } },
                React.createElement("img", { className: 'e-image' })),
            React.createElement("div", { style: { display: 'inline-block', paddingLeft: '6px' } }, props.name)));
    };
    Overview.prototype.treegridTemplate = function (props) {
        return (React.createElement("div", { className: 'statustemp' },
            React.createElement("span", { className: 'statustxt' }, props.gdp)));
    };
    Overview.prototype.treeratingTemplate = function (props) {
        if (props.rating) {
            return (React.createElement("div", { className: 'rating' },
                React.createElement("span", { className: "star" }),
                React.createElement("span", { className: "star" }),
                React.createElement("span", { className: "star" }),
                React.createElement("span", { className: "star" }),
                React.createElement("span", { className: "star" })));
        }
        else {
            return (React.createElement("span", null));
        }
    };
    Overview.prototype.treeunemployTemplate = function (props) {
        return (React.createElement("div", { id: 'myProgress', className: 'pbar' },
            React.createElement("div", { id: 'myBar', className: 'bar' },
                React.createElement("div", { id: 'label', className: 'barlabel' }))));
    };
    Overview.prototype.treelocationTemplate = function (props) {
        var locationsrc = 'src/treegrid/images/Map.png';
        return (React.createElement("div", null,
            React.createElement("img", { src: locationsrc, className: 'e-image', alt: props.coordinates }),
            React.createElement("a", { target: '_blank', href: 'https://www.google.com/maps/place/' }, props.coordinates)));
    };
    Overview.prototype.treeareaTemplate = function (props) {
        return (React.createElement("span", null,
            props.area,
            " km",
            React.createElement("sup", null, "2")));
    };
    Overview.prototype.treezoneTemplate = function (props) {
        var classValue = '';
        if (props.timezone.indexOf('-') !== -1) {
            classValue = 'negativeTimeZone';
        }
        return (React.createElement("div", null,
            React.createElement("img", { src: 'src/treegrid/images/__Normal.png', className: classValue }),
            React.createElement("span", { style: { paddingLeft: '7px' } }, props.timezone),
            ")"));
    };
    Overview.prototype.populationValue = function (field, data) {
        return data[field] / 1000000;
    };
    Overview.prototype.queryCellinfo = function (args) {
        if (args.column.field === 'gdp') {
            if (args.data[args.column.field] < 2) {
                args.cell.querySelector('.statustxt').classList.add('e-lowgdp');
                args.cell.querySelector('.statustemp').classList.add('e-lowgdp');
            }
        }
        if (args.column.field === 'rating') {
            if (args.column.field === 'rating') {
                for (var i = 0; i < args.data[args.column.field]; i++) {
                    args.cell.querySelectorAll('span')[i].classList.add('checked');
                }
            }
        }
        if (args.column.field === 'unemployment') {
            if (args.data[args.column.field] <= 4) {
                ej2_base_1.addClass([args.cell.querySelector('.bar')], ['progressdisable']);
            }
            args.cell.querySelector('.bar').style.width = args.data[args.column.field] * 10 + '%';
            args.cell.querySelector('.barlabel').textContent = args.data[args.column.field] + '%';
        }
        if (args.column.field === 'name') {
            var parentItem = ej2_grids_1.getObject('parentItem', args.data);
            var imageElement = args.cell.querySelector('.e-image');
            if (ej2_base_1.isNullOrUndefined(parentItem)) {
                var name_1 = ej2_grids_1.getObject('name', args.data);
                imageElement.src = "src/treegrid/images/" + name_1 + ".png";
            }
            else {
                var name_2 = ej2_grids_1.getObject('name', parentItem);
                imageElement.src = "src/treegrid/images/" + name_2 + ".png";
            }
        }
    };
    Overview.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.countries, childMapping: 'states', height: '400', allowReordering: 'true', allowFiltering: 'true', allowSorting: 'true', filterSettings: { type: 'Menu', hierarchyMode: 'Parent' }, queryCellInfo: this.queryCellinfo.bind(this) },
                    React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'name', headerText: 'Province', width: '190', template: this.flagtemplate, filter: this.Filter }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'population', headerText: 'Populationf (Million)', allowFiltering: false, valueAccessor: this.populationValue, textAlign: 'Right', width: '200' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'gdp', headerText: 'GDP Rate %', width: '145', template: this.gdptemplate }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'rating', headerText: 'Credit Rating', width: '190', template: this.ratingtemplate }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'unemployment', headerText: 'Unemployment Rate', width: '200', allowFiltering: false, template: this.unemploymentTemplate }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'coordinates', headerText: 'Coordinates', allowSorting: false, width: '220', template: this.locationtemplate }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'area', headerText: 'Area', width: '140', template: this.areatemplate }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'timezone', headerText: 'Time Zone', width: '150', template: this.timezonetemplate })),
                    React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Filter, ej2_react_treegrid_1.Sort, ej2_react_treegrid_1.Reorder] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the overview of basic treegrid features such as sorting, filtering, conditional formatting, column template and scrolling.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null, "The TreeGrid is used to represent the hierarchical data in a tabular format, combining the visual representation of Grid and TreeView controls. It represents the data from datasource such as an array of JSON objects, OData web services, or DataManager binding data fields to columns or self-referential datasource."),
                React.createElement("p", null,
                    "In this demo,\u00A0TreeGrid features such as ",
                    React.createElement("code", null, "sorting, filtering, conditional formatting, column template and scrolling"),
                    " are used."),
                React.createElement("p", null,
                    "More information on the TreeGrid instantiation can be found in this ",
                    React.createElement("a", { target: '_blank', href: '#' }, " documentation section.")))));
    };
    return Overview;
}(sample_base_1.SampleBase));
exports.Overview = Overview;
