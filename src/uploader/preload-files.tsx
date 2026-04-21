import * as ReactDOM from 'react-dom';
import * as React from 'react';
import './uploader.css';
import { SampleBase } from '../common/sample-base';
import {PropertyPane} from '../common/property-pane';
import {UploaderComponent, FilesDirective, UploadedFilesDirective, RemovingEventArgs} from '@syncfusion/ej2-react-inputs';
import { ChangeEventArgs } from '@syncfusion/ej2-buttons';

export class Preloadfiles extends SampleBase<{}, {}> {
// Uploader component
public uploadObj: UploaderComponent;
public uploadWrapper : HTMLElement = document.getElementsByClassName('e-upload')[0] as HTMLElement;
public dropElement: HTMLElement;
private asyncSettings: object;
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
}
public rendereComplete(): void {
	this.dropElement = this.dropContainerEle;
	this.uploadObj.dropArea = this.dropElement;
	this.uploadObj.dataBind();
	this.uploadObj.element.setAttribute('name', 'UploadFiles');
}
private onRemoveFile(args: RemovingEventArgs): void {
    args.postRawFile = false;
}
private clearButtonClick(): void {
	this.uploadObj.clearAll();
}
private onFailure(args: any): void {
	if (args.response && args.response.statusText !== '') {
		args.statusText = args.response.statusText;
	}
}

public render(): JSX.Element {
    return (
      <div className = 'control-pane' ref={this.dropContainerRef}>
			<div className='control-section uploadpreview'>
				<div className='col-lg-9'>
					<div className='validation_wrapper'>
						<UploaderComponent id='UploadFiles' type = 'file' ref = {(scope) => {this.uploadObj = scope}}
							asyncSettings = {this.asyncSettings}
							removing= { this.onRemoveFile.bind(this)}
							 failure={this.onFailure.bind(this)}
						>
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
								<button className="e-btn e-css" onClick={this.clearButtonClick=this.clearButtonClick.bind(this)} id="clearbtn" title="Clear All">Clear All</button>
							</div>
						</PropertyPane>
					</div>
			</div>
			<div id="action-description">
				<p>This <a href="https://www.syncfusion.com/react-ui-components/react-file-upload"
            target="_blank">&nbsp;React File Upload</a> example demonstrates how to pre-load the files of the Uploader. The already uploaded files are configured in file list to view and remove them.</p>
			</div>
			<div id="description">
				<p>The Uploader component allows to load initial list of files which are already uploaded in server. The preload files are useful to view and remove from server.
				Also, you can achieve state persistence on page refresh.</p>
				
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
}
