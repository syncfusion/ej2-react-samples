import * as React from 'react';
import { useEffect } from 'react';
import { SpeedDialComponent, SpeedDialItemModel } from '@syncfusion/ej2-react-buttons';
import { updateSampleSection } from '../common/sample-base';
import './linear.css';

const Linear = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const items: SpeedDialItemModel[] = [
        {
            title: 'Image',
            iconCss: 'speeddial-icons speeddial-icon-image'
        },
        {
            title: 'Audio',
            iconCss: 'speeddial-icons speeddial-icon-audio'
        },
        {
            title: 'Video',
            iconCss: 'speeddial-icons speeddial-icon-video'
        }
    ];

    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div id="speed-dial-wrapper">
                    <div id="speeddialtarget" className="speeddial-linear-target  custom-index">
                        <SpeedDialComponent openIconCss='speeddial-icons speeddial-icon-upload' cssClass="e-success" target='#speeddialtarget' title='Top Left' position='TopLeft' items={items}></SpeedDialComponent>
                        <SpeedDialComponent openIconCss='speeddial-icons speeddial-icon-upload' cssClass="e-warning" target='#speeddialtarget' title='Top Center' position='TopCenter' items={items}></SpeedDialComponent>
                        <SpeedDialComponent openIconCss='speeddial-icons speeddial-icon-upload' cssClass="e-success" target='#speeddialtarget' title='Top Right' position='TopRight' items={items}></SpeedDialComponent>
                        <SpeedDialComponent openIconCss='speeddial-icons speeddial-icon-upload' cssClass="e-warning" target='#speeddialtarget' title='Middle Left' position='MiddleLeft' direction="Right" items={items}></SpeedDialComponent>
                        <SpeedDialComponent openIconCss='speeddial-icons speeddial-icon-upload' target='#speeddialtarget' title='Middle Center' position='MiddleCenter' items={items}></SpeedDialComponent>
                        <SpeedDialComponent openIconCss='speeddial-icons speeddial-icon-upload' cssClass="e-warning" target='#speeddialtarget' title='Middle Right' position='MiddleRight' direction="Left" items={items}></SpeedDialComponent>
                        <SpeedDialComponent openIconCss='speeddial-icons speeddial-icon-upload' cssClass="e-success" target='#speeddialtarget' title='Bottom Left' position='BottomLeft' items={items}></SpeedDialComponent>
                        <SpeedDialComponent openIconCss='speeddial-icons speeddial-icon-upload' cssClass="e-warning" target='#speeddialtarget' title='Bottom Center' position='BottomCenter' items={items}></SpeedDialComponent>
                        <SpeedDialComponent openIconCss='speeddial-icons speeddial-icon-upload' cssClass="e-success" target='#speeddialtarget' title='Bottom Right' position='BottomRight' items={items}></SpeedDialComponent>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the different positions of the Speed Dial component in the target container. Based on the position of the speed dial, action items’ display direction will vary. Click the speed dial button to open action items. </p>
            </div>
            <div id="description">
                <p>
                    Speed dial displays action items based on <code>position</code>, by default. Using the <code>direction</code> property, specify one of the below directions.
                    <ul>
                        <li>Up</li>
                        <li>Down</li>
                        <li>Left</li>
                        <li>Right</li>
                    </ul>
                </p>
            </div>
        </div>
    )
}
export default Linear;