import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Inject, Filter, Sort, Edit, Toolbar, Page } from '@syncfusion/ej2-react-treegrid';
import { Browser } from "@syncfusion/ej2-base";
import { sampleData } from './data';
import { updateSampleSection } from '../common/sample-base';
import './adaptive.css';

const SAMPLE_CSS = `
.e-bigger.e-responsive-dialog .e-dlg-content {
  padding: 16px;
}

/* The device with borders */
.e-mobile-layout {
  position: relative;
  width: 360px;
  height: 640px;
  margin: auto;
  border: 16px #f4f4f4 solid;
  border-top-width: 60px;
  border-bottom-width: 60px;
  border-radius: 36px;
  box-shadow: 0 0px 2px rgb(144 144 144), 0 0px 10px rgb(0 0 0 / 16%);
}

.tailwind-dark .e-mobile-layout,
.material-dark .e-mobile-layout,
.fabric-dark .e-mobile-layout,
.bootstrap-dark .e-mobile-layout,
.bootstrap5-dark .e-mobile-layout {
  border: 16px rgb(255 255 255 / 10%) solid;
  border-top-width: 60px;
  border-bottom-width: 60px;
}

/* The horizontal line on the top of the device */
.e-mobile-layout:before {
  content: '';
  display: block;
  width: 60px;
  height: 5px;
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ebebeb;
  border-radius: 10px;
}

.tailwind-dark .e-mobile-layout::before,
.tailwind-dark .e-mobile-layout::after,
.material-dark .e-mobile-layout::before,
.material-dark .e-mobile-layout::after,
.fabric-dark .e-mobile-layout::before,
.fabric-dark .e-mobile-layout::after,
.bootstrap-dark .e-mobile-layout::before,
.bootstrap-dark .e-mobile-layout::after,
.bootstrap5-dark .e-mobile-layout::before,
.bootstrap5-dark .e-mobile-layout::after {
  background: rgb(255 255 255  / 20%);
}

/* The circle on the bottom of the device */
.e-mobile-layout:after {
  content: '';
  display: block;
  width: 35px;
  height: 35px;
  position: absolute;
  left: 50%;
  bottom: -65px;
  transform: translate(-50%, -50%);
  background: #e8e8e8;
  border-radius: 50%;
}

/* The screen (or content) of the device */
.e-mobile-layout .e-mobile-content {
  overflow: hidden;
  width: 328px;
  height: 100%;
  background: transparent;
  border: 0px solid #dddddd;
}

.highcontrast .e-mobile-layout {
  border: 16px #000000 solid;
  border-top-width: 60px;
  border-bottom-width: 60px;
  box-shadow: -1px 2px white, -2px -2px white, 2px -2px white, 2px 1px white;
}`;

const Adaptive = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  let treegridobj = useRef<TreeGridComponent>(null);
  const toolbarOptions: any = [
    "Add",
    "Edit",
    "Delete",
    "Update",
    "Cancel",
    "Search",
  ];
  const renderingMode: any = "Vertical";
  const editSettings: any = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: "Dialog",
  };
  const filterOptions: any = { type: "Excel" };
  const validationRule: Object = { required: true };
  const validationRule1: Object = { required: true, number: true };
  const load = function (): void {
    (this as any).grid.adaptiveDlgTarget = document.getElementsByClassName(
      "e-mobile-content"
    )[0] as HTMLElement;
  };
  return (
    <div className="control-pane">
      <div className="control-section">
        <style>{SAMPLE_CSS}</style>
        <div className="col-md-9 e-bigger e-adaptive-demo">
          {!Browser.isDevice ? (
            <div className="e-mobile-layout">
              <div className="e-mobile-content">
                <TreeGridComponent
                  id="adaptivebrowser"
                  dataSource={sampleData}
                  treeColumnIndex={1}
                  childMapping="subtasks"
                  height="100%"
                  ref={treegridobj}
                  enableAdaptiveUI={true}
                  allowFiltering={true}
                  allowSorting={true}
                  allowPaging={true}
                  filterSettings={filterOptions}
                  toolbar={toolbarOptions}
                  editSettings={editSettings}
                  load={load}
                >
                  <ColumnsDirective>
                    <ColumnDirective
                      field="taskID"
                      headerText="Task ID"
                      isPrimaryKey={true}
                      width="135"
                      textAlign="Right"
                      validationRules={validationRule1}
                    ></ColumnDirective>
                    <ColumnDirective
                      field="taskName"
                      headerText="Task Name"
                      width="280"
                      validationRules={validationRule}
                    ></ColumnDirective>
                    <ColumnDirective
                      field="duration"
                      headerText="Duration"
                      width="150"
                      textAlign="Right"
                      validationRules={validationRule}
                    />
                    <ColumnDirective
                      field="progress"
                      headerText="Progress"
                      width="145"
                      textAlign="Right"
                    />
                  </ColumnsDirective>
                  <Inject services={[Filter, Sort, Edit, Toolbar, Page]} />
                </TreeGridComponent>
              </div>
            </div>
          ) : (
            <TreeGridComponent
              id="adaptivedevice"
              dataSource={sampleData}
              treeColumnIndex={1}
              childMapping="subtasks"
              height="100%"
              ref={treegridobj}
              enableAdaptiveUI={true}
              allowFiltering={true}
              allowSorting={true}
              allowPaging={true}
              filterSettings={filterOptions}
              toolbar={toolbarOptions}
              editSettings={editSettings}
              load={load}
            >
              <ColumnsDirective>
                <ColumnDirective
                  field="taskID"
                  headerText="Task ID"
                  isPrimaryKey={true}
                  width="135"
                  textAlign="Right"
                  validationRules={validationRule1}
                ></ColumnDirective>
                <ColumnDirective
                  field="taskName"
                  headerText="Task Name"
                  width="280"
                  validationRules={validationRule}
                ></ColumnDirective>
                <ColumnDirective
                  field="duration"
                  headerText="Duration"
                  width="140"
                  textAlign="Right"
                  validationRules={validationRule}
                />
                <ColumnDirective
                  field="progress"
                  headerText="Progress"
                  width="145"
                  textAlign="Right"
                />
              </ColumnsDirective>
              <Inject services={[Filter, Sort, Edit, Toolbar, Page]} />
            </TreeGridComponent>
          )}
        </div>
        <div id="action-description">
          <p>
            This sample demonstrates the adaptive rendering behavior of Tree
            Grid features such as Filtering, Paging, Searching and etc.,
          </p>
        </div>
        <div id="description">
          <p>
            The <code>enableAdaptiveUI</code> property is set to true. The
            filtering, CRUD actions, paging and other various user interactions
            in tree grid will be adaptive to the smaller screens. For example,
            Filtering opens the UI for user in a pop-up occupying the entire
            screen.
          </p>
        </div>
      </div>
    </div>
  );
}
export default Adaptive;