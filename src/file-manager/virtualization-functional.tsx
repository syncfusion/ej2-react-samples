import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { updateSampleSection } from '../common/sample-base';
import { FileManagerComponent, Inject, NavigationPane, DetailsView, Toolbar, Virtualization } from '@syncfusion/ej2-react-filemanager';

/**
 * File Manager virtualization feature sample
 */
function VirtualizationSample() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])

    let hostUrl: string = "https://ej2-aspcore-service.azurewebsites.net/";
    function onBeforeSend(args) {
        args.ajaxSettings.beforeSend = function (args) {
            args.httpRequest.setRequestHeader('Authorization', 'FileBrowser');
        };
    }
    function beforeImageLoad(args) {
        args.imageUrl = args.imageUrl + '&rootName=' + 'FileBrowser';
    }
    function beforeDownload(args) {
        args.data.rootFolderName = 'FileBrowser';
    }
    return(
        <div>
            <div className="control-section">
                <FileManagerComponent id="filemanager" 
                    ajaxSettings = {{
                        url: hostUrl + "api/FileManager/FileOperations",
                        getImageUrl: hostUrl + "api/FileManager/GetImage",
                        uploadUrl: hostUrl + 'api/FileManager/Upload',
                        downloadUrl: hostUrl + 'api/FileManager/Download'
                    }}
                    toolbarSettings={{items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'View', 'Details']}}
                    contextMenuSettings={{
                    layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', '|', 'Details', '|', 'SelectAll']}}
                    view = {"Details"}
                    enableVirtualization = {true}
                    beforeSend={onBeforeSend.bind(this)}
                    beforeImageLoad={beforeImageLoad.bind(this)}
                    beforeDownload={beforeDownload.bind(this)}>
                <Inject services={[ NavigationPane, DetailsView, Toolbar, Virtualization]} />
                </FileManagerComponent>
            </div>
            <div id="action-description">
                <p>This sample demonstrates UI virtualization of the File Manager component. Scroll the items in details view or large icons view to load the folders/files dynamically. The folder 'Documents' and 'Text Documents' has large set of files in below sample.</p>
            </div>
            <div id="description">
                <p>In the demo, enabled virtualization by using <code>enableVirtualization</code> property as true.</p>
                <p>To use virtual scrolling feature, inject Virtualization module using the <code>FileManager.Inject(Virtualization)</code> section.</p>
                    <p>
                        <b>Note: </b>File Manager's upload functionality is restricted in the online demo. If you need to test upload functionality, please install 
                        <a target="_blank" href="https://www.syncfusion.com/downloads"> Syncfusion Essential Studio </a>on your machine and run the demo.
                     </p>
            </div>
        </div>
    );
}
export default VirtualizationSample;