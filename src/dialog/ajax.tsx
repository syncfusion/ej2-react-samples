import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Ajax } from '@syncfusion/ej2-base';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { SampleBase } from '../common/sample-base';
import './ajax.css';

export class AjaxContent extends SampleBase<{}, {}> {
    private dialogInstance: DialogComponent;
	private dialogTarget: HTMLElement = document.getElementById('target') as HTMLElement ;
	

    constructor() {
        super()
        this.dlgButtonClick = this.dlgButtonClick.bind(this);
    }

    buttonClick() {
        this.dialogInstance.show();
    }
    
    rendereComplete () {
        (document.getElementsByClassName('e-footer-content')[0].querySelector('.e-btn') as HTMLElement).onclick = () => {
           this.dlgButtonClick();		   
        }
    }
    dlgButtonClick(): void {
        if (document.querySelector('.e-footer-content .e-btn').textContent === 'More Details') {
        let ajax: Ajax = new Ajax('./src/dialog/blog.html', 'GET', true);
        ajax.send().then();
        ajax.onSuccess = (data: string): void => {
			this.dialogInstance.target= document.getElementById('target');
            this.dialogInstance.content= data;
        };
        this.dialogInstance.buttons = [{click: this.dlgButtonClick, buttonModel: { content: 'Less Details' }}];
        this.dialogInstance.height = '250px';
        } else {
            this.dialogInstance.content = this.innerContent;
            this.dialogInstance.buttons = [{click: this.dlgButtonClick, buttonModel: { content: 'More Details' }}];
        }
    }
    dialogClose() {
        (document.querySelectorAll('.dlgbtn')[0] as HTMLElement).style.display='inline-block';
    }
    public dialogOpen(this:any): void {
        (document.querySelectorAll('.dlgbtn')[0] as HTMLElement).style.display='none';  
    }
    private animationSettings: Object = { effect: 'None' };
	private innerContent: string = 'On October 17, Microsoft will release its Fall Creators Update for the Windows 10 platform.'
    + 'Much likeits previous counterpart, the Spring Creators Update, the release is set to deliver more features to Windows 10'
    + ' forboth developers and users with particular emphasis this time around on app modernization, mixed reality'
    + 'and gamedevelopment and software updates. App modernization is the term Microsoft used in its press event toencompass the'
    + 'features that will affect most Windows 10 users and developers. The updates primarily serve to makeusing Windows 10';
	
    private buttons: Object[] = [{
        buttonModel: {
            content: 'More Details'
        }
    }];
	

    render() {
        return (
            <div className='control-pane'>
                <div id='target' className='control-section ajaxcontent col-lg-12' style={{'min-height':'350px'}}>
                    <button className="e-control e-btn dlgbtn" onClick={this.buttonClick.bind(this)} id="dialogBtn">Open</button>
                    <DialogComponent id="dialog" header= {'<img class="img1" src="src/dialog/images/2.png">' + 'What’s Coming from Microsoft this Fall'} showCloseIcon={true} animationSettings={this.animationSettings} ref={dialog => this.dialogInstance = dialog}
                     width = {'500px'} 
					 target= {'#target'}
                     close={this.dialogClose.bind(this)}
                     open={this.dialogOpen.bind(this)}
                     content= {this.innerContent}
                     buttons = {this.buttons}
				     ></DialogComponent>
                </div>
                <div id="action-description">
                <p>
                    This sample demonstrates that the content of dialog can be loaded from external HTML file. Click "more details" on dialog to load the content dynamically from external HTML file. Click “open” to show the dialog again, if it is closed. 
                </p>
                </div>
                <div id="description">
                    <p>
                    The user can load dialog's content dynamically from external source like external file using AJAX library. The AJAX library can make the request and load dialog's content using its success event. 
                    </p>
                </div>
            </div>
        )
    }
}