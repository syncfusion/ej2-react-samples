/** Sample for Sankey (Default) */
import * as React from 'react';
import { SankeyComponent, SankeyNodeDirective, SankeyNodesCollectionDirective, SankeyLinkDirective, SankeyLinksCollectionDirective, Inject, SankeyTooltip, SankeyLegend, SankeyHighlight, SankeyNodeModel, SankeyLinkModel, SankeyExport } from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { loadSankeyChartTheme } from './theme-color';
import { Browser } from '@syncfusion/ej2/base';

export const nodes: SankeyNodeModel[]=  [
        { id: 'Electricity Generation', offset: -120 },
        { id: 'Residential', offset: 38 },
        { id: 'Commercial', offset: 36 },
        { id: 'Industrial', offset: 34 },
        { id: 'Transportation', offset: 32 },
        { id: 'Rejected Energy', offset: -40 },
        { id: 'Energy Services' },
        { id: 'Solar' },
        { id: 'Nuclear' },
        { id: 'Wind' },
        { id: 'Geothermal' },
        { id: 'Natural Gas' },
        { id: 'Coal' },
        { id: 'Biomass' },
        { id: 'Petroleum', offset: -10 }
];
export const links: SankeyLinkModel[]= [
        { sourceId: 'Solar', targetId: 'Electricity Generation', value: 454 },
        { sourceId: 'Nuclear', targetId: 'Electricity Generation', value: 185 },
        { sourceId: 'Wind', targetId: 'Electricity Generation', value: 47.8 },
        { sourceId: 'Geothermal', targetId: 'Electricity Generation', value: 40 },
        { sourceId: 'Natural Gas', targetId: 'Electricity Generation', value: 800 },
        { sourceId: 'Coal', targetId: 'Electricity Generation', value: 28.7 },
        { sourceId: 'Biomass', targetId: 'Electricity Generation', value: 50 },
        { sourceId: 'Electricity Generation', targetId: 'Residential', value: 182 },
        { sourceId: 'Natural Gas', targetId: 'Residential', value: 400 },
        { sourceId: 'Petroleum', targetId: 'Residential', value: 50 },
        { sourceId: 'Electricity Generation', targetId: 'Commercial', value: 351 },
        { sourceId: 'Natural Gas', targetId: 'Commercial', value: 300 },
        { sourceId: 'Electricity Generation', targetId: 'Industrial', value: 641 },
        { sourceId: 'Natural Gas', targetId: 'Industrial', value: 786 },
        { sourceId: 'Biomass', targetId: 'Industrial', value: 563 },
        { sourceId: 'Petroleum', targetId: 'Industrial', value: 300 },
        { sourceId: 'Electricity Generation', targetId: 'Transportation', value: 20 },
        { sourceId: 'Natural Gas', targetId: 'Transportation', value: 51 },
        { sourceId: 'Biomass', targetId: 'Transportation', value: 71 },
        { sourceId: 'Petroleum', targetId: 'Transportation', value: 2486 },
        { sourceId: 'Residential', targetId: 'Rejected Energy', value: 432 },
        { sourceId: 'Commercial', targetId: 'Rejected Energy', value: 351 },
        { sourceId: 'Industrial', targetId: 'Rejected Energy', value: 972 },
        { sourceId: 'Transportation', targetId: 'Rejected Energy', value: 1920 },
        { sourceId: 'Residential', targetId: 'Energy Services', value: 200 },
        { sourceId: 'Commercial', targetId: 'Energy Services', value: 300 },
        { sourceId: 'Industrial', targetId: 'Energy Services', value: 755 },
        { sourceId: 'Transportation', targetId: 'Energy Services', value: 637 }
];
const SAMPLE_CSS = `
  .control-fluid { padding: 0 !important; }
  #sankey-container { text-align: center; }
`;

export class Sankey extends SampleBase<{}, {}> {
    public load = (args): void => {
        loadSankeyChartTheme(args);
    };

    public onLoaded = (): void => {
        const element = document.getElementById('sankey-container');
        if (element) element.setAttribute('title', '');
    };

    render() {
        return (
            <div className="control-pane">
                <style>{SAMPLE_CSS}</style>

                <div className="control-section">
                    <SankeyComponent
                        id="sankey-container"
                        width="90%"
                        height= {Browser.isDevice? "600" : "450" }
                        title= 'California Energy Consumption in 2023'
                        subTitle= 'Source: Lawrence Livermore National Laboratory'
                        linkStyle={{ opacity: 0.6, curvature: 0.55, colorType: 'Source' }}
                        labelSettings={{ visible: Browser.isDevice ? false : true }}
                        tooltip={{ enable: true, nodeTemplate: '${name}: ${value} TBtu', linkTemplate: Browser.isDevice ? '${start.name}: ${start.out} TBtu → <br/> ${target.name}: ${target.in} TBtu' :'${start.name}: ${start.out} TBtu → <br/> ${target.name}: ${target.in} TBtu' }}
                        
                        legendSettings={{ visible: true, position: 'Bottom', itemPadding: 8 }}

                        load={this.load}
                        loaded={this.onLoaded}
                    >
                        <Inject services={[SankeyTooltip, SankeyLegend, SankeyHighlight, SankeyExport]} />
                        <SankeyNodesCollectionDirective>
                            {nodes.map((node) => (
                                <SankeyNodeDirective key={node.id} id={node.id} color={node.color} offset={node.offset} />
                            ))}
                        </SankeyNodesCollectionDirective>
                        <SankeyLinksCollectionDirective>
                            {links.map((link, i) => (
                                <SankeyLinkDirective
                                    key={`${link.sourceId}-${link.targetId}-${i}`}
                                    sourceId={link.sourceId}
                                    targetId={link.targetId}
                                    value={link.value}
                                />
                            ))}
                        </SankeyLinksCollectionDirective>
                    </SankeyComponent>
                </div>
                <div id="action-description">
                    <p>
                        Explore California’s 2023 energy consumption in TBtu (Trillion British Thermal Units) with an interactive Sankey chart based on Lawrence
                        Livermore National Laboratory data. Follow energy flows from generation sources to Residential, Commercial, Industrial, and Transportation sectors,
                        highlighting useful energy services versus rejected energy.
                    </p>
                </div>

                <div id="description">
                    <p>
                        This Sankey chart illustrates energy flow across sources, carriers, and usage sectors,
                        with labeled nodes and interactive tooltips that reveal detailed link and value information.
                    </p>
                    <strong>Key features:</strong>
                    <ul>
                        <li>Configure nodes to represent energy sources and consumption sectors</li>
                        <li>Define links to trace energy flow from generation through end use</li>
                        <li>Enable tooltips for exploring individual flow values and relationships</li>
                        <li>Hover over nodes or links for deeper insight into the energy distribution pattern</li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Sankey;