import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { PropertyPane } from './property-pane';
import { SampleBase } from './sample-base';

export class Modal extends SampleBase<{}, {}> {
    private dialogInstance: DialogComponent;
    // Dialog will be closed, while clicking on overlay
    onOverlayClick() {
        if ((document.getElementById('overlaycheckbox') as HTMLInputElement).checked) {
            this.dialogInstance.hide();
        }
    }
    //Bind the button click event
    buttonClick() {
        this.dialogInstance.show();
    }
    private animationSettings: Object = { effect: 'None' };
    private buttons: Object[] = [{
    // Click the footer buttons to hide the Dialog
    'click': () => {
        this.dialogInstance.hide();
    },
    // Accessing button component properties by buttonModel property
    buttonModel: {
        //Enables the primary button
        isPrimary: true,
        cssClass: 'e-flat',
        content: 'OK'
    }
}];

   dialogClose() {
        (document.querySelectorAll('.dlgbtn')[0] as HTMLElement).style.display='inline-block';
    }
    dialogOpen() {
        (document.querySelectorAll('.dlgbtn')[0] as HTMLElement).style.display='none';
    }

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section row'>
            <div id='target' className='col-lg-8' style={{'min-height':'350px'}}>
            <button className="e-control e-btn dlgbtn" style={{position:'absolute'}} onClick={this.buttonClick.bind(this)}>Open</button>
            {/* Rendering modal Dialog by enabling 'isModal' as true */}
            <DialogComponent id="modalDialog" isModal={true} buttons={this.buttons} header='Software Update' width='335px' content='Your current software version is up to date.' 
            ref={dialog => this.dialogInstance = dialog}
            target='#target' overlayClick={this.onOverlayClick.bind(this)} open={this.dialogOpen.bind(this)} close={this.dialogClose.bind(this)} animationSettings={this.animationSettings}></DialogComponent>
            </div>
          <div className='col-lg-4 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                                <tr>
                                    <td style={{ width:'70%' }}>
                                    <div>Close on overlay click</div>
                                    </td>
                                    <td style={{ width:'30%' }}>
                                    <div><input type="checkbox" id="overlaycheckbox" /></div>
                                    </td>
                                </tr>
                            </table>
                        </PropertyPane>
                    </div>
                </div>
      </div>
    )
  }
}
ReactDOM.render(<Modal />, document.getElementById('sample'));