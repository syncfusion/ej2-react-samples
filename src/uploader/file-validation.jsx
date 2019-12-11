import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { UploaderComponent } from '@syncfusion/ej2-react-inputs';
import './uploader.css';
export class Validation extends SampleBase {
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
        this.minFileSize = 10000;
        this.autoUpload = false;
        this.allowedExtensions = '.doc, .docx, .xls, .xlsx';
    }
    rendereComplete() {
        this.uploadObj.dropArea = this.dropContainerEle;
        this.uploadObj.element.setAttribute('name', 'UploadFiles');
        this.uploadObj.dataBind();
    }
    onFileSelected(args) {
        args.filesData.splice(5);
        let filesData = this.uploadObj.getFilesData();
        let allFiles = filesData.concat(args.filesData);
        if (allFiles.length > 5) {
            for (let i = 0; i < allFiles.length; i++) {
                if (allFiles.length > 5) {
                    allFiles.shift();
                }
            }
            args.filesData = allFiles;
            args.modifiedFilesData = args.filesData;
        }
        args.isModified = true;
    }
    onRemoveFile(args) {
        args.postRawFile = false;
    }
    render() {
        return (<div className='control-pane' ref={this.dropContainerRef}>
			<div className='control-section col-lg-12 uploadpreview'>
				<div className='upload_wrapper'>
					<UploaderComponent id='validation' type='file' ref={(scope) => { this.uploadObj = scope; }} asyncSettings={this.asyncSettings} selected={this.onFileSelected.bind(this)} minFileSize={this.minFileSize} autoUpload={this.autoUpload} removing={this.onRemoveFile.bind(this)} allowedExtensions={this.allowedExtensions}></UploaderComponent>
				</div>
			</div>

			<div id="action-description">
				<p>This example demonstrates how to validate the files before uploading it to server. Only document files (DOC, DOCX, XLS, XLSX),
					and the files should contain minimum 10 KB and maximum 28 MB sizes to upload it into server.This sample limits maximum files count as 5 to upload.</p>
			</div>
			<div id="description">
				<p>The Uploader component allows to validate the file’s type, and limit the file size using allowedExtensions, minFileSize, and maxFileSize properties.
				You can also achieve limit the files count before uploading it using select event. </p>
				 
				<p>For more information, you can refer to the Validation section from this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/uploader/validation/">documentation section</a>.</p>
			</div>
      </div>);
    }
}
