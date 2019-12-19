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
var index_1 = require("./index");
var leftpane_1 = require("./leftpane");
var component_content_1 = require("./component-content");
var ej2_base_1 = require("@syncfusion/ej2-base");
var SampleBase = (function (_super) {
    __extends(SampleBase, _super);
    function SampleBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Custom Render Complete function
     */
    SampleBase.prototype.rendereComplete = function () {
    };
    SampleBase.prototype.componentWillReceiveProps = function () {
        /**
         * Theme Change
         */
        var hash = location.hash.split('/');
        if (hash[1] !== index_1.selectedTheme) {
            localStorage.setItem('ej2-switch', ej2_base_1.select('.active', index_1.setResponsiveElement).id);
            location.reload();
        }
        index_1.setSbLink();
    };
    SampleBase.prototype.componentDidMount = function () {
        var _this = this;
        component_content_1.renderDescriptions();
        index_1.setSbLink();
        component_content_1.onComponentLoad();
        component_content_1.setNavButtonState();
        component_content_1.intialLoadScrollTop();
        setTimeout(function () {
            leftpane_1.setSelectList();
            index_1.removeOverlay();
            component_content_1.checkApiTableDataSource();
            _this.rendereComplete();
        });
    };
    return SampleBase;
}(React.PureComponent));
exports.SampleBase = SampleBase;
