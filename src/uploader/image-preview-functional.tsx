import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { updateSampleSection } from '../common/sample-base';
import {PropertyPane} from '../common/property-pane';
import {UploaderComponent, Uploader, SelectedEventArgs, FileInfo, RemovingEventArgs} from '@syncfusion/ej2-react-inputs';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-react-popups';
import { EmitType, detach, Browser, createElement, isNullOrUndefined, EventHandler } from '@syncfusion/ej2-base';
import './image-preview.css';
import { useEffect, useRef } from 'react';

const Preview = () => {
    useEffect(() => {
        updateSampleSection();
        renderComplete();
    }, [])
    // Uploader component
    let uploadObj = useRef<UploaderComponent>(null);
    let filesDetails : FileInfo[] = [];
    let dropElement: HTMLElement;
    let filesList: HTMLElement[] = [];
    let filesName: string[] = [];
    let parentElement: HTMLElement;
    let asyncSettings: object ;
    let allowedExtensions: string;
    let dropContainerEle: HTMLElement = null;
    let dropAreaEle: HTMLElement = null;
    let dropImageEle: HTMLElement = null;
    let buttonEle: HTMLElement;
    let clearEle: HTMLElement;
    let dropArea: HTMLElement;
    let dropContainerRef = element => {
        dropContainerEle = element;
    };    
    let dropAreaRef =  element => {
        dropAreaEle = element;
    };    
    let dropImageRef = element => {
        dropImageEle = element;
    };    
    let buttonRef = (element) => {
        buttonEle = element;
    };    
    let clearRef = (element) => {
        clearEle = element;
    };
    asyncSettings = {
        saveUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Remove'
    };
    allowedExtensions= '.jpg,.png,.jpeg'

    const renderComplete = (): void => {
        dropArea = dropAreaEle;
        dropElement = dropContainerEle;
        if (Browser.isDevice) {dropImageEle.style.padding = '0px 10%'; }
        uploadObj.current.element.setAttribute('name', 'UploadFiles');
        (dropAreaEle.children[0].children[0] as HTMLElement).onclick = () => {
             (dropAreaEle.children[1].children[0] as HTMLElement).querySelector('button').click();
            return false;
        };
        clearEle.onclick = () => {
            if (!dropElement.querySelector('ul')) { return; }
            detach(dropElement.querySelector('ul'));
            filesList = [];
            filesDetails = [];
            filesName = [];
            if (dropArea.classList.contains('e-spinner-pane')) {
                hideSpinner(dropArea);
                detach(dropElement.querySelector('.e-spinner-pane'));
            }
        };
        buttonEle.onclick = () => {
            if (dropElement.querySelector('ul') && filesDetails.length > 0) {
                uploadObj.current.upload(filesDetails, true);
            }
        };
        uploadObj.current.dropArea = dropElement;
        uploadObj.current.dataBind();
    }
    const onSelect = (args: SelectedEventArgs): void => {
        if (!dropElement.querySelector('li')) {filesDetails = []; }
        if (isNullOrUndefined(dropArea.querySelector('.e-upload-files'))) {
            parentElement = createElement('ul', { className: 'e-upload-files' });
            dropAreaEle.children[1].appendChild(parentElement);
        }
        let validFiles: FileInfo[] = validateFiles(args, filesDetails);
        if (validFiles.length === 0) {
            args.cancel = true;
            return;
        }
        for (let i : number = 0; i < validFiles.length; i++) {
            formSelectedData(validFiles[i], this);
        }
        filesDetails = filesDetails.concat(validFiles);
        args.cancel = true;
    }

    const validateFiles = (args: any, viewedFiles: FileInfo[]): FileInfo[] => {
        let modifiedFiles: FileInfo[] = [];
        let validFiles: FileInfo[] = [];
        let isModified: boolean = false;
        if (args.event.type === 'drop') {
            isModified = true;
            let allImages: string[] = ['png', 'jpg', 'jpeg'];
            let files: FileInfo[] = args.filesData;
            for (let file of files) {
                if (allImages.indexOf(file.type) !== -1) {
                    modifiedFiles.push(file);
                }
            }
        }
        let files: FileInfo[] = modifiedFiles.length > 0 || isModified ? modifiedFiles : args.filesData;
        if (filesName.length > 0) {
            for (let file of files) {
                if (filesName.indexOf(file.name) === -1) {
                    filesName.push(file.name);
                    validFiles.push(file);
                }
            }
        } else {
            for (let file of files) {
                filesName.push(file.name);
                validFiles.push(file);
            }
        }
        return validFiles;
    }

    const formSelectedData = (file : FileInfo, proxy: any): void => {
        let liEle : HTMLElement = createElement('li',  {className: 'e-upload-file-list', attrs: {'data-file-name': file.name}});
        let imageTag: HTMLImageElement = createElement('IMG',  {className: 'upload-image', attrs: {'alt': 'Image'}}) as HTMLImageElement;
        let wrapper: HTMLElement = createElement('span', {className: 'wrapper'});
        wrapper.appendChild(imageTag); liEle.appendChild(wrapper);
        liEle.appendChild(createElement('div', {className: 'file-name', innerHTML: file.name, attrs: {'title': file.name}}));
        liEle.appendChild(createElement('div', {className: 'file-size', innerHTML: uploadObj.current.bytesToSize(file.size) }));
        let clearbtn: HTMLElement;
        let uploadbtn: HTMLElement;
        clearbtn = createElement('span', {id: 'removeIcon', className: 'e-icons e-file-remove-btn', attrs: {'title': 'Remove'}});
        EventHandler.add(clearbtn, 'click', removeFiles, proxy);
        liEle.setAttribute('title', 'Ready to Upload');
        uploadbtn = createElement('span', {className: 'e-upload-icon e-icons e-file-remove-btn', attrs: {'title': 'Upload'}});
        uploadbtn.setAttribute('id', 'iconUpload'); EventHandler.add(uploadbtn, 'click', uploadFile, proxy);
        let progressbarContainer: HTMLElement;
        progressbarContainer = createElement('progress', {className: 'progressbar', id: 'progressBar', attrs: {value: '0', max: '100'}});
        liEle.appendChild(clearbtn); liEle.appendChild(uploadbtn);
        liEle.appendChild(progressbarContainer);
        readURL(liEle, file); 
        dropAreaEle.children[1].children[1].appendChild(liEle);
        filesList.push(liEle);
    }

    const uploadFile = (args: any): void => {
        uploadObj.current.upload([filesDetails[filesList.indexOf(args.currentTarget.parentElement)]], true);
    }

    const  removeFiles = (args: any): void => {
        let removeFile: FileInfo = filesDetails[filesList.indexOf(args.currentTarget.parentElement)];
        let statusCode: string = removeFile.statusCode;
        if (statusCode === '2' || statusCode === '1') {
            uploadObj.current.remove(removeFile, true);
            uploadObj.current.element.value = '';
        }
        let index: number = filesList.indexOf(args.currentTarget.parentElement);
        filesList.splice(index, 1);
        filesDetails.splice(index, 1);
        filesName.splice(filesName.indexOf(removeFile.name), 1);
        if (statusCode !== '2') { detach(args.currentTarget.parentElement); }
    }

    const onFileUpload = (args: any): void => {
        let li : Element = dropArea.querySelector('[data-file-name="' + args.file.name + '"]');
        let iconEle: HTMLElement = li.querySelector('#iconUpload') as HTMLElement;
        iconEle.style.cursor = 'not-allowed';
        iconEle.classList.add('e-uploaded');
        EventHandler.remove(li.querySelector('#iconUpload'), 'click', uploadFile);
        let progressValue : number = Math.round((args.e.loaded / args.e.total) * 100);
        if (!isNaN(progressValue) && li.querySelector('.progressbar')) {
            li.getElementsByTagName('progress')[0].value = progressValue;
        }
    }

    const onUploadSuccess = (args: any): void => {
        let spinnerElement: HTMLElement = dropAreaEle;
        let li : HTMLElement = dropArea.querySelector('[data-file-name="' + args.file.name + '"]');
        if (li && !isNullOrUndefined(li.querySelector('.progressbar'))) {
            (li.querySelector('.progressbar') as HTMLElement).style.visibility = 'hidden';
        }
        if (args.operation === 'upload') {
            EventHandler.remove(li.querySelector('#iconUpload'), 'click', uploadFile);
            (li.querySelector('.file-name') as HTMLElement).style.color = 'green';
            (li.querySelector('.e-icons') as HTMLElement).onclick = () => {
                generateSpinner(dropArea);
            };
        } else {
            detach(li);
            hideSpinner(spinnerElement); detach(spinnerElement.querySelector('.e-spinner-pane'));
        }
        if (!isNullOrUndefined(li)) {
            li.setAttribute('title', args.e.currentTarget.statusText);
        }
    }

    const generateSpinner = (targetElement: HTMLElement): void => {
        createSpinner({ target: targetElement, width: '25px' });
        showSpinner(targetElement);
    }

    const onUploadFailed = (args : any): void => {
        let li : Element = dropArea.querySelector('[data-file-name="' + args.file.name + '"]');
        (li.querySelector('.file-name') as HTMLElement).style.color = 'red';
        li.setAttribute('title', args.e.currentTarget.statusText)
        if (args.operation === 'upload') {
            EventHandler.remove(li.querySelector('#iconUpload'), 'click', uploadFile);
            (li.querySelector('.progressbar') as HTMLElement).style.visibility = 'hidden';
        }
    }

    const readURL = (li: HTMLElement, args: any): void => {
        let preview: HTMLImageElement = li.querySelector('.upload-image');
        let file: File = args.rawFile; let reader: FileReader = new FileReader();
        reader.addEventListener('load', () => { preview.src = reader.result as string; }, false);
        if (file) { reader.readAsDataURL(file); }
    }
    const onRemoveFile = (args: RemovingEventArgs): void => {
        args.postRawFile = false;
    }

    return (
        <div className = 'control-pane' ref={dropContainerRef}>
            <div className='control-section' id='uploadpreview'>
                <div className= 'col-lg-9'>
                    <div className='imagepreview'>
                        <div id='dropArea' ref={dropAreaRef} className='dropTarget'>
                            <span id='dropimage' ref={dropImageRef} className='file-name-drop'> Drop image (JPG, PNG) files here or <a href="" id='browse'><u>Browse</u></a> </span>
                            <UploaderComponent id='previewfileupload' type='file' ref={uploadObj} asyncSettings={asyncSettings} success={onUploadSuccess.bind(this)} selected={onSelect.bind(this)} removing={onRemoveFile.bind(this)} progress={onFileUpload.bind(this)} failure={onUploadFailed.bind(this)} allowedExtensions={allowedExtensions}></UploaderComponent>
                        </div>
                    </div>
                </div>
                <div className='property-section uploader-panel col-lg-3' >
                    <PropertyPane title='Properties'>
                        <div className='panel-style'>
                            <button className="e-btn e-css" id="clearbtn" ref={clearRef} title="Clear All">Clear All</button>
                        </div>
                        <div className='panel-style'>
                            <button className="e-btn e-css" id="uploadbtn" ref={buttonRef} title="Upload All">Upload All</button>
                        </div>
                    </PropertyPane>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This <a href="https://www.syncfusion.com/react-ui-components/react-file-upload" target="_blank">&nbsp;React File Upload</a> example demonstrates how to add an image preview of the uploaded files.
                    Browse or drag-and-drop image files (PNG, JPG) to display preview for the selected files.
                </p>
            </div>
            <div id="description">
                <p>The Uploader component allows to create preview images after uploaded it. The preview images created by reading the file using success event.  Also, the user can create preview images before uploading to server using select event.</p>
            </div>
        </div>
    );
}
export default Preview;