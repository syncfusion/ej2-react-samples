import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Toolbar,
    Edit, Inject, DialogEditEventArgs } from '@syncfusion/ej2-react-grids';
import { SampleBase } from '../common/sample-base';
import { data as orderData } from './data';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { DataUtil } from '@syncfusion/ej2-data';
import { Browser, extend } from '@syncfusion/ej2-base';
import './dialog-temp.css';

export class DialogTemplate extends SampleBase<{}, {}> {
  public toolbarOptions: any = ['Add', 'Edit', 'Delete'];
  public editSettings: any = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog', template: this.dialogTemplate };
  public validationRules = { required: true };
  public pageSettings: Object = {pageCount: 5};

  dialogTemplate(props: IOrderModel): any {
      return (<DialogFormTemplate {...props} />);
  }

  actionComplete(args: DialogEditEventArgs): void {
    if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
        if (Browser.isDevice) {
            args.dialog.height = window.innerHeight - 90 + 'px';
            (args.dialog as any).dataBind();
        }
    }
  }

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GridComponent dataSource={orderData} toolbar={this.toolbarOptions} allowPaging={true} editSettings={this.editSettings} pageSettings={this.pageSettings}
            actionComplete={this.actionComplete.bind(this)}>
            <ColumnsDirective>
              <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='Right' validationRules={this.validationRules} isPrimaryKey={true}></ColumnDirective>
              <ColumnDirective field='CustomerName' headerText='Customer Name' width='150' validationRules={this.validationRules}></ColumnDirective>
              <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='Right'></ColumnDirective>
              <ColumnDirective field='OrderDate' headerText='Order Date' format='yMd' width='170' ></ColumnDirective>
              <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150' ></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Page, Toolbar, Edit]} />
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
                <code><a target="_blank" className="code" href="http://ej2.syncfusion.com/react/documentation/grid/api-editSettings.html">
                editSettings</a></code>.
            </p>
            <p>
                In this demo, Dialog template is enabled for editing
                by defining <code><a target="_blank" className="code"
                href="http://ej2.syncfusion.com/documentation/grid/api-editSettings.html#mode-string">
                editSettings.mode
                </a></code> as <code>Dialog</code> and <code><a target="_blank" className="code"
                href="http://ej2.syncfusion.com/documentation/grid/api-editSettings.html#mode-string">
                editSettingsTemplate </a></code> as a React template.
                You can start editing by double clicking a row or clicking on toolbar's <code>Edit</code> button,
                then the currently selected row will be shown on a dialog with custom elements and you can change the row values and save edited data to the datasource.
            </p>
            <p style={{ fontWeight: 500 }}>Injecting Module:</p>
            <p>
                Grid features are segregated into individual feature-wise modules. To use editing feature, we need to inject
                <code><a target="_blank" className="code"
                href="http://ej2.syncfusion.com/react/documentation/grid/api-edit.html">
                Edit
                </a></code> module into the <code>services</code>.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export class DialogFormTemplate extends React.Component<{}, {}> {
    private shipCityDistinctData: any = DataUtil.distinct(orderData, 'ShipCity', true);
    private shipCountryDistinctData: any = DataUtil.distinct(orderData, 'ShipCountry', true );
    private orderID: HTMLInputElement;
    private customerName: HTMLInputElement;

    constructor(props) {
        super(props);
        this.state = extend({}, {}, props, true);
    }

    onChange(args: any): void {
        let key: string = args.target.name;
        let value: string = args.target.value;
        this.setState({[key]: value});
    }
    componentDidMount() {
        let state: IOrderModel = this.state;
        // Set initail Focus
        state.isAdd ? this.orderID.focus() : this.customerName.focus();
    }
    render(): any {
        let data: IOrderModel = this.state;
        return (<div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <div className="e-float-input e-control-wrapper">
                        <input ref={input=> this.orderID =  input} id="OrderID" name="OrderID" type="text" disabled={!data.isAdd} value={data.OrderID} onChange={this.onChange.bind(this)} />
                        <span className="e-float-line"></span>
                        <label className="e-float-text e-label-top"> Order ID</label>
                    </div>
                </div>
                <div className="form-group col-md-6">
                    <div className="e-float-input e-control-wrapper" >
                        <input ref={input=> this.customerName =  input} value={data.CustomerName} id="CustomerName" name="CustomerName" type="text" onChange={this.onChange.bind(this)} />
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
                    <DropDownListComponent id="ShipCountry" value={data.ShipCountry} dataSource={this.shipCountryDistinctData}
                    fields={{text: 'ShipCountry', value: 'ShipCountry' }} placeholder="Ship Country"
                    popupHeight='300px' floatLabelType='Always'></DropDownListComponent>
                </div>
                <div className="form-group col-md-6">
                    <DropDownListComponent id="ShipCity" value={data.ShipCity} dataSource={this.shipCityDistinctData}
                    fields={{text: 'ShipCity', value: 'ShipCity' }} placeholder="Ship City"
                    popupHeight='300px' floatLabelType='Always'></DropDownListComponent>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-12">
                    <div className="e-float-input e-control-wrapper">
                        <textarea id="ShipAddress" name="ShipAddress" value={data.ShipAddress} onChange={this.onChange.bind(this)} ></textarea>
                        <span className="e-float-line"></span>
                        <label className="e-float-text e-label-top">Ship Address</label>
                    </div>
                </div>
            </div>
        </div>);
    }
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
