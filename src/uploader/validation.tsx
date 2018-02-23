import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import {PropertyPane} from '../common/property-pane';
import {UploaderComponent, SelectedEventArgs, FileInfo} from '@syncfusion/ej2-react-inputs';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-react-popups';
import { ChangeEventArgs } from '@syncfusion/ej2-react-buttons';
import { detach } from '@syncfusion/ej2-base';
import './uploader.css';

export class Validation extends SampleBase<{}, {}> {
// Uploader component
public uploadObj: UploaderComponent;

rendereComplete() {
	this.uploadObj.dropArea = document.getElementsByClassName('control-fluid')[0] as HTMLElement;
	this.uploadObj.dataBind();
}

onFileSelected(args : SelectedEventArgs) : void {
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

onSuccess(args: any) : void {
    let li: HTMLElement = document.getElementsByClassName('e-upload')[0].querySelector('[data-file-name="' + args.file.name + '"]');
    if (args.operation === 'upload') {
        (li.querySelector('.e-file-delete-btn') as HTMLElement).onclick = () => {
            // create spinner to uploader component
            createSpinner({ target: document.getElementsByClassName('e-upload')[0] as HTMLElement, width: '25px' });
            showSpinner(document.getElementsByClassName('e-upload')[0] as HTMLElement);
        };
		(li.querySelector('.e-file-delete-btn') as HTMLElement).onkeydown = (e: any) => {
		if (e.keyCode === 13) { 
			createSpinner({ target: document.getElementsByClassName('e-upload')[0] as HTMLElement, width: '25px' });
			showSpinner(document.getElementsByClassName('e-upload')[0] as HTMLElement);
			}
		}
    } else {
        hideSpinner(document.getElementsByClassName('e-upload')[0] as HTMLElement);
        detach(document.getElementsByClassName('e-upload')[0].querySelector('.e-spinner-pane'));
    }
}

render() {
    return (
      <div className = 'control-pane'>
			<div className='control-section col-lg-12 uploadpreview'>
				<div className='upload_wrapper'>
					<UploaderComponent id='validation' type = 'file' ref = {(scope) => {this.uploadObj = scope}}
						asyncSettings = {{
							saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
							removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
						}}
						success={this.onSuccess.bind(this)}
						selected={this.onFileSelected.bind(this)}
						minFileSize= {10000}
						autoUpload = {false}
						allowedExtensions= '.doc, .docx, .xls, .xlsx'
					></UploaderComponent>
				</div>
			</div>

			<div id="action-description">
				<p>This sample demonstrates how to validate the files before uploading it to server. Only document files (DOC, DOCX, XLS, XLSX),
					and the files should contain minimum 10 KB and maximum 4 MB sizes to upload it into server.This sample limits maximum files count as 5 to upload.</p>
			</div>
			<div id="description">
				<p>The Uploader component allows to validate the file’s type, and limit the file size using allowedExtensions, minFileSize, and maxFileSize properties.
				You can also achieve limit the files count before uploading it using select event. </p>
				 
				<p>For more information, you can refer to the Validation section from the documentation.</p>
			</div>
      </div>
    )
  }
}
