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
 import { updateSampleSection } from "../common/sample-base";
 import "./api.css";
 
 function ApiTooltip() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let tooltip: TooltipComponent;
    let sticky: CheckBoxComponent;
    let ddl: DropDownListComponent;
    let height: NumericTextBoxComponent;
    let width: NumericTextBoxComponent;
    let text: any;
    let data: string[] = ["Click", "Hover", "Auto"];

    function onClick(args: any): void {
        if (tooltip != null) {
        if (!args.target.classList.contains("e-control") && !args.target.classList.contains("e-btn")) {
            if (!tooltip.isSticky && document.getElementsByClassName("e-tooltip-wrap").length > 0) {
                tooltip.close();
            }
        }
    }
    }

    function onScroll(): void {
        if (tooltip != null) {
        if (document.getElementsByClassName("e-tooltip-wrap").length > 0) {
            tooltip.close();
        }
    }
    }

    function created(): void {
        if (document.getElementById("right-pane")) {
            document.getElementById("right-pane").addEventListener("click", onClick.bind(this));
            document.getElementById("right-pane").addEventListener("scroll", onScroll.bind(this));
        }
    }

    function onModeChange(args: any) {
        tooltip.close();
        tooltip.opensOn = args.value;
    }

    function onHeightChange(args: any): void {
        tooltip.close();
        tooltip.height = args.value;
        tooltip.refresh(tooltip.element);
    }

    function onWidthChange(args: any): void {
        tooltip.close();
        tooltip.width = args.value;
        tooltip.refresh(tooltip.element);
    }
    function handleKeyPress(args: any): void {
        tooltip.close();
        tooltip.content = args.currentTarget.value;
    }

    function checkboxChange(args: any) {
        if(tooltip != null) {
        tooltip.close();
        tooltip.isSticky = args.checked;
        }
    }
    return (
        <div className="control-pane">
            <div className="control-section">
                <div className="col-lg-8 control-section">
                    <TooltipComponent
                        created={created.bind(this)}
                        id="defaultTooltip"
                        ref={t => (tooltip = t)}
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
                                                ref={t => (text = t)}
                                                onKeyUp={handleKeyPress.bind(this)}
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
                                                ref={t => (height = t)}
                                                value={45}
                                                change={onHeightChange.bind(this)}
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
                                                ref={t => (width = t)}
                                                className="e-input"
                                                value={100}
                                                change={onWidthChange.bind(this)}
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
                                                dataSource={data}
                                                ref={t => (ddl = t)}
                                                placeholder="Select mode"
                                                change={onModeChange.bind(this)}
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
                                                ref={t => (sticky = t)}
                                                change={checkboxChange.bind(this)}
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
                        Any change made to a textbox in the property pane will be reflected in the
                        tooltip <a href="https://ej2.syncfusion.com/react/documentation/api/tooltip/#content">content</a>
                    </li>
                    <li>
                        <a href="https://ej2.syncfusion.com/react/documentation/api/tooltip/#issticky">StickyMode</a> can be enabled by
                        checking the sticky mode option in the property pane.
                    </li>
                    <li>
                        <a href="https://ej2.syncfusion.com/react/documentation/api/tooltip/#height">Height</a> and
                        <a href="https://ej2.syncfusion.com/react/documentation/api/tooltip/#width">width</a> can be changed from the property pane.
                    </li>
                    <li>
                        <a href="https://ej2.syncfusion.com/react/documentation/api/tooltip/#openson">OpenMode</a> can be changed from the property pane.
                    </li>
                </ul>
            </div>
        </div>
    );
 }
 export default ApiTooltip;
 