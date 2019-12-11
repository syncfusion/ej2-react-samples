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
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
var slidercss = "  \n.content-wrapper {\n  width: 40%;\n  margin: 0 auto;\n  min-width: 185px;\n}\n\n.e-bigger .content-wrapper {\n  width: 80%;\n}\n\n.sliderwrap label {\n  padding-bottom: 26px;\n  font-size: 13px;\n  font-weight: 500;\n  margin-top: 15px;\n}\n\n.userselect {\n  -webkit-user-select: none;\n  /* Safari 3.1+ */\n  -moz-user-select: none;\n  /* Firefox 2+ */\n  -ms-user-select: none;\n  /* IE 10+ */\n  user-select: none;\n  /* Standard syntax */\n}\n";
var Default = /** @class */ (function (_super) {
    __extends(Default, _super);
    function Default() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Default.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: "content-wrapper" },
                    React.createElement("style", null, slidercss),
                    React.createElement("div", { className: 'sliderwrap' },
                        React.createElement("label", { className: 'labeltext' }, "Default Slider"),
                        React.createElement(ej2_react_inputs_1.SliderComponent, { value: 30 })),
                    React.createElement("div", { className: 'sliderwrap' },
                        React.createElement("label", { className: 'labeltext' }, "MinRange Slider"),
                        React.createElement(ej2_react_inputs_1.SliderComponent, { value: 30, type: 'MinRange' })),
                    React.createElement("div", { className: 'sliderwrap' },
                        React.createElement("label", { className: 'labeltext' }, "Range Slider"),
                        React.createElement(ej2_react_inputs_1.SliderComponent, { value: [30, 70], type: 'Range' })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the default rendering of Slider component. Drag the thumb over the bar for selecting the values between min and max.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The Slider component allows the user to select a value or range of values in-between a min and max range, by dragging the thumb over the slider bar. There are three types of sliders available:"),
                React.createElement("ul", null,
                    React.createElement("li", null, "Default - allows us to select a single value"),
                    React.createElement("li", null, "MinRange \u2013 allows us to select a single value, but highlights with a range selection from the min value to the current handle value"),
                    React.createElement("li", null, "Range \u2013 allows us to select a range of values with two handles, where the handles was connected with a range selection"),
                    React.createElement("p", null, "In this demo we can see the Default, MinRange and Range slider types."),
                    React.createElement("p", null,
                        "More information on the Slider instantiation can be found in this",
                        React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/documentation/slider/getting-started.html" }, "documentation section"))))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
