import * as React from 'react';
import { SpeedDialComponent, SpeedDialItemModel } from '@syncfusion/ej2-react-buttons';
import { SampleBase } from '../common/sample-base';
import './modal.css';


export class Modal extends SampleBase<{}, {}> {

    public items: SpeedDialItemModel[] = [
        {
            title: 'Home',
            iconCss:'e-icons e-home'
        },
        {
            title: 'People',
            iconCss:'e-icons e-people'
        },
        {
            title: 'Search',
            iconCss:'e-icons e-search'
        },
        {
            title: 'Message',
            iconCss:'e-icons e-comment-show'
        }
    ];
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div id="speed-dial-wrapper">
                        <div id="speeddialtarget" className="speeddial-modal-target  custom-index">
                            <SpeedDialComponent title="Menu" openIconCss='e-icons e-justify' closeIconCss='e-icons e-close' target='#speeddialtarget' position='BottomCenter' modal={true} items={this.items}></SpeedDialComponent>
                        </div>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        The following sample demonstrates the modal popup of a speed dial. Click the button to open action items and click the overlay to close the action items.
                    </p>
                </div>
                <div id="description">
                    <p>
                        Speed dial enables modal popup mode when the <code>modal</code> property is set. When this mode is enabled, an overlay is added to prevent background interaction, and actions are closed when the overlay is clicked.
                    </p>
                </div>
            </div>
        )
    }
}