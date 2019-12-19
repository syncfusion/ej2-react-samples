import * as React from 'react';
import './uploader.css';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { UploaderComponent } from '@syncfusion/ej2-react-inputs';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
export class Default extends SampleBase {
    constructor(props) {
        super(props);
        this.dropContainerEle = null;
        this.dropContainerRef = element => {
            this.dropContainerEle = element;
        };
        this.asyncSettings = {
            saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
            removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
        };
    }
    rendereComplete() {
        this.uploadObj.dropArea = this.dropContainerEle;
        this.uploadObj.element.setAttribute('name', 'UploadFiles');
        this.uploadObj.dataBind();
    }
    onChange(args) {
        this.uploadObj.autoUpload = args.checked;
        this.uploadObj.clearAll();
    }
    onChanged(args) {
        this.uploadObj.sequentialUpload = args.checked;
        this.uploadObj.clearAll();
    }
    onRemoveFile(args) {
        args.postRawFile = false;
    }
    render() {
        return (<div className='control-pane' ref={this.dropContainerRef}>
        <div className='control-section row uploadpreview'>
         <div className='col-lg-9'>
          <div className='upload_wrapper'>
            
            <UploaderComponent id='fileUpload' type='file' ref={(scope) => { this.uploadObj = scope; }} asyncSettings={this.asyncSettings} removing={this.onRemoveFile.bind(this)}></UploaderComponent>
        </div>
        </div>
        <div className='property-section col-lg-3'>
            <PropertyPane title='Properties'>
                <div className='panel-style'>
                    <CheckBoxComponent checked={true} label='Auto Upload' ref={(scope) => { this.checkboxObj = scope; }} change={this.onChange.bind(this)}></CheckBoxComponent>
                </div>
                <div className='panel-style'>
                    <CheckBoxComponent checked={false} label='Sequential Upload' ref={(scope) => { this.checkboxObj1 = scope; }} change={this.onChanged.bind(this)}></CheckBoxComponent>
                </div>
            </PropertyPane>
        </div>
        </div>
        <div id="action-description">
        <p>This example demonstrates the default functionalities of the file upload component with auto upload and sequential upload options.
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
      </div>);
    }
}
