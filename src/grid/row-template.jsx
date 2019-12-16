import * as React from 'react';
import { Internationalization } from '@syncfusion/ej2-base';
import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-grids';
import { employeeData } from './data';
import { SampleBase } from '../common/sample-base';
let instance = new Internationalization();
export class RowTemplate extends SampleBase {
    constructor() {
        super(...arguments);
        this.format = (value) => {
            return instance.formatDate(value, { skeleton: 'yMd', type: 'date' });
        };
        this.template = this.gridTemplate;
    }
    gridTemplate(props) {
        var src = 'src/grid/images/' + props.EmployeeID + '.png';
        return (<tr className="templateRow">
            <td className="photos">
                <img src={src} alt={props.EmployeeID}/>
            </td>
            <td className="details">
                <table className="CardTable" cellPadding={3} cellSpacing={2}>
                    <colgroup>
                        <col style={{ width: "50%" }}/>
                        <col style={{ width: "50%" }}/>
                    </colgroup>
                    <tbody>
                        <tr>
                            <td className="CardHeader">First Name </td>
                            <td>{props.FirstName} </td>
                        </tr>
                        <tr>
                            <td className="CardHeader">Last Name</td>
                            <td>{props.LastName} </td>
                        </tr>
                        <tr>
                            <td className="CardHeader">Title
                        </td>

                            <td>{props.Title}
                            </td>
                        </tr>
                        <tr>
                            <td className="CardHeader">Birth Date
                        </td>
                            <td> {this.format(props.BirthDate)}
                            </td>
                        </tr>
                        <tr>
                            <td className="CardHeader">Hire Date
                        </td>
                            <td>{this.format(props.HireDate)}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>);
    }
    render() {
        return (<div className='control-pane'>
                <div className='control-section'>
                    <GridComponent dataSource={employeeData} rowTemplate={this.template.bind(this)} width='auto' height='335'>
                        <ColumnsDirective>
                            <ColumnDirective headerText='EmployeeImage' width='180' textAlign='Center' field='OrderID'/>
                            <ColumnDirective headerText='Employee Details' width='300' textAlign='Left' field='CustomerName'/>
                        </ColumnsDirective>
                    </GridComponent>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the Grid component with the row template feature. In this sample, we have rendered each Grid
        row using the template.
    </p>


                </div>
                <div id='description'>
                    <p>
                        The Grid provides a way to use a custom layout for its rows using template feature. The
            <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#rowtemplate">rowTemplate
        </a></code> property accepts the template for the row.
        </p>
                    <p>
                        In this demo, we have presented Employee Information with Employee Photo in the first column and employee
            details like Name, Address etc. in the second column.
        </p>
                </div>
            </div>);
    }
}
