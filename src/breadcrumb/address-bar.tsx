import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { BreadcrumbComponent, BreadcrumbItemDirective, BreadcrumbItemsDirective } from '@syncfusion/ej2-react-navigations';
import { MenuComponent, MenuItemModel } from '@syncfusion/ej2-react-navigations';
import { BreadcrumbItemModel, MenuEventArgs } from '@syncfusion/ej2-navigations';
import { ButtonComponent} from '@syncfusion/ej2-react-buttons';
import { SampleBase } from '../common/sample-base';
import './address-bar.css';

export class AddressBar extends SampleBase<{}, {}> {

    public breadcrumbInst: BreadcrumbComponent;

    public btnobj: ButtonComponent;
    
    btnClick(): void {
        this.breadcrumbInst.items = this.initialBreadcrumbItems;
        this.breadcrumbItems = this.initialBreadcrumbItems;
    }

    itemTemplate(data: any): JSX.Element {
        let menuItems: MenuItemModel[] = [{ text: data.text, iconCss: data.iconCss }];
        return (
            <div style={{ display: "flex" }}>
            {data.text != 'LastItem' && <MenuComponent items={menuItems} select={this.selectHandler.bind(this)}></MenuComponent>}
            </div>
            
        );
    }

    selectHandler(args: MenuEventArgs) {
        for (let i: number = 0; i < this.breadcrumbItems.length; i++) {
            if (this.breadcrumbItems[i].text === args.item.text) {
                this.breadcrumbItems = this.breadcrumbItems.slice(0, i + 1);
                this.breadcrumbItems[0].iconCss = 'e-bicons e-' + this.getItems(args.item.text, true)[0].items.type;
                this.breadcrumbInst.items = this.breadcrumbItems;
                break;
            }
        }
        this.breadcrumbInst.items.push({ text: 'LastItem' });
        this.breadcrumbInst.activeItem = 'LastItem';
    }

    subMenuSelectHandler(args: MenuEventArgs) {
        if (!args.element.parentElement.classList.contains('e-menu') && (args.item as any).parentObj.items) {
            let idx: number;
            let subItems: any = (args.item as any).parentObj.items;
            for (let i: number = 0; i < subItems.length; i++) {
                for (let j: number = 0; j < this.breadcrumbItems.length; j++) {
                    if (subItems[i].text === this.breadcrumbItems[j].text) {
                        idx = j;
                        break;
                    }
                }
            }
            if (idx) {
                this.breadcrumbItems = this.breadcrumbItems.slice(0, idx);
            }
            this.breadcrumbItems[0].iconCss = 'e-bicons e-' + (args.item as { type: string }).type;
            if (this.breadcrumbItems[this.breadcrumbItems.length - 1].text === 'LastItem') {
                this.breadcrumbItems.pop();
            }
            this.breadcrumbItems.push({ text: args.item.text });
            this.breadcrumbItems.push({ text: 'LastItem' });
            this.breadcrumbInst.items = this.breadcrumbItems;
        }
    }

    beforeOpen() {
        (this as any).element.classList.add('e-open');
    }

    onClose() {
        (this as any).element.classList.remove('e-open');
    }

    separatorTemplate(data: any): JSX.Element {
        let subMenuItems: MenuItemModel[] = this.getItems(data.previousItem.text);
        return (
            <div style={{ display: "flex" }}>
                {subMenuItems[0].items && data.previousItem.text !== "LastItem" && (<MenuComponent items={subMenuItems} select={this.subMenuSelectHandler.bind(this)} showItemOnClick={true} beforeOpen={this.beforeOpen} onClose={this.onClose}></MenuComponent>)}
            </div>
        );
       
    }

    public breadcrumbItems: BreadcrumbItemModel[] = [
        {
            iconCss: 'e-bicons e-picture'
        },
        {
            text: 'This PC'
        },
        {
            text: 'Local Disk (C:)'
        },
        {
            text: 'Users'
        },
        {
            text: 'Admin'
        },
        {
            text: 'Pictures'
        }
    ];

    public initialBreadcrumbItems: BreadcrumbItemModel[] = [].slice.call(this.breadcrumbItems);

    public items: any = [
        {
            text: 'OneDrive', type: 'onedrive',
            items: [
                { text: 'Documents', type: 'folder' },
                { text: 'Email attachments', type: 'folder' },
                { text: 'Music', type: 'folder' },
                { text: 'Pictures', type: 'folder' }
            ]
        },
        {
            text: 'This PC', type: 'desktop',
            items: [
                { text: 'Desktop', type: 'desktop' },
                {
                    text: 'Documents', type: 'documents', items: [
                        {
                            text: 'IISExpress', type: 'folder', items: [
                                { text: 'config', type: 'folder' }
                            ]
                        },
                        {
                            text: 'Visual Studio 2019', type: 'folder', items: [
                                { text: 'Code Snippets', type: 'folder' },
                                { text: 'Templates', type: 'folder' },
                                { text: 'Visualizers', type: 'folder' }
                            ]
                        }
                    ]
                },
                { text: 'Downloads', type: 'downloads' },
                {
                    text: 'Local Disk (C:)', type: 'folder', items: [
                        {
                            text: 'Microsoft', type: 'folder'
                        },
                        {
                            text: 'Program Files', type: 'folder', items: [
                                {
                                    text: 'Git', type: 'folder', items: [
                                        { text: 'bin', type: 'folder' },
                                        { text: 'cmd', type: 'folder' },
                                        { text: 'dev', type: 'folder' }
                                    ]
                                },
                                {
                                    text: 'Google', type: 'folder', items: [
                                        { text: 'Chrome', type: 'folder' }
                                    ]
                                },
                                {
                                    text: 'Internet Explorer', type: 'folder', items: [
                                        { text: 'en-US', type: 'folder' }
                                    ]
                                }
                            ]
                        },
                        {
                            text: 'Program Files (x86)', type: 'folder', items: [
                                {
                                    text: 'Microsoft', type: 'folder', items: [
                                        { text: 'Edge', type: 'folder' }
                                    ]
                                },
                                { text: 'MSBuild', type: 'folder' },
                                { text: 'Windows Defender', type: 'folder' }
                            ]
                        },
                        {
                            text: 'Users', type: 'folder', items: [
                                {
                                    text: 'Admin', type: 'folder', items: [
                                        { text: 'Desktop', type: 'desktop' },
                                        { text: 'Documents', type: 'documents' },
                                        { text: 'Downloads', type: 'downloads' },
                                        { text: 'Pictures', type: 'picture' }
                                    ]
                                },
                                { text: 'Public', type: 'folder' }
                            ]
                        },
                        {
                            text: 'Windows', type: 'folder', items: [
                                { text: 'Boot', type: 'folder' },
                                {
                                    text: 'System32', type: 'folder', items: [
                                        { text: 'Configuration', type: 'folder' },
                                        { text: 'LogFiles', type: 'folder' }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                { text: 'Local Disk (D:)', type: 'folder' }
            ]
        },
        { text: 'Libraries', type: 'folder' },
        { text: 'Network', type: 'network' },
        { text: 'Recycle Bin', type: 'recyclebin' }
    ];

    getItems(text: string, needParent?: boolean) {
        let mItems: any = [].slice.call(this.items);
        let isBreaked: boolean;
        if (!text) {
            mItems = this.getSubMenuItems(mItems);
        }
        else {
            for (let i: number = 1; i < this.breadcrumbItems.length; i++) {
                for (let j: number = 0; j < mItems.length; j++) {
                    if (mItems[j].text === this.breadcrumbItems[i].text) {
                        if (mItems[j].text === text) {
                            if (needParent) {
                                mItems = mItems[j];
                            } else {
                                mItems = this.getSubMenuItems(mItems[j].items);
                            }
                            isBreaked = true;
                        } else {
                            mItems = mItems[j].items;
                            j = 0;
                        }
                        break;
                    }
                }
                if (isBreaked) {
                    break;
                }
            }
        }
        return [{ items: mItems }];
    }

    getSubMenuItems(mItems: MenuItemModel[]) {
        let subItems: any;
        if (mItems) {
            subItems = [];
            for (let i: number = 0; i < mItems.length; i++) {
                subItems.push({ text: mItems[i].text, type: (mItems[i] as { type: string }).type });
            }
        }
        return subItems;
    }

    render() {
        return (
            <div className='control-pane'>
                <div className="control-section">
                    <div className="content-wrapper breadcrumb-control-wrapper">
                        <div className="row material2">
                            <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12">
                                <h5 style={{ display: "inline-block" }}>File Manager like Breadcrumb</h5>
                                <ButtonComponent cssClass='e-small reset-btn' ref={(scope) => { this.btnobj = scope; }} 
                                    onClick={ this.btnClick.bind(this) }>Reset State</ButtonComponent>
                            </div>
                        </div>
                        <div className="row material2">
                            <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12">
                                <BreadcrumbComponent ref={(breadcrumbObj) => { this.breadcrumbInst = breadcrumbObj }} cssClass="e-addressbar-breadcrumb" itemTemplate={this.itemTemplate.bind(this)} separatorTemplate={this.separatorTemplate.bind(this)}>
                                    <BreadcrumbItemsDirective>
                                        <BreadcrumbItemDirective iconCss="e-bicons e-picture" />
                                        <BreadcrumbItemDirective text="This PC" />
                                        <BreadcrumbItemDirective text="Local Disk (C:)" />
                                        <BreadcrumbItemDirective text="Users" />
                                        <BreadcrumbItemDirective text="Admin" />
                                        <BreadcrumbItemDirective text="Pictures" />
                                    </BreadcrumbItemsDirective >
                                </BreadcrumbComponent>
                            </div>
                        </div>
                    </div>

                </div>
                <div id="action-description">
                <p> This sample demonstrates the address bar functionalities using the <b>Breadcrumb</b> component. Click the
                    right arrow icon to view and navigate to the next level items.</p>
                </div>
                <div id='description'>
                    <p>In the <code>Breadcrumb</code> component, <code>itemTemplate</code> property is used to render <code>Menu</code>
                        as Breadcrumb items.</p>
                    <p>In this demo, we have rendered address of pictures folder in Breadcrumb. And click the
                        right arrow icon to view and navigate to the next level items.</p>
                    <p>More information about Breadcrumb component can be found in this <a target='_blank'
                        href="https://ej2.syncfusion.com/react/documentation/breadcrumb/getting-started/">documentation section</a>.</p>
                </div>
            </div>
        );
    }
}