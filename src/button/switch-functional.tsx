import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SwitchComponent } from '@syncfusion/ej2-react-buttons';
import { rippleMouseHandler } from '@syncfusion/ej2-buttons';
import { updateSampleSection } from '../common/sample-base';
import './switch.css';

function Switch() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    function rendereComplete(): void {
        let elemArray: NodeListOf<Element> = document.querySelectorAll(".switch-control label");
        for (let i: number = 0, len: number = elemArray.length; i < len; i++) {
            elemArray[i].addEventListener("mouseup", rippleHandler);
            elemArray[i].addEventListener("mousedown", rippleHandler);
        }
        function rippleHandler(e: MouseEvent): void {
            let rippleSpan: Element = document.querySelector(".e-ripple-container");
            if (rippleSpan) {
                rippleMouseHandler(e, rippleSpan);
            }
        }
    }

    return (
        <div className="control-pane">
            <div className="col-lg-12 control-section">
                <div className="switch-content">
                    <div className="container switch-control">
                        <div>
                            <h4 className="heading">Hotspot & tethering</h4>
                        </div>
                        <div>
                            <label htmlFor="checked" style={{ padding: "10px 72px 10px 0" }}> USB Tethering </label>
                            <SwitchComponent id="checked" checked={true}></SwitchComponent>
                        </div>
                        <div>
                            <label htmlFor="unchecked" style={{ padding: "10px 24px 10px 0" }}> Portable Wi-Fi hotspot </label>
                            <SwitchComponent id="unchecked"></SwitchComponent>
                        </div>
                        <div>
                            <label htmlFor="disabled" className="e-disabled" style={{ padding: "10px 40px 10px 0" }}>
                                Bluetooth Tethering </label>
                            <SwitchComponent id="disabled" disabled={true} ></SwitchComponent>
                        </div>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the default functionalities of a Switch. Click the Switch element to toggle between
                    checked and unchecked states.</p>
            </div>
            <div id="description">
                <p>
                    The Switch is a graphical user interface element that allows you to toggle between check and unchecked states.
                </p>
                <p>
                    In this sample, checked state is achieved by using the
                    <a target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/api/switch/#checked">
                        <code>checked</code>
                    </a> property, and disabled state is achieved by using the <a target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/api/switch/#disabled"><code>disabled
                        </code></a> property.
                </p>
                <p>
                    More information on Switch can be found in the <a target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/switch/getting-started">
                        documentation section</a>.
                </p>
            </div>
        </div>
    );
}
export default Switch;