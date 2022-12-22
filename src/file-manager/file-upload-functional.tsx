import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { UploaderComponent } from '@syncfusion/ej2-react-inputs';
import { DialogComponent,AnimationSettingsModel } from '@syncfusion/ej2-react-popups';
import { updateSampleSection } from '../common/sample-base';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { FileManagerComponent, Inject, NavigationPane, DetailsView, Toolbar } from '@syncfusion/ej2-react-filemanager';
import './file-upload.css';

/**
 * File Manager real time use case sample
 */

function FileUpload () {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let fileUploadObj: UploaderComponent;
    let dialogObj: DialogComponent;
    let filemanagerObj: FileManagerComponent; 
    let animationSettings:AnimationSettingsModel = { effect: 'None' };
    // 'Uploader' will be shown, if Dialog is closed
    function dialogClose(): void {
        document.getElementById('uploadFileManager').style.display = 'block';
    }

    // 'Uploader' will be hidden, if Dialog is opened
    function dialogOpen(): void {
        document.getElementById('uploadFileManager').style.display = 'none';
    }

    // File Manager's fileOpen event function
    function onFileOpen(args: any): void {
        let file = (args as any).fileDetails;
        if (file.isFile) {
            args.cancel = true;
            if (file.size <= 0 ) { file.size = 10000; }
            fileUploadObj.files = [{name: file.name, size: file.size, type: file.type }];
            dialogObj.hide();
        }
    }
    function btnClick(): void {
        dialogObj.show();
        dialogOpen();
        filemanagerObj.path = '/';
        filemanagerObj.selectedItems = [];
        filemanagerObj.refresh();
    }
    let hostUrl: string = "https://ej2-aspcore-service.azurewebsites.net/";
    let contextmenuItems: string[] = ['Open', '|', 'Cut', 'Copy', 'Delete', 'Rename', '|', 'Details'];
    return(
        <div>
        <div className="control-section">
            <div id='uploadFileManager' className="fileupload">
                <UploaderComponent id='fileUpload' type='file' ref = {(scope) => {fileUploadObj = scope}}></UploaderComponent>
                <ButtonComponent id="openBtn"  onClick={ btnClick.bind(this) }>File Browser</ButtonComponent>
            </div>
            <div id='target' className="control-section">
                <DialogComponent width='850px' id='dialog' target={'#target'} ref={(scope) => {dialogObj = scope}} header="Select a file" showCloseIcon={true} 
                    visible={false} open={dialogOpen.bind(this)} close={dialogClose.bind(this)} animationSettings={animationSettings} >
                    <FileManagerComponent id="filemanager" ref = {(scope) => {filemanagerObj = scope}} ajaxSettings = {{
                        url: hostUrl + "api/FileManager/FileOperations",
                        getImageUrl: hostUrl + "api/FileManager/GetImage",
                        uploadUrl: hostUrl + 'api/FileManager/Upload',
                        downloadUrl: hostUrl + 'api/FileManager/Download'
                        }} allowMultiSelection={false} 
                        toolbarSettings={{ items: ['NewFolder', 'Upload', 'Delete', 'Cut', 'Copy', 'Rename', 'SortBy', 'Refresh', 'Selection', 'View', 'Details'] }} 
                        contextMenuSettings={{ file: contextmenuItems, folder: contextmenuItems }} fileOpen={onFileOpen.bind(this)}>
                    <Inject services={[ NavigationPane, DetailsView, Toolbar]} />
                    </FileManagerComponent>
                </DialogComponent>
            </div>
        </div>
        <div id="action-description">
            <p>This sample demonstrates the real-time use case of File Manager in a web application. Dialog and Uploader components are integrated with the File Manager. Click the browse button in the Uploader element to open the File Manager inside the Dialog control. </p>
        </div>
        <div id="description">
            <p>The File Manager component is used to explore a file system through a web application, similar to the windows explorer for windows.
            It supports all the basic file operations such as create, rename, delete and so on.</p>

            <p>
                <b>Note: </b>File Manager's upload functionality is restricted in the online demo. If you need to test upload functionality, please install 
                <a target="_blank" href="https://www.syncfusion.com/downloads"> Syncfusion Essential Studio </a>on your machine and run the demo.
            </p>
        </div>
        </div>
    );
}
export default FileUpload;