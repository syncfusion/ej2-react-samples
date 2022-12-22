import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { updateSampleSection } from '../common/sample-base';
import {PropertyPane} from '../common/property-pane';
import {UploaderComponent} from '@syncfusion/ej2-react-inputs';
import { FormValidator, FormValidatorModel, RemovingEventArgs } from '@syncfusion/ej2-inputs';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { detach, isNullOrUndefined, createElement, EventHandler, Browser } from '@syncfusion/ej2-base';
import { FileInfo, SelectedEventArgs } from '@syncfusion/ej2-inputs';
import './custom-drop-area.css';

function Customdroparea() {
    React.useEffect(() => {
        updateSampleSection();
        renderComplete();
    }, [])
// Uploader component
let uploadObj: UploaderComponent;
let dialogInstance: DialogComponent;
let animationSettings: Object = { effect: 'Zoom' };
let asyncSettings: Object;
let allowedExtensions: string;
let target: HTMLElement;

    asyncSettings = {
        saveUrl: 'https://ej2.syncfusion.com/services/api/uploadbox/Save',
        removeUrl: 'https://ej2.syncfusion.com/services/api/uploadbox/Remove'
    };
    allowedExtensions= '.pdf, .png, .txt'
    animationSettings = { effect: 'Zoom' };

function renderComplete(): void {
    target = document.getElementById("customTarget");
   uploadObj.dropArea = target;
    document.getElementById('browse').onclick = () => {
    document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
    return false;
    }
    document.getElementById('customdropArea').onclick = (args) => {
    let target: any = args.target as any;
    if (target.classList.contains('e-file-delete-btn')) {
        for (let i: number = 0; i < uploadObj.getFilesData().length; i++) {
            if (target.parentElement.parentElement.getAttribute('data-file-name') === uploadObj.getFilesData()[i].name) {
                uploadObj.remove(uploadObj.getFilesData()[i]);
            }
        }
    } else if (target.classList.contains('e-file-remove-btn')) {
        detach(target.parentElement.parentElement);
    }
  };
}

function listTemplate(data: any): JSX.Element {
    return (
    <span>
        <span className='fileListwrapper'><span className= {`icon template-icons sf-icon-${data.type}`}></span>
        <span className='upload-name file-name'>{data.name} ({data.size} bytes)</span>
        <span className='upload-status'>{data.status}</span></span>
        <span className='e-icons e-file-remove-btn' title='Remove'></span>
    </span>
    );
}

function onUploadSuccess(args: any): void {
  let li: HTMLElement = getLiElement(args);
  li.querySelector('.upload-status').innerHTML = args.file.status;
  li.querySelector('.upload-status').classList.add('upload-success');
}
function onUploadFailed(args: any): void {
    let li: HTMLElement = getLiElement(args);
    li.querySelector('.upload-status').innerHTML = args.file.status;
    li.querySelector('.upload-status').classList.add('upload-failed');
}
function onUploadInProgress(args: any): void {
    let progressValue : string = Math.round((args.e.loaded / args.e.total) * 100) + '%';
    let li: HTMLElement = getLiElement(args);
    li.querySelector('.upload-status').innerHTML = args.file.status + '(' + progressValue + ' )';
}
function onSelect(args: any): void {
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
function getLiElement(args: any) {
      let liElements : NodeListOf<HTMLElement> = document.getElementsByClassName('e-upload')[0].querySelectorAll('.e-upload-files > li');
      let li : HTMLElement;
      for (let i: number = 0; i < liElements.length; i++) {
          if ( liElements[i].getAttribute('data-file-name') === args.file.name ) {
            li = liElements[i];
          }
      }
      return li;

  }
  function onRemoveFile(args: RemovingEventArgs): void {
      args.postRawFile = false;
  }

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
            <UploaderComponent id='UploadFiles' type='file' ref = {(scope) => {uploadObj = scope}}
                asyncSettings = {asyncSettings} 
                selected = {onSelect.bind(this) }
                removing= {onRemoveFile.bind(this)}
                progress = {onUploadInProgress.bind(this) }
                success = {onUploadSuccess.bind(this) }
                failure = {onUploadFailed.bind(this) }
                allowedExtensions ={allowedExtensions} template = {listTemplate as any} dropArea = {target}></UploaderComponent>
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
export default Customdroparea;