import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from "react";
import { updateSampleSection } from '../common/sample-base';
import { FileManagerComponent, Inject, NavigationPane, DetailsView, Toolbar } from '@syncfusion/ej2-react-filemanager';

/**
 * File Manager sample with firebase realtime database service
 */
const Firebase = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    let hostUrl: string = "https://realtime-firebase.azurewebsites.net/";
    return (
        <div>
            <div className="control-section">
                <FileManagerComponent id="firebase" ajaxSettings={{url: hostUrl + 'api/FirebaseProvider/FirebaseRealtimeFileOperations', getImageUrl: hostUrl + 'api/FirebaseProvider/FirebaseRealtimeGetImage', uploadUrl: hostUrl + 'api/FirebaseProvider/FirebaseRealtimeUpload', downloadUrl: hostUrl + 'api/FirebaseProvider/FirebaseRealtimeDownload'}} toolbarSettings={{items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'Selection', 'View', 'Details']}} contextMenuSettings={{layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', '|', 'Details', '|', 'SelectAll']}}>
                    <Inject services={[NavigationPane, DetailsView, Toolbar]} />
                </FileManagerComponent>
            </div>
            <div id="action-description">
                <p>This sample demonstrates how to utilize the Firebase realtime cloud storage database with File Manager component.To run the service, create an <a target="_blank" href="https://console.firebase.google.com/">firebase realtime database</a> and then register the firebase realtime database <b>Rest API link</b> and <b>root node</b> name using <code>RegisterFirebaseRealtimeDB</code> method to perform the file operations.</p>
            </div>
            <div id="description">
                <p>The File Manager component is used to explore a file system through a web application, similar to the windows explorer for windows. It supports all the basic file operations such as create, rename, delete and so on.</p>
                <b>Note: </b>File Manager's upload functionality is restricted in online demo. To work with upload functionality, please download <a target="_blank" href="https://github.com/SyncfusionExamples/ej2-firebase-realtime-database-aspcore-file-provider">ej2-firebase-realtime-database-aspcore-file-provider</a> from the GitHub repository.
            </div>
        </div>
    );
}
export default Firebase;
