import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SidebarComponent, SidebarType } from '@syncfusion/ej2-react-navigations';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import './api.css';
export class API extends SampleBase<{}, {}> {
    public sidebarInstance: SidebarComponent;
    public documentClickBtn: ButtonComponent;
    public sidebarTypesBtn: ButtonComponent;
    public backdropBtn: ButtonComponent;
    private listObj: DropDownListComponent;
    private dataTypes: { [key: string]: Object }[] = [
        {  Type: 'Over', value: 'Over' },
        {  Type: 'Push', value: 'Push' },
        {  Type: 'Slide', value: 'Slide' },
        {  Type: 'Auto', value: 'Auto' }
    ];
    private fields: object = { text: 'Type', value: 'value' };
    public showBackdrop: boolean = false;
    public closeOnDocumentClick: boolean = false;
    public waterMark: string = 'Select a Type';
    public height: string = '220px';
    public index: number = 3;
    render() {
        return (
            <div className="control-section">
                <div className="col-lg-12 col-sm-12 col-md-12 center">
                    Click/Touch the button to view the sample
            </div>
                <div className="col-lg-12 col-sm-12 col-md-12 center">
                    <a className="e-btn" id="newTab" onClick={this.newTabClick.bind(this)} target="_blank">Open in new tab</a>
                </div>
                <div id="wrapper">
                    <title>Essential JS 2 for React - Sidebar > API</title>
                    <div className="col-lg-12 col-sm-12 col-md-12" id="sidebar-section">
                        <span id="hamburger" className="e-icons menu" onClick={this.openClick.bind(this)} ></span>
                        <SidebarComponent id="default-sidebar" ref={Sidebar => this.sidebarInstance = Sidebar} >
                            <div className="title-header">
                                <div style={{ display: 'inline-block' }}> Sidebar </div>
                                <span id="close" className="e-icons" onClick={this.closeClick.bind(this)} ></span></div>
                            <div className="sub-title">
                                Place your primary content here.
                                </div>
                        </SidebarComponent>
                        <div className="list-group">
                            <div className="list-group-item">
                                <h2 className="title">Overview</h2><br></br>
                                <p>The Sidebar component is a collapsible side content placed along with the main content either in left or right side of the page.
                                </p>
                                <p></p><br></br>
                                <h3 className="title">Options</h3><br></br>
                                <div className="inline-element responsive">

                                    <p className="inline-element" style={{ width: '70%' }} ><b>Toggle</b> - Toggles the sidebar to be open or closed state.
                                        </p>
                                    <ButtonComponent id="toggleSidebar" className="inline-element right" cssClass='e-info' isToggle onClick={this.toggleSidebar.bind(this)}>Toggle</ButtonComponent>

                                    <br></br><br></br>
                                    <p className="inline-element" style={{ width: '70%' }} ><b>Position</b> - Allows to place the sidebar in right or left side of the page.
                                        </p>
                                    <ButtonComponent id="togglePosition" className="inline-element right" cssClass='e-info' isToggle ref={(scope) => { this.sidebarTypesBtn = scope; }} onClick={this.onTypeChange.bind(this)}>Right</ButtonComponent>

                                    <br></br><br></br>
                                    <p className="inline-element" style={{ width: '70%' }} > <b>Types </b> - Specifies the act of expanding or collapsing the sidebar with main content.</p>
                                    <div className="inline-element  right" style={{ width: '75px' }}>
                                        <DropDownListComponent id="types" className="e-textbox right" dataSource={this.dataTypes} fields={this.fields} ref={(dropdownlist) => { this.listObj = dropdownlist }} popupHeight={this.height} index={this.index} cssClass='right' change={this.onChange.bind(this)}>
                                        </DropDownListComponent>
                                    </div>

                                    <br></br><br></br>
                                    <p className=" inline-element" style={{ width: '70%' }}><b>Closing on document click</b> - Allows to collapse / close the sidebar on document click.</p>
                                    <ButtonComponent id="documentclick" className="inline-element right" cssClass='e-info' isToggle ref={(scope) => { this.documentClickBtn = scope; }} onClick={this.documentclick.bind(this)}>True</ButtonComponent>

                                    <br></br><br></br>

                                    <p className=" inline-element" style={{ width: '70%' }} ><b>Backdrop</b> - Sets the backdrop over the main content area on open / expanded state.</p>
                                    <ButtonComponent id="backdrop" className="inline-element right" cssClass='e-info' isToggle ref={(scope) => { this.backdropBtn = scope; }} onClick={this.backdrop.bind(this)} >True</ButtonComponent>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates the Sidebar component with its features. Click/Touch the button to view the Sidebar sample in a new tab.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this sample allows to configure the <code>type</code>, <code>position</code>, <code>closeOnDocumentClick</code>and
                    <code>showBackdrop</code> property.
                     </p>
                </div>
            </div>
        );
    }

    // open new tab
    newTabClick(): void {
        let URL = location.href.replace(location.search,'');
        document.getElementById('newTab').setAttribute('href', URL.split('#')[0] + 'sidebar/api/index.html');
    }

    toggleSidebar(): void {
        this.sidebarInstance.toggle();
    }

    //close the siebar
    closeClick(): void {
        this.sidebarInstance.hide();
    }

    //open the sidebar
    openClick(): void {
        this.sidebarInstance.show();
    }


    documentclick(): void {
        let proxy: any = this;
        if (proxy.documentClickBtn.element.classList.contains('e-active')) {
            proxy.documentClickBtn.content = 'False';
            //enable the closeOnDocumentClick property
            this.sidebarInstance.closeOnDocumentClick = true;

        } else {
            proxy.documentClickBtn.content = 'True';
            //disable the closeOnDocumentClick property
            this.sidebarInstance.closeOnDocumentClick = false;
        }
    };
    onTypeChange(): void {
        let proxy: any = this;
        if (proxy.sidebarTypesBtn.element.classList.contains('e-active')) {
            proxy.sidebarTypesBtn.content = 'Left';
            this.sidebarInstance.position = 'Right';
            document.getElementById('hamburger').className += " e-rtl";
        } else {
            proxy.sidebarTypesBtn.content = 'Right';
            this.sidebarInstance.position = 'Left';
            document.getElementById('hamburger').classList.remove("e-rtl");
        }
    };
    backdrop(): void {
        let proxy: any = this;
        if (proxy.backdropBtn.element.classList.contains('e-active')) {
            proxy.backdropBtn.content = 'False';
            //enable the backdrop property
            this.sidebarInstance.showBackdrop = true;

        } else {
            proxy.backdropBtn.content = 'True';
            //disable the backdrop property
            this.sidebarInstance.showBackdrop = false;
        }
    };
    onChange(): void {
        let types: any = this.listObj.value;
        this.sidebarInstance.type = types;
    }
}
