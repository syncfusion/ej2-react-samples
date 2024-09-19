/**
 * Color Mapping sample for treemap
 */
import * as React from "react";
import { useEffect, useRef } from "react";
import { CheckBoxComponent, ChangeEventArgs } from "@syncfusion/ej2-react-buttons";
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { TreeMapComponent, Inject, TreeMapLegend, TreeMapTooltip, TreeMapTheme, ILoadEventArgs } from '@syncfusion/ej2-react-treemap';
import { PropertyPane } from '../common/property-pane';
import { updateSampleSection } from '../common/sample-base';
import * as data from './treemap-data/color.json';
let datasource: any = data as any;
const SAMPLE_CSS = `
    .colorMappingPadding {
        margin-left: -10px;margin-top: -10px;padding-left: 10px;
    }
    .e-view.fluent2-highcontrast #property .colorMappingPadding {
        margin-left: -18px;
    }
    .e-view.fluent2 #property .colorMappingPadding, .e-view.fluent2-dark #property .colorMappingPadding {
        margin-left: -8px;margin-top: -10px;padding-left: 0px;
    }`;
const ColorMapping = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    let treemapInstance = useRef<TreeMapComponent>(null);
    let typeElement = useRef<DropDownListComponent>(null);
    let minOpacityElement = useRef<HTMLInputElement>(null);
    let maxOpacityElement = useRef<HTMLInputElement>(null);
    let opacityElement: CheckBoxComponent;
    // Code for Property Panel
    let dropList: { [key: string]: Object }[] = [
        { text: "Range", value: "RangeColorMapping" },
        { text: "Equal", value: "EqualColorMapping" },
        { text: "Desaturation", value: "DesaturationColorMapping" },
    ];
    const minOpacityChange = () => {
        if (opacityElement.checked && !opacityElement.disabled) {
            let minOpacity: number = parseFloat(minOpacityElement.current.value);
            treemapInstance.current.leafItemSettings.colorMapping[0].minOpacity =
                minOpacity;
            treemapInstance.current.leafItemSettings.colorMapping[1].minOpacity =
                minOpacity;
            treemapInstance.current.refresh();
        }
    };
    const maxOpacityChange = () => {
        if (opacityElement.checked && !opacityElement.disabled) {
            let maxOpacity: number = parseFloat(maxOpacityElement.current.value);
            treemapInstance.current.leafItemSettings.colorMapping[0].maxOpacity =
                maxOpacity;
            treemapInstance.current.leafItemSettings.colorMapping[1].maxOpacity =
                maxOpacity;
            treemapInstance.current.refresh();
        }
    };
    const opacityChange = (args: ChangeEventArgs) => {
        let value: boolean = args.checked;
        let minOpacity: number = parseFloat(
            minOpacityElement.current.value.toString()
        );
        let maxOpacity: number = parseFloat(
            maxOpacityElement.current.value.toString()
        );
        if (value) {
            treemapInstance.current.leafItemSettings.colorMapping[0].minOpacity =
                minOpacity;
            treemapInstance.current.leafItemSettings.colorMapping[0].maxOpacity =
                maxOpacity;
            treemapInstance.current.leafItemSettings.colorMapping[1].minOpacity =
                minOpacity;
            treemapInstance.current.leafItemSettings.colorMapping[1].maxOpacity =
                maxOpacity;
            minOpacityElement.current.disabled = false;
            maxOpacityElement.current.disabled = false;
        } else {
            treemapInstance.current.leafItemSettings.colorMapping[0].minOpacity =
                null;
            treemapInstance.current.leafItemSettings.colorMapping[0].maxOpacity =
                null;
            treemapInstance.current.leafItemSettings.colorMapping[1].minOpacity =
                null;
            treemapInstance.current.leafItemSettings.colorMapping[1].maxOpacity =
                null;
            minOpacityElement.current.disabled = true;
            maxOpacityElement.current.disabled = true;
        }
        treemapInstance.current.refresh();
    };
    const typeChange = () => {
        let value: string = typeElement.current.value.toString();
        if (value === "RangeColorMapping") {
            opacityElement.disabled = true;
            treemapInstance.current.rangeColorValuePath = "Area";
            treemapInstance.current.leafItemSettings.colorMapping[2].minOpacity =
                null;
            treemapInstance.current.leafItemSettings.colorMapping[2].maxOpacity =
                null;
            treemapInstance.current.leafItemSettings.colorMapping[1].minOpacity =
                null;
            treemapInstance.current.leafItemSettings.colorMapping[1].maxOpacity =
                null;
            treemapInstance.current.leafItemSettings.colorMapping[4].minOpacity =
                null;
            treemapInstance.current.leafItemSettings.colorMapping[4].maxOpacity =
                null;
            treemapInstance.current.leafItemSettings.colorMapping[3].minOpacity =
                null;
            treemapInstance.current.leafItemSettings.colorMapping[3].maxOpacity =
                null;
            treemapInstance.current.leafItemSettings.colorMapping[5].minOpacity =
                null;
            treemapInstance.current.leafItemSettings.colorMapping[5].maxOpacity =
                null;
            treemapInstance.current.leafItemSettings.colorMapping[0].from = 100000;
            treemapInstance.current.leafItemSettings.colorMapping[0].to = 250000;
            treemapInstance.current.leafItemSettings.colorMapping[0].value = null;
            treemapInstance.current.leafItemSettings.colorMapping[0].minOpacity =
                null;
            treemapInstance.current.leafItemSettings.colorMapping[0].maxOpacity =
                null;
            treemapInstance.current.leafItemSettings.colorMapping[1].value = null;
            treemapInstance.current.leafItemSettings.colorMapping[2].value = null;
            treemapInstance.current.leafItemSettings.colorMapping[0].label =
                "0.1M - 0.25M";
            treemapInstance.current.leafItemSettings.colorMapping[0].color =
                "#547C84";
            treemapInstance.current.leafItemSettings.colorMapping[1].from = 250000;
            treemapInstance.current.leafItemSettings.colorMapping[1].to = 500000;
            treemapInstance.current.leafItemSettings.colorMapping[1].label =
                "0.25M - 0.50M";
            treemapInstance.current.leafItemSettings.colorMapping[1].color =
                "#37AFAB";
            treemapInstance.current.leafItemSettings.colorMapping[2].from = 500000;
            treemapInstance.current.leafItemSettings.colorMapping[2].to = 750000;
            treemapInstance.current.leafItemSettings.colorMapping[2].label =
                "0.5M - 0.75M";
            treemapInstance.current.leafItemSettings.colorMapping[2].color =
                "#A4D6AD";
            treemapInstance.current.leafItemSettings.colorMapping[2].value = null;
            treemapInstance.current.leafItemSettings.colorMapping[3].from = 750000;
            treemapInstance.current.leafItemSettings.colorMapping[3].to = 2200000;
            treemapInstance.current.leafItemSettings.colorMapping[3].label =
                "0.75M - 2M";
            treemapInstance.current.leafItemSettings.colorMapping[3].color =
                "#DEEBAE";
            treemapInstance.current.leafItemSettings.colorMapping[4].from = null;
            treemapInstance.current.leafItemSettings.colorMapping[3].value = null;
            treemapInstance.current.leafItemSettings.colorMapping[4].to = null;
            treemapInstance.current.leafItemSettings.colorMapping[4].label = null;
            treemapInstance.current.leafItemSettings.colorMapping[4].value = null;
            treemapInstance.current.leafItemSettings.colorMapping[4].color = null;
            treemapInstance.current.leafItemSettings.colorMapping[5].to = null;
            treemapInstance.current.leafItemSettings.colorMapping[5].label = null;
            treemapInstance.current.leafItemSettings.colorMapping[5].value = null;
            treemapInstance.current.leafItemSettings.colorMapping[5].color = null;
            treemapInstance.current.leafItemSettings.colorMapping[5].from = null;
            treemapInstance.current.legendSettings.title.text = "Area";
            treemapInstance.current.refresh();
        } else if (value === "EqualColorMapping") {
            opacityElement.disabled = true;
            treemapInstance.current.rangeColorValuePath = null;
            treemapInstance.current.leafItemSettings.colorMapping[0].from = null;
            treemapInstance.current.leafItemSettings.colorMapping[0].to = null;
            treemapInstance.current.leafItemSettings.colorMapping[0].label = null;
            treemapInstance.current.leafItemSettings.colorMapping[1].label = null;
            treemapInstance.current.leafItemSettings.colorMapping[2].label = null;
            treemapInstance.current.leafItemSettings.colorMapping[3].label = null;
            treemapInstance.current.leafItemSettings.colorMapping[4].label = null;
            treemapInstance.current.leafItemSettings.colorMapping[0].value =
                "North America";
            treemapInstance.current.leafItemSettings.colorMapping[0].color =
                "#DEEBAE";
            treemapInstance.current.leafItemSettings.colorMapping[1].from = null;
            treemapInstance.current.leafItemSettings.colorMapping[1].to = null;
            treemapInstance.current.leafItemSettings.colorMapping[1].value =
                "Oceania";
            treemapInstance.current.leafItemSettings.colorMapping[1].color =
                "#A4D6AD";
            treemapInstance.current.leafItemSettings.colorMapping[2].from = null;
            treemapInstance.current.leafItemSettings.colorMapping[2].to = null;
            treemapInstance.current.leafItemSettings.colorMapping[2].value = "Asia";
            treemapInstance.current.leafItemSettings.colorMapping[2].color =
                "#37AFAB";
            treemapInstance.current.leafItemSettings.colorMapping[3].from = null;
            treemapInstance.current.leafItemSettings.colorMapping[3].to = null;
            treemapInstance.current.leafItemSettings.colorMapping[3].value = "Africa";
            treemapInstance.current.leafItemSettings.colorMapping[3].color =
                "#547C84";
            treemapInstance.current.leafItemSettings.colorMapping[4].from = null;
            treemapInstance.current.leafItemSettings.colorMapping[4].to = null;
            treemapInstance.current.leafItemSettings.colorMapping[4].value = "Europe";
            treemapInstance.current.leafItemSettings.colorMapping[4].color =
                "#CEBF93";
            treemapInstance.current.leafItemSettings.colorMapping[0].minOpacity =
                null;
            treemapInstance.current.leafItemSettings.colorMapping[0].maxOpacity =
                null;
            treemapInstance.current.leafItemSettings.colorMapping[1].minOpacity =
                null;
            treemapInstance.current.leafItemSettings.colorMapping[1].maxOpacity =
                null;
            treemapInstance.current.leafItemSettings.colorMapping[2].minOpacity =
                null;
            treemapInstance.current.leafItemSettings.colorMapping[2].maxOpacity =
                null;
            treemapInstance.current.leafItemSettings.colorMapping[3].minOpacity =
                null;
            treemapInstance.current.leafItemSettings.colorMapping[3].maxOpacity =
                null;
            treemapInstance.current.leafItemSettings.colorMapping[4].minOpacity =
                null;
            treemapInstance.current.leafItemSettings.colorMapping[4].maxOpacity =
                null;
            treemapInstance.current.equalColorValuePath = "Location";
            treemapInstance.current.legendSettings.title.text = "Continent";
            treemapInstance.current.refresh();
        } else if (value === "DesaturationColorMapping") {
            opacityElement.disabled = false;
            treemapInstance.current.rangeColorValuePath = "Area";
            treemapInstance.current.equalColorValuePath = null;
            let minOpacity: HTMLInputElement = document.getElementById(
                "minOpacity"
            ) as HTMLInputElement;
            let maxOpacity: HTMLInputElement = document.getElementById(
                "maxOpacity"
            ) as HTMLInputElement;
            treemapInstance.current.leafItemSettings.colorMapping[2].from = null;
            treemapInstance.current.leafItemSettings.colorMapping[2].to = null;
            treemapInstance.current.leafItemSettings.colorMapping[1].from = null;
            treemapInstance.current.leafItemSettings.colorMapping[1].to = null;
            treemapInstance.current.leafItemSettings.colorMapping[1].label = null;
            treemapInstance.current.leafItemSettings.colorMapping[3].from = null;
            treemapInstance.current.leafItemSettings.colorMapping[3].to = null;
            treemapInstance.current.leafItemSettings.colorMapping[0].from = 100000;
            treemapInstance.current.leafItemSettings.colorMapping[0].to = 2230800;
            treemapInstance.current.leafItemSettings.colorMapping[0].label =
                "0.1M - 2M";
            treemapInstance.current.leafItemSettings.colorMapping[0].value = null;
            treemapInstance.current.leafItemSettings.colorMapping[1].value = null;
            treemapInstance.current.leafItemSettings.colorMapping[2].value = null;
            treemapInstance.current.leafItemSettings.colorMapping[3].value = null;
            treemapInstance.current.leafItemSettings.colorMapping[2].color = null;
            treemapInstance.current.leafItemSettings.colorMapping[1].color = null;
            treemapInstance.current.leafItemSettings.colorMapping[3].color = null;
            treemapInstance.current.leafItemSettings.colorMapping[0].color = [
                "#F0D6AD",
                "#19547B",
            ];
            if (opacityElement.checked) {
                treemapInstance.current.leafItemSettings.colorMapping[0].minOpacity =
                    parseFloat(minOpacity.value);
                treemapInstance.current.leafItemSettings.colorMapping[0].maxOpacity =
                    parseFloat(maxOpacity.value);
            } else {
                treemapInstance.current.leafItemSettings.colorMapping[0].minOpacity =
                    null;
                treemapInstance.current.leafItemSettings.colorMapping[0].maxOpacity =
                    null;
            }
            treemapInstance.current.legendSettings.title.text = "Area";
            treemapInstance.current.refresh();
        }
    };
    const load = (args: ILoadEventArgs): void => {
        // custom code start
        let theme: string = location.hash.split("/")[1];
        theme = theme ? theme : "Material";
        args.treemap.theme = (theme.charAt(0).toUpperCase() + theme.slice(1))
            .replace(/-dark/i, "Dark")
            .replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5') as TreeMapTheme;
        let sliderMin: HTMLInputElement = document.getElementById(
            "hideOne"
        ) as HTMLInputElement;
        let sliderMax: HTMLInputElement = document.getElementById(
            "hideTwo"
        ) as HTMLInputElement;
        let opacityCheck: HTMLInputElement = document.getElementById(
            "hideThree"
        ) as HTMLInputElement;
        let dropListValue: HTMLInputElement = document.getElementById(
            "Type"
        ) as HTMLInputElement;
        let opacityChecked: HTMLInputElement = document.getElementById(
            "opacity"
        ) as HTMLInputElement;
        if (dropListValue.value === "Desaturation") {
            sliderMin.style.visibility = "visible";
            if (opacityChecked.checked) {
                sliderMax.style.visibility = "visible";
                opacityCheck.style.visibility = "visible";
            } else {
                sliderMax.style.visibility = "hidden";
                opacityCheck.style.visibility = "hidden";
            }
        } else {
            sliderMin.style.visibility = "hidden";
            sliderMax.style.visibility = "hidden";
            opacityCheck.style.visibility = "hidden";
        }
        // custom code end
    };
    return (
        <main><div className="control-pane">
            <style>{SAMPLE_CSS}</style>
            <div className="control-section">
                <div className="col-md-9">
                    <TreeMapComponent
                        load={load.bind(this)}
                        id="treemap-container"
                        ref={treemapInstance}
                        titleSettings={{
                            //To config title for treemap
                            text: "Top 10 largest islands in the World",
                            textStyle: { size: "15px" },
                        }}
                        format={"n"}
                        useGroupingSeparator={true}
                        rangeColorValuePath="Area"
                        dataSource={datasource.color}
                        legendSettings={{
                            // To config legend for treemap
                            visible: true,
                            position: "Bottom",
                            mode: "Interactive",
                            height: "10",
                            title: {
                                text: "Area",
                            },
                        }}
                        tooltipSettings={{
                            // To config tooltip for treemap
                            visible: true,
                            format:
                                "Name: ${Name}<br>Area: ${Area} per square kms<br>Continent: ${Location}",
                            opacity: 0.8,
                        }}
                        weightValuePath="Area"
                        leafItemSettings={{
                            // To config leafitem customization for treemap
                            labelPath: "Name",
                            border: { color: "white", width: 0.5 },
                            colorMapping: [
                                {
                                    from: 100000,
                                    to: 250000,
                                    label: "0.1M - 0.25M",
                                    color: "#547C84",
                                },
                                {
                                    from: 250000,
                                    to: 550000,
                                    label: "0.25M - 0.55M",
                                    color: "#37AFAB",
                                },
                                {
                                    from: 550000,
                                    to: 750000,
                                    label: "0.55M - 0.75M",
                                    color: "#A4D6AD",
                                },
                                {
                                    from: 750000,
                                    to: 2250000,
                                    label: "0.75M - 2M",
                                    color: "#DEEBAE",
                                },
                                { to: null, from: null, color: "null" },
                                { to: null, from: null, color: "null" },
                            ],
                        }}
                    >
                        <Inject services={[TreeMapLegend, TreeMapTooltip]} />
                    </TreeMapComponent>
                </div>
                {/* Property Panel */}
                <div className="col-md-3 property-section">
                    <PropertyPane title="Properties">
                        <table role="none"
                            id="property"
                            title="Properties"
                            className="property-panel-table"
                            style={{ width: "100%", marginBottom: "20px" }}
                        >
                          <tbody>
                            <tr>
                                <td>
                                    <div style={{ paddingLeft: "0px" }}>Color Mapping Type</div>
                                </td>
                                <td>
                                    <div>
                                        <DropDownListComponent
                                            id="Type"
                                            width="100%"
                                            index={0}
                                            change={typeChange.bind(this)}
                                            ref={typeElement}
                                            dataSource={dropList}
                                            fields={{ text: "text", value: "value" }}
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr id="hideOne" style={{ height: "50px" }}>
                                <td>
                                    <div style={{ paddingLeft: "0px" }}>Change Opacity</div>
                                </td>
                                <td>
                                    <div className="colorMappingPadding">
                                        <CheckBoxComponent
                                            id="opacity"
                                            checked={false}
                                            change={opacityChange.bind(this)}
                                            ref={(d) => (opacityElement = d)}
                                            disabled={true}
                                            style={{ paddingLeft: "0px" }}
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr id="hideTwo" style={{ height: "50px" }}>
                                <td>
                                    <div style={{ paddingLeft: "0px" }}>Min Opacity</div>
                                </td>
                                <td>
                                    <div>
                                        <input
                                            type="range"
                                            id="minOpacity"
                                            disabled
                                            onChange={minOpacityChange.bind(this)}
                                            ref={minOpacityElement}
                                            min="0"
                                            max="1"
                                            step="0.1"
                                            defaultValue="0.5"
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr id="hideThree" style={{ height: "50px" }}>
                                <td>
                                    <div style={{ paddingLeft: "0px" }}>Max Opacity</div>
                                </td>
                                <td>
                                    <div>
                                        <input
                                            type="range"
                                            id="maxOpacity"
                                            disabled
                                            onChange={maxOpacityChange.bind(this)}
                                            ref={maxOpacityElement}
                                            min="0"
                                            max="1"
                                            step="0.1"
                                            defaultValue="1"
                                        />
                                    </div>
                                </td>
                            </tr>
                          </tbody>
                        </table>
                    </PropertyPane>
                </div>
            </div>
        </div>
            <section id="action-description" aria-label="Description of TreeMap sample">
                <p>
                    This sample visualizes the top 10 largest islands in the world based
                    on area. The color mapping is applied to the items to differentiate
                    them from other items.
                </p>
            </section>
            <section id="description" aria-label="Description of the TreeMap features demonstrated in this sample">
                <p>
                    In this example, you can see how to render a tree map with color
                    mapping. The range color mapping and desaturation color mapping group
                    the shapes based on the area size, whereas the equal color mapping
                    groups the shapes based on the continent value. The legend is enabled
                    in this example to represent each color mapping.
                    <br />
                    <br />
                    The tooltip is enabled in this example. To see the tooltip in action,
                    hover the mouse over an item or tap an item in touch enabled devices.
                </p>
                <br />
                <p className="description-header">Injecting Module</p>
                <p>
                    The TreeMap component features are segregated into individual modules
                    by feature. To use a legend, inject the <code>Legend</code> module
                    using the <code>TreeMap.Inject(TreeMapLegend)</code> method.
                </p>
            </section>
        </main>
    );
}
export default ColorMapping;