import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import {CheckBoxComponent, ChangeEventArgs} from '@syncfusion/ej2-react-buttons';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { FileManagerComponent, Inject, NavigationPane, Toolbar } from '@syncfusion/ej2-react-filemanager';

const defaultcss = `
#all-property-table .property-panel-section .property-panel-content table#property tr {
    height: 50px;
}

@media (max-width: 550px) {
    #rangeSelectionRow {
        display: none;
    }
}`

/**
 * File Manager API sample
 */
export class Default extends SampleBase<{},{}> {

    private hostUrl: string = "https://ej2-aspcore-service.azurewebsites.net/";
    public fmObj: FileManagerComponent;
    public disableDropDownList: DropDownListComponent;
    public enableDropDownList: DropDownListComponent;
    public items = ['NewFolder', 'Cut', 'Copy', 'Paste', 'Download', 'Delete', 'Refresh', 'Selection', 'View', 'Details'];

    public toolCheck(args: ChangeEventArgs, id: string): void {
        if (id == "toolbar") {
            this.fmObj.toolbarSettings.visible = args.checked;
        }
        if (id == "fileExtension") {
            this.fmObj.showFileExtension = args.checked;
        }
        if (id == "thumbnail") {
            this.fmObj.showThumbnail = args.checked;
        }
        if (id == "rangeSelection") {
            this.fmObj.enableRangeSelection = args.checked;
        }
    }

    public onDisableItemChange(args: any): void {
        if (args.itemData != null){
            this.fmObj.disableToolbarItems([args.itemData.value]);
            if(args.value === this.enableDropDownList.value){
                this.enableDropDownList.value = null;
            }
        }
    }
    public onEnableItemChange(args: any): void {
        if (args.itemData != null){
            this.fmObj.enableToolbarItems([args.itemData.value]);
            if(args.value === this.disableDropDownList.value){
                this.disableDropDownList.value = null;
            }
        }
    }

    public render(): JSX.Element {
        return(
            <div>
                <style>{defaultcss}</style>
                <div className="col-lg-8 control-section">
                    <FileManagerComponent id="api_filemanager" ref={(scope) => { this.fmObj = scope; }}
                     ajaxSettings = {{
                        url: this.hostUrl + "api/FileManager/FileOperations",
                        getImageUrl: this.hostUrl + "api/FileManager/GetImage",
                        uploadUrl: this.hostUrl + 'api/FileManager/Upload',
                        downloadUrl: this.hostUrl + 'api/FileManager/Download'
                    }}
                    toolbarSettings={{items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'Selection', 'View', 'Details']}}
                    contextMenuSettings={{
                        file: [ 'Cut', 'Copy', '|', 'Delete', 'Download', 'Rename', '|', 'Details'],
                        layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', '|', 'Details', '|', 'SelectAll'],
                        visible: true
                    }}
                    view = {"LargeIcons"}
                    navigationPaneSettings={{visible: false}}
                    enableRangeSelection={true}>
                <Inject services={[ NavigationPane, Toolbar]} />
                    </FileManagerComponent>
                </div>
                <div id="all-property-table" className='col-lg-4 property-section'>
                <PropertyPane title='Properties'>
                <table id="property" title="Properties" className='property-panel-table' style={{ width: "100%" }}>
                    <tbody>
                    <tr id="rangeSelectionRow">
                        <td style={{ width: '50%' }}>
                            <div style={{ fontSize : '14px', paddingLeft: '0px' }}>Enable Range Selection</div>
                        </td>
                        <td style={{ width: '50%', paddingRight: '10px' }}>
                            <div>
                                <CheckBoxComponent id="rangeSelection" checked={true} change={(args) => this.toolCheck(args, "rangeSelection")}></CheckBoxComponent>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ width: '50%' }}>
                            <div style={{ fontSize : '14px', paddingLeft: '0px' }}>Toolbar</div>
                        </td>
                        <td style={{ width: '50%', paddingRight: '10px' }}>
                            <div>
                                <CheckBoxComponent id="toolbar" checked={true} change={(args) => this.toolCheck(args, "toolbar")}></CheckBoxComponent>
                            </div>
                        </td>
                    </tr>
                   <tr>
                        <td style={{ width: '50%' }}>
                            <div style={{ fontSize : '14px', paddingLeft: '0px' }}>Show File Extension</div>
                        </td>
                        <td style={{ width: '50%', paddingRight: '10px' }}>
                            <div>
                                <CheckBoxComponent id="fileExtension" checked={true} change={(args) => this.toolCheck(args, "fileExtension")}></CheckBoxComponent>
                            </div>
                        </td>
                   </tr>
                   <tr>
                        <td style={{ width: '50%' }}>
                            <div style={{ fontSize : '14px', paddingLeft: '0px' }}>Show Thumbnail</div>
                        </td>
                        <td style={{ width: '50%', paddingRight: '10px' }}>
                            <div>
                                <CheckBoxComponent id="thumbnail" checked={true} change={(args) => this.toolCheck(args, "thumbnail")}></CheckBoxComponent>
                            </div>
                        </td>
                    </tr>
                    <tr>    
                        <td style={{ width: '50%' }}>
                            <div style={{ fontSize : '14px', paddingLeft: '0px' }}>Disable Toolbar Item</div>
                        </td>
                        <td style={{ width: '50%', paddingLeft: '10px' }}>
                            <div>
                                <DropDownListComponent ref={(scope) => { this.disableDropDownList = scope; }} id="disable" dataSource={this.items} change={this.onDisableItemChange.bind(this)}></DropDownListComponent>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ width: '50%' }}>
                            <div style={{ fontSize : '14px', paddingLeft: '0px' }}>Enable Toolbar Item</div>
                        </td>
                        <td style={{ width: '50%', paddingLeft: '10px' }}>
                            <div>
                                <DropDownListComponent ref={(scope) => { this.enableDropDownList = scope; }} id="enable" dataSource={this.items} change={this.onEnableItemChange.bind(this)}></DropDownListComponent>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                </PropertyPane>
                </div>
                <div id="action-description">
                    <p>The property pane in this sample displays the features available in the File Manager component. The visibility of the toolbar, file extensions,  range selection,
                        and image thumbnails can be easily controlled by checking or unchecking the respective checkboxes. Additionally, specific toolbar items can be
                        enabled or disabled by selecting values in the Dropdown List.
                    </p>                
                </div>
                <div id="description">
                    <p>In this demo, the above mentioned requirements are achieved by using the following API properties and method of the File Manager component. </p>
                    <p><a target='_blank' href='https://ej2.syncfusion.com/react/documentation/api/file-manager/#toolbarsettings'>toolbarSettings</a> defines the group of items in the toolbar that are aligned horizontally.</p>
                    <p><a target='_blank' href='https://ej2.syncfusion.com/react/documentation/api/file-manager/#showfileextension'>showFileExtension</a> property shows or hides the file extension in the File Manager.</p>
                    <p><a target='_blank' href='https://ej2.syncfusion.com/react/documentation/api/file-manager/#showthumbnail'>showThumbnail</a> property shows or hides thumbnail images in the large icons view.</p>
                    <p><a target='_blank' href='https://ej2.syncfusion.com/react/documentation/api/file-manager/#enableRangeSelection'>enableRangeSelection</a> property allows multiple items selection with mouse dragging. </p>
                    <p><code>enableToolbarItems</code> specifies which items should be enabled in the toolbar.</p>
                    <p><code>disableToolbarItems</code> specifies which items should be disabled in the toolbar.</p>
                    <p>
                        <b>Note: </b>File Manager's upload functionality is restricted in the online demos for security reasons. If you need to test upload functionality, please install 
                        <a target="_blank" href="https://www.syncfusion.com/downloads"> Syncfusion Essential Studio </a>on your machine and run the demo.
                     </p>
                </div>
            </div>
        );
    }
}
