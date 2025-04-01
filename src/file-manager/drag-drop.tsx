import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { FileManagerComponent, Inject, NavigationPane, DetailsView, Toolbar } from '@syncfusion/ej2-react-filemanager';

/**
 * File Manager Drag and Drop feature sample
 */
export class DragAndDrop extends SampleBase<{},{}> {

    private hostUrl: string = "https://ej2-aspcore-service.azurewebsites.net/";
    public render(): JSX.Element {
        return(
            <div>
                <div className="control-section">
                    <FileManagerComponent id="filemanager" ajaxSettings = {{
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
                    allowDragAndDrop={true}>
                <Inject services={[ NavigationPane, DetailsView, Toolbar]} />
                    </FileManagerComponent>
                </div>
                <div id="action-description">
                    <p>This example demonstrates the <code>drag-and-drop</code> feature. To drag and drop a file in the File Manager, select and drag it to the target folder. The File Manager component allows users to drag file and drop it into any folder, whether it is located in the same directory or a different one, using the <code><a href="https://ej2.syncfusion.com/react/documentation/api/file-manager/#allowdraganddrop" target="_blank">allowDragAndDrop</a></code> property.</p>
                </div>
                <div id="description">
                    <p>In this sample, the <a href="https://ej2.syncfusion.com/react/documentation/api/file-manager/#allowdraganddrop" target="_blank"> allowDragAndDrop </a> property enables users to move files or folders from one folder to another. Additionally, it supports file upload by dragging and dropping files from Windows Explorer and Mac onto the File Manager component.</p>

                    <p>
                        <b>Note: </b>File Manager's upload functionality is restricted in the online demos for security reasons. If you need to test upload functionality, please install 
                        <a target="_blank" href="https://www.syncfusion.com/downloads"> Syncfusion Essential Studio </a>on your machine and run the demo.
                     </p>
                </div>
            </div>
        );
    }
}
