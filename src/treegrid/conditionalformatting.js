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
var Format = (function (_super) {
    __extends(Format, _super);
    function Format() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Format.prototype.queryCellinfo = function (args) {
        if (args.cell.innerHTML === 'High') {
            var x = document.createElement('IMG');
            x.setAttribute('src', 'src/treegrid/images/__High.png');
            x.setAttribute('height', '15px');
            var span = document.createElement('span');
            span.innerHTML = args.cell.innerHTML;
            span.setAttribute('style', 'padding-left:7px;');
            args.cell.innerHTML = '';
            args.cell.appendChild(x);
            args.cell.appendChild(span);
        }
        else if (args.cell.innerHTML === 'Critical') {
            var y = document.createElement('IMG');
            y.setAttribute('src', 'src/treegrid/images/__Critical.png');
            y.setAttribute('height', '15px');
            var span = document.createElement('span');
            span.innerHTML = args.cell.innerHTML;
            span.setAttribute('style', 'padding-left:7px;');
            args.cell.innerHTML = '';
            args.cell.appendChild(y);
            args.cell.appendChild(span);
        }
        else if (args.cell.innerHTML === 'Low') {
            var z = document.createElement('IMG');
            z.setAttribute('src', 'src/treegrid/images/__Low.png');
            z.setAttribute('height', '15px');
            var span = document.createElement('span');
            span.innerHTML = args.cell.innerHTML;
            span.setAttribute('style', 'padding-left:7px;');
            args.cell.innerHTML = '';
            args.cell.appendChild(z);
            args.cell.appendChild(span);
        }
        else if (args.cell.innerHTML === 'Normal') {
            var a = document.createElement('IMG');
            a.setAttribute('src', 'src/treegrid/images/__Normal.png');
            a.setAttribute('height', '15px');
            var span = document.createElement('span');
            span.innerHTML = args.cell.innerHTML;
            span.setAttribute('style', 'padding-left:7px;');
            args.cell.innerHTML = '';
            args.cell.appendChild(a);
            args.cell.appendChild(span);
        }
        else if (+args.cell.innerHTML > 90 && +args.cell.innerHTML <= 100 && args.column.field === 'progress') {
            args.cell.setAttribute('style', 'background-color:#336c12;color:white;');
        }
        else if (+args.cell.innerHTML > 20 && args.column.field === 'progress') {
            args.cell.setAttribute('style', 'background-color:#7b2b1d;color:white;');
        }
    };
    Format.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", null,
                    React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, treeColumnIndex: 1, childMapping: 'subtasks', allowPaging: 'true', pageSettings: { pageSize: 8 }, queryCellInfo: this.queryCellinfo.bind(this) },
                        React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskID', headerText: 'Task ID', width: '110', textAlign: 'Right' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskName', headerText: 'Task Name', width: '200' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'startDate', headerText: 'Start Date', width: '90', type: 'date', format: 'yMd', textAlign: 'Right' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'endDate', headerText: 'End Date', width: '90', type: 'date', format: 'yMd', textAlign: 'Right' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'duration', headerText: 'Duration', width: '80', textAlign: 'Right' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'progress', headerText: 'Progress', width: '80', textAlign: 'Right' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'priority', headerText: 'Priority', width: '90' })),
                        React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Page] })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This samples demonstrates the way of customizing the cells by adding icons for Priority column and highlight the cells of Progress column based on certain condition using queryCellInfo event.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The appearance of cells can be customized by using the queryCellInfo event. The queryCellInfo event triggers for every cell. In that event handler, you can get QueryCellInfoEventArgs that contains the details of the cell."),
                React.createElement("p", null, "In this demo, we have customized the column values by adding icons for Priority column and highlighted the Progress column based on certain condition using queryCellInfo event."))));
    };
    return Format;
}(sample_base_1.SampleBase));
exports.Format = Format;
