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
        saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
        removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
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

public render(): JSX.Element {
    return (
      <div className = 'control-pane' ref={this.dropContainerRef}>
			<div className='control-section uploadpreview'>
				<div className='col-lg-9'>
					<div className='validation_wrapper'>
						<UploaderComponent id='validation' type = 'file' ref = {(scope) => {this.uploadObj = scope}}
							asyncSettings = {this.asyncSettings}
							removing= { this.onRemoveFile.bind(this)}
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
				<p>This example demonstrates how to pre-load the files of the Uploader. The already uploaded files are configured in file list to view and remove them.</p>
			</div>
			<div id="description">
				<p>The Uploader component allows to load initial list of files which are already uploaded in server. The preload files are useful to view and remove from server.
				Also, you can achieve state persistence on page refresh.</p>
				
				<p>For more information, you can refer to the Preload Files section from this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/uploader/async/#preload-files">documentation section</a>.</p>
				
				<p>To achieve state persistence, you can refer to this How-to section.</p>
			</div>
      </div>
    );
  }
}
