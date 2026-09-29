import * as React from 'react';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { GanttComponent, TaskFieldsModel, Inject, Filter, ColumnsDirective, ColumnDirective, Selection, LabelSettingsModel, SplitterSettingsModel } from '@syncfusion/ej2-react-gantt';
import { projectNewData } from './data';
import { QueryBuilderComponent } from '@syncfusion/ej2-react-querybuilder';
import { SampleBase } from '../common/sample-base';
import { Query } from '@syncfusion/ej2-data';
import { SidebarComponent } from '@syncfusion/ej2-react-navigations';
import './advanced-filtering.css';

// Define the state interface
interface AdvancedFilteringState {
  sidebarToggle: boolean;
  isSideBar: boolean;
  queryBuilderEvent: boolean;
  create: string;
  predicateValue: any;
  searchQuery: Query;
}

export class AdvancedFiltering extends SampleBase<{}, AdvancedFilteringState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      sidebarToggle: false,
      isSideBar: false,
      queryBuilderEvent: false,
      create: '',
      predicateValue: null,
      searchQuery: new Query(),
    };
  }

  public ganttInstance: GanttComponent | null = null;
  public sidebarInstance: SidebarComponent | null = null;
  public queryBuilderInstance: QueryBuilderComponent | null = null;

  public sidebarRef = (sidebar: SidebarComponent) => {
    this.sidebarInstance = sidebar;
  };

  public queryBuilderRef = (queryBuilder: QueryBuilderComponent) => {
    this.queryBuilderInstance = queryBuilder;
  };

  public taskFields: TaskFieldsModel = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    parentID: 'ParentId'
  };

  public projectStartDate: Date = new Date('03/30/2025');
  public projectEndDate: Date = new Date('06/21/2025');
  public splitterSettings: SplitterSettingsModel = {
    columnIndex: 2
  };
  public labelSettings: LabelSettingsModel = {
    rightLabel: 'TaskName'
  };
  public target = '#ganttsidebar-parent';

  public rowSelected = () => {
    this.setState({ sidebarToggle: false, isSideBar: false }, () => {
      if (this.state.isSideBar && this.sidebarInstance) {
        this.sidebarInstance.isOpen = false;
      }
    });
  };

  public triggerSidebar = () => {
    this.setState(prevState => ({
      sidebarToggle: !prevState.sidebarToggle,
      isSideBar: true,
      create: this.queryBuilderInstance?.getSqlFromRules()
    }));
    if (this.sidebarInstance) {
      this.sidebarInstance.isOpen = true;
    }
  };

  public created = () => {
    this.setState({ queryBuilderEvent: true }, () => {
      if (this.state.create) {
        this.queryBuilderInstance?.setRulesFromSql(this.state.create);
      }
    });
  };

  public updateRule = (args: any) => {
    const predicateValue = this.queryBuilderInstance?.getPredicate(args.rule);
    this.setState({
      predicateValue,
      searchQuery: predicateValue
        ? new Query().where(predicateValue)
        : new Query().select(['TaskID', 'TaskName', 'StartDate', 'Duration', 'EndDate', 'Progress', 'Predecessor'])
    });
  };

  public handleClose = () => {
    this.setState({
      sidebarToggle: false,
      isSideBar: false,
      create: this.queryBuilderInstance?.getSqlFromRules()
    }, () => {
      if (this.sidebarInstance) {
        this.sidebarInstance.hide();
      }
    });
  };

  public handleApply = () => {
    const query = this.state.predicateValue
      ? new Query().where(this.state.predicateValue)
      : new Query().select(['TaskID', 'TaskName', 'StartDate', 'Duration', 'EndDate', 'Progress', 'Predecessor']);

    this.setState({ searchQuery: query });

    if (this.ganttInstance) {
      this.ganttInstance.query = query;
      this.ganttInstance.refresh();
    }
  };

  public handleClear = () => {
    this.setState({ create: '', predicateValue: null, searchQuery: new Query() }, () => {
      if (this.queryBuilderInstance) {
        this.queryBuilderInstance.reset();
      }
      if (this.ganttInstance) {
        this.ganttInstance.query = new Query();
        this.ganttInstance.refresh();
      }
    });
  };

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section' style={{ paddingTop: '0px', paddingBottom: '60px' }}>
          <div id='ganttsidebar-parent'>
            <ButtonComponent id='filter-btn' onClick={this.triggerSidebar}>
              <span className='e-quickfilter' style={{ padding: '3px' }} ></span>
              Advanced Filters
            </ButtonComponent>
            {this.state.isSideBar && (
              <SidebarComponent id='ganttSidebar' ref={this.sidebarRef} target={this.target} width={'65%'} type='Over' isOpen={this.state.sidebarToggle} position='Right'>
                <div className="ganttsidebar-header">
                  <div className="title">Advanced Filters</div>
                  <ButtonComponent id="close" className="e-close" onClick={this.handleClose}></ButtonComponent>
                </div>

                <QueryBuilderComponent id='ganttquerybuilder' ref={this.queryBuilderRef} dataSource={projectNewData} allowValidation={true}
                  columns={[
                    { field: 'TaskID', label: 'Task ID', type: 'number' },
                    { field: 'TaskName', label: 'Task Name', type: 'string' },
                    { field: 'StartDate', label: 'Start Date', type: 'date', format: 'MM/dd/yyyy' },
                    { field: 'Duration', label: 'Duration', type: 'number' },
                    { field: 'EndDate', label: 'End Date', type: 'date', format: 'MM/dd/yyyy' },
                    { field: 'Progress', label: 'Progress', type: 'number' },
                    { field: 'Predecessor', label: 'Predecessor', type: 'string' }
                  ]}
                  ruleChange={this.updateRule}
                  created={this.created}
                ></QueryBuilderComponent>

                <div className="ganttbtn-container">
                  <ButtonComponent id="apply" cssClass='e-primary' onClick={this.handleApply}>Apply</ButtonComponent>
                  <ButtonComponent id="clear" onClick={this.handleClear}>Clear</ButtonComponent>
                </div>
              </SidebarComponent>
            )}
            <GanttComponent id='AdvancedFiltering' ref={gantt => this.ganttInstance = gantt} dataSource={projectNewData} treeColumnIndex={0}
              allowFiltering={true} includeWeekend={true}
              projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate} taskFields={this.taskFields}
              splitterSettings={this.splitterSettings}
              labelSettings={this.labelSettings}
              height='650px' taskbarHeight={25} rowHeight={46} rowSelected={this.rowSelected}>
              <ColumnsDirective>
                <ColumnDirective field='TaskID' headerText='Task ID' width='120' ></ColumnDirective>
                <ColumnDirective field='TaskName' headerText='Task Name' width='250' clipMode='EllipsisWithTooltip'></ColumnDirective>
                <ColumnDirective field='StartDate' headerText='Start Date'></ColumnDirective>
                <ColumnDirective field='Duration' headerText='Duration'></ColumnDirective>
                <ColumnDirective field='EndDate' headerText='End Date'></ColumnDirective>
                <ColumnDirective field='Progress' headerText='Progress'></ColumnDirective>
                <ColumnDirective field='Predecessor' headerText='Predecessor' width={190}></ColumnDirective>
              </ColumnsDirective>
              <Inject services={[Filter, Selection]} />
            </GanttComponent>
          </div>
        </div>

        <div id="action-description">
          <p>This sample demonstrates the integration of the QueryBuilder component for complex filtering in the Gantt Chart.</p>
        </div>
        <div id="description">
          <p>
            In this example, the process involves retrieving the complex query from the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/query-builder/getting-started">QueryBuilder</a> 
            component and subsequently integrating it into the Gantt Chart by updating its <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#query">Query</a> Property.
            The QueryBuilder component tool is located in a <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/sidebar/getting-started">SideBar</a> component that appears when you click on the toolbar.
          </p>
          <p>Gantt component features are segregated into individual feature-wise modules. To use filtering and selection features, we need to inject <code>Filter</code> and <code>Selection</code> into the <code>Inject Services</code> section.</p>
          <br/>
          <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/filtering/filtering">filtering</a> documentation section.</p>
          <br/>
          <p>Looking for the full React Gantt Chart component overview, features, pricing, and documentation? Visit the <a target="_blank" href="https://www.syncfusion.com/react-components/react-gantt-chart">React Gantt Chart</a> page.</p>
        </div>
      </div>
    );
  }
}
