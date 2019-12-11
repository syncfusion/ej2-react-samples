import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Inject, Page } from '@syncfusion/ej2-react-treegrid';
import { sampleData } from './data';
import { SampleBase } from '../common/sample-base';
export class Format extends SampleBase {
    queryCellinfo(args) {
        if (args.cell.innerHTML === 'High') {
            let x = document.createElement('IMG');
            x.setAttribute('src', 'src/treegrid/images/__High.png');
            x.setAttribute('height', '15px');
            let span = document.createElement('span');
            span.innerHTML = args.cell.innerHTML;
            span.setAttribute('style', 'padding-left:7px;');
            args.cell.innerHTML = '';
            args.cell.appendChild(x);
            args.cell.appendChild(span);
        }
        else if (args.cell.innerHTML === 'Critical') {
            let y = document.createElement('IMG');
            y.setAttribute('src', 'src/treegrid/images/__Critical.png');
            y.setAttribute('height', '15px');
            let span = document.createElement('span');
            span.innerHTML = args.cell.innerHTML;
            span.setAttribute('style', 'padding-left:7px;');
            args.cell.innerHTML = '';
            args.cell.appendChild(y);
            args.cell.appendChild(span);
        }
        else if (args.cell.innerHTML === 'Low') {
            let z = document.createElement('IMG');
            z.setAttribute('src', 'src/treegrid/images/__Low.png');
            z.setAttribute('height', '15px');
            let span = document.createElement('span');
            span.innerHTML = args.cell.innerHTML;
            span.setAttribute('style', 'padding-left:7px;');
            args.cell.innerHTML = '';
            args.cell.appendChild(z);
            args.cell.appendChild(span);
        }
        else if (args.cell.innerHTML === 'Normal') {
            let a = document.createElement('IMG');
            a.setAttribute('src', 'src/treegrid/images/__Normal.png');
            a.setAttribute('height', '15px');
            let span = document.createElement('span');
            span.innerHTML = args.cell.innerHTML;
            span.setAttribute('style', 'padding-left:7px;');
            args.cell.innerHTML = '';
            args.cell.appendChild(a);
            args.cell.appendChild(span);
        }
        else if (+args.cell.innerHTML > 90 && +args.cell.innerHTML <= 100 && args.column.field === 'progress') {
            args.cell.setAttribute('style', 'background-color:#336c12;color:white;');
        }
        else if (+args.cell.innerHTML > 20 && args.column.field === 'progress') {
            args.cell.setAttribute('style', 'background-color:#7b2b1d;color:white;');
        }
    }
    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
          <div>
            <TreeGridComponent dataSource={sampleData} treeColumnIndex={1} childMapping='subtasks' allowPaging='true' pageSettings={{ pageSize: 8 }} queryCellInfo={this.queryCellinfo.bind(this)}>
              <ColumnsDirective>
                <ColumnDirective field='taskID' headerText='Task ID' width='110' textAlign='Right'></ColumnDirective>
                <ColumnDirective field='taskName' headerText='Task Name' width='200'></ColumnDirective>
                <ColumnDirective field='startDate' headerText='Start Date' width='90' type='date' format='yMd' textAlign='Right'/>
                <ColumnDirective field='endDate' headerText='End Date' width='90' type='date' format='yMd' textAlign='Right'/>
                <ColumnDirective field='duration' headerText='Duration' width='80' textAlign='Right'/>
                <ColumnDirective field='progress' headerText='Progress' width='80' textAlign='Right'/>
                <ColumnDirective field='priority' headerText='Priority' width='90'/>
              </ColumnsDirective>
            <Inject services={[Page]}/>
          </TreeGridComponent>
        </div>
      </div>
      <div id="action-description">
        <p>This samples demonstrates the way of customizing the cells by adding icons for Priority column and
            highlight the cells of Progress column based on certain condition using queryCellInfo event.
        </p>
      </div>

      <div id="description">
        <p>The appearance of cells can be customized by using the queryCellInfo event. The queryCellInfo event triggers
           for every cell. In that event handler, you can get QueryCellInfoEventArgs that contains the details of the cell.
        </p>
        <p>
          In this demo, we have customized the column values by adding icons for Priority column and highlighted the Progress column
            based on certain condition using queryCellInfo event.
        </p>
</div>

      </div>);
    }
}
