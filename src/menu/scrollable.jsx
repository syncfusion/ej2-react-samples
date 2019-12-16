import * as React from 'react';
import { MenuComponent } from '@syncfusion/ej2-react-navigations';
import { closest } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import './scrollable.css';
import * as dataSource from './menu-data.json';
/**
 * Scrollable Menu sample
 */
export class Scrollable extends SampleBase {
    constructor() {
        super(...arguments);
        this.data = dataSource;
        // Increased duration for smooth animation
        this.animation = { duration: 800 };
    }
    onBeforeOpen(args) {
        // Restricting sub menu wrapper height
        if (args.parentItem.text === 'Appliances') {
            // Using closest method we are getting the sub menu wrapper element
            closest(args.element, '.e-menu-wrapper').style.height = '320px';
        }
        if (args.parentItem.text === 'Mobile') {
            closest(args.element, '.e-menu-wrapper').style.height = '260px';
        }
    }
    render() {
        return (<div className='control-pane'>
                <div className='control-section'>
                    <div className='menu-section'>
                        <div className='scrollable-menu-control'>
                            <MenuComponent items={this.data.scrollableData} enableScrolling={true} animationSettings={this.animation} cssClass='e-custom-scroll' beforeOpen={this.onBeforeOpen.bind(this)}></MenuComponent>
                        </div>
                    </div>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the <code>Scrollable</code> option in the Menu component. Click the scroll arrows to view the hidden menu items.</p>
                </div>
                <div id="description">
                    <p>
                        The menu component supports horizontal and vertical scrolling to render large menus and submenus in an adaptive way. This can be achieved by enabling the <code>enableScrolling</code> property and by restricting the corresponding menu/submenu size.
                    </p>
                    <p>
                        In this demo, the parent menu is horizontally scrollable while the submenu and nested submenu are vertically scrollable.
                    </p>
                    <p>
                        More information about menu can be found in this
                        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/menu/">
                            documentation</a> section.
                    </p>
                </div>
            </div>);
    }
}
