import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, DayMarkers, Inject, Edit, Selection, Toolbar, ColumnsDirective, ColumnDirective, EventMarkersDirective, EventMarkerDirective, HolidaysDirective, HolidayDirective, ColumnMenu, Filter, Sort, Resize } from '@syncfusion/ej2-react-gantt';
import { overviewData, editingResources } from './data';
import { DropDownList } from '@syncfusion/ej2-react-dropdowns';
import './overview.css'
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';

const Overview = () =>  {
    useEffect(() => {
      updateSampleSection();
    }, [])
    let theme: any;
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

    const dataList: { [key: string]: Object }[] = [
        { ID: 'Default', Text: 'Default' },
        { ID: 'Grid', Text: 'Grid' },
        { ID: 'Chart', Text: 'Chart' }
    ];  

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
    const projectStartDate: Date = new Date('12/17/2021');
    const projectEndDate: Date = new Date('10/26/2022');
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
    const eventMarkerDay1: Date = new Date('04/04/2022');
    const eventMarkerDay2: Date = new Date('06/30/2022');
    const eventMarkerDay3: Date = new Date('09/29/2022');

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

    const load = (): void => {
        let themeCollection: any = ['bootstrap5', 'bootstrap', 'bootstrap4', 'fluent', 'fabric', 'fusionnew', 'material3', 'material', 'highcontrast', 'tailwind'];
        let cls: any = document.body.className.split(' ');
        theme = cls.indexOf('bootstrap5') > 0 ? 'bootstrap5' : cls.indexOf('bootstrap') > 0 ? 'bootstrap' : cls.indexOf('tailwind') > 0 ? 'tailwind' :
            cls.indexOf('fluent') > 0 ? 'fluent' : cls.indexOf('fabric') > 0 ? 'fabric' :
                cls.indexOf('material3') > 0 ? 'material3' : cls.indexOf('bootstrap4') > 0 ? 'bootstrap4' : cls.indexOf('material') > 0 ? 'material' :
                    cls.indexOf('fusionnew') > 0 ? 'fusionnew' : cls.indexOf('highcontrast') > 0 ? 'highcontrast' : ''
        let check: any = themeCollection.indexOf(theme);
        if (check >= 0) {
            CurrentTheme = true;
        }
        else {
            CurrentTheme = false;
        }
    };

    const Status = (status): any => {
        switch (status) {
            case "In Progress":
                statusStyleColor = (CurrentTheme) ? "#DFECFF" : "#2D3E57";
                display = 'flex'; padding = '1px 12px'; gap = '10px'; width = '96px'; height = '24px'; borderRadius = '24px'; background = statusStyleColor;
                break;
            case "Open":
                background = "red"; color = "white"; borderRadius = '15px'; padding = '6px';
                break;
            case "On Hold":
                statusStyleColor = (CurrentTheme) ? "#E4E4E7" : "#3C3B43";
                display = 'flex'; padding = '1px 12px'; gap = '10px'; width = '78px';
                height = '24px'; borderRadius = '24px'; background = statusStyleColor;
                break;
            case "Completed":
                statusStyleColor = (CurrentTheme) ? "#DFFFE2" : "#16501C";
                display = 'flex'; padding = '1px 12px'; gap = '10px'; width = '98px'; height = '24px'; borderRadius = '24px'; background = statusStyleColor;
                break;
            case "High":
                statusStyleColor = (CurrentTheme) ? "#FFEBE9" : "#48211D";
                display = 'flex'; padding = '1px 12px'; gap = '10px'; width = '55px'; height = '24px'; borderRadius = '24px'; background = statusStyleColor;
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
                display = 'flex'; padding = '1px 12px'; gap = '10px'; width = '52px'; height = '24px'; borderRadius = '24px'; backgroundPri = priorityStyle;
                break;
            case "Normal":
                priorityStyle = (CurrentTheme) ? "#F5DFFF" : "#4D2F5A";
                display = 'flex'; padding = '1px 12px'; gap = '10px'; width = '73px'; height = '24px'; borderRadius = '24px'; backgroundPri = priorityStyle;
                break;
            case "Critical":
                priorityStyle = (CurrentTheme) ? "#FFEBE9" : "#48211D";
                display = 'flex'; padding = '1px 12px'; gap = '10px'; width = '72px'; height = '24px'; borderRadius = '24px'; backgroundPri = priorityStyle;
                break;
            case "High":
                priorityStyle = (CurrentTheme) ? "#FFEBE9" : "#48211D";
                display = 'flex'; padding = '1px 12px'; gap = '10px'; width = '55px'; height = '24px'; borderRadius = '24px'; backgroundPri = priorityStyle;
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
    const toolbarOptions: any = ['ExpandAll', 'CollapseAll', { type: "Input", align: "Right", tooltipText: "Change View", template: new DropDownList({ dataSource: dataList, width: "85px", placeholder: "View", change: change, fields: { text: 'Text', value: 'ID' } }) }]

    return (
            <div className='control-pane'>
                <div className='control-section'>
                    <GanttComponent id='Overview' dataSource={overviewData}
                        treeColumnIndex={1} allowSelection={true} highlightWeekends={true}
                        projectStartDate={projectStartDate} projectEndDate={projectEndDate} load={load.bind(this)}
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
                            <HolidayDirective from='01/01/2022' to='01/01/2022' label='New year Holiday'></HolidayDirective>
                            <HolidayDirective from='12/25/2021' to='12/26/2021' label='Christmas Holidays'></HolidayDirective>
                        </HolidaysDirective>
                        <Inject services={[Edit, Selection, Toolbar, DayMarkers, ColumnMenu, Filter, Sort, Resize]} />
                    </GanttComponent>
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
