import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Fetch } from '@syncfusion/ej2-base';
import { DialogComponent, ButtonPropsModel, AnimationSettingsModel } from '@syncfusion/ej2-react-popups';
import { SampleBase } from '../common/sample-base';
import './dialog-contents-via-ajax.css';

export class AjaxContent extends SampleBase<{}, { hideDialog: boolean; }> {
    public dialogInstance: DialogComponent;
    private buttons: ButtonPropsModel[];
    private animationSettings: AnimationSettingsModel;
    private buttonEle: HTMLButtonElement;
    private buttonRef: React.Ref<HTMLButtonElement>;
    constructor(props: {}) {
        super(props);
        this.state = {
            hideDialog: true
        };
        this.buttonRef = element => {
            this.buttonEle = element;
        };
        this.dlgButtonClick = this.dlgButtonClick.bind(this);
        this.dialogClose = this.dialogClose.bind(this);
        this.dialogOpen = this.dialogOpen.bind(this);
        this.animationSettings = { effect: 'None' };
        this.buttons = [{
            click: this.dlgButtonClick,
            buttonModel: {
                content: 'More Details',
                isPrimary: true
            }
        }];
    }

    private buttonClick(): void {
        this.setState({ hideDialog: true });
    }

    private dlgButtonClick(): void {
        if (document.querySelector('.e-footer-content .e-btn').textContent === 'More Details') {
            let fetchApi: Fetch = new Fetch('./src/dialog/blog.html', 'GET');
            fetchApi.send().then();
            fetchApi.onSuccess = (data: string | HTMLElement): void => {
                this.dialogInstance.target = document.getElementById('target');
                this.dialogInstance.content = data;
            };
            this.dialogInstance.buttons = [{ click: this.dlgButtonClick, buttonModel: { content: 'Less Details', isPrimary: true } }];
        } else {
            this.dialogInstance.content = this.innerContent;
            this.dialogInstance.buttons = [{ click: this.dlgButtonClick, buttonModel: { content: 'More Details', isPrimary: true } }];
        }
    }
    private dialogClose(): void {
        this.setState({ hideDialog: false });
        this.buttonEle.style.display = 'inline-block';
    }
    public dialogOpen(): void {
        this.buttonEle.style.display = 'none';
    }
    private innerContent: string = `On October 17, Microsoft will release its Fall Creators Update for the Windows
    10 platform. Much like its previous counterpart, the Spring Creators Update, the release is set to deliver more 
    features to Windows 10 for both developers and users, with particular emphasis this time around on app modernization,
    mixed reality, and game development and software updates. App modernization is the term Microsoft used in its press 
    event to encompass the features that will affect most Windows 10 users and developers.`

    public render(): JSX.Element {
        return (
            <div className='control-pane'>
                <div id='target' className='control-section ajaxcontent col-lg-12'>
                    <button className="e-control e-btn dlgbtn" ref={this.buttonRef} onClick={this.buttonClick.bind(this)} id="dialogBtn">Open</button>
                    <DialogComponent id="dialog" visible={this.state.hideDialog} header={'<img class="img1" src="src/dialog/images/2.png" alt="Microsoft roadmap">' + 'What’s Coming from Microsoft this Fall'} showCloseIcon={true} animationSettings={this.animationSettings} ref={dialog => this.dialogInstance = dialog}
                        width={'500px'}
                        target={'#target'}
                        close={this.dialogClose}
                        open={this.dialogOpen}
                        content={this.innerContent}
                        buttons={this.buttons}
                    ></DialogComponent>
                </div>
                <div id="action-description">
                    <p>
                        This example demonstrates that the content of dialog can be loaded from external HTML file. Click "more details" on dialog to load the content dynamically from external HTML file. Click “open” to show the dialog again, if it is closed.
                </p>
                </div>
                <div id="description">
                    <p>
                        The user can load dialog's content dynamically from external source like external file using Fetch library. The Fetch library can make the request and load dialog's content using its success event.
                    </p>
                </div>
            </div>
        );
    }
}