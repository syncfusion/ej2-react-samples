import * as React from 'react';
import { ButtonSampleOrder } from '../button/config';
import { TooltipSampleOrder } from '../tooltip/config';
import { TextBoxSampleOrder } from '../textboxes/config';
import { ComboBoxSampleOrder } from '../combo-box/config';
import { AutoCompleteSampleOrder } from '../auto-complete/config';
import { DropDownListSampleOrder } from '../drop-down-list/config';
import { ListViewSampleOrder } from '../listview/config';
import { ToolbarSampleOrder } from '../toolbar/config';
import { AccordionSampleOrder } from '../accordion/config';
import { ScheduleSampleOrder } from '../schedule/config';
import { CardSampleOrder } from '../card/config';
import { AvatarSampleOrder } from '../avatar/config';
import { SplitterSampleOrder } from '../splitter/config';
import { BadgeSampleOrder } from '../badge/config';
import { ToastSampleOrder } from '../toast/config';
import { TreeViewSampleOrder } from '../treeview/config';
import { ChartSampleOrder } from '../chart/config';
import { DiagramSampleOrder } from '../diagram/config';
import { DialogSampleOrder } from '../dialog/config';
import { GridSampleOrder } from '../grid/config';
import { NumericTextBoxOrder } from '../numerictextbox/config';
import { CalendarSampleOrder } from '../calendar/config';
import { DatePickerSampleOrder } from '../datepicker/config';
import { DateTimeOrder } from '../datetimepicker/config';
import { DateRangePickerSampleOrder } from '../daterangepicker/config';
import { CircularGaugeSampleOrder } from '../circular-gauge/config';
import { ContextMenuSampleOrder } from '../context-menu/config';
import { MenuSampleOrder } from '../menu/config';
import { LinearGaugeSampleOrder } from '../linear-gauge/config';
import { TimePickerSampleOrder } from '../timepicker/config';
import { MaskedTextBoxOrder } from '../maskedtextbox/config';
import { MultiSelectSampleOrder } from '../multi-select/config';
import { TabSampleOrder } from '../tab/config';
import { SliderSampleOrder } from '../slider/config';
import { SidebarSampleOrder } from '../sidebar/config';
import { BarcodeSampleOrder } from '../barcode/config';
import { UploaderSampleOrder } from '../uploader/config';
import { MapSampleOrder } from '../maps/config';
import { RangeNavigatorSampleOrder } from '../range-navigator/config';
import { SparklineOrder } from '../sparkline/config';
import { SmithChartOrder } from '../smith-chart/config';
import { TreemapOrder } from '../treemap/config';
import { ColorPickerSampleOrder } from '../color-picker/config';
import { HeatmapSampleOrder } from '../heatmap/config';
import { DocumentEditorSampleOrder } from '../document-editor/config';
import { RichTextEditorSampleOrder } from '../rich-text-editor/config';
import { InPlaceEditorSampleOrder } from '../inplace-editor/config';
import { PivotViewSampleOrder } from '../pivot-table/config';
import {ChipsSampleOrder} from '../chips/config';
import { StockChartSampleOrder } from '../stock-chart/config';
import { TreeGridSampleOrder } from '../treegrid/config';
import { PdfViewerSampleOrder } from '../pdfviewer/config';
import { QueryBuilderSampleOrder } from '../query-builder/config';
import { DashboardLayoutSampleOrder } from '../dashboard-layout/config';
import { FileManagerSampleOrder } from '../file-manager/config';
import { GanttSampleOrder } from '../gantt/config';
import { SpreadsheetSampleOrder } from '../spreadsheet/config';
import { ListBoxSampleOrder } from '../list-box/config';

export let samplesList: any = [
    {
        'name': 'Data Grid', 'category': 'Grids', 'order': '03', 'path': 'grid', 'samples': GridSampleOrder
    },
    {
        'name': 'Pivot Table', 'category': 'Grids', 'order': '03', 'path': 'pivot-table', 'samples': PivotViewSampleOrder, 'type':'update'
    },
    {
        'name': 'Tree Grid', 'category': 'Grids', 'order': '03', 'path': 'treegrid', 'samples': TreeGridSampleOrder, 'ftName' :'treegrid', 'type': 'update'
    },
    {
        'name': 'Spreadsheet', 'category': 'Grids', 'order': '03', 'path': 'spreadsheet', 'samples': SpreadsheetSampleOrder, 'type': 'preview'
    },
    {
        'name': 'Chart', 'category': 'Data Visualization', 'order': '01', 'path': 'chart', 'samples': ChartSampleOrder, 'type': 'update', 'ftName': 'chart'
    },
    {
        'name': 'Diagram', 'category': 'Data Visualization', 'order': '02', 'path': 'diagram', 'samples': DiagramSampleOrder, 'type': 'update'
    },
    {
        'name': 'Stock Chart', 'category': 'Data Visualization', 'order': '02', 'path': 'stock-chart', 'samples': StockChartSampleOrder
    },
    {
        'name': 'Maps', 'category': 'Data Visualization', 'type': 'update', 'order': '07', 'path': 'maps', 'samples': MapSampleOrder, 'ftName' :'maps'
    },
    {
        'name': 'TreeMap', 'category': 'Data Visualization', 'order': '11', 'path': 'treemap', 'samples': TreemapOrder, 'ftName' :'treemap'
    },
	{
        'name': 'Heatmap Chart', 'category': 'Data Visualization', 'order': '06', 'path': 'heatmap', 'samples': HeatmapSampleOrder, 'ftName' :'heatmap-chart'
    },
    {
        'name': 'Circular Gauge', 'category': 'Data Visualization', 'type': 'update', 'order': '03', 'path': 'circular-gauge', 'samples': CircularGaugeSampleOrder, 'ftName' :'circulargauge'
    },
    {
        'name': 'Linear Gauge', 'category': 'Data Visualization', 'order': '04', 'path': 'linear-gauge', 'samples': LinearGaugeSampleOrder, 'ftName' :'lineargauge'
    },
    {
        'name': 'Sparkline Charts', 'category': 'Data Visualization', 'order': '10', 'path': 'sparkline', 'samples': SparklineOrder, 'ftName' :'sparkline'
    },
    {
        'name': 'Smith Chart', 'category': 'Data Visualization', 'order': '09', 'path': 'smith-chart', 'samples': SmithChartOrder, 'ftName' :'smithchart'
    },
    {
        'name': 'Barcode', 'category': 'Data Visualization', 'order': '02', 'path': 'barcode', 'samples': BarcodeSampleOrder, 'type': 'new'
    },
    {
        'name': 'Range Selector', 'category': 'Data Visualization', 'order': '08', 'path': 'range-navigator', 'samples': RangeNavigatorSampleOrder, 'ftName': 'rangenavigator'
    },
    {
        'name': 'Chips', 'category': 'Editors', 'order': '04', 'path': 'chips', 'samples': ChipsSampleOrder
    },
    {
        'name': 'Button', 'category': 'Editors', 'order': '04', 'path': 'button', 'samples': ButtonSampleOrder
    },
    {
        'name': 'DocumentEditor', 'category': 'Editors', 'order': '04', 'path': 'document-editor', 'samples': DocumentEditorSampleOrder
    },
    {
        'name': 'RichTextEditor', 'type': 'update', 'category': 'Editors', 'order': '04', 'path': 'rich-text-editor', 'samples': RichTextEditorSampleOrder
    },
    {
        'name': 'Scheduler', 'category': 'Calendars', 'order': '02', 'path': 'schedule', 'samples': ScheduleSampleOrder, 'ftName': 'scheduler', 'type': 'update'
    },
	{
        'name': 'Gantt', 'category': 'Calendars', 'order': '02', 'path': 'gantt', 'samples': GanttSampleOrder, "type": "new"
    },
    {
        'name': 'Calendar', 'category': 'Calendars', 'order': '04', 'path': 'calendar', 'samples': CalendarSampleOrder
    },
    {
        'name': 'DatePicker', 'category': 'Calendars', 'order': '04', 'path': 'datepicker', 'samples': DatePickerSampleOrder
    },
    {
        'name': 'DateRangePicker', 'category': 'Calendars', 'order': '04', 'path': 'daterangepicker', 'samples': DateRangePickerSampleOrder
    },
    {
        'name': 'DateTimePicker', 'category': 'Calendars', 'order': '04', 'path': 'datetimepicker', 'samples': DateTimeOrder
    },
    {
        'name': 'TimePicker', 'category': 'Calendars', 'order': '04', 'path': 'timepicker', 'samples': TimePickerSampleOrder
    },
    {
        'name': 'ComboBox', 'category': 'Dropdowns', 'order': '04', 'path': 'combo-box', 'samples': ComboBoxSampleOrder
    },
    {
        'name': 'AutoComplete', 'category': 'Dropdowns', 'order': '04', 'path': 'auto-complete', 'samples': AutoCompleteSampleOrder
    },
    {
        'name': 'Dropdown List', 'category': 'Dropdowns', 'order': '04', 'path': 'drop-down-list', 'samples': DropDownListSampleOrder
    },
    {
        'name': 'MultiSelect Dropdown', 'category': 'Dropdowns', 'order': '04', 'path': 'multi-select', 'samples': MultiSelectSampleOrder
    },
    {
        'name': 'Sidebar', 'category': 'Navigation', 'path': 'sidebar', 'samples': SidebarSampleOrder
    },
    {
        'name': 'TreeView', 'category': 'Navigation', 'path': 'treeview', 'samples': TreeViewSampleOrder
    },
    {
        'name': 'Tabs', 'category': 'Navigation', 'path': 'tab', 'samples': TabSampleOrder
    },
    {
		'name': 'Toolbar', 'category': 'Navigation', 'path': 'toolbar', 'samples': ToolbarSampleOrder
    },
    {
        'name': 'Context Menu', 'category': 'Navigation', 'path': 'context-menu', 'samples': ContextMenuSampleOrder, 'ftName': 'context-menu'
    },
    {
        'name': 'Menu Bar', 'category': 'Navigation', 'path': 'menu', 'samples': MenuSampleOrder, 'ftName': 'menu-bar'
    },
    {
        'name': 'Accordion', 'category': 'Navigation', 'path': 'accordion', 'samples': AccordionSampleOrder
    },
    {
        'name': 'File Manager', 'category': 'Navigation', 'path':'file-manager', 'samples': FileManagerSampleOrder, 'ftName': 'file-manager', 'type': 'update'
    },
    {
        'name': 'Badge', 'category': 'Notifications', 'order': '01', 'path': 'badge', 'samples': BadgeSampleOrder
    },
    {
        'name': 'Toast', 'category': 'Notifications', 'order': '02', 'path': 'toast', 'samples': ToastSampleOrder
    },
    {
        'name': 'Input Mask', 'category': 'Inputs', 'order': '04', 'path': 'maskedtextbox', 'samples': MaskedTextBoxOrder
    },
    {
        'name': 'Numeric Textbox', 'category': 'Inputs', 'order': '04', 'path': 'numerictextbox', 'samples': NumericTextBoxOrder
    },
    {
        'name': 'Range Slider', 'category': 'Inputs', 'order': '04', 'path': 'slider', 'samples': SliderSampleOrder
    },
    {
        'name': 'TextBox', 'category': 'Inputs', 'order': '04', 'path': 'textboxes', 'samples': TextBoxSampleOrder, 'ftName' :'textbox'
    },
    {
        'name': 'File Upload', 'category': 'Inputs', 'order': '04', 'path': 'uploader', 'samples': UploaderSampleOrder, 'ftName' :'file-upload'
    },
    {
        'name': 'Color Picker', 'category': 'Inputs', 'order': '04', 'path': 'color-picker', 'samples': ColorPickerSampleOrder, 'ftName': 'color-picker'
    },
    {
        'name': 'ListView', 'category': 'Layout', 'order': '05', 'path': 'listview', 'samples': ListViewSampleOrder
    },
    {
        'name': 'Dialog', 'category': 'Layout', 'order': '05', 'path': 'dialog', 'samples': DialogSampleOrder, 'ftName' :'modal-dialog'
    },
    {
        'name': 'Tooltip', 'category': 'Layout', 'order': '05', 'path': 'tooltip', 'samples': TooltipSampleOrder
    },
    {
        'name': 'Card', 'category': 'Layout', 'path': 'card', 'samples': CardSampleOrder
    },
	{
        'name': 'Avatar', 'category': 'Layout', 'path': 'avatar', 'samples': AvatarSampleOrder
    },
    {
        'name': 'Splitter', 'category': 'Layout', 'path': 'splitter', 'samples': SplitterSampleOrder
    },
    {
        'name': 'In-place Editor', 'category': 'Editors', 'path': 'inplace-editor', 'samples': InPlaceEditorSampleOrder       
    },
	{
        'name': 'Query Builder', 'category': 'Forms', 'path': 'query-builder', 'samples': QueryBuilderSampleOrder       
    },
	{
        'name': 'PDF Viewer', 'type': 'update', 'category': 'Viewer', 'order': '01', 'path': 'pdfviewer', 'samples': PdfViewerSampleOrder, 'ftName': 'pdfviewer'
    },
    {
        'name': 'Dashbaord Layout', 'category': 'Layout', 'path': 'dashboard-layout', 'samples': DashboardLayoutSampleOrder
    },
    {
        'name': 'List Box', 'category': 'Dropdowns', 'ftName': 'list-box', 'order': '04', 'path': 'list-box', 'samples': ListBoxSampleOrder
    }

];
