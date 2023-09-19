import * as React from 'react';
import { useEffect } from 'react';
import { RadialSettingsModel, SpeedDialComponent, SpeedDialItemModel } from '@syncfusion/ej2-react-buttons';
import { updateSampleSection } from '../common/sample-base';
import './radial.css';

const Radial = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const items: SpeedDialItemModel[] = [
        {
            title: 'Cut',
            iconCss: 'speeddial-icons speeddial-icon-cut'
        },
        {
            title: 'Copy',
            iconCss: 'speeddial-icons speeddial-icon-copy'
        },
        {
            title: 'Paste',
            iconCss: 'speeddial-icons speeddial-icon-paste'
        },
        {
            title: 'Delete',
            iconCss: 'speeddial-icons speeddial-icon-delete'
        }
    ];

    const radialSetting: RadialSettingsModel = { offset: '70px' };
    const radialSetting1: RadialSettingsModel = { offset: '110px' };

    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div id="speed-dial-wrapper">
                    <div id="speeddialtarget" className="speeddial-radial-target  custom-index">
                        <SpeedDialComponent openIconCss='speeddial-icons speeddial-icon-edit' cssClass="e-success" target='#speeddialtarget' title='Top Left' position='TopLeft' radialSettings={radialSetting1} mode='Radial' items={items}></SpeedDialComponent>
                        <SpeedDialComponent openIconCss='speeddial-icons speeddial-icon-edit' cssClass="e-warning" target='#speeddialtarget' title='Top Center' position='TopCenter' radialSettings={radialSetting} mode='Radial' items={items}></SpeedDialComponent>
                        <SpeedDialComponent openIconCss='speeddial-icons speeddial-icon-edit' cssClass="e-success" target='#speeddialtarget' title='Top Right' position='TopRight' radialSettings={radialSetting1} mode='Radial' items={items}></SpeedDialComponent>
                        <SpeedDialComponent openIconCss='speeddial-icons speeddial-icon-edit' cssClass="e-warning" target='#speeddialtarget' title='Middle Left' position='MiddleLeft' radialSettings={radialSetting} mode='Radial' items={items}></SpeedDialComponent>
                        <SpeedDialComponent openIconCss='speeddial-icons speeddial-icon-edit' target='#speeddialtarget' title='Middle Center' position='MiddleCenter' radialSettings={radialSetting} mode='Radial' items={items}></SpeedDialComponent>
                        <SpeedDialComponent openIconCss='speeddial-icons speeddial-icon-edit' cssClass="e-warning" target='#speeddialtarget' title='Middle Right' position='MiddleRight' radialSettings={radialSetting} mode='Radial' items={items}></SpeedDialComponent>
                        <SpeedDialComponent openIconCss='speeddial-icons speeddial-icon-edit' cssClass="e-success" target='#speeddialtarget' title='Bottom Left' position='BottomLeft' radialSettings={radialSetting1} mode='Radial' items={items}></SpeedDialComponent>
                        <SpeedDialComponent openIconCss='speeddial-icons speeddial-icon-edit' cssClass="e-warning" target='#speeddialtarget' title='Bottom Center' position='BottomCenter' radialSettings={radialSetting} mode='Radial' items={items}></SpeedDialComponent>
                        <SpeedDialComponent openIconCss='speeddial-icons speeddial-icon-edit' cssClass="e-success" target='#speeddialtarget' title='Bottom Right' position='BottomRight' radialSettings={radialSetting1} mode='Radial' items={items}></SpeedDialComponent>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates the radial menu display mode of action items in the Speed Dial component. Click the speed dial button to open action items like the radial menu.
                </p>
            </div>
            <div id="description">
                <p>
                    The default display mode is linear. The display mode of the Speed Dial component can be changed using the <code>mode</code> property to <code>Radial</code>. Radial display of action items can be customized using the below properties of <code>radialSettings</code>.
                    <ul>
                        <li><code>offSet</code>: Specify the position of the action items along the offset-path.</li>
                        <li><code>direction</code>: Denote whether to arrange action items in a clock or anti-clockwise direction.</li>
                        <li><code>startAngle</code> and <code>endAngle</code>: Specify the start and end angles in radial direction. By default, angle is calculated based on the <code>position</code>property.</li>
                    </ul>
                </p>
            </div>
        </div>
    )
}
export default Radial;
