import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-grids';
import { employeeDetail } from './data';
import { SampleBase } from '../common/sample-base';
import './sample.css';
import { ChipListComponent } from '@syncfusion/ej2-react-buttons';

export class HeaderTemplate extends SampleBase<{}, {}> {

    public gridTemplate(props): any {
        var src = 'src/grid/images/' + props.EmployeeID.replace('Emp100', '') + '.png';
        return (<div className='image'>
            <img src={src} alt={props.EmployeeID} />
        </div>);
    }

    public locationTemplate(props): any {
        return (<div>
            <span className="e-location e-icons"></span>{props.Location}
          </div>)
    }

    public assetTemplate(props):any {
        return (
            <div>
                <ChipListComponent id='chip' chips={props.AssetKit.split(',')}></ChipListComponent>
            </div>
          )
    }

    public employeeImageHeaderTemplate():any {
        return (<div>
            <span className="e-icon-userlogin e-icons"></span>Image
        </div>);
    }

    public locationHeaderTemplate():any {
        return (<div>
            <span className="e-location e-icons"></span>Location
        </div>);
    }

    public assetKitHeaderTemplate():any {
        return (<div>
            <span className="e-description e-icons"></span>Asset Kit
        </div>);
    }

    
    public mailIDHeaderTemplate():any {
        return (<div>
            <span className="e-mail e-icons"></span>Email ID
        </div>);
    }

    public phoneHeaderTemplate():any {
        return (<div>
            <span className="e-phone e-icons"></span>Contact No
        </div>);
    }

    public dateTemplate():any {
        return (<div>
            <span className="e-icon-calender e-icons"></span>Assigned Date
        </div>);
    }

    public mailIDTemplate(props):any {
        var src = 'mailto:${MailID}' + props.MailID;
        return (
            <div>
                <a href={src}>{props.MailID}</a>
            </div>
          )
    }

    public template: any = this.gridTemplate;

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <GridComponent id="gridheadersample" dataSource={employeeDetail} width='auto' height='359'>
                        <ColumnsDirective>
                            <ColumnDirective headerText='Image' width='180' template={this.template} textAlign='Center' headerTemplate={this.employeeImageHeaderTemplate}/>
                            <ColumnDirective field='EmployeeID' headerText='ID' width='160'/>
                            <ColumnDirective field='Name' headerText='Name' width='120' />
                            <ColumnDirective field='MailID' headerText='Email ID' width='150' template={this.mailIDTemplate} headerTemplate={this.mailIDHeaderTemplate}/>
                            <ColumnDirective field='AssetKit' headerText='Asset Kit' width='180' template={this.assetTemplate} headerTemplate={this.assetKitHeaderTemplate}/>
                            <ColumnDirective field='AssetKitDistribution' headerText='Assigned Date' width='170' format='yMd' headerTemplate={this.dateTemplate} textAlign='Right'/>
                            <ColumnDirective field='Location' headerText='Location' width='150' template={this.locationTemplate} headerTemplate={this.locationHeaderTemplate}/>
                            <ColumnDirective field='PhoneNumber' headerText='Contact No' width='150' textAlign='Right' headerTemplate={this.phoneHeaderTemplate}/>
                        </ColumnsDirective>
                    </GridComponent>
                </div>
                <div id="action-description">
                <p>This sample demonstrates the Grid header template feature. In this sample, custom icons are shown in the column headers.</p>
            </div>

            <div id="description">
            <p>
                The <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/grid/column/#headertemplate">header template
                </a></code> feature enhances your column headers by incorporating custom icons or text alongside the header text. 
                This allows for a more visually appealing and informative presentation of your data. In this demonstration, you will see how custom icons are integrated
                into the column headers, which include <strong>Employee Image</strong>, <strong>MailID</strong>, <strong>Phone Number</strong>, <strong>Location</strong>, <strong>Asset Kit</strong>, and <strong>Assigned Date</strong>. These header icons represent the column's content, 
                making it easy to identify and understand at a glance.
            </p>
            <p>
                More information on the header template can be found in this
                <a target="_blank" 
                href="https://ej2.syncfusion.com/react/documentation/grid/columns/column-headers#header-template">
                documentation section</a>.
            </p>

            </div>
            </div>
        )
    }
}