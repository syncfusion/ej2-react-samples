import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { FileManagerComponent, Inject, NavigationPane, Toolbar } from '@syncfusion/ej2-react-filemanager';
import './custom-thumbnail.css';

/**
 * File Manager custom thumbnail sample
 */
export class CustomThumbnail extends SampleBase<{},{}> {

    private hostUrl: string = "https://ej2-aspcore-service.azurewebsites.net/";
    public render(): JSX.Element {
        return(
            <div>
                <div className="control-section">
                    <FileManagerComponent id="Thumbnail_filemanager" ajaxSettings = {{
                        url: this.hostUrl + "api/FileManager/FileOperations",
                        getImageUrl: this.hostUrl + "api/FileManager/GetImage",
                        uploadUrl: this.hostUrl + 'api/FileManager/Upload',
                        downloadUrl: this.hostUrl + 'api/FileManager/Download'
                    }} view={"LargeIcons"} showThumbnail = {false}>
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
}
