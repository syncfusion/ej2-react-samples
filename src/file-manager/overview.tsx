import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { FileManagerComponent, Inject, LargeIconsView, NavigationPane, DetailsView, Toolbar, ContextMenu, BreadCrumbBar } from '@syncfusion/ej2-react-filemanager';

export class Overview extends SampleBase<{},{}> {

    private hostUrl: string = "https://ej2services.syncfusion.com/production/web-services/";
    public render(): JSX.Element {
        return(
            <div>
                <div className="control-section">
                    <FileManagerComponent id="overview_file" ajaxSettings = {{
                        url: this.hostUrl + "api/FileManager/FileOperations",
                        getImageUrl: this.hostUrl + "api/FileManager/GetImage",
                        uploadUrl: this.hostUrl + 'api/FileManager/Upload',
                        downloadUrl: this.hostUrl + 'api/FileManager/Download'
                    }} view={"Details"}>
                <Inject services={[ NavigationPane, DetailsView, LargeIconsView, ContextMenu,BreadCrumbBar, Toolbar]} />
                    </FileManagerComponent>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the default rendering of the File Manager with minimum configuration.</p>
                </div>
                <div id="description">
                    <p>The File Manager component is used to explore a file system through a web application, similar to the windows explorer for windows.
                        It supports all the basic file operations such as create, rename, delete and so on.</p>
                </div>
            </div>
        );
    }
}
