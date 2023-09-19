import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from "react";
import { updateSampleSection } from '../common/sample-base';
import {UploaderComponent} from '@syncfusion/ej2-react-inputs';
import { RemovingEventArgs } from '@syncfusion/ej2-inputs';
import { detach } from '@syncfusion/ej2-base';
import './custom-drop-area.css';

const Customdroparea = () => {
    useEffect(() => {
        updateSampleSection();
        renderComplete();
    }, [])
    // Uploader component
    let uploadObj = useRef<UploaderComponent>(null);
    let asyncSettings: Object;
    let allowedExtensions: string;
    let target = useRef<HTMLDivElement>(null);
    asyncSettings = {
        saveUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Remove'
    };
    allowedExtensions= '.pdf, .png, .txt'

    const renderComplete = (): void => {
        uploadObj.current.dropArea = target.current;
        document.getElementById('browse').onclick = () => {
            document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
            return false;
        }
        document.getElementById('customdropArea').onclick = (args) => {
        let target: any = args.target as any;
            if (target.classList.contains('e-file-delete-btn')) {
                for (let i: number = 0; i < uploadObj.current.getFilesData().length; i++) {
                    if (target.parentElement.parentElement.getAttribute('data-file-name') === uploadObj.current.getFilesData()[i].name) {
                        uploadObj.current.remove(uploadObj.current.getFilesData()[i]);
                    }
                }
            } else if (target.classList.contains('e-file-remove-btn')) {
                detach(target.parentElement.parentElement);
            }
        };
    }

    const listTemplate = (data: any) =>{
        return (
            <span>
                <span className='fileListwrapper'><span className= {`icon template-icons sf-icon-${data.type}`}></span>
                <span className='upload-name file-name'>{data.name} ({data.size} bytes)</span>
                <span className='upload-status'>{data.status}</span></span>
                <span className='e-icons e-file-remove-btn' title='Remove'></span>
            </span>
        );
    }

    const onUploadSuccess = (args: any): void => {
        let li: HTMLElement = getLiElement(args);
        li.querySelector('.upload-status').innerHTML = args.file.status;
        li.querySelector('.upload-status').classList.add('upload-success');
    }
    const onUploadFailed = (args: any): void => {
        let li: HTMLElement = getLiElement(args);
        li.querySelector('.upload-status').innerHTML = args.file.status;
        li.querySelector('.upload-status').classList.add('upload-failed');
    }
    const onUploadInProgress = (args: any): void => {
        let progressValue : string = Math.round((args.e.loaded / args.e.total) * 100) + '%';
        let li: HTMLElement = getLiElement(args);
        li.querySelector('.upload-status').innerHTML = args.file.status + '(' + progressValue + ' )';
    }
    const onSelect = (args: any): void => {
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
    const getLiElement = (args: any) => {
        let liElements : NodeListOf<HTMLElement> = document.getElementsByClassName('e-upload')[0].querySelectorAll('.e-upload-files > li');
        let li : HTMLElement;
        for (let i: number = 0; i < liElements.length; i++) {
            if ( liElements[i].getAttribute('data-file-name') === args.file.name ) {
                li = liElements[i];
            }
        }
        return li;

    }
    const onRemoveFile = (args: RemovingEventArgs): void => {
        args.postRawFile = false;
    }

    return (
        <div className = 'control-pane'>
            <div className='control-section row uploadpreview'>
                <div className='col-lg-12 control-section upload-custom'>
                    <div className='customdrop_wrapper'>
                        <div className="dropArea_wrap" id="customTarget" ref={target}>
                            <div className="font-icons">
                                <span className="e-icons sf-icon-pdf"></span>
                                <span className="e-icons sf-icon-txt"></span>
                                <span className="e-icons sf-icon-png"></span>
                            </div>
                            <span className="dropText" id="dropText">Drop files here to upload</span>
                        </div>
                        <div id="customdropArea">
                            <span id="drop" className="customdropArea"><a href="" id="browse"><u>Browse</u></a></span>
                            {/* Render Uploader */}
                            <UploaderComponent id='UploadFiles' type='file' ref={uploadObj} asyncSettings={asyncSettings} selected = {onSelect.bind(this)} removing={onRemoveFile.bind(this)} progress={onUploadInProgress.bind(this)} success={onUploadSuccess.bind(this)} failure={onUploadFailed.bind(this)} allowedExtensions={allowedExtensions} template={listTemplate as any} dropArea={target.current}></UploaderComponent>
                        </div>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>This <a href="https://www.syncfusion.com/react-ui-components/react-file-upload" target="_blank">&nbsp;React File Upload</a> example demonstrates how to configure custom drop area of the Uploader. You can drop the files into specified custom drop area location to upload.</p>
            </div>
            <div id="description">
                <p>
                    The Uploader component allows to set any external element as drop area using the &nbsp;
                    <a target="_blank" href="https://ej2.syncfusion.com/documentation/api/uploader/#droparea">dropArea</a> property.
                </p>
                <p>
                    More information on the drag-and-drop can be found on this
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/uploader/file-source/#drag-and-drop"> documentation section</a>.
                </p>
            </div>
        </div>
    );
}
export default Customdroparea;