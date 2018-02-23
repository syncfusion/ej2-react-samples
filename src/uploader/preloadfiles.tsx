import * as ReactDOM from 'react-dom';
import * as React from 'react';
import './uploader.css';
import { SampleBase } from '../common/sample-base';
import {UploaderComponent, FilesDirective, UploadedFilesDirective} from '@syncfusion/ej2-react-inputs';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
import { ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { detach } from '@syncfusion/ej2-base';

export class Preloadfiles extends SampleBase<{}, {}> {
// Uploader component
public uploadObj: UploaderComponent;
public uploadWrapper : HTMLElement = document.getElementsByClassName('e-upload')[0] as HTMLElement;
public dropElement: HTMLElement = document.getElementsByClassName('control-fluid')[0] as HTMLElement;

rendereComplete() {
	this.uploadObj.dropArea = document.getElementsByClassName('control-fluid')[0] as HTMLElement;
	this.uploadObj.dataBind();
}

onSuccess(args: any) : void {
    let li: HTMLElement = document.getElementsByClassName('e-upload')[0].querySelector('[data-file-name="' + args.file.name + '"]');
    if (args.operation === 'upload') {
        let li: HTMLElement = document.getElementsByClassName('e-upload')[0].querySelector('[data-file-name="' + args.file.name + '"]');
        let progressBar: HTMLElement = li.getElementsByTagName('progress')[0];
        li.classList.add('e-icon-spinner');
        (li.querySelector('.e-icons') as HTMLElement).onclick = () => {
            // create spinner to uploader component
            createSpinner({ target: document.getElementsByClassName('e-upload')[0] as HTMLElement, width: '25px' });
            showSpinner(document.getElementsByClassName('e-upload')[0] as HTMLElement);
        };
		(li.querySelector('.e-icons') as HTMLElement).onkeydown = (e: any) => {
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

onRemove(args: any) : void {
    let li: HTMLElement = document.getElementsByClassName('e-upload')[0].querySelector('[data-file-name="' + args.filesData[0].name + '"]');
    if (li.classList.contains('e-icon-spinner')) { return; }
    // create spinner to uploader component
    createSpinner({ target: document.getElementsByClassName('e-upload')[0] as HTMLElement, width: '25px' });
    showSpinner(document.getElementsByClassName('e-upload')[0] as HTMLElement);
}

onUploadFail(args: any) {
    let li: HTMLElement = document.getElementsByClassName('e-upload')[0].querySelector('[data-file-name="' + args.file.name + '"]');
    li.classList.add('e-icon-spinner');
}

render() {
    return (       
      <div className = 'control-pane'>
			<div className='control-section uploadpreview'>
				<div className='validation_wrapper'>
					<UploaderComponent id='validation' type = 'file' ref = {(scope) => {this.uploadObj = scope}}
						asyncSettings = {{
							saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
							removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
						}}
						success={ this.onSuccess.bind(this) }
						removing = {this.onRemove.bind(this)}
						failure = {this.onUploadFail.bind(this)}
					>
						<FilesDirective> 
							<UploadedFilesDirective name="Nature" size={25000} type=".png"></UploadedFilesDirective>
							<UploadedFilesDirective name="TypeScript succintly" size={12000} type=".pdf"></UploadedFilesDirective>
							<UploadedFilesDirective name="ASP.NET" size={17000} type=".docx"></UploadedFilesDirective>
						</FilesDirective>
					</UploaderComponent>
				</div>
			</div>
			<div id="action-description">
				<p>This sample demonstrates how to pre-load the files of the Uploader. The already uploaded files are configured in file list to view and remove them.</p>
			</div>
			<div id="description">
				<p>The Uploader component allows to load initial list of files which are already uploaded in server. The preload files are useful to view and remove from server.
				Also, you can achieve state persistence on page refresh.</p>
				
				<p>For more information, you can refer to the Preload Files section from the documentation.</p>
				
				<p>To achieve state persistence, you can refer to this How-to section.</p>
			</div>
      </div>
    )
  }
}
