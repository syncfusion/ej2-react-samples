import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SidebarComponent } from '@syncfusion/ej2-react-navigations';
import { MenuComponent, MenuItemModel } from '@syncfusion/ej2-react-navigations';
import { enableRipple } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import './sidebar-menu.css';
export class SidebarWithMenu extends SampleBase<{}, {}> {
    public sidebarobj: SidebarComponent;
    private mediaQuery: string = '(min-width: 600px)';
    public menuItems: MenuItemModel[] = [
        {
            text: 'Overview',
            iconCss: 'icon-globe icon',
            items: [
                { text: 'All Data' },
                { text: 'Category2' },
                { text: 'Category3' }
            ]
        },
        {
            text: 'Notification',
            iconCss: 'icon-bell-alt icon',
            items: [
                { text: 'Message' },
                { text: 'Facebook' },
                { text: 'Twitter' }
            ]
        },
        {
            text: 'Comments',
            iconCss: 'icon-comment-inv-alt2 icon',
            items: [
                { text: 'Category1' },
                { text: 'Category2' },
                { text: 'Category3' }
            ]
        },
        {
            text: 'Bookmarks',
            iconCss: 'icon-bookmark icon',
            items: [
                { text: 'All Comments' },
                { text: 'Add Comments' },
                { text: 'Delete Comments' }
            ]
        },
        {
            text: 'Images',
            iconCss: 'icon-picture icon',
            items: [
                { text: 'Add Name' },
                { text: 'Add Mobile Number' },
                { text: 'Add Imaage' },
            ]
        },
        {
            text: 'Users ',
            iconCss: 'icon-user icon',
            items: [
                { text: 'Mobile1' },
                { text: 'Mobile2' },
                { text: 'Telephone' }
            ]
        },
        {
            text: 'Settings',
            iconCss: 'icon-eye icon',
            items: [
                { text: 'Change Profile' },
                { text: 'Add Name' },
                { text: 'Add Details' }
            ]
        },
        {
            text: 'Info',
            iconCss: 'icon-tag icon',
            items: [
                { text: 'Facebook' },
                { text: 'Mobile' },
            ]
        }
    ];
    public AccountMenuItem: MenuItemModel[] = [
        {
            text: 'Account',
            items: [
                { text: 'Profile' },
                { text: 'Sign out' },
            ]
        }
    ];
    private enableDock: boolean = true;
    private dockSize: string = '52px';
    private width: string = '220px';
    private target: string = '.main-content';
    render() {
        return (
            <div className="control-section">
                <div className="col-lg-12 col-sm-12 col-md-12 center">
                    Click/Touch the button to view the sample
                 </div>
                <div className="col-lg-12 col-sm-12 col-md-12 center">
                    <a className="e-btn" id="newTab" target="_blank" onClick={this.newTabClick.bind(this)}>Open in new Tab</a>
                </div>
                <div id="wrapper">
                    <title>Essential JS 2 for React - Sidebar > Sidebar with ListView </title>
                    <div className="col-lg-12 col-sm-12 col-md-12">
                        <div className="header-section dock-menu" id="header">
                            <ul className="header-list">
                                <li id="hamburger" className="icon-menu icon list" onClick={this.openClick.bind(this)}></li>
                                <input type="text" placeholder="Search..." className="search-icon list"></input>
                                <li className="right-header list">
                                    <div className="horizontal-menu">
                                        <MenuComponent items={this.AccountMenuItem} cssClass='dock-menu'></MenuComponent>
                                    </div>
                                </li>
                                <li className="right-header list support">Support</li>
                                <li className="right-header list tour">Tour</li>
                            </ul>
                        </div>
                        <SidebarComponent id="sidebar-menu" ref={Sidebar => this.sidebarobj = Sidebar} enableDock={this.enableDock} mediaQuery={this.mediaQuery} dockSize={this.dockSize} width={this.width} target={this.target}>
                            <div className="main-menu">
                                <p className="main-menu-header">MAIN</p>
                                <MenuComponent items={this.menuItems} orientation='Vertical' cssClass='dock-menu'></MenuComponent>
                            </div>
                            <div className="action">
                                <p className="main-menu-header">ACTION</p>
                                <button className="e-btn action-btn" id="action-button">+ Button</button>
                            </div>
                        </SidebarComponent>
                        <div className="main-content" id="maintext">
                            <div className="sidebar-menu-content">
                                <div> Responsive Sidebar with Menu</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="action-description">
                    <p> Click/Touch the button to view the Sidebar sample in new tab.</p>
                </div>
                <div id="description">
                    <p>This sample demonstrates how to use the Menu component inside the Sidebar for navigation purposes. Initially, the Sidebar renders in the dock state with icons, and expands when the hamburger icon at the top-left corner of the header section is clicked.</p>
                </div>
            </div>
        );
    }

    //open newTab
    newTabClick(): void {
        let URL = location.href.replace(location.search,'');
        document.getElementById('newTab').setAttribute('href', URL.split('#')[0] + 'sidebar/sidebar-menu/index.html');
    }
    //open the sidebar
    openClick(): void {
        this.sidebarobj.toggle();
    }


}
