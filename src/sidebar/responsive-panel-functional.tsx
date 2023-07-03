import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { SidebarComponent } from '@syncfusion/ej2-react-navigations';
import { TreeViewComponent, ToolbarComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-react-navigations';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { updateSampleSection } from '../common/sample-base';
import './responsive-panel.css';
const ResponsivePanel = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    let sidebarobj = useRef<SidebarComponent>(null);
    let data: { [key: string]: Object }[] = [
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

    const width: string = '290px';
    const target: string = '.main-sidebar-content';
	const mediaQuery: string = '(min-width: 600px)';
    const fields: object = { dataSource: data, id: 'nodeId', text: 'nodeText', child: 'nodeChild', iconCss: "iconCss" };
    let folderEle: string = '<div class= "e-folder"><div class= "e-folder-name">Navigation Pane</div></div>';
    //toggle the sidebar
    const toolbarCliked = (): void => {
        sidebarobj.current.toggle();
    }

    return (
        <div className="control-section" id="responsive-wrapper">                
            <div id="reswrapper">
                {/* header-section  declaration */}
                <div>
                    <ToolbarComponent id="resToolbar" clicked={toolbarCliked.bind(this)}>
                        <ItemsDirective>
                            <ItemDirective prefixIcon="e-tbar-menu-icon tb-icons" tooltipText="Menu"></ItemDirective>
                            <ItemDirective template={folderEle}></ItemDirective>
                        </ItemsDirective>
                    </ToolbarComponent>
                </div>
                {/* end of header-section */}
                <SidebarComponent id="sideTree" className="sidebar-treeview" ref={sidebarobj} width={width} target={target} mediaQuery={mediaQuery} isOpen={true}>
                    <div className='res-main-menu'>
                        <div className="table-content">
                            <TextBoxComponent id="resSearch" placeholder="Search..."></TextBoxComponent>
                            <p className="main-menu-header">TABLE OF CONTENTS</p>
                        </div>
                        <div>
                            <TreeViewComponent id='mainTree' cssClass="main-treeview" fields={fields} expandOn='Click'/>
                        </div>
                    </div>
                </SidebarComponent>
                {/* end of sidebar element */}
                {/* .main-sidebar-content declaration */}
                <div className="main-sidebar-content" id="main-text">
                    <div className="sidebar-content">
                        <div className="sidebar-heading">Responsive Sidebar with Treeview</div>
                        <p className="paragraph-content">
                            This is a graphical aid for visualising and categorising the site, in the style of an expandable and collapsable treeview component.
                            It auto-expands to display the node(s), if any, corresponding to the currently viewed title, highlighting that node(s)
                            and its ancestors. Load-on-demand when expanding nodes is available where supported (most graphical browsers),
                            falling back to a full-page reload. MediaWiki-supported caching, aside from squid, has been considered so that
                            unnecessary re-downloads of content are avoided where possible. The complete expanded/collapsed state of
                            the treeview persists across page views in most situations.
                        </p>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>
                    The <code>Sidebar</code> sample demonstrates how the Sidebar will act in responsive case. Click on the hamburger menu icon to expand/collapse the sidebar.
                </p>
            </div>
            <div id="description">
                <p>
                    The <code>Sidebar</code> will be shown or hidden based on the resolutions of the screen. It will be shown on larger resolution screens and hidden automatically in lower resolution screens.
                </p>
                <p>
                    In this sample, the TreeView component is placed inside the <code>Sidebar</code>.
                </p>
            </div>
        </div>
    );    
}
export default ResponsivePanel;