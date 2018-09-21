import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SidebarComponent } from '@syncfusion/ej2-react-navigations';
import { ButtonComponent, RadioButtonComponent } from '@syncfusion/ej2-react-buttons';
import { enableRipple } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import './sidebar-component.css';
export class Default extends SampleBase<{}, {}> {
    public sidebarobj: SidebarComponent;
    render() {
        return (
            <div className="control-section">
                <div className="col-lg-12 col-sm-12 col-md-12 center">
                    Click the button to view the sample
                 </div>
                <div className="col-lg-12 col-sm-12 col-md-12 center">
                    <a className="e-btn" id="newTab" onClick={this.newTabClick.bind(this)} target="_blank">Open in new Tab</a>
                </div>
                <div id="wrapper">
                    <title>Essential JS 2  for React- Sidebar > Default functionalities</title>
                    <div className="col-lg-12 col-sm-12 col-md-12" id="sidebar-section">
                        <span id="hamburger" className="e-icons menu default" onClick={this.openClick.bind(this)} ></span>
                        <SidebarComponent id="default-sidebar" ref={Sidebar => this.sidebarobj = Sidebar} >
                            <div className="title-header">
                                <div style={{ display: 'inline-block' }}> Sidebar </div>
                                <span id="close" className="e-icons" onClick={this.closeClick.bind(this)} ></span></div>
                            <div className="sub-title">
                                Place your primary content here.
                            </div>
                        </SidebarComponent>
                        <div>
                            <div className="title default">Main content</div>
                            <div className="sub-title"> Click the button to open / close the sidebar.
                                <div className="center-align">
                                    <ButtonComponent onClick={this.toggleClick.bind(this)} id="toggle" className="e-btn e-info">Toggle Sidebar</ButtonComponent>
                                </div>
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
                <div id="action-description">
                    <p>
                        Click the button to view the Sidebar sample in new tab.
                </p>
                </div>
                <div id="description">
                    <p>
                        This sample demonstrates the basic <code>Sidebar</code> component. Click the toggle
                    button to expand or collapse the sidebar.
                </p>
                </div>
            </div>
        );
    }
    //open new Tab
    newTabClick(): void {
        document.getElementById('newTab').setAttribute('href', location.href.split('#')[0] + 'sidebar/default/index.html');
    }

    // change the Sidebar position
    positionChange(args: any) {
        this.sidebarobj.position = args.event.target.id == "left" ? "Left" : "Right";
        if (args.event.target.id === "right") {
            document.getElementById('hamburger').className += " e-rtl";
        }
        if (args.event.target.id === "left") {
            document.getElementById('hamburger').classList.remove("e-rtl");
        }
    }

    //open / close the sidebar
    toggleClick(): void {
        this.sidebarobj.toggle();
    }

    //close the sidebar
    closeClick(): void {
        this.sidebarobj.hide();
    }

    //open the sidebar
    openClick(): void {
        this.sidebarobj.show();
    }
}
