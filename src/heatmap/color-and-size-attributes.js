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
var ej2_react_heatmap_1 = require("@syncfusion/ej2-react-heatmap");
var sample_base_1 = require("../common/sample-base");
// custom code start
var SAMPLE_CSS = "\n#control-container {\n    padding: 0px !important;\n}\n#source{\n    float: right; margin-right: 10p\n}";
// custom code end
/**
 * Schedule Default sample
 */
var ColorAndSizeAttributes = /** @class */ (function (_super) {
    __extends(ColorAndSizeAttributes, _super);
    function ColorAndSizeAttributes() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.jsonCellBubbleData = [
            { Year: '2017', Months: 'Jan-Feb', Accidents: 4, Fatalities: 39 },
            { Year: '2017', Months: 'Mar-Apr', Accidents: 3, Fatalities: 8 },
            { Year: '2017', Months: 'May-Jun', Accidents: 1, Fatalities: 3 },
            { Year: '2017', Months: 'Jul-Aug', Accidents: 1, Fatalities: 0 },
            { Year: '2017', Months: 'Sep-Oct', Accidents: 4, Fatalities: 4 },
            { Year: '2017', Months: 'Nov-Dec', Accidents: 2, Fatalities: 15 },
            { Year: '2016', Months: 'Jan-Feb', Accidents: 4, Fatalities: 28 },
            { Year: '2016', Months: 'Mar-Apr', Accidents: 5, Fatalities: 92 },
            { Year: '2016', Months: 'May-Jun', Accidents: 5, Fatalities: 73 },
            { Year: '2016', Months: 'Jul-Aug', Accidents: 3, Fatalities: 1 },
            { Year: '2016', Months: 'Sep-Oct', Accidents: 3, Fatalities: 4 },
            { Year: '2016', Months: 'Nov-Dec', Accidents: 4, Fatalities: 126 },
            { Year: '2015', Months: 'Jan-Feb', Accidents: 1, Fatalities: 45 },
            { Year: '2015', Months: 'Mar-Apr', Accidents: 5, Fatalities: 152 },
            { Year: '2015', Months: 'May-Jun', Accidents: 0, Fatalities: 0 },
            { Year: '2015', Months: 'Jul-Aug', Accidents: 4, Fatalities: 54 },
            { Year: '2015', Months: 'Sep-Oct', Accidents: 5, Fatalities: 243 },
            { Year: '2015', Months: 'Nov-Dec', Accidents: 2, Fatalities: 45 },
            { Year: '2014', Months: 'Jan-Feb', Accidents: 2, Fatalities: 18 },
            { Year: '2014', Months: 'Mar-Apr', Accidents: 3, Fatalities: 239 },
            { Year: '2014', Months: 'May-Jun', Accidents: 0, Fatalities: 0 },
            { Year: '2014', Months: 'Jul-Aug', Accidents: 4, Fatalities: 501 },
            { Year: '2014', Months: 'Sep-Oct', Accidents: 1, Fatalities: 2 },
            { Year: '2014', Months: 'Nov-Dec', Accidents: 4, Fatalities: 162 },
            { Year: '2013', Months: 'Jan-Feb', Accidents: 2, Fatalities: 68 },
            { Year: '2013', Months: 'Mar-Apr', Accidents: 3, Fatalities: 7 },
            { Year: '2013', Months: 'May-Jun', Accidents: 2, Fatalities: 12 },
            { Year: '2013', Months: 'Jul-Aug', Accidents: 4, Fatalities: 15 },
            { Year: '2013', Months: 'Sep-Oct', Accidents: 2, Fatalities: 64 },
            { Year: '2013', Months: 'Nov-Dec', Accidents: 3, Fatalities: 83 },
            { Year: '2012', Months: 'Jan-Feb', Accidents: 0, Fatalities: 0 },
            { Year: '2012', Months: 'Mar-Apr', Accidents: 2, Fatalities: 158 },
            { Year: '2012', Months: 'May-Jun', Accidents: 5, Fatalities: 90 },
            { Year: '2012', Months: 'Jul-Aug', Accidents: 0, Fatalities: 0 },
            { Year: '2012', Months: 'Sep-Oct', Accidents: 3, Fatalities: 33 },
            { Year: '2012', Months: 'Nov-Dec', Accidents: 4, Fatalities: 42 }
        ];
        return _this;
    }
    ColorAndSizeAttributes.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_heatmap_1.HeatMapComponent, { id: 'heatmap-container', titleSettings: {
                        text: 'Commercial Aviation Accidents and Fatalities by year 2012 - 2017',
                        textStyle: {
                            size: '15px',
                            fontWeight: '500',
                            fontStyle: 'Normal',
                            fontFamily: 'Segoe UI'
                        }
                    }, xAxis: {
                        labels: ['2017', '2016', '2015', '2014', '2013', '2012'],
                    }, yAxis: {
                        labels: ['Jan-Feb', 'Mar-Apr', 'May-Jun', 'Jul-Aug', 'Sep-Oct', 'Nov-Dec'],
                    }, dataSource: this.jsonCellBubbleData, dataSourceSettings: {
                        isJsonData: true,
                        adaptorType: 'Cell',
                        xDataMapping: 'Year',
                        yDataMapping: 'Months',
                        bubbleDataMapping: { size: 'Accidents', color: 'Fatalities' }
                    }, cellSettings: {
                        border: {
                            width: 0
                        },
                        showLabel: false,
                        tileType: 'Bubble',
                        bubbleType: 'SizeAndColor'
                    }, tooltipRender: this.legendTooltip, paletteSettings: {
                        palette: [{ color: '#C06C84' },
                            { color: '#355C7D' }
                        ],
                        type: 'Gradient'
                    }, load: this.load.bind(this), legendSettings: {
                        visible: true,
                    } },
                    React.createElement(ej2_react_heatmap_1.Inject, { services: [ej2_react_heatmap_1.Adaptor, ej2_react_heatmap_1.Tooltip, ej2_react_heatmap_1.Legend] })),
                React.createElement("div", { id: "source" },
                    "Source:",
                    React.createElement("a", { href: "https://en.wikipedia.org", target: '_blank' }, "https://en.wikipedia.org/"))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates the number of commercial air craft accidents and the fatalities across the world between 2012 and 2017. Each data point interprets the accident count and the fatality associated with the accident, the size of the bubble depicts the accident count and the shade of the bubble depicts the fatality count.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to map more than one data for each data point or cell of the bubble heatmap. The size and shade parameters of the bubble is used to depict the data source values. The legend will be displayed only for the shade parameter of the bubble. For JSON data, you can specify which data source value should be mapped to either size or shade of the bubble parameters using the dataMapping property. The data source field should mapped to the size and color properties of the dataMapping property.In this example, you can see how to map more than one data for each data point or cell of the bubble heatmap. The ",
                    React.createElement("code", null, "size"),
                    " and ",
                    React.createElement("code", null, "shade"),
                    " parameters of the bubble is used to depict the data source values. The legend will be displayed only for the shade parameter of the bubble. For JSON data, you can specify which data source value should be mapped to either size or shade of the bubble parameters using the ",
                    React.createElement("code", null, "dataMapping"),
                    " property. The data source field should mapped to the ",
                    React.createElement("code", null, "size"),
                    " and ",
                    React.createElement("code", null, "color"),
                    " properties of the ",
                    React.createElement("code", null, "dataMapping"),
                    " property."),
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Heatmap component features are segregated into individual feature-wise modules. To use a tooltip, inject the ",
                    React.createElement("code", null, "Tooltip "),
                    " module using the ",
                    React.createElement("code", null, "Heatmap.Inject(Tooltip) "),
                    " method."))));
    };
    ColorAndSizeAttributes.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    ;
    ColorAndSizeAttributes.prototype.legendTooltip = function (args) {
        args.content = ['Year ' + ' : ' + args.xLabel + '<br/>' + 'Months ' + ' : ' + args.yLabel + '<br/>'
                + 'Accidents ' + ' : ' + args.value[0].bubbleData + '<br/>' + 'Fatalities ' + ' : '
                + args.value[1].bubbleData];
    };
    ;
    return ColorAndSizeAttributes;
}(sample_base_1.SampleBase));
exports.ColorAndSizeAttributes = ColorAndSizeAttributes;
