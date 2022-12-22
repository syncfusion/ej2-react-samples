import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { updateSampleSection } from '../common/sample-base';
import {PropertyPane} from '../common/property-pane';
import {UploaderComponent, SelectedEventArgs, FileInfo, RemovingEventArgs} from '@syncfusion/ej2-react-inputs';
import { ChangeEventArgs } from '@syncfusion/ej2-react-buttons';
import './uploader.css';

function Validation() {
// Uploader component
React.useEffect(() => {
    updateSampleSection();
}, [])
let uploadObj: UploaderComponent;
let asyncSettings: object;
let allowedExtensions: string;
let minFileSize: number;
let autoUpload: boolean;
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
	minFileSize= 10000;
	autoUpload = false;
	allowedExtensions= '.doc, .docx, .xls, .xlsx'

function rendereComplete(): void {
	uploadObj.dropArea = dropContainerEle;
	uploadObj.element.setAttribute('name', 'UploadFiles');
	uploadObj.dataBind();
}

function onFileSelected(args : SelectedEventArgs): void {
	args.filesData.splice(5);
	let filesData : FileInfo[] = uploadObj.getFilesData();
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
function onRemoveFile(args: RemovingEventArgs): void {
    args.postRawFile = false;
}

    return (
      <div className = 'control-pane' ref={dropContainerRef}>
			<div className='control-section col-lg-12 uploadpreview'>
				<div className='upload_wrapper'>
					<UploaderComponent id='validation' type = 'file' ref = {(scope) => {uploadObj = scope}}
						asyncSettings = {asyncSettings}
						selected={onFileSelected.bind(this)}
						minFileSize= {minFileSize}
						autoUpload = {autoUpload}
						removing= {onRemoveFile.bind(this)}
						allowedExtensions= {allowedExtensions}
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
			</div>
      </div>
    );
}
export default Validation;