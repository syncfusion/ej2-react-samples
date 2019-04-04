import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SidebarComponent } from '@syncfusion/ej2-react-navigations';
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import { enableRipple } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import './responsive-panel.css';
export class ResponsivePanel extends SampleBase<{}, {}> {
    public sidebarobj: SidebarComponent;
    public data: { [key: string]: Object }[] = [
        {
            nodeId: '01', nodeText: 'Installation', iconCss: 'icon-microchip icon',
        },
        {
            nodeId: '02', nodeText: 'Deployment', iconCss: 'icon-thumbs-up-alt icon',
        },
        {
            nodeId: '03', nodeText: 'Quick Start', iconCss: 'icon-docs icon',
        },
        {
            nodeId: '04', nodeText: 'Components', iconCss: 'icon-th icon',
            nodeChild: [
                { nodeId: '04-01', nodeText: 'Calendar', iconCss: 'icon-circle-thin icon' },
                { nodeId: '04-02', nodeText: 'DatePicker', iconCss: 'icon-circle-thin icon' },
                { nodeId: '04-03', nodeText: 'DateTimePicker', iconCss: 'icon-circle-thin icon' },
                { nodeId: '04-04', nodeText: 'DateRangePicker', iconCss: 'icon-circle-thin icon' },
                { nodeId: '04-05', nodeText: 'TimePicker', iconCss: 'icon-circle-thin icon' },
                { nodeId: '04-06', nodeText: 'SideBar', iconCss: 'icon-circle-thin icon' }
            ]
        },
        {
            nodeId: '05', nodeText: 'API Reference', iconCss: 'icon-code icon',
            nodeChild: [
                { nodeId: '05-01', nodeText: 'Calendar', iconCss: 'icon-circle-thin icon' },
                { nodeId: '05-02', nodeText: 'DatePicker', iconCss: 'icon-circle-thin icon' },
                { nodeId: '05-03', nodeText: 'DateTimePicker', iconCss: 'icon-circle-thin icon' },
                { nodeId: '05-04', nodeText: 'DateRangePicker', iconCss: 'icon-circle-thin icon' },
                { nodeId: '05-05', nodeText: 'TimePicker', iconCss: 'icon-circle-thin icon' },
                { nodeId: '05-06', nodeText: 'SideBar', iconCss: 'icon-circle-thin icon' }
            ]
        },
        {
            nodeId: '06', nodeText: 'Browser Compatibility', iconCss: 'icon-chrome icon'
        },
        {
            nodeId: '07', nodeText: 'Upgrade Packages', iconCss: 'icon-up-hand icon'
        },
        {
            nodeId: '08', nodeText: 'Release Notes', iconCss: 'icon-bookmark-empty icon'
        },
        {
            nodeId: '09', nodeText: 'FAQ', iconCss: 'icon-help-circled icon'
        },
        {
            nodeId: '10', nodeText: 'License', iconCss: 'icon-doc-text icon'
        }
    ];

    private width: string = '290px';
    private target: string = '.main-content';
	private mediaQuery: string = '(min-width: 600px)';
    private fields: object = { dataSource: this.data, id: 'nodeId', text: 'nodeText', child: 'nodeChild' };
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
                        <div className='main-header' id='header-section'>
                            <ul className='header-list'>
                                <li className='float-left header-style icon-menu' id='hamburger' onClick={this.toggleClick.bind(this)} ref="sidbarToggle"></li>
                                <li className='float-left header-style nav-pane'><b>Navigation Pane</b></li>
                                <li className='header-style float-right support border-left'><b>Support</b></li>
                            </ul>
                        </div>
                        <SidebarComponent id="sidebar-treeview" ref={Sidebar => this.sidebarobj = Sidebar} width={this.width} target={this.target} mediaQuery={this.mediaQuery}>
                            <div className='main-menu'>
                                <div className='table-content'>
                                    <input type='text' placeholder='Search...' className='search-icon'></input>
                                        <p className='main-menu-header'>TABLE OF CONTENTS</p>
                                    </div>
                                    <div>
                                    <TreeViewComponent id='main-treeview' fields={this.fields} expandOn='Click'/>
                                </div>
                            </div>
                        </SidebarComponent>
                        <div className="main-content" id="main-text">
                        <div className='sidebar-content'>
                <h2 className='sidebar-heading'> Responsive Sidebar With Treeview</h2>
                <p className='paragraph-content'> This is a graphical aid for visualising and categorising the site, 
                in the style of an expandable and collapsable treeview component. It auto-expands to display the node(s),
                 if any, corresponding to the currently viewed title, highlighting that node(s) and its ancestors. 
                 Load-on-demand when expanding nodes is available where supported (most graphical browsers), falling 
                 back to a full-page reload. MediaWiki-supported caching, aside from squid, has been considered so 
                 that unnecessary re-downloads of content are avoided where possible. The complete expanded/collapsed 
                 state of the treeview persists across page views in most situations.</p>
                <p className='paragraph-content'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                    dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
                    id est laborum.</p>
                <div className='line'></div>
                <h2 className='sidebar-heading'>Lorem Ipsum Dolor</h2>
                <p className='paragraph-content'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                    dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                <div className='line'></div>
                <h2 className='sidebar-heading'> Lorem Ipsum Dolor</h2>
                <p className='paragraph-content'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
			    <div className='line'></div>
                <h2 className='sidebar-heading'> Lorem Ipsum Dolor</h2>
                <p className='paragraph-content'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
                        </div>
                    </div>
                </div>
                <div id="action-description">
                    <p> Click/Touch the button to view the Sidebar sample in new tab.</p>
                </div>
                <div id="description">
                    <p>This sample demonstrates how to use the TreeView component inside the Sidebar for navigation purposes. The Sidebar expands when the hamburger icon at the top-left corner of the header section is clicked, and TreeView expands and collapses when the TreeView expand/collapse icon is clicked.</p>
                </div>
            </div>
        );
    }

    //open newTab
    newTabClick(): void {
        document.getElementById('newTab').setAttribute('href', location.href.split('#')[0] + 'sidebar/responsive-panel/index.html');
    }

    //toggle the sidebar
    toggleClick(): void {
        this.sidebarobj.toggle();
    }


}
