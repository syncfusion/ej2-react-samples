import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { FileManagerComponent, Inject, NavigationPane, DetailsView, Toolbar, ContextMenu } from '@syncfusion/ej2-react-filemanager';
/**
 * File Manager sample with NodeJs service
 */
export class NodeJSServer extends SampleBase {
    constructor() {
        super(...arguments);
        this.hostUrl = "https://ej2-nodejs-service.azurewebsites.net/";
    }
    render() {
        return (<div>
                <div className="control-section">
                    <FileManagerComponent id="filemanager" ajaxSettings={{
            url: this.hostUrl,
            getImageUrl: this.hostUrl + 'GetImage',
            uploadUrl: this.hostUrl + 'Upload',
            downloadUrl: this.hostUrl + 'Download'
        }}>
                    <Inject services={[NavigationPane, DetailsView, Toolbar, ContextMenu]}/>
                    </FileManagerComponent>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates how to utilize the <a target="_blank" href="https://github.com/SyncfusionExamples/ej2-filemanager-node-filesystem">NodeJS file system provider</a> with File Manager component. The <code>ej2-filemanager-node-filesystem</code> is an npm packages for file system provider which is available in npmjs, refer this <a target="_blank" href="https://www.npmjs.com/package/@syncfusion/ej2-filemanager-node-filesystem">link</a> to download package.</p>
                </div>
                <div id="description">
                    <p>The File Manager component is used to explore a file system through a web application, similar to the windows explorer for windows. It supports all the basic file operations such as create, rename, delete and so on.</p>

                    <p><b>Note: </b>File Manager’s upload functionality is restricted in online demo. To work with upload functionality, please download <a target="_blank" href="https://github.com/SyncfusionExamples/ej2-filemanager-node-filesystem">NodeJS File Provider</a> from the GitHub repository.</p>
                </div>
            </div>);
    }
}
