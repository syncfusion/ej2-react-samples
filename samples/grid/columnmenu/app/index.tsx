import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Group, Sort, ColumnMenu, Filter, Page, Inject } from '@syncfusion/ej2-react-grids';
import { GroupSettingsModel, FilterSettingsModel } from '@syncfusion/ej2-react-grids';
import { data } from '../data';
import { SampleBase } from './sample-base';


export class ColumnMenuSample extends SampleBase<{}, {}> {
    public groupOptions: GroupSettingsModel = { showGroupedColumn: true };
    public filterSettings: FilterSettingsModel = { type: 'checkbox' };
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <GridComponent id='gridcomp' dataSource={data.splice(0, 60)} allowPaging={true} allowGrouping={true} allowSorting={true} allowFiltering={true} showColumnMenu={true} groupSettings={this.groupOptions} filterSettings={this.filterSettings} >
                        <ColumnsDirective>
                            <ColumnDirective field='OrderID' headerText='Order ID' width='200' textAlign='right' showInColumnChooser={false}></ColumnDirective>
                            <ColumnDirective field='CustomerName' headerText='Customer Name' width='200' ></ColumnDirective>
                            <ColumnDirective field='ShippedDate' headerText='Shipped Date' width='200' format='yMd' textAlign='right' />
                            <ColumnDirective field='Freight' headerText='Freight' width='150' format='C2' textAlign='right' />
                            <ColumnDirective field='ShipName' headerText='Ship Name' visible={false} width='200'></ColumnDirective>
                            <ColumnDirective field='ShipCountry' headerText='Ship Country' width='200'></ColumnDirective>
                        </ColumnsDirective>
                        <Inject services={[Resize, Group, Sort, ColumnMenu, Filter, Page]} />
                    </GridComponent>
                </div>
            </div>
        )
    }
}
ReactDOM.render(<ColumnMenuSample />, document.getElementById('sample'));