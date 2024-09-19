import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { FileManagerComponent, Inject, NavigationPane, DetailsView, Toolbar } from '@syncfusion/ej2-react-filemanager';

/**
 * File Manager sample with firebase realtime database service
 */
export class Firebase extends SampleBase<{}, {}> {

    private hostUrl: string = "https://realtime-firebase.azurewebsites.net/";
    public render(): JSX.Element {
        return (
            <div>
                <div className="control-section">
                    <FileManagerComponent id="firebase" ajaxSettings={{
                        url: this.hostUrl + 'api/FirebaseProvider/FirebaseRealtimeFileOperations',
                        getImageUrl: this.hostUrl + 'api/FirebaseProvider/FirebaseRealtimeGetImage',
                        uploadUrl: this.hostUrl + 'api/FirebaseProvider/FirebaseRealtimeUpload',
                        downloadUrl: this.hostUrl + 'api/FirebaseProvider/FirebaseRealtimeDownload'
                    }}
                    toolbarSettings={{items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'Selection', 'View', 'Details']}}
                    contextMenuSettings={{
                        file: [ 'Cut', 'Copy', '|', 'Delete', 'Download', 'Rename', '|', 'Details'],
                        layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', '|', 'Details', '|', 'SelectAll'],
                        visible: true
                    }}>
                        <Inject services={[NavigationPane, DetailsView, Toolbar]} />
                    </FileManagerComponent>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates how to utilize the <a target="_blank" href="https://github.com/SyncfusionExamples/firebase-realtime-database-aspcore-file-provider">Firebase Realtime Database file system provider</a> with File Manager component. It supports all basic file operations such as create, rename, delete, cut, copy, paste, upload, download, and more.</p>
                </div>
                <div id="description">
                    <p>To run the service, create a <a target="_blank" href="https://console.firebase.google.com/">Firebase realtime database</a> and then register the database's <code>Rest API link</code>, <code>root node name</code>, and <code>service account key path </code> in the <code>RegisterFirebaseRealtimeDB</code> method to perform the file operations.</p>
                    <p>Checkout this <a target="_blank" href="https://github.com/SyncfusionExamples/firebase-realtime-database-aspcore-file-provider">Firebase Realtime Database file system provider</a> from the GitHub repository to connect with <code>RegisterFirebaseRealtimeDB</code> method.</p>
                    
                    <b>Note: </b>File Manager's upload functionality is restricted in online demos for security reasons. To work with upload functionality, please download <a target="_blank" href="https://github.com/SyncfusionExamples/ej2-firebase-realtime-database-aspcore-file-provider">ej2-firebase-realtime-database-aspcore-file-provider</a> from the GitHub repository.
                </div>
            </div>
        );
    }
}
