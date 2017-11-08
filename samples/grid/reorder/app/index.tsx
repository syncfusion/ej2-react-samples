import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Reorder, Inject } from '@syncfusion/ej2-react-grids';
import { employeeData } from '../data';
import { SampleBase } from './sample-base';

export class Reordering extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <GridComponent dataSource={employeeData} allowReordering={true}>
                        <ColumnsDirective>
                            <ColumnDirective field='EmployeeID' headerText='Employee ID' width='120' textAlign="right"></ColumnDirective>
                            <ColumnDirective field='FirstName' headerText='Name' width='140'></ColumnDirective>
                            <ColumnDirective field='Title' headerText='Title' width='170' />
                            <ColumnDirective field='HireDate' headerText='Hired Date' width='120' format='yMd' textAlign="right" />
                            <ColumnDirective field='ReportsTo' headerText='Reports To' width='120'></ColumnDirective>
                        </ColumnsDirective>
                        <Inject services={[Reorder]} />
                    </GridComponent>
                </div>
            </div>
        )
    }
}
ReactDOM.render(<Reordering />, document.getElementById('sample'));