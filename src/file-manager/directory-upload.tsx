import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { FileManagerComponent, Inject, NavigationPane, DetailsView, Toolbar, ToolbarItemsDirective, ToolbarItemDirective } from '@syncfusion/ej2-react-filemanager';
import { DropDownButtonComponent, ItemModel } from '@syncfusion/ej2-react-splitbuttons';

/**
 * File Manager folder upload sample
 */
export class DirectoryUpload extends SampleBase<{},{}> {
    public fmObj: FileManagerComponent;
    private hostUrl: string = "https://ej2-aspcore-service.azurewebsites.net/";
    private items: ItemModel[] = [{ text: 'Folder' }, { text: 'Files' }];
    private uploadTemplate(){
        return(
            <DropDownButtonComponent id="dropButton" items={this.items} iconCss='e-icons e-fe-upload' cssClass= "e-tbar-btn e-tbtn-txt" select={this.onSelect.bind(this)} onClick={this.uploadClick.bind(this)}>
                <span className="e-tbar-btn-text">Upload</span>
            </DropDownButtonComponent>
        );
    }
    private uploadClick(e) {
        e.stopPropagation();
    }
    private onSelect(args){
        if (args.item.text === 'Folder') {
            this.fmObj.uploadSettings.directoryUpload = true;
          } else {
            this.fmObj.uploadSettings.directoryUpload = false;
          }
          setTimeout(function () {
            let uploadBtn: HTMLElement = document.querySelector('.e-file-select-wrap button');
            uploadBtn.click();
          }, 100);
    }       
    
    public render(): JSX.Element {
        return(
            <div>
                <div className="control-section">
                    <FileManagerComponent id="file" ref={(scope) => { this.fmObj = scope; }} ajaxSettings={{
                        url: this.hostUrl + "api/FileManager/FileOperations",
                        getImageUrl: this.hostUrl + "api/FileManager/GetImage",
                        uploadUrl: this.hostUrl + 'api/FileManager/Upload',
                        downloadUrl: this.hostUrl + 'api/FileManager/Download'}}
                        contextMenuSettings={{
                            file: [ 'Cut', 'Copy', '|', 'Delete', 'Download', 'Rename', '|', 'Details'],
                            visible: true
                        }}>
                        <ToolbarItemsDirective>
                            <ToolbarItemDirective name='NewFolder'/>
                            <ToolbarItemDirective template={this.uploadTemplate.bind(this)} name="Upload" />
                            <ToolbarItemDirective name="SortBy" />
                            <ToolbarItemDirective name="Refresh" />
                            <ToolbarItemDirective name="Cut" />
                            <ToolbarItemDirective name="Copy" />
                            <ToolbarItemDirective name="Paste" />
                            <ToolbarItemDirective name="Delete" />
                            <ToolbarItemDirective name="Download" />
                            <ToolbarItemDirective name="Rename" />
                            <ToolbarItemDirective name="Selection" />
                            <ToolbarItemDirective name="View" />
                            <ToolbarItemDirective name="Details" />
                        </ToolbarItemsDirective>
                            <Inject services={[NavigationPane, DetailsView, Toolbar]} />
                    </FileManagerComponent>

                </div>
                <div id="action-description">
                    <p>This sample demonstrates the folder (directory) upload feature. Select <code>Folder</code> from the <code>Upload</code> toolbar item to select and upload a folder in the File Manager component.</p>
                </div>
                <div id="description">
                    <p>In this demo, a folder upload is enabled by setting <a href="https://ej2.syncfusion.com/react/documentation/api/file-manager/uploadSettingsModel/#directoryupload" target="_blank"> directoryUpload </a> to <code>true</code>. It allows users to select or drag and drop a folder to upload its contents including hierarchy folders and files in the File Manager component.</p>
                    <p>The folder (directory) upload is supported for the following file system providers, </p>
                        <ul>
                            <li> Physical provider</li> 
                            <li> NodeJS provider</li>
                            <li> Azure provider</li>
                            <li> Amazon S3 provider</li>
                        </ul>
                    <p>To efficiently upload large files and folders to the server in manageable chunks, use the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/file-manager/uploadsettingsmodel/#chunksize">chunkSize</a> property to specify the desired chunk size.</p>
                    <p>
                        <b>Note: </b>File Manager's upload functionality is restricted in the online demos for security reasons. If you need to test upload functionality, please install 
                        <a target="_blank" href="https://www.syncfusion.com/downloads"> Syncfusion Essential Studio </a>on your machine and run the demo.
                     </p>
                </div>
            </div>
        );
    }
}
