import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Ajax } from '@syncfusion/ej2-base';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { SampleBase } from './sample-base';

export class AjaxContent extends SampleBase<{}, {}> {
    private dialogInstance: DialogComponent;
    public rendereComplete(): void {
        let ajax: Ajax = new Ajax('./src/dialog/twitter.html', 'GET', true);
        ajax.send().then();
        ajax.onSuccess = (data: string): void => {
            // Load Dialog content on AJAX success
            this.dialogInstance.content = data;
            this.dialogInstance.dataBind();
            this.dialogInstance.refreshPosition();
        };
    }
    //Bind the button click event
    buttonClick() {
        this.dialogInstance.show();
    }

    // Show the 'Open' button, when the Dialog has been closed
    dialogClose() {
        (document.querySelectorAll('.dlgbtn')[0] as HTMLElement).style.display='inline-block';
    }
    // Hide the 'Open' button, when the Dialog has been opened
    public dialogOpen(this:any): void {
        (document.querySelectorAll('.dlgbtn')[0] as HTMLElement).style.display='none';  
    }
    private animationSettings: Object = { effect: 'None' };

    render() {
        return (
            <div className='control-pane'>
                <div id='target' className='control-section' style={{'min-height':'350px'}}>
                    {/* Render button to open the Dialog  */}
                    <button className="e-control e-btn dlgbtn" onClick={this.buttonClick.bind(this)} id="dialogBtn">Open</button>
                    {/* Render the Dialog */}
                    <DialogComponent id="dialog" header='Twitter' showCloseIcon={true} animationSettings={this.animationSettings} width='500px' ref={dialog => this.dialogInstance = dialog}
                        target='#target' beforeOpen={this.dialogOpen.bind(this)} close={this.dialogClose.bind(this)}
                        open={this.dialogOpen.bind(this)}></DialogComponent>
                </div>
            </div>
        )
    }
}
ReactDOM.render(<AjaxContent />, document.getElementById('sample'));