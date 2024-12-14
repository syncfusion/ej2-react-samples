import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, DayMarkers, Inject, Edit, Selection, Toolbar, ColumnsDirective, ColumnDirective, EventMarkersDirective, EventMarkerDirective, HolidaysDirective, HolidayDirective, ColumnMenu, Filter, Sort, Resize, ExcelExport, PdfExport } from '@syncfusion/ej2-react-gantt';
import { overviewData, editingResources } from './data';
import './overview.css'
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { DropDownList } from '@syncfusion/ej2-react-dropdowns';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { SidebarComponent } from '@syncfusion/ej2-react-navigations';
import { SwitchComponent } from '@syncfusion/ej2-react-buttons';
import { MultiSelectComponent, CheckBoxSelection} from '@syncfusion/ej2-react-dropdowns';
import { useRef, useState } from 'react';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { extend } from '@syncfusion/ej2-base';
import { SliderComponent } from '@syncfusion/ej2-react-inputs';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';

const Overview = () =>  {
    useEffect(() => {
      updateSampleSection();
    }, [])
    let theme: any;
    let ganttInstance = useRef<GanttComponent>(null);
    let CurrentTheme: any;
    let statusStyleColor: any;
    let priorityStyle: any;
    let priorityContentStyle: any;
    let statusContentstyleColor: any;
    let display: any;
    let padding: any;
    let gap: any;
    let width: any;
    let height: any;
    let background: any;
    let borderRadius: any;
    let color: any;
    let fontStyle: any;
    let fontWeight: any;
    let fontSize: any;
    let lineHeight: any;
    let textAlign: any;
    let backgroundColor: any;
    let backgroundPri: any;
    let pad: any;

    const taskFields: any = {
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
    const resourceFields: any = {
        id: 'resourceId',
        name: 'resourceName'
    };
    const splitterSettings: any = {
        position: "57%"
    };
    const projectStartDate: Date = new Date('12/17/2023');
    const projectEndDate: Date = new Date('10/26/2024');
    const gridLines: any = 'Vertical';

    const  change =(args: any ): any =>{
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
    const timelineSettings: any = {
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
    const labelSettings: any = {
        taskLabel: '${Progress}%',
        rightLabel: 'Assignee'
    };
    const toolbarClick = (args: ClickEventArgs): void => {
        if (args.item.id === "Overview_excelexport") {
          ganttInstance.current.excelExport();
        }
        else if (args.item.id === "Overview_csvexport") {
          ganttInstance.current.csvExport();
        }
        else if (args.item.id === "Overview_pdfexport") {
          ganttInstance.current.pdfExport();
        }
      }
    const eventMarkerDay1: Date = new Date('04/04/2024');
    const eventMarkerDay2: Date = new Date('06/30/2024');
    const eventMarkerDay3: Date = new Date('09/29/2024');

    const statustemplate = (props): any => {
        let sts = Status(props.taskData.Status);
        let stsCon = StatusContent(props.taskData.Status);
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

    const prioritytemplate = (props): any => {
        let pri = Priority(props.taskData.Priority);
        let priCon = PriorityContent(props.taskData.Priority);
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

    const columnTemplate = (props: { ganttProperties: { resourceNames: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | null | undefined; }; }): any => {
        var src = 'src/gantt/images/' + props.ganttProperties.resourceNames + '.png';
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

    const load = (): void => {
        let themeCollection: any = ['bootstrap5', 'bootstrap', 'bootstrap4', 'fluent', 'fabric', 'fusionnew', 'material3', 'material', 'highcontrast', 'tailwind', 'fluent2', 'tailwind3', 'bootstrap5.3'];
        let cls: any = document.body.className.split(' ');
        theme = cls.indexOf('bootstrap5') > 0 ? 'bootstrap5' : cls.indexOf('bootstrap') > 0 ? 'bootstrap' : cls.indexOf('tailwind') > 0 ? 'tailwind' :
            cls.indexOf('fluent') > 0 ? 'fluent' : cls.indexOf('fabric') > 0 ? 'fabric' :
                cls.indexOf('material3') > 0 ? 'material3' : cls.indexOf('bootstrap4') > 0 ? 'bootstrap4' : cls.indexOf('material') > 0 ? 'material' :
                    cls.indexOf('fusionnew') > 0 ? 'fusionnew' : cls.indexOf('highcontrast') > 0 ? 'highcontrast' : cls.indexOf('bootstrap5.3') > 0 ? 'bootstrap5.3' :
                        cls.indexOf('fluent2') > 0 ? 'fluent2' : cls.indexOf('tailwind3') > 0 ? 'tailwind3' : '';
        let check: any = themeCollection.indexOf(theme);
        if (check >= 0) {
            CurrentTheme = true;
        }
        else {
            CurrentTheme = false;
        }
    };

    const pdfQueryCellInfo = (args): void => {
        if (args.column.headerText === 'Assignee' && args.data.taskData.resourcesImage) {
            {
                args.image = { height:25,width:25, base64: args.data.taskData.resourcesImage };
            }
        }
    };

    const Status = (status): any => {
        switch (status) {
            case "In Progress":
                statusStyleColor = (CurrentTheme) ? "#DFECFF" : "#2D3E57";
                display = 'flex'; padding = '0px 12px'; gap = '10px'; width = '96px'; height = '24px'; borderRadius = '24px'; background = statusStyleColor;
                break;
            case "Open":
                background = "red"; color = "white"; borderRadius = '15px'; padding = '6px';
                break;
            case "On Hold":
                statusStyleColor = (CurrentTheme) ? "#E4E4E7" : "#3C3B43";
                display = 'flex'; padding = '0px 12px'; gap = '10px'; width = '78px';
                height = '24px'; borderRadius = '24px'; background = statusStyleColor;
                break;
            case "Completed":
                statusStyleColor = (CurrentTheme) ? "#DFFFE2" : "#16501C";
                display = 'flex'; padding = '0px 12px'; gap = '10px'; width = '98px'; height = '24px'; borderRadius = '24px'; background = statusStyleColor;
                break;
            case "High":
                statusStyleColor = (CurrentTheme) ? "#FFEBE9" : "#48211D";
                display = 'flex'; padding = '0px 12px'; gap = '10px'; width = '55px'; height = '24px'; borderRadius = '24px'; background = statusStyleColor;
                break;
        }
        return { display: display, padding: padding, gap: gap, width: width, height: height, borderRadius: borderRadius, background: background, color: color };
    };

    const StatusContent = (status): any =>{
        switch (status) {
            case "In Progress":
                statusContentstyleColor = (CurrentTheme) ? "#006AA6" : "#34B6FF";
                width = "72px"; height = "22px"; fontStyle = 'normal'; fontWeight = '500'; fontSize = '14px'; lineHeight = '20px'; textAlign = 'center'; color = statusContentstyleColor;
                break;
            case "Open":
                backgroundColor = 'red'; color = 'white'; borderRadius = '15px'; pad = '6px'
                break;
            case "On Hold":
                statusContentstyleColor = (CurrentTheme) ? "#766B7C" : "#CDCBD7";
                width = "54px"; height = "22px"; fontStyle = 'normal'; fontWeight = '500'; fontSize = '14px'; lineHeight = '20px'; textAlign = 'center'; color = statusContentstyleColor;
                break;
            case "Completed":
                statusContentstyleColor = (CurrentTheme) ? "#00A653" : "#92FFC8";
                width = "74px"; height = "22px"; fontStyle = 'normal'; fontWeight = '500'; fontSize = '14px'; lineHeight = '20px'; textAlign = 'center'; color = statusContentstyleColor;
                break;
            case "High":
                statusContentstyleColor = (CurrentTheme) ? "#FF3740" : "#FFB5B8";
                width = "31px"; height = "22px"; fontStyle = 'normal'; fontWeight = '500'; fontSize = '14px'; lineHeight = '20px'; textAlign = 'center'; color = statusContentstyleColor;
                break;
        }
        return {
            width: width, height: height, fontStyle: fontStyle, fontWeight: fontWeight, fontSize: fontSize, lineHeight: lineHeight, textAlign: textAlign, color: color,
            backgroundColor: backgroundColor, borderRadius: borderRadius, pad: pad
        };
    };

    const  Priority = (priority): any => {
        switch (priority) {
            case "Low":
                priorityStyle = (CurrentTheme) ? "#FFF6D1" : "#473F1E";
                display = 'flex'; padding = '0px 12px'; gap = '10px'; width = '52px'; height = '24px'; borderRadius = '24px'; backgroundPri = priorityStyle;
                break;
            case "Normal":
                priorityStyle = (CurrentTheme) ? "#F5DFFF" : "#4D2F5A";
                display = 'flex'; padding = '0px 12px'; gap = '10px'; width = '73px'; height = '24px'; borderRadius = '24px'; backgroundPri = priorityStyle;
                break;
            case "Critical":
                priorityStyle = (CurrentTheme) ? "#FFEBE9" : "#48211D";
                display = 'flex'; padding = '0px 12px'; gap = '10px'; width = '72px'; height = '24px'; borderRadius = '24px'; backgroundPri = priorityStyle;
                break;
            case "High":
                priorityStyle = (CurrentTheme) ? "#FFEBE9" : "#48211D";
                display = 'flex'; padding = '0px 12px'; gap = '10px'; width = '55px'; height = '24px'; borderRadius = '24px'; backgroundPri = priorityStyle;
                break;
        }
        return { display: display, padding: padding, gap: gap, width: width, height: height, borderRadius: borderRadius, backgroundPri: backgroundPri };
    };

    const PriorityContent = (priority): any => {
        switch (priority) {
            case "Low":
                priorityContentStyle = (CurrentTheme) ? "#70722B" : "#FDFF88";
                width = "28px"; height = "22px"; fontStyle = 'normal'; fontWeight = '500'; fontSize = '14px'; lineHeight = '20px'; textAlign = 'center'; color = priorityContentStyle;
                break;
            case "Normal":
                priorityContentStyle = (CurrentTheme) ? "#7100A6" : "#E3A9FF";
                width = "49px"; height = "22px"; fontStyle = 'normal'; fontWeight = '500'; fontSize = '14px'; lineHeight = '20px'; textAlign = 'center'; color = priorityContentStyle;
                break;
            case "Critical":
                priorityContentStyle = (CurrentTheme) ? "#FF3740" : "#FFB5B8";
                width = "48px"; height = "22px"; fontStyle = 'normal'; fontWeight = '500'; fontSize = '14px'; lineHeight = '20px'; textAlign = 'center'; color = priorityContentStyle;
                break;
            case "High":
                priorityContentStyle = (CurrentTheme) ? "#FF3740" : "#FFB5B8";
                width = "31px"; height = "22px"; fontStyle = 'normal'; fontWeight = '500'; fontSize = '14px'; lineHeight = '20px'; textAlign = 'center'; color = priorityContentStyle;
                break;
        }
        return {
            width: width, height: height, fontStyle: fontStyle, fontWeight: fontWeight, fontSize: fontSize, lineHeight: lineHeight, textAlign: textAlign, color: color
        };
    };
    const template: any = columnTemplate.bind(this);
    const statusTemplate: any = statustemplate.bind(this);
    const priorityTemplate: any = prioritytemplate.bind(this);
    const toolbarOptions: any = ['ExpandAll', 'CollapseAll', 'ZoomIn', 'ZoomOut', 'ZoomToFit', 'ExcelExport', 'CsvExport', 'PdfExport']

    // side bar rendering
    const [sidebarToggle, setSidebarToggle] = useState(false);
    const [isSideBar, setIsSideBar] = useState(false);
    let ganttRef = useRef(null);
    let sidebarRef = useRef(null);

    const triggerSidebar = () => {
        setSidebarToggle(prev => !prev);
        setIsSideBar(true);
        if (sidebarRef.current) {
            sidebarRef.current.isOpen = true;
        }
    };

    const closeSidebar = () => {
        setSidebarToggle(false); // Close sidebar
        if (sidebarRef.current) {
            sidebarRef.current.hide();
        }
    }; 

    //   range slider rendering
    let defaultObj: any;
    let defaultTicks = { placement: 'Before' as any, largeStep: 10, smallStep: 10, showSmallTicks: true };
    const [tooltip] = useState<object>({
        placement: 'Before',
        isVisible: true,
        showOn: 'Focus'
    });
    function onChanged(args: any) {
        const gantt: any = (document.getElementsByClassName('e-gantt')[0] as any).ej2_instances[0];
        gantt.rowHeight = args.value;
    }

    // Grid lines
    function gridLinesChange(args: any) {
        const gantt: any = (document.getElementsByClassName('e-gantt')[0] as any).ej2_instances[0];
        if (args.checked) {
            gantt.gridLines = 'Both';
        } else {
            gantt.gridLines = 'Vertical';
        }
    }

    // Show Event marekrs
    let tempEvents: any;
    function showEventMarkers(args: any) {
        const gantt: any = (document.getElementsByClassName('e-gantt')[0] as any).ej2_instances[0];
        if (args.checked) {
            gantt.eventMarkers = tempEvents;
        } else {
            tempEvents = gantt.eventMarkers;
            gantt.eventMarkers = null;
        }
    }

    // Show depenency lines
    function dependencyChange(args: any) {
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
    let tempLabels: any;
    function taskLabelChange(args: any) {
        const gantt: any = (document.getElementsByClassName('e-gantt')[0] as any).ej2_instances[0];
        if (args.checked) {
            gantt.labelSettings.rightLabel = tempLabels;
        } else {
            tempLabels = gantt.labelSettings.rightLabel;
            gantt.labelSettings.rightLabel = null;
        }
    }

    // Working days
    let multiselectObj = useRef<MultiSelectComponent>(null);
    let workDays: { [key: string]: Object }[] = [
        { id: 'Sunday', day: 'Sunday' },
        { id: 'Monday', day: 'Monday' },
        { id: 'Tuesday', day: 'Tuesday' },
        { id: 'Wednesday', day: 'Wednesday' },
        { id: 'Thursday', day: 'Thursday' },
        { id: 'Friday', day: 'Friday' },
        { id: 'Saturday', day: 'Saturday' },
    ];
    const defaultValue: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const select = (args: any): void => {
        if (multiselectObj && multiselectObj.current && multiselectObj.current.value && ganttInstance.current) {
            let workingDays: any = extend([], multiselectObj.current.value, [], true);
            workingDays.push(args.itemData.day);
            ganttInstance.current.workWeek = workingDays;
        }
    };
    const removed = (args: any): void => {
        if (ganttInstance.current && multiselectObj.current) {
            let index = ganttInstance.current.workWeek.indexOf(args.itemData.day);
            if (index !== -1) {
                ganttInstance.current.workWeek = (multiselectObj.current.value as string[]);
            }
        }
    };

    //   Duration Unit
    let durationUnit: { [key: string]: Object }[] = [
        { id: "Minute", Text: "Minute" },
        { id: "Hour", Text: "Hour" },
        { id: "Day", Text: "Day" }
    ];
    let durationFields: any = { text: 'Text', value: 'id' };
    let durationValue = 'Day';
    function changeDuraiton(args: any) {
        const gantt: any = (document.getElementsByClassName('e-gantt')[0] as any).ej2_instances[0];
        gantt.durationUnit = args.value;
    }

    // Timeline unit width
    function unitChange(args: any) {
        const gantt: any = (document.getElementsByClassName('e-gantt')[0] as any).ej2_instances[0];
        var width = args.value;
        gantt.timelineSettings.timelineUnitSize = width;
    }

    // view Type change
    const viewTypeData: any = [
        { id: "ResourceView", Text: "Resource View" },
        { id: "ProjectView", Text: "Project View" }
    ];
    const viewFileds: any = { text: 'Text', value: 'id' };
    function typeChange(args: any) {
        const gantt: any = (document.getElementsByClassName('e-gantt')[0] as any).ej2_instances[0];
        gantt.viewType = args.value;
        if ((document.getElementsByClassName('checkeddependency')[0] as any).hidden !== true) {
            (document.querySelectorAll('.e-switch')[2] as any).ej2_instances[0].checked = true;
        }
    }


    // View Mode
    const viewModeData: any = [
        { ID: "Default", Text: "Default" },
        { ID: "Grid", Text: "Grid" },
        { ID: "Chart", Text: "Chart" },
    ];
    const modeFields: any = { value: 'ID', text: 'Text' };
    function modeChange(args: any) {
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


    return (
        <div>
            <div className='control-section'>
                <div id='gantt-sidebar-parent'>
                {isSideBar && (<SidebarComponent
                    id="sidebar"
                    ref={sidebarRef}
                    type="Over"
                    className="default-sidebar"
                    width="282px"
                    target="#sidebar-gantt"
                    position="Right"
                    isOpen={sidebarToggle}
                >
                    <div className="gantt-title-header">
                        <div className="gantt-title">Project Settings</div>
                        <span className="e-closed" onClick={closeSidebar} style={{ cursor: 'pointer' }}></span>
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
                                    changed={onChanged}
                                    ticks={defaultTicks}
                                    width={180}
                                    tooltip={tooltip}
                                    ref={(slider) => { defaultObj = slider; }}
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
                                    change={gridLinesChange}
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
                                    change={showEventMarkers}
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
                                    change={dependencyChange}
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
                                    change={taskLabelChange}
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
                                <MultiSelectComponent ref={multiselectObj} id="WorkWeek" style={{ padding: '2px' }} mode="CheckBox" value={defaultValue}
                                    dataSource={workDays} showDropDownIcon={true} popupHeight='350px' width={200} fields={{ text: 'day', value: 'id' }}
                                    select={select.bind(this)} removed={removed.bind(this)}>
                                    <Inject services={[CheckBoxSelection]}></Inject>
                                </MultiSelectComponent>
                            </div>
                        </li>

                        {/* duration unit */}
                        <li className="list-field stack-container">
                            <label htmlFor="durationUnit" className="gantt-labels-style">Duration unit:</label>
                            <div style={{ paddingLeft: '10px' }}>
                                <DropDownListComponent id="games" dataSource={durationUnit} fields={durationFields} change={changeDuraiton} value={durationValue} popupHeight="220px" />
                            </div>
                        </li>

                        {/* unit width */}
                        <li className="list-field stack-container">
                            <label htmlFor="unitWidth" className="gantt-labels-style">Timeline width:</label>
                            <div style={{ paddingLeft: '10px' }}>
                                <NumericTextBoxComponent min={10} value={33} onChange={unitChange} />
                            </div>
                        </li>

                        <li className="list-fields section-header">
                            <label className="scheduling">View Settings</label>
                        </li>


                        {/* View Type */}

                        <li className="list-field stack-container">
                            <label htmlFor="viewType" className="gantt-labels-style">View type:</label>
                            <div style={{ paddingLeft: '10px' }}>
                                <DropDownListComponent id="viewType" dataSource={viewTypeData} placeholder='View Type' fields={viewFileds} change={typeChange} />
                            </div>
                        </li>

                        {/* View Mode */}
                        <li className="list-field stack-container">
                            <label htmlFor="viewMode" className="gantt-labels-style">View mode:</label>
                            <div style={{ paddingLeft: '10px' }}>
                                <DropDownListComponent id="viewMode" dataSource={viewModeData} placeholder='View' fields={modeFields} change={modeChange} />
                            </div>
                        </li>
                    </ul>

                    </SidebarComponent>)}
                </div>

                <div>
                    <div style={{ padding: '16px' }}>
                        <ButtonComponent
                            id='settings-btn'
                            onClick={triggerSidebar}
                            className='settings-btn'
                            style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10 }}>
                            <span className='e-settings-icon' style={{ padding: '3px' }}></span>
                            Settings
                        </ButtonComponent>
                    </div>
                    <div id='sidebar-gantt'>
                        <GanttComponent id='Overview' ref={ganttInstance} dataSource={overviewData}
                            treeColumnIndex={1} allowSelection={true} highlightWeekends={true} allowExcelExport={true} allowPdfExport={true} 
                            projectStartDate={projectStartDate} projectEndDate={projectEndDate} load={load.bind(this)} pdfQueryCellInfo={pdfQueryCellInfo.bind(this)} toolbarClick={toolbarClick.bind(this)}
                            taskFields={taskFields} timelineSettings={timelineSettings} labelSettings={labelSettings} splitterSettings={splitterSettings}
                            height='500px' gridLines={gridLines}  allowFiltering={true} showColumnMenu={true} allowSorting={true} allowResizing={true}
                            toolbar={toolbarOptions} resourceFields={resourceFields} resources={editingResources}>
                            <ColumnsDirective>
                                <ColumnDirective field='TaskId' headerText='Task Id' width='180' visible={false}></ColumnDirective>
                                <ColumnDirective field='TaskName' headerText='Product Release' width='250'></ColumnDirective>
                                <ColumnDirective field='resources' headerText='Assignee' allowSorting={false} width='140' template={template}></ColumnDirective>
                                <ColumnDirective field='Status' headerText='Status' minWidth="100" width="120" template={statusTemplate}></ColumnDirective>
                                <ColumnDirective field='Priority' headerText='Priority' minWidth='80' width='100' template={priorityTemplate}></ColumnDirective>
                                <ColumnDirective field='Work' headerText='Planned Hours' width='120'></ColumnDirective>
                                <ColumnDirective field='TimeLog' headerText='Work Log' width='120'></ColumnDirective>
                            </ColumnsDirective>
                            <EventMarkersDirective>
                                <EventMarkerDirective day={eventMarkerDay1} label='Q-1 Release' ></EventMarkerDirective>
                                <EventMarkerDirective day={eventMarkerDay2} label='Q-2 Release' ></EventMarkerDirective>
                                <EventMarkerDirective day={eventMarkerDay3} label='Q-3 Release' ></EventMarkerDirective>
                            </EventMarkersDirective>
                            <HolidaysDirective>
                                <HolidayDirective from={new Date('01/01/2024')} to={new Date('01/01/2024')} label='New year Holiday'></HolidayDirective>
                                <HolidayDirective from={new Date('12/25/2023')} to={new Date('12/26/2023')} label='Christmas Holidays'></HolidayDirective>
                            </HolidaysDirective>
                            <Inject services={[Edit, Selection, Toolbar, DayMarkers, ColumnMenu, Filter, Sort, Resize , ExcelExport, PdfExport]} />
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

export default Overview;
