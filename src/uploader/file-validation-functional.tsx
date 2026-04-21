import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { updateSampleSection } from '../common/sample-base';
import {UploaderComponent, SelectedEventArgs, FileInfo, RemovingEventArgs, FailureEventArgs} from '@syncfusion/ej2-react-inputs';
import './uploader.css';
import { useEffect, useRef } from 'react';

const Validation = () => {
	// Uploader component
	useEffect(() => {
		updateSampleSection();
	}, [])
	let uploadObj = useRef<UploaderComponent>(null);
	let asyncSettings: object;
	let allowedExtensions: string;
	let dropContainerRef;
	let dropContainerEle: HTMLElement;

	dropContainerEle = null;
    dropContainerRef = element => {
        dropContainerEle = element;
    };
    asyncSettings = {
        saveUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Remove'
    };
	allowedExtensions= '.doc, .docx, .xls, .xlsx'

	const rendereComplete = (): void => {
		uploadObj.current.dropArea = dropContainerEle;
		uploadObj.current.element.setAttribute('name', 'UploadFiles');
		uploadObj.current.dataBind();
	}
    const onFailure = (args: FailureEventArgs): void => {
      if (args.response && args.response.statusText !== '') {
          args.statusText = args.response.statusText;
      }
    }
	const onFileSelected = (args : SelectedEventArgs): void => {
		args.filesData.splice(5);
		let filesData : FileInfo[] = uploadObj.current.getFilesData();
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
	const onRemoveFile = (args: RemovingEventArgs): void => {
		args.postRawFile = false;
	}

    return (
      	<div className = 'control-pane' ref={dropContainerRef}>
			<div className='control-section col-lg-12 uploadpreview'>
				<div className='upload_wrapper'>
					<UploaderComponent id='UploadFiles' type = 'file' ref = {uploadObj} asyncSettings = {asyncSettings} failure={onFailure.bind(this)} selected={onFileSelected.bind(this)} minFileSize= {10000} autoUpload = {false} removing= {onRemoveFile.bind(this)} allowedExtensions= {allowedExtensions}></UploaderComponent>
				</div>
			</div>
			<div id="action-description">
				<p>This <a href="https://www.syncfusion.com/react-ui-components/react-file-upload" target="_blank">&nbsp;React File Upload</a> example demonstrates how to validate the files before uploading it to server. Only document files (DOC, DOCX, XLS, XLSX), and the files should contain minimum 10 KB and maximum 28 MB sizes to upload it into server.This sample limits maximum files count as 5 to upload.</p>
			</div>
			<div id="description">
				<p>The Uploader component allows to validate the file’s type, and limit the file size using allowedExtensions, minFileSize, and maxFileSize properties. You can also achieve limit the files count before uploading it using select event. </p> 
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
export default Validation;