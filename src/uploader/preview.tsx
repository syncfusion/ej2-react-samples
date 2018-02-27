import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import {PropertyPane} from '../common/property-pane';
import {UploaderComponent, Uploader, SelectedEventArgs, FileInfo} from '@syncfusion/ej2-react-inputs';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-react-popups';
import { EmitType, detach, Browser, createElement, isNullOrUndefined, EventHandler } from '@syncfusion/ej2-base';
import './preview.css';

export class Preview extends SampleBase<{}, {}> {

constructor() {
    super()
}
// Uploader component
public filesDetails : FileInfo[] = [];
public dropElement: HTMLElement = document.getElementsByClassName('control-fluid')[0] as HTMLElement;
public filesList: HTMLElement[] = [];
public uploadWrapper: HTMLElement;
public parentElement: HTMLElement;
public uploadObj: UploaderComponent;

rendereComplete() {
    this.dropElement = document.getElementsByClassName('control-fluid')[0] as HTMLElement;
    if (Browser.isDevice) { document.getElementById('dropimage').style.padding = '0px 10%'; }
    document.getElementById('browse').onclick = () => {
        document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
        return false;
    };
    document.getElementById('clearbtn').onclick = () => {
        detach(this.dropElement.querySelector('ul'));
        this.filesList = [];
        this.filesDetails = [];
        if (this.dropElement.querySelector('#dropArea').classList.contains('e-spinner-pane')) {
            hideSpinner(this.dropElement.querySelector('#dropArea'));
            detach(this.dropElement.querySelector('.e-spinner-pane'));
        }
    };
    document.getElementById('uploadbtn').onclick = () => {
        if (this.dropElement.querySelector('ul') && this.filesDetails.length > 0) {
            this.uploadObj.upload(this.filesDetails, true);
        }
    };
}

onSuccess(args: any) : void {
    let spinnerElement: HTMLElement = document.getElementById('dropTarget');
    let li: HTMLElement = document.getElementsByClassName('e-upload')[0].querySelector('[data-file-name="' + args.file.name + '"]');
    if (args.operation === 'upload') {
        let progressBar: HTMLElement = li.getElementsByTagName('progress')[0];
        detach(li.getElementsByTagName('progress')[0]);
        detach(li.getElementsByClassName('percent')[0]);
        (li.querySelector('.file-size') as HTMLElement).style.display = 'block';
        (li.querySelector('.file-name') as HTMLElement).style.color = 'green';
        (li.querySelector('#removeIcon') as HTMLElement).onclick = () => { 
            createSpinner({ target: spinnerElement, width: '25px' });
            showSpinner(spinnerElement);
         };
        (li.querySelector('#removeIcon') as HTMLElement).onkeydown = (e: any) => {
            if (e.keyCode === 13) { 
                createSpinner({ target: spinnerElement, width: '25px' });
                showSpinner(spinnerElement);
             }
        };
    } else {
        for (let i: number = 0; i < this.filesDetails.length; i++) {
            if(this.filesDetails[i].name === args.file.name) {
               this.filesDetails.splice(this.filesDetails.indexOf(this.filesDetails[i]), 1);
            }
        }
        hideSpinner(spinnerElement);
        detach(spinnerElement.querySelector('.e-spinner-pane'));
    }

}

onSelect(args: SelectedEventArgs): void {
    if (!this.dropElement.querySelector('li')) { this.filesDetails = []; }
    if (isNullOrUndefined(document.getElementById('dropArea').querySelector('.e-upload-files'))) {
        this.parentElement = createElement('ul', { className: 'e-upload-files' });
        document.getElementsByClassName('e-upload')[0].appendChild(this.parentElement);
    }
    for (let i : number = 0; i < args.filesData.length; i++) {
        this.formSelectedData(args.filesData[i], this);
    }
    this.filesDetails = this.filesDetails.concat(args.filesData);
    args.cancel = true;
}

formSelectedData (file : FileInfo, proxy: any): void {
    let liEle : HTMLElement = createElement('li',  {className: 'e-upload-file-list', attrs: {'data-file-name': file.name}});
    let imageTag: HTMLImageElement = createElement('IMG',  {className: 'upload-image', attrs: {'alt': 'Image'}}) as HTMLImageElement;
    let wrapper: HTMLElement = createElement('span', {className: 'wrapper'});
    wrapper.appendChild(imageTag); liEle.appendChild(wrapper);
    liEle.appendChild(createElement('div', {className: 'name file-name', innerHTML: file.name, attrs: {'title': file.name}}));
    liEle.appendChild(createElement('div', {className: 'file-size', innerHTML: proxy.uploadObj.bytesToSize(file.size) }));
    let clearbtn: HTMLElement;
    let uploadbtn: HTMLElement;
    clearbtn = createElement('span', {id: 'removeIcon', className: 'e-icons e-file-remove-btn', attrs: {'title': 'Remove'}});
    EventHandler.add(clearbtn, 'click', this.removeFiles, proxy);
    liEle.setAttribute('title', 'Ready to Upload');
    uploadbtn = createElement('span', {className: 'e-upload-icon e-icons e-file-remove-btn', attrs: {'title': 'Upload'}});
    uploadbtn.setAttribute('id', 'iconUpload'); EventHandler.add(uploadbtn, 'click', this.uploadFile, proxy);
    let progressbarContainer: HTMLElement;
    progressbarContainer = createElement('progress', {className: 'progressbar', id: 'progressBar', attrs: {value: '0', max: '100'}});
    liEle.appendChild(clearbtn); liEle.appendChild(uploadbtn);
    liEle.appendChild(progressbarContainer);
    this.readURL(liEle, file); document.querySelector('.e-upload-files').appendChild(liEle);
    proxy.filesList.push(liEle);
}

uploadFile(args: any): void {
    this.uploadObj.upload([this.filesDetails[this.filesList.indexOf(args.currentTarget.parentElement)]], true);
}

removeFiles(args: any): void {
    let statusCode: string = this.filesDetails[this.filesList.indexOf(args.currentTarget.parentElement)].statusCode;
    if (statusCode === '2' || statusCode === '1') {
        this.uploadObj.remove(this.filesDetails[this.filesList.indexOf(args.currentTarget.parentElement)], true);
        this.uploadObj.element.value = '';
    }
    let index: number = this.filesList.indexOf(args.currentTarget.parentElement);
    this.filesList.splice(index, 1);
    this.filesDetails.splice(index, 1);
    if (statusCode !== '2') { detach(args.currentTarget.parentElement); }
}

onFileUpload(args : any) : void {
    let li : Element = document.getElementById('dropArea').querySelector('[data-file-name="' + args.file.name + '"]');
    let iconEle: HTMLElement = li.querySelector('#iconUpload') as HTMLElement;
    iconEle.style.cursor = 'not-allowed';
    iconEle.classList.add('e-uploaded');
    EventHandler.remove(li.querySelector('#iconUpload'), 'click', this.uploadFile);
    let progressValue : number = Math.round((args.e.loaded / args.e.total) * 100);
    if (!isNaN(progressValue) && li.querySelector('.progressbar')) {
        li.getElementsByTagName('progress')[0].value = progressValue;
    }
}

onUploadSuccess(args : any) : void {
    let spinnerElement: HTMLElement = document.getElementById('dropArea');
    let li : HTMLElement = document.getElementById('dropArea').querySelector('[data-file-name="' + args.file.name + '"]');
    if (li && !isNullOrUndefined(li.querySelector('.progressbar'))) {
        (li.querySelector('.progressbar') as HTMLElement).style.visibility = 'hidden';
    }
    if (args.operation === 'upload') {
        EventHandler.remove(li.querySelector('#iconUpload'), 'click', this.uploadFile);
        (li.querySelector('.file-name') as HTMLElement).style.color = 'green';
        (li.querySelector('.e-icons') as HTMLElement).onclick = () => {
            this.generateSpinner(this.dropElement.querySelector('#dropArea'));
        };
    } else {
        detach(li);
        hideSpinner(spinnerElement); detach(spinnerElement.querySelector('.e-spinner-pane'));
    }
    li.setAttribute('title', args.e.currentTarget.statusText);
}

generateSpinner(targetElement: HTMLElement): void {
    createSpinner({ target: targetElement, width: '25px' });
    showSpinner(targetElement);
}

onUploadFailed(args : any) : void {
    let li : Element = document.getElementById('dropArea').querySelector('[data-file-name="' + args.file.name + '"]');
    (li.querySelector('.file-name') as HTMLElement).style.color = 'red';
    li.setAttribute('title', args.e.currentTarget.statusText)
    if (args.operation === 'upload') {
        EventHandler.remove(li.querySelector('#iconUpload'), 'click', this.uploadFile);
        (li.querySelector('.progressbar') as HTMLElement).style.visibility = 'hidden';
    }
}

readURL(li: HTMLElement, args: any): void {
    let preview: HTMLImageElement = li.querySelector('.upload-image');
    let file: File = args.rawFile; let reader: FileReader = new FileReader();
    reader.addEventListener('load', () => { preview.src = reader.result; }, false);
    if (file) { reader.readAsDataURL(file); }
}

render() {
    return (       
      <div className = 'control-pane'>
			<div className='control-section' id='uploadpreview'>
				<div className= 'col-lg-9'>
					<div className='imagepreview'>
						<div id='dropArea' className='dropTarget'>
							<span id='dropimage' className='file-name-drop'> Drop image (JPG, PNG) files here or <a href="" id='browse'><u>Browse</u></a> </span>
							<UploaderComponent id='previewfileupload' type = 'file' ref={upload => this.uploadObj = upload}
								asyncSettings = {{
									saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
                                    removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
								}}
								success={ this.onUploadSuccess.bind(this) }
								selected= {this.onSelect.bind(this)}
								progress= {this.onFileUpload.bind(this)}
								failure= {this.onUploadFailed.bind(this)}
                                allowedExtensions= {'.jpg,.png'}
                                dropArea = { 'uploadpreview' }
							></UploaderComponent>
						</div>
					</div>
				</div>
				<div className='property-section uploader-panel col-lg-3'>
					<PropertyPane title='Properties'>
						<div  style = {{paddingTop:'25px'}}>
							<button className="e-btn e-css" id="clearbtn" title="Clear All">Clear All</button>
						</div>
						<div  style = {{paddingTop:'25px'}}>
							<button className="e-btn e-css" id="uploadbtn" title="Upload All">Upload All</button>
						</div>
					</PropertyPane>
				</div>
			</div>
            <div id="action-description">
                <p>This sample demonstrates how to add an image preview of the upload files. 
                Only PNG and JPG image files can be uploaded in this demo.
                To upload or remove the specific image from the list, click upload or remove button, which will be displayed while you hover the mouse over the preview image.
                Click `upload all` or `clear all` buttons to upload or remove all the files that are displayed in file list.</p>
            </div>

            <div id="description">
                <p>The uploader component allows you to create preview images before and after uploading.
                The preview images are created by reading the file using the file select event.
                The sample is designed with full customization by preventing default UI (User Interface) appearance.
                All the selected and specified files can be uploaded using `upload` method, the uploaded file can be removed from the server using `remove` method.</p>
            </div>
      </div>
    )
  }
}
