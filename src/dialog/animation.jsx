import * as React from 'react';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { SampleBase } from '../common/sample-base';
import './animation.css';
export class Animation extends SampleBase {
    constructor(props) {
        super(props);
        this.state = {
            hideDialog: true
        };
        this.dlgButton = [{
                click: this.dialogButtonClick.bind(this),
                buttonModel: { content: 'Hide', isPrimary: true }
            }];
        this.buttonClick = this.buttonClick.bind(this);
        this.animationSettings = { effect: 'Zoom' };
    }
    dialogButtonClick() {
        this.setState({ hideDialog: false });
    }
    dialogClose() {
        this.setState({ hideDialog: false });
    }
    buttonClick(args) {
        let dialog = this.defaultDialogInstance;
        let effects = args.target.id;
        let txt = args.target.parentElement.innerText;
        txt = (txt === 'Zoom In/Out') ? 'Zoom In or Out' : txt;
        dialog.content = 'The dialog is configured with animation effect. It is opened or closed with "' + txt + '" animation.';
        dialog.animationSettings = { effect: effects, duration: 400 };
        this.setState({ hideDialog: true });
    }
    render() {
        return (<div className='control-pane'>
                <div id='target' className='col-lg-12 control-section dialog-target'>
                    <div id='customization'>
                        <div className='animate'>
                            <button className='e-control e-btn e-outline e-primary' onClick={this.buttonClick.bind(this)} id='Zoom'>Zoom</button>
                        </div>
                        <div className='animate'>
                            <button className='e-control e-btn e-outline e-primary' onClick={this.buttonClick.bind(this)} id='FlipXDown'>FlipX Down</button>
                        </div>
                        <div className='animate'>
                            <button className='e-control e-btn e-outline e-primary' onClick={this.buttonClick.bind(this)} id='FlipXUp'>FlipX Up</button>
                        </div>
                        <div className='animate'>
                            <button className='e-control e-btn e-outline e-primary' onClick={this.buttonClick.bind(this)} id='FlipYLeft'>FlipY Left</button>
                        </div>
                        <div className='animate'>
                            <button className='e-control e-btn e-outline e-primary' onClick={this.buttonClick.bind(this)} id='FlipYRight'>FlipY Right</button>
                        </div>
                    </div>
                    <DialogComponent id='AnimationDialog' isModal={true} header='Animation Dialog' showCloseIcon={true} animationSettings={this.animationSettings} width='285px' ref={defaultDialog => this.defaultDialogInstance = defaultDialog} target='#target' buttons={this.dlgButton} visible={this.state.hideDialog} beforeClose={this.dialogClose.bind(this)}>
                        <span>The dialog is configured with animation effect. It is opened or closed with "Zoom In or Out" animation.</span>
                    </DialogComponent>
                    <div id="action-description">
                        <p>
                            This example demonstrates how to open or close the dialog with animation effects by clicking the appropriate button.
            </p>
                    </div>
                    <div id="description">
                        <p>
                            The dialog can be opened or closed with animation effect using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/dialog/#animationsettings">animationSettings</a> property.
                            You can also customize the duration of animation and delay to begin animation.
                            Disables the dialog's animation by setting the animation effect as none.
            </p>
                        <p>
                            More information on the animation effect of Dialog can be found in the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/dialog/animation/">
                                documentation section</a>.
            </p>
                    </div>
                </div>
            </div>);
    }
}
