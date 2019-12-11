import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Inject, Edit, Toolbar } from '@syncfusion/ej2-react-treegrid';
import { sampleData } from './data';
import { AutoComplete } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
export class EditTemplate extends SampleBase {
    constructor() {
        super(...arguments);
        this.toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Row',
            newRowPosition: 'Below' };
        this.taskIDRule = { required: true, number: true };
        this.priorityRule = { required: true };
        this.dateRule = { date: true };
        this.durationRule = { number: true, min: 0 };
        this.editparams2 = { params: { format: 'n' } };
        this.editTemplate = {
            create: () => {
                this.elem = document.createElement('input');
                return this.elem;
            },
            read: () => {
                return this.autoCompleteobj.value;
            },
            destroy: () => {
                this.autoCompleteobj.destroy();
            },
            write: (args) => {
                this.autoCompleteobj = new AutoComplete({
                    dataSource: this.treegridObj.grid.dataSource,
                    fields: { value: 'taskName' },
                    value: args.rowData[args.column.field]
                });
                this.autoCompleteobj.appendTo(this.elem);
            }
        };
    }
    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
          <TreeGridComponent dataSource={sampleData} treeColumnIndex={1} childMapping='subtasks' height='400' editSettings={this.editSettings} toolbar={this.toolbarOptions} ref={treegrid => this.treegridObj = treegrid}>
            <ColumnsDirective>
              <ColumnDirective field='taskID' headerText='Task ID' width='80' textAlign='Right' validationRules={this.taskIDRule} isPrimaryKey={true}></ColumnDirective>
              <ColumnDirective field='taskName' headerText='Task Name' width='200' edit={this.editTemplate}></ColumnDirective>
              <ColumnDirective field='startDate' headerText='Start Date' width='140' textAlign='Right' editType='datepickeredit' format='yMd' validationRules={this.dateRule} type='date'/>
              <ColumnDirective field='duration' headerText='Duration' width='90' editType='numericedit' textAlign='Right' validationRules={this.durationRule} edit={this.editparams2}/>
              <ColumnDirective field='progress' headerText='Progress' width='90' textAlign='Right' editType='numericedit' validationRules={this.durationRule} edit={this.editparams2}/>
              <ColumnDirective field='priority' headerText='Priority' width='90' textAlign='Right' editType='stringedit' validationRules={this.priorityRule}/>
            </ColumnsDirective>
            <Inject services={[Edit, Toolbar]}/>
          </TreeGridComponent>
        </div>
        <div id="action-description">
        <p>
            This samples demonstrates the TreeGrid Cell Edit template feature. Using Cell Edit Template feature we have rendered
              the AutoComplete component for “<b>Task Name</b>” column.
        </p>
    </div>
    <div id="description">
        <p>
            The cell edit template is used to add a custom component for a particular column by invoking the following functions:
        </p>
        <ul>
            <li><code>create</code> - It is used to create the element at the time of initialization.</li>
            <li><code>write</code> - It is used to create the custom component or assign default value at the time of editing.</li>
            <li><code>read</code> - It is used to read the value from the component at the time of save.</li>
            <li><code>destroy</code> - It is used to destroy the component.</li>
        </ul>
        <p>
            In this demo, we have rendered the AutoComplete component for “Task Name” column of TreeGrid using <code>edit</code> property.
        </p>
        <p>
        <br /> More information about Cell Edit template can be found in this documentation section.
        </p>
        </div>
      </div>);
    }
}
