import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import {CheckBoxComponent, ChangeEventArgs} from '@syncfusion/ej2-react-buttons';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { FileManagerComponent, Inject, NavigationPane, DetailsView, Toolbar } from '@syncfusion/ej2-react-filemanager';

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
const Default = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const [isVisible, setIsVisible] = useState<boolean>(true);
    const [isAllowMultiselect, setIsAllowmultiselect] = useState<boolean>(true);
    const [isShowFileExtension, setIsShowFileExtension] = useState<boolean>(true);
    const [isShowThumbnail, setShowThumbnail] = useState<boolean>(true);
    const [isEnableRangeSelection, setEnableRangeSelection] = useState<boolean>(true);
    let hostUrl: string = "https://ej2-aspcore-service.azurewebsites.net/";
    let fmObj = useRef<FileManagerComponent>(null);
    let disableDropDownList = useRef<DropDownListComponent>(null);
    let enableDropDownList = useRef<DropDownListComponent>(null);
    let items = ['NewFolder', 'Cut', 'Copy', 'Paste', 'Download', 'Delete', 'Refresh', 'Selection', 'View', 'Details'];

    const toolCheck = (args: ChangeEventArgs, id: string): void => {
            if (id == "toolbar") {
                setIsVisible(args.checked);
            }
            if (id == "fileExtension") {
                setIsShowFileExtension(args.checked);
            }
            if (id == "thumbnail") {
                setShowThumbnail(args.checked);
            }
            if (id == "rangeSelection") {
                setEnableRangeSelection(args.checked);
            }
    }

    const onDisableItemChange = (args) => {
        if (args.itemData != null){
            fmObj.current.disableToolbarItems([args.itemData.value]);
            if(args.value === enableDropDownList.current.value){
                enableDropDownList.current.value = null;
            }
        }
    }
    
    const onEnableItemChange = (args) => {
        if (args.itemData != null){
            fmObj.current.enableToolbarItems([args.itemData.value]);
            if(args.value === disableDropDownList.current.value){
                disableDropDownList.current.value = null;
            }
        }
    }
    
    return(
        <div>
            <style>{defaultcss}</style>
            <div className="col-lg-8 control-section">
                <FileManagerComponent id="api_filemanager" ref={fmObj} ajaxSettings = {{ url: hostUrl + "api/FileManager/FileOperations", getImageUrl: hostUrl + "api/FileManager/GetImage", uploadUrl: hostUrl + 'api/FileManager/Upload', downloadUrl: hostUrl + 'api/FileManager/Download' }} toolbarSettings={{items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'Selection', 'View', 'Details'], visible: isVisible}} contextMenuSettings={{file: [ 'Cut', 'Copy', '|', 'Delete', 'Download', 'Rename', '|', 'Details'], layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', '|', 'Details', '|', 'SelectAll'], visible: true }} view={"LargeIcons"} navigationPaneSettings={{visible: false}} allowMultiSelection={isAllowMultiselect} showFileExtension={isShowFileExtension} showThumbnail={isShowThumbnail} enableRangeSelection={isEnableRangeSelection}>
                    <Inject services={[ NavigationPane, DetailsView, Toolbar]} />
                </FileManagerComponent>
            </div>
            <div id="all-property-table" className='col-lg-4 property-section'>
                <PropertyPane title='Properties'>
                    <table id="property" title="Properties" className='property-panel-table' style={{ width: "100%" }}>
                        <tbody>
                            <tr>
                                <td style={{ width: '50%' }}>
                                    <div style={{ fontSize : '14px', paddingLeft: '0px' }}>Enable Range Selection</div>
                                </td>
                                <td style={{ width: '50%', paddingRight: '10px' }}>
                                    <div>
                                        <CheckBoxComponent id="rangeSelection" checked={true} change={(args) => toolCheck(args, "rangeSelection")}></CheckBoxComponent>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ width: '50%' }}>
                                    <div style={{ fontSize : '14px', paddingLeft: '0px' }}>Toolbar</div>
                                </td>
                                <td style={{ width: '50%', paddingRight: '10px' }}>
                                    <div>
                                        <CheckBoxComponent id="toolbar" checked={true} change={(args) => toolCheck(args, "toolbar")}></CheckBoxComponent>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ width: '50%' }}>
                                    <div style={{ fontSize : '14px', paddingLeft: '0px' }}>Show File Extension</div>
                                </td>
                                <td style={{ width: '50%', paddingRight: '10px' }}>
                                    <div>
                                        <CheckBoxComponent id="fileExtension" checked={true} change={(args) => toolCheck(args, "fileExtension")}></CheckBoxComponent>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ width: '50%' }}>
                                    <div style={{ fontSize : '14px', paddingLeft: '0px' }}>Show Thumbnail</div>
                                </td>
                                <td style={{ width: '50%', paddingRight: '10px' }}>
                                    <div>
                                        <CheckBoxComponent id="thumbnail" checked={true} change={(args) => toolCheck(args, "thumbnail")}></CheckBoxComponent>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ width: '50%' }}>
                                    <div style={{ fontSize : '14px', paddingLeft: '0px' }}>Disable Toolbar Item</div>
                                </td>
                                <td style={{ width: '50%', paddingLeft: '10px' }}>
                                    <div>
                                        <DropDownListComponent ref={disableDropDownList} id="disable" dataSource={items} change={onDisableItemChange.bind(this)}></DropDownListComponent>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ width: '50%' }}>
                                    <div style={{ fontSize : '14px', paddingLeft: '0px' }}>Enable Toolbar Item</div>
                                </td>
                                <td style={{ width: '50%', paddingLeft: '10px' }}>
                                    <div>
                                        <DropDownListComponent ref={enableDropDownList} id="enable" dataSource={items} change={onEnableItemChange.bind(this)}></DropDownListComponent>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </PropertyPane>
            </div>
            <div id="action-description">
                <p>
                The property pane in this sample displays the features available in the File Manager component. The visibility of the toolbar, file extensions, range selection,
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
export default Default;
