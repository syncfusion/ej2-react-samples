"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../button/config");
var config_2 = require("../tooltip/config");
var config_3 = require("../textboxes/config");
var config_4 = require("../combo-box/config");
var config_5 = require("../auto-complete/config");
var config_6 = require("../drop-down-list/config");
var config_7 = require("../listview/config");
var config_8 = require("../toolbar/config");
var config_9 = require("../accordion/config");
var config_10 = require("../schedule/config");
var config_11 = require("../card/config");
var config_12 = require("../avatar/config");
var config_13 = require("../splitter/config");
var config_14 = require("../badge/config");
var config_15 = require("../toast/config");
var config_16 = require("../treeview/config");
var config_17 = require("../chart/config");
var config_18 = require("../diagram/config");
var config_19 = require("../dialog/config");
var config_20 = require("../grid/config");
var config_21 = require("../numerictextbox/config");
var config_22 = require("../calendar/config");
var config_23 = require("../datepicker/config");
var config_24 = require("../datetimepicker/config");
var config_25 = require("../daterangepicker/config");
var config_26 = require("../circular-gauge/config");
var config_27 = require("../context-menu/config");
var config_28 = require("../menu/config");
var config_29 = require("../linear-gauge/config");
var config_30 = require("../timepicker/config");
var config_31 = require("../maskedtextbox/config");
var config_32 = require("../multi-select/config");
var config_33 = require("../tab/config");
var config_34 = require("../slider/config");
var config_35 = require("../sidebar/config");
var config_36 = require("../barcode/config");
var config_37 = require("../uploader/config");
var config_38 = require("../maps/config");
var config_39 = require("../range-navigator/config");
var config_40 = require("../sparkline/config");
var config_41 = require("../smith-chart/config");
var config_42 = require("../treemap/config");
var config_43 = require("../color-picker/config");
var config_44 = require("../heatmap/config");
var config_45 = require("../document-editor/config");
var config_46 = require("../rich-text-editor/config");
var config_47 = require("../inplace-editor/config");
var config_48 = require("../pivot-table/config");
var config_49 = require("../chips/config");
var config_50 = require("../stock-chart/config");
var config_51 = require("../bullet-chart/config");
var config_52 = require("../treegrid/config");
var config_53 = require("../pdfviewer/config");
var config_54 = require("../query-builder/config");
var config_55 = require("../dashboard-layout/config");
var config_56 = require("../file-manager/config");
var config_57 = require("../gantt/config");
var config_58 = require("../spreadsheet/config");
var config_59 = require("../list-box/config");
exports.samplesList = [
    {
        'name': 'Data Grid', 'category': 'Grids', 'order': '03', 'path': 'grid', 'samples': config_20.GridSampleOrder
    },
    {
        'name': 'Pivot Table', 'category': 'Grids', 'order': '03', 'path': 'pivot-table', 'samples': config_48.PivotViewSampleOrder, 'type': 'update'
    },
    {
        'name': 'Tree Grid', 'category': 'Grids', 'order': '03', 'path': 'treegrid', 'samples': config_52.TreeGridSampleOrder, 'ftName': 'treegrid'
    },
    {
        'name': 'Spreadsheet', 'category': 'Grids', 'order': '03', 'path': 'spreadsheet', 'samples': config_58.SpreadsheetSampleOrder, 'type': 'preview'
    },
    {
        'name': 'Chart', 'category': 'Data Visualization', 'order': '01', 'path': 'chart', 'samples': config_17.ChartSampleOrder, 'type': 'update', 'ftName': 'chart'
    },
    {
        'name': 'Diagram', 'category': 'Data Visualization', 'order': '02', 'path': 'diagram', 'samples': config_18.DiagramSampleOrder
    },
    {
        'name': 'Stock Chart', 'category': 'Data Visualization', 'order': '02', 'path': 'stock-chart', 'samples': config_50.StockChartSampleOrder
    },
    {
        'name': 'Maps', 'category': 'Data Visualization', 'type': 'update', 'order': '07', 'path': 'maps', 'samples': config_38.MapSampleOrder, 'ftName': 'maps'
    },
    {
        'name': 'TreeMap', 'category': 'Data Visualization', 'order': '11', 'path': 'treemap', 'samples': config_42.TreemapOrder, 'ftName': 'treemap'
    },
    {
        'name': 'Heatmap Chart', 'category': 'Data Visualization', 'order': '06', 'path': 'heatmap', 'samples': config_44.HeatmapSampleOrder, 'ftName': 'heatmap-chart', 'type': 'update'
    },
    {
        'name': 'Circular Gauge', 'category': 'Data Visualization', 'order': '03', 'path': 'circular-gauge', 'samples': config_26.CircularGaugeSampleOrder, 'ftName': 'circulargauge'
    },
    {
        'name': 'Linear Gauge', 'category': 'Data Visualization', 'order': '04', 'path': 'linear-gauge', 'samples': config_29.LinearGaugeSampleOrder, 'ftName': 'lineargauge'
    },
    {
        'name': 'Sparkline Charts', 'category': 'Data Visualization', 'order': '10', 'path': 'sparkline', 'samples': config_40.SparklineOrder, 'ftName': 'sparkline'
    },
    {
        'name': 'Smith Chart', 'category': 'Data Visualization', 'order': '09', 'path': 'smith-chart', 'samples': config_41.SmithChartOrder, 'ftName': 'smithchart'
    },
    {
        'name': 'Barcode', 'category': 'Data Visualization', 'order': '02', 'path': 'barcode', 'samples': config_36.BarcodeSampleOrder
    },
    {
        'name': 'Range Selector', 'category': 'Data Visualization', 'order': '08', 'path': 'range-navigator', 'samples': config_39.RangeNavigatorSampleOrder, 'ftName': 'rangenavigator'
    },
    {
        'name': 'Bullet Chart', 'category': 'Data Visualization', 'order': '08', 'path': 'bullet-chart', 'samples': config_51.BulletChartSampleOrder, 'type': 'preview'
    },
    {
        'name': 'Chips', 'category': 'Editors', 'order': '04', 'path': 'chips', 'samples': config_49.ChipsSampleOrder
    },
    {
        'name': 'Button', 'category': 'Editors', 'order': '04', 'path': 'button', 'samples': config_1.ButtonSampleOrder
    },
    {
        'name': 'DocumentEditor', 'type': 'update', 'category': 'Editors', 'order': '04', 'path': 'document-editor', 'samples': config_45.DocumentEditorSampleOrder
    },
    {
        'name': 'RichTextEditor', 'type': 'update', 'category': 'Editors', 'order': '04', 'path': 'rich-text-editor', 'samples': config_46.RichTextEditorSampleOrder
    },
    {
        'name': 'Scheduler', 'category': 'Calendars', 'order': '02', 'path': 'schedule', 'samples': config_10.ScheduleSampleOrder, 'ftName': 'scheduler'
    },
    {
        'name': 'Gantt', 'category': 'Calendars', 'order': '02', 'path': 'gantt', 'samples': config_57.GanttSampleOrder, "type": "update"
    },
    {
        'name': 'Calendar', 'category': 'Calendars', 'order': '04', 'path': 'calendar', 'samples': config_22.CalendarSampleOrder
    },
    {
        'name': 'DatePicker', 'category': 'Calendars', 'order': '04', 'path': 'datepicker', 'samples': config_23.DatePickerSampleOrder
    },
    {
        'name': 'DateRangePicker', 'category': 'Calendars', 'order': '04', 'path': 'daterangepicker', 'samples': config_25.DateRangePickerSampleOrder
    },
    {
        'name': 'DateTimePicker', 'category': 'Calendars', 'order': '04', 'path': 'datetimepicker', 'samples': config_24.DateTimeOrder
    },
    {
        'name': 'TimePicker', 'category': 'Calendars', 'order': '04', 'path': 'timepicker', 'samples': config_30.TimePickerSampleOrder
    },
    {
        'name': 'ComboBox', 'category': 'Dropdowns', 'order': '04', 'path': 'combo-box', 'samples': config_4.ComboBoxSampleOrder
    },
    {
        'name': 'AutoComplete', 'category': 'Dropdowns', 'order': '04', 'path': 'auto-complete', 'samples': config_5.AutoCompleteSampleOrder
    },
    {
        'name': 'Dropdown List', 'category': 'Dropdowns', 'order': '04', 'path': 'drop-down-list', 'samples': config_6.DropDownListSampleOrder
    },
    {
        'name': 'MultiSelect Dropdown', 'category': 'Dropdowns', 'order': '04', 'path': 'multi-select', 'samples': config_32.MultiSelectSampleOrder
    },
    {
        'name': 'Sidebar', 'category': 'Navigation', 'path': 'sidebar', 'samples': config_35.SidebarSampleOrder
    },
    {
        'name': 'TreeView', 'category': 'Navigation', 'path': 'treeview', 'samples': config_16.TreeViewSampleOrder
    },
    {
        'name': 'Tabs', 'category': 'Navigation', 'path': 'tab', 'samples': config_33.TabSampleOrder
    },
    {
        'name': 'Toolbar', 'category': 'Navigation', 'path': 'toolbar', 'samples': config_8.ToolbarSampleOrder
    },
    {
        'name': 'Context Menu', 'category': 'Navigation', 'path': 'context-menu', 'samples': config_27.ContextMenuSampleOrder, 'ftName': 'context-menu'
    },
    {
        'name': 'Menu Bar', 'category': 'Navigation', 'path': 'menu', 'samples': config_28.MenuSampleOrder, 'ftName': 'menu-bar'
    },
    {
        'name': 'Accordion', 'category': 'Navigation', 'path': 'accordion', 'samples': config_9.AccordionSampleOrder
    },
    {
        'name': 'File Manager', 'category': 'Navigation', 'path': 'file-manager', 'samples': config_56.FileManagerSampleOrder, 'ftName': 'file-manager', 'type': 'update'
    },
    {
        'name': 'Badge', 'category': 'Notifications', 'order': '01', 'path': 'badge', 'samples': config_14.BadgeSampleOrder
    },
    {
        'name': 'Toast', 'category': 'Notifications', 'order': '02', 'path': 'toast', 'samples': config_15.ToastSampleOrder
    },
    {
        'name': 'Input Mask', 'category': 'Inputs', 'order': '04', 'path': 'maskedtextbox', 'samples': config_31.MaskedTextBoxOrder
    },
    {
        'name': 'Numeric Textbox', 'category': 'Inputs', 'order': '04', 'path': 'numerictextbox', 'samples': config_21.NumericTextBoxOrder
    },
    {
        'name': 'Range Slider', 'category': 'Inputs', 'order': '04', 'path': 'slider', 'samples': config_34.SliderSampleOrder
    },
    {
        'name': 'TextBox', 'category': 'Inputs', 'order': '04', 'path': 'textboxes', 'samples': config_3.TextBoxSampleOrder, 'ftName': 'textbox'
    },
    {
        'name': 'File Upload', 'category': 'Inputs', 'order': '04', 'path': 'uploader', 'samples': config_37.UploaderSampleOrder, 'ftName': 'file-upload'
    },
    {
        'name': 'Color Picker', 'category': 'Inputs', 'order': '04', 'path': 'color-picker', 'samples': config_43.ColorPickerSampleOrder, 'ftName': 'color-picker'
    },
    {
        'name': 'ListView', 'category': 'Layout', 'order': '05', 'path': 'listview', 'samples': config_7.ListViewSampleOrder
    },
    {
        'name': 'Dialog', 'type': 'update', 'category': 'Layout', 'order': '05', 'path': 'dialog', 'samples': config_19.DialogSampleOrder, 'ftName': 'modal-dialog'
    },
    {
        'name': 'Tooltip', 'category': 'Layout', 'order': '05', 'path': 'tooltip', 'samples': config_2.TooltipSampleOrder
    },
    {
        'name': 'Card', 'category': 'Layout', 'path': 'card', 'samples': config_11.CardSampleOrder
    },
    {
        'name': 'Avatar', 'category': 'Layout', 'path': 'avatar', 'samples': config_12.AvatarSampleOrder
    },
    {
        'name': 'Splitter', 'category': 'Layout', 'path': 'splitter', 'samples': config_13.SplitterSampleOrder
    },
    {
        'name': 'In-place Editor', 'category': 'Editors', 'path': 'inplace-editor', 'samples': config_47.InPlaceEditorSampleOrder
    },
    {
        'name': 'Query Builder', 'category': 'Forms', 'path': 'query-builder', 'samples': config_54.QueryBuilderSampleOrder
    },
    {
        'name': 'PDF Viewer', 'type': 'update', 'category': 'Viewer', 'order': '01', 'path': 'pdfviewer', 'samples': config_53.PdfViewerSampleOrder, 'ftName': 'pdfviewer'
    },
    {
        'name': 'Dashboard Layout', 'category': 'Layout', 'path': 'dashboard-layout', 'samples': config_55.DashboardLayoutSampleOrder
    },
    {
        'name': 'List Box', 'category': 'Dropdowns', 'ftName': 'list-box', 'order': '04', 'path': 'list-box', 'samples': config_59.ListBoxSampleOrder
    }
];
