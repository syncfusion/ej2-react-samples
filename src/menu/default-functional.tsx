import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { MenuComponent, MenuItemModel } from '@syncfusion/ej2-react-navigations';
import { updateSampleSection } from '../common/sample-base';
import './default.css';

/**
 * Menu default sample
 */
function Default() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    // Menu items definition
    let menuItems: MenuItemModel[] = [
        {
            text: 'File',
            iconCss: 'em-icons e-file',
            items: [
                { text: 'Open', iconCss: 'em-icons e-open' },
                { text: 'Save', iconCss: 'em-icons e-save' },
                { separator: true },
                { text: 'Exit' }
            ]
        },
        {
            text: 'Edit',
            iconCss: 'em-icons e-edit',
            items: [
                { text: 'Cut', iconCss: 'em-icons e-cut' },
                { text: 'Copy', iconCss: 'em-icons e-copy' },
                { text: 'Paste', iconCss: 'em-icons e-paste' }
            ]
        },
        {
            text: 'View',
            items: [
                {
                    text: 'Toolbars',
                    items: [
                        { text: 'Menu Bar' },
                        { text: 'Bookmarks Toolbar' },
                        { text: 'Customize' },
                    ]
                },
                {
                    text: 'Zoom',
                    items: [
                        { text: 'Zoom In' },
                        { text: 'Zoom Out' },
                        { text: 'Reset' },
                    ]
                },
                { text: 'Full Screen' }
            ]
        },
        {
            text: 'Tools',
            items: [
                { text: 'Spelling & Grammar' },
                { text: 'Customize' },
                { separator: true },
                { text: 'Options' }
            ]
        },
        {
            text: 'Help'
        }
    ];

    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div className='menu-section'>
                    <div className='menu-control'>
                        <MenuComponent items={menuItems}></MenuComponent>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates default functionalities of the <code>menu</code> component. Interact with <code>menu</code> using hover / click action.</p>
            </div>
            <div id="description">
                <p>
                    The menu component is a graphical user interface that serves as navigation header for your application or site. It provides a list of commands that can be carried out using the <code>items</code> property.
                </p>
                <p>
                    In this demo, the menu is rendered with default type of <b>Horizontal</b> orientation. Using <code>orientation</code> property, you can change the orientation to <b>Vertical</b>.
                </p>
                <p>
                    In mobile, the parent menu becomes scrollable if its size exceeds the viewport size.
                </p>
                <p>
                    More information about menu can be found in this
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/menu/getting-started">
                        documentation</a> section.
                </p>
            </div>
        </div>
    )
}
export default Default;