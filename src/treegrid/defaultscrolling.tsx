import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-treegrid';
import { sampleData } from './data';
import { SampleBase } from '../common/sample-base';

export class DefaultScrolling extends SampleBase<{}, {}> {
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <TreeGridComponent dataSource={sampleData} childMapping='subtasks' treeColumnIndex={1} height='400' >
                        <ColumnsDirective>
                            <ColumnDirective field='taskID' headerText='Task ID' width='100' textAlign='Right'></ColumnDirective>
                            <ColumnDirective field='taskName' headerText='Task Name' width='230'></ColumnDirective>
                            <ColumnDirective field='startDate' headerText='Start Date' width='200' format='yMd' textAlign='Right'></ColumnDirective>
                            <ColumnDirective field='endDate' headerText='End Date' width='200' format='yMd' textAlign='Right'></ColumnDirective>
                            <ColumnDirective field='duration' headerText='Duration' width='110' textAlign='Right'></ColumnDirective>
                            <ColumnDirective field='progress' headerText='Progress' width='110' textAlign='Right'></ColumnDirective>
                            <ColumnDirective field='priority' headerText='Priority' width='110'></ColumnDirective>
                            <ColumnDirective field='approved' headerText='Approved' textAlign='Center' width='110'></ColumnDirective>
                        </ColumnsDirective>
                    </TreeGridComponent>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the Tree Grid component with the horizontal and vertical scrollbars to view the exceeded Tree Grid content.</p>
                </div>
                <div id="description">
                    <p>The Tree Grid will show scrollbars when the content exceeds the element's width or height. The vertical and horizontal scrollbars will be displayed based on the following criteria.</p>
                    <ul>
                        <li>The vertical scrollbar appears when the total height of rows in the Tree Grid exceeds its element's height.</li>
                        <li>The horizontal scrollbar appears when the sum of the column`s width exceeds the Tree Grid element's width.</li>
                    </ul>
                    <p>The <code><a target="_blank" className="code"
                        href="https://ej2.syncfusion.com/react/documentation/api/treegrid/#height">height
                    </a></code> and <code><a target="_blank" className="code"
                        href="https://ej2.syncfusion.com/react/documentation/api/treegrid/#width">width
                    </a></code> properties are used to set the Tree Grid height and width, respectively. The value of these properties can be a numeric, pixel(<code>px</code>) or percentage (<code>%</code>).</p>
                    <p>
                        In this demo, the <code><a target="_blank" className="code"
                            href="https://ej2.syncfusion.com/react/documentation/api/treegrid/#height">height
                        </a></code> and <code><a target="_blank" className="code"
                            href="https://ej2.syncfusion.com/react/documentation/api/treegrid/#width">width
                        </a></code> properties of the Tree Grid are set to <strong><em>400</em></strong> and <strong><em>auto</em></strong>,
                        respectively. Now, the Tree Grid will render with a vertical scrollbar when the total height of rows
                        exceeds its element height and horizontal scrollbar will appear when the
                        total column width exceeds the element's width.
                    </p>
                </div>
            </div>
        )
    }
}
