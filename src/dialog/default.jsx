import * as React from 'react';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { SampleBase } from '../common/sample-base';
import './default.css';
export class DefaultFunctionalities extends SampleBase {
    constructor(props) {
        super(props);
        this.state = {
            hideDialog: true
        };
        this.buttonRef = element => {
            this.buttonEle = element;
        };
        this.buttons = [{
                click: this.dlgButtonClick,
                buttonModel: {
                    content: 'Learn More',
                    isPrimary: true
                }
            }];
        this.animationSettings = { effect: 'None' };
    }
    buttonClick() {
        this.setState({ hideDialog: true });
    }
    dlgButtonClick() {
        window.open('https://www.syncfusion.com/company/about-us');
    }
    dialogClose() {
        this.setState({ hideDialog: false });
        this.buttonEle.style.display = "block";
    }
    dialogOpen() {
        this.buttonEle.style.display = "none";
    }
    render() {
        return (<div className='control-pane'>
                <div id='targetElement' className='control-section col-lg-12 defaultDialog dialog-target'>
                    <button className="e-control e-btn dlgbtn" ref={this.buttonRef} onClick={this.buttonClick.bind(this)} id="dialogBtn"> Open</button>
                    <DialogComponent id="defaultdialog" showCloseIcon={true} animationSettings={this.animationSettings} visible={this.state.hideDialog} width={'500px'} ref={dialog => this.dialogInstance = dialog} target={'#targetElement'} header='About SYNCFUSION Succinctly Series' buttons={this.buttons} open={this.dialogOpen.bind(this)} close={this.dialogClose.bind(this)}>
                        <div>
                            <div>
                                In the Succinctly series, Syncfusion created a
                    robust free library of more than 130 technical e-books formatted for PDF, Kindle, and EPUB.<br />
                                <br />The Succinctly series was born in 2012 out of a desire to provide concise technical e-books for software developers
                                Each title in the Succinctly series is written by a carefully chosen expert and provides essential content
                                in about 100 pages.
                </div>
                        </div>
                    </DialogComponent>
                </div>
                <div id="action-description">
                    <p>
                        This example demonstrates the default rendering of the dialog component with minimum configuration. Click close or press ESC  to close the dialog. Click “open” to show the dialog again, if it is closed.
        </p>
                </div>
                <div id="description">
                    <p>
                        The dialog component is used to display information and get input from the user.
                        The dialog component is classified as modal and non-modal dialog depend on its interaction with parent application.
        </p>
                    <ul>
                        <li>Modal - It creates overlay that disable interaction with the parent application,
                and user should respond with modal before continuing with other applications.</li>
                        <li>Non-modal - It does not prevent user interaction with parent application.</li>
                    </ul>
                </div>
            </div>);
    }
}
