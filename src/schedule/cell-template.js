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
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
require("./cell-template.css");
var sample_base_1 = require("../common/sample-base");
/**
 * Schedule cell template sample
 */
var CellTemplate = /** @class */ (function (_super) {
    __extends(CellTemplate, _super);
    function CellTemplate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CellTemplate.prototype.getCellContent = function (date) {
        if (date.getMonth() === 10 && date.getDate() === 23) {
            return '<img src= "src/schedule/images/thanksgiving-day.svg" /><div className="caption">Thanksgiving day</div>';
        }
        else if (date.getMonth() === 11 && date.getDate() === 9) {
            return '<img src="src/schedule/images/get-together.svg" /><div className="caption">Party time</div>';
        }
        else if (date.getMonth() === 11 && date.getDate() === 13) {
            return '<img src="src/schedule/images/get-together.svg" /><div className="caption">Party time</div>';
        }
        else if (date.getMonth() === 11 && date.getDate() === 22) {
            return '<img src="src/schedule/images/birthday.svg" /><div className="caption">Happy birthday</div>';
        }
        else if (date.getMonth() === 11 && date.getDate() === 24) {
            return '<img src="src/schedule/images/christmas-eve.svg" /><div className="caption">Christmas Eve</div>';
        }
        else if (date.getMonth() === 11 && date.getDate() === 25) {
            return '<img src="src/schedule/images/christmas.svg" /><div className="caption">Christmas Day</div>';
        }
        else if (date.getMonth() === 0 && date.getDate() === 1) {
            return '<img src="src/schedule/images/newyear.svg" /><div className="caption">New Year\'s Day</div>';
        }
        else if (date.getMonth() === 0 && date.getDate() === 14) {
            return '<img src="src/schedule/images/get-together.svg" /><div className="caption">Get together</div>';
        }
        return '';
    };
    CellTemplate.prototype.cellTemplate = function (props) {
        if (props.type === "monthCells") {
            return (React.createElement("div", { className: "templatewrap", dangerouslySetInnerHTML: { __html: this.getCellContent(props.date) } }));
        }
        return;
    };
    CellTemplate.prototype.render = function () {
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: 'col-lg-12 control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement(ej2_react_schedule_1.ScheduleComponent, { cssClass: 'cell-template', width: '100%', height: '650px', selectedDate: new Date(2017, 11, 15), cellTemplate: this.cellTemplate.bind(this) },
                        React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Month' })),
                        React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Month, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
            React.createElement("div", { id: 'action-description' },
                React.createElement("p", null, "This demo illustrates how to customize the background of the specific date cells by adding images and custom text to it by using the cell template option.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "In this demo, the ",
                    React.createElement("code", null, "cellTemplate"),
                    " option which accepts the template string is used to customize the cell background with specific images and appropriate text on the given date values."))));
    };
    return CellTemplate;
}(sample_base_1.SampleBase));
exports.CellTemplate = CellTemplate;
