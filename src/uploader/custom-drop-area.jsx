import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { UploaderComponent } from '@syncfusion/ej2-react-inputs';
import { detach } from '@syncfusion/ej2-base';
import './custom-drop-area.css';
export class Customdroparea extends SampleBase {
    constructor(props) {
        super(props);
        this.animationSettings = { effect: 'Zoom' };
        this.asyncSettings = {
            saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
            removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
        };
        this.allowedExtensions = '.pdf, .png, .txt';
        this.animationSettings = { effect: 'Zoom' };
    }
    rendereComplete() {
        this.target = document.getElementById("customTarget");
        this.uploadObj.dropArea = this.target;
        document.getElementById('browse').onclick = () => {
            document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
            return false;
        };
        document.getElementById('customdropArea').onclick = (args) => {
            let target = args.target;
            if (target.classList.contains('e-file-delete-btn')) {
                for (let i = 0; i < this.uploadObj.getFilesData().length; i++) {
                    if (target.parentElement.parentElement.getAttribute('data-file-name') === this.uploadObj.getFilesData()[i].name) {
                        this.uploadObj.remove(this.uploadObj.getFilesData()[i]);
                    }
                }
            }
            else if (target.classList.contains('e-file-remove-btn')) {
                detach(target.parentElement.parentElement);
            }
        };
    }
    listTemplate(data) {
        return (<span>
        <span className='fileListwrapper'><span className={`icon template-icons sf-icon-${data.type}`}></span>
        <span className='upload-name file-name'>{data.name} ({data.size} bytes)</span>
        <span className='upload-status'>{data.status}</span></span>
        <span className='e-icons e-file-remove-btn' title='Remove'></span>
    </span>);
    }
    onUploadSuccess(args) {
        let li = this.getLiElement(args);
        li.querySelector('.upload-status').innerHTML = args.file.status;
        li.querySelector('.upload-status').classList.add('upload-success');
    }
    onUploadFailed(args) {
        let li = this.getLiElement(args);
        li.querySelector('.upload-status').innerHTML = args.file.status;
        li.querySelector('.upload-status').classList.add('upload-failed');
    }
    onUploadInProgress(args) {
        let progressValue = Math.round((args.e.loaded / args.e.total) * 100) + '%';
        let li = this.getLiElement(args);
        li.querySelector('.upload-status').innerHTML = args.file.status + '(' + progressValue + ' )';
    }
    onSelect(args) {
        let allowedTypes = ['pdf', 'png', 'txt'];
        let modifiedFiles = [];
        for (let file of args.filesData) {
            if (allowedTypes.indexOf(file.type.toLowerCase()) > -1) {
                modifiedFiles.push(file);
            }
        }
        if (modifiedFiles.length > 0) {
            args.isModified = true;
            args.modifiedFiles = modifiedFiles;
        }
        else {
            args.cancel = true;
        }
    }
    getLiElement(args) {
        let liElements = document.getElementsByClassName('e-upload')[0].querySelectorAll('.e-upload-files > li');
        let li;
        for (let i = 0; i < liElements.length; i++) {
            if (liElements[i].getAttribute('data-file-name') === args.file.name) {
                li = liElements[i];
            }
        }
        return li;
    }
    onRemoveFile(args) {
        args.postRawFile = false;
    }
    render() {
        return (<div className='control-pane'>
        <div className='control-section row uploadpreview'>
            <div className='col-lg-12 control-section upload-custom'>
            <div className='customdrop_wrapper'>
                <div className="dropArea_wrap" id="customTarget">
                <div className="font-icons">
                    <span className="e-icons sf-icon-pdf"></span>
                    <span className="e-icons sf-icon-txt"></span>
                    <span className="e-icons sf-icon-png"></span>
                </div>
                <span className="dropText" id="dropText">Drop files here to upload</span>
            </div>
            <div id="customdropArea">
                <span id="drop" className="customdropArea"><a href="" id="browse"><u>Browse</u></a> </span>  
                            
            <UploaderComponent id='UploadFiles' type='file' ref={(scope) => { this.uploadObj = scope; }} asyncSettings={this.asyncSettings} selected={this.onSelect.bind(this)} removing={this.onRemoveFile.bind(this)} progress={this.onUploadInProgress.bind(this)} success={this.onUploadSuccess.bind(this)} failure={this.onUploadFailed.bind(this)} allowedExtensions={this.allowedExtensions} template={this.listTemplate} dropArea={this.target}></UploaderComponent>
            </div>
        </div>
        </div>
        </div>
        <div id="action-description">
        <p> This example demonstrates how to configure custom drop area of the Uploader. 
            You can drop the files into specified custom drop area location to upload.  </p>
    </div>
    <div id="description">
        <p>
            The Uploader component allows to set any external element as drop area using the &nbsp; 
            <a target="_blank" href="https://ej2.syncfusion.com/documentation/api/uploader/#droparea">
             dropArea</a> property.
        </p>
        <p>
            More information on the drag-and-drop can be found on this
            <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/uploader/file-source/#drag-and-drop"> documentation section</a>.
        </p>
    </div>
        </div>);
    }
}
