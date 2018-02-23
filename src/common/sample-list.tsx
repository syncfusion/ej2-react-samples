import * as React from 'react';
import { ButtonSampleOrder } from '../button/config';
import { TooltipSampleOrder } from '../tooltip/config';
import { TextBoxSampleOrder } from '../textboxes/config';
import { ComboBoxSampleOrder } from '../combobox/config';
import { AutoCompleteSampleOrder } from '../autocomplete/config';
import { DropDownListSampleOrder } from '../dropdownlist/config';
import { ListViewSampleOrder } from '../listview/config';
import { ToolbarSampleOrder } from '../toolbar/config';
import { AccordionSampleOrder } from '../accordion/config';
import { ScheduleSampleOrder } from '../schedule/config';
import { CardSampleOrder } from '../card/config';
import { TreeViewSampleOrder } from '../treeview/config';
import { ChartSampleOrder } from '../chart/config';
import { DialogSampleOrder } from '../dialog/config';
import { GridSampleOrder } from '../grid/config';
import { NumericTextBoxOrder } from '../numerictextbox/config';
import { CalendarSampleOrder } from '../calendar/config';
import { DatePickerSampleOrder } from '../datepicker/config';
import { DateTimeOrder } from '../datetimepicker/config';
import { DateRangePickerSampleOrder } from '../daterangepicker/config';
import { CircularGaugeSampleOrder } from '../circulargauge/config';
import { ContextMenuSampleOrder } from '../contextmenu/config';
import { LinearGaugeSampleOrder } from '../lineargauge/config';
import { TimePickerSampleOrder } from '../timepicker/config';
import { MaskedTextBoxOrder } from '../maskedtextbox/config';
import { MultiSelectSampleOrder } from '../multiselect/config';
import { TabSampleOrder } from '../tab/config';
import { SliderSampleOrder } from '../slider/config';
import { SidebarSampleOrder } from '../sidebar/config';
import { UploaderSampleOrder } from '../uploader/config';
import { MapSampleOrder } from '../maps/config';

export let samplesList: any = [
    {
        'name': 'Chart', 'category': 'Data Visualization', 'order': '02', 'path': 'chart', 'samples': ChartSampleOrder, 'type': 'update'
    },
    {
        'name': 'Maps', 'category': 'Data Visualization', 'order': '02', 'path': 'maps', 'samples': MapSampleOrder, "type": "preview"
    },
    {
        'name': 'Circular Gauge', 'category': 'Data Visualization', 'order': '02', 'path': 'circulargauge', 'samples': CircularGaugeSampleOrder
    },
    {
        'name': 'Linear Gauge', 'category': 'Data Visualization', 'order': '02', 'path': 'lineargauge', 'samples': LinearGaugeSampleOrder
    },
    {
        'name': 'Grid', 'category': 'Grids', 'order': '03', 'path': 'grid', 'samples': GridSampleOrder, 'type':'update'
    },
    {
        'name': 'Schedule', 'category': 'Calendar', 'order': '02', 'path': 'schedule', 'samples': ScheduleSampleOrder, "type": "preview"
    },
    {
        'name': 'Calendar', 'category': 'Calendar', 'order': '04', 'path': 'calendar', 'samples': CalendarSampleOrder,
    },
    {
        'name': 'AutoComplete', 'category': 'Editors', 'order': '04', 'path': 'autocomplete', 'samples': AutoCompleteSampleOrder, 'type':'update'
    },
    {
        'name': 'Button', 'category': 'Editors', 'order': '04', 'path': 'button', 'samples': ButtonSampleOrder, 'type': 'update'
    },
    {
        'name': 'ComboBox', 'category': 'Editors', 'order': '04', 'path': 'combobox', 'samples': ComboBoxSampleOrder, 'type':'update'
    },
    {
        'name': 'DatePicker', 'category': 'Editors', 'order': '04', 'path': 'datepicker', 'samples': DatePickerSampleOrder
    },
    {
        'name': 'DateRangePicker', 'category': 'Editors', 'order': '04', 'path': 'daterangepicker', 'type': 'update', 'samples': DateRangePickerSampleOrder
    },
    {
        'name': 'DateTimePicker', 'category': 'Editors', 'order': '04', 'path': 'datetimepicker', 'type': 'preview', 'samples': DateTimeOrder, 
    },
    {
        'name': 'DropDownList', 'category': 'Editors', 'order': '04', 'path': 'dropdownlist', 'samples': DropDownListSampleOrder, 'type':'update'
    },
    {
        'name': 'MultiSelect', 'category': 'Editors', 'order': '04', 'path': 'multiselect', 'samples': MultiSelectSampleOrder, 'type':'update'
    },
    {
        'name': 'MaskedTextBox', 'category': 'Editors', 'order': '04', 'path': 'maskedtextbox', 'samples': MaskedTextBoxOrder
    },
    {
        'name': 'NumericTextBox', 'category': 'Editors', 'order': '04', 'path': 'numerictextbox', 'samples': NumericTextBoxOrder
    },
    {
        'name': 'Slider', 'category': 'Editors', 'order': '04', 'path': 'slider', 'samples': SliderSampleOrder, "type": "preview"
    },
    {
        'name': 'TextBoxes', 'category': 'Editors', 'order': '04', 'path': 'textboxes', 'samples': TextBoxSampleOrder
    },
    {
        'name': 'TimePicker', 'category': 'Editors', 'order': '04', 'path': 'timepicker', 'type': 'update', 'samples': TimePickerSampleOrder
    },
    {
        'name': 'Uploader', 'category': 'Editors', 'order': '04', 'path': 'uploader', 'samples': UploaderSampleOrder, 'type': 'preview'
    },
    {
        'name': 'ListView', 'category': 'Layout', 'order': '05', 'path': 'listview', 'samples': ListViewSampleOrder, type:'update'
    },
    {
        'name': 'Dialog', 'category': 'Layout', 'order': '05', 'path': 'dialog', 'samples': DialogSampleOrder, type:'update'
    },
    {
        'name': 'Tooltip', 'category': 'Layout', 'order': '05', 'path': 'tooltip', 'samples': TooltipSampleOrder
    },
    {
        'name': 'Card', 'category': 'Layout', 'path': 'card', 'samples': CardSampleOrder, "type": "preview"
    },
    {
        'name': 'Sidebar', 'category': 'Navigation', 'path': 'sidebar', 'type': 'preview', 'samples': SidebarSampleOrder
    },
    {
        'name': 'TreeView', 'category': 'Navigation', 'path': 'treeview', 'samples': TreeViewSampleOrder
    },
    {
        'name': 'Tab', 'category': 'Navigation', 'path': 'tab', 'samples': TabSampleOrder, "type": "update"
    },
    {
		'name': 'Toolbar', 'category': 'Navigation', 'path': 'toolbar', 'samples': ToolbarSampleOrder, "type": "update"
    },
    {
        'name': 'ContextMenu', 'category': 'Navigation', 'path': 'contextmenu', 'samples': ContextMenuSampleOrder
    },
    {
        'name': 'Accordion', 'category': 'Navigation', 'path': 'accordion', 'samples': AccordionSampleOrder
    }
   
];