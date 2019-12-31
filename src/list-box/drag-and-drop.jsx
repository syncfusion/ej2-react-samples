import * as React from 'react';
import { ListBoxComponent } from '@syncfusion/ej2-react-dropdowns';
import { DataManager } from '@syncfusion/ej2-data';
import { SampleBase } from '../common/sample-base';
import * as data from './dataSource.json';
import './drag-and-drop.css';
export class DragAndDrop extends SampleBase {
    constructor() {
        super(...arguments);
        this.dataA = new DataManager({
            json: data["dragAndDropA"]
        });
        this.dataB = new DataManager({
            json: data["dragAndDropB"]
        });
        this.fields = { text: 'Name' };
        this.modifiedDataA = { addedRecords: [], deletedRecords: [], changedRecords: [] };
        this.modifiedDataB = { addedRecords: [], deletedRecords: [], changedRecords: [] };
    }
    saveChanges() {
        this.dataA.saveChanges(this.modifiedDataA, this.fields.text);
        this.dataB.saveChanges(this.modifiedDataB, this.fields.text);
        this.modifiedDataA.addedRecords = [];
        this.modifiedDataB.addedRecords = [];
    }
    onDropGroupA(args) {
        args.items.forEach((item) => {
            if (!this.listObj1.getDataByValue(item[this.fields.text])) {
                this.modifiedDataB.addedRecords.push(item);
                this.modifiedDataA.deletedRecords.push(item);
            }
        });
    }
    onDropGroupB(args) {
        args.items.forEach((item) => {
            if (!this.listObj2.getDataByValue(item[this.fields.text])) {
                this.modifiedDataA.addedRecords.push(item);
                this.modifiedDataB.deletedRecords.push(item);
            }
        });
    }
    render() {
        return (<div className='control-pane'>
                <div className='col-lg-12 control-section' style={{ minHeight: '450px' }}>
                    <div id="drag-drop-wrapper">
                        <div className="listbox-control">
                            <h4>Group A</h4>
                            <ListBoxComponent ref={(scope) => { this.listObj1 = scope; }} dataSource={this.dataA} scope="combined-list" height="330px" allowDragAndDrop={true} fields={this.fields} drop={this.onDropGroupA.bind(this)}/>
                        </div>
                        <span className="e-swap-icon"></span>
                        <div className="listbox-control">
                            <h4>Group B</h4>
                            <ListBoxComponent ref={(scope) => { this.listObj2 = scope; }} dataSource={this.dataB} scope="combined-list" height="330px" allowDragAndDrop={true} fields={this.fields} drop={this.onDropGroupB.bind(this)}/>
                            <button className="e-btn" onClick={this.saveChanges.bind(this)}>Update</button>
                        </div>
                    </div>
                </div>
                <div id='action-description'>
                    <p>This sample demonstrates the drag and drop functionalities of a ListBox. Drag an item or a group of selected items and drop it within the same list box or into another list box.</p>
                </div>
                <div id='description'>
                    <p>The ListBox component allows the user to drag and drop a desired item from one list box into another list box. The drag and drop feature can be enabled by using the following properties,</p>
                    <ul>
                        <li>To drag and drop a desired item within the ListBox, the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/list-box/#allowdraganddrop"><code>allowDragAndDrop</code></a> property should be set to <code>true.</code></li>
                        <li>To drag and drop between two listboxes, the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/list-box/#scope"><code>scope</code></a> property should be set to both the listboxes.</li>
                    </ul>
                    <p>In this sample, a list of countries is loaded in Group A and another list of countries is loaded in Group B. You can drag and drop an item or multiple items from
                        Group A to Group B, and vice versa. By clicking update button, user can save the changes to the corresponding JSON using Datamanager <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/data/dataManager/#savechanges"><code>saveChanges</code></a> method.</p>
                    <p>More information about drag and drop functionalities in the ListBox can be found in the
                        <a href="https://ej2.syncfusion.com/react/documentation/list-box/" target="_blank"> documentation</a> section.
                    </p>
                </div>
            </div>);
    }
}
