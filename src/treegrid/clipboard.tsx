import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Page, Toolbar, Selection, Inject } from '@syncfusion/ej2-react-treegrid';
import { sampleData } from './data';
import { AnimationSettingsModel, DialogComponent } from '@syncfusion/ej2-react-popups';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
export class Clipboard extends SampleBase<{}, {}> {
    public toolbarOptions: any = [{ text: 'Copy', tooltipText: 'Copy', prefixIcon: 'e-copy', id: 'copy' }, { text: 'Copy With Header', tooltipText: 'Copy With Header', prefixIcon: 'e-copy', id: 'copyHeader' }];
    private treegridInstance: TreeGridComponent;
    private visible = false;
    private modes: { [key: string]: Object }[] = [
        { text: 'Parent', value: 'Parent' },
        { text: 'Child', value: 'Child' },
        { text: 'Both', value: 'Both' },
        { text: 'None', value: 'None' },
      ];
    
    public onChange(sel: ChangeEventArgs): void {
        let mode:any = sel.value.toString();
        this.treegridInstance.copyHierarchyMode  = mode;
    }
    private animationSettings: AnimationSettingsModel = { effect: 'None' };
    private alertDialogInstance: DialogComponent;
    private alertButtons = [{
        // Click the footer buttons to hide the Dialog
        click: () => {
            this.alertDialogInstance.hide();
        },
        buttonModel: { content: 'OK', isPrimary: true }
    }];

    toolbarClick(args: any) {
        if(this.treegridInstance.getSelectedRecords().length>0) {
            let withHeader: boolean = false;
            if (args.item.id === 'copyHeader') {
                withHeader = true;
            }
            this.treegridInstance.copy(withHeader);
        } else {
            this.alertDialogInstance.show();
        }
    }
    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
          <div className='col-lg-9'>
           <TreeGridComponent dataSource={sampleData} ref={treegrid => this.treegridInstance = treegrid} height='350' treeColumnIndex={1} childMapping='subtasks' allowPaging={true} allowSelection={true}
           selectionSettings={{ type: 'Multiple' }} pageSettings={{ pageSize: 10 }} toolbar={this.toolbarOptions}  toolbarClick={this.toolbarClick.bind(this)}>
            <ColumnsDirective>
              <ColumnDirective field='taskID' headerText='Task ID' width='70' textAlign='Right'></ColumnDirective>
              <ColumnDirective field='taskName' headerText='Task Name' width='200'></ColumnDirective>
              <ColumnDirective field='startDate' headerText='Start Date' width='90' format='yMd' textAlign='Right'/>
              <ColumnDirective field='duration' headerText='Duration' width='80' textAlign='Right'/>
              <ColumnDirective field='progress' headerText='Progress' width='80' textAlign='Right'/>
            </ColumnsDirective>
            <Inject services={[Toolbar, Selection, Page]}/>
          </TreeGridComponent>
        </div>
        <div> 
        <DialogComponent id="alertDialog" header='Copy with Header' visible={this.visible} animationSettings={this.animationSettings} width='300px' content='Atleast one row should be selected to copy with header' ref={alertdialog => this.alertDialogInstance = alertdialog}
            target='.control-section' buttons={this.alertButtons} ></DialogComponent>

                    {/* Render confirmation Dialog */}
        </div>
        <div className='col-lg-3 property-section'>
            <PropertyPane title='Properties'>
                <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                    <tbody>
                        <tr>
                            <td style={{ width: '30%' }}>
                                <div style={{ paddingTop: '7px' }}> Hierarchy Mode </div>
                            </td>
                            <td style={{ width: '70%', paddingTop: '10px' }}>
                                <div>
                                    <DropDownListComponent width="99px" id="selmode" change={this.onChange.bind(this)} dataSource={this.modes} value="Parent" />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </PropertyPane>
         </div>
        </div>
        <div id="action-description">
        <p>This sample demonstrates copy to clipboard functionality of the Tree Grid component. Select rows and click Copy
        button from toolbar to copy content. To copy with header click Copy with header button from toolbar.</p>
        </div>
        <div id="description">
    <p>Selected rows or cells data in the Tree Grid can be copied into the clipboard using the Keyboard shortcuts and
        <code><a target="_blank"
        href="https://ej2.syncfusion.com/documentation/api/treegrid/#copy">copy
        </a></code> method.
    </p>
    <p>In this demo, selected rows data can be copied into the clipboard using the below Keyboard shortcuts or toolbar
        interactions.
    </p>
    <ul>
        <li><code>Ctrl + C</code> - Selected rows or cells data without header.</li>
        <li><code>Ctrl + Shift + H</code> - Selected rows or cells data with header.</li>
    </ul>
    <p>Tree Grid provides support for a set of copy modes with <code>copyHierarchyMode</code> property.
     The below are the type of copy mode available in Tree Grid. </p>
    <ul>
        <li><code>Parent</code> - This is the default copy hierarchy mode in Tree Grid. 
        Clipboard value have the selected records with its parent records,
         if the selected records not have any parent record then the selected record will be in clipboard.</li>
        <li><code>Child</code> - Clipboard value have the selected records with its child record,
         if the selected records do not have any child record then the selected records will be in clipboard.</li>
        <li><code>Both</code> - Clipboard value have the selected records with its both parent and child record.
        If the selected records do not have any parent and child record then the selected records will be in clipboard.</li>
        <li><code>None</code> - Only the Selected records will be in clipboard.</li>
    </ul>
    <p>While using the Tree Grid in a touch device environment, there is an option for multi-selection 
        through single tap on the row and it will show a popup with the multi-selection symbol. 
        Tap the icon to enable multi-selection in a single tap and click for the toolbar to copy the selected records into clipboard.
    </p>
    <p>More information on the Clipboard feature can be found in this
        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/treegrid/clipboard/">
            documentation section</a>.
    </p>
</div>
    </div>);
    }
}
