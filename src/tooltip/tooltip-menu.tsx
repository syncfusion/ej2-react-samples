/**
 * Loading tooltip menu sample
 */

import { ListViewComponent } from "@syncfusion/ej2-react-lists";
import { ItemDirective, ItemsDirective, ToolbarComponent } from "@syncfusion/ej2-react-navigations";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { closest } from '@syncfusion/ej2-base';
import * as ReactDOM from 'react-dom';
import * as React from "react";
import { SampleBase } from "../common/sample-base";
import "./tooltip-menu.css";

export class TooltipMenu extends SampleBase<{}, {}> {
    public tooltip: TooltipComponent;
    public list: ListViewComponent;
    public fields: any = { text: "Name", iconCss: "icon" };
    public animationSettings: any = { effect: "None", duration: 0, delay: 0 };
    public listData;
    public data1 = [
        { Name: "WI-FI", id: "1", icon: "wifi" },
        { Name: "Bluetooth", id: "2", icon: "bluetooth" },
        { Name: "SIM cards", id: "3", icon: "sim" }
    ];
    public data2 = [
        { Name: "Display", icon: "display" },
        { Name: "Sound", icon: "sound" },
        { Name: "Battery", icon: "battery" },
        { Name: "Users", icon: "user" }
    ];
    public data3 = [
        { Name: "Location", icon: "location" },
        { Name: "Security", icon: "security" },
        { Name: "Language", icon: "language" }
    ];

    public data: any = [this.data1, this.data2, this.data3];
    public tooltipTemplate(): JSX.Element {
        return (
            <ListViewComponent
                id="tooltipMenu-list"
                dataSource={this.listData}
                fields={this.fields}
                showIcon={true}
            />
        );
    }

    public onClick(args: any): void {
        let targetEle: any;
        if (args) {
            targetEle = closest(args.target, '.e-toolbar-item');
        }
        if (!targetEle) {
            if (document.getElementsByClassName("e-tooltip-wrap").length > 0 && this.tooltip) {
                this.tooltip.close(this.animationSettings);
            }
        }
    }

    public onScroll(): void {
        if (document.getElementsByClassName("e-tooltip-wrap").length > 0 && this.tooltip) {
            this.tooltip.close(this.animationSettings);
        }
    }

    public onBeforeRender(args: any): void {
        let data: any = [{ title: "Wireless & networks" }, { title: "Device" }, { title: "Personal" }];
        for (let i: number = 0; i < data.length; i++) {
            if (data[i].title === args.target.parentElement.getAttribute("title")) {
                if (document.getElementsByClassName("e-tooltip-wrap").length > 0) {
                    this.tooltip.close(this.animationSettings);
                }
                this.listData = this.data[i];
            }
        }
    }

    public created(): void {
        if (document.getElementById("right-pane")) {
            document.getElementById("right-pane").addEventListener("click", this.onClick.bind(this));
            document.getElementById("right-pane").addEventListener("scroll", this.onScroll.bind(this));
        }
    }

    render() {
        return (
            <div className="control-pane">
                <div className="control-section">
                    <div className="col-lg-12 control-section">
                        <TooltipComponent
                            created={this.created.bind(this)}
                            ref={t => (this.tooltip = t)}
                            opensOn="Click"
                            cssClass="e-tooltip-menu-settings"
                            beforeRender={this.onBeforeRender.bind(this)}
                            target="#toolbar-menu button"
                            width={170}
                            tabIndex={0}
                            id="tooltip-menu"
                            content={this.tooltipTemplate.bind(this)}
                        >
                            <div className="toolbarContainer">
                                <ToolbarComponent id="toolbar-menu">
                                    <ItemsDirective>
                                        <ItemDirective
                                            prefixIcon="e-copy-icon tb-icons"
                                            tooltipText="Wireless & networks"
                                            text="Wireless & networks"
                                            overflow="Hide"
                                        />
                                        <ItemDirective
                                            prefixIcon="e-copy-icon tb-icons"
                                            tooltipText="Device"
                                            text="Device"
                                            overflow="Hide"
                                        />
                                        <ItemDirective
                                            prefixIcon="e-copy-icon tb-icons"
                                            tooltipText="Personal"
                                            text="Personal"
                                            overflow="Hide"
                                        />
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
}
