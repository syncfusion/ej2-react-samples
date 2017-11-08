import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, SelectionSettings, Toolbar } from '@syncfusion/ej2-react-grids';
import { data } from '../data';
import { SampleBase } from './sample-base';


export class Clipboard extends SampleBase<{}, {}> {

    public selectionsettings: Object = { type: 'multiple' };
    public toolbarOptions: any = [{ text: 'Copy', tooltipText: 'Copy', prefixIcon: 'e-copy', id: 'copy' }, { text: 'Copy With Header', tooltipText: 'Copy With Header', prefixIcon: 'e-copy', id: 'copyHeader' }];
    private gridInstance: GridComponent;
    clickHandler(args: any) {
        let withHeader: boolean = false;
        if (args.item.id === 'copyHeader') {
            withHeader = true;
        }
        this.gridInstance.copy(withHeader);
    }
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <GridComponent dataSource={data} ref={grid => this.gridInstance = grid} enableHover={false} allowPaging={true} selectionSettings={this.selectionsettings} toolbar={this.toolbarOptions} toolbarClick={this.clickHandler.bind(this)}>
                        <ColumnsDirective>
                            <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign="right"></ColumnDirective>
                            <ColumnDirective field='CustomerName' headerText='Customer Name' width='150'></ColumnDirective>
                            <ColumnDirective field='OrderDate' headerText='Order Date' width='130' format='yMd' textAlign='right' />
                            <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='right' />
                            <ColumnDirective field='ShippedDate' headerText='Shipped Date' width='130' format="yMd" textAlign="right"></ColumnDirective>
                        </ColumnsDirective>
                        <Inject services={[Page, Selection, Toolbar]} />
                    </GridComponent>
                </div>
            </div>
        )
    }
}
ReactDOM.render(<Clipboard />, document.getElementById('sample'));