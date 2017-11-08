import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Inject } from '@syncfusion/ej2-react-grids';
import { inventoryData } from '../data';
import { SampleBase } from './sample-base';


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
            </div>
        )
    }
}
ReactDOM.render(<AutoWrap />, document.getElementById('sample'));