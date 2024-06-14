/**
 * Drilldown sample for treemap
 */
import * as React from "react";
import { useEffect, useRef } from "react";
import {
    TreeMapComponent,
    LevelsDirective,
    LevelDirective,
    Inject,
    TreeMapTooltip,
    TreeMapAjax,
    ILoadedEventArgs,
    TreeMapTheme,
    IDrillStartEventArgs,
    ITreeMapTooltipRenderEventArgs,
    Alignment,
} from '@syncfusion/ej2-react-treemap';
import { updateSampleSection } from '../common/sample-base';
import * as data from './treemap-data/rtl-data.json';
let datasource: any = data as any;
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const RTL = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    let treemapInstance = useRef<TreeMapComponent>(null);
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
                <TreeMapComponent
                    load={load.bind(this)}
                    id="treemap-container"
                    ref={treemapInstance}
                    palette={[
                        "#5B244D",
                        "#6F3953",
                        " #87525A",
                        "#A26F63",
                        "#BA896B",
                        "#D5A574",
                        "#F1C37D",
                    ]}
                    titleSettings={{
                        //To config title for treemap
                        text: "List of countries by unemployment rate",
                        textStyle: { size: "15px" },
                    }}
                    enableDrillDown={true}
                    format={"n"}
                    useGroupingSeparator={true}
                    enableRtl={true}
                    renderDirection="TopRightBottomLeft"
                    dataSource={datasource.rtl}
                    weightValuePath="Size"
                    tooltipSettings={{
                        // To config tooltip for treemap
                        visible: true,
                        format: "${Size} : ${Name}",
                    }}
                    leafItemSettings={{
                        // To config leafitem customization for treemap
                        labelPath: "Name",
                        showLabels: true,
                    }}
                >
                    <Inject services={[TreeMapTooltip]} />
                    <LevelsDirective>
                        <LevelDirective
                            groupPath="Continent"
                            border={{ color: "black", width: 0.5 }}
                            headerAlignment="Far"
                        />
                        <LevelDirective
                            groupPath="Country"
                            border={{ color: "black", width: 0.5 }}
                            headerAlignment="Center"
                        />
                    </LevelsDirective>
                </TreeMapComponent>
            </div>
            <div style={{ float: "right", marginRight: "10px" }}>
                Source:
                <a
                    href="https://www.indexmundi.com/facts/visualizations/treemap#SL.UEM.TOTL.ZS:SL.UEM.TOTL.ZS"
                    target="_blank"
                >
                    www.indexmundi.com
                </a>
            </div>
        </div>
            <section id="action-description" aria-label="Description of TreeMap sample">
                <p>
                    This sample orders the countries based on the unemployment rate, by
                    rendering the TreeMap in right to left (RTL) direction.
                </p>
            </section>
            <section id="description" aria-label="Description of the TreeMap features demonstrated in this sample">
                <p>
                    In this example, you can see how to render a TreeMap from right to
                    left direction. The tooltip is enabled in this example. To see the
                    tooltip in action, hover the mouse over an item or tap an item in
                    touch-enabled devices.
                </p>
            </section>
        </main>
    );
}
export default RTL;