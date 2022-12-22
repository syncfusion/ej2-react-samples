import * as React from 'react';
import { AppBarComponent } from '@syncfusion/ej2-react-navigations';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { updateSampleSection } from '../common/sample-base';
import './default.css';

function Default() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])

    return (
        <div className='control-pane'>
            <div className='col-lg-12 control-section default-appbar-section'>
                <div className='control appbar-sample'>
                    <div className="default-appbar-container">
                        <div className="row">
                            <div className="col-md-12">
                                <h5>Simple AppBar</h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <AppBarComponent colorMode="Primary">
                                    <ButtonComponent ref={regularBtn => (regularBtn = regularBtn)} aria-label='menu' cssClass='e-inherit menu' iconCss='e-icons e-menu'></ButtonComponent>
                                    <span className="regular">React AppBar</span>
                                    <div className="e-appbar-spacer"></div>
                                    <ButtonComponent cssClass='e-inherit login'>FREE TRIAL</ButtonComponent>
                                </AppBarComponent>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-md-12">
                                <h5>Prominent</h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <AppBarComponent mode="Prominent" cssClass='prominent-appbar' colorMode="Primary">
                                    <ButtonComponent ref={primaryBtn => (primaryBtn = primaryBtn)} aria-label='menu' cssClass='e-inherit menu' iconCss='e-icons e-menu'></ButtonComponent>
                                    <span className="prominent">React AppBar Component with Prominent mode</span>
                                    <div className="e-appbar-spacer"></div>
                                    <ButtonComponent cssClass='e-inherit login'>FREE TRIAL</ButtonComponent>
                                </AppBarComponent>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-md-12">
                                <h5>Dense</h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <AppBarComponent mode="Dense" colorMode="Primary">
                                    <ButtonComponent ref={denseBtn => (denseBtn = denseBtn)} aria-label='menu' cssClass='e-inherit menu' iconCss='e-icons e-menu'></ButtonComponent>
                                    <span className="dense">React AppBar</span>
                                    <div className="e-appbar-spacer"></div>
                                    <ButtonComponent cssClass='e-inherit login'>FREE TRIAL</ButtonComponent>
                                </AppBarComponent>
                            </div>
                        </div>
                        <br />
                    </div>
                </div></div>
            <div id="action-description">
                <p>
                    This sample demonstrates the default functionalities of the <strong>React AppBar</strong>.
                </p>
            </div>
            <div id="description">
                <p>The <strong>React AppBar</strong> is a navigation component that displays information and actions related to the current view horizontally. </p> <br />
                <p>In this demo, the available types of React AppBar are showcased. They are <code>regular</code>, <code>prominent</code>, and <code>dense</code>, and can be set using the <strong>Mode</strong> property. </p>
                <p><code>Regular</code> - The AppBar is displayed with the default height.</p>
                <p><code>Prominent</code> - Prominent top app bars are longer than regular, and can be used for larger titles, images, or texts.</p>
                <p><code>Dense</code> - The AppBar's layout is denser to accommodate all the AppBar content.</p>
                <p>In this demo, <strong>Button</strong> component's styles are inherited from the <strong>AppBar</strong> component using the <code>e-inherit</code> CSS class. </p>
            </div>
        </div>
    );
}
export default Default;