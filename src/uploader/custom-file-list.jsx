import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { UploaderComponent } from '@syncfusion/ej2-react-inputs';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
import { detach, isNullOrUndefined, createElement, EventHandler, Browser } from '@syncfusion/ej2-base';
import './custom-file-list.css';
export class CustomTemplate extends SampleBase {
    constructor(props) {
        super(props);
        this.filesDetails = [];
        this.filesList = [];
        this.removeFiles = this.removeFiles.bind(this);
        this.dropAreaEle = null;
        this.dropContainerEle = null;
        this.dropRef = element => {
            this.dropAreaEle = element;
        };
        this.dropContainerRef = element => {
            this.dropContainerEle = element;
        };
        this.asyncSettings = {
            saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
            removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
        };
    }
    onSuccess(args) {
        let spinnerElement = this.dropAreaEle;
        let li = this.dropAreaEle.querySelector('[data-file-name="' + args.file.name + '"]');
        if (args.operation === 'upload') {
            let progressBar = li.getElementsByTagName('progress')[0];
            li.querySelector('.close-icon-container').classList.add('delete-icon');
            detach(li.getElementsByTagName('progress')[0]);
            li.querySelector('.file-size').style.display = 'inline-block';
            li.querySelector('.file-name').style.color = 'green';
            li.querySelector('.e-icons').onclick = () => {
                createSpinner({ target: spinnerElement, width: '25px' });
                showSpinner(spinnerElement);
            };
            li.querySelector('.close-icon-container').onkeydown = (e) => {
                if (e.keyCode === 13) {
                    createSpinner({ target: spinnerElement, width: '25px' });
                    showSpinner(spinnerElement);
                }
            };
        }
        else {
            this.filesDetails.splice(this.filesList.indexOf(li), 1);
            this.filesList.splice(this.filesList.indexOf(li), 1);
            this.uploadObj.element.value = '';
            detach(li);
            hideSpinner(spinnerElement);
            detach(spinnerElement.querySelector('.e-spinner-pane'));
        }
        EventHandler.add(li.querySelector('.close-icon-container'), 'click', this.removeFiles, this);
    }
    onFileSelect(args) {
        if (isNullOrUndefined(this.dropAreaEle.querySelector('.upload-list-root'))) {
            this.parentElement = createElement('div', { className: 'upload-list-root' });
            this.parentElement.appendChild(createElement('ul', { className: 'ul-element' }));
            this.dropAreaEle.appendChild(this.parentElement);
        }
        for (let i = 0; i < args.filesData.length; i++) {
            this.formSelectedData(args.filesData[i], this); // create the LI element for each file Data
        }
        this.filesDetails = this.filesDetails.concat(args.filesData);
        this.uploadObj.upload(args.filesData, true);
        args.cancel = true;
    }
    formSelectedData(selectedFiles, proxy) {
        let liEle = createElement('li', { className: 'file-lists', attrs: { 'data-file-name': selectedFiles.name } });
        liEle.appendChild(createElement('span', { className: 'file-name ', innerHTML: selectedFiles.name }));
        liEle.appendChild(createElement('span', { className: 'file-size ', innerHTML: this.uploadObj.bytesToSize(selectedFiles.size) }));
        if (selectedFiles.statusCode === '1') {
            this.progressbarContainer = createElement('span', { className: 'progress-bar-container' });
            this.progressbarContainer.appendChild(createElement('progress', { className: 'progress', attrs: { value: '0', max: '100' } }));
            liEle.appendChild(this.progressbarContainer);
        }
        else {
            liEle.querySelector('.file-name').classList.add('upload-fails');
        }
        let closeIconContainer = createElement('span', { className: 'e-icons close-icon-container' });
        EventHandler.add(closeIconContainer, 'click', this.removeFiles, proxy);
        liEle.appendChild(closeIconContainer);
        document.querySelector('.ul-element').appendChild(liEle);
        this.filesList.push(liEle);
    }
    onFileUpload(args) {
        let li = this.dropAreaEle.querySelector('[data-file-name="' + args.file.name + '"]');
        EventHandler.remove(li.querySelector('.close-icon-container'), 'click', this.removeFiles);
        let progressValue = Math.round((args.e.loaded / args.e.total) * 100);
        if (!isNaN(progressValue)) {
            li.getElementsByTagName('progress')[0].value = progressValue; // Updating the progress bar value
        }
    }
    onUploadFailed(args) {
        let li = this.dropAreaEle.querySelector('[data-file-name="' + args.file.name + '"]');
        EventHandler.add(li.querySelector('.close-icon-container'), 'click', this.removeFiles, this);
        li.querySelector('.file-name ').classList.add('upload-fails');
        if (args.operation === 'upload') {
            detach(li.querySelector('.progress-bar-container'));
        }
    }
    removeFiles(args) {
        let status = this.filesDetails[this.filesList.indexOf(args.currentTarget.parentElement)].statusCode;
        if (status === '2') {
            this.uploadObj.remove(this.filesDetails[this.filesList.indexOf(args.currentTarget.parentElement)]);
        }
        else {
            detach(args.currentTarget.parentElement);
        }
    }
    onRemoveFile(args) {
        args.postRawFile = false;
    }
    rendereComplete() {
        document.getElementById('browse').onclick = () => {
            document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
            return false;
        };
        this.dropElement = this.dropContainerEle;
        document.getElementById('clearbtn').onclick = () => {
            if (!document.getElementsByClassName('upload-list-root')[0]) {
                return;
            }
            detach(document.getElementsByClassName('upload-list-root')[0]);
            this.filesList = [];
            this.filesDetails = [];
        };
        this.uploadObj.element.setAttribute('name', 'UploadFiles');
        this.uploadObj.dropArea = this.dropElement;
        this.uploadObj.dataBind();
        if (Browser.isDevice) {
            this.uploadObj.dropArea.querySelector('drop').style.padding = '4% 13%';
        }
    }
    render() {
        return (<div className='control-pane' ref={this.dropContainerRef}>
			<div className='control-section uploadpreview'>
				 <div className='col-lg-9'>
						  <div className='template_wrapper'>
							
								<div id='dropArea' className='dropArea' ref={this.dropRef}>
									<span id='drop' className='file-name-span drop'> Drop files here or <a href="" id='browse'><u>Browse</u></a> </span>
										<UploaderComponent id='fileUpload' type='file' ref={(scope) => { this.uploadObj = scope; }} asyncSettings={this.asyncSettings} success={this.onSuccess.bind(this)} removing={this.onRemoveFile.bind(this)} selected={this.onFileSelect.bind(this)} progress={this.onFileUpload.bind(this)} // Triggres when upload is in progress
         failure={this.onUploadFailed.bind(this)} // Triggres when upload got failed
         dropArea={this.dropElement}></UploaderComponent>
								</div>
						</div>
				</div>
				<div className='property-section template-panel col-lg-3'>
					<PropertyPane title='Properties'>
						<div className='custom-panel'>
							<button className="e-btn e-css" id="clearbtn" title="Clear All">Clear All</button>
						</div>
					</PropertyPane>
				</div>
			</div>
			<div id="action-description">
				<p>This example demonstrates how to customize the file list with template. Browse or select the files to view the file list template.</p>
			</div>
			<div id="description">
				<p>The Uploader component allows to customize its file list using template property. The template used for each file in file list.</p>
				<p>For more information, you can refer to the Template section from this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/uploader/template/#custom-template">documentation section</a>.</p>
			</div>
		</div>);
    }
}
