import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
    GridComponent, ColumnsDirective, ColumnDirective, Page, Toolbar, Sort,
    Edit, Inject, DialogEditEventArgs, FilterSettingsModel, Filter
} from '@syncfusion/ej2-react-grids';
import { updateSampleSection } from '../common/sample-base';
import { data as orderData } from './data';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { DataUtil } from '@syncfusion/ej2-data';
import { Browser, extend, isNullOrUndefined } from '@syncfusion/ej2-base';
import './dialog-temp.css';

function DialogTemplate() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    const filterSettings: FilterSettingsModel = {type: 'Excel'};
    const toolbarOptions: any = ['Add', 'Edit', 'Delete'];
    const editSettings: any = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog', template: dialogTemplate };
    const validationRules = { required: true };
    const orderidRules: Object = { required: true, number: true };
    const pageSettings: Object = { pageCount: 5 };

    function dialogTemplate(props: IOrderModel): any {
        return (<DialogFormTemplate {...props} />);
    }

    function actionComplete(args: DialogEditEventArgs): void {
        if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
            if (Browser.isDevice) {
                args.dialog.height = window.innerHeight - 90 + 'px';
                (args.dialog as any).dataBind();
            }
        }
    }
    return (
        <div className='control-pane'>
            <div className='control-section'>
                <GridComponent dataSource={orderData} toolbar={toolbarOptions} allowSorting={true} allowFiltering={true} filterSettings={filterSettings} allowPaging={true} editSettings={editSettings} pageSettings={pageSettings}
                    actionComplete={actionComplete.bind(this)}>
                    <ColumnsDirective>
                        <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='Right' validationRules={orderidRules} isPrimaryKey={true}></ColumnDirective>
                        <ColumnDirective field='CustomerName' headerText='Customer Name' width='150' validationRules={validationRules}></ColumnDirective>
                        <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='Right'></ColumnDirective>
                        <ColumnDirective field='OrderDate' headerText='Order Date' format='yMd' width='170' ></ColumnDirective>
                        <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150' ></ColumnDirective>
                    </ColumnsDirective>
                    <Inject services={[Page, Toolbar, Edit, Sort, Filter]} />
                </GridComponent>

                <div id="action-description">
                    <p>This sample demonstrates CRUD operations in Grid with <code>Dialog Template</code> feature. You can perform CRUD operations as follows,</p>
                    <ul>
                        <li><code>Add</code> -  To add new record, click Add toolbar button </li>
                        <li><code>Edit</code> - To edit record, double click a row or click toolbar Edit button after selected a row </li>
                        <li><code>Delete</code> - To delete record, click toolbar Delete button after selected a row </li>
                        <li><code>Update</code>,<code>Cancel</code> - You can save or discard changes by click toolbar Update and cancel button respectively</li>
                    </ul>
                </div>
                <div id="description">
                    <p> The Grid supports CRUD operations. This CRUD operations can be configured in Grid using
                        <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/grid/editSettings/">
                            editSettings</a></code>.
                    </p>
                    <p>
                        In this demo, Dialog template is enabled for editing
                        by defining <code><a target="_blank" className="code"
                            href="https://ej2.syncfusion.com/react/documentation/api/grid/editSettings/#mode">
                            editSettings.mode
                        </a></code> as <code>Dialog</code> and <code><a target="_blank" className="code"
                            href="https://ej2.syncfusion.com/react/documentation/api/grid/editSettings/#template">
                            editSettingsTemplate </a></code> as a React template.
                        You can start editing by double clicking a row or clicking on toolbar's <code>Edit</code> button,
                        then the currently selected row will be shown on a dialog with custom elements and you can change the row values and save edited data to the datasource.
                    </p>
                    <p style={{ fontWeight: 500 }}>Injecting Module:</p>
                    <p>
                        Grid features are segregated into individual feature-wise modules. To use editing feature, we need to inject
                        <code><a target="_blank" className="code"
                            href="https://ej2.syncfusion.com/react/documentation/api/grid/edit/">
                            Edit
                        </a></code> module into the <code>services</code>.
                    </p>
                </div>
            </div>
        </div>
    );
}

function DialogFormTemplate(props) {
    React.useEffect(() => {
        let states: IOrderModel = val;
        // Set initail Focus
        states.isAdd ? orderID.focus() : customerName.focus();
    }, [])
    const shipCityDistinctData: any = DataUtil.distinct(orderData, 'ShipCity', true);
    const shipCountryDistinctData: any = DataUtil.distinct(orderData, 'ShipCountry', true);
    let orderID: HTMLInputElement;
    let customerName: HTMLInputElement;
    const [val, setval] = React.useState(extend({}, {}, props, true));
    function onChange(args: any): void {
        let key: string = args.target.name;
        let value: string = args.target.value;
        setval(prevVal => ({ ...prevVal, [key]: value }));
    }
    let data: IOrderModel = val;
    // react warning error purpose
    if (data.isAdd) {
        let keys: string[] = Object.keys(data);
        for (let i: number = 0; i < keys.length; i++) {
            if (data[keys[i]] !== 'isAdd' && isNullOrUndefined(data[keys[i]])) {
              data[keys[i]] = '';
            }
        }
    }
    return (<div>
        <div className="form-row">
            <div className="form-group col-md-6">
                <div className="e-float-input e-control-wrapper">
                    <input ref={input => orderID = input} id="OrderID" name="OrderID" type="text" disabled={!data.isAdd} value={data.OrderID} onChange={onChange.bind(this)} />
                    <span className="e-float-line"></span>
                    <label className="e-float-text e-label-top"> Order ID</label>
                </div>
            </div>
            <div className="form-group col-md-6">
                <div className="e-float-input e-control-wrapper" >
                    <input ref={input => customerName = input} value={data.CustomerName} id="CustomerName" name="CustomerName" type="text" onChange={onChange.bind(this)} />
                    <span className="e-float-line"></span>
                    <label className="e-float-text e-label-top">Customer Name</label>
                </div>
            </div>
        </div>
        <div className="form-row">
            <div className="form-group col-md-6">
                <NumericTextBoxComponent id="Freight" format='C2' value={data.Freight} placeholder="Freight" floatLabelType='Always'></NumericTextBoxComponent>
            </div>
            <div className="form-group col-md-6">
                <DatePickerComponent id="OrderDate" value={data.OrderDate} placeholder="Order Date" floatLabelType='Always'></DatePickerComponent>
            </div>
        </div>
        <div className="form-row">
            <div className="form-group col-md-6">
                <DropDownListComponent id="ShipCountry" value={data.ShipCountry} dataSource={shipCountryDistinctData}
                    fields={{ text: 'ShipCountry', value: 'ShipCountry' }} placeholder="Ship Country"
                    popupHeight='300px' floatLabelType='Always'></DropDownListComponent>
            </div>
            <div className="form-group col-md-6">
                <DropDownListComponent id="ShipCity" value={data.ShipCity} dataSource={shipCityDistinctData}
                    fields={{ text: 'ShipCity', value: 'ShipCity' }} placeholder="Ship City"
                    popupHeight='300px' floatLabelType='Always'></DropDownListComponent>
            </div>
        </div>
        <div className="form-row">
            <div className="form-group col-md-12">
                <div className="e-float-input e-control-wrapper">
                    <textarea id="ShipAddress" name="ShipAddress" value={data.ShipAddress} onChange={onChange.bind(this)} ></textarea>
                    <span className="e-float-line"></span>
                    <label className="e-float-text e-label-top">Ship Address</label>
                </div>
            </div>
        </div>
    </div>);
}

export interface IOrderModel {
    OrderID?: number;
    CustomerName?: string;
    Freight?: number;
    OrderDate?: Date;
    ShipCity?: string;
    ShipCountry?: string;
    ShipAddress?: string;
    isAdd?: boolean;
}
export default DialogTemplate;