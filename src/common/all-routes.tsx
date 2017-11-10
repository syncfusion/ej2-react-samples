import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { HashRouter, Route, Switch, Link,Redirect } from 'react-router-dom';
import { accordionRoutes } from '../accordion/accordion-routes';
import { autocompleteRoutes } from '../autocomplete/autocomplete-routes';
import { buttonRoutes } from '../button/button-routes';
import { calendarRoutes } from '../calendar/calendar-routes';
import { chartRoutes } from '../chart/chart-routes';
import { circulargaugeRoutes } from '../circulargauge/circulargauge-routes';
import { comboboxRoutes } from '../combobox/combobox-routes';
import { contextmenuRoutes } from '../contextmenu/contextmenu-routes';
import { datepickerRoutes } from '../datepicker/datepicker-routes';
import { daterangepickerRoutes } from '../daterangepicker/daterangepicker-routes';
import { dialogRoutes } from '../dialog/dialog-routes';
import { dropdownlistRoutes } from '../dropdownlist/dropdownlist-routes';
import { formvalidatorRoutes } from '../form-validator/formvalidator-routes';
import { gridRoutes } from '../grid/grid-routes';
import { lineargaugeRoutes } from '../lineargauge/lineargauge-routes';
import { listviewRoutes } from '../listview/listview-routes';
import { maskedtextboxRoutes } from '../maskedtextbox/maskedtextbox-routes';
import { multiselectRoutes } from '../multiselect/multiselect-routes';
import { numerictextboxRoutes } from '../numerictextbox/numerictextbox-routes';
import { tabRoutes } from '../tab/tab-routes';
import { textboxesRoutes } from '../textboxes/textboxes-routes';
import { timepickerRoutes } from '../timepicker/timepicker-routes';
import { toolbarRoutes } from '../toolbar/toolbar-routes';
import { tooltipRoutes } from '../tooltip/tooltip-routes';
import { treeviewRoutes } from '../treeview/treeview-routes';


export const routes = (
       <HashRouter>
    <div>
        {accordionRoutes}
        {autocompleteRoutes}
        {buttonRoutes}
        {calendarRoutes}
        {chartRoutes}
        {circulargaugeRoutes}
        {comboboxRoutes}
        {contextmenuRoutes}
        {datepickerRoutes}
        {daterangepickerRoutes}
        {dialogRoutes}
        {dropdownlistRoutes}
        {formvalidatorRoutes}
        {gridRoutes}
        {lineargaugeRoutes}
        {listviewRoutes}
        {maskedtextboxRoutes}
        {multiselectRoutes}
        {numerictextboxRoutes}
        {tabRoutes}
        {textboxesRoutes}
        {timepickerRoutes}
        {toolbarRoutes}
        {tooltipRoutes}
        {treeviewRoutes}

        {
            (location.hash) === ""   ?
            <Redirect from = '/' exact to="material/chart/line" />:
            null
        }
    </div>
    </HashRouter>
)

export const category: any = {"accordion": {"default":{"name":"Default Functionalities","category":"Accordion"},"ajax":{"name":"Ajax Content","category":"Accordion"},"icon":{"name":"Icons","category":"Accordion"},"rtl":{"name":"RTL","category":"Accordion"},"defaultSample":"accordion/default"},
"autocomplete": {"default":{"name":"Default Functionalities","category":"AutoComplete"},"grouping-icon":{"name":"Grouping and Icons","category":"AutoComplete"},"data-binding":{"name":"Data Binding","category":"AutoComplete"},"template":{"name":"Templates","category":"AutoComplete"},"highlight":{"name":"Highlight","category":"AutoComplete"},"custom-filtering":{"name":"Custom Filtering","category":"AutoComplete"},"defaultSample":"autocomplete/default"},
"button": {"default":{"name":"Default Functionalities","category":"Button"},"check-box":{"name":"CheckBox","category":"Button"},"radio-button":{"name":"RadioButton","category":"Button"},"defaultSample":"button/default"},
"calendar": {"default":{"name":"Default Functionalities","category":"Calendar"},"range":{"name":"Date Range","category":"Calendar"},"disabled":{"name":"Disabled Dates","category":"Calendar"},"special":{"name":"Special Dates","category":"Calendar"},"internationalization":{"name":"Internationalization","category":"Calendar"},"defaultSample":"calendar/default"},
"chart": {"line":{"name":"Line","category":"Line Charts"},"spline":{"name":"Spline","category":"Line Charts"},"stepline":{"name":"Step Line","category":"Line Charts"},"dashed-line":{"name":"Dashed Line","category":"Line Charts"},"spline-inversed":{"name":"Inversed Spline","category":"Line Charts"},"area":{"name":"Area","category":"Area Charts"},"steparea":{"name":"Step Area","category":"Area Charts"},"stacked-area":{"name":"Stacked Area","category":"Area Charts"},"stacked-area100":{"name":"100% Stacked Area","category":"Area Charts"},"area-empty":{"name":"Area - Empty Points","category":"Area Charts"},"column":{"name":"Column","category":"Bar Charts"},"rounded-column":{"name":"Rounded Column","category":"Bar Charts"},"column-placement":{"name":"Back to Back Column","category":"Bar Charts"},"bar":{"name":"Bar","category":"Bar Charts"},"stacked-column":{"name":"Stacked Column","category":"Bar Charts"},"stacked-column100":{"name":"100% Stacked Column","category":"Bar Charts"},"stacked-bar":{"name":"Stacked Bar","category":"Bar Charts"},"stacked-bar100":{"name":"100% Stacked Bar","category":"Bar Charts"},"tornado":{"name":"Negative Stack","category":"Bar Charts"},"range-column":{"name":"Range Column","category":"Financial Charts"},"range-bar":{"name":"Inversed Range Column","category":"Financial Charts"},"rangearea":{"name":"Range Area","category":"Financial Charts"},"hilo":{"name":"Hilo","category":"Financial Charts"},"hiloopenclose":{"name":"Hilo Open Close","category":"Financial Charts"},"candle":{"name":"Candle","category":"Financial Charts"},"scatter":{"name":"Scatter","category":"Scatter and Bubble"},"bubble":{"name":"Bubble","category":"Scatter and Bubble"},"waterfall":{"name":"Waterfall","category":"Other Types"},"box-whisker":{"name":"Box and Whisker","category":"Other Types"},"error-bar":{"name":"Error Bar","category":"Other Types"},"trend-lines":{"name":"Trendlines","category":"Other Types"},"combination-series":{"name":"Combination Series","category":"Other Types"},"pareto":{"name":"Pareto Chart","category":"Other Types"},"adindicator":{"name":"Accumulation Distribution","category":"Technical Indicators"},"atrindicator":{"name":"ATR","category":"Technical Indicators"},"bollinger":{"name":"Bollinger","category":"Technical Indicators"},"ema":{"name":"EMA","category":"Technical Indicators"},"macd":{"name":"MACD","category":"Technical Indicators"},"momentum":{"name":"Momentum","category":"Technical Indicators"},"rsi":{"name":"RSI","category":"Technical Indicators"},"sma":{"name":"SMA","category":"Technical Indicators"},"stochastic":{"name":"Stochastic","category":"Technical Indicators"},"tma":{"name":"TMA","category":"Technical Indicators"},"performance":{"name":"Benchmark","category":"Performance"},"default-pie":{"name":"Pie","category":"Accumulation Charts"},"doughnut":{"name":"Doughnut","category":"Accumulation Charts"},"pyramid":{"name":"Pyramid","category":"Accumulation Charts"},"funnel":{"name":"Funnel","category":"Accumulation Charts"},"default-doughnut":{"name":"Pie With Legend","category":"Accumulation Charts"},"semi-pie":{"name":"Semi Pie","category":"Accumulation Charts"},"smartlabels":{"name":"Smart Labels","category":"Accumulation Charts"},"drilldown":{"name":"Drilldown","category":"Accumulation Charts"},"grouping":{"name":"Grouping","category":"Accumulation Charts"},"pie-empty-point":{"name":"Empty Points","category":"Accumulation Charts"},"polar-line":{"name":"Line","category":"Polar Radar"},"polar-spline":{"name":"Spline","category":"Polar Radar"},"polar-area":{"name":"Area","category":"Polar Radar"},"polar-stackedarea":{"name":"Stacked Area","category":"Polar Radar"},"polar-scatter":{"name":"Scatter","category":"Polar Radar"},"polar-column":{"name":"Column","category":"Polar Radar"},"polar-stackedcolumn":{"name":"Wind Rose","category":"Polar Radar"},"polar-rangecolumn":{"name":"Range Column","category":"Polar Radar"},"local-data":{"name":"Local Data","category":"Data Binding"},"remote-data":{"name":"Remote Data","category":"Data Binding"},"numeric-axis":{"name":"Numeric Axis","category":"Chart Axes"},"datetime":{"name":"DateTime Axis","category":"Chart Axes"},"category":{"name":"Category Axis","category":"Chart Axes"},"indexed-axis":{"name":"Indexed Category Axis","category":"Chart Axes"},"log":{"name":"Log Axis","category":"Chart Axes"},"multiple-axis":{"name":"Multiple Axis","category":"Chart Axes"},"inversed":{"name":"Inversed Axis","category":"Chart Axes"},"stripline":{"name":"Strip Line","category":"Chart Axes"},"smart-axis-labels":{"name":"Smart Labels","category":"Chart Axes"},"symbols":{"name":"Symbols","category":"Chart Customization"},"annotation":{"name":"Annotation","category":"Chart Customization"},"datalabel-template":{"name":"DataLabel Template","category":"Chart Customization"},"vertical":{"name":"Vertical Chart","category":"Chart Customization"},"empty-point":{"name":"Empty Points","category":"Chart Customization"},"print":{"name":"Print","category":"Print and Export"},"export":{"name":"Export","category":"Print and Export"},"selection":{"name":"Selection","category":"User Interaction"},"range-selection":{"name":"Range Selection","category":"User Interaction"},"crosshair":{"name":"Crosshair","category":"User Interaction"},"trackball":{"name":"Trackball","category":"User Interaction"},"zoom":{"name":"Zooming and Panning","category":"User Interaction"},"defaultSample":"chart/line"},
"circulargauge": {"default":{"name":"Default","category":"CIRCULAR GAUGE"},"range":{"name":"Range","category":"CIRCULAR GAUGE"},"labels":{"name":"Tick and Labels","category":"CIRCULAR GAUGE"},"annotation":{"name":"Annotations","category":"CIRCULAR GAUGE"},"customization":{"name":"Gauge Customization","category":"CIRCULAR GAUGE"},"direction":{"name":"Direction Compass","category":"CIRCULAR GAUGE"},"axes":{"name":"Multiple Axis","category":"AXES"},"drag":{"name":"Pointer Drag","category":"USER INTERACTION"},"tooltip":{"name":"Tooltip","category":"USER INTERACTION"},"image":{"name":"Pointer Image","category":"POINTER"},"pointers":{"name":"Pointer Customization","category":"POINTER"},"sampledata":{"name":"Data Sample","category":"Live"},"defaultSample":"circulargauge/default"},
"combobox": {"default":{"name":"Default Functionalities","category":"ComboBox"},"grouping-icon":{"name":"Grouping and Icons","category":"ComboBox"},"data-binding":{"name":"Data Binding","category":"ComboBox"},"custom-value":{"name":"Custom Value","category":"ComboBox"},"filtering":{"name":"Filtering","category":"ComboBox"},"template":{"name":"Templates","category":"ComboBox"},"cascading":{"name":"Cascading","category":"ComboBox"},"defaultSample":"combobox/default"},
"contextmenu": {"default":{"name":"Default Functionalities","category":"ContextMenu"},"defaultSample":"contextmenu/default"},
"datepicker": {"default":{"name":"Default Functionalities","category":"DatePicker"},"range":{"name":"Date Range","category":"DatePicker"},"dateformat":{"name":"Date Formats","category":"DatePicker"},"disabled":{"name":"Disabled Dates","category":"DatePicker"},"special":{"name":"Special Dates","category":"DatePicker"},"globalization":{"name":"Globalization","category":"DatePicker"},"defaultSample":"datepicker/default"},
"daterangepicker": {"default":{"name":"Default Functionalities","category":"DateRangePicker"},"daterange":{"name":"Date Range","category":"DateRangePicker"},"dayspan":{"name":"Day Span","category":"DateRangePicker"},"globalization":{"name":"Globalization","category":"DateRangePicker"},"presets":{"name":"Preset Ranges","category":"DateRangePicker"},"defaultSample":"daterangepicker/default"},
"dialog": {"basic":{"name":"Basic Usage","category":"Dialog"},"modal":{"name":"Modal","category":"Dialog"},"ajax":{"name":"Ajax Content","category":"Dialog"},"rtl":{"name":"RTL","category":"Dialog"},"defaultSample":"dialog/basic"},
"dropdownlist": {"default":{"name":"Default Functionalities","category":"DropDownList"},"grouping-icon":{"name":"Grouping and Icons","category":"DropDownList"},"data-binding":{"name":"Data Binding","category":"DropDownList"},"filtering":{"name":"Filtering","category":"DropDownList"},"template":{"name":"Templates","category":"DropDownList"},"cascading":{"name":"Cascading","category":"DropDownList"},"defaultSample":"dropdownlist/default"},
"form-validator": {"default":{"name":"Default Functionalities","category":"Form Validator"},"defaultSample":"form-validator/default"},
"grid": {"default":{"name":"Default Functionalities","category":"GRID"},"gridlines":{"name":"GridLines","category":"GRID"},"paging":{"name":"Paging","category":"GRID"},"filtering":{"name":"Filtering","category":"Filtering"},"filtermenu":{"name":"Filter Menu","category":"Filtering"},"grouping":{"name":"Grouping","category":"GRID"},"sorting":{"name":"Sorting","category":"GRID"},"scrolling":{"name":"Default Scrolling","category":"SCROLLING"},"virtualization":{"name":"Virtual Scrolling","category":"SCROLLING"},"searching":{"name":"Searching","category":"Filtering"},"masterdetail":{"name":"Master/Detail","category":"GRID"},"rowdraganddrop":{"name":"Row Drag and Drop","category":"GRID"},"hierarchy":{"name":"Hierarchy Grid","category":"GRID"},"clipboard":{"name":"Clipboard","category":"GRID"},"localbinding":{"name":"Local Binding","category":"DATABINDING"},"remotedata":{"name":"Remote Binding","category":"DATABINDING"},"showhide":{"name":"Show Hide Column","category":"COLUMN"},"stackedheader":{"name":"Stacked Header","category":"COLUMN"},"autowrap":{"name":"AutoWrap Column cells","category":"COLUMN"},"reorder":{"name":"Reorder Columns","category":"COLUMN"},"selection":{"name":"Default Selection","category":"SELECTION"},"selectionapi":{"name":"Selection API","category":"SELECTION"},"checkboxselection":{"name":"Checkbox Selection","category":"SELECTION"},"columnchooser":{"name":"Column Chooser","category":"COLUMN"},"columnresizing":{"name":"Column Resizing","category":"COLUMN"},"normaledit":{"name":"Inline Editing","category":"EDITING"},"dialogedit":{"name":"Dialog Editing","category":"EDITING"},"batch":{"name":"Batch Editing","category":"EDITING"},"command-column":{"name":"CommandColumn","category":"EDITING"},"exporting":{"name":"Basic","category":"EXPORTING"},"advanceexporting":{"name":"Advance Exporting","category":"EXPORTING"},"frozenrows":{"name":"Frozen Rows And Columns","category":"COLUMN"},"columnmenu":{"name":"Column Menu","category":"COLUMN"},"contextmenu":{"name":"Context Menu","category":"GRID"},"columnspanning":{"name":"Column Spanning","category":"COLUMN"},"defaultSample":"grid/default"},
"lineargauge": {"default":{"name":"Default","category":"Linear Gauge"},"container":{"name":"Container","category":"Linear Gauge"},"data":{"name":"Data Sample","category":"Linear Gauge"},"ranges":{"name":"Ranges","category":"Linear Gauge"},"axes":{"name":"Axes and Pointers","category":"Linear Gauge"},"annotation":{"name":"Annotation","category":"Linear Gauge"},"tooltip":{"name":"Tooltip","category":"Linear Gauge"},"style":{"name":"Styles","category":"Linear Gauge"},"defaultSample":"lineargauge/default"},
"listview": {"default":{"name":"Default Functionalities","category":"ListView"},"remote-list":{"name":"Remote Data","category":"ListView"},"nested-list":{"name":"Nested List","category":"ListView"},"rtl":{"name":"RTL","category":"ListView"},"defaultSample":"listview/default"},
"maskedtextbox": {"default":{"name":"Default Functionalities","category":"MaskedTextBox"},"custommask":{"name":"Custom Mask","category":"MaskedTextBox"},"formats":{"name":"Formats","category":"MaskedTextBox"},"defaultSample":"maskedtextbox/default"},
"multiselect": {"default":{"name":"Default Functionalities","category":"MultiSelect"},"data-binding":{"name":"Data Binding","category":"MultiSelect"},"grouping":{"name":"Grouping","category":"MultiSelect"},"template":{"name":"Templates","category":"MultiSelect"},"filtering":{"name":"Filtering","category":"MultiSelect"},"customtag":{"name":"Custom Values","category":"MultiSelect"},"defaultSample":"multiselect/default"},
"numerictextbox": {"default":{"name":"Default Functionalities","category":"NumericTextBox"},"range":{"name":"Range Validation","category":"NumericTextBox"},"internationalization":{"name":"Internationalization","category":"NumericTextBox"},"format":{"name":"Custom Format","category":"NumericTextBox"},"restrict":{"name":"Restrict Decimals","category":"NumericTextBox"},"defaultSample":"numerictextbox/default"},
"tab": {"default":{"name":"Default Functionalities","category":"Tab"},"orientation":{"name":"Orientation","category":"Tab"},"responsive-modes":{"name":"Responsive Modes","category":"Tab"},"rtl":{"name":"RTL","category":"Tab"},"defaultSample":"tab/default"},
"textboxes": {"default":{"name":"Default Functionalities","category":"TextBoxes"},"defaultSample":"textboxes/default"},
"timepicker": {"default":{"name":"Default Functionalities","category":"TimePicker"},"range":{"name":"Time Range","category":"TimePicker"},"globalization":{"name":"Globalization","category":"TimePicker"},"format":{"name":"Time Fomat","category":"TimePicker"},"defaultSample":"timepicker/default"},
"toolbar": {"default":{"name":"Default Functionalities","category":"Toolbar"},"popup":{"name":"Popup","category":"Toolbar"},"alignment":{"name":"Alignment","category":"Toolbar"},"rtl":{"name":"RTL","category":"Toolbar"},"defaultSample":"toolbar/default"},
"tooltip": {"default":{"name":"Default Functionalities","category":"Tooltip"},"template":{"name":"Template","category":"Tooltip"},"ajaxcontent":{"name":"Ajax Content","category":"Tooltip"},"smartposition":{"name":"Smart Positioning","category":"Tooltip"},"defaultSample":"tooltip/default"},
"treeview": {"default":{"name":"Default Functionalities","category":"TreeView"},"icons":{"name":"Icons and Images","category":"TreeView"},"checkbox":{"name":"Checkbox","category":"TreeView"},"editing":{"name":"Node Editing","category":"TreeView"},"multiselect":{"name":"Multiple Selection","category":"TreeView"},"dragdrop":{"name":"Drag and Drop","category":"TreeView"},"template":{"name":"Template","category":"TreeView"},"rtl":{"name":"RTL","category":"TreeView"},"localdata":{"name":"Local Data","category":"Data Binding"},"remotedata":{"name":"Remote Data","category":"Data Binding"},"defaultSample":"treeview/default"}
}