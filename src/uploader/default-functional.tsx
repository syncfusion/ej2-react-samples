import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { updateSampleSection } from '../common/sample-base';
import './uploader.css';
import {PropertyPane} from '../common/property-pane';
import {UploaderComponent, RemovingEventArgs} from '@syncfusion/ej2-react-inputs';
import {CheckBoxComponent, ChangeEventArgs} from '@syncfusion/ej2-react-buttons';
import { Browser } from '@syncfusion/ej2-base';

function Default(){
// Uploader component
React.useEffect(() => {
    updateSampleSection();
}, [])
let checkboxObj: CheckBoxComponent;
let checkboxObj1: CheckBoxComponent;
let uploadObj: UploaderComponent;
let asyncSettings: object ;
let dropContainerRef;
let dropContainerEle: HTMLElement;
    dropContainerEle = null;
    dropContainerRef = element => {
        dropContainerEle = element;
    };
    asyncSettings = {
        saveUrl: 'https://ej2.syncfusion.com/services/api/uploadbox/Save',
        removeUrl: 'https://ej2.syncfusion.com/services/api/uploadbox/Remove'
    };

function rendereComplete(): void {
    uploadObj.dropArea = dropContainerEle;
    uploadObj.element.setAttribute('name', 'UploadFiles');
    uploadObj.dataBind();
}

function onChange(args: ChangeEventArgs): void {
    uploadObj.autoUpload = args.checked;
    uploadObj.clearAll();
}
function onChanged(args: ChangeEventArgs): void {
    uploadObj.sequentialUpload = args.checked;
    uploadObj.clearAll();
}
function onRemoveFile(args: RemovingEventArgs): void {
    args.postRawFile = false;
}

    return (
      <div className = 'control-pane' ref={dropContainerRef}>
        <div className='control-section row uploadpreview'>
         <div className='col-lg-9'>
          <div className='upload_wrapper'>
            {/* Render Uploader */}
            <UploaderComponent id='fileUpload' type='file' ref = {(scope) => {uploadObj = scope}}
             asyncSettings = {asyncSettings}
            removing= {onRemoveFile.bind(this)}
            ></UploaderComponent>
        </div>
        </div>
        <div className='property-section col-lg-3' id="uploader">
            <PropertyPane title='Properties'>
                <div className = 'panel-style'>
                    <CheckBoxComponent checked={true} label='Auto Upload' ref={(scope) => {checkboxObj = scope; }} change={onChange.bind(this) } ></CheckBoxComponent>
                </div>
                <div className = 'panel-style'>
                    <CheckBoxComponent checked={false} label='Sequential Upload' ref={(scope) => {checkboxObj1 = scope; }} change={onChanged.bind(this) } ></CheckBoxComponent>
                </div>
            </PropertyPane>
        </div>
        </div>
        <div id="action-description">
        <p>This <a href="https://www.syncfusion.com/react-ui-components/react-file-upload"
            target="_blank">&nbsp;React File Upload</a> example demonstrates the default functionalities of the file upload component with auto upload and sequential upload options.
            Browse or drag-and-drop the files which you want to upload to the server and upload it.</p>
        </div>
        <div id="description">
        <p>The Uploader component is useful to upload images, documents, and other files. By default, the component allows to upload multiple files to browse and upload it to server.
           The selected files append to the file list that contains file details such as name, type, and size.</p>
        <p>You can manage the files in server after received the uploaded files. When the files are successfully uploaded to server, the remove button will be change to bin button.
            The uploaded files can be removed by click on the bin button.</p>
        <p>The progress bar displays for each file upload to denote its upload progress. 
            Once the file upload gets success, the progress bar disappear and corresponding upload status message will be displayed in same place.</p>
        <p>More information on the Uploader instantiation can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/uploader/getting-started/">documentation section</a>.</p>
        </div>
      </div>
    );
}
export default Default;