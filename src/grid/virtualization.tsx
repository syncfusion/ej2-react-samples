import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, VirtualScroll, Edit, Toolbar, LoadEventArgs } from '@syncfusion/ej2-react-grids';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { SampleBase } from '../common/sample-base';
import { createVirtualOrderData, virtualOrderData } from './data';
import { RatingComponent } from '@syncfusion/ej2-react-inputs';
import './virtualization.css';

export class Virtualization extends SampleBase<{}, {}> {
    public grid: GridComponent;
    public date1: number;
    public date2: number;
    public flag: boolean = true;
    public enableVirtualization: boolean = true;
    public loadButton: ButtonComponent | null = null;
    public data: Object[] = [];
    public toolbarOptions: any = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    public editSettings: any = { allowEditing: true, allowDeleting: true, newRowPosition: 'Top' };
    public validationSno: Object = { required: true, digits: true };
    public validationRule: Object = { required: true };
    public ratingTemplate = (props: any) => {
        return (<div><RatingComponent value={props.Rating} cssClass={'custom-rating'} readOnly={true} /></div>);
    }
    public paymentMethodTemplate = (props: any): any => {
        return (
            <div className="e-payment-info">
                <img
                    src={`src/grid/images/payment/${props.PaymentMethod}.svg`}
                    alt={props.PaymentMethod}
                />
                <span>{props.PaymentMethod}</span>
            </div>
        );
    };
    public orderStatusTemplate = (props: any): any => {
        if (props.OrderStatus === "Delivered") {
            return (
                <div className="virtual-statustemp e-deliveredcolor">
                    <span className="virtual-statustxt e-deliveredcolor">Delivered</span>
                </div>
            );
        }
        if (props.OrderStatus === "Shipped") {
            return (
                <div className="virtual-statustemp e-shippedcolor">
                    <span className="virtual-statustxt e-shippedcolor">Shipped</span>
                </div>
            );
        }
        if (props.OrderStatus === "Packed") {
            return (
                <div className="virtual-statustemp e-packedcolor">
                    <span className="virtual-statustxt e-packedcolor">Packed</span>
                </div>
            );
        }
        if (props.OrderStatus === "Processing") {
            return (
                <div className="virtual-statustemp e-processingcolor">
                    <span className="virtual-statustxt e-processingcolor">Processing</span>
                </div>
            );
        }
        if (props.OrderStatus === "Canceled") {
            return (
                <div className="virtual-statustemp e-cancelcolor">
                    <span className="virtual-statustxt e-cancelcolor">Canceled</span>
                </div>
            );
        }
        if (props.OrderStatus === "Returned") {
            return (
                <div className="virtual-statustemp e-returnedcolor">
                    <span className="virtual-statustxt e-returnedcolor">Returned</span>
                </div>
            );
        }
        if (props.OrderStatus === "Ordered") {
            return (
                <div className="virtual-statustemp e-orderedcolor">
                    <span className="virtual-statustxt e-orderedcolor">Ordered</span>
                </div>
            );
        }
    };
    public priorityTemplate = (props: any): any => {
        if (props.Priority === "High") {
            return (
                <div className="virtual-statustemp e-highcolor">
                    <span className="virtual-statustxt e-highcolor">High</span>
                </div>
            );
        }
        if (props.Priority === "Low") {
            return (
                <div className="virtual-statustemp e-lowcolor">
                    <span className="virtual-statustxt e-lowcolor">Low</span>
                </div>
            );
        }
        if (props.Priority === "Medium") {
            return (
                <div className="virtual-statustemp e-mediumcolor">
                    <span className="virtual-statustxt e-mediumcolor">Medium</span>
                </div>
            );
        }
        if (props.Priority === "Critical") {
            return (
                <div className="virtual-statustemp e-criticalcolor">
                    <span className="virtual-statustxt e-criticalcolor">Critical</span>
                </div>
            );
        }
    };
    public paymentStatusTemplate = (props: any): any => {
        if (props.PaymentStatus === "Paid") {
            return (
                <div className="virtual-statustemp e-paidcolor">
                    <span className="virtual-statustxt e-paidcolor">Paid</span>
                </div>
            );
        }
        if (props.PaymentStatus === "Pending") {
            return (
                <div className="virtual-statustemp e-pendingcolor">
                    <span className="virtual-statustxt e-pendingcolor">Pending</span>
                </div>
            );
        }
        if (props.PaymentStatus === "Refunded") {
            return (
                <div className="virtual-statustemp e-refundcolor">
                    <span className="virtual-statustxt e-refundcolor">Refunded</span>
                </div>
            );
        }
        if (props.PaymentStatus === "Failed") {
            return (
                <div className="virtual-statustemp e-failedcolor">
                    <span className="virtual-statustxt e-failedcolor">Failed</span>
                </div>
            );
        }
    };
    public onclick() {
        this.loadButton.disabled = true;
        if (!this.data.length) {
            this.show();
            createVirtualOrderData();
            this.date1 = new Date().getTime();
            this.grid.dataSource = this.data = virtualOrderData;
            this.grid.editSettings.allowAdding = true;
        }
    }
    public show() {
        document.getElementById('popup').style.display = 'inline-block';
    }
    public hide() {
        if (this.flag && this.date1) {
            this.date2 = new Date().getTime();
            document.getElementById('performanceTime').innerHTML = 'Time Taken: ' + (this.date2 - this.date1) + 'ms';
            this.flag = false;
        }
        document.getElementById('popup').style.display = 'none';
    }
    public load(args: LoadEventArgs) {
        if (this.enableVirtualization) {
            args.enableSeamlessScrolling = true;
        }
    }
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div className='div-button'>
                        <ButtonComponent cssClass={'e-info'} ref={(btn) => { this.loadButton = btn; }} onClick={this.onclick.bind(this)}>Load 100K Data</ButtonComponent>
                        <span id="popup">
                            <span id="gif" className="imagepop"></span>
                        </span>
                        <span id="performanceTime">Time Taken: 0 ms</span>
                    </div>
                    <GridComponent id="VirtualScroll" dataSource={[]} enableVirtualization={this.enableVirtualization} clipMode='EllipsisWithTooltip' enableColumnVirtualization={true} height={400} rowHeight={50}
                        ref={g => this.grid = g} dataBound={this.hide.bind(this)} load={this.load.bind(this)} toolbar={this.toolbarOptions} editSettings={this.editSettings}>
                        <ColumnsDirective>
                            <ColumnDirective field="OrderID" headerText="Order ID" width={110} isPrimaryKey={true} validationRules={{ required: true }} />
                            <ColumnDirective field="OrderDate" headerText="Order Date" width={140} format="yMd" textAlign="Right" editType="datepickeredit" />
                            <ColumnDirective field="ShipDate" headerText="Ship Date" width={140} format="yMd" textAlign="Right" editType="datepickeredit" />
                            <ColumnDirective field="OrderStatus" headerText="Order Status" width={140} textAlign="Center" editType="dropdownedit" template={this.orderStatusTemplate} validationRules={{ required: true }} />
                            <ColumnDirective field="Priority" headerText="Priority" width={120} textAlign="Center" editType="dropdownedit" template={this.priorityTemplate} validationRules={{ required: true }} />
                            <ColumnDirective field="CustomerName" headerText="Customer Name" width={190} validationRules={{ required: true }} />
                            <ColumnDirective field="CustomerID" headerText="Customer ID" width={110} visible={false} />
                            <ColumnDirective field="Email" headerText="Email" width={200} />
                            <ColumnDirective field="Phone" headerText="Phone Number" width={140} textAlign="Right" />
                            <ColumnDirective field="ShipAddress" headerText="Ship Address" width={180} />
                            <ColumnDirective field="ShipCity" headerText="Ship City" width={120} />
                            <ColumnDirective field="ShipState" headerText="Ship State Code" width={130} />
                            <ColumnDirective field="ShipPostalCode" headerText="Ship Postal Code" width={130} textAlign="Right" />
                            <ColumnDirective field="ShipCountry" headerText="Ship Country" width={150} />
                            <ColumnDirective field="ProductName" headerText="Product Name" width={250} />
                            <ColumnDirective field="ProductID" headerText="Product ID" width={110} visible={false} />
                            <ColumnDirective field="Category" headerText="Category" width={120} />
                            <ColumnDirective field="Warehouse" headerText="Ware house" width={110} visible={false} editType="dropdownedit" />
                            <ColumnDirective field="InventoryCount" headerText="Inventory Count" width={150} textAlign="Right" visible={false} />
                            <ColumnDirective field="Quantity" headerText="Quantity" width={100} textAlign="Right" editType="numericedit" edit={{ params: { showSpinButton: false } }} />
                            <ColumnDirective field="UnitPrice" headerText="Unit Price" width={110} format="C2" textAlign="Right" editType="numericedit" edit={{ params: { showSpinButton: false } }} />
                            <ColumnDirective field="Discount" headerText="Discount (%)" width={120} textAlign="Right" editType="numericedit" edit={{ params: { showSpinButton: false } }} />
                            <ColumnDirective field="Tax" headerText="Tax (%)" width={100} textAlign="Right" editType="numericedit" edit={{ params: { showSpinButton: false } }} />
                            <ColumnDirective field="SubTotal" headerText="Sub Total" width={110} format="C2" textAlign="Right" editType="numericedit" edit={{ params: { showSpinButton: false } }} />
                            <ColumnDirective field="TaxAmount" headerText="Tax Amount" width={110} format="C2" textAlign="Right" editType="numericedit" edit={{ params: { showSpinButton: false } }} />
                            <ColumnDirective field="ShipFee" headerText="Ship Fee" width={120} format="C2" textAlign="Right" editType="numericedit" edit={{ params: { showSpinButton: false } }} />
                            <ColumnDirective field="TotalAmount" headerText="Total Amount" width={120} format="C2" textAlign="Right" editType="numericedit" edit={{ params: { showSpinButton: false } }} />
                            <ColumnDirective field="PaymentMethod" headerText="Payment Method" width={140} editType="dropdownedit" template={this.paymentMethodTemplate} validationRules={{ required: true }} />
                            <ColumnDirective field="PaymentStatus" headerText="Payment Status" width={140} textAlign="Center" editType="dropdownedit" template={this.paymentStatusTemplate} validationRules={{ required: true }} />
                            <ColumnDirective field="Rating" headerText="Delivery Rating" width={160} textAlign="Center" visible={false} template={this.ratingTemplate} editType="dropdownedit" />
                        </ColumnsDirective>
                        <Inject services={[VirtualScroll, Toolbar, Edit]} />
                    </GridComponent>
                </div>
                <div id="action-description">
                    <p>This sample highlights row and column virtualization in the Grid component, allowing efficient rendering and smooth scrolling of large datasets with excellent performance, along with full CRUD support and column templates.
                    </p>
                </div>
                <div id='description'>
                    <p>The virtual scrolling feature in the Grid renders only the rows and columns that are currently visible in the viewport, rather than loading the entire dataset into the DOM. This approach significantly improves performance when working with large data sources by reducing the number of DOM elements.</p>
                    <p>To enable row virtualization, set the
                        <code>enableVirtualization</code>
                        property to <code>true</code>. For column virtualization, set the
                        <code>enableColumnVirtualization</code> property to <code>true</code>. When using virtualization, it is essential to define the <code>height</code>
                        property so that the Grid
                        can accurately calculate the number of visible rows. For seamless scrolling, set <code>args.enableSeamlessScrolling</code> as <code>true</code> in the Grid's <code>load</code> event. This ensures smooth vertical and horizontal transitions, providing a smoother experience during fast scrolling when virtualization is enabled.
                    </p>
                    <p>
                        In this example, click the "Load 100K Data" button to bind a dataset containing 100,000 rows and 30 columns. Then, scroll vertically and horizontally to experience the virtualized rendering in action. Full data editing support is available with the virtualization feature.
                    </p>
                    <p><strong>Injecting Module:</strong></p>
                    <p>Features of the Grid component are organized into individual, feature-specific modules. To use the virtual scrolling functionality, inject the <code>VirtualScroll</code> module into the <code>services</code>.</p>
                    <p>For more detailed information about virtual scrolling, refer to this <a aria-label="API link for documentation" target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/grid/scrolling/virtual-scrolling">documentation.</a></p>
                </div>
            </div>
        )
    }
}