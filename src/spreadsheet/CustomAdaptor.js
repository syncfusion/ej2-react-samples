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
var ej2_data_1 = require("@syncfusion/ej2-data");
var CustomAdaptor = (function (_super) {
    __extends(CustomAdaptor, _super);
    function CustomAdaptor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomAdaptor.prototype.processResponse = function () {
        var result = [];
        var original = _super.prototype.processResponse.apply(this, arguments);
        original.result.forEach(function (item, idx) {
            result[idx] = {};
            Object.keys(item).forEach(function (key) {
                if (['OrderID', 'CustomerID', 'ShipName', 'ShipCity', 'ShipCountry'].indexOf(key) > -1) {
                    result[idx][key] = item[key];
                }
            });
        });
        return { result: result, count: original.count };
    };
    return CustomAdaptor;
}(ej2_data_1.ODataAdaptor));
exports.CustomAdaptor = CustomAdaptor;
