import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, SelectionSettings, Toolbar, Sort, FilterSettingsModel, EditSettingsModel, Filter, Edit } from '@syncfusion/ej2-react-grids';
import { data } from './data';
import { SampleBase } from '../common/sample-base';
import './sample.css';

export class Clipboard extends SampleBase<{}, {}> {

    public selectionsettings: Object = { type: 'Multiple' };
    public filterSettings: FilterSettingsModel = {type: 'Excel'};
    public editSettings: EditSettingsModel = { allowEditing: true, allowAdding: true, allowDeleting: true };
    public customeridRule: Object = { required: true, minLength: 5};
    public orderidRules: Object = { required: true, number: true };
    public freightRules: Object = { required: true, min: 0 };
    public toolbarOptions: any = ['Add', 'Edit', 'Delete', 'Update', 'Cancel', { text: 'Copy', tooltipText: 'Copy', prefixIcon: 'e-copy', id: 'copy' }, { text: 'Copy With Header', tooltipText: 'Copy With Header', prefixIcon: 'e-copy', id: 'copyHeader' }];
    private gridInstance: GridComponent;
    private visible = false;
    private animationSettings: Object = { effect: 'None' };
    private alertDialogInstance: DialogComponent;
    private alertButtons = [{
        // Click the footer buttons to hide the Dialog
        click: () => {
            this.alertDialogInstance.hide();
        },
        buttonModel: { content: 'OK', isPrimary: true }
    }];
    clickHandler(args: any) {
        if(this.gridInstance.getSelectedRecords().length>0) {
            let withHeader: boolean = args.item.id === 'copyHeader' ? true : false;
            this.gridInstance.copy(withHeader);
        } else {
            this.alertDialogInstance.content = args.item.id === 'copyHeader' ? 'Atleast one row should be selected to copy with header' : 'Atleast one row should be selected to copy';
            this.alertDialogInstance.header = args.item.id === 'copyHeader' ? 'Copy with Header' : 'Copy';
            this.alertDialogInstance.show();
        }
    }
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <GridComponent dataSource={data} ref={grid => this.gridInstance = grid} allowSorting={true} enableHover={false} allowPaging={true} pageSettings={{ pageCount: 5 }} selectionSettings={this.selectionsettings} editSettings={this.editSettings} allowFiltering={true} filterSettings={this.filterSettings} toolbar={this.toolbarOptions} toolbarClick={this.clickHandler.bind(this)}>
                        <ColumnsDirective>
                            <ColumnDirective field='OrderID' headerText='Order ID' width='140' textAlign='Right' validationRules={this.orderidRules} isPrimaryKey={true}></ColumnDirective>
                            <ColumnDirective field='CustomerName' headerText='Customer Name' width='150'  validationRules={this.customeridRule}></ColumnDirective>
                            <ColumnDirective field='OrderDate' headerText='Order Date' format='yMd' width='170' editType='datepickeredit'></ColumnDirective>
                            <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='Right' validationRules={this.freightRules} editType='numericedit'></ColumnDirective>
                            <ColumnDirective field='ShipCountry' headerText='Ship Country' width='130' editType='dropdownedit'></ColumnDirective>
                        </ColumnsDirective>
                        <Inject services={[Page, Selection, Toolbar, Sort, Edit, Filter]} />
                    </GridComponent>
                </div>
                <DialogComponent id="alertDialog" header='Copy with Header' visible={this.visible} animationSettings={this.animationSettings} width='300px' content='Atleast one row should be selected to copy with header' ref={alertdialog => this.alertDialogInstance = alertdialog}
            target='.control-section' buttons={this.alertButtons} ></DialogComponent>
                <div id="action-description">
                    <p>This sample demonstrates copy to clipboard functionality of the Grid component. Select rows and click Copy button from
        toolbar to copy content. To copy with header click Copy with header button from toolbar.
    </p>
                </div>
                <div id="description">
                    <p>Selected rows or cells data in the Grid can be copied into the clipboard using the Keyboard shortcuts and <code><a target="_blank" className="code"
                        href="https://ej2.syncfusion.com/react/documentation/api/grid/#copy">copy
        </a></code> method.
            </p>
                    <p>In this demo, selected rows data can be copied into the clipboard using the below Keyboard shortcuts or toolbar interactions.</p>
                    <ul>
                        <li><code>Ctrl + C</code> - Selected rows or cells data without header.</li>
                        <li><code>Ctrl + Shift + H</code> - Selected rows or cells data with header.</li>
                    </ul>
                    <p>More information on the Clipboard feature can be found in this <a target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/grid/clipboard.html">documentation section</a>.
            </p>
                </div>
            </div>
        )
    }
}
