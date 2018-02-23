import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { SampleBase } from '../common/sample-base';

export class DefaultFunctionalities extends SampleBase<{}, {}> {
    private dialogInstance: DialogComponent;
    buttonClick() {
        this.dialogInstance.show();
    }
    dlgButtonClick() {
        window.open('https://www.syncfusion.com/company/about-us');
    }

    private buttons: Object[] = [{
        buttonModel: {
            content: 'LEARN ABOUT SYNCFUSION, INC.'
        }
    }
    ];

    rendereComplete () {
        (document.getElementsByClassName('e-footer-content')[0].querySelector('.e-btn') as HTMLElement).onclick = () => {
           this.dlgButtonClick();		   
        }
        this.dialogInstance.target = document.getElementById('target') as HTMLElement;
    }

	dialogClose() {
			(document.querySelectorAll('.dlgbtn')[0] as HTMLElement).style.display='inline-block';
		}
	dialogOpen() {
			(document.querySelectorAll('.dlgbtn')[0] as HTMLElement).style.display='none';
	}

private animationSettings:Object= { effect: 'Zoom' };
private dialogContent: string = '<div>In the Succinctly series, Syncfusion created a robust' 
    + 'free library of more than 130 technical e-books formatted for PDF, Kindle, and EPUB. <br>'
    + '<br> The Succinctly series was born in 2012 out of a desire to provide concise technical e-books for software developers'
   + 'Each title in the Succinctly series is written by a carefully chosen expert and provides essential content'
    + 'in about 100 pages.</div>';

  render() {
    return (
      <div className = 'control-pane'>
        <div id='targetElement' className='control-section col-lg-10 defaultDialog' style={{'min-height':'350px'}}>
            <button className="e-control e-btn dlgbtn" onClick={this.buttonClick.bind(this)} id="dialogBtn">Open</button>        
            <DialogComponent id="defaultdialog" showCloseIcon={true} animationSettings={this.animationSettings} width={'50%'} content={this.dialogContent} ref={dialog => this.dialogInstance = dialog}
            target={'#targetElement'} header='About SYNCFUSION Succinctly Series' buttons={this.buttons} open={this.dialogOpen.bind(this)} close={this.dialogClose.bind(this)}></DialogComponent>
        </div>
        <div id="action-description">
        <p>
        This sample demonstrates the default rendering of the dialog component with minimum configuration. Click close or press ESC  to close the dialog. Click “open” to show the dialog again, if it is closed.
        </p>
        </div>
        <div id="description">
        <p>
        The dialog component is used to display information and get input from the user.
        The dialog component is classified as modal and non-modal dialog depend on its interaction with parent application.  
        <ul>
            <li>Modal - It creates overlay that disable interaction with the parent application, 
                and user should respond with modal before continuing with other applications.</li>
            <li>Non-modal - It does not prevent user interaction with parent application.</li>
        </ul>
        </p>
        </div>
      </div>
    )
  }
}