import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { SidebarComponent } from '@syncfusion/ej2-react-navigations';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import './api.css';
export class API extends SampleBase<{}, {}> {
    public sidebarInstance: SidebarComponent;
    public positionBtn: ButtonComponent;
    public documentBtn: ButtonComponent;
    public backdropBtn: ButtonComponent;
    private dropDownObj: DropDownListComponent;
    private dataTypes: { [key: string]: Object }[] = [
        {  Type: 'Over', value: 'Over' },
        {  Type: 'Push', value: 'Push' },
        {  Type: 'Slide', value: 'Slide' },
        {  Type: 'Auto', value: 'Auto' }
    ];
    private fields: object = { text: 'Type', value: 'value' };
    public showBackdrop: boolean = false;
    public closeOnDocumentClick: boolean = false;
    public height: string = '220px';
    public index: number = 3;
    render() {
        return (
            <div className="sidebar-api wrapper-container">
                <div id="wrapper" className="control-section apimaincontent">
                    <div>
                        <div className="list-group">
                            <div className="list-group-item">
                                <span id="apihamburger" className="e-icons menu" onClick={this.toggleBtnClick.bind(this)}></span>
                                <div className="title">Overview</div>
                                <br />
                                <p> The Sidebar component is a collapsible side content placed along with the main content either in left or right side of the page. </p>
                                <p> <br /> </p>
                                <div className="title">Options</div>
                                <br />
                                <div className="inline-element responsive">
                                    {/* Open or close the sidebar */}
                                    <p className=" inline-element" style={{ width: "70%" }}>
                                        <b>Toggle</b> - Toggles the Sidebar to be open or closed state.
                                    </p>
                                    <ButtonComponent id="apitogglesidebar" cssClass="e-primary inline-element right" isToggle={true} onClick={this.toggleBtnClick.bind(this)}>Toggle</ButtonComponent>
                                    <br />
                                    <br />
                                    {/* Sidebar position */}
                                    <p className=" inline-element" style={{ width: "70%" }}>
                                        <b>Position</b> - Allows to place the sidebar in right or left side of the page.
                                    </p>
                                    <ButtonComponent ref={Button => this.positionBtn = Button} id="positionBtn" cssClass="e-primary inline-element right" isToggle={true} content="Left" onClick={this.positionBtnClick.bind(this)}></ButtonComponent>
                                    <br />
                                    <br />
                                    {/* Sidebar types */}
                                    <p className="inline-element" style={{ width: "70%" }}><b>Types </b> - Specifies the act of expanding or collapsing the sidebar with main content.</p>
                                    <div className="inline-element right" style={{ width: "80px" }}>
                                        <DropDownListComponent ref={DropDownList => this.dropDownObj = DropDownList} popupHeight={this.height} cssClass="e-textbox right" index={this.index} dataSource={this.dataTypes} fields={this.fields} change={this.onChange.bind(this)}>
                                        </DropDownListComponent>
                                    </div>
                                    <br />
                                    <br />
                                    {/* on document click */}
                                    <p className=" inline-element" style={{ width: "70%" }}><b>Closing on document click</b> - Allows to collapse / close the sidebar on document click.</p>
                                    <ButtonComponent ref={Button => this.documentBtn = Button} id="documentElement" cssClass="e-primary inline-element right" content="False" isToggle={true} onClick={this.docBtnClick.bind(this)}></ButtonComponent>
                                    <br />
                                    <br />
                                    {/* showbackdrop option */}
                                    <p className=" inline-element" style={{ width: "70%" }}><b>Backdrop</b> - Sets the backdrop over the main content area on open / expanded state. </p>
                                    <ButtonComponent ref={Button => this.backdropBtn = Button} id="backDropElement" cssClass="e-primary inline-element right" isToggle={true} content="False" onClick={this.backBtnClick.bind(this)}></ButtonComponent>
                                    <br />
                                    <br />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* sidebar element declaration */}
                    <SidebarComponent ref={Sidebar => this.sidebarInstance = Sidebar} closeOnDocumentClick={this.closeOnDocumentClick} showBackdrop={this.showBackdrop} width="220px" target=".apimaincontent" id="apiSidebar" className="default-sidebar">
                        <div className="title-header">
                            <div style={{ display: "inline-block" }}> Sidebar </div>
                            <span id="apiclose" className="e-icons" onClick={this.sidebarClose.bind(this)}></span>
                        </div>
                        <div className="sub-title">
                            The React Sidebar is an expandable and collapsible component that typically acts as a side container to place primary or secondary content alongside the main content. It provides flexible options that can be shown and hidden based on user interactions.
                        </div>
                    </SidebarComponent>
                    <div id="action-description">
                        <p>
                            The Sidebar API sample demonstrates how to customize the Sidebar component by using its properties from the property pane. Select any combination of properties from the property pane to customize the Sidebar. Click on the hamburger menu icon to expand/collapse the sidebar.
                        </p>
                    </div>
                    <div id="description">
                        <p>
                            In this demo, the default Sidebar is rendered with minimal configuration. This sample can be customized further with the combination of Sidebar properties. For example,
                            <ul>
                                <li>The Sidebar can be opened or closed by clicking on the toggle button.</li>
                                <li>The Sidebar position can be changed by clicking on the position button.</li>
                                <li>The Sidebar types can be changed from the Dropdown List.</li>
                                <li>The Sidebar can be collapsed or closed on document click from the provided options.</li>
                                <li>The Sidebar overlay can be enabled or disabled by clicking on the Backdrop button.</li>
                            </ul>
                        </p>
                    </div>
                </div>
            </div>

        );
    }
    onChange() {
        let types: any = this.dropDownObj.value;
        this.sidebarInstance.type = types;
        this.sidebarInstance.dataBind();
    }
    toggleBtnClick() {
        this.sidebarInstance.toggle();
    }
    positionBtnClick() {
        if (this.positionBtn.content == "Right") {
            this.positionBtn.content = "Left";
            this.sidebarInstance.position = "Left";
        } else {
            this.positionBtn.content = "Right";
            this.sidebarInstance.position = "Right";
        }
        this.positionBtn.dataBind();
        this.sidebarInstance.dataBind();
    }
    docBtnClick() {
        if (this.documentBtn.content == "False") {
            this.documentBtn.content = "True";
            this.sidebarInstance.closeOnDocumentClick = true;
        } else {
            this.documentBtn.content = "False";
            this.sidebarInstance.closeOnDocumentClick = false;
        }
        this.sidebarInstance.dataBind();
        this.documentBtn.dataBind();
    }
    backBtnClick() {
        if (this.backdropBtn.content == "True") {
            this.backdropBtn.content = "False";
            this.sidebarInstance.showBackdrop = false;
        } else {
            this.backdropBtn.content = "True";
            this.sidebarInstance.showBackdrop = true;
        }
    }
    sidebarClose() {
        this.sidebarInstance.hide();
    }
}
