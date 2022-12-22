/**
 * ListBox RemoteData Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ListBoxComponent, FieldSettingsModel, DragEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { DataManager } from '@syncfusion/ej2-data';
import { updateSampleSection } from '../common/sample-base';
import * as data from './dataSource.json';
import './drag-and-drop.css';

function DragAndDrop() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let listObj1: ListBoxComponent; let listObj2: ListBoxComponent;
    let dataA: DataManager = new DataManager({
        json: data["dragAndDropA"]
    });
    let dataB: DataManager = new DataManager({
        json: data["dragAndDropB"]
    });
    let fields: FieldSettingsModel = { text: 'Name' };
    let modifiedDataA: ModifiedRecords = { addedRecords: [], deletedRecords: [], changedRecords: [] };
    let modifiedDataB: ModifiedRecords = { addedRecords: [], deletedRecords: [], changedRecords: [] };
    function saveChanges(): void {
        dataA.saveChanges(modifiedDataA, fields.text);
        dataB.saveChanges(modifiedDataB, fields.text);
        modifiedDataA.addedRecords = []; modifiedDataB.addedRecords = [];
    }
    function onDropGroupA(args: DragEventArgs): void {
        args.items.forEach((item: { [key: string]: Object; }): void => {
            if (!listObj1.getDataByValue(item[fields.text] as string)) {/*Preventing item manipulation on drag and drop within same list box.*/
                modifiedDataB.addedRecords.push(item);
                modifiedDataA.deletedRecords.push(item);
            }
        });
    }
    function onDropGroupB(args: DragEventArgs): void {
        args.items.forEach((item: { [key: string]: Object; }): void => {
            if (!listObj2.getDataByValue(item[fields.text] as string)) {
                modifiedDataA.addedRecords.push(item);
                modifiedDataB.deletedRecords.push(item);
            }
        });
    }

    return (
        <div className='control-pane'>
            <div className='col-lg-12 control-section' style={{ minHeight: '450px' }}>
                <div id="drag-drop-wrapper">
                    <div className="listbox-control">
                        <h4>Group A</h4>
                        <ListBoxComponent ref={(scope) => { listObj1 = scope; }} dataSource={dataA} scope="combined-list" height="330px" allowDragAndDrop={true} fields={fields} drop={onDropGroupA} />
                    </div>
                    <span className="e-swap-icon"></span>
                    <div className="listbox-control">
                        <h4>Group B</h4>
                        <ListBoxComponent ref={(scope) => { listObj2 = scope; }} dataSource={dataB} scope="combined-list" height="330px" allowDragAndDrop={true} fields={fields} drop={onDropGroupB} />
                        <button className="e-btn" onClick={saveChanges}>Update</button>
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
        </div>
    );

}
export default DragAndDrop;
interface ModifiedRecords {
    addedRecords: { [key: string]: Object }[];
    deletedRecords: { [key: string]: Object }[];
    changedRecords: { [key: string]: Object }[];
}