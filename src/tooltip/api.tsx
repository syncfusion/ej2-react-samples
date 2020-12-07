/**
 * Loading API sample
 */

import { ButtonComponent, CheckBoxComponent } from "@syncfusion/ej2-react-buttons";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { NumericTextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import * as ReactDOM from 'react-dom';
import * as React from "react";
import { PropertyPane } from "../common/property-pane";
import { SampleBase } from "../common/sample-base";
import "./api.css";

export class ApiTooltip extends SampleBase<{}, {}> {
    public tooltip: TooltipComponent;
    public sticky: CheckBoxComponent;
    public ddl: DropDownListComponent;
    public height: NumericTextBoxComponent;
    public width: NumericTextBoxComponent;
    public text: any;
    public data: string[] = ["Click", "Hover", "Auto"];

    public onClick(args: any): void {
        if (this.tooltip != null) {
        if (!args.target.classList.contains("e-control") && !args.target.classList.contains("e-btn")) {
            if (!this.tooltip.isSticky && document.getElementsByClassName("e-tooltip-wrap").length > 0) {
                this.tooltip.close();
            }
        }
    }
    }

    public onScroll(): void {
        if (this.tooltip != null) {
        if (document.getElementsByClassName("e-tooltip-wrap").length > 0) {
            this.tooltip.close();
        }
    }
    }

    public created(): void {
        if (document.getElementById("right-pane")) {
            document.getElementById("right-pane").addEventListener("click", this.onClick.bind(this));
            document.getElementById("right-pane").addEventListener("scroll", this.onScroll.bind(this));
        }
    }

    public onModeChange(args: any) {
        this.tooltip.close();
        this.tooltip.opensOn = args.value;
    }

    public onHeightChange(args: any): void {
        this.tooltip.close();
        this.tooltip.height = args.value;
        this.tooltip.refresh(this.tooltip.element);
    }

    public onWidthChange(args: any): void {
        this.tooltip.close();
        this.tooltip.width = args.value;
        this.tooltip.refresh(this.tooltip.element);
    }
    public handleKeyPress(args: any): void {
        this.tooltip.close();
        this.tooltip.content = args.currentTarget.value;
    }

    public checkboxChange(args: any) {
        if(this.tooltip != null) {
        this.tooltip.close();
        this.tooltip.isSticky = args.checked;
        }
    }
    render() {
        return (
            <div className="control-pane">
                <div className="control-section">
                    <div className="col-lg-8 control-section">
                        <TooltipComponent
                            created={this.created.bind(this)}
                            id="defaultTooltip"
                            ref={t => (this.tooltip = t)}
                            opensOn="Click"
                            content="Tooltip content"
                        >
                            <ButtonComponent>Show Tooltip</ButtonComponent>
                        </TooltipComponent>
                    </div>

                    <div className="col-lg-4 property-section">
                        <PropertyPane title="Properties">
                            <table id="property" title="Properties">
                                <tbody>
                                    <tr>
                                        <td style={{ width: "50%" }}>
                                            <div className="userselect">Content</div>
                                        </td>
                                        <td style={{ width: "50%", paddingRight: "10px" }}>
                                            <div>
                                                <input
                                                    id="value"
                                                    ref={t => (this.text = t)}
                                                    onKeyUp={this.handleKeyPress.bind(this)}
                                                    type="text"
                                                    className="e-input"
                                                    placeholder="Tooltip content"
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: "50%" }}>
                                            <div className="userselect">Height</div>
                                        </td>
                                        <td style={{ width: "50%", paddingRight: "10px" }}>
                                            <div>
                                                <NumericTextBoxComponent
                                                    id="height"
                                                    ref={t => (this.height = t)}
                                                    value={45}
                                                    change={this.onHeightChange.bind(this)}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: "50%" }}>
                                            <div className="userselect">Width</div>
                                        </td>
                                        <td style={{ width: "50%", paddingRight: "10px" }}>
                                            <div>
                                                <NumericTextBoxComponent
                                                    id="width"
                                                    ref={t => (this.width = t)}
                                                    className="e-input"
                                                    value={100}
                                                    change={this.onWidthChange.bind(this)}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: "50%" }}>
                                            <div className="userselect">Open Mode</div>
                                        </td>
                                        <td style={{ width: "50%", paddingRight: "10px" }}>
                                            <div>
                                                <DropDownListComponent
                                                    dataSource={this.data}
                                                    ref={t => (this.ddl = t)}
                                                    placeholder="Select mode"
                                                    change={this.onModeChange.bind(this)}
                                                    id="ddlelement"
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: "50%" }}>
                                            <div className="userselect">Sticky Mode</div>
                                        </td>
                                        <td style={{ width: "50%", paddingRight: "10px" }}>
                                            <div>
                                                <CheckBoxComponent
                                                    id="sticky"
                                                    ref={t => (this.sticky = t)}
                                                    change={this.checkboxChange.bind(this)}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </PropertyPane>
                    </div>
                </div>

                <div id="action-description">
                    <p>
                        This sample demonstrates how to customize the tooltip component by using its
                        properties from the property pane. Select any combination of properties from the
                        property pane to customize tooltips.
                    </p>
                </div>

                <div id="description">
                    <p>
                        In this demo, the default tooltip is rendered with minimal configuration. This sample
                        can be customized further with the combination of tooltip properties from the property
                        pane. For example,
                    </p>
                    <ul>
                        <li>
                            Any change made to a textbox in the property pane will be reflected in the tooltip
                            <a href="https://ej2.syncfusion.com/documentation/tooltip/api-tooltip.html#content">
                                content
                            </a>
                        </li>
                        <li>
                            <a href="https://ej2.syncfusion.com/documentation/tooltip/api-tooltip.html?lang=typescript#issticky">
                                StickyMode
                            </a>
                            can be enabled by checking the sticky mode option in the property pane.
                        </li>
                        <li>
                            <a href="https://ej2.syncfusion.com/documentation/tooltip/api-tooltip.html?lang=typescript#height">
                                Height
                            </a>
                            and
                            <a href="https://ej2.syncfusion.com/documentation/tooltip/api-tooltip.html?lang=typescript#width">
                                width
                            </a>
                            can be changed from the property pane.
                        </li>
                        <li>
                            <a href="https://ej2.syncfusion.com/documentation/tooltip/api-tooltip.html?lang=typescript#openson">
                                OpenMode
                            </a>
                            can be changed from the property pane.
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
