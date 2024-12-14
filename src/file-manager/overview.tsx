import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { FileManagerComponent, Inject, NavigationPane, DetailsView, Toolbar } from '@syncfusion/ej2-react-filemanager';

/**
 * File Manager full functionalities sample
 */
export class Overview extends SampleBase<{},{}> {

    private hostUrl: string = "https://ej2-aspcore-service.azurewebsites.net/";
    public render(): JSX.Element {
        return(
            <div>
                <div className="control-section">
                    <FileManagerComponent id="overview_file" ajaxSettings = {{
                        url: this.hostUrl + "api/FileManager/FileOperations",
                        getImageUrl: this.hostUrl + "api/FileManager/GetImage",
                        uploadUrl: this.hostUrl + 'api/FileManager/Upload',
                        downloadUrl: this.hostUrl + 'api/FileManager/Download'
                    }}
                    toolbarSettings={{items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'Selection', 'View', 'Details']}}
                    contextMenuSettings={{
                        file: [ 'Cut', 'Copy', '|', 'Delete', 'Download', 'Rename', '|', 'Details'],
                        layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', '|', 'Details', '|', 'SelectAll'],
                        visible: true
                    }}
                    view={"Details"}
                    detailsViewSettings={{
                        columns: [
                            {
                                field: 'name', headerText: 'Name', customAttributes: { class: 'e-fe-grid-name' }
                            },
                            {
                                field: '_fm_modified', headerText: 'DateModified', format: 'MM/dd/yyyy hh:mm a'
                            },
                            {
                                field: 'size', headerText: 'Size', template: '<span class="e-fe-size">${size}</span>', format: 'n2'
                            }
                        ]
                    }}>
                <Inject services={[ NavigationPane, DetailsView, Toolbar]} />
                    </FileManagerComponent>
                </div>
                <div id="action-description">
                    <p>
                        The File Manager component is an efficient tool for managing files and folders, providing a comprehensive set of features such as a <a href="https://ej2.syncfusion.com/react/documentation/api/file-manager/#toolbarsettings" target="_blank"> toolbar</a>, <a href="https://ej2.syncfusion.com/react/documentation/api/file-manager/#navigationpanesettings" target="_blank"> navigation pane</a> and <a href="https://ej2.syncfusion.com/react/documentation/api/file-manager/#detailsviewsettings" target="_blank"> details view</a>, which make it easy to create, rename, delete, cut, copy, paste, upload, download, and more. With its user-friendly interface, users can easily navigate through folders and effortlessly select their desired files or folders.
                    </p>
                </div>
                <div id="description">
                    <p>The File Manager component is a great tool for navigating a file system within a web application, offering functionality similar to Windows Explorer. It supports essential file operations, including <code>creating</code>, <code>renaming</code>, <code>deleting</code>, <code>refreshing</code>, and more.</p>
                    <p>The <a href="https://ej2.syncfusion.com/react/documentation/api/file-manager/#ajaxsettings" target="_blank"> ajaxSettings </a> must be defined when initializing the File Manager, as it uses the URLs specified in <a href="https://ej2.syncfusion.com/react/documentation/api/file-manager/#ajaxsettings" target="_blank"> ajaxSettings </a> to send file operation requests to the server.</p>
                    <p>The context menu can be customized using the <a href="https://ej2.syncfusion.com/react/documentation/api/file-manager/#contextmenusettings" target="_blank"> contextMenuSettings </a> API, which is used to add new menu items.</p>
                    <p>The custom toolbar items can be added and customized using the <a href="https://ej2.syncfusion.com/react/documentation/api/file-manager/#toolbarsettings" target="_blank"> toolbarSettings </a> API. If a new toolbar is needed, it can be added using the <a href="https://ej2.syncfusion.com/react/documentation/api/file-manager/#toolbarsettings" target="_blank"> toolbarSettings </a>.</p>
                    <p>
                        <b>Note: </b>File Manager's upload functionality is restricted in the online demos for security reasons. If you need to test upload functionality, please install 
                        <a target="_blank" href="https://www.syncfusion.com/downloads"> Syncfusion<sup>®</sup> Essential Studio<sup>®</sup> </a>on your machine and run the demo.
                     </p>
                </div>
            </div>
        );
    }
}
