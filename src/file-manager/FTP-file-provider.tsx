import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { FileManagerComponent, Inject, NavigationPane, DetailsView, Toolbar } from '@syncfusion/ej2-react-filemanager';

/**
 * File Manager sample with File Transfer Protocol
 */
export class FTPFileProvider extends SampleBase<{}, {}> {

    private hostUrl: string = "https://ej2-ftp-aspcore-service.azurewebsites.net/";
    public render(): JSX.Element {
        return (
            <div>
                <div className="control-section">
                    <FileManagerComponent id="ftp" ajaxSettings={{
                        url: this.hostUrl + 'api/FTPProvider/FTPFileOperations',
                        getImageUrl: this.hostUrl + 'api/FTPProvider/FTPGetImage',
                        uploadUrl: this.hostUrl + 'api/FTPProvider/FTPUpload',
                        downloadUrl: this.hostUrl + 'api/FTPProvider/FTPDownload'
                    }}>
                        <Inject services={[NavigationPane, DetailsView, Toolbar]} />
                    </FileManagerComponent>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates how to utilize the <a target="_blank" href="https://github.com/SyncfusionExamples/ej2-ftp-aspcore-file-provider">File Transfer Protocol file system provider</a> to manage the files in the File Manager component.
            To run the service, create a FTP connection, and then configure the FTP details such as <i><b>host name</b></i>, <i><b>user name</b></i>, and <i><b>password</b></i> in the <code>SetFTPConnection</code> method to perform the file operations.</p>
                </div>
                <div id="description">
                    <p>The File Manager component is used to explore a file system through a web application, similar to the windows explorer for windows.
                        It supports all the basic file operations such as create, rename, delete and so on.</p>
                        <b>Note: </b>File Manager's upload functionality is restricted in online demo. To work with upload functionality, please download <a target="_blank" href="https://github.com/SyncfusionExamples/ej2-ftp-aspcore-file-provider">ej2-ftp-aspcore-file-provider</a> from the GitHub repository.
                </div>
            </div>
        );
    }
}
