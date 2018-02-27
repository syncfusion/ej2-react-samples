import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SidebarComponent } from '@syncfusion/ej2-react-navigations';
import { ListViewComponent, SelectEventArgs } from '@syncfusion/ej2-react-lists';
import { enableRipple } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import './sidebar-list.css';
export class SidebarWithList extends SampleBase<{}, {}> {
    public sidebarobj: SidebarComponent;
    public dataList: { [key: string]: Object }[] = [
        { text: 'Home' },
        { text: 'About' },
        { text: 'Careers' },
        { text: 'FAQs' },
        { text: 'Blog' },
        { text: 'Uses' },
        { text: 'Contact' }
    ];
    public fields: object = { tooltip: 'text' };
    render() {
        return (
            <div className="control-section">
                <div className="col-lg-12 col-sm-12 col-md-12 center">
                    Click the button to view the sample
                 </div>
                <div className="col-lg-12 col-sm-12 col-md-12 center">
                    <a className="e-btn" id="newTab" target="_blank" onClick={this.newTabClick.bind(this)}>Open in new Tab</a>
                </div>
                <div id="wrapper">
                <title>Essential JS 2 for React - Sidebar > Sidebar with ListView </title>
                    <div className="col-lg-12 col-sm-12 col-md-12">
                        <div id="head">
                            <div className="text">Menu</div>
                            <span id="hamburger" className="e-icons menu" onClick={this.openClick.bind(this)} ></span>
                            <div className="header">Header Content</div>
                        </div>
                        <SidebarComponent id="sidebar-menu" ref={Sidebar => this.sidebarobj = Sidebar} type="Over" width="250px">
                            <div id="close" className="e-icons" onClick={this.closeClick.bind(this)}></div>
                            <div className="content-area">
                                <ListViewComponent id="menuList" dataSource={this.dataList} fields={this.fields} select={this.onSelect.bind(this)}>
                                </ListViewComponent>
                            </div>
                        </SidebarComponent>
                        <div>
                            <div className="main content">Application content</div>
                        </div>
                    </div>
                </div>
                <div id="action-description">
                    <p> Click the button to view the Sidebar sample in new tab.</p>
                </div>
                <div id="description">
                    <p>I In this sample, the ListView component is placed inside the Sidebar for navigation.</p>
                </div>
            </div>
        );
    }

    //open newTab
    newTabClick(): void {
        document.getElementById('newTab').setAttribute('href', location.href.split('#')[0] + 'samples/sidebar/sidebar-list/index.html');
    }

    //close the sidebar when list item selected
    onSelect(args:any): void {
        this.sidebarobj.hide();
        document.querySelector('.content').textContent = args.text + ' Page Content';
    }

    //open the sidebar
    openClick(): void {
        this.sidebarobj.show();
    }

    //close the sidebar
    closeClick(): void {
        this.sidebarobj.hide();
    }
}
