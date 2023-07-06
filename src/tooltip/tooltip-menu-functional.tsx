/**
 * Loading tooltip menu sample
 */
import * as ReactDOM from "react-dom";
import * as React from "react";
import { useRef, useEffect} from "react";
import { ListViewComponent } from "@syncfusion/ej2-react-lists";
import { ItemDirective, ItemsDirective, ToolbarComponent } from "@syncfusion/ej2-react-navigations";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { closest } from '@syncfusion/ej2-base';
import { updateSampleSection } from "../common/sample-base";
import "./tooltip-menu.css";
 
const TooltipMenu = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    let tooltip = useRef<TooltipComponent>(null);
    let fields: any = { text: "Name", iconCss: "icon" };
    let animationSettings: any = { effect: "None", duration: 0, delay: 0 };
    let listData: any;
    let data1 = [
        { Name: "WI-FI", id: "1", icon: "wifi" },
        { Name: "Bluetooth", id: "2", icon: "bluetooth" },
        { Name: "SIM cards", id: "3", icon: "sim" }
    ];
    let data2 = [
        { Name: "Display", icon: "display" },
        { Name: "Sound", icon: "sound" },
        { Name: "Battery", icon: "battery" },
        { Name: "Users", icon: "user" }
    ];
    let data3 = [
        { Name: "Location", icon: "location" },
        { Name: "Security", icon: "security" },
        { Name: "Language", icon: "language" }
    ];

    let dataSource: any = [data1, data2, data3];
    const tooltipTemplate = () => {
        return (
            <ListViewComponent id="tooltipMenu-list" dataSource={listData} fields={fields} showIcon={true} />
        );
    }

    const onClick = (args: any): void => {
        let targetEle: any;
        if (args) {
            targetEle = closest(args.target, '.e-toolbar-item');
        }
        if (!targetEle) {
            if (document.getElementsByClassName("e-tooltip-wrap").length > 0 && tooltip.current) {
                tooltip.current.close(animationSettings);
            }
        }
    }

    const onScroll = (): void => {
        if (document.getElementsByClassName("e-tooltip-wrap").length > 0 && tooltip.current) {
            tooltip.current.close(animationSettings);
        }
    }

    const onBeforeRender = (args: any): void => {
        let data: any = [{ title: "Wireless & networks" }, { title: "Device" }, { title: "Personal" }];
        for (let i: number = 0; i < data.length; i++) {
            if (data[i].title === args.target.parentElement.getAttribute("title")) {
                if (document.getElementsByClassName("e-tooltip-wrap").length > 0) {
                    tooltip.current.close(animationSettings);
                }
                listData = dataSource[i];
            }
        }
    }

    const created = (): void => {
        if (document.getElementById("right-pane")) {
            document.getElementById("right-pane").addEventListener("click", onClick.bind(this));
            document.getElementById("right-pane").addEventListener("scroll", onScroll.bind(this));
        }
    }
 
    return (
        <div className="control-pane">
            <div className="control-section">
                <div className="col-lg-12 control-section">
                    <TooltipComponent created={created.bind(this)} ref={tooltip} opensOn="Click" cssClass="e-tooltip-menu-settings" beforeRender={onBeforeRender.bind(this)} target="#toolbar-menu button" width={170} tabIndex={0} id="tooltip-menu" content={tooltipTemplate.bind(this)}>
                        <div className="toolbarContainer">
                            <ToolbarComponent id="toolbar-menu">
                                <ItemsDirective>
                                    <ItemDirective prefixIcon="e-copy-icon tb-icons" tooltipText="Wireless & networks" text="Wireless & networks" overflow="Hide" />
                                    <ItemDirective prefixIcon="e-copy-icon tb-icons" tooltipText="Device" text="Device" overflow="Hide" />
                                    <ItemDirective prefixIcon="e-copy-icon tb-icons" tooltipText="Personal" text="Personal" overflow="Hide" />
                                </ItemsDirective>
                            </ToolbarComponent>
                        </div>
                    </TooltipComponent>
                </div>
            </div>
            <div id="action-description">
                <p>In this demo, the Tooltip has been customized to show the list of menu items.</p>
            </div>
            <div id="description">
                <p>
                    Tooltip has been integrated with Listview component to display the Tooltip menu. With 
                    the help of <a href="https://ej2.syncfusion.com/react/documentation/api/tooltip/#beforerender">beforeRender</a> event, 
                    dataSource for ListView changed and its instance assigned 
                    to <a href="https://ej2.syncfusion.com/react/documentation/api/tooltip/#content">content</a> of Tooltip to appear like menu. 
                    On clicking the Toolbar items, the corresponding Tooltip menu will be opened.
                </p>
            </div>
        </div>
    );
 }
 export default TooltipMenu;
