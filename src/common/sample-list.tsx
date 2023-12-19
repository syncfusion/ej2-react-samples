import * as React from 'react';
import { ButtonSampleOrder } from '../button/config';
import { TooltipSampleOrder } from '../tooltip/config';
import { TextBoxSampleOrder } from '../textboxes/config';
import { ComboBoxSampleOrder } from '../combo-box/config';
import { AutoCompleteSampleOrder } from '../auto-complete/config';
import { DropDownListSampleOrder } from '../drop-down-list/config';
import { DropDownTreeSampleOrder } from '../drop-down-tree/config';
import { ListViewSampleOrder } from '../listview/config';
import { ToolbarSampleOrder } from '../toolbar/config';
import { AccordionSampleOrder } from '../accordion/config';
import { ScheduleSampleOrder } from '../schedule/config';
import { KanbanSampleOrder } from '../kanban/config';
import { CardSampleOrder } from '../card/config';
import { AvatarSampleOrder } from '../avatar/config';
import { SplitterSampleOrder } from '../splitter/config';
import { BadgeSampleOrder } from '../badge/config';
import { ToastSampleOrder } from '../toast/config';
import { MessageSampleOrder } from '../message/config';
import { TreeViewSampleOrder } from '../treeview/config';
import { ChartSampleOrder } from '../chart/config';
import { DiagramSampleOrder } from '../diagram/config';
import { DialogSampleOrder } from '../dialog/config';
import { PredefinedDialogSampleOrder } from '../predefined-dialogs/config';
import { GridSampleOrder } from '../grid/config';
import { NumericTextBoxOrder } from '../numerictextbox/config';
import { CalendarSampleOrder } from '../calendar/config';
import { DatePickerSampleOrder } from '../datepicker/config';
import { DateTimeOrder } from '../datetimepicker/config';
import { DateRangePickerSampleOrder } from '../daterangepicker/config';
import { CircularGaugeSampleOrder } from '../circular-gauge/config';
import { ArcGaugeSampleOrder } from '../arc-gauge/config';
import { ContextMenuSampleOrder } from '../context-menu/config';
import { MenuSampleOrder } from '../menu/config';
import { LinearGaugeSampleOrder } from '../linear-gauge/config';
import { TimePickerSampleOrder } from '../timepicker/config';
import { MaskedTextBoxOrder } from '../maskedtextbox/config';
import { MultiSelectSampleOrder } from '../multi-select/config';
import { TabSampleOrder } from '../tab/config';
import { SliderSampleOrder } from '../range-slider/config';
import { SidebarSampleOrder } from '../sidebar/config';
import { BarcodeSampleOrder } from '../barcode/config';
import { UploaderSampleOrder } from '../uploader/config';
import { MapSampleOrder } from '../maps/config';
import { RangeNavigatorSampleOrder } from '../range-navigator/config';
import { SparklineOrder } from '../sparkline/config';
import { SmithChartOrder } from '../smith-chart/config';
import { TreemapOrder } from '../treemap/config';
import { ColorPickerSampleOrder } from '../color-picker/config';
import { HeatmapSampleOrder } from '../heatmap-chart/config';
import { DocumentEditorSampleOrder } from '../document-editor/config';
import { RichTextEditorSampleOrder } from '../rich-text-editor/config';
import { InPlaceEditorSampleOrder } from '../inplace-editor/config';
import { PivotViewSampleOrder } from '../pivot-table/config';
import {ChipsSampleOrder} from '../chips/config';
import { StockChartSampleOrder } from '../stock-chart/config';
import { BulletChartSampleOrder } from '../bullet-chart/config';
import { ProgressBarSampleOrder } from '../progress-bar/config';
import { TreeGridSampleOrder } from '../treegrid/config';
import { PdfViewerSampleOrder } from '../pdfviewer/config';
import { QueryBuilderSampleOrder } from '../query-builder/config';
import { DashboardLayoutSampleOrder } from '../dashboard-layout/config';
import { FileManagerSampleOrder } from '../file-manager/config';
import { GanttSampleOrder } from '../gantt/config';
import { SpreadsheetSampleOrder } from '../spreadsheet/config';
import { ListBoxSampleOrder } from '../list-box/config';
import { BreadcrumbSampleOrder } from '../breadcrumb/config';
import { CarouselSampleOrder } from '../carousel/config';
import { AppBarSampleOrder } from '../appbar/config';
import { SignatureSampleOrder } from '../signature/config';
import { ImageEditorSampleOrder } from '../image-editor/config';
import { FloatingActionButtonSampleOrder } from "../floating-action-button/config";
import { SpeedDialSampleOrder } from "../speed-dial/config";
import { MentionSampleOrder } from '../mention/config';
import { SkeletonSampleOrder} from '../skeleton/config';
import { RatingSampleOrder } from '../rating/config';
import { RibbonSampleOrder } from '../ribbon/config';
import { StepperSampleOrder } from '../stepper/config';
import { ThreeDimensionChartList } from '../three-dimension-chart/config';

export let samplesList: any = [
    {
        'name': 'Data Grid', 'type':'update', 'category': 'Grids', 'order': '03', 'path': 'grid', 'samples': GridSampleOrder
    },
    {
        'name': 'Pivot Table', 'category': 'Grids', 'order': '03', 'path': 'pivot-table', 'samples': PivotViewSampleOrder
    },
    {
        'name': 'Tree Grid', 'type':'update', 'category': 'Grids', 'order': '03', 'path': 'treegrid', 'samples': TreeGridSampleOrder, 'ftName' :'treegrid'
    },
    {
        'name': 'Spreadsheet', 'category': 'Grids', 'order': '03', 'path': 'spreadsheet', 'samples': SpreadsheetSampleOrder
    },
    {
        'name': 'Charts', 'category': 'Data Visualization', 'order': '01', 'path': 'chart', 'samples': ChartSampleOrder, 'ftName': 'chart'
    },
     {
         'name': '3D Chart', 'category': 'Data Visualization', 'order': '03', 'type': 'preview', 'path': 'three-dimension-chart', 'samples': ThreeDimensionChartList,
    },
    {
        'name': 'Stock Chart', 'category': 'Data Visualization', 'order': '02', 'path': 'stock-chart', 'samples': StockChartSampleOrder
    },
    {
        'name': 'Arc Gauge', 'category': 'Data Visualization', 'order': '04', 'path': 'arc-gauge', 'samples': ArcGaugeSampleOrder, 
    },
    {
        'name': 'Circular Gauge', 'type':'update', 'category': 'Data Visualization', 'order': '03', 'path': 'circular-gauge', 'samples': CircularGaugeSampleOrder, 'ftName' :'circulargauge'
    },
    {
        'name': 'Diagram', 'category': 'Data Visualization', 'order': '02', 'path': 'diagram', 'type': 'update', 'samples': DiagramSampleOrder
    },
    {
        'name': 'HeatMap Chart', 'type':'update', 'category': 'Data Visualization', 'order': '06', 'path': 'heatmap-chart', 'samples': HeatmapSampleOrder, 'ftName' :'heatmap-chart'
    },
    {
        'name': 'Linear Gauge', 'type':'update', 'category': 'Data Visualization', 'order': '04', 'path': 'linear-gauge', 'samples': LinearGaugeSampleOrder, 'ftName' :'lineargauge'
    },
    {
        'name': 'Maps', 'type':'update', 'category': 'Data Visualization', 'order': '07', 'path': 'maps', 'samples': MapSampleOrder, 'ftName' :'maps'
    },
    {
        'name': 'Range Selector', 'category': 'Data Visualization', 'order': '08', 'path': 'range-navigator', 'samples': RangeNavigatorSampleOrder, 'ftName': 'rangenavigator'
    },
    {
        'name': 'Smith Chart', 'category': 'Data Visualization', 'order': '09', 'path': 'smith-chart', 'samples': SmithChartOrder, 'ftName' :'smithchart'
    },
    {
        'name': 'Barcode', 'category': 'Data Visualization', 'order': '02', 'path': 'barcode', 'samples': BarcodeSampleOrder
    },
    {
        'name': 'Sparkline Charts', 'category': 'Data Visualization', 'order': '10', 'path': 'sparkline', 'samples': SparklineOrder, 'ftName' :'sparkline'
    },
    {
        'name': 'TreeMap', 'category': 'Data Visualization', 'order': '11', 'path': 'treemap', 'samples': TreemapOrder, 'ftName' :'treemap'
    },
    {
        'name': 'Bullet Chart', 'type':'update', 'category': 'Data Visualization', 'order': '08', 'path': 'bullet-chart', 'samples': BulletChartSampleOrder,
    },
    {
        'name': 'Kanban', 'category': 'Data Visualization', 'order': '08', 'path': 'kanban', 'samples': KanbanSampleOrder, 'ftName': 'kanban'
    },
    {
        'name': 'Query Builder', 'type':'update', 'category': 'Forms', 'path': 'query-builder', 'samples': QueryBuilderSampleOrder      
    },
    {
        'name': 'PDF Viewer', 'type': 'update', 'category': 'File Viewers & Editors', 'order': '01', 'path': 'pdfviewer', 'samples': PdfViewerSampleOrder, 'ftName': 'pdfviewer'
    },
    {
        'name': 'RichTextEditor', 'category': 'File Viewers & Editors', 'order': '04', 'path': 'rich-text-editor', 'samples': RichTextEditorSampleOrder
    },
    {
        'name': 'DocumentEditor', 'type': 'update', 'category': 'File Viewers & Editors', 'order': '04', 'path': 'document-editor', 'samples': DocumentEditorSampleOrder
    },
    {
        'name': 'Image Editor', 'category': 'File Viewers & Editors', 'ftName': 'image-editor', 'order': '04', 'path': 'image-editor', 'type': 'update', 'samples': ImageEditorSampleOrder
    },
    {
        'name': 'Scheduler', 'category': 'Calendars', 'order': '02', 'path': 'schedule', 'samples': ScheduleSampleOrder, 'ftName': 'scheduler', 'type': 'update'
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
        'name': 'Gantt Chart', 'category': 'Calendars', 'order': '02', 'type':'update', 'path': 'gantt', 'samples': GanttSampleOrder
    },
    {
        'name': 'Button', 'category': 'Buttons', 'order': '04', 'path': 'button', 'samples': ButtonSampleOrder
    },
    {
        'name': 'Chips', 'category': 'Buttons', 'order': '04', 'path': 'chips', 'samples': ChipsSampleOrder
    },
    {
        'name': 'Floating Action Button', 'category': 'Buttons', 'order': '04', 'path': 'floating-action-button', 'samples': FloatingActionButtonSampleOrder
    },
    {
        'name': 'SpeedDial', 'category': 'Buttons', 'order': '04', 'path': 'speed-dial', 'samples': SpeedDialSampleOrder
    },
    {
        'name': 'AutoComplete', 'category': 'Dropdowns', 'order': '04', 'type':'update', 'path': 'auto-complete', 'samples': AutoCompleteSampleOrder
    },
    {
        'name': 'ComboBox', 'category': 'Dropdowns', 'order': '04', 'type':'update', 'path': 'combo-box', 'samples': ComboBoxSampleOrder
    },
    {
        'name': 'Dropdown List', 'category': 'Dropdowns', 'order': '04', 'type':'update', 'path': 'drop-down-list', 'samples': DropDownListSampleOrder
    },
    {
        'name': 'Dropdown Tree', 'category': 'Dropdowns', 'order': '04', 'path': 'drop-down-tree', 'samples': DropDownTreeSampleOrder
    },
    {
        'name': 'MultiSelect Dropdown', 'category': 'Dropdowns', 'order': '04', 'path': 'multi-select', 'samples': MultiSelectSampleOrder
    },
    {
        'name': 'List Box', 'category': 'Dropdowns', 'ftName': 'list-box', 'order': '04', 'path': 'list-box', 'samples': ListBoxSampleOrder
    },
    {
        'name': 'Mention', 'category': 'Dropdowns', 'path': 'mention', 'order': '03', 'samples': MentionSampleOrder
    },
    {
        'name': 'Accordion', 'category': 'Navigation', 'path': 'accordion', 'samples': AccordionSampleOrder
    },
    {
        'name': 'AppBar', 'category': 'Navigation', 'path': 'appbar', 'samples': AppBarSampleOrder, 'ftName': 'appbar'
    },
    {
        'name': 'Breadcrumb', 'category': 'Navigation', 'path': 'breadcrumb', 'samples': BreadcrumbSampleOrder
    },
    {
        'name': 'Carousel', 'category': 'Navigation', 'path': 'carousel', 'samples': CarouselSampleOrder
    },
    {
        'name': 'Context Menu', 'category': 'Navigation', 'path': 'context-menu', 'samples': ContextMenuSampleOrder, 'ftName': 'context-menu'
    },
    {
        'name': 'Menu Bar', 'category': 'Navigation', 'path': 'menu', 'samples': MenuSampleOrder, 'ftName': 'menu-bar'
    },
    {
        'name': 'Sidebar', 'category': 'Navigation', 'path': 'sidebar', 'samples': SidebarSampleOrder
    },
    {
        'name': 'Tabs', 'category': 'Navigation', 'path': 'tab', 'samples': TabSampleOrder
    },
    {
        'name': 'Toolbar', 'category': 'Navigation', 'path': 'toolbar', 'samples': ToolbarSampleOrder
    },
    {
        'name': 'TreeView', 'category': 'Navigation', 'path': 'treeview', 'samples': TreeViewSampleOrder
    },
    {
        'name': 'File Manager', 'category': 'Navigation', 'type': 'update', 'path':'file-manager', 'samples': FileManagerSampleOrder, 'ftName': 'file-manager'
    },
    {
        'name': 'Ribbon', 'category': 'Navigation', 'path':'ribbon', 'samples': RibbonSampleOrder, 'ftName': 'ribbon', 'type': 'preview'
    },
    {
        'name': 'Stepper', 'category': 'Navigation', 'type': 'preview', 'path': 'stepper', 'samples': StepperSampleOrder, 'ftName': 'stepper'
    },
    {
        'name': 'Badge', 'category': 'Notifications', 'order': '02', 'path': 'badge', 'samples': BadgeSampleOrder
    },
    {
        'name': 'Message', 'category': 'Notifications', 'order': '01', 'path': 'message', 'samples': MessageSampleOrder
    },
    {
        'name': 'Toast', 'category': 'Notifications', 'order': '03', 'path': 'toast', 'samples': ToastSampleOrder
    },
    {
        'name': 'Progress Bar', 'category': 'Notifications', 'order': '04', 'path': 'progress-bar', 'samples': ProgressBarSampleOrder
    },    
    {
        'name': "Skeleton", 'category': 'Notifications' , 'order': '04', 'path': "skeleton", 'samples': SkeletonSampleOrder
    },
    {
        'name': 'TextBox', 'category': 'Inputs', 'order': '04', 'path': 'textboxes', 'samples': TextBoxSampleOrder, 'ftName' :'textbox'
    },
    {
        'name': 'Input Mask', 'category': 'Inputs', 'order': '04', 'path': 'maskedtextbox', 'samples': MaskedTextBoxOrder
    },
    {
        'name': 'Numeric Textbox', 'category': 'Inputs', 'order': '04', 'path': 'numerictextbox', 'samples': NumericTextBoxOrder
    },
    {
        'name': 'Color Picker', 'category': 'Inputs', 'order': '04', 'path': 'color-picker', 'samples': ColorPickerSampleOrder, 'ftName': 'color-picker'
    },
    {
        'name': 'File Upload', 'category': 'Inputs', 'order': '04', 'path': 'uploader', 'samples': UploaderSampleOrder, 'ftName' :'file-upload'
    },
    {
        'name': 'Range Slider', 'category': 'Inputs', 'order': '04', 'path': 'range-slider', 'samples': SliderSampleOrder
    },
    {
        'name': 'Signature', 'category': 'Inputs', 'path': 'signature', 'samples': SignatureSampleOrder
    },
    {
        'name': 'In-place Editor', 'category': 'Inputs', 'path': 'inplace-editor', 'samples': InPlaceEditorSampleOrder       
    },
    {
        'name': 'Rating', 'category': 'Inputs', 'order': '04', 'path': 'rating', 'samples': RatingSampleOrder, 'ftName' :'rating'
    },
    {
        'name': 'Avatar', 'category': 'Layout', 'path': 'avatar', 'samples': AvatarSampleOrder
    },
    {
        'name': 'Card', 'category': 'Layout', 'path': 'card', 'samples': CardSampleOrder
    },
    {
        'name': 'Dialog', 'category': 'Layout', 'order': '05', 'path': 'dialog', 'samples': DialogSampleOrder, 'ftName' :'modal-dialog'
    },
    {
        'name': 'Predefined Dialogs', 'category': 'Layout', 'order': '05', 'path': 'predefined-dialogs', 'samples': PredefinedDialogSampleOrder
    },
    {
        'name': 'ListView', 'category': 'Layout', 'type': 'update', 'order': '05', 'path': 'listview', 'samples': ListViewSampleOrder
    },
    {
        'name': 'Tooltip', 'category': 'Layout', 'order': '05', 'path': 'tooltip', 'samples': TooltipSampleOrder
    },
    {
        'name': 'Splitter', 'category': 'Layout', 'path': 'splitter', 'samples': SplitterSampleOrder
    },
    {
        'name': 'Dashboard Layout', 'category': 'Layout', 'path': 'dashboard-layout', 'samples': DashboardLayoutSampleOrder
    }
];
