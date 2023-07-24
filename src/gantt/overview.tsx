import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, DayMarkers, Inject, Edit, Selection, Toolbar, ColumnsDirective, ColumnDirective, EventMarkersDirective, EventMarkerDirective, HolidaysDirective, HolidayDirective, ColumnMenu, Sort, Filter, Resize } from '@syncfusion/ej2-react-gantt';
import { overviewData, editingResources } from './data';
import { SampleBase } from '../common/sample-base';
import { DropDownList } from '@syncfusion/ej2-react-dropdowns';
import './overview.css'

export class Overview extends SampleBase<{}, {}> {
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
    public projectStartDate: Date = new Date('12/17/2021');
    public projectEndDate: Date = new Date('10/26/2022');
    public gridLines: any = 'Vertical';
    public toolbarOptions: any = ['ExpandAll', 'CollapseAll', { type: "Input", align: "Right", tooltipText: "Change View", template: new DropDownList({ dataSource: this.dataList, width: "85px", placeholder: "View", change: this.change, fields: { text: 'Text', value: 'ID' } }) }]

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
    public eventMarkerDay1: Date = new Date('04/04/2022');
    public eventMarkerDay2: Date = new Date('06/30/2022');
    public eventMarkerDay3: Date = new Date('09/29/2022');

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

    public Status(status: any) {
        switch (status) {
            case "In Progress":
                this.statusStyleColor = (this.CurrentTheme) ? "#DFECFF" : "#2D3E57";
                this.display = 'flex'; this.padding = '1px 12px'; this.gap = '10px'; this.width = '96px'; this.height = '24px'; this.borderRadius = '24px'; this.background = this.statusStyleColor;
                break;
            case "Open":
                this.background = "red"; this.color = "white"; this.borderRadius = '15px'; this.padding = '6px';
                break;
            case "On Hold":
                this.statusStyleColor = (this.CurrentTheme) ? "#E4E4E7" : "#3C3B43";
                this.display = 'flex'; this.padding = '1px 12px'; this.gap = '10px'; this.width = '78px';
                this.height = '24px'; this.borderRadius = '24px'; this.background = this.statusStyleColor;
                break;
            case "Completed":
                this.statusStyleColor = (this.CurrentTheme) ? "#DFFFE2" : "#16501C";
                this.display = 'flex'; this.padding = '1px 12px'; this.gap = '10px'; this.width = '98px'; this.height = '24px'; this.borderRadius = '24px'; this.background = this.statusStyleColor;
                break;
            case "High":
                this.statusStyleColor = (this.CurrentTheme) ? "#FFEBE9" : "#48211D";
                this.display = 'flex'; this.padding = '1px 12px'; this.gap = '10px'; this.width = '55px'; this.height = '24px'; this.borderRadius = '24px'; this.background = this.statusStyleColor;
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
                this.display = 'flex'; this.padding = '1px 12px'; this.gap = '10px'; this.width = '52px'; this.height = '24px'; this.borderRadius = '24px'; this.backgroundPri = this.priorityStyle;
                break;
            case "Normal":
                this.priorityStyle = (this.CurrentTheme) ? "#F5DFFF" : "#4D2F5A";
                this.display = 'flex'; this.padding = '1px 12px'; this.gap = '10px'; this.width = '73px'; this.height = '24px'; this.borderRadius = '24px'; this.backgroundPri = this.priorityStyle;
                break;
            case "Critical":
                this.priorityStyle = (this.CurrentTheme) ? "#FFEBE9" : "#48211D";
                this.display = 'flex'; this.padding = '1px 12px'; this.gap = '10px'; this.width = '72px'; this.height = '24px'; this.borderRadius = '24px'; this.backgroundPri = this.priorityStyle;
                break;
            case "High":
                this.priorityStyle = (this.CurrentTheme) ? "#FFEBE9" : "#48211D";
                this.display = 'flex'; this.padding = '1px 12px'; this.gap = '10px'; this.width = '55px'; this.height = '24px'; this.borderRadius = '24px'; this.backgroundPri = this.priorityStyle;
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

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <GanttComponent id='Overview' dataSource={overviewData}
                        treeColumnIndex={1} allowSelection={true} highlightWeekends={true}
                        projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate} load={this.load.bind(this)}
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
}
