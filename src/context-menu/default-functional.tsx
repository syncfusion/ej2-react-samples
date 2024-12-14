import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { ContextMenuComponent, MenuAnimationSettingsModel, MenuEventArgs, MenuItemModel } from '@syncfusion/ej2-react-navigations';
import { Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import './context-menu.css';

const Default = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    
    let animationSettings: MenuAnimationSettingsModel = {
        effect: Browser.isDevice ? 'ZoomIn' : 'SlideDown'
    };
    let content: string = Browser.isDevice ? 'Touch hold to open the ContextMenu' : 'Right click/Touch hold to open the ContextMenu';

    //ContextMenu items definition
    let menuItems: MenuItemModel[] = [
        {
            text: 'Cut',
            iconCss: 'e-cm-icons e-cut'
        },
        {
            text: 'Copy',
            iconCss: 'e-cm-icons e-cm-copy'
        },
        {
            text: 'Paste',
            iconCss: 'e-cm-icons e-paste',
            items: [
                {
                    text: 'Paste Text',
                    iconCss: 'e-cm-icons e-pastetext'
                },
                {
                    text: 'Paste Special',
                    iconCss: 'e-cm-icons e-pastespecial'
                }
            ]
        },
        {
            separator: true
        },
        {
            text: 'Link',
            iconCss: 'e-cm-icons e-link'
        },
        {
            text: 'New Comment',
            iconCss: 'e-cm-icons e-comment'
        }];

    // Event triggers while rendering each menu item where “Link” menu item is disabled
    const addDisabled: any = (args: MenuEventArgs) => {
        if (args.item.text === 'Link') {
            args.element.classList.add('e-disabled');
        }
    }

    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div className='contextmenu-section'>
                    <div id='contextmenu-control'>
                        <div id="contextmenutarget">{content}</div>
                        <ContextMenuComponent target='#contextmenutarget' items={menuItems} cssClass="default-context-menu" animationSettings={animationSettings} beforeItemRender={addDisabled} />
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the default functionalities of the ContextMenu. Right click/Touch hold the rectangular area to open the ContextMenu.</p>
            </div>
            <div id="description">
                <p>ContextMenu is a graphical user interface that appears on the user right click/touch hold action. It has support to provide single level/multiple level of ContextMenu.</p>
                <p>
                    In this demo, <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/context-menu/#target"><code>target</code></a> 
                    property is set as '#contextmenutarget'. Hence, on right clicking the target element, the ContextMenu will open.
                </p>
                <p>In mobile, the sub menu opens in a single layer with option for switching back to parent menu.</p>
                <p>
                    More information about ContextMenu can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/context-menu/getting-started"> documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default Default;
