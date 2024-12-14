import * as React from 'react';
import { SpeedDialComponent, SpeedDialItemModel } from '@syncfusion/ej2-react-buttons';
import { SampleBase } from '../common/sample-base';
import './default.css';

export class Default extends SampleBase<{}, {}> {

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
        }];

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div id="speed-dial-wrapper">
                        <div id="speeddialtarget" className="speeddial-default-target  custom-index">
                            <SpeedDialComponent title="Menu" openIconCss='e-icons e-justify' closeIconCss='e-icons e-close' target='#speeddialtarget' position='BottomCenter' items={this.items}></SpeedDialComponent>
                        </div>
                    </div>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the default functionalities of the Speed Dial component. Speed dial is a <b>transition type</b> of FAB which displays a list of action buttons when clicked.</p>
                </div>
                <div id="description">
                    <p>The Speed Dial component is used to display multiple action items for the floating action button. It is useful when there are more than one primary action on the page. The Speed dial displays action items in linear and radial directions.. </p>
                </div>
            </div>
        )
    }
}
