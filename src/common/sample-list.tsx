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
import { PivotViewSampleOrder } from '../pivot-view/config';
import {ChipsSampleOrder} from '../chips/config';
import { StockChartSampleOrder } from '../stock-chart/config';
import { TreeGridSampleOrder } from '../treegrid/config';
import { PdfViewerSampleOrder } from '../pdfviewer/config';
import { QueryBuilderSampleOrder } from '../query-builder/config';

export let samplesList: any = [
    {
        'name': 'Data Grid', 'category': 'Grids', 'order': '03', 'path': 'grid', 'samples': GridSampleOrder, 'type':'update'
    },
    {
        'name': 'Tree Grid', 'category': 'Grids', 'order': '03', 'path': 'treegrid', 'samples': TreeGridSampleOrder, 'type':'preview', 'ftName' :'treegrid'
    },
    {
        'name': 'Pivot Table', 'category': 'Grids', 'order': '03', 'path': 'pivot-view', 'samples': PivotViewSampleOrder, 'type':'update'
    },
    {
        'name': 'Chart', 'category': 'Data Visualization', 'order': '01', 'path': 'chart', 'samples': ChartSampleOrder, 'type': 'update', 'ftName': 'chart'
    },
    {
        'name': 'Diagram', 'category': 'Data Visualization', 'order': '05', 'path': 'diagram', 'samples': DiagramSampleOrder, 'type': 'update'
    },
    {
        'name': 'Stock Chart', 'category': 'Data Visualization', 'order': '02', 'path': 'stock-chart', 'samples': StockChartSampleOrder, 'type': 'preview'
    },
    {
        'name': 'Maps', 'category': 'Data Visualization', 'order': '07', 'path': 'maps', 'samples': MapSampleOrder, "type": "update", 'ftName' :'maps'
    },
    {
        'name': 'TreeMap', 'category': 'Data Visualization', 'order': '11', 'path': 'treemap', 'samples': TreemapOrder, "type": "update", 'ftName' :'treemap'
    },
	{
        'name': 'HeatMap Chart', 'category': 'Data Visualization', 'order': '06', 'path': 'heatmap', 'samples': HeatmapSampleOrder, "type": "update", 'ftName' :'heatmap-chart'
    },
    {
        'name': 'Circular Gauge', 'category': 'Data Visualization', 'order': '03', 'path': 'circular-gauge', 'samples': CircularGaugeSampleOrder, "type": "update", 'ftName' :'circulargauge'
    },
    {
        'name': 'Linear Gauge', 'category': 'Data Visualization', 'order': '04', 'path': 'linear-gauge', 'samples': LinearGaugeSampleOrder, 'ftName' :'lineargauge'
    },
    {
        'name': 'Sparkline Charts', 'category': 'Data Visualization', 'order': '10', 'path': 'sparkline', 'samples': SparklineOrder, 'ftName' :'sparkline', 'type': 'update'
    },
    {
        'name': 'Smith Chart', 'category': 'Data Visualization', 'order': '09', 'path': 'smith-chart', 'samples': SmithChartOrder, 'ftName' :'smithchart'
    },
    {
        'name': 'Range Selector', 'category': 'Data Visualization', 'order': '08', 'path': 'range-navigator', 'samples': RangeNavigatorSampleOrder, 'ftName': 'rangenavigator'
    },
    {
        'name': 'Scheduler', 'category': 'Calendars', 'order': '02', 'path': 'schedule', 'samples': ScheduleSampleOrder, "type": "preview"
    },
    {
        'name': 'Calendar', 'category': 'Calendars', 'type':'update', 'order': '04', 'path': 'calendar', 'samples': CalendarSampleOrder
    },
    {
        'name': 'AutoComplete', 'category': 'Dropdowns', 'order': '04', 'path': 'auto-complete', 'samples': AutoCompleteSampleOrder,
    },
    {
        'name': 'Button', 'category': 'Editors', 'order': '04', 'path': 'button', 'samples': ButtonSampleOrder
    },
    {
        'name': 'Chips', 'category': 'Editors', 'order': '04', 'path': 'chips', 'samples': ChipsSampleOrder, 'type': 'preview'
    },
    {
        'name': 'ComboBox', 'category': 'Dropdowns', 'order': '04', 'path': 'combo-box', 'samples': ComboBoxSampleOrder,
    },
    {
        'name': 'DocumentEditor', 'category': 'Editors', 'order': '04', 'path': 'document-editor', 'samples': DocumentEditorSampleOrder, 'type': 'update'
    },
    {
        'name': 'DatePicker', 'category': 'Calendars', 'order': '04', 'path': 'datepicker', 'samples': DatePickerSampleOrder
    },
    {
        'name': 'DateRangePicker', 'category': 'Calendars', 'order': '04', 'path': 'daterangepicker', 'samples': DateRangePickerSampleOrder
    },
    {
        'name': 'DateTimePicker', 'category': 'Calendars', 'order': '04', 'path': 'datetimepicker',  'samples': DateTimeOrder,
    },
    {
        'name': 'Dropdown List', 'category': 'Dropdowns', 'order': '04', 'path': 'drop-down-list', 'samples': DropDownListSampleOrder,
    },
    {
        'name': 'MultiSelect Dropdown', 'category': 'Dropdowns', 'order': '04', 'path': 'multi-select', 'samples': MultiSelectSampleOrder,
    },
    {
        'name': 'RichTextEditor', 'category': 'Editors', 'order': '04', 'path': 'rich-text-editor', 'samples': RichTextEditorSampleOrder, 'type': 'update'
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
        'name': 'TimePicker', 'category': 'Calendars', 'order': '04', 'path': 'timepicker', 'samples': TimePickerSampleOrder
    },
    {
        'name': 'File Upload', 'category': 'Inputs', 'order': '04', 'path': 'uploader', 'samples': UploaderSampleOrder, type:'update', 'ftName' :'file-upload'
    },
    {
        'name': 'ListView', 'category': 'Layout', 'order': '05', 'path': 'listview', 'samples': ListViewSampleOrder
    },
    {
        'name': 'Dialog', 'category': 'Layout', 'order': '05', 'path': 'dialog', 'samples': DialogSampleOrder, 'type':'update', 'ftName' :'modal-dialog'
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
        'name': 'Splitter', 'category': 'Layout', 'path': 'splitter', 'samples': SplitterSampleOrder, 'type':'preview'
    },
	{
        'name': 'Badge', 'category': 'Notifications', 'order': '01', 'path': 'badge', 'samples': BadgeSampleOrder
    },
    {
        'name': 'Toast', 'category': 'Notifications', 'order': '02', 'path': 'toast', 'samples': ToastSampleOrder
    },
    {
        'name': 'Sidebar', 'category': 'Navigation', 'path': 'sidebar', 'samples': SidebarSampleOrder
    },
    {
        'name': 'TreeView', 'category': 'Navigation', 'path': 'treeview', 'samples': TreeViewSampleOrder
    },
    {
        'name': 'Tabs', 'category': 'Navigation', 'path': 'tab', 'samples': TabSampleOrder, 'type': 'update'
    },
    {
		'name': 'Toolbar', 'category': 'Navigation', 'path': 'toolbar', 'samples': ToolbarSampleOrder
    },
    {
        'name': 'In-place Editor', 'category': 'Forms', 'path': 'inplace-editor', 'type': 'preview', 'samples': InPlaceEditorSampleOrder       
    },
	{
        'name': 'Query Builder', 'category': 'Forms', 'path': 'query-builder', 'type': 'preview', 'samples': QueryBuilderSampleOrder       
    },
    {
        'name': 'Context Menu', 'category': 'Navigation', 'path': 'context-menu', 'samples': ContextMenuSampleOrder, 'ftName': 'context-menu'
    },
    {
        'name': 'Menu Bar', 'category': 'Navigation', 'path': 'menu', 'samples': MenuSampleOrder, 'ftName': 'menu-bar', 'type': 'update'
    },
    {
        'name': 'Accordion', 'category': 'Navigation', 'path': 'accordion', 'samples': AccordionSampleOrder
    },
    {
        'name': 'Color Picker', 'category': 'Inputs', 'order': '04', 'path': 'color-picker', 'samples': ColorPickerSampleOrder, 'ftName': 'color-picker'
    },
	{
        'name': 'PDF Viewer', 'type': 'Preview', 'category': 'Viewer', 'order': '01', 'path': 'pdfviewer', 'samples': PdfViewerSampleOrder, 'ftName': 'pdfviewer'
    }

];