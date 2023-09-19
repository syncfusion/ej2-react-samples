import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { FileManagerComponent, Inject, NavigationPane, DetailsView, Toolbar, ContextMenu } from '@syncfusion/ej2-react-filemanager';

/**
 * File Manager sample with NodeJs service
 */
export class NodeJSServer extends SampleBase<{},{}> {

    private hostUrl: string = "https://ej2-nodejs-service.azurewebsites.net/";
    public render(): JSX.Element {
        return(
            <div>
                <div className="control-section">
                    <FileManagerComponent id="filemanager" ajaxSettings = {{
                             url: this.hostUrl ,
                             getImageUrl: this.hostUrl + 'GetImage',
                             uploadUrl: this.hostUrl + 'Upload',
                             downloadUrl: this.hostUrl + 'Download'
                    }}
                    toolbarSettings={{items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'Selection', 'View', 'Details']}}
                    contextMenuSettings={{
                    layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', '|', 'Details', '|', 'SelectAll']}}>
                    <Inject services={[ NavigationPane, DetailsView, Toolbar, ContextMenu]} />
                    </FileManagerComponent>
                </div>
                <div id="action-description">
                    <p>The "NodeJS File Provider" example in the React File Manager component demonstrates the usage of the <a target="_blank" href="https://github.com/SyncfusionExamples/ej2-filemanager-node-filesystem">NodeJS file system provider</a> with the File Manager component. The <code>ej2-filemanager-node-filesystem</code> is an NPM package that provides the file system functionality for the File Manager component. You can download this package from the npmjs website by following the provided <a target="_blank" href="https://www.npmjs.com/package/@syncfusion/ej2-filemanager-node-filesystem">link</a>.</p>
                </div>
                <div id="description">
                    <p>The File Manager component enables users to explore a file system within a web application, similar to the Windows Explorer in Windows operating systems. It offers a wide range of features, including basic file operations such as creating, renaming, and deleting files and folders.</p>

                    <p><b>Note: </b>The upload functionality of the File Manager component is restricted in the online demo. To work with the upload functionality, you can download the <a target="_blank" href="https://github.com/SyncfusionExamples/ej2-filemanager-node-filesystem">NodeJS File Provider</a> from the GitHub repository, which provides the necessary server-side functionality.</p>
                </div>
            </div>
        );
    }
}
