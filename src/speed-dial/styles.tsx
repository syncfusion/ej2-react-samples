import * as React from 'react';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { SpeedDialComponent, SpeedDialItemModel } from '@syncfusion/ej2-react-buttons';
import { SampleBase } from '../common/sample-base';
import './styles.css';

export class Styles extends SampleBase<{}, {}> {

    public items: SpeedDialItemModel[] = [
        {
            text:'Home',
            iconCss:'speeddial-icons speeddial-icon-house'
        },
        {
            text:'Contacts',
            iconCss:'speeddial-icons speeddial-icon-people'
        },
        {
            text:'Search',
            iconCss:'speeddial-icons speeddial-icon-search'
        },
        {
            text:'Message',
            iconCss:'speeddial-icons speeddial-icon-message'
        }
    ];
    public itemLabel: SpeedDialItemModel[] = [
        {
            text: 'Home'
        },
        {
            text: 'Contacts'
        },
        {
            text: 'Search'
        },
        {
            text: 'Message'
        }
    ];
    public tooltItem: SpeedDialItemModel[] = [
        {
            title: 'Home',
            iconCss: 'speeddial-icons speeddial-icon-house'
        },
        {
            title: 'Contacts',
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

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div id="speed-dial-wrapper">
                        <TooltipComponent id="details" target=".tooltip-speeddial .e-speeddial-li" position="LeftCenter"></TooltipComponent>
                        <div id="speeddialtarget" className="speeddial-appearence-target  custom-index">
                            <SpeedDialComponent id="speeddial1" content="Edit" target="#speeddialtarget" position="BottomCenter" openIconCss="speeddial-icons speeddial-icon-edit" iconPosition="Left" items={this.items}></SpeedDialComponent>
                            <SpeedDialComponent id="speeddial2" content="Edit" target="#speeddialtarget" position="BottomLeft" items={this.itemLabel}></SpeedDialComponent>
                            <SpeedDialComponent id="speeddial3" title="Edit" target="#speeddialtarget" position="BottomRight" cssClass="tooltip-speeddial" openIconCss="speeddial-icons speeddial-icon-edit" items={this.tooltItem}></SpeedDialComponent>
                        </div>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates the appearance customization of the Speed Dial action items. Click the Speed Dial button to open action items.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In the above example, Speed Dial items appearence customized using <code>text</code> and <code>iconCss</code> properties of <code>SpeedDialItemModel</code>.
                    </p>
                </div>
            </div>
        )
    }
}