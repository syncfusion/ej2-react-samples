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
import { PdfColor } from '@syncfusion/ej2-pdf-export';

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
    let marginTop: any;
    let marginLeft: any;
    let IconClass: any;
    let border: any;
    let justifyContent: any;
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
        constraintType: 'ConstraintType',
        constraintDate: 'ConstraintDate',
        resourceInfo: 'resource'
    };
    const resourceFields: any = {
        id: 'resourceId',
        name: 'resourceName'
    };
    const splitterSettings: any = {
        columnIndex: 4
    };
    const projectStartDate: Date = new Date('01/25/2025');
    const projectEndDate: Date = new Date('01/30/2026');
    const gridLines: any = 'Both';

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
    const RightLabelTemplate = (props) => {
        if (props.ganttProperties.resourceInfo) {
          let resources = props.ganttProperties.resourceInfo;
          let out = [];
          for (let index = 0; index < resources.length; index++) {
            let src = 'src/gantt/images/' + resources[index].resourceName + '.png';
            let img = (
              <img
                key={`img-${index}`}
                src={src}
                height="30px"
                width ="30px"
                alt={resources[index].resourceName}
              />
            );
            let span = (
              <span
                key={`span-${index}`}
                style={{ marginLeft: '5px', marginRight: '5px' }}
              >
                {props.Assignee}
              </span>
            );
            out.push(img, span);
          }
          return (<div>{out}</div>);
        } else {
          return <div></div>
        }
      };  
  const templateRight: any = RightLabelTemplate; 
    const labelSettings: any = {
        taskLabel: '${Progress}%',
        rightLabel: templateRight.bind(this),    
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
    const eventMarkerDay1: Date = new Date('2025-03-13');
    const eventMarkerDay2: Date = new Date('2025-04-18');
    const eventMarkerDay3: Date = new Date('2025-05-30');
    const eventMarkerDay4: Date = new Date('2025-11-25');

    const statustemplate = (props): any => {
        let sts = Status(props.taskData.Status);
        let stsCon = StatusContent(props.taskData.Status);
        if (props.taskData.Status) {
            return (
                <div className='columnTemplate'>
                    <div style={{
                        "display": `${sts.display}`, "padding": `${sts.padding}`, "gap": `${sts.gap}`, "width": `${sts.width}`, "height": `${sts.height}`,
                        "background": `${sts.background}`, "border": `${sts.border}`, "justifyContent": `${sts.justifyContent}`
                    }} >
                        <span style={{
                            "width": `${stsCon.width}`, "height": `${stsCon.height}`, "fontStyle": `${stsCon.fontStyle}`, "fontWeight": `${stsCon.fontWeight}`, "fontSize": `${stsCon.fontSize}`,
                            "lineHeight": `${stsCon.lineHeight}`, "color": `${stsCon.color}`, "padding": `${stsCon.pad}`, "textAlign": "center"
                        }} >{props.taskData.Status}</span>
                    </div>
                </div>);
        }
    };

    const prioritytemplate = (props): any => {
        let pri = PriorityIconStyle(props.taskData.Priority);
        let priCon = PriorityContent(props.taskData.Priority);
        let priClass=PriorityIcon(props.taskData.Priority);
        if (props.taskData.Priority) {
            return (
                <div className='columnTemplate1' style={{display:'flex'}}>
                    <span className={priClass} style={{
                        "color": `${pri.backgroundPri}`, "marginTop": `${pri.marginTop}`
                    }} ></span>
                        <span style={{
                            "width": `${priCon.width}`, "height": `${priCon.height}`, "fontStyle": `${priCon.fontStyle}`,  "fontSize": `${priCon.fontSize}`,
                            "lineHeight": `${priCon.lineHeight}`, "color": `${priCon.color}`, "textAlign": "center", "marginLeft": `${priCon.marginLeft}`
                        }}>{props.taskData.Priority}</span>
                </div>);
        }
    };
    
    const columnTemplate = (props): any => {
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
                    <div className='columnTemplate' style={{display: 'flex', alignItems: 'center',gap: '8px',height: '100%'}}>
                        <div><img src={src} height='25px' width='25px' /></div>
                        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', lineHeight: '16px'}}>
                            <span style={{  fontSize:'12px' }}>{props.Assignee}</span>
                            <span style={{fontSize: '9px', textAlign:'left'}} >{props.taskData.Department}</span>
                        </div>
                    </div>);
            }
        } else {
            return <div></div>
        }
    }

    const load = (): void => {
        let themeCollection: any = ['bootstrap5', 'bootstrap', 'bootstrap4', 'fluent', 'fabric', 'fusionnew', 'material3', 'material', 'highcontrast', 'tailwind', 'fluent2', 'tailwind3', 'bootstrap5_3'];
        let theme = document.body.className.split(' ').find(function(cls) { return themeCollection.includes(cls); }) || '';
        CurrentTheme = theme ? true : false;
    };

    const pdfQueryCellInfo = (args): void => {
        if(args.data.ganttProperties.resourceNames){
            if (args.column.headerText === 'Assignee' && args.data.taskData.resourcesImage) {
                args.image = { height: 30, width: 30, base64: args.data.taskData.resourcesImage};
                args.value = `${args.data.Assignee}\n${args.data.taskData.Department}`; 
            }
        };

        // Set font color for Status or Priority columns
        if (args.column.field === 'Status' || args.column.field === 'Priority') {
            const style = args.column.field === 'Status' ?StatusContent(args.value) : PriorityContent(args.value);// args.value is the cell's value (e.g., "Completed" for Status, "High" for Priority)
            const rgbMatch = style.color.match(/rgb\(\d+,\s*\d+,\s*\d+\)/);
            if (rgbMatch) {
                const rgbValues = rgbMatch[0].slice(4, -1).split(', ').map(Number);
                args.style.fontColor = new PdfColor(rgbValues[0], rgbValues[1], rgbValues[2]);
            }   
        }
    };

    const pdfQueryTaskbarInfo=(args: any): void=>{
        if(ganttInstance.current.labelSettings.rightLabel && args.data.taskData.resourcesImage)
        {
            args.labelSettings.rightLabel.image= [{base64: args.data.taskData.resourcesImage, height: 25, width: 25}];
            args.labelSettings.rightLabel.value=args.data.ganttProperties.resourceNames;
        }
    };

    const Status = (status): any => {
        switch (status) {
            case "In Progress":
                statusStyleColor = (CurrentTheme) ? "#006AA6" : "#2D3E57";
                display = 'flex'; padding = '2px 10px'; gap = '10px'; width = '96px'; height = '24px'; border = `solid 1px ${statusStyleColor}`;
                break;
            case "Open":
                display= 'flex'; padding='0px' ;justifyContent='center'; gap= '10px'; width= '96px'; height= '24px'; border = 'solid 1px red';
                break;
            case "On Hold":
                statusStyleColor = (CurrentTheme) ? "#766B7C" : "#CDCBD7";
                display = 'flex'; justifyContent = 'center'; gap= '10px'; width= '96px'; height = '24px'; border = `solid 1px ${statusStyleColor}`;
                break;
            case "Completed":
                statusStyleColor = (CurrentTheme) ? "#00A653" : "#92FFC8";
                display = 'flex'; padding = '2px 10px'; gap = '10px'; width = '96px'; height = '24px'; border = `solid 1px ${statusStyleColor}`;
                break;
        }
        return { display: display, padding: padding, gap: gap, width: width, height: height, border: border, color: color, justifyContent: justifyContent };
    };

    const StatusContent = (status): any =>{
        switch (status) {
            case "In Progress":
                statusContentstyleColor = (CurrentTheme) ? "rgb(0, 106, 166)" : "rgb(52, 182, 255)";
                width = "72px"; height = "22px"; fontStyle = 'normal'; fontWeight = '400'; fontSize = '14px'; lineHeight = '20px'; textAlign = 'center'; color = statusContentstyleColor;
                break;
            case "Open":
                width = "54px"; height = "22px"; fontStyle = 'normal'; fontWeight = '400'; fontSize = '14px'; lineHeight = '22px'; textAlign = 'center'; color = 'rgb(255, 0, 0)';
                break;
            case "On Hold":
                statusContentstyleColor = (CurrentTheme) ? "rgb(118, 107, 124)" : "rgb(205, 203, 215)"
                width = "54px"; height = "22px"; fontStyle = 'normal'; fontWeight = '400'; fontSize = '14px'; lineHeight = '20px'; textAlign = 'center'; color = statusContentstyleColor;
                break;
            case "Completed":
                statusContentstyleColor = (CurrentTheme) ? "rgb(0, 166, 83)" : "rgb(146, 255, 200)";
                width = "74px"; height = "22px"; fontStyle = 'normal'; fontWeight = '400'; fontSize = '14px'; lineHeight = '20px'; textAlign = 'center'; color = statusContentstyleColor;
                break;
            case "High":
                statusContentstyleColor = (CurrentTheme) ? "rgb(243, 86, 32)" : "rgb(255, 181, 184)";
                width = "31px"; height = "22px"; fontStyle = 'normal'; fontWeight = '400'; fontSize = '14px'; lineHeight = '20px'; textAlign = 'center'; color = statusContentstyleColor;
                break;
        }
        return {
            width: width, height: height, fontStyle: fontStyle, fontWeight: fontWeight, fontSize: fontSize, lineHeight: lineHeight, textAlign: textAlign, color: color,
            backgroundColor: backgroundColor, pad: pad
        };
    };

    const  PriorityIconStyle = (priority): any => {
        switch (priority) {
            case "Low":
                priorityStyle = (CurrentTheme) ? "#00A653" : "#FDFF88";
                marginTop = '2px  !important'; backgroundPri = priorityStyle;
                break;
            case "Normal":
                priorityStyle = (CurrentTheme) ? "#7100A6" : "#E3A9FF";
                marginTop = '2px  !important'; backgroundPri = priorityStyle;
                break;
            case "Critical":
                priorityStyle = (CurrentTheme) ? "#FF3740" : "#FFB5B8";
                marginTop = '2px  !important'; backgroundPri = priorityStyle;
                break;
            case "High":
                priorityStyle = (CurrentTheme) ? "#f35620" : "#FFB5B8";
                marginTop = '2px  !important'; backgroundPri = priorityStyle;
                break;
        }
        return { marrginTop: marginTop, backgroundPri: backgroundPri };
    };

    const PriorityContent = (priority): any => {
        switch (priority) {
            case "Low":
                priorityContentStyle = (CurrentTheme) ? "rgb(0, 166, 83)" : "rgb(253, 255, 136)";
                width = "28px"; height = "22px"; fontStyle = 'normal'; marginLeft ='3px'; fontSize = '14px'; lineHeight = '20px'; textAlign = 'center'; color = priorityContentStyle;
                break;
            case "Normal":
                priorityContentStyle = (CurrentTheme) ? "rgb(113, 0, 166)" : "#rgb(227, 169, 255)";
                width = "28px"; height = "22px"; fontStyle = 'normal'; marginLeft ='3px'; fontSize = '14px'; lineHeight = '20px'; textAlign = 'center'; color = priorityContentStyle;
                break;
            case "Critical":
                priorityContentStyle = (CurrentTheme) ? "rgb(255, 55, 64)" : "rgb(255, 181, 184)";
                width = "48px"; height = "22px"; fontStyle = 'normal'; marginLeft = '3px'; fontSize = '14px'; lineHeight = '20px'; textAlign = 'center'; color = priorityContentStyle;
                break;
            case "High":
                priorityContentStyle = (CurrentTheme) ?  "rgb(235, 99, 67)" : "rgb(255, 181, 184)";
                width = "31px"; height = "22px"; fontStyle = 'normal'; marginLeft = '3px'; fontSize = '14px'; lineHeight = '20px'; textAlign = 'center'; color = priorityContentStyle;
                break;
        }
        return {
            width: width, height: height, fontStyle: fontStyle, marginLeft: marginLeft, fontSize: fontSize, lineHeight: lineHeight, textAlign: textAlign, color: color
        };
    };

    const PriorityIcon =(priority):any=>{
        switch (priority) {
            case "Low":
                IconClass = "e-icons e-arrow-down e-icon-style";
                break;
            case "Normal":
                IconClass = "e-icons e-arrow-right e-icon-style";
                break;
            case "Critical":
                IconClass = "e-icons e-arrow-up e-icon-style";
                break;
            case "High":
                IconClass = "e-icons e-arrow-up e-icon-style";
                break;
        }
        return IconClass;
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
            gantt.eventMarkers = "";
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
            gantt.labelSettings.rightLabel = "";
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
    const viewTypeValue = 'ProjectView'
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
                                <DropDownListComponent id="viewType" dataSource={viewTypeData} placeholder='View Type' value={viewTypeValue} fields={viewFileds} change={typeChange} />
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
                            treeColumnIndex={0} allowSelection={true} enableWBS={true} enableAutoWbsUpdate={true} enableHover={true} highlightWeekends={true} allowExcelExport={true} allowPdfExport={true} 
                            projectStartDate={projectStartDate} projectEndDate={projectEndDate} load={load.bind(this)} pdfQueryCellInfo={pdfQueryCellInfo.bind(this)} toolbarClick={toolbarClick.bind(this)}
                            taskFields={taskFields} timelineSettings={timelineSettings} labelSettings={labelSettings} splitterSettings={splitterSettings}
                            height='650px' taskbarHeight={25} rowHeight={46} gridLines={gridLines}  allowFiltering={true} showColumnMenu={true} allowSorting={true} allowResizing={true}
                            toolbar={toolbarOptions} resourceFields={resourceFields} resources={editingResources} pdfQueryTaskbarInfo={pdfQueryTaskbarInfo.bind(this)}>
                            <ColumnsDirective>
                                <ColumnDirective field='WBSCode' headerText='WBS ID' width='120'></ColumnDirective>
                                <ColumnDirective field='TaskName' headerText='Product Release' width='250'></ColumnDirective>
                                <ColumnDirective field='Assignee' headerText='Assignee' allowSorting={false} width='179' template={template}></ColumnDirective>
                                <ColumnDirective field='Status' headerText='Status' minWidth="100" width="120" template={statusTemplate}></ColumnDirective>
                                <ColumnDirective field='Priority' headerText='Priority' minWidth='80' width='150' template={priorityTemplate}></ColumnDirective>
                                <ColumnDirective field='WBSPredecessor' headerText='WBS Predecessor' width='190' />
                                <ColumnDirective field='ConstraintType' headerText='Constraint Type' width='200' />
                                <ColumnDirective field='ConstraintDate' headerText='Constraint Date' width='200' />
                                <ColumnDirective field='Progress' headerText='Completion(%)' width='200' />
                                <ColumnDirective field='TimeLog' headerText='Work Log' width='130' />
                            </ColumnsDirective>
                            <EventMarkersDirective>
                                <EventMarkerDirective day={eventMarkerDay1} label='Project Initiative' ></EventMarkerDirective>
                                <EventMarkerDirective day={eventMarkerDay2} label='Requirement Gathering' ></EventMarkerDirective>
                                <EventMarkerDirective day={eventMarkerDay3} label='Design Phase' ></EventMarkerDirective>
                                <EventMarkerDirective day={eventMarkerDay4} label='Deployment' ></EventMarkerDirective>
                            </EventMarkersDirective>
                            <HolidaysDirective>
                                <HolidayDirective from={new Date('01/01/2025')} to={new Date('01/01/2025')} label='New year Holiday'></HolidayDirective>
                                <HolidayDirective from={new Date('12/25/2024')} to={new Date('12/26/2024')} label='Christmas Holidays'></HolidayDirective>
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
                    <p>This sample provides an overview of the React Gantt Chart, showcasing its key features through an e-commerce platform redesign project 
                        timeline. It visualizes task hierarchies, dependencies, milestones, and resource allocations, enabling efficient project tracking from planning to deployment.
                    </p>
                </div>

                <div id="description">
                    <p>This demo presents an e-commerce platform redesign project, demonstrating key features such as task organization, customizable timeline views, 
                        resource management, and interactive controls. Users can <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/sorting">sort</a> and <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/filtering/filtering">filter tasks</a>, <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/columns/column-resizing"> resize</a> and <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/columns/column-reordering">reorder columns</a>, track progress with <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/baseline"> baselines</a>, 
                        and highlight key dates with <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/event-markers">event markers</a> and <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/holidays"> holidays</a>. The <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/tool-bar"> toolbar </a> offers intuitive options to add, edit, delete, search, and expand or 
                        collapse tasks. Additionally, users can configure <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#workweek"> working days</a>, <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/scheduling-tasks#weekendnon-working-days"> highlight weekends</a>, set <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#projectstartdate"> project date ranges</a>.
                    </p>
                <br/>
                <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/getting-started#adding-gantt-component">documentation section</a>.</p>
                </div>
            </div>
        )
}

export default Overview;
