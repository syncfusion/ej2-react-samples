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
var PropertyPane = (function (_super) {
    __extends(PropertyPane, _super);
    function PropertyPane() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PropertyPane.prototype.render = function () {
        return (React.createElement("div", { className: 'property-panel-section' },
            React.createElement("div", { className: "property-panel-header" }, this.props.title),
            React.createElement("div", { className: "property-panel-content" }, this.props.children)));
    };
    return PropertyPane;
}(React.Component));
exports.PropertyPane = PropertyPane;
