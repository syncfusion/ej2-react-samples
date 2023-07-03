import * as React from 'react';
import { useEffect } from 'react';
import { SpeedDialComponent, SpeedDialItemModel } from '@syncfusion/ej2-react-buttons';
import { updateSampleSection } from '../common/sample-base';
import './default.css';

const Default = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const items: SpeedDialItemModel[] = [
        {
            title: 'Home',
            iconCss: 'speeddial-icons speeddial-icon-house'
        },
        {
            title: 'People',
            iconCss: 'speeddial-icons speeddial-icon-people'
        },
        {
            title: 'Search',
            iconCss: 'speeddial-icons speeddial-icon-search'
        },
        {
            title: 'Message',
            iconCss: 'speeddial-icons speeddial-icon-message'
        }
    ];

    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div id="speed-dial-wrapper">
                    <div id="speeddialtarget" className="speeddial-default-target  custom-index">
                        <SpeedDialComponent title="Menu" openIconCss='speeddial-icons speeddial-icon-menu' closeIconCss='speeddial-icons speeddial-icon-close' target='#speeddialtarget' position='BottomCenter' items={items}></SpeedDialComponent>
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
export default Default;
