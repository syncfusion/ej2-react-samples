import * as React from 'react';
import { ToolbarComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-react-navigations';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Inject } from '@syncfusion/ej2-react-grids';
import { orderDetails } from './data';
import { addClass, removeClass } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import './sample.css';
export class ShowHide extends SampleBase {
    constructor() {
        super(...arguments);
        this.flag = false;
    }
    click(e) {
        if (!this.flag) {
            return;
        }
        let element = e.target;
        if (!element.classList.contains('e-tbar-btn-text') && !element.classList.contains('e-tbar-btn')) {
            return;
        }
        element = (element.tagName === 'BUTTON' ? element.firstElementChild : element);
        this.flag = false;
        let hidden = element.classList.contains('e-ghidden');
        let classFn = hidden ? removeClass : addClass;
        classFn([element], 'e-ghidden');
        if (hidden) {
            this.gridInstance.showColumns(element.innerHTML);
        }
        else {
            this.gridInstance.hideColumns(element.innerHTML);
        }
        this.flag = true;
    }
    dataBound() {
        this.flag = true;
    }
    render() {
        return (<div className='control-pane'>
                <div className='control-section'>
                    <div className='e-statustext'>Select column name to toggle visibility</div>
                    <ToolbarComponent id="toolbar" ref={toolbar => this.ToolbarInstance = toolbar} onClick={this.click.bind(this)}>
                        <ItemsDirective>
                            <ItemDirective text="Order ID"/>
                            <ItemDirective text="Customer Name"/>
                            <ItemDirective text="Freight"/>
                            <ItemDirective text="Order Date"/>
                            <ItemDirective text="Shipped Date"/>
                            <ItemDirective text="Ship Country"/>
                        </ItemsDirective>
                    </ToolbarComponent>
                    <br />
                    <GridComponent dataSource={orderDetails} ref={grid => this.gridInstance = grid} dataBound={this.dataBound.bind(this)} allowPaging={true}>
                        <ColumnsDirective>
                            <ColumnDirective field='OrderID' headerText='Order ID' width='150' textAlign='Right'></ColumnDirective>
                            <ColumnDirective field='CustomerName' headerText='Customer Name' width='170'></ColumnDirective>
                            <ColumnDirective field='OrderDate' headerText='Order Date' width='155' format='yMd' textAlign='Right'/>
                            <ColumnDirective field='Freight' headerText='Freight' width='150' format='C2' textAlign='Right'/>
                            <ColumnDirective field='ShippedDate' headerText='Shipped Date' format='yMd' width='155' textAlign='Right'></ColumnDirective>
                            <ColumnDirective field='ShipCountry' headerText='Ship Country' width='170'></ColumnDirective>
                        </ColumnsDirective>
                        <Inject services={[Page]}/>
                    </GridComponent>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates dynamic show hide columns feature of Grid. Click column name from the toolbar to toggle visibility.
    </p>
                </div>
                <div id='description'>
                    <p>
                        The Grid column can be showed/hidden dynamically using <code><a target='_blank' className='code' href='http://ej2.syncfusion.com/react/documentation/grid/api-grid.html#showcolumns'>
                            ShowColumns</a></code> and <code><a target='_blank' className='code' href='http://ej2.syncfusion.com/react/documentation/grid/api-grid.html#hidecolumns'>
                                hideColumns</a></code> method of the Grid.</p>

                    <p>In this demo, the columns can be showed and hidden by clicking the column name in the toolbar. And the column`s visibility is toggled based on the <code><a target='_blank' className='code' href='http://ej2.syncfusion.com/react/documentation/grid/columns.html#header-text'>
                        columns->headerText</a></code>value.</p>

                    <p>The columns->visible property specifies the visibility of a column. To hide a column at the initial rendering, set the columns->visible property to false.</p>


                </div>
            </div>);
    }
}
