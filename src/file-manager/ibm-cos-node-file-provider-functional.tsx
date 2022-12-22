import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { updateSampleSection } from '../common/sample-base';
import { FileManagerComponent, Inject, NavigationPane, DetailsView, Toolbar, ContextMenu } from '@syncfusion/ej2-react-filemanager';

/**
 * File Manager sample with IBM Cloud Object Storage service
 */
function IBMServer() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let hostUrl: string = "https://ej2-ibm-cos-node-file-provider.azurewebsites.net/";
    return(
        <div>
            <div className="control-section">
                <FileManagerComponent id="filemanager" ajaxSettings = {{
                            url: hostUrl ,
                            getImageUrl: hostUrl + 'GetImage',
                            uploadUrl: hostUrl + 'Upload',
                            downloadUrl: hostUrl + 'Download'
                }} rootAliasName={"Files"}>
                <Inject services={[ NavigationPane, DetailsView, Toolbar, ContextMenu]} />
                </FileManagerComponent>
            </div>
            <div id="action-description">
                <p>This sample demonstrates how to utilize the <a target="_blank" href="https://github.com/SyncfusionExamples/ej2-filemanager-ibm-cos-node-file-provider">IBM Cloud Object Storage file provider</a> with File Manager component. The <code>ej2-filemanager-ibm-cos-node-file-provider</code> is an NPM package for file provider which is available in npmjs, refer this <a target="_blank" href="https://www.npmjs.com/package/@syncfusion/ej2-filemanager-ibm-cos-node-file-provider">link</a> to download package.</p>
            </div>
            <div id="description">
                <p>The File Manager component is used to explore a file through a web application, similar to the windows explorer for windows. It supports all the basic file operations such as create, rename, delete and so on.</p>

                <p><b>Note: </b>File Manager’s upload functionality is restricted in online demo. To work with upload functionality, please download <a target="_blank" href="https://github.com/SyncfusionExamples/ej2-filemanager-ibm-cos-node-file-provider">IBM Cloud Object Storage file provider</a> from the GitHub repository.</p>
            </div>
        </div>
    );
}
export default IBMServer;