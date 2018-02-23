import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import {PropertyPane} from '../common/property-pane';
import {UploaderComponent} from '@syncfusion/ej2-react-inputs';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
import { detach, isNullOrUndefined, createElement, EventHandler, Browser } from '@syncfusion/ej2-base';
import { FileInfo, SelectedEventArgs } from '@syncfusion/ej2-inputs';
import './template.css';

export class CustomTemplate extends SampleBase<{}, {}> {
// Uploader component

constructor() {
    super()
    this.removeFiles = this.removeFiles.bind(this);
}

public uploadObj: UploaderComponent;
public parentElement : HTMLElement; public proxy : any; public progressbarContainer : HTMLElement;
public filesDetails : FileInfo[] = [];
public filesList: HTMLElement[] = [];


onSuccess(args: any) : void {
    let spinnerElement: HTMLElement = document.getElementById('dropArea');
    let li: HTMLElement =  document.getElementById('dropArea').querySelector('[data-file-name="' + args.file.name + '"]');
    if (args.operation === 'upload') {
        let progressBar: HTMLElement = li.getElementsByTagName('progress')[0];
        li.querySelector('.close-icon-container').classList.add('delete-icon');
        detach(li.getElementsByTagName('progress')[0]);
        (li.querySelector('.file-size') as HTMLElement).style.display = 'inline-block';
        (li.querySelector('.file-name') as HTMLElement).style.color = 'green';
        (li.querySelector('.e-icons') as HTMLElement).onclick = () => {
            createSpinner({ target: spinnerElement, width: '25px' });
            showSpinner(spinnerElement);
        };
        (li.querySelector('.close-icon-container') as HTMLElement).onkeydown = (e: any) => {
            if (e.keyCode === 13) { 
                createSpinner({ target: spinnerElement, width: '25px' });
                showSpinner(spinnerElement);
            }
        };
    } else {
        this.filesList.splice(this.filesList.indexOf(li), 1);
        this.filesDetails.splice(this.filesList.indexOf(li), 1);
		this.uploadObj.element.value = '';
        detach(li);
        hideSpinner(spinnerElement);
        detach(spinnerElement.querySelector('.e-spinner-pane'));
    }
    EventHandler.add(li.querySelector('.close-icon-container'), 'click', this.removeFiles, this);
}

onFileSelect(args : any) : void  {
    if (isNullOrUndefined(document.getElementById('dropArea').querySelector('.upload-list-root'))) {
        this.parentElement = createElement('div', { className: 'upload-list-root' });
        this.parentElement.appendChild(createElement('ul', {className: 'ul-element' }));
        document.getElementById('dropArea').appendChild(this.parentElement);
    }
    for (let i : number = 0; i < args.filesData.length; i++) {
        this.formSelectedData(args.filesData[i], this);  // create the LI element for each file Data
    }
    this.filesDetails = this.filesDetails.concat(args.filesData);
    this.uploadObj.upload(args.filesData, true);
    args.cancel = true;
}

formSelectedData ( selectedFiles : FileInfo, proxy: any ) : void {
    let liEle : HTMLElement = createElement('li',  { className: 'file-lists', attrs: {'data-file-name' : selectedFiles.name} });
    liEle.appendChild(createElement('span', {className: 'file-name ', innerHTML: selectedFiles.name }));
    liEle.appendChild(createElement('span', {className: 'file-size ', innerHTML: this.uploadObj.bytesToSize(selectedFiles.size) }));
    if (selectedFiles.statusCode === '1') {
        this.progressbarContainer = createElement('span', {className: 'progress-bar-container'});
        this.progressbarContainer.appendChild(createElement('progress', {className: 'progress', attrs: {value : '0', max : '100'}} ));
        liEle.appendChild(this.progressbarContainer);
    } else { liEle.querySelector('.file-name').classList.add('upload-fails'); }
    let closeIconContainer : HTMLElement = createElement('span', {className: 'e-icons close-icon-container'});
    EventHandler.add(closeIconContainer, 'click', this.removeFiles, proxy);
    liEle.appendChild(closeIconContainer);
    document.querySelector('.ul-element').appendChild(liEle);
    this.filesList.push(liEle);
}

onFileUpload(args : any) : void {
    let li : Element = document.getElementById('dropArea').querySelector('[data-file-name="' + args.file.name + '"]');
    EventHandler.remove(li.querySelector('.close-icon-container'), 'click', this.removeFiles);
    let progressValue : number = Math.round((args.e.loaded / args.e.total) * 100);
    if (!isNaN(progressValue)) {
        li.getElementsByTagName('progress')[0].value = progressValue;   // Updating the progress bar value
    }
}

onUploadFailed(args : any) : void {
    let li : Element = document.getElementById('dropArea').querySelector('[data-file-name="' + args.file.name + '"]');
    EventHandler.add(li.querySelector('.close-icon-container'), 'click', this.removeFiles, this);
    li.querySelector('.file-name ').classList.add('upload-fails');
    if (args.operation === 'upload') {
        detach(li.querySelector('.progress-bar-container'));
    }
}
removeFiles(args : any) : void {
    let status : string = this.filesDetails[this.filesList.indexOf(args.currentTarget.parentElement)].statusCode;
    if (status === '2') {
        this.uploadObj.remove(this.filesDetails[this.filesList.indexOf(args.currentTarget.parentElement)]);
    } else {
        detach(args.currentTarget.parentElement);
    }
}

rendereComplete() {
    document.getElementById('browse').onclick = () => {
        document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
        return false;
    };
    document.getElementById('clearbtn').onclick = () => { 
       detach(document.getElementsByClassName('upload-list-root')[0]);
       this.filesList = [];
       this.filesDetails = [];
    };
	this.uploadObj.dropArea = document.getElementsByClassName('control-fluid')[0] as HTMLElement;
    this.uploadObj.dataBind();    
    if (Browser.isDevice) {
        (this.uploadObj.dropArea.querySelector('drop') as HTMLElement).style.padding = '4% 13%';
    }
}

render() {
    return (      
        <div className = 'control-pane'>
			<div className='control-section uploadpreview'>
				 <div className='col-lg-9'>
						  <div className='template_wrapper'>
							{/* Render Uploader */}
								<div id='dropArea' className='dropArea'>
									<span id='drop' className='file-name-span drop'> Drop files here or <a href="" id='browse'><u>Browse</u></a> </span>
										<UploaderComponent id='fileUpload' type = 'file' ref = {(scope) => {this.uploadObj = scope}}
											asyncSettings = {{
												saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
                                                removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
											}}
											success={ this.onSuccess.bind(this) }
											selected= { this.onFileSelect.bind(this) }
											progress = {this.onFileUpload.bind(this) }    // Triggres when upload is in progress
											failure = { this.onUploadFailed.bind(this) }    // Triggres when upload got failed
											dropArea = { document.getElementsByClassName('control-fluid')[0] as HTMLElement }
										></UploaderComponent>
								</div>
						</div>
				</div>
				<div className='property-section uploader-panel col-lg-3'>
					<PropertyPane title='Properties'>
						<div>
							<button className="e-btn e-css" id="clearbtn" title="Clear All">Clear All</button>
						</div>
					</PropertyPane>
				</div>
			</div>
            <div id="action-description">
                <p>This sample demonstrates how to customize the file list using template.
                Browse or select the files to view the file list template.</p>
            </div>

            <div id="description">
                <p>The uploader component allows you to customize file list with action buttons by preventing the default UI appearance.
                The file list can be templated using file select event including progress-bar.
                The upload process can be initiated manually using `upload` method.</p>
            </div>
		</div>
    )
  }
}
