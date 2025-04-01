import * as React from 'react';
import { ButtonSampleOrder } from '../button/config';
import { TooltipSampleOrder } from '../tooltip/config';
import { TextBoxSampleOrder } from '../textboxes/config';
import { TextAreaSampleOrder } from '../textarea/config';
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
import { MarkdownEditorSampleOrder } from '../markdown-editor/config';
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
import { Circular3DOrderList } from '../three-dimension-circular-chart/config';
import { TimelineSampleOrder } from '../timeline/config';
import { OTPSampleOrder } from '../otp-input/config';
import { MultiColumnComboboxSampleOrder } from '../multicolumn-combobox/config';
import { AIAssistViewSampleOrder } from '../ai-assistview/config';
import { ChatUISampleOrder } from '../chat-ui/config';
import { SmartPasteSampleOrder } from '../ai-smart-paste/config';
import { SmartTextAreaSampleOrder } from '../ai-smart-textarea/config';
import { ComboBoxAISampleOrder } from '../ai-combo-box/config';
import { AIGridSampleOrder } from '../ai-grid/config';
import { AITreeGridSampleOrder } from '../ai-tree-grid/config';
import { AISpreadsheetSampleOrder } from '../ai-spreadsheet/config';
import { AIQuerybuilderSampleOrder } from '../ai-querybuilder/config';
import { AIImageEditorSampleOrder } from '../ai-image-editor/config';
import { AIPivotTableSampleOrder } from '../ai-pivot-table/config';
import { AIRichTextEditorSampleOrder } from '../ai-rich-text-editor/config';
import { AIKanbanSampleOrder } from '../ai-kanban/config';
import { AISchedulerSampleOrder } from '../ai-schedule/config';
import { AIMapsSampleOrder } from '../ai-maps/config';
import { AIDocumentEditorSampleOrder } from '../ai-document-editor/config';
import { AIDiagramSampleOrder } from '../ai-diagram/config';
import { AIGanttSampleOrder } from '../ai-gantt/config';
import { AIPdfViewerSampleOrder } from '../ai-pdfviewer/config';
import {SpeechToTextSampleOrder } from '../speech-to-text/config';

export let samplesList: any = [
    {
        'name': 'Smart Paste', 'category': 'Smart Components', 'order': '01', 'path': 'ai-smart-paste', 'samples': SmartPasteSampleOrder, 'type':'preview'
    },
    {
        'name': 'Smart TextArea', 'category': 'Smart Components', 'order': '01', 'path': 'ai-smart-textarea', 'samples': SmartTextAreaSampleOrder, 'type':'preview'
    },
    {
        'name': 'Data Grid', 'category': 'Smart AI Solutions', 'order': '01', 'path': 'ai-grid', 'samples': AIGridSampleOrder
    },
    {
        'name': 'Tree Grid', 'category': 'Smart AI Solutions', 'order': '01', 'path': 'ai-tree-grid', 'samples': AITreeGridSampleOrder
    },
    {
        'name': 'Spreadsheet', 'category': 'Smart AI Solutions', 'order': '01', 'path': 'ai-spreadsheet', 'samples': AISpreadsheetSampleOrder
    },
    {
        'name': 'Diagram', 'category': 'Smart AI Solutions', 'order': '01', 'path': 'ai-diagram', 'samples': AIDiagramSampleOrder
    },
    {
        'name': 'Gantt Chart', 'category': 'Smart AI Solutions', 'order': '01',  'path': 'ai-gantt', 'samples': AIGanttSampleOrder
    },
    {
        'name': 'Query Builder', 'category': 'Smart AI Solutions', 'order': '01', 'path': 'ai-querybuilder', 'samples': AIQuerybuilderSampleOrder
    },
    {
        'name': 'ComboBox', 'category': 'Smart AI Solutions', 'order': '01', 'path': 'ai-combo-box', 'samples': ComboBoxAISampleOrder
    },
    {
        'name': 'Image Editor', 'category': 'Smart AI Solutions', 'order': '01', 'path': 'ai-image-editor', 'samples': AIImageEditorSampleOrder
    },
    {
        'name': 'Pivot Table', 'category': 'Smart AI Solutions', 'order': '01', 'path': 'ai-pivot-table', 'samples': AIPivotTableSampleOrder
    },
    {
        'name': 'Rich Text Editor', 'category': 'Smart AI Solutions', 'order': '01', 'path': 'ai-rich-text-editor', 'samples': AIRichTextEditorSampleOrder
    },
    {
        'name': 'Kanban', 'category': 'Smart AI Solutions', 'order': '01', 'path': 'ai-kanban', 'samples': AIKanbanSampleOrder
    },
    {
        'name': 'Scheduler', 'category': 'Smart AI Solutions', 'order': '01', 'path': 'ai-schedule', 'samples': AISchedulerSampleOrder
    },
    {
        'name': 'Maps', 'category': 'Smart AI Solutions', 'order': '01', 'path': 'ai-maps', 'samples': AIMapsSampleOrder
    },
    {
        'name': 'PDF Viewer', 'category': 'Smart AI Solutions', 'order': '01', 'path': 'ai-pdfviewer', 'samples': AIPdfViewerSampleOrder
    },
    {
        'name': 'Word Processor', 'category': 'Smart AI Solutions', 'order': '01', 'path': 'ai-document-editor', 'samples': AIDocumentEditorSampleOrder
    },
    {
        'name': 'Data Grid', 'type':'update', 'category': 'Grids', 'order': '03', 'path': 'grid', 'samples': GridSampleOrder
    },
    {
        'name': 'Pivot Table', 'category': 'Grids', 'order': '03', 'path': 'pivot-table', 'samples': PivotViewSampleOrder
    },
    {
        'name': 'Tree Grid', 'category': 'Grids', 'order': '03', 'path': 'treegrid', 'samples': TreeGridSampleOrder, 'ftName' :'treegrid', 'type':'update'
    },
    {
        'name': 'Spreadsheet', 'category': 'Grids', 'order': '03', 'path': 'spreadsheet', 'samples': SpreadsheetSampleOrder
    },
    {
        'name': 'AI AssistView', 'category': 'Interactive Chat', 'order': '06', 'path': 'ai-assistview', 'samples': AIAssistViewSampleOrder, 'ftName': 'ai-assistview', 'type':'update'
    },
    {
        'name': 'Chat UI', 'category': 'Interactive Chat', 'order': '06', 'path': 'chat-ui', 'samples': ChatUISampleOrder, 'ftName': 'chat-ui', 'type':'preview'
    },
    {
        'name': 'Charts', 'category': 'Data Visualization', 'order': '01', 'path': 'chart', 'samples': ChartSampleOrder, 'ftName': 'chart', 'type':'update'
    },
     {
         'name': '3D Chart', 'category': 'Data Visualization', 'order': '03', 'path': 'three-dimension-chart', 'samples': ThreeDimensionChartList,
    },
    {
        'name': '3D Circular Chart', 'category': 'Data Visualization', 'order': '03', 'path': 'three-dimension-circular-chart', 'samples': Circular3DOrderList,
    },
    {
        'name': 'Stock Chart', 'category': 'Data Visualization', 'order': '02', 'path': 'stock-chart', 'samples': StockChartSampleOrder
    },
    {
        'name': 'Arc Gauge', 'category': 'Data Visualization', 'order': '04', 'path': 'arc-gauge', 'samples': ArcGaugeSampleOrder, 
    },
    {
        'name': 'Circular Gauge', 'category': 'Data Visualization', 'order': '03', 'path': 'circular-gauge', 'samples': CircularGaugeSampleOrder, 'ftName' :'circulargauge'
    },
    {
        'name': 'Diagram', 'category': 'Data Visualization', 'order': '02', 'path': 'diagram', 'samples': DiagramSampleOrder, 'type':'update'
    },
    {
        'name': 'HeatMap Chart', 'category': 'Data Visualization', 'order': '06', 'path': 'heatmap-chart', 'samples': HeatmapSampleOrder, 'ftName' :'heatmap-chart'
    },
    {
        'name': 'Linear Gauge', 'category': 'Data Visualization', 'order': '04', 'path': 'linear-gauge', 'samples': LinearGaugeSampleOrder, 'ftName' :'lineargauge'
    },
    {
        'name': 'Maps', 'category': 'Data Visualization', 'order': '07', 'path': 'maps', 'samples': MapSampleOrder, 'ftName' :'maps'
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
        'name': 'Bullet Chart', 'category': 'Data Visualization', 'order': '08', 'path': 'bullet-chart', 'samples': BulletChartSampleOrder,
    },
    {
        'name': 'Kanban', 'category': 'Data Visualization', 'order': '08', 'path': 'kanban', 'samples': KanbanSampleOrder, 'ftName': 'kanban'
    },
    {
        'name': 'Query Builder', 'category': 'Forms', 'path': 'query-builder', 'samples': QueryBuilderSampleOrder      
    },
    {
        'name': 'PDF Viewer', 'type': 'update', 'category': 'File Viewers & Editors', 'order': '01', 'path': 'pdfviewer', 'samples': PdfViewerSampleOrder, 'ftName': 'pdfviewer'
    },
    {
        'name': 'Rich Text Editor', 'category': 'File Viewers & Editors', 'order': '04', 'path': 'rich-text-editor', 'samples': RichTextEditorSampleOrder
    },
    {
        'name': 'Markdown Editor', 'category': 'File Viewers & Editors', 'order': '04', 'path': 'markdown-editor', 'samples': MarkdownEditorSampleOrder
    },
    {
        'name': 'Word Processor', 'category': 'File Viewers & Editors', 'order': '04', 'path': 'document-editor', 'samples': DocumentEditorSampleOrder
    },
    {
        'name': 'Image Editor', 'category': 'File Viewers & Editors', 'ftName': 'image-editor', 'order': '04', 'path': 'image-editor', 'samples': ImageEditorSampleOrder
    },
    {
        'name': 'Scheduler', 'category': 'Calendars', 'order': '02', 'path': 'schedule', 'samples': ScheduleSampleOrder, 'ftName': 'scheduler', 'type': 'update'
    },
    {
        'name': 'Gantt Chart', 'category': 'Calendars', 'order': '02', 'type':'update', 'path': 'gantt', 'samples': GanttSampleOrder
    },
    {
        'name': 'Calendar', 'category': 'Calendars', 'order': '04', 'path': 'calendar', 'samples': CalendarSampleOrder
    },
    {
        'name': 'DatePicker', 'category': 'Calendars', "type": "update", 'order': '04', 'path': 'datepicker', 'samples': DatePickerSampleOrder
    },
    {
        'name': 'DateRangePicker', 'category': 'Calendars', 'order': '04', 'path': 'daterangepicker', 'samples': DateRangePickerSampleOrder
    },
    {
        'name': 'DateTimePicker', 'category': 'Calendars', "type": "update", 'order': '04', 'path': 'datetimepicker', 'samples': DateTimeOrder
    },
    {
        'name': 'TimePicker', 'category': 'Calendars', 'order': '04', 'path': 'timepicker', 'samples': TimePickerSampleOrder
    },
    {
        'name': 'Button', 'category': 'Buttons', 'order': '04', 'path': 'button', 'samples': ButtonSampleOrder
    },
    {
        'name': 'Chips', 'category': 'Buttons', "type": "update", 'order': '04', 'path': 'chips', 'samples': ChipsSampleOrder
    },
    {
        'name': 'Floating Action Button', 'category': 'Buttons', 'order': '04', 'path': 'floating-action-button', 'samples': FloatingActionButtonSampleOrder
    },
    {
        'name': 'SpeedDial', 'category': 'Buttons', 'order': '04', 'path': 'speed-dial', 'samples': SpeedDialSampleOrder
    },
    {
        'name': 'AutoComplete',  'category': 'Dropdowns', 'order': '04', 'path': 'auto-complete', 'samples': AutoCompleteSampleOrder
    },
    {
        'name': 'ComboBox', 'category': 'Dropdowns', 'order': '04', 'path': 'combo-box', 'samples': ComboBoxSampleOrder
    },
    {
        'name': 'Dropdown List', 'category': 'Dropdowns',  'order': '04', 'path': 'drop-down-list', 'samples': DropDownListSampleOrder
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
        'name': 'MultiColumn ComboBox', 'category': 'Dropdowns', 'ftName': 'multicolumn-combobox', 'order': '04', 'path': 'multicolumn-combobox', 'samples': MultiColumnComboboxSampleOrder
    },
    {
        'name': 'Mention', 'category': 'Dropdowns', "type": "update", 'path': 'mention', 'order': '03', 'samples': MentionSampleOrder
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
        'name': 'File Manager', 'category': 'Navigation', 'path':'file-manager', 'samples': FileManagerSampleOrder, 'ftName': 'file-manager'
    },
    {
        'name': 'Ribbon', 'category': 'Navigation', 'path':'ribbon', 'samples': RibbonSampleOrder, 'ftName': 'ribbon'
    },
    {
        'name': 'Stepper', 'category': 'Navigation', 'path': 'stepper', 'samples': StepperSampleOrder, 'ftName': 'stepper'
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
        'name': 'TextArea', 'category': 'Inputs', 'order': '04', 'path': 'textarea', 'samples': TextAreaSampleOrder, 'ftName' :'textarea',
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
        'name': 'OTP Input', 'category': 'Inputs', 'order': '04', 'path': 'otp-input', 'samples': OTPSampleOrder, 'ftName' :'otp-input'
    },
    {
        'name': 'Speech To Text', 'category': 'Inputs', 'order': '04', 'path': 'speech-to-text', 'samples': SpeechToTextSampleOrder, 'ftName' :'Speech-to-text', 'type': 'preview'
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
        'name': 'ListView', 'category': 'Layout', 'order': '05', 'path': 'listview', 'samples': ListViewSampleOrder
    },
    {
        'name': 'Tooltip', 'category': 'Layout', 'order': '05', 'path': 'tooltip', 'samples': TooltipSampleOrder
    },
    {
        'name': 'Splitter', 'category': 'Layout', 'path': 'splitter', 'samples': SplitterSampleOrder
    },
    {
        'name': 'Dashboard Layout', 'category': 'Layout', 'path': 'dashboard-layout', 'samples': DashboardLayoutSampleOrder
    },
    {
        'name': 'Timeline', 'category': 'Layout', 'path': 'timeline', 'samples': TimelineSampleOrder, "ftName" :"timeline"
    }
];
