/**
 * Print and Export sample for treemap
 */
import * as React from "react";
import { useEffect, useRef } from "react";
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import {
    TreeMapComponent,
    ExportType,
    Inject,
    TreeMapTooltip,
    ILoadedEventArgs,
    TreeMapTheme,
    Print,
    PdfExport,
    ImageExport,
} from '@syncfusion/ej2-react-treemap';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { PropertyPane } from '../common/property-pane';
import { updateSampleSection } from '../common/sample-base';
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import * as data from './treemap-data/product.json';
let datasource: any = data as any;
const SAMPLE_CSS = `
    #btn-control {
        width: 100%;
        text-align: center;
        text-transform:none !important;
    }
    .e-play-icon::before {
        content: "\\e813";
    }`;
const PrintExport = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    let treemapInstance = useRef<TreeMapComponent>(null);
    let mode = useRef<DropDownListComponent>(null);
    let nameElement = useRef<HTMLInputElement>(null);
    let textElement: TextBoxComponent;
    // Code for Property Panel
    let droplist: { [key: string]: Object }[] = [
        { text: "JPEG", value: "JPEG" },
        { text: "PNG", value: "PNG" },
        { text: "SVG", value: "SVG" },
        { text: "PDF", value: "PDF" },
    ];
    const onClick2 = (e: Event): void => {
        treemapInstance.current.print();
    };
    const onClick1 = (e: Event): void => {
        let fileName: string = textElement.value;
        treemapInstance.current.export(mode.current.value as ExportType, fileName);
    };
    const load = (args: ILoadedEventArgs): void => {
        // custom code start
        let theme: string = location.hash.split("/")[1];
        theme = theme ? theme : "Material";
        args.treemap.theme = (theme.charAt(0).toUpperCase() + theme.slice(1))
            .replace(/-dark/i, "Dark")
            .replace(/contrast/i, "Contrast") as TreeMapTheme;
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
                        allowPrint={true}
                        allowPdfExport={true}
                        allowImageExport={true}
                        ref={treemapInstance}
                        titleSettings={{
                            //To config title for treemap
                            text: "Top 10 best selling smartphone brands - 2017",
                            textStyle: { size: "15px" },
                        }}
                        dataSource={datasource.product}
                        layoutType="SliceAndDiceVertical"
                        weightValuePath="Percentage"
                        rangeColorValuePath="Percentage"
                        tooltipSettings={{
                            // To config tooltip for treemap
                            visible: true,
                            format: "${Product} (+${Percentage}) %",
                        }}
                        leafItemSettings={{
                            // To config leafitem customization for treemap
                            labelPath: "Product",
                            fill: "#6699cc",
                            border: { color: "black", width: 0.5 },
                            labelPosition: "Center",
                            interSectAction: "Hide",
                            labelFormat: "${Product} (+${Percentage}) %",
                            colorMapping: [
                                {
                                    from: 1.3,
                                    to: 22,
                                    color: "#FAB665",
                                    minOpacity: 0.5,
                                    maxOpacity: 1,
                                },
                            ],
                        }}
                    >
                        <Inject
                            services={[TreeMapTooltip, Print, ImageExport, PdfExport]}
                        />
                    </TreeMapComponent>
                    <div style={{ float: "right", marginRight: "10px" }}>
                        Source:
                        <a
                            href=" http://zeenews.india.com/photos/business/worlds-10-best-selling-smartphone-brands-2033958/samsung-2033959"
                            target="_blank"
                        >
                            zeenews.india.com
                        </a>
                    </div>
                </div>
                {/* Property Panel */}
                <div className="col-md-3 property-section">
                    <PropertyPane title="Properties">
                        <table role='none'
                            id="property"
                            title="Properties"
                            className="property-panel-table"
                            style={{
                                width: "100%",
                                marginBottom: "20px",
                                overflow: "hidden",
                            }}
                        >
                         <tbody>
                            <tr>
                                <td>
                                    <div style={{ paddingLeft: "0px" }}>Export Type</div>
                                </td>
                                <td>
                                    <div style={{ paddingLeft: "0px" }}>
                                        <DropDownListComponent
                                            id="mode"
                                            width="100%"
                                            index={0}
                                            placeholder="JPEG"
                                            ref={mode}
                                            dataSource={droplist}
                                            fields={{ text: "text", value: "value" }}
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div style={{ paddingLeft: "0px" }}>File Name</div>
                                </td>
                                <td>
                                    <div
                                        style={{ marginTop: "0px", paddingLeft: "0px" }}
                                    >
                                        
                                    <TextBoxComponent className="e-input" value='TreeMap' style={{ width: '100%', padding: "0px", paddingLeft: "5px" }} id="fileName" ref={d => textElement = d}></TextBoxComponent>
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: "60px" }}>
                                <td>
                                    <div id="btn-control">
                                        <ButtonComponent
                                            onClick={onClick1.bind(this)}
                                            style={{ width: "80px" }}
                                            cssClass="e-info"
                                            isPrimary={true}
                                        >
                                            Export
                                        </ButtonComponent>
                                    </div>
                                </td>
                                {/* </tr>
                                 <tr> */}
                                <td>
                                    <div id="btn-control">
                                        <ButtonComponent
                                            onClick={onClick2.bind(this)}
                                            style={{ width: "80px" }}
                                            cssClass="e-info"
                                            isPrimary={true}
                                        >
                                            Print
                                        </ButtonComponent>
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
                    This sample depicts the top 10 best-selling smartphone brands. Print
                    and export options have been enabled in this sample.
                </p>
            </section>
            <section id="description" aria-label="Description of the TreeMap features demonstrated in this sample">
                <p>
                    In this example, you can see how to export and print the rendered
                    treemap. The TreeMap can be exported to JPEG, PNG, SVG, and PDF
                    formats. Print functionality is done by <code>print</code>
                    method when <code>allowPrint</code> is set as true. Export
                    functionality is done by
                    <code>export</code> method when <code>allowImageExport</code> and
                    <code>allowPdfExport</code> is set as true.
                    <br />
                    <br />
                    <b>Injecting Module:</b>
                    <br />
                    <br />
                    To make use of the print and export support, we need to inject the{" "}
                    <code>Print</code> module into the <code> services </code>.
                </p>
                <p>
                    More information on print and export can be found in this{" "}
                    <a
                        target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/treemap/print-and-export"
                    >
                        documentation section
                    </a>
                    .
                </p>
            </section>
        </main>
    );
}
export default PrintExport;