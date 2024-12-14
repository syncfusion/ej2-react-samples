import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { UploaderComponent } from '@syncfusion/ej2-react-inputs';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { SampleBase } from '../common/sample-base';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { FileManagerComponent, Inject, NavigationPane, DetailsView, Toolbar } from '@syncfusion/ej2-react-filemanager';
import './file-upload.css';

/**
 * File Manager real time use case sample
 */

export class FileUpload extends SampleBase<{},{hideDialog: boolean}> {
    public fileUploadObj: UploaderComponent;
    public dialogObj: DialogComponent;
    public filemanagerObj: FileManagerComponent; 
    private animationSettings;
    constructor(props: {}) {
        super(props);
        this.animationSettings = { effect: 'None' };
    }

    // 'Uploader' will be shown, if Dialog is closed
    public dialogClose(): void {
        document.getElementById('uploadFileManager').style.display = 'block';
    }

    // 'Uploader' will be hidden, if Dialog is opened
    public dialogOpen(): void {
        document.getElementById('uploadFileManager').style.display = 'none';
    }

    // File Manager's fileOpen event function
    public onFileOpen(args: any): void {
        let file = (args as any).fileDetails;
        if (file.isFile) {
            args.cancel = true;
            if (file.size <= 0 ) { file.size = 10000; }
            this.fileUploadObj.files = [{name: file.name, size: file.size, type: file.type }];
            this.dialogObj.hide();
        }
    }

    btnClick(): void {
        this.dialogObj.show();
        this.dialogOpen();
        this.filemanagerObj.path = '/';
        this.filemanagerObj.selectedItems = [];
        this.filemanagerObj.refresh();
    }
    private hostUrl: string = "https://ej2-aspcore-service.azurewebsites.net/";
    public render(): JSX.Element {
        return(
            <div>
            <div className="control-section">
                <div id='uploadFileManager' className="fileupload">
                    <UploaderComponent id='fileUpload' type='file' ref = {(scope) => {this.fileUploadObj = scope}}></UploaderComponent>
                    <ButtonComponent id="openBtn"  onClick={ this.btnClick.bind(this) }>File Browser</ButtonComponent>
                </div>
                <div id='target' className="control-section">
                    <DialogComponent width='850px' id='dialog' target={'#target'} ref={(scope) => {this.dialogObj = scope}} header="Select a file" showCloseIcon={true} 
                        visible={false} open={this.dialogOpen.bind(this)} close={this.dialogClose.bind(this)} animationSettings={this.animationSettings} >
                        <FileManagerComponent id="filemanager" ref = {(scope) => {this.filemanagerObj = scope}} ajaxSettings = {{
                            url: this.hostUrl + "api/FileManager/FileOperations",
                            getImageUrl: this.hostUrl + "api/FileManager/GetImage",
                            uploadUrl: this.hostUrl + 'api/FileManager/Upload',
                            downloadUrl: this.hostUrl + 'api/FileManager/Download'
                            }} allowMultiSelection={false} 
                            toolbarSettings={{ items: ['NewFolder', 'Upload', 'Delete', 'Cut', 'Copy', 'Rename', 'SortBy', 'Refresh', 'Selection', 'View', 'Details'] }} 
                            contextMenuSettings={{
                                file: [ 'Cut', 'Copy', '|', 'Delete', 'Download', 'Rename', '|', 'Details'],
                                layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', '|', 'Details', '|', 'SelectAll'],
                                visible: true
                            }} fileOpen={this.onFileOpen.bind(this)}>
                        <Inject services={[ NavigationPane, DetailsView, Toolbar]} />
                        </FileManagerComponent>
                    </DialogComponent>
                </div>
            </div>
            <div id="action-description">
            <p>This sample demonstrates the real-time use case of File Manager in a web application. <a href="https://ej2.syncfusion.com/react/documentation/dialog/getting-started" target="_blank"> Dialog </a> and <a href="https://ej2.syncfusion.com/react/documentation/uploader/getting-started" target="_blank"> Uploader </a> components are integrated with the File Manager. Click the browse button in the uploader element to open the File Manager inside the <code>Dialog</code> component. </p>
            </div>
            <div id="description">
                <p>The File Manager component is used to explore a file system through a web application, similar to the Windows Explorer for Windows. It supports all the basic file operations such as create, rename, delete, cut, copy, paste, upload, download, and more.</p>

                <p>
                    <b>Note: </b>File Manager's upload functionality is restricted in the online demos for security reasons. If you need to test upload functionality, please install 
                    <a target="_blank" href="https://www.syncfusion.com/downloads"> Syncfusion<sup>®</sup> Essential Studio<sup>®</sup> </a>on your machine and run the demo.
                </p>
            </div>
            </div>
        );
    }

}