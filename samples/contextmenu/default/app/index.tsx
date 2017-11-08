import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ContextMenuComponent, MenuAnimationSettings, MenuEventArgs, MenuItemModel } from '@syncfusion/ej2-react-navigations';
import { select, Browser } from '@syncfusion/ej2-base';
import { SampleBase } from './sample-base';


export class Default extends SampleBase<{}, {}> {
    public menuObj: ContextMenuComponent;
    public animationSettings: MenuAnimationSettings = {
        effect: Browser.isDevice ? 'ZoomIn' : 'SlideDown'
    };
    public content: string = Browser.isDevice ? 'Touch hold to open the ContextMenu' : 
        'Right click / Touch hold to open the ContextMenu';
    
    //ContextMenu items definition
    public menuItems: MenuItemModel[] = [
        {
            text: 'Cut',
            iconCss: 'e-cm-icons e-cut'
        },
        {
            text: 'Copy',
            iconCss: 'e-cm-icons e-copy'
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
    public addDisabled: any = (args: MenuEventArgs) => {
        if (args.item.text === 'Link') {
            args.element.classList.add('e-disabled');
        }
    }
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div className='contextmenu-section'>
                        <div id='contextmenu-control'>
                            <div id="contextmenutarget">{this.content}</div>
                            <ContextMenuComponent target='#contextmenutarget' items={this.menuItems} animationSettings={this.animationSettings} beforeItemRender={this.addDisabled} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
ReactDOM.render(<Default />, document.getElementById('sample'));