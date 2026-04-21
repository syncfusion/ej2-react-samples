import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { updateSampleSection } from '../common/sample-base';
import './uploader.css';
import {PropertyPane} from '../common/property-pane';
import {UploaderComponent, FilesDirective, UploadedFilesDirective, RemovingEventArgs, FailureEventArgs} from '@syncfusion/ej2-react-inputs';
import { useEffect, useRef } from 'react';

const Preloadfiles = () => {
// Uploader component
	useEffect(() => {
		updateSampleSection();
	}, [])
	let uploadObj = useRef<UploaderComponent>(null);
	let dropElement: HTMLElement;
	let asyncSettings: object;
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
    const onFailure = (args: FailureEventArgs): void => {
      if (args.response && args.response.statusText !== '') {
          args.statusText = args.response.statusText;
      }
    }
	const rendereComplete = (): void => {
		dropElement = dropContainerEle;
		uploadObj.current.dropArea = dropElement;
		uploadObj.current.dataBind();
		uploadObj.current.element.setAttribute('name', 'UploadFiles');
	}
	const onRemoveFile = (args: RemovingEventArgs): void => {
		args.postRawFile = false;
	}
	const clearButtonClick = (): void => {
		uploadObj.current.clearAll();
	}

    return (
      	<div className = 'control-pane' ref={dropContainerRef}>
			<div className='control-section uploadpreview'>
				<div className='col-lg-9'>
					<div className='validation_wrapper'>
						<UploaderComponent id='UploadFiles' type = 'file' ref = {uploadObj} failure={onFailure.bind(this)} asyncSettings = {asyncSettings} removing= {onRemoveFile.bind(this)}>
							<FilesDirective>
								<UploadedFilesDirective name="Nature" size={25000} type=".png"></UploadedFilesDirective>
								<UploadedFilesDirective name="TypeScript succinctly" size={12000} type=".pdf"></UploadedFilesDirective>
								<UploadedFilesDirective name="ASP.NET" size={17000} type=".docx"></UploadedFilesDirective>
							</FilesDirective>
						</UploaderComponent>
					</div>
				</div>
				<div className='property-section preload-panel col-lg-3'>
					<PropertyPane title='Properties'>
						<div  className='panel-style'>
							<button className="e-btn e-css" onClick={clearButtonClick.bind(this)} id="clearbtn" title="Clear All">Clear All</button>
						</div>
					</PropertyPane>
				</div>
			</div>
			<div id="action-description">
				<p>This <a href="https://www.syncfusion.com/react-ui-components/react-file-upload" target="_blank">&nbsp;React File Upload</a> example demonstrates how to pre-load the files of the Uploader. The already uploaded files are configured in file list to view and remove them.</p>
			</div>
			<div id="description">
				<p>The Uploader component allows to load initial list of files which are already uploaded in server. The preload files are useful to view and remove from server. Also, you can achieve state persistence on page refresh.</p>	
				<p>For more information, you can refer to the Preload Files section from this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/uploader/async/#preload-files">documentation section</a>.</p>
				<p>To achieve state persistence, you can refer to this How-to section.</p>
				<p>In this example, the backend service used in the saveUrl and removeUrl endpoints for saving and removing files is intended for demonstration purposes only. The uploaded files are subjected to thorough validation, including verification of file names and the application of security checks. Therefore, this service is not recommended for production use, and the configuration of a custom backend save and remove service is advised. Additional implementation details can be found in the
            <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/uploader/async#server-side-configuration-for-save-action">saveUrl</a> and
            <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/uploader/async#server-side-configuration-for-remove-action">removeUrl</a>
            documentation.
          </p>
			</div>
      	</div>
    );
}
export default Preloadfiles;