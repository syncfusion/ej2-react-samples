"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var line_1 = require("./line");
var spline_1 = require("./spline");
var stepline_1 = require("./stepline");
var dashed_line_1 = require("./dashed-line");
var spline_inversed_1 = require("./spline-inversed");
var line_segments_1 = require("./line-segments");
var line_multi_line_1 = require("./line-multi-line");
var stacked_line_1 = require("./stacked-line");
var stacked_line_100_1 = require("./stacked-line-100");
var area_1 = require("./area");
var spline_area_1 = require("./spline-area");
var steparea_1 = require("./steparea");
var rangearea_1 = require("./rangearea");
var stacked_area_1 = require("./stacked-area");
var stacked_area100_1 = require("./stacked-area100");
var area_empty_1 = require("./area-empty");
var area_segments_1 = require("./area-segments");
var column_1 = require("./column");
var rounded_column_1 = require("./rounded-column");
var column_placement_1 = require("./column-placement");
var range_column_1 = require("./range-column");
var range_bar_1 = require("./range-bar");
var bar_1 = require("./bar");
var stacked_column_1 = require("./stacked-column");
var stacked_column100_1 = require("./stacked-column100");
var stacked_bar_1 = require("./stacked-bar");
var stacked_bar100_1 = require("./stacked-bar100");
var tornado_1 = require("./tornado");
var hilo_1 = require("./hilo");
var hiloopenclose_1 = require("./hiloopenclose");
var candle_1 = require("./candle");
var scatter_1 = require("./scatter");
var bubble_1 = require("./bubble");
var waterfall_1 = require("./waterfall");
var histogram_1 = require("./histogram");
var box_whisker_1 = require("./box-whisker");
var error_bar_1 = require("./error-bar");
var trend_lines_1 = require("./trend-lines");
var combination_series_1 = require("./combination-series");
var pareto_1 = require("./pareto");
var adindicator_1 = require("./adindicator");
var atrindicator_1 = require("./atrindicator");
var bollinger_1 = require("./bollinger");
var ema_1 = require("./ema");
var macd_1 = require("./macd");
var momentum_1 = require("./momentum");
var rsi_1 = require("./rsi");
var sma_1 = require("./sma");
var stochastic_1 = require("./stochastic");
var tma_1 = require("./tma");
var performance_1 = require("./performance");
var default_pie_1 = require("./default-pie");
var pie_radius_1 = require("./pie-radius");
var doughnut_1 = require("./doughnut");
var pyramid_1 = require("./pyramid");
var funnel_1 = require("./funnel");
var default_doughnut_1 = require("./default-doughnut");
var semi_pie_1 = require("./semi-pie");
var smartlabels_1 = require("./smartlabels");
var drilldown_1 = require("./drilldown");
var grouping_1 = require("./grouping");
var pie_empty_point_1 = require("./pie-empty-point");
var polar_line_1 = require("./polar-line");
var polar_spline_1 = require("./polar-spline");
var polar_area_1 = require("./polar-area");
var polar_stackedarea_1 = require("./polar-stackedarea");
var polar_scatter_1 = require("./polar-scatter");
var polar_column_1 = require("./polar-column");
var polar_stackedcolumn_1 = require("./polar-stackedcolumn");
var polar_rangecolumn_1 = require("./polar-rangecolumn");
var local_data_1 = require("./local-data");
var remote_data_1 = require("./remote-data");
var lazy_loading_1 = require("./lazy-loading");
var numeric_axis_1 = require("./numeric-axis");
var datetime_1 = require("./datetime");
var datetime_category_1 = require("./datetime-category");
var category_1 = require("./category");
var indexed_axis_1 = require("./indexed-axis");
var log_1 = require("./log");
var multiple_axis_1 = require("./multiple-axis");
var inversed_1 = require("./inversed");
var stripline_1 = require("./stripline");
var strip_line_recurrence_1 = require("./strip-line-recurrence");
var smart_axis_labels_1 = require("./smart-axis-labels");
var multi_level_label_1 = require("./multi-level-label");
var axis_crossing_1 = require("./axis-crossing");
var sorting_1 = require("./sorting");
var symbols_1 = require("./symbols");
var annotation_1 = require("./annotation");
var datalabel_template_1 = require("./datalabel-template");
var tooltip_template_1 = require("./tooltip-template");
var vertical_1 = require("./vertical");
var empty_point_1 = require("./empty-point");
var print_1 = require("./print");
var export_1 = require("./export");
var selection_1 = require("./selection");
var range_selection_1 = require("./range-selection");
var crosshair_1 = require("./crosshair");
var trackball_1 = require("./trackball");
var zoom_1 = require("./zoom");
var data_editing_1 = require("./data-editing");
exports.chartRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/line', component: line_1.Line }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/spline', component: spline_1.Spline }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/stepline', component: stepline_1.StepLine }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/dashed-line', component: dashed_line_1.DashedLine }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/spline-inversed', component: spline_inversed_1.SplineInversed }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/line-segments', component: line_segments_1.LineZone }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/line-multi-line', component: line_multi_line_1.LineMultiLine }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/stacked-line', component: stacked_line_1.StackedLine }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/stacked-line-100', component: stacked_line_100_1.StackedLine100 }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/area', component: area_1.Area }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/spline-area', component: spline_area_1.SplineArea }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/steparea', component: steparea_1.StepArea }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/rangearea', component: rangearea_1.RangeArea }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/stacked-area', component: stacked_area_1.StackedArea }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/stacked-area100', component: stacked_area100_1.StackedArea100 }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/area-empty', component: area_empty_1.AreaEmpty }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/area-segments', component: area_segments_1.AreaMultiColored }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/column', component: column_1.Column }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/rounded-column', component: rounded_column_1.RoundedColumn }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/column-placement', component: column_placement_1.ColumnPlacement }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/range-column', component: range_column_1.RangeColumn }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/range-bar', component: range_bar_1.RangeBar }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/bar', component: bar_1.Bar }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/stacked-column', component: stacked_column_1.StackedColumn }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/stacked-column100', component: stacked_column100_1.StackedColumn100 }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/stacked-bar', component: stacked_bar_1.StackedBar }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/stacked-bar100', component: stacked_bar100_1.StackedBar100 }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/tornado', component: tornado_1.NegativeStack }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/hilo', component: hilo_1.Hilo }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/hiloopenclose', component: hiloopenclose_1.HiloOpenClose }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/candle', component: candle_1.Candle }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/scatter', component: scatter_1.Scatter }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/bubble', component: bubble_1.Bubble }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/waterfall', component: waterfall_1.Waterfall }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/histogram', component: histogram_1.Histogram }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/box-whisker', component: box_whisker_1.BoxWhisker }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/error-bar', component: error_bar_1.ErrorBarChart }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/trend-lines', component: trend_lines_1.Trend }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/combination-series', component: combination_series_1.CombinationSeries }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/pareto', component: pareto_1.ParetoChart }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/adindicator', component: adindicator_1.AccumulationDistribution }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/atrindicator', component: atrindicator_1.ATR }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/bollinger', component: bollinger_1.Bollinger }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/ema', component: ema_1.EMA }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/macd', component: macd_1.Macd }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/momentum', component: momentum_1.Momentum }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/rsi', component: rsi_1.RSI }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/sma', component: sma_1.SMA }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/stochastic', component: stochastic_1.Stochastic }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/tma', component: tma_1.TMA }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/performance', component: performance_1.Performance }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/default-pie', component: default_pie_1.Pie }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/pie-radius', component: pie_radius_1.PieRadius }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/doughnut', component: doughnut_1.AccumulationDoughnut }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/pyramid', component: pyramid_1.Pyramid }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/funnel', component: funnel_1.Funnel }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/default-doughnut', component: default_doughnut_1.Doughnut }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/semi-pie', component: semi_pie_1.SemiPie }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/smartlabels', component: smartlabels_1.SmartLabels }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/drilldown', component: drilldown_1.Drilldown }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/grouping', component: grouping_1.Grouping }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/pie-empty-point', component: pie_empty_point_1.PieEmptyPoint }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/polar-line', component: polar_line_1.PolarLine }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/polar-spline', component: polar_spline_1.PolarSpline }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/polar-area', component: polar_area_1.PolarArea }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/polar-stackedarea', component: polar_stackedarea_1.PolarStackedArea }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/polar-scatter', component: polar_scatter_1.PolarScatter }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/polar-column', component: polar_column_1.PolarColumn }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/polar-stackedcolumn', component: polar_stackedcolumn_1.PolarStackedColumn }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/polar-rangecolumn', component: polar_rangecolumn_1.PolarRangeColumn }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/local-data', component: local_data_1.LocalData }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/remote-data', component: remote_data_1.RemoteData }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/lazy-loading', component: lazy_loading_1.LazyLoading }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/numeric-axis', component: numeric_axis_1.Numeric }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/datetime', component: datetime_1.DateTimeAxis }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/datetime-category', component: datetime_category_1.DatetimeCategoryAxis }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/category', component: category_1.CategoryAxis }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/indexed-axis', component: indexed_axis_1.IndexedAxis }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/log', component: log_1.LogAxis }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/multiple-axis', component: multiple_axis_1.MultipleAxis }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/inversed', component: inversed_1.InversedAxis }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/stripline', component: stripline_1.Stripline }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/strip-line-recurrence', component: strip_line_recurrence_1.Striplinerecurrence }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/smart-axis-labels', component: smart_axis_labels_1.SmartAxisLabels }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/multi-level-label', component: multi_level_label_1.Multilevellabels }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/axis-crossing', component: axis_crossing_1.AxisCrossing }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/sorting', component: sorting_1.Sorting }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/symbols', component: symbols_1.Symbols }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/annotation', component: annotation_1.Annotation }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/datalabel-template', component: datalabel_template_1.DataLabelTemplate }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/tooltip-template', component: tooltip_template_1.ChartTooltipTemplate }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/vertical', component: vertical_1.VerticalChart }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/empty-point', component: empty_point_1.EmptyPoint }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/print', component: print_1.Print }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/export', component: export_1.ChartExport }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/selection', component: selection_1.SelectionChart }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/range-selection', component: range_selection_1.RangeSelection }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/crosshair', component: crosshair_1.CrosshairChart }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/trackball', component: trackball_1.TrackballChart }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/zoom', component: zoom_1.Zooming }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/data-editing', component: data_editing_1.DataEdit })));
exports.chartCategory = { "line": { "name": "Line", "category": "Line Charts" }, "spline": { "name": "Spline", "category": "Line Charts" }, "stepline": { "name": "Step Line", "category": "Line Charts" }, "dashed-line": { "name": "Dashed Line", "category": "Line Charts" }, "spline-inversed": { "name": "Inversed Spline", "category": "Line Charts" }, "line-segments": { "name": "Line Zone", "category": "Line Charts" }, "line-multi-line": { "name": "Multi Colored Line", "category": "Line Charts" }, "stacked-line": { "name": "Stacked Line", "category": "Line Charts" }, "stacked-line-100": { "name": "100% Stacked Line", "category": "Line Charts" }, "area": { "name": "Area", "category": "Area Charts" }, "spline-area": { "name": "Spline Area", "category": "Area Charts" }, "steparea": { "name": "Step Area", "category": "Area Charts" }, "rangearea": { "name": "Range Area", "category": "Area Charts" }, "stacked-area": { "name": "Stacked Area", "category": "Area Charts" }, "stacked-area100": { "name": "100% Stacked Area", "category": "Area Charts" }, "area-empty": { "name": "Area - Empty Points", "category": "Area Charts" }, "area-segments": { "name": "Area Zone", "category": "Area Charts" }, "column": { "name": "Column", "category": "Bar Charts" }, "rounded-column": { "name": "Rounded Column", "category": "Bar Charts" }, "column-placement": { "name": "Back to Back Column", "category": "Bar Charts" }, "range-column": { "name": "Range Column", "category": "Bar Charts" }, "range-bar": { "name": "Inversed Range Column", "category": "Bar Charts" }, "bar": { "name": "Bar", "category": "Bar Charts" }, "stacked-column": { "name": "Stacked Column", "category": "Bar Charts" }, "stacked-column100": { "name": "100% Stacked Column", "category": "Bar Charts" }, "stacked-bar": { "name": "Stacked Bar", "category": "Bar Charts" }, "stacked-bar100": { "name": "100% Stacked Bar", "category": "Bar Charts" }, "tornado": { "name": "Negative Stack", "category": "Bar Charts" }, "hilo": { "name": "Hilo", "category": "Financial Charts" }, "hiloopenclose": { "name": "Hilo Open Close", "category": "Financial Charts" }, "candle": { "name": "Candle", "category": "Financial Charts" }, "scatter": { "name": "Scatter", "category": "Scatter and Bubble" }, "bubble": { "name": "Bubble", "category": "Scatter and Bubble" }, "waterfall": { "name": "Waterfall", "category": "Other Types" }, "histogram": { "name": "Histogram", "category": "Other Types" }, "box-whisker": { "name": "Box and Whisker", "category": "Other Types" }, "error-bar": { "name": "Error Bar", "category": "Other Types" }, "trend-lines": { "name": "Trendlines", "category": "Other Types" }, "combination-series": { "name": "Combination Series", "category": "Other Types" }, "pareto": { "name": "Pareto Chart", "category": "Other Types" }, "adindicator": { "name": "Accumulation Distribution", "category": "Technical Indicators" }, "atrindicator": { "name": "ATR", "category": "Technical Indicators" }, "bollinger": { "name": "Bollinger", "category": "Technical Indicators" }, "ema": { "name": "EMA", "category": "Technical Indicators" }, "macd": { "name": "MACD", "category": "Technical Indicators" }, "momentum": { "name": "Momentum", "category": "Technical Indicators" }, "rsi": { "name": "RSI", "category": "Technical Indicators" }, "sma": { "name": "SMA", "category": "Technical Indicators" }, "stochastic": { "name": "Stochastic", "category": "Technical Indicators" }, "tma": { "name": "TMA", "category": "Technical Indicators" }, "performance": { "name": "Benchmark", "category": "Performance" }, "default-pie": { "name": "Pie", "category": "Accumulation Charts" }, "pie-radius": { "name": "Pie with Various Radius", "category": "Accumulation Charts" }, "doughnut": { "name": "Doughnut", "category": "Accumulation Charts" }, "pyramid": { "name": "Pyramid", "category": "Accumulation Charts" }, "funnel": { "name": "Funnel", "category": "Accumulation Charts" }, "default-doughnut": { "name": "Pie With Legend", "category": "Accumulation Charts" }, "semi-pie": { "name": "Semi Pie", "category": "Accumulation Charts" }, "smartlabels": { "name": "Smart Labels", "category": "Accumulation Charts" }, "drilldown": { "name": "Drilldown", "category": "Accumulation Charts" }, "grouping": { "name": "Grouping", "category": "Accumulation Charts" }, "pie-empty-point": { "name": "Empty Points", "category": "Accumulation Charts" }, "polar-line": { "name": "Line", "category": "Polar Radar" }, "polar-spline": { "name": "Spline", "category": "Polar Radar" }, "polar-area": { "name": "Area", "category": "Polar Radar" }, "polar-stackedarea": { "name": "Stacked Area", "category": "Polar Radar" }, "polar-scatter": { "name": "Scatter", "category": "Polar Radar" }, "polar-column": { "name": "Column", "category": "Polar Radar" }, "polar-stackedcolumn": { "name": "Wind Rose", "category": "Polar Radar" }, "polar-rangecolumn": { "name": "Range Column", "category": "Polar Radar" }, "local-data": { "name": "Local Data", "category": "Data Binding" }, "remote-data": { "name": "Remote Data", "category": "Data Binding" }, "lazy-loading": { "name": "Lazy Loading", "category": "Data Binding" }, "numeric-axis": { "name": "Numeric Axis", "category": "Chart Axes" }, "datetime": { "name": "DateTime Axis", "category": "Chart Axes" }, "datetime-category": { "name": "DateTime Category Axis", "category": "Chart Axes" }, "category": { "name": "Category Axis", "category": "Chart Axes" }, "indexed-axis": { "name": "Indexed Category Axis", "category": "Chart Axes" }, "log": { "name": "Log Axis", "category": "Chart Axes" }, "multiple-axis": { "name": "Multiple Axis", "category": "Chart Axes" }, "inversed": { "name": "Inversed Axis", "category": "Chart Axes" }, "stripline": { "name": "Strip Line", "category": "Chart Axes" }, "strip-line-recurrence": { "name": "Strip Line Recurrence", "category": "Chart Axes" }, "smart-axis-labels": { "name": "Smart Labels", "category": "Chart Axes" }, "multi-level-label": { "name": "Multi Level Labels", "category": "Chart Axes" }, "axis-crossing": { "name": "Axes Crossing", "category": "Chart Axes" }, "sorting": { "name": "Sorting", "category": "Chart Customization" }, "symbols": { "name": "Symbols", "category": "Chart Customization" }, "annotation": { "name": "Annotation", "category": "Chart Customization" }, "datalabel-template": { "name": "DataLabel Template", "category": "Chart Customization" }, "tooltip-template": { "name": "Tooltip Template", "category": "Chart Customization" }, "vertical": { "name": "Vertical Chart", "category": "Chart Customization" }, "empty-point": { "name": "Empty Points", "category": "Chart Customization" }, "print": { "name": "Print", "category": "Print and Export" }, "export": { "name": "Export", "category": "Print and Export" }, "selection": { "name": "Selection", "category": "User Interaction" }, "range-selection": { "name": "Range Selection", "category": "User Interaction" }, "crosshair": { "name": "Crosshair", "category": "User Interaction" }, "trackball": { "name": "Trackball", "category": "User Interaction" }, "zoom": { "name": "Zooming and Panning", "category": "User Interaction" }, "data-editing": { "name": "Data Editing", "category": "User Interaction" }, "defaultSample": "chart/line" };
