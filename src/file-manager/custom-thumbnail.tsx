import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { FileManagerComponent, Inject, LargeIconsView, NavigationPane, DetailsView, Toolbar, ContextMenu, BreadCrumbBar } from '@syncfusion/ej2-react-filemanager';
import './custom-thumbnail.css';

export class CustomThumbnail extends SampleBase<{},{}> {

    private hostUrl: string = "https://ej2services.syncfusion.com/production/web-services/";
    public render(): JSX.Element {
        return(
            <div>
                <div className="control-section">
                    <FileManagerComponent id="Thumbnail_filemanager" ajaxSettings = {{
                        url: this.hostUrl + "api/FileManager/FileOperations",
                        getImageUrl: this.hostUrl + "api/FileManager/GetImage",
                        uploadUrl: this.hostUrl + 'api/FileManager/Upload',
                        downloadUrl: this.hostUrl + 'api/FileManager/Download'
                    }} view={"LargeIcons"} showThumbnail = {false}>
                <Inject services={[ NavigationPane, DetailsView, LargeIconsView, ContextMenu,BreadCrumbBar, Toolbar]} />
                    </FileManagerComponent>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the custom thumbnail of the File Manager you can customize with your own icon.</p>
                </div>
                <div id="description">
                    <p>The File Manager component is used to explore a file system through a web application, similar to the windows explorer for windows.
                        It supports the basic file operations such as create, rename, delete.</p>
                </div>
            </div>
        );
    }
}
