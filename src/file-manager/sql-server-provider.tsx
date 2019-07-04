import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { FileManagerComponent, Inject, NavigationPane, DetailsView, Toolbar, ContextMenu } from '@syncfusion/ej2-react-filemanager';

/**
 * File Manager sample with SQL service
 */
export class SqlServer extends SampleBase<{},{}> {

    private hostUrl: string = "https://ng2jq.syncfusion.com/ej2-sql-service/";
    public render(): JSX.Element {
        return(
            <div>
                <div className="control-section">
                    <FileManagerComponent id="filemanager" ajaxSettings = {{
                        url: this.hostUrl + 'api/FileManager/Fileoperations',
                        getImageUrl: this.hostUrl + 'api/FileManager/GetImage',
                        uploadUrl: this.hostUrl + 'api/FileManager/Upload',
                        downloadUrl: this.hostUrl + 'api/FileManager/Download'
                    }}>
                    <Inject services={[ NavigationPane, DetailsView, Toolbar, ContextMenu]} />
                    </FileManagerComponent>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates how to utilize the <a target="_blank" href="https://github.com/SyncfusionExamples/ej2-sql-server-database-aspcore-file-provider">SQL server file system provider</a> with File Manager component. To run the service, configure the SQL server database connection using the <code>SetSQLConnection</code> method to set the connection name, table name and rootId of the SQL table.</p>
                </div>
                <div id="description">
                    <p>The File Manager component is used to explore a file system through a web application, similar to the windows explorer for windows. It supports all the basic file operations such as create, rename, delete and so on.</p>

                    <p><b>Note: </b>File Manager’s upload functionality is restricted in the online demo. If you need to test upload functionality, please install 
                    <a target="_blank" href="https://www.syncfusion.com/downloads">Syncfusion Essential Studio </a>on your machine and run the demo.</p>
                </div>
            </div>
        );
    }
}
