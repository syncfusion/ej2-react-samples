import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SidebarComponent } from '@syncfusion/ej2-react-navigations';
import { ButtonComponent, RadioButtonComponent } from '@syncfusion/ej2-react-buttons';
import { ListViewComponent, SelectEventArgs } from '@syncfusion/ej2-react-lists';
import { enableRipple } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import './sidebardock-component.css';
export class Dock extends SampleBase<{}, {}> {
    public dockBar: SidebarComponent;
    private enableDock: boolean = true;
    private dockSize: string = '72px';
    private width: string = '220px';
    render() {
        return (
            <div className="control-section">
                <div className="col-lg-12 col-sm-12 col-md-12 center">
                    Click the button to view the sample
               </div>
                <div className="col-lg-12 col-sm-12 col-md-12 center">
                    <a className="e-btn" id="newTab" target="_blank" onClick={this.newTabClick.bind(this)} >Open in new tab</a>
                </div>
                <div className="col-lg-12 col-sm-12 col-md-12">
                    <div id="wrapper">
                        <title>Essential JS 2 for React - Sidebar > Dock</title>
                        <SidebarComponent id="dockSidebar" ref={Sidebar => this.dockBar = Sidebar} enableDock={this.enableDock} dockSize={this.dockSize} width={this.width} >
                            <div className="dock">
                                <ul>
                                    <li className="sidebar-item" id="toggle" onClick={this.toggleClick.bind(this)} >
                                        <span className="e-icons expand"></span>
                                        <span className="e-text" title="menu">Menu</span>
                                    </li>
                                    <li className="sidebar-item">
                                        <span className="e-icons home"></span>
                                        <span className="e-text" title="home">Home</span>
                                    </li>
                                    <li className="sidebar-item">
                                        <span className="e-icons profile"></span>
                                        <span className="e-text" title="profile">Profile</span>
                                    </li>
                                    <li className="sidebar-item">
                                        <span className="e-icons info"></span>
                                        <span className="e-text" title="info">Info</span>
                                    </li>
                                    <li className="sidebar-item">
                                        <span className="e-icons settings"></span>
                                        <span className="e-text" title="settings">Settings</span>
                                    </li>
                                </ul>
                            </div>
                        </SidebarComponent>
                        <div id="main-content container-fluid col-md-12 ">
                            <div className="title">Main content</div>
                            <div className="sub-title">
                                <div className="center-align">
                                    <p>Click the radio button to switch the sidebar position</p>
                                    <div className="column">
                                        <RadioButtonComponent id="left" label="Left" name="state" checked={true} change={this.positionChange.bind(this)} ></RadioButtonComponent>
                                    </div>
                                    <div className="column">
                                        <RadioButtonComponent id="right" label="Right" name="state" change={this.positionChange.bind(this)}></RadioButtonComponent>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="action-description">
                    Click the button to view the Sidebar sample in new tab.
             </div>
                <div id="description">
                    This sample demonstrates the dock state. Here the list item has icon with text representation. On dock state only the icon
                listed out to interact.
            </div>
            </div>
        );
    }

    // open new Tab
    newTabClick(): void {
        document.getElementById('newTab').setAttribute('href', location.href.split('#')[0] + 'samples/sidebar/dock/index.html');
    }
    positionChange(args: any) {
        //RadioButton change event handler
        this.dockBar.position = args.event.target.id == "left" ? "Left" : "Right";
    }
    // open / close the sidebar
    toggleClick() {
        this.dockBar.toggle();
    }
}


