import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Inject } from '@syncfusion/ej2-react-grids';
import { inventoryData } from './data';
import { SampleBase } from '../common/sample-base';
import './sample.css';

export class AutoWrap extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <GridComponent dataSource={inventoryData} allowPaging={true} allowTextWrap={true} height='400'>
                        <ColumnsDirective>
                            <ColumnDirective field='Inventor' headerText='Inventor' width='180' textAlign='right'></ColumnDirective>
                            <ColumnDirective field='NumberofPatentFamilies' headerText='Number of Patent Families' width='180' textAlign='right'></ColumnDirective>
                            <ColumnDirective field='Country' headerText='Country' width='140' />
                            <ColumnDirective field='Active' headerText='Active' width='120' />
                            <ColumnDirective field='Mainfieldsofinvention' headerText='Main Fields of Invention' width='200'></ColumnDirective>
                        </ColumnsDirective>
                        <Inject services={[Page]} />
                    </GridComponent>
                    <div className="e-dsalign">Source:
                    <a href="https://en.wikipedia.org/wiki/List_of_prolific_inventors" target='_blank'>Wikipedia: List of Prolific inventors</a>
                    </div>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the Grid component with the auto wrap column cell. In this sample, you can see that the <b>main fields of invention</b> column cell content exceeded the available width hence it has been wrapped into multiple lines.
    </p>
                </div>
                <div id='description'>
                    <p>Auto wrap cell content can be enabled using  <code><a target='_blank' className='code'
                        href='http://ej2.syncfusion.com/react/documentation/grid/api-grid.html#allowtextwrap-boolean'>
                        allowTextWrap</a></code> property of the Grid. Setting this property will wrap cell text on multiple lines. This feature is useful to view the cell content when it exceeds the cell width.</p>

                    <p>Setting this property will wrap the text in both content cell and header cell.</p>

                    <p>In this demo, the <code><a target='_blank' className='code'
                        href='http://ej2.syncfusion.com/react/documentation/grid/api-grid.html#allowtextwrap-boolean'>
                        allowTextWrap</a></code> property is enabled and you can also see that the <b>main fields of invention</b> column whose content exceeded the cell width is wrapped into multiple lines.
                   </p>
                </div>
            </div>
        )
    }
}