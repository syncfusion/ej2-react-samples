"use strict";
/**
 * Tooltip smart position sample
 */
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
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n#targetContainer {\n    border: 1px solid #dddddd;\n    margin: 15px;\n    min-height: 350px;\n}\n#demoSmart {\n    background-image: url('./src/tooltip/images/smartposition.png');\n    background-size: 100px 100px;\n    height: 100px;\n    position: absolute;\n    left: calc( 50% - 50px);\n    top: calc( 50% - 50px);\n    width: 100px;\n}";
var DraggableTooltip = /** @class */ (function (_super) {
    __extends(DraggableTooltip, _super);
    function DraggableTooltip() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //Set tooltip animation
        _this.tooltipAnimation = {
            open: { effect: 'None' },
            close: { effect: 'None' }
        };
        return _this;
    }
    DraggableTooltip.prototype.rendereComplete = function () {
        var _this = this;
        //Handle tooltip smart positioning.
        var ele = document.getElementById('demoSmart');
        var drag = new ej2_base_1.Draggable(ele, {
            clone: false,
            dragArea: '#targetContainer',
            drag: function (args) {
                if (args.element.getAttribute('data-tooltip-id') === null) {
                    _this.tooltipInstance.open(args.element);
                }
                else {
                    _this.tooltipInstance.refresh(args.element);
                }
            },
            dragStart: function (args) {
                if (args.element.getAttribute('data-tooltip-id') === null) {
                    _this.tooltipInstance.open(args.element);
                }
            },
            dragStop: function (args) {
                _this.tooltipInstance.close();
            }
        });
    };
    DraggableTooltip.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_popups_1.TooltipComponent, { id: 'targetContainer', ref: function (t) { return _this.tooltipInstance = t; }, content: 'Drag me anywhere, to start walking with me !!!', offsetX: -15, target: '#demoSmart', animation: this.tooltipAnimation },
                    React.createElement("div", { id: 'demoSmart' }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the Smart Positioning functionalities of the Tooltip which will open by dragging the picture.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "This sample shows the dynamic adjustment of the tooltip position within the specified Viewport. Start dragging the ant image, so that the tooltip opens up immediately and keeps moving along with the target image. When the image reaches the corners of the sample container on dragging, the tooltip and its arrow position will be auto adjusted to make it look fit within the sample container area. "),
                React.createElement("p", null,
                    "In this sample, the tooltip is opened manually by using its ",
                    React.createElement("code", null, "open"),
                    " method on drag start of the target image. On further dragging, the ",
                    React.createElement("code", null, "refresh"),
                    " method of the tooltip needs to be called to reposition it continuously and on drag stop, the tooltip will be hidden by using it\u2019s ",
                    React.createElement("code", null, "close"),
                    " method."),
                React.createElement("p", null,
                    "More information on dynamic positioning of the tooltip can be found in the",
                    React.createElement("a", { href: "http://ej2.syncfusion.com/react/documentation/tooltip/position.html#dynamic-positioning", target: "_blank" }, " documentation section"),
                    "."))));
    };
    return DraggableTooltip;
}(sample_base_1.SampleBase));
exports.DraggableTooltip = DraggableTooltip;
