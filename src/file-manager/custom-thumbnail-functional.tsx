import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { updateSampleSection } from '../common/sample-base';
import { FileManagerComponent, Inject, NavigationPane, Toolbar } from '@syncfusion/ej2-react-filemanager';
import './custom-thumbnail.css';

/**
 * File Manager custom thumbnail sample
 */
function CustomThumbnail() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])

    let hostUrl: string = "https://ej2-aspcore-service.azurewebsites.net/";
    return(
        <div>
            <div className="control-section">
                <FileManagerComponent id="Thumbnail_filemanager" ajaxSettings = {{
                    url: hostUrl + "api/FileManager/FileOperations",
                    getImageUrl: hostUrl + "api/FileManager/GetImage",
                    uploadUrl: hostUrl + 'api/FileManager/Upload',
                    downloadUrl: hostUrl + 'api/FileManager/Download'
                }} 
                toolbarSettings={{items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'Selection', 'View', 'Details']}}
                contextMenuSettings={{
                    layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', '|', 'Details', '|', 'SelectAll']}}
                view={"LargeIcons"} showThumbnail = {false}>
            <Inject services={[ NavigationPane, Toolbar]} />
                </FileManagerComponent>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the custom thumbnail of the File Manager you can customize with your own icon using <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/file-manager/#showthumbnail">showThumbnail </a> property.</p>
            </div>
            <div id="description">
                <p>The File Manager component is used to explore a file system through a web application, similar to the windows explorer for windows.
                    It supports the basic file operations such as create, rename, delete.</p>

                    <p>
                    <b>Note: </b>File Manager's upload functionality is restricted in the online demo. If you need to test upload functionality, please install 
                    <a target="_blank" href="https://www.syncfusion.com/downloads"> Syncfusion Essential Studio </a>on your machine and run the demo.
                    </p>
            </div>
        </div>
    );
}
export default CustomThumbnail;