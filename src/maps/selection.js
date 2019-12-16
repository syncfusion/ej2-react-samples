"use strict";
/**
 * Selection sample
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
var ej2_maps_1 = require("@syncfusion/ej2-maps");
var ej2_react_maps_1 = require("@syncfusion/ej2-react-maps");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var data = require("./map-data/selection-datasource.json");
var datasource = data;
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }\n    #container{\n        margin-top: -10px;        \n        }\n         .tip {\n             border: 1px solid #4D4D4D;\n             box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);\n             border-radius: 7px;\n             margin-right: 25px;\n             min-width: 110px;\n             padding-top: 9px;\n             padding-right: 10px;\n             padding-left: 10px;\n             width: auto;\n             height: auto;\n             background: #4D4D4D;\n         }\n        \n         .popup {\n            border: 0.5px groove #CCCCCC;\n            box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);\n            left: 70%;\n            top: 65%;   \n            margin-bottom: 2em;\n            border-radius: 2px;\n            display: none;\n            max-width: 220px;\n            position: absolute;\n            padding: 1em;\n            background: #F4F4F4;\n         }\n        \n         .close-btn {\n            border: 2px solid #5B5B5B;\n             margin-left: -9px;\n             position: absolute;\n             opacity: 0.8;\n             background-color: #605F61;\n             border-radius: 50%/50%;\n             width: 20px;\n             height: 19px;\n             display: none;\n             z-index: 1000;\n         }\n        \n             .close-btn a {\n                 margin-left: 2px;\n                 font-weight: bold;\n                 color: white;\n                 text-decoration: none;\n             }\n             #closebutton {\n                  float:right;\n                  font-size:16px; \n                  display:inline-block; \n                  padding:2px 5px; \n                  cursor:pointer; }\n            .firstLine td{\n                    border-bottom: 2px solid black;\n                }\n                  ";
var SelectionMaps = /** @class */ (function (_super) {
    __extends(SelectionMaps, _super);
    function SelectionMaps() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectionMaps.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-md-12' },
                    React.createElement(ej2_react_maps_1.MapsComponent, { id: "container", loaded: this.onMapsLoad.bind(this), load: this.load, ref: function (m) { return _this.mapInstance = m; }, zoomSettings: {
                            enable: false
                        }, titleSettings: {
                            text: 'USA Election Results - 2016',
                            textStyle: {
                                size: '16px'
                            }
                        }, legendSettings: {
                            visible: true,
                            mode: 'Interactive',
                            position: 'Top',
                            width: '80%',
                            textStyle: {
                                fontWeight: '400',
                                size: '14px'
                            }
                        }, shapeSelected: this.shapeSelected.bind(this) },
                        React.createElement(ej2_react_maps_1.Inject, { services: [ej2_react_maps_1.MapsTooltip, ej2_react_maps_1.Selection, ej2_react_maps_1.Highlight, ej2_react_maps_1.Legend] }),
                        React.createElement(ej2_react_maps_1.LayersDirective, null,
                            React.createElement(ej2_react_maps_1.LayerDirective, { shapeData: new ej2_maps_1.MapAjax('./src/maps/map-data/usa.json'), shapePropertyPath: 'name', shapeDataPath: 'State', dataSource: datasource, tooltipSettings: {
                                    visible: false
                                }, highlightSettings: {
                                    enable: true,
                                    fill: '#A3B0D0'
                                }, selectionSettings: {
                                    enable: true,
                                    fill: '#4C515B',
                                    opacity: 1
                                }, shapeSettings: {
                                    colorValuePath: 'Candidate',
                                    colorMapping: [
                                        {
                                            value: 'Trump', color: '#D84444'
                                        },
                                        {
                                            value: 'Clinton', color: '#316DB5'
                                        }
                                    ]
                                } })))),
                React.createElement("div", { className: "popup", id: "closepopup" },
                    React.createElement("span", { id: "closebutton" }, "x"),
                    React.createElement("table", { style: { marginTop: '5px', width: 'auto' } },
                        React.createElement("tr", null,
                            React.createElement("td", { style: { padding: '0.3px', float: 'left' } },
                                React.createElement("label", { id: "winner", style: { color: '#666666', fontsize: 12, fontfamily: 'Roboto', fontweight: 700 } }))),
                        React.createElement("tr", { style: { bordertop: '1px', solid: 'black' } },
                            React.createElement("td", { style: { padding: '0.3px', float: 'left' } },
                                React.createElement("label", { style: { color: 'Black', fontSize: '12px', fontWeight: 'normal' } }, "State")),
                            React.createElement("td", { style: { padding: '0.3px', float: 'left' } },
                                React.createElement("label", { style: { color: 'Black', fontSize: '12px', fontWeight: 'normal', marginLeft: '8px' } }, ":")),
                            React.createElement("td", { style: { padding: '0.3px', float: 'left' } },
                                React.createElement("label", { id: "state", style: { color: 'Black', fontSize: '12px', fontWeight: 'normal', marginLeft: '8px' } }))),
                        React.createElement("tr", null,
                            React.createElement("td", { style: { padding: '0.3px', float: 'left' } },
                                React.createElement("label", { style: { color: 'Black', fontSize: '12px', fontWeight: 'normal' } }, "Trump  ")),
                            React.createElement("td", { style: { padding: '0.3px', float: 'left' } },
                                React.createElement("label", { style: { color: 'Black', fontSize: '12px', fontWeight: 'normal', marginLeft: '8px' } }, ":")),
                            React.createElement("td", { style: { padding: '0.3px', float: 'left' } },
                                React.createElement("label", { id: "trumpvotes", style: { color: 'Black', fontSize: '12px', fontWeight: 'normal', marginLeft: '8px' } })),
                            React.createElement("td", { style: { float: 'left', fontFamily: 'normal', color: "black" } },
                                React.createElement("label", null, "%"))),
                        React.createElement("tr", null,
                            React.createElement("td", { style: { padding: '0.3px', float: 'left' } },
                                React.createElement("label", { style: { color: 'Black', fontSize: '12px', fontWeight: 'normal' } }, "Clinton  ")),
                            React.createElement("td", { style: { padding: '0.3px', float: 'left' } },
                                React.createElement("label", { style: { color: 'Black', fontSize: '12px', fontWeight: 'normal', marginLeft: '8px' } }, ":")),
                            React.createElement("td", { style: { padding: '0.3px', float: 'left' } },
                                React.createElement("label", { id: "clintonvotes", style: { color: 'Black', fontSize: '12px', fontWeight: 'normal', marginLeft: '8px' } }, "%")),
                            React.createElement("td", { style: { padding: '0', float: 'left', fontFamily: 'normal', color: "black" } },
                                React.createElement("label", null, "%")))))),
            React.createElement("div", { style: { float: 'right', marginright: '10px' } },
                "Source:",
                React.createElement("a", { href: "https://en.wikipedia.org/wiki/United_States_presidential_election,_2016", target: "_blank" }, "en.wikipedia.org")),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes USA president election results in the year 2016. Vote details of a state will be displayed in a popup on clicking a state. Placed interactive legend at the top of the map.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to apply various styles for a shape in the map, when it is clicked or mouse hovered."),
                React.createElement("br", null),
                React.createElement("p", { style: { fontweight: 500 } }, "Injecting Module"),
                React.createElement("p", null,
                    "Maps component features are segregated into individual feature-wise modules. To use selection, inject the ",
                    React.createElement("code", null, "Selection"),
                    " module using the ",
                    React.createElement("code", null, "Maps.Inject(Selection)"),
                    " method, and use highlight by injecting the ",
                    React.createElement("code", null, "Highlight"),
                    " module."))));
    };
    SelectionMaps.prototype.onMapsLoad = function (args) {
        var maps = document.getElementById('container');
        maps.setAttribute('title', '');
    };
    ;
    // custom code start
    SelectionMaps.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    ;
    // custom code end
    SelectionMaps.prototype.shapeSelected = function (args) {
        if (args.shapeData !== ej2_base_1.isNullOrUndefined) {
            var matched = navigator.userAgent;
            var browser = matched.toLowerCase();
            var isIE11 = !!navigator.userAgent.match(/Trident\/7\./);
            if (isIE11) {
                browser = 'msie';
            }
            var object = args.data;
            var popup = document.getElementById('closepopup');
            var closebutton = document.getElementById('closebutton');
            var winner = document.getElementById('winner');
            var state = document.getElementById('state');
            var trumpvote = document.getElementById('trumpvotes');
            var clintonvote = document.getElementById('clintonvotes');
            popup.style.display = 'block';
            closebutton.style.display = 'block';
            closebutton.style.left = '206px';
            closebutton.style.top = '-15px';
            closebutton.style.color = "black";
            closebutton.onclick = function () {
                var popup = document.getElementById('closepopup');
                var closebutton = document.getElementById('closebutton');
                popup.style.display = 'none';
                closebutton.style.display = 'none';
            };
            if (browser !== 'mozilla') {
                state.innerText = args.data.State;
                winner.innerText = args.data.Candidate;
                trumpvote.innerText = args.data.Trump;
                clintonvote.innerText = args.data.Clinton;
            }
            else {
                state.textContent = args.data.State;
                winner.textContent = args.data.Candidate;
                trumpvote.textContent = args.data.Trump;
                clintonvote.textContent = args.data.Clinton;
            }
        }
    };
    return SelectionMaps;
}(sample_base_1.SampleBase));
exports.SelectionMaps = SelectionMaps;
