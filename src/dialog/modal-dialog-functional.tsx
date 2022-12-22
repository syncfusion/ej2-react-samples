import * as React from 'react';
import { useState } from 'react';
import {
  DialogComponent,
  ButtonPropsModel,
  AnimationSettingsModel,
} from '@syncfusion/ej2-react-popups';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { PropertyPane } from '../common/property-pane';
import { updateSampleSection } from '../common/sample-base';
import './modal-dialog.css';

function Modal() {
    React.useEffect(() => {
      updateSampleSection();
    }, []);
    let dialogInstance: DialogComponent;
    let checkboxObj: CheckBoxComponent;
    let animationSettings: AnimationSettingsModel;
    let buttons: ButtonPropsModel[];
    let buttonEle: HTMLButtonElement;
    const [display, setDisplay] = useState('none');
    const [status, setStatus] = useState({ hideDialog: true });
    let buttonRef: React.Ref<HTMLButtonElement> = (element) => {
      buttonEle = element;
    };
    animationSettings = { effect: 'None' };
    buttons = [
      {
        // Click the footer buttons to hide the Dialog
        click: () => {
          setStatus({ hideDialog: false });
        },
        // Accessing button component properties by buttonModel property
        buttonModel: {
          //Enables the primary button
          isPrimary: true,
          content: 'OK',
        },
      },
    ];
  
    // function to handle the CheckBox change event
    function onChange(args: ChangeEventArgs) {
      if (args.checked) {
        dialogInstance.overlayClick = () => {
          setStatus({ hideDialog: false });
        };
      } else {
        dialogInstance.overlayClick = () => {
          setStatus({ hideDialog: true });
        };
      }
    }
    // To Open dialog
    function buttonClick(): void {
      setStatus({ hideDialog: true });
    }
  
    function dialogClose(): void {
      setStatus({ hideDialog: false });
      setDisplay('inline-block');
    }
  
    function dialogOpen(): void {
      setStatus({ hideDialog: true });
      setDisplay('none');
    }
  
    return (
      <div className="control-pane">
        <div className="control-section modal-dialog-target">
          <div id="target" className="col-lg-8">
            <button
              className="e-control e-btn dlgbtn dlgbtn-position"
              ref={buttonRef}
              onClick={buttonClick}
              style={{ display: display }}
            >
              Open
            </button>
            {/* Rendering modal Dialog by enabling 'isModal' as true */}
            <DialogComponent
              id="modalDialog"
              isModal={true}
              buttons={buttons}
              header="Software Update"
              width="335px"
              content="Your current software version is up to date."
              ref={(dialog) => (dialogInstance = dialog)}
              target="#target"
              visible={status.hideDialog}
              open={dialogOpen}
              close={dialogClose}
              animationSettings={animationSettings}
            ></DialogComponent>
          </div>
          <div className="col-lg-4 property-section">
            <PropertyPane title="Properties">
              <table
                id="property"
                title="Properties"
                className="property-panel-table table-width"
              >
                <tbody>
                  <tr>
                    <td className="table-td">
                      <div className="dialog-td-font">Close on overlay click</div>
                    </td>
                    <td>
                      <CheckBoxComponent
                        checked={false}
                        ref={(scope) => {
                          checkboxObj = scope;
                        }}
                        change={onChange}
                      ></CheckBoxComponent>
                    </td>
                  </tr>
                </tbody>
              </table>
            </PropertyPane>
          </div>
        </div>
        <div id="action-description">
          <p>
            This example demonstrates that the modal behavior of dialog component.
            Choose "close on overlay" option from property panel to decide whether
            the dialog can be closed when clicking overlay. Click "open" to show
            the dialog again, if it is in closed state.
          </p>
        </div>
        <div id="description">
          <p>
            The modal dialog prevents to access the parent application. So, the
            user should interact with the dialog before continuing with the parent
            application.
          </p>
          <p>
            More information on the modal behavior of Dialog can be found in the{' '}
            <a
              target="_blank"
              href="https://ej2.syncfusion.com/react/documentation/dialog/getting-started/#modal-dialog"
            >
              documentation section.
            </a>
          </p>
        </div>
      </div>
    );
}
export default Modal;