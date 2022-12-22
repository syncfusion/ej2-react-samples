import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DropDownButtonComponent, ItemModel } from '@syncfusion/ej2-react-splitbuttons';
import { updateSampleSection } from '../common/sample-base';
import './dropdown-button.css';

function DropDownButton() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let items: ItemModel[] = [
        {
            text: 'Dashboard',
            iconCss: 'e-ddb-icons e-dashboard'
        },
        {
            text: 'Notifications',
            iconCss: 'e-ddb-icons e-notifications',
        },
        {
            text: 'User Settings',
            iconCss: 'e-ddb-icons e-settings',
        },
        {
            text: 'Log Out',
            iconCss: 'e-ddb-icons e-logout'
        }];

    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div className='dropdownbutton-section'>
                    <div id='dropdownbutton-control'>
                        <div className='row'>
                            <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                                <DropDownButtonComponent items={items} iconCss='e-ddb-icons e-profile'></DropDownButtonComponent>
                            </div>

                            <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                                <DropDownButtonComponent items={items}>Profile</DropDownButtonComponent>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                                <DropDownButtonComponent items={items} iconCss='e-ddb-icons e-profile'>Profile</DropDownButtonComponent>
                            </div>

                            <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                                <DropDownButtonComponent items={items} cssClass='e-caret-hide'>Profile</DropDownButtonComponent>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the default functionalities of the DropDownButton.
                    Clicking DropDownButton will display popup with list of action items.</p>
            </div>
            <div id="description">
                <p>
                    The DropDownButton component is used to toggle contextual overlays for displaying list of action items.
                    It can contain both text and images.
                </p>
                <p>
                    In this sample, DropDownButton contains icon, content and list of action items, and can be added using
                    <code>
                        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/drop-down-button/#iconcss">iconCss,
                        </a>
                    </code>
                    <code>
                        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/drop-down-button/#content">content
                        </a>
                    </code>and
                    <code>
                        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/drop-down-button/#items">items
                        </a>
                    </code>property.
                </p>
                <p>
                    More information about DropDownButton can be found in this
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/drop-down-button/getting-started">
                        documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default DropDownButton;
