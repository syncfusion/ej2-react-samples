import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import {PropertyPane} from '../common/property-pane';
import {UploaderComponent} from '@syncfusion/ej2-react-inputs';
import { FormValidator, FormValidatorModel, RemovingEventArgs } from '@syncfusion/ej2-inputs';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { detach, isNullOrUndefined, createElement, EventHandler, Browser } from '@syncfusion/ej2-base';
import { FileInfo, SelectedEventArgs } from '@syncfusion/ej2-inputs';
import './custom-drop-area.css';

export class Customdroparea extends SampleBase<{}, {}> {
// Uploader component
public uploadObj: UploaderComponent;
public dialogInstance: DialogComponent;
private animationSettings: Object = { effect: 'Zoom' };
private asyncSettings: Object;
private allowedExtensions: string;
private target: HTMLElement;
constructor(props: {}) {
    super(props);
    this.asyncSettings = {
        saveUrl: 'https://ej2.syncfusion.com/services/api/uploadbox/Save',
        removeUrl: 'https://ej2.syncfusion.com/services/api/uploadbox/Remove'
    };
    this.allowedExtensions= '.pdf, .png, .txt'
    this.animationSettings = { effect: 'Zoom' };
}

public rendereComplete(): void {
    this.target = document.getElementById("customTarget");
   this.uploadObj.dropArea = this.target;
    document.getElementById('browse').onclick = () => {
    document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
    return false;
    }
    document.getElementById('customdropArea').onclick = (args) => {
    let target: any = args.target as any;
    if (target.classList.contains('e-file-delete-btn')) {
        for (let i: number = 0; i < this.uploadObj.getFilesData().length; i++) {
            if (target.parentElement.parentElement.getAttribute('data-file-name') === this.uploadObj.getFilesData()[i].name) {
                this.uploadObj.remove(this.uploadObj.getFilesData()[i]);
            }
        }
    } else if (target.classList.contains('e-file-remove-btn')) {
        detach(target.parentElement.parentElement);
    }
  };
}

listTemplate(data: any): JSX.Element {
    return (
    <span>
        <span className='fileListwrapper'><span className= {`icon template-icons sf-icon-${data.type}`}></span>
        <span className='upload-name file-name'>{data.name} ({data.size} bytes)</span>
        <span className='upload-status'>{data.status}</span></span>
        <span className='e-icons e-file-remove-btn' title='Remove'></span>
    </span>
    );
}

private onUploadSuccess(args: any): void {
  let li: HTMLElement = this.getLiElement(args);
  li.querySelector('.upload-status').innerHTML = args.file.status;
  li.querySelector('.upload-status').classList.add('upload-success');
}
private onUploadFailed(args: any): void {
    let li: HTMLElement = this.getLiElement(args);
    li.querySelector('.upload-status').innerHTML = args.file.status;
    li.querySelector('.upload-status').classList.add('upload-failed');
}
private onUploadInProgress(args: any): void {
    let progressValue : string = Math.round((args.e.loaded / args.e.total) * 100) + '%';
    let li: HTMLElement = this.getLiElement(args);
    li.querySelector('.upload-status').innerHTML = args.file.status + '(' + progressValue + ' )';
}
private onSelect(args: any): void {
      let allowedTypes: string[] = ['pdf', 'png', 'txt'];
      let modifiedFiles: object[] = [];
      for (let file of args.filesData) {
          if (allowedTypes.indexOf(file.type.toLowerCase()) > -1) {
              modifiedFiles.push(file);
          }
      }
      if (modifiedFiles.length > 0) {
          args.isModified = true;
          args.modifiedFiles = modifiedFiles;
      } else { args.cancel = true; }
}
private getLiElement(args: any) {
      let liElements : NodeListOf<HTMLElement> = document.getElementsByClassName('e-upload')[0].querySelectorAll('.e-upload-files > li');
      let li : HTMLElement;
      for (let i: number = 0; i < liElements.length; i++) {
          if ( liElements[i].getAttribute('data-file-name') === args.file.name ) {
            li = liElements[i];
          }
      }
      return li;

  }
  private onRemoveFile(args: RemovingEventArgs): void {
      args.postRawFile = false;
  }
public render(): JSX.Element {
    return (
        <div className = 'control-pane'>
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
                            {/* Render Uploader */}
            <UploaderComponent id='UploadFiles' type='file' ref = {(scope) => {this.uploadObj = scope}}
                asyncSettings = {this.asyncSettings} 
                selected = { this.onSelect.bind(this) }
                removing= { this.onRemoveFile.bind(this)}
                progress = { this.onUploadInProgress.bind(this) }
                success = { this.onUploadSuccess.bind(this) }
                failure = { this.onUploadFailed.bind(this) }
                allowedExtensions ={this.allowedExtensions} template = {this.listTemplate as any} dropArea = {this.target}></UploaderComponent>
            </div>
        </div>
        </div>
        </div>
        <div id="action-description">
        <p> This <a href="https://www.syncfusion.com/react-ui-components/react-file-upload"
            target="_blank">&nbsp;React File Upload</a> example demonstrates how to configure custom drop area of the Uploader. 
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
