import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Internationalization } from '@syncfusion/ej2-base';
import { GridComponent, ColumnsDirective, ColumnDirective, DetailRow, Inject } from '@syncfusion/ej2-react-grids';
import { employeeData } from './data';
import { SampleBase } from '../common/sample-base';
import "./sample.css";

let instance: Internationalization = new Internationalization();

interface DateFormat extends Window {
    format?: Function;
}

export class DetailTemplate extends SampleBase<{}, {}> {

    public format = (value: Date) => {
        return instance.formatDate(value, { skeleton: 'yMd', type: 'date' });
    }

    public gridTemplate(props): any {
        var src = 'src/grid/images/' + props.EmployeeID + '.png';
        return (<table className="detailtable" style={{ width: "100%" }} >
            <colgroup>
                <col style={{ width: "35%" }} />
                <col style={{ width: "35%" }} />
                <col style={{ width: "30%" }} />
            </colgroup>
            <tbody>
                <tr>
                    <td rowSpan={4} className='images'>
                        <img className='photo' src={src} alt={props.EmployeeID} />
                    </td>
                    <td>
                        <span style={{ fontWeight: 500 }}>First Name: </span> {props.FirstName}
                    </td>
                    <td>
                        <span style={{ fontWeight: 500 }}>Postal Code: </span> {props.PostalCode}
                    </td>
                </tr>
                <tr>
                    <td>
                        <span style={{ fontWeight: 500 }}>Last Name: </span> {props.LastName}
                    </td>
                    <td>
                        <span style={{ fontWeight: 500 }}>City: </span> {props.City}
                    </td>
                </tr>
                <tr>
                    <td>
                        <span style={{ fontWeight: 500 }}>Title: </span> {props.Title}
                    </td>
                    <td>
                        <span style={{ fontWeight: 500 }}>Phone: </span> {props.HomePhone}
                    </td>
                </tr>
                <tr>
                    <td>
                        <span style={{ fontWeight: 500 }}>Address: </span> {props.Address}
                    </td>
                    <td>
                        <span style={{ fontWeight: 500 }}>HireDate: </span> {this.format(props.HireDate)}
                    </td>
                </tr>
            </tbody>
        </table>
        );
    }

    public template: any = this.gridTemplate;

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <GridComponent dataSource={employeeData} detailTemplate={this.template.bind(this)} width='auto'>
                        <ColumnsDirective>
                            <ColumnDirective field='FirstName' headerText='First Name' width='110' />
                            <ColumnDirective field='LastName' headerText='Last Name' width='110' />
                            <ColumnDirective field='Title' headerText='Name' width='150' />
                            <ColumnDirective field='Country' headerText='Country' width='110' />
                        </ColumnsDirective>
                        <Inject services={[DetailRow]} />
                    </GridComponent>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the Grid component with the detail template feature. Click the expand button
        in each Grid row to show the detailed information about a row.
    </p>

                </div>
                <div id='description'>
                    <p>
                        The detail row template provides an additional information about a data row which can show or hide by clicking
            on expand or collapse button. The <code><a target="_blank" className="code"
                            href="https://ej2.syncfusion.com/react/documentation/api/grid#detailtemplate">
                            detailTemplate</a></code> property accepts the template for the detail row.
        </p>
                    <p>
                        In this demo, we have presented Employee Information with image in the detail row.
        </p>
                    <br />
                    <p style={{ fontWeight: 500 }}>Injecting Module:</p>
                    <p>
                        Grid component features are segregated into individual feature-wise modules. To use Detail row feature, we need to inject <code>DetailRow</code> module into the <code>services</code>
                    </p>

                </div>
            </div>
        )
    }
}