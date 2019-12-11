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
var ej2_base_1 = require("@syncfusion/ej2-base");
ej2_base_1.enableRipple(window.ripple);
var SampleBase = /** @class */ (function (_super) {
    __extends(SampleBase, _super);
    function SampleBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SampleBase.prototype.rendereComplete = function () {
        /**custom render complete function */
    };
    SampleBase.prototype.componentDidMount = function () {
        var _this = this;
        setTimeout(function () {
            _this.rendereComplete();
        });
    };
    return SampleBase;
}(React.PureComponent));
exports.SampleBase = SampleBase;
