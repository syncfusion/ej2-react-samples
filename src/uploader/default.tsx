import * as ReactDOM from 'react-dom';
import * as React from 'react';
import './uploader.css';
import { SampleBase } from '../common/sample-base';
import {PropertyPane} from '../common/property-pane';
import {UploaderComponent} from '@syncfusion/ej2-react-inputs';
import {CheckBoxComponent, ChangeEventArgs} from '@syncfusion/ej2-react-buttons';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-react-popups';
import { detach, Browser } from '@syncfusion/ej2-base';

export class Default extends SampleBase<{}, {}> {
// Uploader component
public checkboxObj: CheckBoxComponent;
public uploadObj: UploaderComponent;

rendereComplete() {
	this.uploadObj.dropArea = document.getElementsByClassName('control-fluid')[0] as HTMLElement;
    this.uploadObj.dataBind();
}

onChange(args: ChangeEventArgs): void {
    this.uploadObj.autoUpload = args.checked;
    if (this.uploadObj.element.closest('.e-upload').querySelector('.e-spinner-pane')) {
        detach((this.uploadObj.element.closest('.e-upload').querySelector('.e-spinner-pane')));
    }
    this.uploadObj.clearAll();
}

onSuccess(args: any) : void {
    let li: HTMLElement = document.getElementsByClassName('e-upload')[0].querySelector('[data-file-name="' + args.file.name + '"]');
    if (args.operation === 'upload') {
        (li.querySelector('.e-file-delete-btn') as HTMLElement).onclick = () => {
            // create spinner to uploader component
            createSpinner({ target: document.getElementsByClassName('e-upload')[0] as HTMLElement, width: '25px' });
            showSpinner(document.getElementsByClassName('e-upload')[0] as HTMLElement);
        };
		(li.querySelector('.e-file-delete-btn') as HTMLElement).onkeydown = (e: any) => {
		if (e.keyCode === 13) { 
			createSpinner({ target: document.getElementsByClassName('e-upload')[0] as HTMLElement, width: '25px' });
			showSpinner(document.getElementsByClassName('e-upload')[0] as HTMLElement);
			}
		};
    } else {
        hideSpinner(document.getElementsByClassName('e-upload')[0] as HTMLElement);
        detach(document.getElementsByClassName('e-upload')[0].querySelector('.e-spinner-pane'));
    }
}

render() {
    const dropTarget: HTMLElement = document.getElementsByClassName('control-fluid')[0] as HTMLElement;
    return (       
      <div className = 'control-pane'>
        <div className='control-section row uploadpreview'>
         <div className='col-lg-9'>
          <div className='upload_wrapper'>
            {/* Render Uploader */}
            <UploaderComponent id='fileUpload' type='file' ref = {(scope) => {this.uploadObj = scope}}
             asyncSettings = {{
                saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
                removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
            }}
             success={ this.onSuccess.bind(this) }
            ></UploaderComponent>
        </div>
        </div>
        <div className='property-section col-lg-3'>
            <PropertyPane title='Properties'>
                <div  style = {{marginleft: '50px', paddingtop:'25px'}}>
                    <CheckBoxComponent checked={true} label='Auto Upload' ref={(scope) => { this.checkboxObj = scope; }} change={ this.onChange.bind(this) } ></CheckBoxComponent>
                </div>
            </PropertyPane>
        </div>
        </div>
        <div id="action-description">
        <p>This sample demonstrates the default functionalities of the Uploader component. Browse the files which you want to upload to the server. 
           The selected files are submitted to server on upload button click. If you click on the clear button, the selected / uploaded files are cleared from list.</p>
        <p>Also, provided option to enable/disable the auto upload feature in the property panel</p>
        </div>
        <div id="description">
        <p>The Uploader component is useful to upload images, documents, and other files. By default, the component allows to upload multiple files to browse and upload it to server.
           The selected files append to the file list that contains file details such as name, type, and size.</p>
        <p>You can manage the files in server after received the uploaded files. When the files are successfully uploaded to server, the remove button will be change to bin button.
            The uploaded files can be removed by click on the bin button.</p>
        <p>The progress bar displays for each file upload to denote its upload progress. 
            Once the file upload gets success, the progress bar disappear and corresponding upload status message will be displayed in same place.</p>
        <p>More information on the Uploader instantiation can be found in this documentation section.</p>
        </div>
      </div>
    )
  }
}
