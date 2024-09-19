import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { FileManagerComponent, Inject, NavigationPane, DetailsView, Toolbar, ToolbarItemsDirective, ToolbarItemDirective } from '@syncfusion/ej2-react-filemanager';
import { DropDownButtonComponent, ItemModel} from '@syncfusion/ej2-react-splitbuttons';


/**
 * File Manager folder upload sample
 */
const DirectoryUpload = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const [isDirectoryUpload, setIsDirectoryUpload] = useState<boolean>(false);
    let fmObj = useRef<FileManagerComponent>(null);
    let hostUrl: string = "https://ej2-aspcore-service.azurewebsites.net/";   
    let items: ItemModel[] = [{ text: 'Folder' }, { text: 'Files' }];
    const onSelect= (args) => {
        if (args.item.text === "Folder") {
            setIsDirectoryUpload(true);
        } else {
            setIsDirectoryUpload(false);
        }
        setTimeout( () => {
            let uploadBtn: HTMLElement = document.querySelector('.e-file-select-wrap button');
            uploadBtn.click();
        }, 100);
    }
    const uploadClick = (e) => {
        e.stopPropagation();
    }
    const uploadTemplate = () => {
        return(
            <DropDownButtonComponent id="dropButton" cssClass= "e-tbar-btn e-tbtn-txt" onClick={uploadClick} items={items} iconCss='e-icons e-fe-upload' select={onSelect}>
                <span className="e-tbar-btn-text">Upload</span>
            </DropDownButtonComponent>
            );
    }
    return(
        <div>
            <div className="control-section">
                <FileManagerComponent id="file" ref={fmObj} uploadSettings={{directoryUpload: isDirectoryUpload}} ajaxSettings = {{url: hostUrl + "api/FileManager/FileOperations", getImageUrl: hostUrl + "api/FileManager/GetImage", uploadUrl: hostUrl + 'api/FileManager/Upload', downloadUrl: hostUrl + 'api/FileManager/Download'}}
                    contextMenuSettings={{
                        file: [ 'Cut', 'Copy', '|', 'Delete', 'Download', 'Rename', '|', 'Details'],                        
                        visible: true
                    }}>
                    <ToolbarItemsDirective>
                            <ToolbarItemDirective name='NewFolder'/>
                            <ToolbarItemDirective template= {uploadTemplate} name="Upload"  />
                            <ToolbarItemDirective name="SortBy" />
                            <ToolbarItemDirective name="Refresh" />
                            <ToolbarItemDirective name="Cut" />
                            <ToolbarItemDirective name="Copy" />
                            <ToolbarItemDirective name="Paste" />
                            <ToolbarItemDirective name="Delete" />
                            <ToolbarItemDirective name="Download" />
                            <ToolbarItemDirective name="Rename" />
                            <ToolbarItemDirective name="Selection" />
                            <ToolbarItemDirective name="View" />
                            <ToolbarItemDirective name="Details" />
                        </ToolbarItemsDirective>
                    <Inject services={[ NavigationPane, DetailsView, Toolbar]} />
                </FileManagerComponent>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the folder (directory) upload feature. Select <code>Folder</code> from the <code>Upload</code> toolbar item to select and upload a folder in the File Manager component.</p>
            </div>
            <div id="description">
                <p>In this demo, a folder upload is enabled by setting <a href="https://ej2.syncfusion.com/react/documentation/api/file-manager/uploadSettingsModel/#directoryupload" target="_blank"> directoryUpload </a> to <code>true</code>. It allows users to select or drag and drop a folder to upload its contents including hierarchy folders and files in the File Manager component.</p>
                <p>
                    The folder (directory) upload is supported for the following file system providers, </p>
                <ul>
                    <li> Physical provider</li> 
                    <li> NodeJS provider</li>
                    <li> Azure provider</li>
                    <li> Amazon S3 provider</li>
                </ul>
                <p>
                    <b>Note: </b>File Manager's upload functionality is restricted in the online demos for security reasons. If you need to test upload functionality, please install 
                    <a target="_blank" href="https://www.syncfusion.com/downloads"> Syncfusion Essential Studio </a>on your machine and run the demo.
                </p>
            </div>
        </div>
    );
}
export default DirectoryUpload;
