import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Inject, Page } from '@syncfusion/ej2-react-treegrid';
import { headerData } from './data';
import { SampleBase } from '../common/sample-base';
import './header-template.css'

export class HeaderTemplate extends SampleBase<{}, {}> {

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div>
            <TreeGridComponent dataSource={headerData} treeColumnIndex={0} childMapping='subtasks' height='350' allowPaging={true}>
              <ColumnsDirective>
                <ColumnDirective field='taskName' width='220'
                 headerTemplate={() => {
                  return (<div><img src="src/treegrid/images/__Task name.png" width="20" height="20" className="taskName" />
                    <b className='e-header'>Task Name</b></div>);
                }}></ColumnDirective>
                <ColumnDirective field='startDate' headerText='Start Date' format='yMd' type='date' textAlign='Right'
                 headerTemplate={() => {
                  return (<div><img src="src/treegrid/images/__Start name.png" width="20" height="20" className="startDate" />
                    <b className='e-header'>Start Date</b></div>);
                  }}
                 />
                <ColumnDirective field='resourceId' textAlign='Right'
                 headerTemplate={() => {
                  return (<div><img src="src/treegrid/images/__Resources.png" width="20" height="20" className="resources" />
                  <b className='e-header'>Resources</b></div>);
                  }}/>
                <ColumnDirective field='duration' textAlign='Right'
                 headerTemplate={() => {
                  return (<div><img src="src/treegrid/images/__Duration.png" width="20" height="20" className="duration" />
                  <b className='e-header'>Duration</b></div>);
                  }}/>
                <ColumnDirective field='progress' headerText='progress' textAlign='Right'
                 headerTemplate={() => {
                  return (<div><img src="src/treegrid/images/__progress.png" width="20" height="20" className="progress-column" />
                  <b className='e-header'>Progress</b></div>);
                  }}/>
              </ColumnsDirective>
            <Inject services={[Page]} />
          </TreeGridComponent>
        </div>
      </div>
      <div id="action-description">
        <p>This sample demonstrates the Tree Grid header template feature. In this sample, we have shown custom icons in the column headers.
        </p>
      </div>
      <div id="description">
        <p>
          The Tree Grid provides a way to define a custom element in header element. <code>columns-&gt;headertemplate</code> property accepts
           either string or HTML element`s ID value, which will be used as the template for the header cell.  
        </p>
        <p> In this demo, we have render customized template for all column headers.</p> 
        <p> More information about Header template can be found in this documentation section.</p>   
       </div>
      </div>
    )
  }
}
