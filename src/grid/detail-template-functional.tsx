import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, DetailRow, Inject, Sort, Filter } from '@syncfusion/ej2-react-grids';
import { updateSampleSection } from '../common/sample-base';
import "./sample.css";
import { TabComponent, TabItemDirective, TabItemsDirective } from '@syncfusion/ej2-react-navigations';
import {
    Category, ChartComponent, Legend, LineSeries, SeriesCollectionDirective,
    SeriesDirective, Tooltip
  } from '@syncfusion/ej2-react-charts';
import { employeeDetail, taskDetail } from './data';
import { KanbanComponent, ColumnsDirective as KanbanColumns, ColumnDirective as KanbanColumn } from '@syncfusion/ej2-react-kanban';

function DetailTemplate() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let taskData:any;
    let salesData:any;
    const emailTemplate = (props: any) => {
      var src = 'mailto:${MailID}' + props.MailID;
        return (
            <div>
                <a href={src}>{props.MailID}</a>
            </div>
        )
    }
    const generateSalesData = (taskData:any) => {
      const statusCategories = ['Open', 'InProgress', 'Testing', 'Close'];
      const statusData = statusCategories.map((status) => {
        const filteredTasks = taskData.filter((task: any) => task.Status === status);
        const estimatedHours = filteredTasks.reduce((sum: any, task: any) => sum + task.Estimate, 0);
        // Assuming tasks have an EstimatedHours field
        const spentHours = filteredTasks.reduce((sum: any, task: any) => sum + task.Spent, 0);
        let taskid = '';
        if (filteredTasks.length) {
          taskid = filteredTasks[0].Id;
        }
        return { spentHours, estimatedHours, status, taskid };
      });
      return statusData;
    }
    const detailDataBound =(args:any) =>{
        var rowData = args.data;
        taskData = taskDetail.filter((task: any) => task.Assignee === rowData.Name);
        salesData = generateSalesData(taskData);
    };

    const cardTemplate = (props) => {
      return (
        <div className="card-template">
          <table className="card-template-wrap" style={{ width: '100%' }}>
            <tbody>
              <tr>
                <td className="e-title">
                  <div className="e-card-header">
                    <div className="e-card-header-caption">
                      <div className="e-card-header-title e-tooltip-text">
                        {props.Id}
                      </div>
                    </div>
                  </div>
                  <table
                    className="card-template-wrap">
                    <tbody>
                      <tr className='e-tooltip-text'>
                        <td>
                          <div className="e-card-content">
                            {props.Summary}
                          </div>
                          <span className="e-card-content"><b>Estimated hour:</b> {props.Estimate}</span>
                        </td>

                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table >
        </div >
      );
    };
    
    const taskTemplate = () => {
      return (
        <div style={{ paddingTop: '20px', paddingBottom: '20px' }}>
            <KanbanComponent id="kanban" cssClass="kanban-swimlane-template" keyField="Status" dataSource={taskData} cardSettings={{ template: cardTemplate.bind(this), headerField: 'Id' }}>
                <KanbanColumns>
                    <KanbanColumn headerText="Open" keyField="Open" />
                    <KanbanColumn headerText="In Progress" keyField="InProgress" />
                    <KanbanColumn headerText="Testing" keyField="Testing" />
                    <KanbanColumn headerText="Done" keyField="Close" />
                </KanbanColumns>
            </KanbanComponent>
        </div>
      );
    };

    const chartTemplate = () => {
        return (
        <div style={{ paddingTop: '20px', paddingBottom: '20px' }}>
            <ChartComponent height="302px" tooltip={{ enable: true }} primaryXAxis={{ valueType: 'Category', title: 'Status' }} title="Burndown Chart">
                <Inject services={[Tooltip, LineSeries, Category, Legend]} />
                <SeriesCollectionDirective>
                    <SeriesDirective dataSource={salesData} xName="taskid" yName="estimatedHours" name="Estimated Hours"marker={{ visible: true, width: 10, height: 10 }}/>
                    <SeriesDirective dataSource={salesData} xName="taskid" yName="spentHours" name="Spent Hours" marker={{ visible: true, width: 10, height: 10 }}/>
                </SeriesCollectionDirective>
            </ChartComponent>
        </div>
        );
    };
    const detailTemplate = () =>{
        const headertext = [{ text: "Taskboard" }, { text: "Burndown Chart" }];
        return (<div>
            <p style={{ textAlign: "center", paddingTop: "3px", fontSize: "17px" }}><b>Sprint</b></p>
            <TabComponent animation={{
            previous: { effect: 'None', duration: 0, easing: '' },
            next: { effect: 'None', duration: 0, easing: '' }
            }}>
            <TabItemsDirective>
                <TabItemDirective header={headertext[0]} content={taskTemplate} />
                <TabItemDirective header={headertext[1]} content={chartTemplate} />
            </TabItemsDirective>
            </TabComponent></div>
        );
    }
    const employeeTemplate = (props: any) => {
        var src = 'src/grid/images/' + props.EmployeeID.replace('Emp100', '') + '.png';
        return (<div className='image'>
            <img src={src} alt={props.EmployeeID} />
        </div>);
    }
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <GridComponent dataSource={employeeDetail} height='600' detailDataBound={detailDataBound} detailTemplate={detailTemplate} width='auto' allowSorting={true} allowFiltering={true} filterSettings={{type: 'CheckBox'}}>
                      <ColumnsDirective>
                          <ColumnDirective headerText='Image' width='180' template={employeeTemplate} textAlign='Center' />
                          <ColumnDirective field="EmployeeID" headerText='ID' isPrimaryKey={true} width={70}/>
                          <ColumnDirective field="Name" headerText='Name' width={70} />
                          <ColumnDirective field="MailID" headerText='Email' width={120} template={emailTemplate}/>
                          <ColumnDirective field="SoftwareTeam" headerText='Team(s)' width={70} />
                          <ColumnDirective field="ReportTo" headerText='Reporter' width={70} />
                        </ColumnsDirective>
                        <Inject services={[DetailRow, Sort, Filter]} />
                    </GridComponent>
                </div>
            <div id="action-description">
                <p>This sample demonstrates the Grid component's with the detail template feature. It lets users click the expand button
                in each grid row to display detailed information about that row.
                </p>

            </div>
            <div id='description'>
            <p>
              This additional information can be shown or hidden by clicking on the expand or collapse button. The 
              <code><a target="_blank"className="code" href="https://ej2.syncfusion.com/react/documentation/api/grid#detailtemplate">
              detailTemplate</a></code> property accepts either a string or HTML element`s ID value, which will be used as the template for the detail row.
          </p>
              <p>
              In this demonstration, the parent row provides information about employees name, ID, team and reporter names. In each employee row with 
              a details view, when expanding the details, you can see the sprint report of that employee. In the details row with two tabs, the first tab contains 
              <code><a target="_blank"className="code" href="https://ej2.syncfusion.com/react/demos/#/fluent2/kanban/overview">
              Syncfusion<sup>®</sup> Kanban component</a></code> used to list assigned tasks and their current statuses, and the second tab contains <code><a target="_blank"className="code" 
              href="https://ej2.syncfusion.com/react/demos/#/fluent2/chart/overview.html"> Syncfusion<sup>®</sup> Chart Component</a></code> used to 
              display the burndown chart of employee task estimated time vs actual spend time.
          </p>
                <br />
                <p style={{ fontWeight: 500 }}>Injecting Module:</p>
                    <p>
                    Features of the Grid component are segregated into individual feature-wise modules. To use the Detail row feature, inject the <code>DetailRow</code> module into the <code>services</code>
                </p>
                <p>
                  More information on the detail template can be found in this
                  <a target="_blank" 
                  href="https://ej2.syncfusion.com/react/documentation/grid/row/detail-template">
                  documentation section</a>.
                </p>

            </div>
        </div>
    )
}
export default DetailTemplate;