import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, VirtualScroll, Edit, Toolbar, LoadEventArgs } from '@syncfusion/ej2-react-grids';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { updateSampleSection } from '../common/sample-base';
import { createVirtualOrderData, virtualOrderData } from './data';
import { RatingComponent } from '@syncfusion/ej2-react-inputs';
import './virtualization.css';

// custom code end
function Virtualization() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    // custom code start
    let grid: GridComponent;
    let date1: number;
    let date2: number;
    let flag: boolean = true;
    let enableVirtualization: boolean = true;
    let loadButton: ButtonComponent | null = null;
    let data: Object[] = [];
    const toolbarOptions: any = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    const editSettings: any = { allowEditing: true, allowDeleting: true, newRowPosition: 'Top' };
    const validationSno: Object = { required: true, digits: true };
    const validationRule: Object = { required: true };

    function ratingTemplate(props: any) {
        return (<div><RatingComponent value={props.Rating} cssClass={'custom-rating'} readOnly={true} /></div>);
    }
    function paymentMethodTemplate(props: any) {
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
    function orderStatusTemplate(props: any) {
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
    function priorityTemplate(props: any) {
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
    function paymentStatusTemplate(props: any) {
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

    function onclick() {
        loadButton.disabled = true;
        if (!data.length) {
            show();
            createVirtualOrderData();
            date1 = new Date().getTime();
            grid.dataSource = data = virtualOrderData;
            grid.editSettings.allowAdding = true;
        }
    }
    function show() {
        document.getElementById('popup').style.display = 'inline-block';
    }
    function hide() {
        if (flag && date1) {
            date2 = new Date().getTime();
            document.getElementById('performanceTime').innerHTML = 'Time Taken: ' + (date2 - date1) + 'ms';
            flag = false;
        }
        document.getElementById('popup').style.display = 'none';
    }
    function load(args: LoadEventArgs) {
        if (enableVirtualization) {
            args.enableSeamlessScrolling = true;
        }
    }

    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div className='div-button'>
                    <ButtonComponent cssClass={'e-info'} ref={(btn) => { loadButton = btn; }} onClick={onclick.bind(this)}>Load 100K Data</ButtonComponent>
                    <span id="popup">
                        <span id="gif" className="imagepop"></span>
                    </span>
                    <span id="performanceTime">Time Taken: 0 ms</span>
                </div>
                <GridComponent id="VirtualScroll" dataSource={[]} enableVirtualization={enableVirtualization} clipMode='EllipsisWithTooltip' enableColumnVirtualization={true} height={400}
                    ref={g => grid = g} dataBound={hide.bind(this)} load={load.bind(this)} toolbar={toolbarOptions} editSettings={editSettings} rowHeight={50}>
                    <ColumnsDirective>
                        <ColumnDirective field="OrderID" headerText="Order ID" width={110} isPrimaryKey={true} validationRules={{ required: true }} />
                        <ColumnDirective field="OrderDate" headerText="Order Date" width={140} format="yMd" textAlign="Right" editType="datepickeredit" />
                        <ColumnDirective field="ShipDate" headerText="Ship Date" width={140} format="yMd" textAlign="Right" editType="datepickeredit" />
                        <ColumnDirective field="OrderStatus" headerText="Order Status" width={140} textAlign="Center" editType="dropdownedit" template={orderStatusTemplate} validationRules={{ required: true }} />
                        <ColumnDirective field="Priority" headerText="Priority" width={120} textAlign="Center" editType="dropdownedit" template={priorityTemplate} validationRules={{ required: true }} />
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
                        <ColumnDirective field="Warehouse" headerText="Ware house" width={110} editType="dropdownedit" visible={false}/>
                        <ColumnDirective field="InventoryCount" headerText="Inventory Count" width={150} textAlign="Right" visible={false} />
                        <ColumnDirective field="Quantity" headerText="Quantity" width={100} textAlign="Right" editType="numericedit" edit={{ params: { showSpinButton: false } }} />
                        <ColumnDirective field="UnitPrice" headerText="Unit Price" width={110} format="C2" textAlign="Right" editType="numericedit" edit={{ params: { showSpinButton: false } }} />
                        <ColumnDirective field="Discount" headerText="Discount (%)" width={120} textAlign="Right" editType="numericedit" edit={{ params: { showSpinButton: false } }} />
                        <ColumnDirective field="Tax" headerText="Tax (%)" width={100} textAlign="Right" editType="numericedit" edit={{ params: { showSpinButton: false } }} />
                        <ColumnDirective field="SubTotal" headerText="Sub Total" width={110} format="C2" textAlign="Right" editType="numericedit" edit={{ params: { showSpinButton: false } }} />
                        <ColumnDirective field="TaxAmount" headerText="Tax Amount" width={110} format="C2" textAlign="Right" editType="numericedit" edit={{ params: { showSpinButton: false } }} />
                        <ColumnDirective field="ShipFee" headerText="Ship Fee" width={120} format="C2" textAlign="Right" editType="numericedit" edit={{ params: { showSpinButton: false } }} />
                        <ColumnDirective field="TotalAmount" headerText="Total Amount" width={120} format="C2" textAlign="Right" editType="numericedit" edit={{ params: { showSpinButton: false } }} />
                        <ColumnDirective field="PaymentMethod" headerText="Payment Method" width={140} editType="dropdownedit" template={paymentMethodTemplate} validationRules={{ required: true }} />
                        <ColumnDirective field="PaymentStatus" headerText="Payment Status" width={140} textAlign="Center" editType="dropdownedit" template={paymentStatusTemplate} validationRules={{ required: true }} />
                        <ColumnDirective field="Rating" headerText="Delivery Rating" width={160} textAlign="Center" visible={false} template={ratingTemplate} editType="dropdownedit" />
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
export default Virtualization;