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
import { PivotViewSampleOrder } from '../pivot-view/config';
import { MenuSampleOrder } from '../menu/config';

export let samplesList: any = [
    {
        'name': 'Data Grid', 'category': 'Grids', 'order': '03', 'path': 'grid', 'samples': GridSampleOrder, 'type':'update', 'ftName': 'datagrid'
    },
    {
        'name': 'Pivot Grid', 'category': 'Grids', 'order': '03', 'path': 'pivot-view', 'samples': PivotViewSampleOrder, 'type': 'preview'
    },
    {
        'name': 'Chart', 'category': 'Data Visualization', 'order': '02', 'path': 'chart', 'samples': ChartSampleOrder, 'type': 'update', 'ftName': 'chart'
    },
    {
        'name': 'Diagram', 'category': 'Data Visualization', 'order': '02', 'path': 'diagram', 'samples': DiagramSampleOrder, 'type': 'preview'
    },
    {
        'name': 'Maps', 'category': 'Data Visualization', 'order': '02', 'path': 'maps', 'samples': MapSampleOrder, 'ftName' :'maps'
    },
    {
        'name': 'TreeMap', 'category': 'Data Visualization', 'order': '02', 'path': 'treemap', 'samples': TreemapOrder, 'ftName' :'treemap'
    },
	{
        'name': 'HeatMap', 'category': 'Data Visualization', 'order': '02', 'path': 'heatmap', 'samples': HeatmapSampleOrder, "type": "update"
    },
    {
        'name': 'Circular Gauge', 'category': 'Data Visualization', 'order': '02', 'path': 'circular-gauge', 'samples': CircularGaugeSampleOrder, "type": "update", 'ftName' :'circulargauge'
    },
    {
        'name': 'Linear Gauge', 'category': 'Data Visualization', 'order': '02', 'path': 'linear-gauge', 'samples': LinearGaugeSampleOrder, 'ftName' :'lineargauge'
    },
    {
        'name': 'Sparkline', 'category': 'Data Visualization', 'order': '02', 'path': 'sparkline', 'samples': SparklineOrder, 'ftName' :'sparkline'
    },
    {
        'name': 'Smith Chart', 'category': 'Data Visualization', 'order': '02', 'path': 'smith-chart', 'samples': SmithChartOrder, 'ftName' :'smithchart'
    },
    {
        'name': 'Range Navigator', 'category': 'Data Visualization', 'order': '02', 'path': 'range-navigator', 'samples': RangeNavigatorSampleOrder, 'ftName': 'rangenavigator'
    },
    {
        'name': 'Schedule', 'category': 'Calendar', 'order': '02', 'path': 'schedule', 'samples': ScheduleSampleOrder, "type": "update", 'ftName': 'scheduler'
    },
    {
        'name': 'Calendar', 'category': 'Calendar', 'order': '04', 'path': 'calendar', 'samples': CalendarSampleOrder, 'type': 'update'
    },
    {
        'name': 'AutoComplete', 'category': 'Editors', 'order': '04', 'path': 'auto-complete', 'samples': AutoCompleteSampleOrder,
    },
    {
        'name': 'Button', 'category': 'Editors', 'order': '04', 'path': 'button', 'samples': ButtonSampleOrder, 'type': 'update'
    },
    {
        'name': 'ComboBox', 'category': 'Editors', 'order': '04', 'path': 'combo-box', 'samples': ComboBoxSampleOrder,
    },
    {
        'name': 'DocumentEditor', 'category': 'Editors', 'order': '04', 'path': 'document-editor', 'samples': DocumentEditorSampleOrder, 'type': 'preview'
    },
    {
        'name': 'DatePicker', 'category': 'Editors', 'order': '04', 'path': 'datepicker', 'samples': DatePickerSampleOrder
    },
    {
        'name': 'DateRangePicker', 'category': 'Editors', 'order': '04', 'path': 'daterangepicker', 'samples': DateRangePickerSampleOrder
    },
    {
        'name': 'DateTimePicker', 'category': 'Editors', 'order': '04', 'path': 'datetimepicker', 'samples': DateTimeOrder,
    },
    {
        'name': 'DropDownList', 'category': 'Editors', 'order': '04', 'path': 'drop-down-list', 'samples': DropDownListSampleOrder,
    },
    {
        'name': 'MultiSelect', 'category': 'Editors', 'order': '04', 'path': 'multi-select', 'samples': MultiSelectSampleOrder,
    },
    {
        'name': 'RichTextEditor', 'category': 'Editors', 'order': '04', 'path': 'rich-text-editor', 'samples': RichTextEditorSampleOrder, 'type': 'preview'
    },
    {
        'name': 'MaskedTextBox', 'category': 'Editors', 'order': '04', 'path': 'maskedtextbox', 'samples': MaskedTextBoxOrder, 'ftName': 'maskedtextbox'
    },
    {
        'name': 'NumericTextBox', 'category': 'Editors', 'order': '04', 'path': 'numerictextbox', 'samples': NumericTextBoxOrder, 'ftName': 'numerictextbox'
    },
    {
        'name': 'Slider', 'category': 'Editors', 'order': '04', 'path': 'slider', 'samples': SliderSampleOrder
    },
    {
        'name': 'TextBoxes', 'category': 'Editors', 'order': '04', 'path': 'textboxes', 'samples': TextBoxSampleOrder, 'type':'update', 'ftName' :'textbox'
    },
    {
        'name': 'TimePicker', 'category': 'Editors', 'order': '04', 'path': 'timepicker', 'samples': TimePickerSampleOrder
    },
    {
        'name': 'Uploader', 'category': 'Editors', 'order': '04', 'path': 'uploader', 'samples': UploaderSampleOrder, 'type':'update', 'ftName' :'file-upload'
    },
    {
        'name': 'ListView', 'category': 'Layout', 'order': '05', 'path': 'listview', 'samples': ListViewSampleOrder, type:'update'
    },
    {
        'name': 'Dialog', 'category': 'Layout', 'order': '05', 'path': 'dialog', 'samples': DialogSampleOrder, 'type':'update', 'ftName' :'modal-dialog'
    },
    {
        'name': 'Tooltip', 'category': 'Layout', 'order': '05', 'path': 'tooltip', 'samples': TooltipSampleOrder, type:'update'
    },
    {
        'name': 'Card', 'category': 'Layout', 'path': 'card', 'samples': CardSampleOrder
    },
	{
        'name': 'Avatar', 'category': 'Layout', 'path': 'avatar', 'samples': AvatarSampleOrder
    },
	{
        'name': 'Badge', 'category': 'Notifications', 'order': '01', 'path': 'badge', 'samples': BadgeSampleOrder
    },
    {
        'name': 'Toast', 'category': 'Notifications', 'order': '02', 'path': 'toast', 'samples': ToastSampleOrder
    },
    {
        'name': 'Sidebar', 'category': 'Navigation', 'path': 'sidebar', 'samples': SidebarSampleOrder, 'type': 'update'
    },
    {
        'name': 'TreeView', 'category': 'Navigation', 'path': 'treeview', 'samples': TreeViewSampleOrder, 'ftName' :'treeview'
    },
    {
        'name': 'Tab', 'category': 'Navigation', 'path': 'tab', 'samples': TabSampleOrder
    },
    {
		'name': 'Toolbar', 'category': 'Navigation', 'path': 'toolbar', 'samples': ToolbarSampleOrder
    },
    {
        'name': 'ContextMenu', 'category': 'Navigation', 'path': 'context-menu', 'samples': ContextMenuSampleOrder, 'ftName': 'context-menu'
    },
    {
        'name': 'Accordion', 'category': 'Navigation', 'path': 'accordion', 'samples': AccordionSampleOrder
    },
    {
        'name': 'ColorPicker', 'category': 'Editors', 'order': '04', 'path': 'color-picker', 'samples': ColorPickerSampleOrder, 'ftName': 'color-picker'
    },
    {
        'name': 'Menu', 'category': 'Navigation', 'path': 'menu', 'type': 'preview', 'samples': MenuSampleOrder, 'ftName' :'menu'
    }
];