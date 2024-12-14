import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ContextMenuComponent, MenuEventArgs } from '@syncfusion/ej2-react-navigations';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import './template.css';

export class Template extends SampleBase<{}, {}> {
    public menuObj: ContextMenuComponent;
    public content: string = Browser.isDevice ? 'Touch hold to open the ContextMenu' : 
        'Right click/Touch hold to open the ContextMenu';
    public template: string = "<div class='menu-wrapper'><span class='${iconCss} icon-right'></span><div class='text-content'><span class='text'>${answerType}</span><span class='description'>${description}</span></div></div>" ; 
    
    //ContextMenu items definition
    public menuItems: any = [
        {
            answerType: 'Selection',
            description: "Choose from options",
            iconCss: 'e-icons e-list-unordered'
        },
        {
            answerType: 'Yes / No',
            description: "Select Yes or No",
            iconCss: 'e-icons e-check-box',
        },
        {
            answerType: 'Text',
            description: "Type own answer",
            iconCss: 'e-icons e-caption',
            items: [
                {
                    answerType: 'Single line',
                    description: "Type answer in a single line",
                    iconCss: 'e-icons e-text-form'
                },
                {
                    answerType: 'Multiple line',
                    description: "Type answer in multiple line",
                    iconCss: 'e-icons e-text-wrap'
                }
            ]
        },
        {
            answerType: 'None',
            iconCss: 'e-icons e-comment-show',
            description: "No answer required"
        },
    ];

    public addTemplateClass: any = (args: MenuEventArgs) => {
        if (args.element.classList.contains('e-ul')) {
            args.element.classList.add('e-contextMenu-template')
        }
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div className='contextmenu-section'>
                        <div id='contextmenu-control'>
                            <div id="contextmenutarget">{this.content}</div>
                            <ContextMenuComponent className = "e-contextMenu-template" target='#contextmenutarget' items={this.menuItems} itemTemplate={this.template} beforeOpen={this.addTemplateClass} />
                        </div>
                    </div>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the template functionality of the ContextMenu. Right-click or touch and hold the designated rectangular area to open the ContextMenu, which displays customized items using a template.</p>
                </div>
                <div id="description">
                    <p>ContextMenu is a graphical user interface that appears on a right-click or touch-and-hold action. It supports displaying single-level or multi-level menus and allows for customizing the menu items through templates.</p>
                    <p>
                        In this demo, <code><a target="_blank" className="your-class-name" href="https://ej2.syncfusion.com/react/documentation/api/context-menu/#itemTemplate">itemTemplate
                        </a></code> property is used to enable template support for customizing ContextMenu items. Each menu item is customized using a template to include icons, descriptive text, and additional content, offering a flexible and user-friendly interface.
                    </p>
                    <p>
                        In mobile, the sub menu opens in a single layer with option for switching back to parent menu.
                    </p>
                    <p>
                        More information about ContextMenu can be found in this <a target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/context-menu/getting-started">
                        documentation section</a>.
                    </p>
                </div>
            </div>
        )
    }
}
