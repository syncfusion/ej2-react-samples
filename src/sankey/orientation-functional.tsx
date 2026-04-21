/** Orientation sample for Sankey (Functional) */
import * as React from 'react';
import { SankeyComponent, SankeyNodeDirective, SankeyNodesCollectionDirective, SankeyLinkDirective, SankeyLinksCollectionDirective, Inject, SankeyTooltip, SankeyLegend, SankeyHighlight, SankeyNodeModel, SankeyLinkModel, SankeyExport } from '@syncfusion/ej2-react-charts';
import { updateSampleSection } from '../common/sample-base';
import { loadSankeyChartTheme } from './theme-color';
import { Browser } from '@syncfusion/ej2/base';
const SAMPLE_CSS = `
  .control-fluid { padding: 0 !important; }
  #sankey-orientation { text-align: center; }
`;
const nodes: SankeyNodeModel[] = [
        { id: 'Transportation' },
        { id: 'Industry' },
        { id: 'Commercial' },
        { id: 'Residential' },
        { id: 'Agriculture' },
        { id: 'Road (Cars/Trucks)' },
        { id: 'Aviation & Other Transport' },
        { id: 'Direct Emissions' },
        { id: 'Indirect Electricity Use' },
        { id: 'Atmosphere (Gross Emissions)' }
];

const links: SankeyLinkModel[] = [
        { sourceId: 'Transportation', targetId: 'Road (Cars/Trucks)', value: 1482 },
        { sourceId: 'Transportation', targetId: 'Aviation & Other Transport', value: 326 },
        { sourceId: 'Industry', targetId: 'Direct Emissions', value: 1416 },
        { sourceId: 'Industry', targetId: 'Indirect Electricity Use', value: 457 },
        { sourceId: 'Commercial', targetId: 'Indirect Electricity Use', value: 600 },
        { sourceId: 'Residential', targetId: 'Indirect Electricity Use', value: 500 },
        { sourceId: 'Agriculture', targetId: 'Direct Emissions', value: 664 },
        { sourceId: 'Road (Cars/Trucks)', targetId: 'Atmosphere (Gross Emissions)', value: 1482 },
        { sourceId: 'Aviation & Other Transport', targetId: 'Atmosphere (Gross Emissions)', value: 326 },
        { sourceId: 'Direct Emissions', targetId: 'Atmosphere (Gross Emissions)', value: 2080 },
        { sourceId: 'Indirect Electricity Use', targetId: 'Atmosphere (Gross Emissions)', value: 1557 }
];

function Orientation(): JSX.Element {
 
  React.useEffect(() => { updateSampleSection(); }, []);

  const onLoaded = () => {
    const element = document.getElementById('sankey-orientation');
    if (element) element.setAttribute('title', '');
  };

  return (
    <div className="control-pane">
      <style>{SAMPLE_CSS}</style>

      <div className="control-section">
        <SankeyComponent
          id="sankey-orientation"
          width="90%"
          height="650"
          title= {Browser.isDevice ? 'U.S. Greenhouse Gas Emissions' :'U.S. Greenhouse Gas Emissions by Economic Sector (2022)'}
          subTitle= 'Source: EPA 2022 GHG Inventory'
          orientation="Vertical"
          linkStyle={{ opacity: 0.5, curvature: 0.55, colorType: 'Source' }}
          nodeStyle={{ width: 30, padding: 8, opacity: 1 }}
          labelSettings={{ visible:  Browser.isDevice ? false : true }}
          tooltip={{ enable: true, nodeTemplate: '${name}: ${value} MMT CO₂e', linkTemplate: Browser.isDevice ? '${start.name}: ${start.out} MMT CO₂e → <br/> ${target.name}: ${target.in} MMT CO₂e' : '${start.name}: ${start.out} MMT CO₂e → ${target.name}: ${target.in} MMT CO₂e' }}
          legendSettings={ { visible: Browser.isDevice ? false : true, position: 'Right', margin: {left: 100} }}
          load={loadSankeyChartTheme}
          loaded={onLoaded}
        >
          <Inject services={[SankeyTooltip, SankeyLegend, SankeyHighlight, SankeyExport]} />

          <SankeyNodesCollectionDirective>
            {nodes.map((node) => (
              <SankeyNodeDirective key={node.id} id={node.id} color={node.color} />
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
          Explore U.S. greenhouse gas emissions by economic sector (2022) in a vertical Sankey chart measured in MMT CO₂e (million metric tons of CO₂
          equivalent). Trace top‑to‑bottom flows from sectors—Transportation, Industry, Commercial, Residential, and Agriculture—through direct and indirect
          electricity use to total atmospheric emissions.
        </p>
      </div>

      <div id="description">
        <p>
          This vertical Sankey chart visualizes U.S. GHG emissions in MMT CO₂e, showing how sector sources split into road, aviation, direct emissions, and indirect electricity use before reaching total atmospheric emissions.
          Hover or tap nodes and links to see precise MMT CO₂e values and relationships.
        </p>

        <p><strong>Key features:</strong></p>
        <ul>
          <li>Break down emissions by sector and pathway (direct vs. indirect electricity)</li>
          <li>Follow top‑to‑bottom flows to the atmosphere for clear attribution</li>
          <li>Interactive tooltips reveal exact MMT CO₂e values per node and link</li>
        </ul>
      </div>
    </div>
  );
}

export default Orientation;