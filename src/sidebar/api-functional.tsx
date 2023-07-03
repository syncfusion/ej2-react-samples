import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { SidebarComponent, SidebarPosition, SidebarType } from '@syncfusion/ej2-react-navigations';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { updateSampleSection } from '../common/sample-base';
import './api.css';
const API = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const [type, setType] = useState<SidebarType>("Auto");
    const [isShowBackdrop, setShowBackdrop] = useState<boolean>(false);
    const [positionContent, setPositionContent] = useState<string>("Left");
    const [position, setPosition] = useState<SidebarPosition>("Left");
    const [documentContent, setDocumentContent] = useState<string>("False");
    const [isCloseOnDocumentClick, setCloseOnDocumentClick] = useState<boolean>(false);
    const [backDropContent, setBackDropContent] = useState<string>("False");
    let sidebarInstance = useRef<SidebarComponent>(null);
    const dataTypes: { [key: string]: Object }[] = [
        {  Type: 'Over', value: 'Over' },
        {  Type: 'Push', value: 'Push' },
        {  Type: 'Slide', value: 'Slide' },
        {  Type: 'Auto', value: 'Auto' }
    ];
    const fields: object = { text: 'Type', value: 'value' };
    let height: string = '220px';
    let index: number = 3;
    const onChange = (args: any) => {
        setType(args.value);
    }
    const toggleBtnClick = () => {
        sidebarInstance.current.toggle();
        if ( backDropContent == "True") {
          setShowBackdrop(true);
        }
    }
    const positionBtnClick = () =>{
        if (positionContent == "Right") {
          setPositionContent("Left");
          setPosition("Left");
        } else {;
          setPositionContent("Right");
          setPosition("Right");
        }
    }
    const docBtnClick = () => {
        if (documentContent == "False") {
          setDocumentContent("True");
          setCloseOnDocumentClick(true);
        } else {
          setDocumentContent("False");
          setCloseOnDocumentClick(false);
        }
    }
    const backBtnClick = () => {
        if (backDropContent == "True") {
          setBackDropContent("False");
          setShowBackdrop(false);
        } else {
          setBackDropContent("True");
          setShowBackdrop(true);
        }
    }
    const sidebarClose = () => {
        sidebarInstance.current.hide();
        if (isShowBackdrop == true) {
           setShowBackdrop(false);
        }
    }

    return (
        <div className="sidebar-api wrapper-container">
            <div id="api-wrapper" className="control-section apimaincontent">
                <div>
                    <div className="list-group">
                        <div className="list-group-item">
                            <span id="apihamburger" className="e-icons menu" onClick={toggleBtnClick.bind(this)}></span>
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
                                <ButtonComponent id="apitogglesidebar" cssClass="e-primary inline-element right" isToggle={true} onClick={toggleBtnClick.bind(this)}>Toggle</ButtonComponent>
                                <br />
                                <br />
                                {/* Sidebar position */}
                                <p className=" inline-element" style={{ width: "70%" }}>
                                    <b>Position</b> - Allows to place the sidebar in right or left side of the page.
                                </p>
                                <ButtonComponent id="positionBtn" cssClass="e-primary inline-element right" isToggle={true} content={positionContent} onClick={positionBtnClick.bind(this)}></ButtonComponent>
                                <br />
                                <br />
                                {/* Sidebar types */}
                                <p className="inline-element" style={{ width: "70%" }}><b>Types </b> - Specifies the act of expanding or collapsing the sidebar with main content.</p>
                                <div className="inline-element right" style={{ width: "80px" }}>
                                    <DropDownListComponent popupHeight={height} cssClass="e-textbox right" index={index} dataSource={dataTypes} fields={fields} change={onChange.bind(this)}></DropDownListComponent>
                                </div>
                                <br />
                                <br />
                                {/* on document click */}
                                <p className=" inline-element" style={{ width: "70%" }}><b>Closing on document click</b> - Allows to collapse / close the sidebar on document click.</p>
                                <ButtonComponent id="documentElement" cssClass="e-primary inline-element right" content={documentContent} isToggle={true} onClick={docBtnClick.bind(this)}></ButtonComponent>
                                <br />
                                <br />
                                {/* showbackdrop option */}
                                <p className=" inline-element" style={{ width: "70%" }}><b>Backdrop</b> - Sets the backdrop over the main content area on open / expanded state. </p>
                                <ButtonComponent id="backDropElement" cssClass="e-primary inline-element right" isToggle={true} content={backDropContent} onClick={backBtnClick.bind(this)}></ButtonComponent>
                                <br />
                                <br />
                            </div>
                        </div>
                    </div>
                </div>
                {/* sidebar element declaration */}
                <SidebarComponent ref={sidebarInstance} closeOnDocumentClick={isCloseOnDocumentClick} showBackdrop={isShowBackdrop} width="220px" target=".apimaincontent" id="apiSidebar" className="default-sidebar" type={type} position={position}>
                    <div className="title-header">
                        <div style={{ display: "inline-block" }}> Sidebar </div>
                        <span id="apiclose" className="e-icons" onClick={sidebarClose.bind(this)}></span>
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
export default API;