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
var sample_base_1 = require("../common/sample-base");
require("./card.component.css");
// tslint:disable:max-line-length
// *  Sample for CSS Basic Layout Cards.
var Horizontal = /** @class */ (function (_super) {
    __extends(Horizontal, _super);
    function Horizontal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Horizontal.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section card-control-section horizontal_card_layout' },
                React.createElement("div", { className: "e-card-resize-container" },
                    React.createElement("div", { className: 'row' },
                        React.createElement("div", { className: "row card-layout" },
                            React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                                React.createElement("div", { className: "e-card e-card-horizontal e-product", style: { height: '420px' }, id: "horizontal_phone_product" },
                                    React.createElement("div", { className: "e-card-stacked" },
                                        React.createElement("div", { className: "e-card-header" },
                                            React.createElement("div", { className: "e-card-header-caption" },
                                                React.createElement("div", { className: "e-card-header-title" }, " iPhone X"),
                                                React.createElement("div", { className: "e-card-sub-title" }, "Marketed by Apple Inc"))),
                                        React.createElement("div", { className: "e-card-content" }, "The iPhone X has a 5.8-inch diagonal OLED color-accurate screen, has two cameras on the rear. One is a 12-megapixel with support for face detection. It is capable of capturing 4K video at 24, 30 or 60 frames per second. It supports Qi-standard wireless charging."),
                                        React.createElement("div", { className: "e-card-actions", style: { justifyContent: 'center' } },
                                            React.createElement("button", { className: "e-btn e-outline e-primary" },
                                                React.createElement("div", { className: "e-size" }, "64GB ")),
                                            React.createElement("button", { className: "e-btn e-outline e-primary" },
                                                React.createElement("div", { className: "e-size" }, "256GB ")))),
                                    React.createElement("img", { src: "./src/card/images/iphone.png", alt: "iPhone X", height: "415px", style: { width: '50%' } }))),
                            React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                                React.createElement("div", { id: "vertical_Sample" },
                                    React.createElement("div", { className: "e-card e-card-horizontal", id: "horizontal_product" },
                                        React.createElement("div", { className: 'e-card-stacked' },
                                            React.createElement("div", { className: "e-card-header" },
                                                React.createElement("div", { className: "e-card-header-caption" },
                                                    React.createElement("div", { className: "e-card-header-title" }, "Philips Trimmer"))),
                                            React.createElement("div", { className: "e-card-content", style: { height: '146px' } }, "Philips trimmers are designed to last longer than 4 ordinary trimmers and DuraPower Technology which optimizes power.")),
                                        React.createElement("img", { src: './src/card/images/Trimmer.png' })),
                                    React.createElement("div", { className: "e-card e-card-horizontal", id: "horizontal_product" },
                                        React.createElement("img", { src: './src/card/images/Camera.png', style: { height: '214px' } }),
                                        React.createElement("div", { className: 'e-card-stacked' },
                                            React.createElement("div", { className: "e-card-header" },
                                                React.createElement("div", { className: "e-card-header-caption" },
                                                    React.createElement("div", { className: "e-card-header-title" }, "Canon 135mm"))),
                                            React.createElement("div", { className: "e-card-content", style: { height: '146px' } }, "The fastest 135mm telephoto lens in its class. Two UD-glass elements correct secondary spectrum for outstanding sharpness and color."))))))),
                    React.createElement("div", { id: 'source_link' },
                        "Source: \u00A0",
                        React.createElement("table", null,
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("a", { href: "https://www.philips.co.in/c-m-pe/face-stylers-and-grooming-kits/trimmers", target: '_blank' }, "https://www.philips.co.in/c-m-pe/face-stylers-and-grooming-kits/trimmers"))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("a", { href: "https://en.wikipedia.org/wiki/IPhone_X", target: '_blank' }, "https://en.wikipedia.org/wiki/IPhone_X"))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("a", { href: "https://en.wikipedia.org/wiki/Canon_EF_135mm_lens", target: '_blank' }, "https://en.wikipedia.org/wiki/Canon_EF_135mm_lens"))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates ",
                    React.createElement("code", null, "card"),
                    " rendering with horizontal layout. Based on the horizontal structure, product card is shown with detailed information.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "By default, card elements are stacked one after another vertically. You can customize the card with specific direction by adding",
                    React.createElement("b", null, "e-card-horizontal"),
                    " to align elements horizontally. Using",
                    React.createElement("b", null, "e-card-stacked"),
                    " class, you can split the horizontal layout with a stacked element on left or right of the card.",
                    React.createElement("p", null,
                        "More information about Card can be found in this.",
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/card/getting-started/" }, "documentation"),
                        " section. ")))));
    };
    return Horizontal;
}(sample_base_1.SampleBase));
exports.Horizontal = Horizontal;
