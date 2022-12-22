import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Inject, Page } from '@syncfusion/ej2-react-treegrid';
import { headerData } from './data';
import { updateSampleSection } from '../common/sample-base';
{/* custom code start */ }
const SAMPLE_CSS = `
    .e-header {
        margin-left: 12px;
    }
    .fluent-dark img.taskName, .material-dark img.taskName, .fabric-dark img.taskName, .bootstrap-dark img.taskName,
    .tailwind-dark img.taskName, .bootstrap5-dark img.taskName, .highcontrast img.taskName {
      content: url('src/treegrid/images/darkTaskname.png')
    }
    .fluent img.taskName, .material img.taskName, .fabric img.taskName, .bootstrap img.taskName, 
    .tailwind img.taskName, .bootstrap5 img.taskName, .bootstrap4 img.taskName {
      content: url('src/treegrid/images/__Task name.png')
    }
    .fluent-dark img.startDate, .material-dark img.startDate, .fabric-dark img.startDate, .bootstrap-dark img.startDate,
    .tailwind-dark img.startDate, .bootstrap5-dark img.startDate, .highcontrast img.startDate {
      content: url('src/treegrid/images/darkStartname.png')
    }
    .fluent img.startDate, .material img.startDate, .fabric img.startDate, .bootstrap img.startDate, 
    .tailwind img.startDate, .bootstrap5 img.startDate, .bootstrap4 img.startDate {
      content: url('src/treegrid/images/__Start name.png')
    }
    .fluent-dark img.resources, .material-dark img.resources, .fabric-dark img.resources, .bootstrap-dark img.resources,
    .tailwind-dark img.resources, .bootstrap5-dark img.resources, .highcontrast img.resources {
      content: url('src/treegrid/images/darkResources.png')
    }
    .fluent img.resources, .material img.resources, .fabric img.resources, .bootstrap img.resources, 
    .tailwind img.resources, .bootstrap5 img.resources, .bootstrap4 img.resources {
      content: url('src/treegrid/images/__Resources.png')
    }
    .fluent-dark img.duration, .material-dark img.duration, .fabric-dark img.duration, .bootstrap-dark img.duration,
    .tailwind-dark img.duration, .bootstrap5-dark img.duration, .highcontrast img.duration {
      content: url('src/treegrid/images/darkduration.png')
    }
    .fluent img.duration, .material img.duration, .fabric img.duration, .bootstrap img.duration, 
    .tailwind img.duration, .bootstrap5 img.duration, .bootstrap4 img.duration {
      content: url('src/treegrid/images/__Duration.png')
    }
    .fluent-dark img.progress-column, .material-dark img.progress-column, .fabric-dark img.progress-column, .bootstrap-dark img.progress-column,
    .tailwind-dark img.progress-column, .bootstrap5-dark img.progress-column, .highcontrast img.progress-column {
      content: url('src/treegrid/images/darkprogress.png')
    }
    .fluent img.progress-column, .material img.progress-column, .fabric img.progress-column, .bootstrap img.progress-column, 
    .tailwind img.progress-column, .bootstrap5 img.progress-column, .bootstrap4 img.progress-column {
      content: url('src/treegrid/images/__progress.png')
    }
    .bootstrap5-dark img.progress-column,.bootstrap5-dark img.duration,.tailwind-dark img.resources, bootstrap4 img {
      padding-bottom: 1.2px;
    }
    .bootstrap5 img.taskName,.bootstrap5 img.startDate,.bootstrap5 img.resources,.tailwind-dark img.taskName,
    .tailwind-dark img.duration,.tailwind-dark img.progress-column {
      padding-bottom: 2px;
    }
    .bootstrap5 img.duration,.bootstrap5 img.progress-column,.tailwind img.taskName,.tailwind img.startDate,
    .tailwind img.resources,.tailwind img.progress-column {
      padding-bottom: 2px;
    }
    .fluent-dark img, .fluent img, .fabric-dark img, .bootstrap img {
      vertical-align: sub;
    }
    .fabric img, .highcontrast img.duration {
      vertical-align: text-top;
    }
    .fluent-dark img{
      vertical-align: bottom;
    }
    .material img {
      vertical-align: middle
    }
    .tailwind img.duration {
      padding-bottom: 4px;
      padding-left: 2px;
    }
    `;
{/* custom code end */ }
function HeaderTemplate() {
  React.useEffect(() => {
    updateSampleSection();
  }, [])
  return (
    <div className='control-pane'>
      {/* custom code start */}
      <style>
        {SAMPLE_CSS}
      </style>
      {/* custom code end */}
      <div className='control-section'>
        <div>
          <TreeGridComponent dataSource={headerData} treeColumnIndex={0} childMapping='subtasks' height='350' allowPaging={true}>
            <ColumnsDirective>
              <ColumnDirective field='taskName' width='220'
                headerTemplate={() => {
                  return (<div><img width="20" height="20" className="taskName" />
                    <b className='e-header'>Task Name</b></div>);
                }}></ColumnDirective>
              <ColumnDirective field='startDate' headerText='Start Date' format='yMd' type='date' textAlign='Right'
                headerTemplate={() => {
                  return (<div><img width="20" height="20" className="startDate" />
                    <b className='e-header'>Start Date</b></div>);
                }}
              />
              <ColumnDirective field='resourceId' textAlign='Right'
                headerTemplate={() => {
                  return (<div><img width="20" height="20" className="resources" />
                    <b className='e-header'>Resources</b></div>);
                }} />
              <ColumnDirective field='duration' textAlign='Right'
                headerTemplate={() => {
                  return (<div><img width="20" height="20" className="duration" />
                    <b className='e-header'>Duration</b></div>);
                }} />
              <ColumnDirective field='progress' headerText='progress' textAlign='Right'
                headerTemplate={() => {
                  return (<div><img width="20" height="20" className="progress-column" />
                    <b className='e-header'>Progress</b></div>);
                }} />
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
export default HeaderTemplate;
