import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { FileManagerComponent, Inject, NavigationPane, DetailsView, Toolbar, Virtualization } from '@syncfusion/ej2-react-filemanager';

/**
 * File Manager virtualization feature sample
 */
export class VirtualizationSample extends SampleBase<{},{}> {

    private hostUrl: string = "https://ej2-aspcore-service.azurewebsites.net/";

    public render(): JSX.Element {
        return(
            <div>
                <div className="control-section">
                    <FileManagerComponent id="filemanager" ajaxSettings = {{
                        url: this.hostUrl + "api/Virtualization/FileOperations",
                        getImageUrl: this.hostUrl + "api/Virtualization/GetImage",
                        uploadUrl: this.hostUrl + 'api/Virtualization/Upload',
                        downloadUrl: this.hostUrl + 'api/Virtualization/Download'
                    }}
                    toolbarSettings={{items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'View', 'Details']}}
                    contextMenuSettings={{
                        file: [ 'Cut', 'Copy', '|', 'Delete', 'Download', 'Rename', '|', 'Details'],
                        layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', '|', 'Details', '|', 'SelectAll'],
                        visible: true
                    }}
                    view = {"Details"}
                    enableVirtualization = {true}>
                <Inject services={[ NavigationPane, DetailsView, Toolbar, Virtualization]} />
                    </FileManagerComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample illustrates the implementation of UI virtualization within the File Manager component, enhancing performance and user experience by dynamically loading folders and files as the user scrolls through the items. In both the details view and large icons view, the component efficiently handles extensive data sets, ensuring smooth navigation. Particularly, the <code>documents</code> and <code>text documents</code> folders in this example contain a substantial number of files, showcasing the capability of the File Manager to manage and display large volumes of data seamlessly.
                    </p>
                </div>
                <div id="description">
                    <p>In this demo, virtualization is enabled by setting the <a href="https://ej2.syncfusion.com/react/documentation/api/file-manager/#enablevirtualization" target="_blank">enableVirtualization</a> property to <code>true</code>.</p>
                    <p>To use the virtual scrolling feature, inject the virtualization module using the <code>FileManager.Inject(Virtualization)</code> section.</p>
                    <p>
                        <b>Note: </b>File Manager's upload functionality is restricted in the online demos for security reasons. If you need to test upload functionality, please install 
                        <a target="_blank" href="https://www.syncfusion.com/downloads"> Syncfusion<sup>®</sup> Essential Studio<sup>®</sup> </a>on your machine and run the demo.
                    </p>
                </div>
            </div>
        );
    }
}