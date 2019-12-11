import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-grids';
import { employeeData } from './data';
import { SampleBase } from '../common/sample-base';
import './sample.css';
export class ColumnTemplate extends SampleBase {
    constructor() {
        super(...arguments);
        this.template = this.gridTemplate;
    }
    gridTemplate(props) {
        var src = 'src/grid/images/' + props.EmployeeID + '.png';
        return (<div className='image'>
            <img src={src} alt={props.EmployeeID}/>
        </div>);
    }
    render() {
        return (<div className='control-pane'>
                <div className='control-section'>
                    <GridComponent dataSource={employeeData} width='auto' height='359'>
                        <ColumnsDirective>
                            <ColumnDirective headerText='Employee Image' width='180' template={this.template} textAlign='Center'/>
                            <ColumnDirective field='EmployeeID' headerText='Employee ID' width='125' textAlign='Right'/>
                            <ColumnDirective field='FirstName' headerText='Name' width='120'/>
                            <ColumnDirective field='Title' headerText='Title' width='170'/>
                            <ColumnDirective field='HireDate' headerText='Hire Date' width='135' format='yMd' textAlign='Right'/>
                            <ColumnDirective field='ReportsTo' headerText='Reports To' width='120' textAlign='Right'/>
                        </ColumnsDirective>
                    </GridComponent>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates usage of template columns in Grid.
                         In this sample, we have shown custom images in the Employee
        Image column.
    </p>

                </div>
                <div id='description'>
                    <p>
                        The Grid provides a way to use a custom layout for each cell using column template feature. The
            <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/grid/api-column.html#template">columns->template
        </a></code> property accepts the template for the cell.
        </p>
                    <p>
                        In this demo, using column template, we have presented <strong>Employee Image</strong> column as template column.
        </p>

                </div>
            </div>);
    }
}
