import * as React from 'react';
import { GanttComponent, DayMarkers, Inject, Edit, Selection, Toolbar,ExcelExport, PdfExport, ColumnsDirective, ColumnDirective, EventMarkersDirective, EventMarkerDirective, HolidaysDirective, HolidayDirective, ColumnMenu, Sort, Filter, Resize } from '@syncfusion/ej2-react-gantt';
import { overviewData, editingResources } from './data';
import { SampleBase } from '../common/sample-base';
import { DropDownList } from '@syncfusion/ej2-react-dropdowns';
import './overview.css';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { SidebarComponent } from '@syncfusion/ej2-react-navigations';
import { SwitchComponent } from '@syncfusion/ej2-react-buttons';
import { MultiSelectComponent, CheckBoxSelection} from '@syncfusion/ej2-react-dropdowns';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { extend } from '@syncfusion/ej2-base';
import { SliderComponent } from '@syncfusion/ej2-react-inputs';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';

export class Overview extends SampleBase<{}, {}> {
    private ganttInstance: GanttComponent;
    public theme: any;
    public CurrentTheme: any;
    public statusStyleColor: any;
    public priorityStyle: any;
    public priorityContentStyle: any;
    public statusContentstyleColor: any;
    public display: any;
    public padding: any;
    public gap: any;
    public width: any;
    public height: any;
    public background: any;
    public borderRadius: any;
    public color: any;
    public fontStyle: any;
    public fontWeight: any;
    public fontSize: any;
    public lineHeight: any;
    public textAlign: any;
    public backgroundColor: any;
    public backgroundPri: any;
    public pad: any;

    public dataList: { [key: string]: Object }[] = [
        { ID: 'Default', Text: 'Default' },
        { ID: 'Grid', Text: 'Grid' },
        { ID: 'Chart', Text: 'Chart' }
    ];
    public template: any = this.columnTemplate.bind(this);
    public statusTemplate: any = this.statustemplate.bind(this);
    public priorityTemplate: any = this.prioritytemplate.bind(this);

    public taskFields: any = {
        id: 'TaskId',
        name: 'TaskName',
        startDate: 'StartDate',
        endDate: 'EndDate',
        duration: 'TimeLog',
        progress: 'Progress',
        dependency: 'Predecessor',
        parentID: 'ParentId',
        resourceInfo: 'Assignee'
    };
    public resourceFields: any = {
        id: 'resourceId',
        name: 'resourceName'
    };
    public splitterSettings: any = {
        position: "57%"
    };
    public projectStartDate: Date = new Date('12/17/2023');
    public projectEndDate: Date = new Date('10/26/2024');
    public gridLines: any = 'Vertical';
    public toolbarOptions: any = ['ExpandAll', 'CollapseAll', 'ZoomIn', 'ZoomOut', 'ZoomToFit', 'ExcelExport', 'CsvExport', 'PdfExport']

    public change(args: any) {
        let gantt = (document.getElementsByClassName('e-gantt')[0] as any).ej2_instances[0];
        if (args.value == 'Grid') {
            gantt.setSplitterPosition('100%', 'position');
        }
        else if (args.value == 'Chart') {
            gantt.setSplitterPosition('0%', 'position');
        }
        else {
            gantt.setSplitterPosition('57%', 'position');
        }
    };
    public timelineSettings: any = {
        showTooltip: true,
        topTier: {
            unit: 'Month',
            format: 'MMM yyyy'
        },
        bottomTier: {
            unit: 'Day',
            count: 4,
            format: 'dd'
        },
    };
    public labelSettings: any = {
        taskLabel: '${Progress}%',
        rightLabel: 'Assignee'
    };
    public toolbarClick(args: ClickEventArgs): void {
        debugger
        if (args.item.id === "Overview_excelexport") {
          this.ganttInstance.excelExport();
        }
        else if (args.item.id === "Overview_csvexport") {
          this.ganttInstance.csvExport();
        }
        else if (args.item.id === "Overview_pdfexport") {
          this.ganttInstance.pdfExport();
        }
      }
    
    public eventMarkerDay1: Date = new Date('04/04/2024');
    public eventMarkerDay2: Date = new Date('06/30/2024');
    public eventMarkerDay3: Date = new Date('09/29/2024');

    public statustemplate(props: any) {
        let sts = this.Status(props.taskData.Status);
        let stsCon = this.StatusContent(props.taskData.Status);
        if (props.taskData.Status) {
            return (
                <div className='columnTemplate'>
                    <div style={{
                        "display": `${sts.display}`, "padding": `${sts.padding}`, "gap": `${sts.gap}`, "width": `${sts.width}`, "height": `${sts.height}`,
                        "background": `${sts.background}`, "borderRadius": `${sts.borderRadius}`
                    }} >
                        <span style={{
                            "width": `${stsCon.width}`, "height": `${stsCon.height}`, "fontStyle": `${stsCon.fontStyle}`, "fontWeight": `${stsCon.fontWeight}`, "fontSize": `${stsCon.fontSize}`,
                            "lineHeight": `${stsCon.lineHeight}`, "borderRadius": `${stsCon.borderRadius}`, "color": `${stsCon.color}`, "padding": `${stsCon.pad}`
                        }} >{props.taskData.Status}</span>
                    </div>
                </div>);
        }
    };

    public prioritytemplate(props: any) {
        let pri = this.Priority(props.taskData.Priority);
        let priCon = this.PriorityContent(props.taskData.Priority);
        if (props.taskData.Priority) {
            return (
                <div className='columnTemplate1'>
                    <div style={{
                        "display": `${pri.display}`, "padding": `${pri.padding}`, "gap": `${pri.gap}`, "width": `${pri.width}`, "height": `${pri.height}`,
                        "background": `${pri.backgroundPri}`, "borderRadius": `${pri.borderRadius}`
                    }} >
                        <span style={{
                            "width": `${priCon.width}`, "height": `${priCon.height}`, "fontStyle": `${priCon.fontStyle}`, "fontWeight": `${priCon.fontWeight}`, "fontSize": `${priCon.fontSize}`,
                            "lineHeight": `${priCon.lineHeight}`, "color": `${priCon.color}`
                        }}>{props.taskData.Priority}</span>
                    </div>
                </div>);
        }
    };

    public columnTemplate(props: { ganttProperties: { resourceNames: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | null | undefined; }; }): any {
        var src = 'https://ej2.syncfusion.com/react/demos/src/gantt/images/' + props.ganttProperties.resourceNames + '.png';
        if ((props.ganttProperties.resourceNames)) {
            let gantt = (document.getElementsByClassName('e-gantt')[0] as any).ej2_instances[0];
            if (gantt.enableRtl) {
                return (
                    <div className='columnTemplate'>
                        <img src={src} height='25px' width='25px' />
                        <div style={{ display: "inline-block", width: '100%', position: "relative", right: "8px", bottom: "5px" }}>{props.ganttProperties.resourceNames}</div>
                    </div>);
            }
            else {
                return (
                    <div className='columnTemplate'>
                        <img src={src} height='25px' width='25px' />
                        <div style={{ display: "inline-block", width: '100%', position: "relative", left: "8px" }}>{props.ganttProperties.resourceNames}</div>
                    </div>);
            }
        } else {
            return <div></div>
        }
    }

    public load(): void {
        let themeCollection: any = ['bootstrap5', 'bootstrap', 'bootstrap4', 'fluent', 'fabric', 'fusionnew', 'material3', 'material', 'highcontrast', 'tailwind'];
        let cls: any = document.body.className.split(' ');
        this.theme = cls.indexOf('bootstrap5') > 0 ? 'bootstrap5' : cls.indexOf('bootstrap') > 0 ? 'bootstrap' : cls.indexOf('tailwind') > 0 ? 'tailwind' :
            cls.indexOf('fluent') > 0 ? 'fluent' : cls.indexOf('fabric') > 0 ? 'fabric' :
                cls.indexOf('material3') > 0 ? 'material3' : cls.indexOf('bootstrap4') > 0 ? 'bootstrap4' : cls.indexOf('material') > 0 ? 'material' :
                    cls.indexOf('fusionnew') > 0 ? 'fusionnew' : cls.indexOf('highcontrast') > 0 ? 'highcontrast' : ''
        let check: any = themeCollection.indexOf(this.theme);
        if (check >= 0) {
            this.CurrentTheme = true;
        }
        else {
            this.CurrentTheme = false;
        }
    };

    public pdfQueryCellInfo(args: any): void {
        if (args.column.headerText === 'Assignee' && args.data.taskData.resourcesImage) {
            {
                args.image = { height:25,width:25, base64: args.data.taskData.resourcesImage };
            }
        }
    };

    public Status(status: any) {
        switch (status) {
            case "In Progress":
                this.statusStyleColor = (this.CurrentTheme) ? "#DFECFF" : "#2D3E57";
                this.display = 'flex'; this.padding = '0px 12px'; this.gap = '10px'; this.width = '96px'; this.height = '24px'; this.borderRadius = '24px'; this.background = this.statusStyleColor;
                break;
            case "Open":
                this.background = "red"; this.color = "white"; this.borderRadius = '15px'; this.padding = '6px';
                break;
            case "On Hold":
                this.statusStyleColor = (this.CurrentTheme) ? "#E4E4E7" : "#3C3B43";
                this.display = 'flex'; this.padding = '0px 12px'; this.gap = '10px'; this.width = '78px';
                this.height = '24px'; this.borderRadius = '24px'; this.background = this.statusStyleColor;
                break;
            case "Completed":
                this.statusStyleColor = (this.CurrentTheme) ? "#DFFFE2" : "#16501C";
                this.display = 'flex'; this.padding = '0px 12px'; this.gap = '10px'; this.width = '98px'; this.height = '24px'; this.borderRadius = '24px'; this.background = this.statusStyleColor;
                break;
            case "High":
                this.statusStyleColor = (this.CurrentTheme) ? "#FFEBE9" : "#48211D";
                this.display = 'flex'; this.padding = '0px 12px'; this.gap = '10px'; this.width = '55px'; this.height = '24px'; this.borderRadius = '24px'; this.background = this.statusStyleColor;
                break;
        }
        return { display: this.display, padding: this.padding, gap: this.gap, width: this.width, height: this.height, borderRadius: this.borderRadius, background: this.background, color: this.color };
    };

    public StatusContent(status: any) {
        switch (status) {
            case "In Progress":
                this.statusContentstyleColor = (this.CurrentTheme) ? "#006AA6" : "#34B6FF";
                this.width = "72px"; this.height = "22px"; this.fontStyle = 'normal'; this.fontWeight = '500'; this.fontSize = '14px'; this.lineHeight = '20px'; this.textAlign = 'center'; this.color = this.statusContentstyleColor;
                break;
            case "Open":
                this.backgroundColor = 'red'; this.color = 'white'; this.borderRadius = '15px'; this.pad = '6px'
                break;
            case "On Hold":
                this.statusContentstyleColor = (this.CurrentTheme) ? "#766B7C" : "#CDCBD7";
                this.width = "54px"; this.height = "22px"; this.fontStyle = 'normal'; this.fontWeight = '500'; this.fontSize = '14px'; this.lineHeight = '20px'; this.textAlign = 'center'; this.color = this.statusContentstyleColor;
                break;
            case "Completed":
                this.statusContentstyleColor = (this.CurrentTheme) ? "#00A653" : "#92FFC8";
                this.width = "74px"; this.height = "22px"; this.fontStyle = 'normal'; this.fontWeight = '500'; this.fontSize = '14px'; this.lineHeight = '20px'; this.textAlign = 'center'; this.color = this.statusContentstyleColor;
                break;
            case "High":
                this.statusContentstyleColor = (this.CurrentTheme) ? "#FF3740" : "#FFB5B8";
                this.width = "31px"; this.height = "22px"; this.fontStyle = 'normal'; this.fontWeight = '500'; this.fontSize = '14px'; this.lineHeight = '20px'; this.textAlign = 'center'; this.color = this.statusContentstyleColor;
                break;
        }
        return {
            width: this.width, height: this.height, fontStyle: this.fontStyle, fontWeight: this.fontWeight, fontSize: this.fontSize, lineHeight: this.lineHeight, textAlign: this.textAlign, color: this.color,
            backgroundColor: this.backgroundColor, borderRadius: this.borderRadius, pad: this.pad
        };
    };

    public Priority(priority: any) {
        switch (priority) {
            case "Low":
                this.priorityStyle = (this.CurrentTheme) ? "#FFF6D1" : "#473F1E";
                this.display = 'flex'; this.padding = '0px 12px'; this.gap = '10px'; this.width = '52px'; this.height = '24px'; this.borderRadius = '24px'; this.backgroundPri = this.priorityStyle;
                break;
            case "Normal":
                this.priorityStyle = (this.CurrentTheme) ? "#F5DFFF" : "#4D2F5A";
                this.display = 'flex'; this.padding = '0px 12px'; this.gap = '10px'; this.width = '73px'; this.height = '24px'; this.borderRadius = '24px'; this.backgroundPri = this.priorityStyle;
                break;
            case "Critical":
                this.priorityStyle = (this.CurrentTheme) ? "#FFEBE9" : "#48211D";
                this.display = 'flex'; this.padding = '0px 12px'; this.gap = '10px'; this.width = '72px'; this.height = '24px'; this.borderRadius = '24px'; this.backgroundPri = this.priorityStyle;
                break;
            case "High":
                this.priorityStyle = (this.CurrentTheme) ? "#FFEBE9" : "#48211D";
                this.display = 'flex'; this.padding = '0px 12px'; this.gap = '10px'; this.width = '55px'; this.height = '24px'; this.borderRadius = '24px'; this.backgroundPri = this.priorityStyle;
                break;
        }
        return { display: this.display, padding: this.padding, gap: this.gap, width: this.width, height: this.height, borderRadius: this.borderRadius, backgroundPri: this.backgroundPri };
    };

    public PriorityContent(priority: any) {
        switch (priority) {
            case "Low":
                this.priorityContentStyle = (this.CurrentTheme) ? "#70722B" : "#FDFF88";
                this.width = "28px"; this.height = "22px"; this.fontStyle = 'normal'; this.fontWeight = '500'; this.fontSize = '14px'; this.lineHeight = '20px'; this.textAlign = 'center'; this.color = this.priorityContentStyle;
                break;
            case "Normal":
                this.priorityContentStyle = (this.CurrentTheme) ? "#7100A6" : "#E3A9FF";
                this.width = "49px"; this.height = "22px"; this.fontStyle = 'normal'; this.fontWeight = '500'; this.fontSize = '14px'; this.lineHeight = '20px'; this.textAlign = 'center'; this.color = this.priorityContentStyle;
                break;
            case "Critical":
                this.priorityContentStyle = (this.CurrentTheme) ? "#FF3740" : "#FFB5B8";
                this.width = "48px"; this.height = "22px"; this.fontStyle = 'normal'; this.fontWeight = '500'; this.fontSize = '14px'; this.lineHeight = '20px'; this.textAlign = 'center'; this.color = this.priorityContentStyle;
                break;
            case "High":
                this.priorityContentStyle = (this.CurrentTheme) ? "#FF3740" : "#FFB5B8";
                this.width = "31px"; this.height = "22px"; this.fontStyle = 'normal'; this.fontWeight = '500'; this.fontSize = '14px'; this.lineHeight = '20px'; this.textAlign = 'center'; this.color = this.priorityContentStyle;
                break;
        }
        return {
            width: this.width, height: this.height, fontStyle: this.fontStyle, fontWeight: this.fontWeight, fontSize: this.fontSize, lineHeight: this.lineHeight, textAlign: this.textAlign, color: this.color
        };
    };

    public sidebarobj: SidebarComponent;
    public triggerSidebar() {
        if (this.sidebarobj) {
            this.sidebarobj.isOpen = true;
        }
    }
    public closeSidebar() {
        this.sidebarobj.hide();
    }

    // slide bar
    private defaultObj: any;
    private defaultTicks: any = { placement: 'Before' as any, largeStep: 10, smallStep: 10, showSmallTicks: true };
    private tooltip: any = {
        placement: 'Before',
        isVisible: true,
        showOn: 'Focus'
    };
    public onChanged(args: any) {
        const gantt: any = (document.getElementsByClassName('e-gantt')[0] as any).ej2_instances[0];
        gantt.rowHeight = args.value;
    }

    // Grid lines
    public gridLinesChange(args: any) {
        const gantt: any = (document.getElementsByClassName('e-gantt')[0] as any).ej2_instances[0];
        if (args.checked) {
            gantt.gridLines = 'Both';
        } else {
            gantt.gridLines = 'Vertical';
        }
    }

    // Show Event marekrs
    public tempEvents: any;
    public showEventMarkers(args: any) {
        const gantt: any = (document.getElementsByClassName('e-gantt')[0] as any).ej2_instances[0];
        if (args.checked) {
            gantt.eventMarkers = this.tempEvents;
        } else {
            this.tempEvents = gantt.eventMarkers;
            gantt.eventMarkers = null;
        }
    }

    // Show depenency lines
    public dependencyChange(args: any) {
        var ganttDependencyViewContainer = document.querySelector('.e-gantt-dependency-view-container');
        if (args.checked) {
            if (ganttDependencyViewContainer) {
                (ganttDependencyViewContainer as HTMLElement).style.visibility = 'visible';
            }
        } else {
            (ganttDependencyViewContainer as HTMLElement).style.visibility = 'hidden';
        }
    }


    // Show tasklabels
    public tempLabels: any;
    public taskLabelChange(args: any) {
        const gantt: any = (document.getElementsByClassName('e-gantt')[0] as any).ej2_instances[0];
        if (args.checked) {
            gantt.labelSettings.rightLabel = this.tempLabels;
        } else {
            this.tempLabels = gantt.labelSettings.rightLabel;
            gantt.labelSettings.rightLabel = null;
        }
    }

    public multiselectObj: MultiSelectComponent;
    public workDays: { [key: string]: Object }[] = [
        { id: 'Sunday', day: 'Sunday' },
        { id: 'Monday', day: 'Monday' },
        { id: 'Tuesday', day: 'Tuesday' },
        { id: 'Wednesday', day: 'Wednesday' },
        { id: 'Thursday', day: 'Thursday' },
        { id: 'Friday', day: 'Friday' },
        { id: 'Saturday', day: 'Saturday' },
    ];
    public defaultValue: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    private select(args: any): void {
        let workingDays: any = extend([], this.multiselectObj.value, [], true);
        workingDays.push(args.itemData.day);
        this.ganttInstance.workWeek = workingDays;
    };
    private removed(args: any): void {
        let index = this.ganttInstance.workWeek.indexOf(args.itemData.day);
        if (index !== -1) {
            this.ganttInstance.workWeek = (this.multiselectObj.value as string[]);
        }
    };

    //   Duration Unit
    public durationUnit: { [key: string]: Object }[] = [
        { id: "Minute", Text: "Minute" },
        { id: "Hour", Text: "Hour" },
        { id: "Day", Text: "Day" }
    ];
    public durationFields: any = { text: 'Text', value: 'id' };
    public durationValue = 'Day';
    public changeDuraiton(args: any) {
        const gantt: any = (document.getElementsByClassName('e-gantt')[0] as any).ej2_instances[0];
        gantt.durationUnit = args.value;
    }

    // Timeline unit width
    public unitChange(args: any) {
        const gantt: any = (document.getElementsByClassName('e-gantt')[0] as any).ej2_instances[0];
        var width = args.value;
        gantt.timelineSettings.timelineUnitSize = width;
    }

    // view Type change
    public viewTypeData: any = [
        { id: "ResourceView", Text: "Resource View" },
        { id: "ProjectView", Text: "Project View" }
    ];
    public viewFileds: any = { text: 'Text', value: 'id' };
    public typeChange(args: any) {
        const gantt: any = (document.getElementsByClassName('e-gantt')[0] as any).ej2_instances[0];
        gantt.viewType = args.value;
        if ((document.getElementsByClassName('checkeddependency')[0] as any).hidden !== true) {
            (document.querySelectorAll('.e-switch')[2] as any).ej2_instances[0].checked = true;
        }
    }

    // View Mode

    public viewModeData: any = [
        { ID: "Default", Text: "Default" },
        { ID: "Grid", Text: "Grid" },
        { ID: "Chart", Text: "Chart" },
    ];
    public modeFields: any = { value: 'ID', text: 'Text' };
    public modeChange(args: any) {
        const gantt: any = (document.getElementsByClassName('e-gantt')[0] as any).ej2_instances[0];
        if (args.value == 'Grid') {
            gantt.setSplitterPosition('100%', 'position');
        }
        else if (args.value == 'Chart') {
            gantt.setSplitterPosition('0%', 'position');
        }
        else {
            gantt.setSplitterPosition('50%', 'position');
        }
    }
    render() {
        return (
            <div>
                <div className='control-section'>
                    <div id='gantt-sidebar-parent'>
                        <SidebarComponent
                            id="sidebar"
                            ref={Sidebar => this.sidebarobj = Sidebar}
                            type="Over"
                            className="default-sidebar"
                            width="282px"
                            target="#sidebar-gantt"
                            position="Right"
                        >
                            <div className="gantt-title-header">
                                <div className="gantt-title">Project Settings</div>
                                <span className="e-closed" onClick={this.closeSidebar} style={{ cursor: 'pointer' }}></span>
                            </div>

                            <ul className="settings-list" style={{ margin: '15px 15px', paddingLeft: '5px' }}>
                                {/* slider  */}
                                <label htmlFor="rowHeightSlider" className="gantt-labels-style">Row height :</label>
                                <li className="list-fields" style={{ padding: '20px', paddingBottom: '0px', marginBottom: '0px' }}>
                                    <div id="rowHeightSlider">
                                        <SliderComponent
                                            value={30}
                                            min={40}
                                            max={60}
                                            step={5}
                                            changed={this.onChanged}
                                            ticks={this.defaultTicks}
                                            width={180}
                                            tooltip={this.tooltip}
                                            ref={(slider) => { this.defaultObj = slider; }}
                                        />
                                    </div>
                                </li>

                                {/*grid lines  */}
                                <li className="list-fields">
                                    <label htmlFor="showGridLines" className="gantt-labels-style">Show Grid Lines :</label>
                                    <div className="switch" style={{ marginLeft: '20px' }}>
                                        <SwitchComponent
                                            id="showGridLinesSwitch"
                                            className="checked"
                                            change={this.gridLinesChange}
                                        />
                                    </div>
                                </li>
                                {/* event markers */}
                                <li className="list-fields">
                                    <label htmlFor="showGridLines" className="gantt-labels-style">Show event markers :</label>
                                    <div className="switch" style={{ marginLeft: '20px' }}>
                                        <SwitchComponent
                                            id="showGridLinesSwitch"
                                            className="checked"
                                            checked={true}
                                            change={this.showEventMarkers}
                                        />
                                    </div>
                                </li>
                                {/* dependency */}
                                <li className="list-fields">
                                    <label htmlFor="dependencyLines" className="gantt-labels-style">Show dependencies :</label>
                                    <div className="switch" style={{ marginLeft: '20px' }}>
                                        <SwitchComponent
                                            id="dependencyLines"
                                            className="checkeddependency"
                                            checked={true}
                                            change={this.dependencyChange}
                                        />
                                    </div>
                                </li>
                                {/* taskLabelChange */}
                                <li className="list-fields">
                                    <label htmlFor="taskLabelChange" className="gantt-labels-style">Show task labels :</label>
                                    <div className="switch" style={{ marginLeft: '20px' }}>
                                        <SwitchComponent
                                            id="taskLabelChange"
                                            className="checked"
                                            checked={true}
                                            change={this.taskLabelChange}
                                        />
                                    </div>
                                </li>

                                <li className="list-fields section-header">
                                    <label className="scheduling">Scheduling Settings</label>
                                </li>

                                {/* week days */}

                                <li className="list-field stack-container">
                                    <label htmlFor="workDays" className="gantt-labels-style">Working days :</label>
                                    <div style={{ paddingLeft: '10px' }}>
                                        <MultiSelectComponent ref={multiselect => this.multiselectObj = multiselect} id="WorkWeek" style={{ padding: '2px' }} mode="CheckBox" value={this.defaultValue}
                                            dataSource={this.workDays} showDropDownIcon={true} popupHeight='350px' fields={{ text: 'day', value: 'id' }}
                                            select={this.select.bind(this)} removed={this.removed.bind(this)}>
                                            <Inject services={[CheckBoxSelection]}></Inject>
                                        </MultiSelectComponent>
                                    </div>
                                </li>

                                {/* duration unit */}
                                <li className="list-field stack-container">
                                    <label htmlFor="durationUnit" className="gantt-labels-style">Duration unit:</label>
                                    <div style={{ paddingLeft: '10px' }}>
                                        <DropDownListComponent id="games" dataSource={this.durationUnit} fields={this.durationFields} change={this.changeDuraiton} value={this.durationValue} popupHeight="220px" />
                                    </div>
                                </li>

                                {/* unit width */}
                                <li className="list-field stack-container">
                                    <label htmlFor="unitWidth" className="gantt-labels-style">Timeline width:</label>
                                    <div style={{ paddingLeft: '10px' }}>
                                        <NumericTextBoxComponent min={10} value={33} onChange={this.unitChange} />
                                    </div>
                                </li>

                                <li className="list-fields section-header">
                                    <label className="scheduling">View Settings</label>
                                </li>


                                {/* View Type */}

                                <li className="list-field stack-container">
                                    <label htmlFor="viewType" className="gantt-labels-style">View type:</label>
                                    <div style={{ paddingLeft: '10px' }}>
                                        <DropDownListComponent id="viewType" dataSource={this.viewTypeData} placeholder='View Type' fields={this.viewFileds} change={this.typeChange} />
                                    </div>
                                </li>

                                {/* View Mode */}
                                <li className="list-field stack-container">
                                    <label htmlFor="viewMode" className="gantt-labels-style">View mode:</label>
                                    <div style={{ paddingLeft: '10px' }}>
                                        <DropDownListComponent id="viewMode" dataSource={this.viewModeData} placeholder='View' fields={this.modeFields} change={this.modeChange} />
                                    </div>
                                </li>
                            </ul>

                        </SidebarComponent>
                    </div>

                    <div>
                        <div style={{ padding: '16px' }}>
                            <ButtonComponent
                                id='settings-btn'
                                onClick={this.triggerSidebar}
                                className='settings-btn'
                                style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10 }}>
                                <span className='e-settings-icon' style={{ padding: '3px' }}></span>
                                Settings
                            </ButtonComponent>
                        </div>
                        <div id='sidebar-gantt'>
                            <GanttComponent id='Overview' ref={gantt => this.ganttInstance = gantt} dataSource={overviewData}
                                treeColumnIndex={1} allowSelection={true} highlightWeekends={true}
                                projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate} load={this.load.bind(this)} pdfQueryCellInfo={this.pdfQueryCellInfo.bind(this)}
                                taskFields={this.taskFields} timelineSettings={this.timelineSettings} labelSettings={this.labelSettings} splitterSettings={this.splitterSettings}
                                height='500px' gridLines={this.gridLines} allowFiltering={true} allowSorting={true} allowResizing={true} showColumnMenu={true}
                                toolbar={this.toolbarOptions} resourceFields={this.resourceFields} resources={editingResources}>
                                <ColumnsDirective>
                                    <ColumnDirective field='TaskId' headerText='Task Id' width='180' visible={false}></ColumnDirective>
                                    <ColumnDirective field='TaskName' headerText='Product Release' width='250'></ColumnDirective>
                                    <ColumnDirective field='resources' headerText='Assignee' allowSorting={false} width='140' template={this.template}></ColumnDirective>
                                    <ColumnDirective field='Status' headerText='Status' minWidth="100" width="120" template={this.statusTemplate}></ColumnDirective>
                                    <ColumnDirective field='Priority' headerText='Priority' minWidth='80' width='100' template={this.priorityTemplate}></ColumnDirective>
                                    <ColumnDirective field='Work' headerText='Planned Hours' width='120'></ColumnDirective>
                                    <ColumnDirective field='TimeLog' headerText='Work Log' width='120'></ColumnDirective>
                                </ColumnsDirective>
                                <EventMarkersDirective>
                                    <EventMarkerDirective day={this.eventMarkerDay1} label='Q-1 Release' ></EventMarkerDirective>
                                    <EventMarkerDirective day={this.eventMarkerDay2} label='Q-2 Release' ></EventMarkerDirective>
                                    <EventMarkerDirective day={this.eventMarkerDay3} label='Q-3 Release' ></EventMarkerDirective>
                                </EventMarkersDirective>
                                <HolidaysDirective>
                                    <HolidayDirective from='01/01/2024' to='01/01/2024' label='New year Holiday'></HolidayDirective>
                                    <HolidayDirective from='12/25/2023' to='12/26/2023' label='Christmas Holidays'></HolidayDirective>
                                </HolidaysDirective>
                                <Inject services={[Edit, Selection, Toolbar, DayMarkers, ColumnMenu, Filter, Sort, Resize, ExcelExport, PdfExport]} />
                            </GanttComponent>
                        </div>
                    </div>

                    <div style={{ float: 'right', margin: '10px' }}>Source:
                        <a href="https://en.wikipedia.org/wiki/Construction" target='_blank'>https://en.wikipedia.org/</a>
                    </div>
                </div>
                <div id="action-description">
                    <p>This sample shows an overview of the EJ2 Gantt Chart features that visualize the progress of each feature of the product towards its release and make it easier to monitor the scheduling of the dependent items.</p>
                </div>

                <div id="description">
                    <p>This example shows the three-quarter release planning of product features rendered in the EJ2 Gantt chart. It tracks the quarterly release planning of product status, resources, and task scheduling.</p>
                    <p>EJ2 Gantt Chart features such as Sorting, Filtering, Column resizing, Column menu, column template and so on are used in this demo.</p>
                </div>
            </div>
        )
    }
}
