import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Sort, Inject, FilterSettingsModel, Filter } from '@syncfusion/ej2-react-grids';
import { employeeDetail } from './data';
import { updateSampleSection } from '../common/sample-base';
import './sample.css';
import { ChipListComponent } from '@syncfusion/ej2-react-buttons';
import { createElement } from '@syncfusion/ej2-base';
import { MultiSelect } from '@syncfusion/ej2-dropdowns';

function ColumnTemplate() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    function gridTemplate(props): any {
        var src = 'src/grid/images/' + props.EmployeeID.replace('Emp100', '') + '.png';
        return (<div className='image'>
            <img src={src} alt={props.EmployeeID} />
        </div>);
    }
    function locationTemplate(props): any {
        return (<div>
            <span className="e-location e-icons"></span>{props.Location}
          </div>)
    }

    function statusTemplate(props): any {
        return(<div>{props.EmployeeAvailability === "Available" ? 
            <div id="status" className="statuscolor e-availablecolor">
              <span className="statustxt e-availablecolor">{props.EmployeeAvailability}</span>
            </div> : 
            <div id="status" className="statuscolor e-nonavailablecolor">
              <span className="statustxt e-nonavailablecolor">{props.EmployeeAvailability}</span>
            </div>}</div>);
    }

    function assetTemplate(props):any {
        return (
            <div>
              <ChipListComponent id='chip' chips={props.AssetKit.split(',')}></ChipListComponent>
            </div>
          )
    }

    function mailIDTemplate(props):any {
        var src = 'mailto:${MailID}' + props.MailID;
        return (
            <div>
                <a href={src}>{props.MailID}</a>
            </div>
          )
    }

    const template: any = gridTemplate;
    const filterSettings: FilterSettingsModel = {
        type: 'CheckBox',
        operators: {
            stringOperator: [
                { value: 'contains', text: 'Contains' },
                { value: 'doesnotcontain', text: 'Does Not Contains' },
            ],
        },
    };
    let gridInstance;
    let dropInstance;
    const filter = {
        type: 'Menu',
        ui: {
            create: (args) => {
                const flValInput = createElement('input', {
                    className: 'flm-input',
                });
                args.target.appendChild(flValInput);
                let dropdownData = [
                    'Phone',
                    'Mouse',
                    'Laptop',
                    'Keyboard',
                    'Headset',
                    'Tablet',
                    'Projector',
                    'Printer',
                    'Calculator',
                ];
                dropInstance = new MultiSelect({
                    dataSource: dropdownData,
                    placeholder: 'Select a value',
                    popupHeight: '200px',
                    allowFiltering: true,
                    mode: 'Box',
                });
                dropInstance.appendTo(flValInput);
            },
            write: (args) => {
                if (args.filteredValue && args.filteredValue.length > 0) {
                    dropInstance.value = args.filteredValue.split(', ');
                }
            },
            read: (args) => {
                gridInstance.removeFilteredColsByField(args.column.field);
                if (dropInstance?.value && dropInstance?.value.length) {
                    args.fltrObj.filterByColumn(
                        args.column.field,
                        args.operator,
                        dropInstance?.value.sort().join(', ')
                    );
                }
            },
        },
    };
    return (
        <div className='control-pane'>
            <div className='control-section'>
                <GridComponent ref={(grid) => (gridInstance = grid)} dataSource={employeeDetail} width='auto' height='359' allowSorting={true} allowFiltering={true} filterSettings={filterSettings}>
                    <ColumnsDirective>
                        <ColumnDirective headerText='Image' width='180' template={template} textAlign='Center' />
                        <ColumnDirective field='EmployeeID' headerText='ID' width='160'/>
                        <ColumnDirective field='Name' headerText='Name' width='120' />
                        <ColumnDirective field='MailID' headerText='Email ID' width='150' template={mailIDTemplate}/>
                        <ColumnDirective field='DateOfJoining' headerText='Date Joined' width='170' textAlign='Right' format='yMd' type='date'/>
                        <ColumnDirective field='Designation' headerText='Designation' width='160'/>
                        <ColumnDirective field='Team' headerText='Team(s)' width='160'/>
                        <ColumnDirective field='ReportTo' headerText='Reporter' width='120'/>
                        <ColumnDirective field='EmployeeAvailability' headerText='Availability' width='200' template={statusTemplate}/>
                        <ColumnDirective field='YearOfExperience' headerText='Experience' width='180'/>
                        <ColumnDirective field='AssetKit' headerText='Asset Kit' width='180' template={assetTemplate} filter={filter}/>
                        <ColumnDirective field='AssetKitDistribution' headerText='Assigned Date' width='170' format='yMd' textAlign='Right' type='date'/>
                        <ColumnDirective field='Location' headerText='Location' width='150'template={locationTemplate}/>
                        <ColumnDirective field='PhoneNumber' headerText='Contact No' width='150' textAlign='Right'/>
                    </ColumnsDirective>
                    <Inject services={[Sort, Filter]} />
                </GridComponent>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the usage of template columns in a Grid. In this sample, custom images are shown in the Employee
                Image column.
                </p>

            </div>
            <div id='description'>
            <p>
                The Grid creates a custom layout for each cell using the column template feature. The 
                <code><a target="_blank" className="code"
                href="https://ej2.syncfusion.com/react/documentation/api/grid/column/#template">columns-&gt;template
                </a></code> property accepts either string or HTML element`s ID value, which will be used 
                as the template for the cell.  
            </p>
            <p>
                The column template feature allows the customization of grid cells. In this demo, the Grid showcases the <strong>Employee Image</strong>
                column with employee photos, <strong>Mail ID</strong> column with link tags, <strong>Location</strong> column with location icons, <strong>Asset Kit</strong> column with Syncfusion<sup>®</sup> Chip components and <strong>Employee Availability</strong> column with HTML span elements, using green to indicate available and red to indicate for not available.
            </p>
            <p>
                More information on the column template can be found in this
                <a target="_blank" 
                href="https://ej2.syncfusion.com/react/documentation/grid/columns/column-template">
                documentation section</a>.
            </p>

            </div>
        </div>
    )
}
export default ColumnTemplate;
