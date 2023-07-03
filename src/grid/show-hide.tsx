import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ToolbarComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-react-navigations';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Inject } from '@syncfusion/ej2-react-grids';
import { orderDetails } from './data';
import { addClass, removeClass } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import './sample.css';

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
        const visibleColumns: HTMLElement[] = Array.from(this.ToolbarInstance.element.getElementsByClassName('e-tbar-btn-text'))
        .filter((item) => !((item as HTMLElement).classList.contains('e-ghidden'))) as HTMLElement[];
        const isLastVisibleColumn = visibleColumns.length === 1 && visibleColumns[0].parentElement === element.parentElement;
      
        if (hidden) {
          classFn([element], 'e-ghidden');
          this.gridInstance.showColumns(element.innerHTML);
        } else {
          if (isLastVisibleColumn) {
            alert("At least one column should be visible.");
            this.flag = true;
            return;
          }
          classFn([element], 'e-ghidden');
          this.gridInstance.hideColumns(element.innerHTML);
        }
        this.flag = true;
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
                    <GridComponent dataSource={orderDetails} ref={grid => this.gridInstance = grid} dataBound={this.dataBound.bind(this)} allowPaging={true} >
                        <ColumnsDirective>
                            <ColumnDirective field='OrderID' headerText='Order ID' width='150' textAlign='Right'></ColumnDirective>
                            <ColumnDirective field='CustomerName' headerText='Customer Name' width='170'></ColumnDirective>
                            <ColumnDirective field='OrderDate' headerText='Order Date' width='155' format='yMd' textAlign='Right' />
                            <ColumnDirective field='Freight' headerText='Freight' width='150' format='C2' textAlign='Right' />
                            <ColumnDirective field='ShippedDate' headerText='Shipped Date' format='yMd' width='155' textAlign='Right' ></ColumnDirective>
                            <ColumnDirective field='ShipCountry' headerText='Ship Country' width='170'></ColumnDirective>
                        </ColumnsDirective>
                        <Inject services={[Page]} />
                    </GridComponent>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates dynamic show hide columns feature of Grid. Click column name from the toolbar to toggle visibility.
    </p>
                </div>
                <div id='description'>
                    <p>
                        The Grid column can be showed/hidden dynamically using <code><a target='_blank' className='code'
                            href='http://ej2.syncfusion.com/react/documentation/grid/api-grid.html#showcolumns'>
                            ShowColumns</a></code> and <code><a target='_blank' className='code'
                                href='http://ej2.syncfusion.com/react/documentation/grid/api-grid.html#hidecolumns'>
                                hideColumns</a></code> method of the Grid.</p>

                    <p>In this demo, the columns can be showed and hidden by clicking the column name in the toolbar. And the column`s visibility is toggled based on the <code><a target='_blank' className='code'
                        href='http://ej2.syncfusion.com/react/documentation/grid/columns.html#header-text'>
                        columns-&gt;headerText</a></code>value.</p>

                    <p>The columns-&gt;visible property specifies the visibility of a column. To hide a column at the initial rendering, set the columns-&gt;visible property to false.</p>


                </div>
            </div>
        )
    }
}