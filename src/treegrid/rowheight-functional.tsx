import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Toolbar, Inject } from '@syncfusion/ej2-react-treegrid';
import { ClickEventArgs } from '@syncfusion/ej2-react-navigations';
import { sampleData } from './data';
import './sample.css';
import { updateSampleSection } from '../common/sample-base';

function RowHeight() {
  React.useEffect(() => {
    updateSampleSection();
  }, [])
  let treegridObj: TreeGridComponent;
  const toolbarOptions: any = [
    { prefixIcon: 'e-big-icon', id: 'small', align: 'Left', tooltipText: 'Small' },
    { prefixIcon: 'e-medium-icon', id: 'medium', align: 'Left', tooltipText: 'Medium' },
    { prefixIcon: 'e-small-icon', id: 'big', align: 'Left', tooltipText: 'Large' }
  ];
  function toolbarClick(args: ClickEventArgs): void {
    if (args.item.id === 'small') {
      treegridObj.rowHeight = 20;
    }
    if (args.item.id === 'medium') {
      treegridObj.rowHeight = 40;
    }
    if (args.item.id === 'big') {
      treegridObj.rowHeight = 60;
    }
  }
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <TreeGridComponent dataSource={sampleData} treeColumnIndex={1} childMapping='subtasks' height='350' rowHeight={20}
          toolbar={toolbarOptions} ref={treegrid => treegridObj = treegrid} toolbarClick={toolbarClick.bind(this)}>
          <ColumnsDirective>
            <ColumnDirective field='taskID' headerText='Task ID' width='70' textAlign='Right'></ColumnDirective>
            <ColumnDirective field='taskName' headerText='Task Name' width='200'></ColumnDirective>
            <ColumnDirective field='startDate' headerText='Start Date' width='90' format='yMd' type='date' textAlign='Right' />
            <ColumnDirective field='endDate' headerText='End Date' width='90' format='yMd' type='date' textAlign='Right' />
            <ColumnDirective field='duration' headerText='Duration' width='80' textAlign='Right' />
            <ColumnDirective field='progress' headerText='progress' width='80' textAlign='Right' />
            <ColumnDirective field='priority' headerText='Priority' width='90' />
          </ColumnsDirective>
          <Inject services={[Toolbar]} />
        </TreeGridComponent>
      </div>
      <div id="action-description">
        <p>This sample demonstrates the row height feature of the Tree Grid. In this demo, the rowHeight for all the Tree Grid rows can be
          changed as 20px, 40px and 60px through ToolBar button click.</p>
      </div>
      <div id='description'>
        <p>Tree Grid has provide an option to customize the row height by using <code>rowHeight</code> property of Tree Grid.
        </p>
        <p>In this sample, we have enabled an option in Toolbar to customize the row height of Tree Grid to 20px, 40px and 60px.
        </p>
      </div>
    </div>
  )
}
export default RowHeight;