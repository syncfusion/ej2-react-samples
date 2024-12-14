import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useState, useRef, useCallback, useEffect } from 'react';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { GanttComponent, Inject, Filter, ColumnsDirective, ColumnDirective, Selection } from '@syncfusion/ej2-react-gantt';
import { projectNewData } from './data';
import { QueryBuilderComponent } from '@syncfusion/ej2-react-querybuilder';
import { Query } from '@syncfusion/ej2-data';
import { SidebarComponent } from '@syncfusion/ej2-react-navigations';
import { updateSampleSection } from '../common/sample-base';
import './advanced-filtering.css';

const AdvancedFiltering = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [isSideBar, setIsSideBar] = useState(false);
  const [querybuilderevent, setQuerybuilderevent] = useState(false);
  const [create, setCreate] = useState('');
  const [predicateValue, setPredicateValue] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState(new Query());
  let ganttRef = useRef<GanttComponent>(null);
  let sidebarRef = useRef<SidebarComponent>(null);
  let queryBuilderRef = useRef<QueryBuilderComponent>(null);
  const taskFields: any = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    child: 'subtasks'
  };
  const projectStartDate = new Date('04/01/2024');
  const projectEndDate = new Date('07/06/2024');
  const splitterSettings: any = { columnIndex: 3 };
  const labelSettings: any = { rightLabel: 'TaskName' };
  const target = '#ganttsidebar-parent';

  const rowSelected = () => {
    setSidebarToggle(false);
    setIsSideBar(false);
    if (isSideBar && sidebarRef.current) {
      sidebarRef.current.isOpen = false;
    }
  };

  const triggerSidebar = () => {
    setSidebarToggle(prev => !prev);
    setIsSideBar(true);
    if (querybuilderevent) {
        setCreate(queryBuilderRef.current?.getSqlFromRules());
    }
    if (sidebarRef.current) {
      sidebarRef.current.isOpen = true;
    }
  };

  const created = () => {
    setQuerybuilderevent(true);
    if (create && create !== '') {
      queryBuilderRef.current?.setRulesFromSql(create);
    }
  };

  const updateRule = useCallback((args: any) => {
    const predicateValue = queryBuilderRef.current?.getPredicate(args.rule);
    setPredicateValue(predicateValue);
    if (args.Type === "DeleteRule" && predicateValue !== null) {
        setSearchQuery(new Query().where(predicateValue));
    } else if (predicateValue === null && args.Type === "DeleteRule") {
        setSearchQuery(new Query().select(['TaskID', 'TaskName', 'StartDate', 'Duration', 'EndDate', 'Progress', 'Predecessor']));
    }
  }, []);
  
  const handleClose = () => {
    setSidebarToggle(false);
    setIsSideBar(false);
    setCreate(queryBuilderRef.current?.getSqlFromRules());
    if (sidebarRef.current) {
      sidebarRef.current.hide();
    }
  };

const handleApply = () => {
    if (predicateValue) {
      setSearchQuery(new Query().where(predicateValue));
    } else {
      setSearchQuery(new Query().select(['TaskID', 'TaskName', 'StartDate', 'Duration', 'EndDate', 'Progress', 'Predecessor']));
    }
  };

  useEffect(() => {
    if (ganttRef.current) {
      ganttRef.current.query = searchQuery;
      ganttRef.current.refresh();
    }
  }, [searchQuery]); // This effect will run whenever `searchQuery` changes

  const handleClear = () => {
    setCreate('');
    setPredicateValue(null);
    setSearchQuery(new Query());
    if (queryBuilderRef.current) {
      queryBuilderRef.current.reset();
    }
    if (ganttRef.current) {
      ganttRef.current.query = new Query();
      ganttRef.current.refresh();
    }
  };

  return (
    <div className='control-pane'>
      <div className='control-section' style={{ paddingTop: '0px' }}>
        <div id='ganttsidebar-parent' style={{overflow: 'hidden', height:'460px'}}>
          <ButtonComponent id='filter-btn' onClick={triggerSidebar}>
            <span className='e-quickfilter' style={{padding: '3px'}} ></span>
            Advanced Filters
          </ButtonComponent>
          {isSideBar && (
            <SidebarComponent id='ganttSidebar' ref={sidebarRef} target={target} width={'65%'} type='Over' isOpen={sidebarToggle} position='Right'>
              <div className="ganttsidebar-header">
                <div className="title">Advanced Filters</div>
                <ButtonComponent id="close" className="e-close" onClick={handleClose}></ButtonComponent>
              </div>
              <QueryBuilderComponent id='ganttquerybuilder' ref={queryBuilderRef} dataSource={projectNewData} allowValidation={true}
                columns={[
                  { field: 'TaskID', label: 'Task ID', type: 'number' },
                  { field: 'TaskName', label: 'Task Name', type: 'string' },
                  { field: 'StartDate', label: 'Start Date', type: 'date', format: 'MM/dd/yyyy' },
                  { field: 'Duration', label: 'Duration', type: 'number' },
                  { field: 'EndDate', label: 'End Date', type: 'date', format: 'MM/dd/yyyy' },
                  { field: 'Progress', label: 'Progress', type: 'number' },
                  { field: 'Predecessor', label: 'Predecessor', type: 'string' }
                ]}
                ruleChange={updateRule}
                created={created}
              ></QueryBuilderComponent>
              <div className="ganttbtn-container">
                <ButtonComponent id="apply" cssClass='e-primary' onClick={handleApply}>Apply</ButtonComponent>
                <ButtonComponent id="clear" onClick={handleClear}>Clear</ButtonComponent>
              </div>
            </SidebarComponent>
          )}
          <GanttComponent id='AdvancedFiltering' ref={ganttRef} dataSource={projectNewData} treeColumnIndex={0} 
            allowFiltering={true} includeWeekend={true}
            projectStartDate={projectStartDate} projectEndDate={projectEndDate} taskFields={taskFields}
            splitterSettings={splitterSettings}
            labelSettings={labelSettings}
            height='410px' rowSelected={rowSelected}>
            <ColumnsDirective>
              <ColumnDirective field='TaskID' headerText='Task ID' width='80' ></ColumnDirective>
              <ColumnDirective field='TaskName' headerText='Task Name' width='250' clipMode='EllipsisWithTooltip'></ColumnDirective>
              <ColumnDirective field='StartDate' headerText='Start Date'></ColumnDirective>
              <ColumnDirective field='Duration' headerText='Duration'></ColumnDirective>
              <ColumnDirective field='EndDate' headerText='End Date'></ColumnDirective>
              <ColumnDirective field='Progress' headerText='End Date'></ColumnDirective>
              <ColumnDirective field='Predecessor' headerText='Predecessor'></ColumnDirective>
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
      </div>
    </div>
  );
};
export default AdvancedFiltering;