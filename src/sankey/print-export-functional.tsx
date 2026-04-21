
/** Print & Export sample for Sankey */
import * as React from 'react';
import {
  SankeyComponent, SankeyNodesCollectionDirective, SankeyNodeDirective,
  SankeyLinksCollectionDirective, SankeyLinkDirective, Inject,
  SankeyTooltip, SankeyLegend, SankeyHighlight, SankeyExport,
  ExportType, SankeyNodeModel, SankeyLinkModel
} from '@syncfusion/ej2-react-charts';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { updateSampleSection } from '../common/sample-base';
import { loadSankeyChartTheme } from './theme-color';
import { Browser } from '@syncfusion/ej2/base';

const SAMPLE_CSS = `
  .control-fluid { padding: 0 !important; }
  #sankey-print-export { text-align: center; }

  .e-export-icon::before { content: '\\e728'; }
  .e-print-icon::before  { content: '\\e75d'; }
  .e-view.tailwind .e-print-icon::before,
  .e-view.tailwind-dark .e-print-icon::before,
  .e-view.tailwind3 .e-print-icon::before,
  .e-view.tailwind3-dark .e-print-icon::before { content: '\\e75d'; }
  .e-view.tailwind3 .e-export-icon::before,
  .e-view.tailwind3-dark .e-export-icon::before { content: '\\e7bf'; }
  .e-view.fluent .e-export-icon::before,
  .e-view.fluent-dark .e-export-icon::before,
  .e-view.fluent2 .e-export-icon::before,
  .e-view.fluent2-dark .e-export-icon::before,
  .e-view.fluent2-highcontrast .e-export-icon::before,
  .e-view.material3 .e-export-icon::before,
  .e-view.material3-dark .e-export-icon::before,
  .e-view.bootstrap5_3 .e-export-icon::before,
  .e-view.bootstrap5_3-dark .e-export-icon::before { content: '\\e72e'; }
  .e-view.fluent .e-print-icon::before,
  .e-view.fluent-dark .e-print-icon::before,
  .e-view.fluent2 .e-print-icon::before,
  .e-view.fluent2-dark .e-print-icon::before,
  .e-view.fluent2-highcontrast .e-print-icon::before,
  .e-view.material3 .e-print-icon::before,
  .e-view.material3-dark .e-print-icon::before,
  .e-view.bootstrap5_3 .e-print-icon::before,
  .e-view.bootstrap5_3-dark .e-print-icon::before { content: '\\e75d'; }

  .chart-toolbar {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    padding: 6px 0;
  }
  .toolbar-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border-radius: 4px;
    font-weight: 600;
    letter-spacing: .3px;
    padding: 6px 14px;
    cursor: pointer;
    border: 1px solid transparent;
    outline: none;
    transition: all 0.2s ease;
  }
  .toolbar-btn--print {
    background-color: #FFFFFF !important;
    color: #000000DE !important;
    border: 1px solid #D1D5DB !important;
  }
  .toolbar-btn--print:hover { background-color: #F3F4F6 !important; }
  .toolbar-btn--print:focus,
  .toolbar-btn--print:focus-visible {
    outline: 2px solid #E3165B;
    outline-offset: 2px;
  }
  .toolbar-btn--export {
    background-color: #E3165B !important;
    color: #FFFFFF !important;
    border: 1px solid #E3165B !important;
  }
  .toolbar-btn--export:hover { background-color: #C4134F !important; }
  .toolbar-btn--export:focus,
  .toolbar-btn--export:focus-visible {
    outline: 2px solid #E3165B;
    outline-offset: 2px;
  }

  .chart-shell {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    width: 100%;
    overflow: hidden;
    border: 1px solid #E5E7EB;
    border-radius: 4px;
  }
  .chart-shell.mobile-panel-open .export-panel {
    flex: 0 0 100% !important;
    width: 100% !important;
    border-left: none !important;
    box-shadow: none !important;
  }
  .chart-host {
    flex: 1 1 auto;
    min-width: 0;
    transition: flex-basis .25s ease-out;
  }

  .export-panel {
    flex: 0 0 0px;
    overflow: hidden;
    background: transparent;
    border-left: 0px solid #E5E7EB;
    transition: flex-basis .25s ease-out, border-left .25s ease-out;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }
  .with-panel .export-panel {
    flex: 0 0 300px;
    border-left: 1px solid #E5E7EB;
    box-shadow: -2px 0 8px rgba(0,0,0,.07);
    overflow: visible;
  }

  .panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px 10px 16px;
    border-bottom: 1px solid #E5E7EB;
    white-space: nowrap;
  }
  .panel-header-left { display: flex; align-items: center; gap: 8px; }
  .panel-header-icon { font-size: 16px; }
  .panel-title { font-size: 15px; font-weight: 600; }
  .panel-close {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 2px 4px;
    color: #6B7280;
    font-size: 16px;
    display: flex;
    align-items: center;
    outline: none;
    transition: all 0.2s ease;
  }
  .panel-close:hover { color: #111827; }
  .panel-close:focus,
  .panel-close:focus-visible {
    outline: 2px solid #E3165B;
    outline-offset: 2px;
  }

  .panel-body {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 16px 16px 0 16px;
    white-space: nowrap;
  }
  .panel-label { font-size: 12px; margin-bottom: 2px; }

  .panel-input {
    width: 100%;
    box-sizing: border-box;
    border: none !important;
    border-bottom: 1px solid #9CA3AF !important;
    border-radius: 0 !important;
    outline: none !important;
    padding: 4px 0 6px 0;
    background: transparent;
    font-size: 14px;
    color: inherit;
  }
  .panel-input:focus { border-bottom: 2px solid #E3165B !important; }

  .export-panel .e-ddl.e-input-group,
  .export-panel .e-ddl.e-input-group.e-control-wrapper {
    border: none !important;
    border-bottom: 1px solid #9CA3AF !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    background: transparent !important;
  }
  .export-panel .e-ddl.e-input-group:focus-within,
  .export-panel .e-ddl.e-input-group.e-control-wrapper:focus-within {
    border-bottom: 2px solid #E3165B !important;
  }
  .export-panel .e-input-group::before,
  .export-panel .e-input-group::after { display: none !important; }

  .panel-footer {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding-top: 20px;
    border-top: 0px !important;
  }
  .panel-action-btn {
    flex: 1;
    background: transparent !important;
    border: none !important;
    font-weight: 600;
    font-size: 15px;
    letter-spacing: .5px;
    padding: 6px 0;
    cursor: pointer;
    border-radius: 0;
    outline: none;
    transition: all 0.2s ease;
  }
  .panel-action-btn:focus,
  .panel-action-btn:focus-visible {
    outline: 2px solid #E3165B;
    outline-offset: 2px;
  }
  .btn-text {
    padding: 0;
    display: inline;
    line-height: 20px; 
  }
  .panel-action-btn--export { color: #E3165B !important; }
  .panel-action-btn--export:hover { color: #C4134F !important; }
  .panel-action-btn--cancel { color: #6B7280 !important; }
  .panel-action-btn--cancel:hover { color: #111827 !important; }
`;

const nodes: SankeyNodeModel[] = [
  { id: 'Books' },
  { id: 'Clothing' },
  { id: 'Electronics' },
  { id: 'Furniture' },
  { id: 'Jewelry' },
  { id: 'Toys' },
  { id: 'Air' },
  { id: 'Ground' },
  { id: 'Sea' },
  { id: 'Asia' },
  { id: 'Europe' },
  { id: 'North America' },
  { id: 'South America' },
  { id: 'Delayed' },
  { id: 'Delivered' },
  { id: 'In Transit' }
];

const links: SankeyLinkModel[] = [
  { sourceId: 'Books', targetId: 'Air', value: 18 },
  { sourceId: 'Books', targetId: 'Ground', value: 12 },
  { sourceId: 'Clothing', targetId: 'Air', value: 25 },
  { sourceId: 'Clothing', targetId: 'Ground', value: 15 },
  { sourceId: 'Clothing', targetId: 'Sea', value: 20 },
  { sourceId: 'Electronics', targetId: 'Air', value: 35 },
  { sourceId: 'Electronics', targetId: 'Ground', value: 22 },
  { sourceId: 'Electronics', targetId: 'Sea', value: 18 },
  { sourceId: 'Furniture', targetId: 'Ground', value: 28 },
  { sourceId: 'Furniture', targetId: 'Sea', value: 25 },
  { sourceId: 'Jewelry', targetId: 'Air', value: 12 },
  { sourceId: 'Jewelry', targetId: 'Ground', value: 8 },
  { sourceId: 'Toys', targetId: 'Ground', value: 15 },
  { sourceId: 'Toys', targetId: 'Sea', value: 22 },
  { sourceId: 'Air', targetId: 'Asia', value: 40 },
  { sourceId: 'Air', targetId: 'Europe', value: 30 },
  { sourceId: 'Air', targetId: 'North America', value: 20 },
  { sourceId: 'Ground', targetId: 'Europe', value: 35 },
  { sourceId: 'Ground', targetId: 'North America', value: 30 },
  { sourceId: 'Ground', targetId: 'South America', value: 15 },
  { sourceId: 'Ground', targetId: 'Asia', value: 20 },
  { sourceId: 'Sea', targetId: 'Asia', value: 25 },
  { sourceId: 'Sea', targetId: 'Europe', value: 15 },
  { sourceId: 'Sea', targetId: 'North America', value: 30 },
  { sourceId: 'Sea', targetId: 'South America', value: 15 },
  { sourceId: 'Asia', targetId: 'Delayed', value: 35 },
  { sourceId: 'Asia', targetId: 'Delivered', value: 40 },
  { sourceId: 'Asia', targetId: 'In Transit', value: 10 },
  { sourceId: 'Europe', targetId: 'Delivered', value: 65 },
  { sourceId: 'Europe', targetId: 'In Transit', value: 15 },
  { sourceId: 'North America', targetId: 'Delivered', value: 50 },
  { sourceId: 'North America', targetId: 'In Transit', value: 30 },
  { sourceId: 'South America', targetId: 'Delayed', value: 10 },
  { sourceId: 'South America', targetId: 'In Transit', value: 20 }
];

function PrintExport(): JSX.Element {
  React.useEffect(() => { updateSampleSection(); }, []);

  const sankeyRef = React.useRef<SankeyComponent>(null);
  const formatRef = React.useRef<DropDownListComponent>(null);
  const chartShellRef = React.useRef<HTMLDivElement>(null);
  const chartHostRef = React.useRef<HTMLDivElement>(null);
  const exportPanelRef = React.useRef<HTMLDivElement>(null);
  const fileNameInputRef = React.useRef<HTMLInputElement>(null);

  const [fileName, setFileName] = React.useState<string>('Sankey'); // default (Capital S)
  const [isPanelOpen, setIsPanelOpen] = React.useState<boolean>(false);

  const originalSvgWidthRef = React.useRef<number | null>(null);
  const resizeObserverRef = React.useRef<ResizeObserver | null>(null);

  const getSankeySvg = React.useCallback((): SVGSVGElement | null => {
    const byId = document.getElementById('sankey-print-export_svg');
    if (byId instanceof SVGSVGElement) return byId;
    const root = sankeyRef.current?.element as HTMLElement | undefined;
    if (root) {
      const inside = root.querySelector('svg');
      if (inside instanceof SVGSVGElement) return inside;
    }

    const bySelector = document.querySelector('svg#sankey-print-export_svg');
    if (bySelector instanceof SVGSVGElement) return bySelector;
    return null;
  }, []);

  const refreshChart = React.useCallback(() => {
    const sankey = sankeyRef.current;
    if (!sankey) return;
    const animation = (sankey as any).animation;
    if (animation) {
      animation.enable = false;
    }
    sankey.refresh?.();
    if (animation) {
      animation.enable = true;
    }
  }, []);

  const handlePanelKeydown = React.useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      setIsPanelOpen(false);
    }
  }, []);

  const resizeSankeySvg = React.useCallback(() => {
    const svg = getSankeySvg();
    const host = chartHostRef.current;
    if (!svg || !host) return;
    
    const newWidth = host.offsetWidth;
    if (!newWidth) return;

    if (originalSvgWidthRef.current == null) {
      const widthAttribute = svg.getAttribute('width');
      originalSvgWidthRef.current = widthAttribute ? parseFloat(widthAttribute) : svg.getBoundingClientRect().width;
    }

    const heightAttribute = svg.getAttribute('height');

    const svgHeight = heightAttribute
      ? Math.max(1, parseFloat(heightAttribute))
      : Math.max(1, svg.getBoundingClientRect().height);

    svg.setAttribute('width', String(newWidth));
    svg.setAttribute('viewBox', `0 0 ${newWidth} ${svgHeight}`);
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    const sankeyHost = document.getElementById('sankey-print-export') as HTMLElement | null;
    if (sankeyHost) sankeyHost.style.width = `${newWidth}px`;
  }, [getSankeySvg]);

  const onLoaded = React.useCallback(() => {
    const element = document.getElementById('sankey-print-export');
    if (element) element.setAttribute('title', '');
    setTimeout(resizeSankeySvg, 0);
  }, [resizeSankeySvg]);

  React.useEffect(() => {
    if (chartHostRef.current && 'ResizeObserver' in window) {
      const reSizeObserver = new ResizeObserver(() => resizeSankeySvg());
      resizeObserverRef.current = reSizeObserver;
      reSizeObserver.observe(chartHostRef.current);
      return () => {
        reSizeObserver.disconnect();
        resizeObserverRef.current = null;
      };
    }
    return;
  }, [resizeSankeySvg]);

  React.useEffect(() => {
    const panel = exportPanelRef.current;
    if (!panel) return;

    if (isPanelOpen) {
      panel.removeAttribute('inert');
      document.addEventListener('keydown', handlePanelKeydown);
      requestAnimationFrame(() => {
        fileNameInputRef.current?.focus();
      });
      setTimeout(() => {
        resizeSankeySvg();
        refreshChart();
      }, 250);
    } else {
      panel.setAttribute('inert', '');
      document.removeEventListener('keydown', handlePanelKeydown);
      const exportButton = document.querySelector('.toolbar-btn--export') as HTMLButtonElement;
      exportButton?.focus();
      setTimeout(() => {
        resizeSankeySvg();
        refreshChart();
      }, 250);
    }

    return () => {
      document.removeEventListener('keydown', handlePanelKeydown);
    };
  }, [isPanelOpen, handlePanelKeydown, refreshChart, resizeSankeySvg]);

  const handleExport = React.useCallback(() => {
    const type = (formatRef.current?.value || 'JPEG') as ExportType;
    const safeName = (fileName || 'Sankey').trim();

    const doExport = () => {
      const element = sankeyRef.current?.element as HTMLElement | undefined;
      const rect = element?.getBoundingClientRect();
      const scale = Math.max(2, Math.min(3, window.devicePixelRatio || 1));
      const exportW = rect ? Math.round(rect.width * scale) : undefined;
      const exportH = rect ? Math.round(rect.height * scale) : undefined;
      sankeyRef.current?.export(type, safeName);
    };

    if (Browser.isDevice && isPanelOpen) {
      setIsPanelOpen(false);
      requestAnimationFrame(() => {
        resizeSankeySvg();
        doExport();
      });
    } else {
      resizeSankeySvg();
      doExport();
      setIsPanelOpen(false);
    }
  }, [fileName, isPanelOpen, resizeSankeySvg]);

  const handlePrint = React.useCallback(() => {
    sankeyRef.current?.print();
  }, []);

  return (
    <div className="control-pane">
      <style>{SAMPLE_CSS}</style>

      <div className="chart-toolbar" role="toolbar" aria-label="Chart actions">
        <button 
          className="toolbar-btn toolbar-btn--print" 
          onClick={handlePrint}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handlePrint();
            }
          }}
        >
          <span className="e-icons e-print-icon" />
          <span className="btn-text">PRINT</span>
        </button>
        <button 
          className="toolbar-btn toolbar-btn--export" 
          onClick={() => setIsPanelOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              setIsPanelOpen(true);
            }
          }}
        >
          <span className="e-icons e-export-icon" />
          <span className="btn-text">EXPORT</span>
        </button>
      </div>

      <div
        id="chartShell"
        ref={chartShellRef}
        className={`chart-shell ${isPanelOpen ? 'with-panel' : ''} ${Browser.isDevice && isPanelOpen ? 'mobile-panel-open' : ''}`}
      >
        <div
          id="chartHost"
          ref={chartHostRef}
          className="chart-host"
          style={{ display: Browser.isDevice && isPanelOpen ? 'none' : undefined }}
        >
          <SankeyComponent
            id="sankey-print-export"
            ref={sankeyRef}
            width="95%"
            height="450"
            title="Supply Chain Management"
            subTitle="Source: OECD‑ITF Global Freight Data"
            enableRtl={false}
            orientation="Horizontal"
            background="transparent"
            margin={{ left: 20, right: 20, top: 20, bottom: 20 }}
            border={{ color: '#E0E0E0', width: 0 }}
            linkStyle={{ opacity: 0.4, curvature: 0.5, colorType: 'Source' }}
            labelSettings={{ visible: Browser.isDevice ? false : true }}
            tooltip={{
              enable: true,
              nodeTemplate: '${name}: ${value}k shipments',
              linkTemplate: Browser.isDevice ? '${start.name}: ${start.out}k → <br/> ${target.name}: ${target.in}k shipments' : '${start.name}: ${start.out}k → ${target.name}: ${target.in}k shipments'
            }}
            legendSettings={{ visible: true }}
            load={loadSankeyChartTheme}
            loaded={onLoaded}
          >
            <Inject services={[SankeyTooltip, SankeyLegend, SankeyHighlight, SankeyExport]} />

            <SankeyNodesCollectionDirective>
              {nodes.map(node => <SankeyNodeDirective key={node.id} id={node.id} />)}
            </SankeyNodesCollectionDirective>

            <SankeyLinksCollectionDirective>
              {links.map((link, i) => (
                <SankeyLinkDirective key={`${link.sourceId}-${link.targetId}-${i}`} {...link} />
              ))}
            </SankeyLinksCollectionDirective>
          </SankeyComponent>
        </div>

        <aside id="exportPanel" ref={exportPanelRef} className="export-panel" aria-hidden={!isPanelOpen}>
          <div className="panel-header">
            <span className="panel-header-left">
              <span className="e-icons e-export-icon panel-header-icon" />
              <span className="panel-title">Export</span>
            </span>
            <button 
              className="panel-close" 
              aria-label="Close export panel" 
              onClick={() => setIsPanelOpen(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  setIsPanelOpen(false);
                }
              }}
            >
              <span className="e-icons e-close" />
            </button>
          </div>

          <div className="panel-body">
            <label className="panel-label" htmlFor="expFileName">File Name:</label>
            <input
              id="expFileName"
              ref={fileNameInputRef}
              className="panel-input"
              type="text"
              value={fileName}
              placeholder="Input Text"
              onChange={(element) => setFileName((element.target as HTMLInputElement).value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  e.preventDefault();
                  setIsPanelOpen(false);
                }
              }}
            />

            <label className="panel-label" htmlFor="fileTypeDropdown">File Type:</label>
            <DropDownListComponent
              id="fileTypeDropdown"
              ref={formatRef}
              dataSource={['JPEG', 'PNG', 'SVG', 'PDF']}
              value={'JPEG'}
              width={'100%'}
            />

            <div className="panel-footer" style={{ background: 'transparent' }}>
              <button 
                className="panel-action-btn panel-action-btn--export" 
                onClick={handleExport}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleExport();
                  }
                }}
              >
                EXPORT
              </button>
              <button 
                className="panel-action-btn panel-action-btn--cancel" 
                onClick={() => setIsPanelOpen(false)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    setIsPanelOpen(false);
                  }
                }}
              >
                CANCEL
              </button>
            </div>
          </div>
        </aside>
      </div>

      <div id="action-description">
        <p>
          Explore supply chain flows with a Sankey chart using illustrative values in thousand
          shipments (k). It maps product categories to transport modes, world regions, and delivery status.
          Use built‑in print and export options (JPEG, PNG, SVG, PDF) to share or download the chart.
        </p>
      </div>
      <div id="description">
        <p>
          This Sankey visualizes shipments (k) from product categories through Air, Ground, and Sea to regions and
          final status (Delivered, Delayed, In Transit).
          Hover or tap nodes and links to see precise shipment counts.
        </p>
        <p><strong>Key features:</strong></p>
        <ul>
          <li>End‑to‑end flow from category → mode → region → status</li>
          <li>Export to JPEG, PNG, SVG, or PDF, and print directly</li>
          <li>Interactive tooltips showing values in thousand shipments</li>
        </ul>
      </div>
    </div>
  );
}

export default PrintExport;
