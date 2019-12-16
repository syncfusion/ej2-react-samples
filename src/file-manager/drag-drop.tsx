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
                    }} allowDragAndDrop={true}>
                <Inject services={[ NavigationPane, DetailsView, Toolbar]} />
                    </FileManagerComponent>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the drag-and-drop feature of the File Manager. To drag and drop the file, select and drag a desired file or folder and drop it into the target folder. The File Manager component allows users to drag any file and drop it on any other folder in the same or different folder using the <code><a href="https://ej2.syncfusion.com/documentation/api/file-manager/#allowdraganddrop" target="_blank">allowDragAndDrop</a></code> property.</p>
                </div>
                <div id="description">
                    <p>The File Manager component is used to explore a file system through a web application, similar to the windows explorer for windows.
                        It supports all the basic file operations such as create, rename, delete and so on.</p>

                    <p>
                        <b>Note: </b>File Manager's upload functionality is restricted in the online demo. If you need to test upload functionality, please install 
                        <a target="_blank" href="https://www.syncfusion.com/downloads"> Syncfusion Essential Studio </a>on your machine and run the demo.
                     </p>
                </div>
            </div>
        );
    }
}
