import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Group, Edit, Toolbar, Sort, Inject } from '@syncfusion/ej2-react-grids';
import { orderDataSource } from './data';
import { SampleBase } from '../common/sample-base';
import { DialogComponent } from '@syncfusion/ej2-react-popups';

let refresh: Boolean;
export class Grouping extends SampleBase<{}, {}> {
    public toolbarOptions: any = ['Edit', 'Update', 'Cancel'];
    public editSettings: any = { allowEditing: true };
    public editparams: any = { params: { popupHeight: '300px' } };
    public validationRule: Object = { required: true};
    public orderidRules: Object = { required: true, number: true };
    public format: any = {type:'dateTime',format:'M/d/y hh:mm a'};

    public groupOptions: Object = { showGroupedColumn: false, columns: ['ShipCountry'] };
    private gridInstance: GridComponent;
    private visible = false;
    private animationSettings: Object = { effect: 'None' };
    private alertDialogInstance: DialogComponent;
    private alertButtons = [{
        click: () => {  
            this.alertDialogInstance.hide();
        },
        buttonModel: { content: 'OK', isPrimary: true }
    }];
    public dataBound() {
        if(refresh) {
            this.gridInstance.groupColumn('ShipCountry');
            refresh = false;
        }
    }
    public load() {
        refresh = (this as any).refreshing;
    }
    public columnDragStart(args: any) {
        if (args.column.field === 'OrderDate') {
            this.alertDialogInstance.show();
        }
    }
    public created() {
        this.gridInstance.on('columnDragStart', this.columnDragStart, this);
    }
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <GridComponent dataSource={orderDataSource} allowPaging={true} ref={ grid => this.gridInstance = grid} toolbar={this.toolbarOptions} pageSettings={{ pageCount: 5 }} editSettings={this.editSettings} allowGrouping={true} groupSettings={this.groupOptions} allowSorting={true} height="320"
                    dataBound={this.dataBound.bind(this)} load={this.load} created={this.created}>
                        <ColumnsDirective>
                            <ColumnDirective field='OrderID' headerText='Order ID' width='140' textAlign='Right' validationRules={this.orderidRules} isPrimaryKey={true}></ColumnDirective>
                            <ColumnDirective field='CustomerName' headerText='Customer Name' width='150' validationRules={this.validationRule}></ColumnDirective>
                            <ColumnDirective field='Freight' headerText='Freight' width='140' format='C2' textAlign='Right' editType='numericedit' ></ColumnDirective>
                            <ColumnDirective field='OrderDate' headerText='Order Date' editType='datetimepickeredit' allowGrouping={false} format= {this.format} width='160' ></ColumnDirective>
                            <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150' editType='dropdownedit' edit={this.editparams} ></ColumnDirective>
                        </ColumnsDirective>
                        <Inject services={[Page, Group, Sort, Edit, Toolbar]} />
                    </GridComponent>
                    <DialogComponent id="alertDialog" header='Grouping' visible={this.visible} animationSettings={this.animationSettings} width='300px' content='Grouping is disabled for this column' ref={alertdialog => this.alertDialogInstance = alertdialog} target='.control-section' buttons={this.alertButtons} ></DialogComponent>
                    <div className="e-dsalign">Source:
                    <a href="https://en.wikipedia.org/wiki/List_of_prolific_inventors" target='_blank'>Wikipedia: List of Prolific inventors</a>
                    </div>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates grouping feature of the Grid component. In this sample, the Grid data is grouped against
                    ShipCountry column. To group any other column simply drag the column header and drop on the group drop area.</p>
                </div>
                <div id='description'>
                    <p>The Grid control has options to group the records based on the required column. When grouping is applied, grouped
            records are organized into a hierarchical structure to facilitate easier expansion and collapse of records. To enable
            grouping, set <code><a target='_blank' className='code'
                            href="https://ej2.syncfusion.com/react/documentation/api/grid/#allowgrouping">
                            allowGrouping</a></code> property as true.</p>
                    <p>Columns can be grouped by simply dragging the column header and drop on the group drop area.</p>
                    <p>In this demo, to group a specify column, drag and drop the column in the group drop area.</p>
                    <p>
                        In this demo, editing options can be enabled by setting <code>editSettings.allowEditing</code> as <code>true</code>.
                        You can start editing by double-clicking a row or the toolbar `Edit` button. 
                        Once in edit mode, you have the ability to modify the values of the selected row. 
                        When saving the record, the Grid will refresh the specific edited row without affecting the expanded group state.
                    </p>
                    <p style={{ fontWeight: 500 }}>Injecting Module:</p>
                    <p>
                        Grid component features are segregated into individual feature-wise modules. To use grouping and editing features, we need to inject
            <code>Group</code>, <code>Edit</code> modules into the <code>services</code>.
        </p>
                    <p>
                        More information on the grouping feature configuration can be found in this
            <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/grid/#groupsettings"> documentation section</a>.
        </p>
                </div>
            </div>
        )
    }
}
