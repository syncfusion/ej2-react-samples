import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { FileManagerComponent, Inject, NavigationPane, DetailsView, Toolbar } from '@syncfusion/ej2-react-filemanager';

/**
 * File Manager sample with azure service
 */
export class Azure extends SampleBase<{},{}> {

    private hostUrl: string = "https://ej2services.syncfusion.com/production/web-services/";
    public render(): JSX.Element {
        return(
            <div>
                <div className="control-section">
                    <FileManagerComponent id="azure-file" ajaxSettings = {{
                        url: this.hostUrl + 'api/AzureFileManager/AzureFileoperations',
                        getImageUrl: this.hostUrl + 'api/AzureFileManager/AzureGetImage',
                        uploadUrl: this.hostUrl + 'api/AzureFileManager/AzureUpload',
                        downloadUrl: this.hostUrl + 'api/AzureFileManager/AzureDownload'
                    }}>
                    <Inject services={[ NavigationPane, DetailsView, Toolbar]} />
                    </FileManagerComponent>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates how to utilize the Azure blob storage with File Manager component. To run the service, create the Azure blob storage account and register the Azure storage details like account name, password, and blob name details within the Register Azure method.</p>
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
