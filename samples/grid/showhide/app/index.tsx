import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ToolbarComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-react-navigations';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject } from '@syncfusion/ej2-react-grids';
import { data } from '../data';
import { addClass, removeClass } from '@syncfusion/ej2-base';
import { SampleBase } from './sample-base';


export class ShowHide extends SampleBase<{}, {}> {

    public flag: boolean = false;
    private gridInstance: GridComponent;
    private ToolbarInstance: ToolbarComponent;
    public click(e: MouseEvent): void {
        if (!this.flag) { return; }
        let element: HTMLElement = e.target as HTMLElement;

        if (!element.classList.contains('e-tbar-btn-text') && !element.classList.contains('e-tbar-btn')) {
            return;
        }

        element = (element.tagName === 'BUTTON' ? element.firstElementChild : element) as HTMLElement;
        this.flag = false;
        let hidden: boolean = element.classList.contains('e-ghidden');
        let classFn: Function = hidden ? removeClass : addClass;
        classFn([element], 'e-ghidden');

        if (hidden) {
            this.gridInstance.showColumns(element.innerHTML);
        } else {
            this.gridInstance.hideColumns(element.innerHTML);
        }

    }
    public dataBound(): void {
        this.flag = true;
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div className='e-statustext'>Select column name to toggle visibility</div>
                    <ToolbarComponent id="toolbar" ref={toolbar => this.ToolbarInstance = toolbar} onClick={this.click.bind(this)} >
                        <ItemsDirective>
                            <ItemDirective text="Order ID" />
                            <ItemDirective text="Customer Name" />
                            <ItemDirective text="Freight" />
                            <ItemDirective text="Order Date" />
                            <ItemDirective text="Shipped Date" />
                            <ItemDirective text="Ship Country" />
                        </ItemsDirective>
                    </ToolbarComponent>
                    <br />
                    <GridComponent dataSource={data.slice(0, 10)} ref={grid => this.gridInstance = grid} dataBound={this.dataBound.bind(this)} >
                        <ColumnsDirective>
                            <ColumnDirective field='OrderID' headerText='Order ID' width='150' textAlign='right'></ColumnDirective>
                            <ColumnDirective field='CustomerName' headerText='Customer Name' width='170'></ColumnDirective>
                            <ColumnDirective field='OrderDate' headerText='Order Date' width='155' format='yMd' textAlign='right' />
                            <ColumnDirective field='Freight' headerText='Freight' width='150' format='C2' textAlign='right' />
                            <ColumnDirective field='ShippedDate' headerText='Shipped Date' format='yMd' width='155' textAlign='right' ></ColumnDirective>
                            <ColumnDirective field='ShipCountry' headerText='Ship Country' width='170'></ColumnDirective>
                        </ColumnsDirective>
                    </GridComponent>
                </div>
            </div>
        )
    }
}
ReactDOM.render(<ShowHide />, document.getElementById('sample'));