import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Filter, Inject, Group, Sort, Reorder, Edit } from '@syncfusion/ej2-react-grids';
import { categoryData, data } from './data';
import { SampleBase } from '../common/sample-base';

export class Rtl extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section row'>
                    <GridComponent dataSource={data} allowPaging={true} allowFiltering={true} height={365} allowReordering={true}
                        editSettings={{ allowEditing: true, allowAdding: false, allowDeleting: false, mode: 'Normal' }}
                        allowGrouping={true} enableRtl={true} filterSettings={{ type: 'Menu' }} allowSorting={true}
                        pageSettings={{ pageSize: 10, pageCount: 2 }}>
                        <ColumnsDirective>
                            <ColumnDirective field='OrderID' headerText='Order ID' isPrimaryKey={true} width='120' textAlign='Right'></ColumnDirective>
                            <ColumnDirective field='CustomerName' headerText='Customer Name' width='150' textAlign='Left'></ColumnDirective>
                            <ColumnDirective field='OrderDate' editType='datepickeredit' headerText='Order Date' width='130' format='yMd'
                                textAlign='Right' />
                            <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='Right' />
                            <ColumnDirective field='ShipCountry' headerText='Ship Country' width='170' textAlign='Left'></ColumnDirective>
                        </ColumnsDirective>
                        <Inject services={[Page, Group, Sort, Reorder, Edit, Filter]} />
                    </GridComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates the right-to-Left(RTL) alignment in grid component.
    </p>
                </div>

                <div id="description">
                    <p>
                        Right-to-left(RTL) is used to render the component from right to left direction and it can be
        enabled by setting <code> <a target="_blank" className="code"
                            href="https://ej2.syncfusion.com/react/documentation/api/grid/#enablertl">enableRtl
            </a></code> property as true.
        In this demo, you can able to see Group drop area, header, content, pager, filter dialog, etc ... are aligned right to left direction.
    </p>
    <p>
        More information on the RTL can be found in this 
        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/grid/#enablertl">documentation section</a>.
    </p>

                </div>

            </div>
        )
    }
}