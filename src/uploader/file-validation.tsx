import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import {PropertyPane} from '../common/property-pane';
import {UploaderComponent, SelectedEventArgs, FileInfo, RemovingEventArgs, FailureEventArgs} from '@syncfusion/ej2-react-inputs';
import { ChangeEventArgs } from '@syncfusion/ej2-react-buttons';
import './uploader.css';

export class Validation extends SampleBase<{}, {}> {
// Uploader component
public uploadObj: UploaderComponent;
private asyncSettings: object;
private allowedExtensions: string;
private minFileSize: number;
private autoUpload: boolean;
private dropContainerRef;
private dropContainerEle: HTMLElement;
constructor(props: {}) {
	super(props);
	this.dropContainerEle = null;
    this.dropContainerRef = element => {
        this.dropContainerEle = element;
    };
    this.asyncSettings = {
        saveUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Remove'
    };
	this.minFileSize= 10000;
	this.autoUpload = false;
	this.allowedExtensions= '.doc, .docx, .xls, .xlsx'
}

public rendereComplete(): void {
	this.uploadObj.dropArea = this.dropContainerEle;
	this.uploadObj.element.setAttribute('name', 'UploadFiles');
	this.uploadObj.dataBind();
}

private onFileSelected(args : SelectedEventArgs): void {
	args.filesData.splice(5);
	let filesData : FileInfo[] = this.uploadObj.getFilesData();
	let allFiles : FileInfo[] = filesData.concat(args.filesData);
	if (allFiles.length > 5) {
		for (let i : number = 0; i < allFiles.length; i++) {
			if (allFiles.length > 5) {
				allFiles.shift();
			}
		}
		args.filesData = allFiles;
		args.modifiedFilesData = args.filesData;
	}
	args.isModified = true;
}
private onRemoveFile(args: RemovingEventArgs): void {
    args.postRawFile = false;
}
private onFailure(args: FailureEventArgs): void {
	if (args.response && args.response.statusText !== '') {
		args.statusText = args.response.statusText;
	}
}

public render(): JSX.Element {
    return (
      <div className = 'control-pane' ref={this.dropContainerRef}>
			<div className='control-section col-lg-12 uploadpreview'>
				<div className='upload_wrapper'>
					<UploaderComponent id='UploadFiles' type = 'file' ref = {(scope) => {this.uploadObj = scope}}
						asyncSettings = {this.asyncSettings}
						selected={this.onFileSelected.bind(this)}
						minFileSize= {this.minFileSize}
						autoUpload = {this.autoUpload}
						removing= { this.onRemoveFile.bind(this)}
						failure={this.onFailure.bind(this)}
						allowedExtensions= {this.allowedExtensions}
					></UploaderComponent>
				</div>
			</div>

			<div id="action-description">
				<p>This <a href="https://www.syncfusion.com/react-ui-components/react-file-upload"
            target="_blank">&nbsp;React File Upload</a> example demonstrates how to validate the files before uploading it to server. Only document files (DOC, DOCX, XLS, XLSX),
					and the files should contain minimum 10 KB and maximum 28 MB sizes to upload it into server.This sample limits maximum files count as 5 to upload.</p>
			</div>
			<div id="description">
				<p>The Uploader component allows to validate the file’s type, and limit the file size using allowedExtensions, minFileSize, and maxFileSize properties.
				You can also achieve limit the files count before uploading it using select event. </p>
				 
				<p>For more information, you can refer to the Validation section from this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/uploader/validation/">documentation section</a>.</p>

				<p>In this example, the backend service used in the saveUrl and removeUrl endpoints for saving and removing files is intended for demonstration purposes only. The uploaded files are subjected to thorough validation, including verification of file names and the application of security checks. Therefore, this service is not recommended for production use, and the configuration of a custom backend save and remove service is advised. Additional implementation details can be found in the
            <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/uploader/async#server-side-configuration-for-save-action">saveUrl</a> and
            <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/uploader/async#server-side-configuration-for-remove-action">removeUrl</a>
            documentation.
          </p>
			</div>
      </div>
    );
  }
}
