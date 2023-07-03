import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import {CheckBoxComponent, ChangeEventArgs} from '@syncfusion/ej2-react-buttons';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { FileManagerComponent, Inject, NavigationPane, Toolbar } from '@syncfusion/ej2-react-filemanager';

const defaultcss = `
    #all-property-table .property-panel-section .property-panel-content table#property tr {
        height: 50px;
    }`

/**
 * File Manager API sample
 */
const Default = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const [isVisible, setIsVisible] = useState<boolean>(true);
    const [isAllowMultiselect, setIsAllowmultiselect] = useState<boolean>(true);
    const [isShowFileExtension, setIsShowFileExtension] = useState<boolean>(true);
    const [isShowThumbnail, setShowThumbnail] = useState<boolean>(true);
    let hostUrl: string = "https://ej2-aspcore-service.azurewebsites.net/";
    let fmObj = useRef<FileManagerComponent>(null);
    let items = ['NewFolder', 'Cut', 'Copy', 'Paste', 'Download', 'Delete', 'Refresh', 'Selection', 'View', 'Details'];

    const toolCheck = (args: ChangeEventArgs, id: string): void => {
            if (id == "toolbar") {
                setIsVisible(args.checked);
            }
            if (id == "multiSelect") {
                setIsAllowmultiselect(args.checked);
            }
            if (id == "fileExtension") {
                setIsShowFileExtension(args.checked);
            }
            if (id == "thumbnail") {
                setShowThumbnail(args.checked);
            }
    }

    const itemChange = (args: any): void => {
        if (args.element.id == 'enable') {
            fmObj.current.enableToolbarItems([args.itemData.value]);
        } else {
            fmObj.current.disableToolbarItems([args.itemData.value]);
        }
    }
    return(
        <div>
            <style>{defaultcss}</style>
            <div className="col-lg-8 control-section">
                <FileManagerComponent id="api_filemanager" ref={fmObj} ajaxSettings = {{ url: hostUrl + "api/FileManager/FileOperations", getImageUrl: hostUrl + "api/FileManager/GetImage", uploadUrl: hostUrl + 'api/FileManager/Upload', downloadUrl: hostUrl + 'api/FileManager/Download' }} toolbarSettings={{items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'Selection', 'View', 'Details'], visible: isVisible}} contextMenuSettings={{layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', '|', 'Details', '|', 'SelectAll']}} view={"LargeIcons"} navigationPaneSettings={{visible: false}} allowMultiSelection={isAllowMultiselect} showFileExtension={isShowFileExtension} showThumbnail={isShowThumbnail}>
                    <Inject services={[ NavigationPane, Toolbar]} />
                </FileManagerComponent>
            </div>
            <div id="all-property-table" className='col-lg-4 property-section'>
                <PropertyPane title='Properties'>
                    <table id="property" title="Properties" className='property-panel-table' style={{ width: "100%" }}>
                        <tbody>
                            <tr>
                                <td style={{ width: '50%' }}>
                                    <div style={{ fontSize : '14px' }}>Toolbar</div>
                                </td>
                                <td style={{ width: '50%', paddingRight: '10px' }}>
                                    <div>
                                        <CheckBoxComponent id="toolbar" checked={true} change={(args) => toolCheck(args, "toolbar")}></CheckBoxComponent>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ width: '50%' }}>
                                    <div style={{ fontSize : '14px' }}>allowMultiSelection</div>
                                </td>
                                <td style={{ width: '50%', paddingRight: '10px' }}>
                                    <div>
                                        <CheckBoxComponent id="multiSelect" checked={true} change={(args) => toolCheck(args, "multiSelect")}></CheckBoxComponent>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ width: '50%' }}>
                                    <div style={{ fontSize : '14px' }}>showFileExtension</div>
                                </td>
                                <td style={{ width: '50%', paddingRight: '10px' }}>
                                    <div>
                                        <CheckBoxComponent id="fileExtension" checked={true} change={(args) => toolCheck(args, "fileExtension")}></CheckBoxComponent>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ width: '50%' }}>
                                    <div style={{ fontSize : '14px' }}>showThumbnail</div>
                                </td>
                                <td style={{ width: '50%', paddingRight: '10px' }}>
                                    <div>
                                        <CheckBoxComponent id="thumbnail" checked={true} change={(args) => toolCheck(args, "thumbnail")}></CheckBoxComponent>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ width: '50%' }}>
                                    <div style={{ fontSize : '14px' }}>Disable</div>
                                </td>
                                <td style={{ width: '50%', paddingRight: '10px' }}>
                                    <div>
                                        <DropDownListComponent id="disable" dataSource={items} change={itemChange.bind(this)}></DropDownListComponent>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ width: '50%' }}>
                                    <div style={{ fontSize : '14px' }}>Enable</div>
                                </td>
                                <td style={{ width: '50%', paddingRight: '10px' }}>
                                    <div>
                                        <DropDownListComponent id="enable" dataSource={items} change={itemChange.bind(this)}></DropDownListComponent>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </PropertyPane>
            </div>
            <div id="action-description">
                <p>
                    The File Manager component in the property pane displays its features in this sample. The visibility of the toolbar, multi-selection, file extensions,
                    and image thumbnails can all be easily controlled by checking or unchecking the respective checkboxes. Additionally, specific toolbar items can be
                    enabled or disabled by selecting values in the Dropdown List.
                </p>                
            </div>
            <div id="description">
                <p>In this demo, the above mentioned requirements are achieved by using the following API properties and method of the File Manager component. </p>
                <p><code>toolbarSettings</code> defines the group of items in the toolbar that are aligned horizontally.</p>
                <p><a target='_blank' href='https://ej2.syncfusion.com/react/documentation/api/file-manager/#allowmultiselection'>allowMultiSelection</a> property enables or disables the File Manager's multiple folder or file selection.  </p>
                <p><a target='_blank' href='https://ej2.syncfusion.com/react/documentation/api/file-manager/#showfileextension'>showFileExtension</a> property shows or hides the file extension in the File Manager.</p>
                <p><a target='_blank' href='https://ej2.syncfusion.com/react/documentation/api/file-manager/#showthumbnail'>showThumbnail</a> property shows or hides thumbnail images in the large icons view. . </p>
                <p><code>enableToolbarItems</code> specifies which items should be enabled in the toolbarr.</p>
                <p><code>disableToolbarItems</code> specifies which items should be disabled in the toolbar.</p>
                <p>
                    <b>Note: </b>File Manager's upload functionality is restricted in the online demo. If you need to test upload functionality, please install 
                    <a target="_blank" href="https://www.syncfusion.com/downloads"> Syncfusion Essential Studio </a>on your machine and run the demo.
                </p>
            </div>
        </div>
    );
}
export default Default;