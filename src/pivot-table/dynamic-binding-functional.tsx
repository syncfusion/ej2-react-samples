import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useRef, useState } from 'react';
import {
    PivotViewComponent, Inject, FieldList,
    Toolbar, CalculatedField, NumberFormatting, PDFExport, ExcelExport, ConditionalFormatting,
    type IDataSet, type IDataOptions, OlapEngine, PivotEngine
} from '@syncfusion/ej2-react-pivotview';
import { Menu } from '@syncfusion/ej2-navigations';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { Browser } from '@syncfusion/ej2-base';
import { Pivot_Data } from './data-source';
import './dynamic-binding.css';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { updateSampleSection } from '../common/sample-base';

/**
 * PivotView Toolbar Sample
 */

let dataSourceSettings: IDataOptions = {
    columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
    type: 'JSON' as any,
    dataSource: Pivot_Data as IDataSet[],
    expandAll: false,
    filters: [],
    drilledMembers: [{ name: 'Country', items: ['France'] }] as any,
    formatSettings: [{ name: 'Amount', format: 'C0' }],
    rows: [{ name: 'Country' }, { name: 'Products' }],
    values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }]
};
let toolbarOptions: any = ['Grid', 'Chart', 'Export', 'SubTotal', 'GrandTotal', 'Formatting', 'FieldList'];

function DynamicBinding() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    const connectFileRef = useRef<HTMLInputElement>(null);
    const reportFileRef = useRef<HTMLInputElement>(null);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState('');
    const [remoteUrl, setRemoteUrl] = useState('');
    const shouldAutoConfigRef = useRef(false);
    const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [currentData, setCurrentData] = useState<any[]>(Pivot_Data);
    const lastRemoteRef = useRef<{ kind: 'CSV' | 'JSON' | null; url: string | null }>({ kind: null, url: null });
    const [olapProxyUrl, setOlapProxyUrl] = useState('https://bi.syncfusion.com/olap/msmdpump.dll');
    const [proxyBaseUrl, setProxyBaseUrl] = useState(''); 
    const [olapConnected, setOlapConnected] = useState(false);
    const [olapDataSources, setOlapDataSources] = useState<string[]>([]);
    const [olapCatalogs, setOlapCatalogs] = useState<string[]>([]);
    const [olapCubes, setOlapCubes] = useState<string[]>([]);
    const [selectedDataSource, setSelectedDataSource] = useState('');
    const [selectedCatalog, setSelectedCatalog] = useState('');
    const [selectedCube, setSelectedCube] = useState('');
    const [loadingSources, setLoadingSources] = useState(false);
    const [loadingCatalogs, setLoadingCatalogs] = useState(false);
    const [loadingCubes, setLoadingCubes] = useState(false);
    const [olapUiMessage, setOlapUiMessage] = useState('');
    const connectMenuRef = useRef<Menu | null>(null);
    const openMenuRef = useRef<Menu | null>(null);
    const pivotObj = useRef<any>(null);
    const defaultUrls = {
        CSV: 'https://cdn.syncfusion.com/data/sales-analysis.csv',
        JSON: 'https://cdn.syncfusion.com/data/sales-analysis.json',
    };
    let dataSource: any;
    const parseCSV = (csvString) => {
        const lines = csvString.split(/\r?\n|\r/).filter(line => line.trim());
        return lines.map(line => line.split(',').map(cell => cell.trim().replace(/^"|"$/g, '').replace(/""/g, '"')));
    };
    const isOlapActive = () => {
        const pivot = pivotObj.current as any;
        if (!pivot) return false;
        const ds: any = pivot.dataSourceSettings || {};
        return pivot.dataType === 'olap' || !!pivot.olapEngineModule || ds.providerType === 'SSAS';
    };
    const cleanOlapForRelational = () => {
        const pivot = pivotObj.current as any;
        if (!pivot) return;
        pivot.olapEngineModule = null;
        pivot.dataType = 'pivot';
        pivot.engineModule = new PivotEngine()
        if (pivot.dataSourceSettings) {
            (pivot.dataSourceSettings as any).providerType = undefined;
            (pivot.dataSourceSettings as any).catalog = undefined;
            (pivot.dataSourceSettings as any).cube = undefined;
            (pivot.dataSourceSettings as any).url = undefined;
        }
        pivot.refresh();
    };
    const setPivotData = (type: 'CSV' | 'JSON', data: any[] | string[][]) => {
        const pivot = pivotObj.current as any;
        if (!pivot) return;
        if (isOlapActive()) cleanOlapForRelational();
        pivot.dataSourceSettings.type = type;
        pivot.dataSourceSettings.dataSource = data as any;
        delete (pivot.dataSourceSettings as any).url;
        setCurrentData(data);
        shouldAutoConfigRef.current = true;
        pivot.refresh();
    };
     const applyReportSettings = async (
    pivot,
    reportSettings,
    isOlapReport,
    entireReportSettings
  ) => {
    if (isOlapReport) {
      setCurrentData([]);
      pivot.engineModule = null;
      pivot.olapEngineModule = new OlapEngine();
      pivot.dataType = 'olap';
      pivot.loadPersistData(JSON.stringify(entireReportSettings));
      shouldAutoConfigRef.current = false;
      pivot.refresh();
      if (reportSettings.type) delete reportSettings.type;
      return;
    }

    // ---------- Relational path ----------
    cleanOlapForRelational();

    const maybeDataUrl = reportSettings.dataUrl || reportSettings.url;
    const maybeCsvUrl = reportSettings.csvUrl;
    const isRemoteLoad = !!maybeDataUrl || !!maybeCsvUrl; // 👈 detect remote load

    const ensureReportDataLoaded = async () => {
      if (
        !reportSettings.dataSource ||
        reportSettings.dataSource.length === 0
      ) {
        try {
          if (maybeDataUrl) {
            const res = await fetch(maybeDataUrl, { cache: 'no-store' });
            if (!res.ok)
              throw new Error(`HTTP ${res.status}: ${res.statusText}`);
            const jsonData = await res.json();
            const arr = Array.isArray(jsonData)
              ? jsonData
              : jsonData?.data ?? jsonData;
            if (
              !Array.isArray(arr) ||
              arr.length === 0 ||
              typeof arr[0] !== 'object'
            ) {
              throw new Error(
                'Invalid JSON at dataUrl: expected an array of objects (or under "data").'
              );
            }
            reportSettings.type = 'JSON';
            reportSettings.dataSource = arr;
            setCurrentData(arr);
          } else if (maybeCsvUrl) {
            const res = await fetch(maybeCsvUrl, { cache: 'no-store' });
            if (!res.ok)
              throw new Error(`HTTP ${res.status}: ${res.statusText}`);
            const csvString = await res.text();
            const csvArray = parseCSV(csvString);
            if (!csvArray.length)
              throw new Error('CSV at csvUrl appears empty.');
            reportSettings.type = 'CSV';
            reportSettings.dataSource = csvArray;
            setCurrentData(csvArray);
          } else {
            // No inline and no URL → fall back to currentData
            reportSettings.dataSource = currentData;
            reportSettings.type = pivot.dataSourceSettings.type || 'JSON';
          }
        } catch (e) {
          // Fallback on any error
          reportSettings.dataSource = currentData;
          reportSettings.type = pivot.dataSourceSettings.type || 'JSON';
        }
      } else {
        setCurrentData(reportSettings.dataSource);
        reportSettings.type = reportSettings.type || 'JSON';
      }
    };

    await ensureReportDataLoaded();

    // ---------- ONLY inject cached data for local saved reports w/o inline/URL ----------
    const hasInlineIncoming =
      Array.isArray(reportSettings.dataSource) &&
      reportSettings.dataSource.length > 0;

    const hasGlobalData = Array.isArray(dataSource)
      ? dataSource.length > 0
      : !!dataSource;

    if (!isRemoteLoad && !hasInlineIncoming && hasGlobalData) {
      if (reportSettings) {
        reportSettings.dataSource = dataSource;
      }
      if (entireReportSettings?.dataSourceSettings) {
        entireReportSettings.dataSourceSettings.dataSource = dataSource;
      }
    }

    try {
      if (entireReportSettings?.dataSourceSettings) {
        pivot.loadPersistData(JSON.stringify(entireReportSettings));
      } else {
        // Fallback: only have the settings
        pivot.dataSourceSettings = reportSettings;
      }
    } catch {
      pivot.dataSourceSettings = reportSettings;
    }

    shouldAutoConfigRef.current = false;
    pivot.refresh();
  };
  const handleConnectFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const mode = (e.target.dataset.type || '').toLowerCase();
    const isCsvMode = mode === 'csv';
    // Enforce CSV-only when CSV mode is requested, regardless of browser file filter behavior
    if (isCsvMode && !/\.csv$/i.test(file.name)) {
      setErrorMessage(
        `Failed to load file as CSV. Please select a valid CSV file.`
      );
      setIsErrorDialogOpen(true);
      e.target.value = '';
      return;
    }
    const isCsv = isCsvMode || /\.csv$/i.test(file.name);
    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        if (isCsv) {
          const csvString = String(evt.target?.result ?? '');
          const arr = parseCSV(csvString);
          if (!arr.length || arr.length <= 1) {
            setErrorMessage('CSV appears empty or has only headers.');
            setIsErrorDialogOpen(true);
            return;
          }
          const headerLen = arr[0].length;
          const inconsistent = arr.slice(1).some((r) => r.length !== headerLen);
          if (inconsistent) {
            setErrorMessage('Malformed CSV: inconsistent number of columns.');
            setIsErrorDialogOpen(true);
            return;
          }
          resetPivot();
          setPivotData('CSV', arr);
        } else {
          const raw = String(evt.target?.result ?? '');
          let parsed;
          try {
            parsed = JSON.parse(raw);
          } catch (parseErr) {
            setErrorMessage(
              `Failed to parse file as JSON: ${parseErr.message}. Please select a valid JSON file.`
            );
            setIsErrorDialogOpen(true);
            return;
          }
          const unwrappedData =
            parsed && typeof parsed === 'object' && 'record' in parsed
              ? parsed.record
              : parsed;
          const looksLikeReport =
            !Array.isArray(unwrappedData) &&
            (unwrappedData?.dataSourceSettings ||
              unwrappedData?.rows ||
              unwrappedData?.columns ||
              unwrappedData?.values ||
              unwrappedData?.url ||
              unwrappedData?.providerType);
          if (looksLikeReport) {
            const reportSettings =
              unwrappedData.dataSourceSettings ?? unwrappedData;
            const isOlapReport = reportSettings?.providerType === 'SSAS';
            const pivot = pivotObj.current;
            if (pivot) resetPivot();
            if (pivot)
              await applyReportSettings(
                pivot,
                reportSettings,
                isOlapReport,
                unwrappedData
              );
            return;
          }
          const dataArray = Array.isArray(unwrappedData)
            ? unwrappedData
            : unwrappedData?.data ?? unwrappedData;
          if (
            !Array.isArray(dataArray) ||
            dataArray.length === 0 ||
            typeof dataArray[0] !== 'object'
          ) {
            setErrorMessage(
              'Invalid JSON: Provide a saved report or a non-empty array of objects (or under "data").'
            );
            setIsErrorDialogOpen(true);
            return;
          }
          resetPivot();
          setPivotData('JSON', dataArray);
        }
      } catch (err) {
        setErrorMessage(`Failed to load file: ${err.message}`);
        setIsErrorDialogOpen(true);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };
    function toolbarRender(args: any): void {
        const connectMenu: any = {
            template: '<ul id="connect_menu"></ul>',
            id: 'custom_toolbar',
        };
        args.customToolbar!.splice(0, 0, connectMenu);
        const openMenu: any = {
            template: '<ul id="open_menu"></ul>',
            id: 'open_toolbar',
        };
        args.customToolbar!.splice(1, 0, openMenu);
        const saveItem: any = {
            prefixIcon: 'e-save-report e-btn-icon e-icons',
            tooltipText: 'Save Pivot Report as JSON',
            click: toolbarClicked,
        };
        args.customToolbar!.splice(2, 0, saveItem);
        const separator3: any = {
            type: 'Separator'
        };
        args.customToolbar!.splice(3, 0, separator3);
    };
    const onDataBound = () => {
        const pivot = pivotObj.current;
        if (Browser.isDevice && pivot && pivot.enableRtl) {
            document.querySelector('.control-section')?.classList.add('e-rtl');
        }
        const connectEl = document.getElementById('connect_menu');
        if (connectEl) {
            const menuItems = [
                {
                    iconCss: 'e-connect-report e-btn-icon e-icons',
                    items: [
                        {
                            text: 'JSON', iconCss: 'e-json-icon e-icons',
                            items: [
                                { text: 'Local', id: 'local_json' },
                                { text: 'Remote', id: 'remote_json' }
                            ]
                        },
                        {
                            text: 'CSV', iconCss: 'e-csv-icon e-icons',
                            items: [
                                { text: 'Local', id: 'local_csv' },
                                { text: 'Remote', id: 'remote_csv' }
                            ]
                        },
                        { text: 'OLAP(XMLA)', id: 'olap', iconCss: 'e-olap-icon e-icons' },
                    ],
                },
            ];
            if (connectMenuRef.current) { connectMenuRef.current.destroy(); connectMenuRef.current = null; }
            connectMenuRef.current = new Menu({ items: menuItems, select: gridToolbarClicked, cssClass: 'e-pivot-toolbar-menu' }, '#connect_menu');
        }
        const openEl = document.getElementById('open_menu');
        if (openEl) {
            const openMenuItems = [
                {
                    iconCss: 'e-open-report e-btn-icon e-icons',
                    items: [
                        {
                            text: 'Load Pivot Report',
                            items: [
                                { text: 'Local JSON', id: 'local_report', iconCss: 'e-local-report-icon e-icons' },
                                { text: 'Remote JSON', id: 'remote_report', iconCss: 'e-remote-report-icon e-icons' },
                            ],
                        },
                    ],
                },
            ];
            if (openMenuRef.current) { openMenuRef.current.destroy(); openMenuRef.current = null; }
            openMenuRef.current = new Menu({ items: openMenuItems, select: openToolbarClicked, cssClass: 'e-pivot-toolbar-menu' }, '#open_menu');
        }
        if (shouldAutoConfigRef.current && pivot) {
            const hasValues = !!(pivot.dataSourceSettings?.values?.length);
            if (!hasValues && (pivot).pivotFieldListModule?.dialogRenderer) {
                shouldAutoConfigRef.current = false;
                setTimeout(() => (pivot).pivotFieldListModule.dialogRenderer.onShowFieldList(), 0);
            } else { shouldAutoConfigRef.current = false; }
        }
    };
    const onEnginePopulated = () => {
        if (shouldAutoConfigRef.current && pivotObj.current) {
            pivotObj.current.displayOption = { view: 'Both', primary: 'Table' };
            shouldAutoConfigRef.current = false;
            if (pivotObj.current.dataSourceSettings.values?.length === 0) {
                (pivotObj.current.pivotFieldListModule.dialogRenderer as any).onShowFieldList();
            }
        }
    };
    const toolbarClicked = async () => {
        await saveReport();
    };
    const saveReport = async () => {
        const pivot = pivotObj.current;
        if (!pivot) { return; }
        const download = (content: string, mime: string, filename: string) => {
            const blob = new Blob([content], { type: mime });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        };
        try {
            const persisted = pivot.getPersistData();
            let reportSettings: any = {};
            try {
                const parsed = JSON.parse(persisted);
                let isOlapReport = parsed && parsed.dataSourceSettings && parsed.dataSourceSettings.providerType === 'SSAS';
                if (!isOlapReport && parsed && parsed.dataSourceSettings) { 
                    dataSource = parsed.dataSourceSettings.dataSource;
                    parsed.dataSourceSettings.dataSource = []; 
                }
                if (parsed && typeof parsed === 'object') {
                    delete parsed.pivotValues;
                }
                reportSettings = parsed;
            } catch {
                reportSettings = {
                    dataSourceSettings: pivot.dataSourceSettings || {},
                    gridSettings: pivot.gridSettings || {},
                    chartSettings: pivot.chartSettings || {},
                    displayOption: pivot.displayOption || {}
                };
            }
            const hasInline = Array.isArray(reportSettings.dataSource) && reportSettings.dataSource.length > 0;
            if (!hasInline && lastRemoteRef.current.url && !reportSettings.dataUrl && !reportSettings.csvUrl) {
                if (lastRemoteRef.current.kind === 'JSON') { (reportSettings as any).dataUrl = lastRemoteRef.current.url; (reportSettings as any).type = 'JSON'; }
                if (lastRemoteRef.current.kind === 'CSV') { (reportSettings as any).csvUrl = lastRemoteRef.current.url; (reportSettings as any).type = 'CSV'; }
            }
            const json = JSON.stringify(reportSettings, null, 2);
            download(json, 'application/json', 'pivot.json');
        } catch (err: any) {
            console.error('Save failed:', err);
            alert(`Failed to save: ${err.message}`);
        }
    };
    const openToolbarClicked = (args?: any) => {
        const itemId = args?.item?.id;
        if (!itemId) return;
        if (itemId === 'local_report') {
            const input = connectFileRef.current;
            if (input) {
                input.onchange = null as any;
                (input as any).value = '';
                input.accept = '.json';
                delete (input as any).dataset.type;
                input.onchange = handleConnectFileChange as any;
                input.click();
            }
            return;
        }
        if (itemId === 'remote_report') {
            setDialogType('JSON Report');
            setRemoteUrl("https://api.jsonbin.io/v3/b/6912d9ecd0ea881f40e12335");
            setDialogOpen(true);
            return;
        }
    };
    const gridToolbarClicked = (args?: any) => {
        const itemId = args?.item?.id;
        if (!itemId) return;
        if (itemId === 'local_csv' || itemId === 'local_json') {
            const ext = itemId === 'local_csv' ? 'CSV' : 'JSON';
            const input = connectFileRef.current;
            if (input) {
                input.onchange = null as any;
                (input as any).value = '';
                input.accept = ext === 'CSV' ? '.csv' : '.json';
                (input as any).dataset.type = ext;
                input.onchange = handleConnectFileChange as any;
                input.click();
            }
            return;
        }
        if (itemId === 'remote_csv' || itemId === 'remote_json') {
            const type = itemId === 'remote_csv' ? 'CSV' : 'JSON';
            setDialogType(type);
            setRemoteUrl(defaultUrls[type as 'CSV' | 'JSON'] || '');
            setDialogOpen(true);
            return;
        }
        if (itemId === 'olap') {
            setDialogType('OLAP');
            setDialogOpen(true);
            setOlapConnected(false);
            setOlapUiMessage('');
            setLoadingSources(false);
            setLoadingCatalogs(false);
            setLoadingCubes(false);
            setOlapDataSources([]);
            setOlapCatalogs([]);
            setOlapCubes([]);
            setSelectedDataSource('');
            setSelectedCatalog('');
            setSelectedCube('');
            return;
        }
    };
    const resetPivot = () => {
        const pivot = pivotObj.current;
        if (pivot && pivot.engineModule) {
            (pivot.engineModule as any).fieldList = {};
        }
        if (pivot) {
            pivot.dataSourceSettings.rows = [];
            pivot.dataSourceSettings.columns = [];
            pivot.dataSourceSettings.values = [];
            pivot.dataSourceSettings.filters = [];
            pivot.dataSourceSettings.conditionalFormatSettings = [];
            pivot.dataSourceSettings.formatSettings = [];
            pivot.dataSourceSettings.drilledMembers = [];
            pivot.dataSourceSettings.fieldMapping = [];
            pivot.dataSourceSettings.excludeFields = [];
            pivot.dataSourceSettings.filterSettings = [];
            pivot.dataSourceSettings.sortSettings = [];
            pivot.dataSourceSettings.valueSortSettings = {};
            pivot.dataSourceSettings.calculatedFieldSettings = [];
            pivot.dataSourceSettings.groupSettings = [];
            pivot.dataSourceSettings.expandAll = false;
            pivot.dataSourceSettings.showGrandTotals = true;
            pivot.dataSourceSettings.showRowGrandTotals = true;
            pivot.dataSourceSettings.showColumnGrandTotals = true;
            pivot.dataSourceSettings.showSubTotals = true;
            pivot.dataSourceSettings.showRowSubTotals = true;
            pivot.dataSourceSettings.showColumnSubTotals = true;
        }
    };
    const applyOlapBinding = async (opts?: { url?: string; catalog?: string; cube?: string }) => {
        const pivot = pivotObj.current as any;
        if (!pivot) return;
        const url = opts?.url ?? resolveEndpoint(olapProxyUrl);
        const catalog = opts?.catalog ?? selectedCatalog;
        const cube = opts?.cube ?? selectedCube;
        if (!url || !catalog || !cube) return;
        const olapDataSourceSettings: IDataOptions = {
            url,
            catalog,
            providerType: 'SSAS',
            cube,
            localeIdentifier: 1033,
            rows: [],
            columns: [],
            values: []
        } as IDataOptions;
        (pivot as any).engineModule = null;
        pivot.olapEngineModule = new OlapEngine();
        pivot.dataType = 'olap';
        pivot.dataSourceSettings = olapDataSourceSettings as any;
        if ((pivot.dataSourceSettings as any).type) {
            (pivot.dataSourceSettings as any).type = undefined;
        }
        setCurrentData([]);
        shouldAutoConfigRef.current = true;
        pivot.refresh();
    };
    const xmlaSoapEnvelope = (requestType: string, restrictions: Record<string, string | number | boolean> = {}, properties: Record<string, string | number | boolean> = {}) => {
        const restrXml = Object.keys(restrictions).length
            ? `<Restrictions><RestrictionList>${Object.entries(restrictions)
                .map(([k, v]) => `<${k}>${String(v)}</${k}>`)
                .join('')}</RestrictionList></Restrictions>`
            : '<Restrictions />';
        const propXml = `<Properties><PropertyList>${Object.entries(properties)
            .map(([k, v]) => `<${k}>${String(v)}</${k}>`)
            .join('')}</PropertyList></Properties>`;
        return `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Header />
  <soap:Body>
    <Discover xmlns="urn:schemas-microsoft-com:xml-analysis">
      <RequestType>${requestType}</RequestType>
      ${restrXml}
      ${propXml}
    </Discover>
  </soap:Body>
</soap:Envelope>`;
    };
    const resolveEndpoint = (endpoint: string) => {
        const trimmed = endpoint.trim();
        if (!proxyBaseUrl) return trimmed; 
        const sep = proxyBaseUrl.includes('?') ? '&' : '?';
        return `${proxyBaseUrl}${sep}url=${encodeURIComponent(trimmed)}`;
    };
    const postXMLA = async (endpoint: string, bodyXml: string) => {
        const url = resolveEndpoint(endpoint);
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/xml; charset=utf-8',
                'Accept': 'text/xml, application/xml, */*;q=0.1',
            },
            body: bodyXml,
        });
        const text = await res.text();
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        return text;
    };
    const parseRowset = (xmlText: string) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlText, 'text/xml');
        const rows = Array.from(xml.getElementsByTagNameNS('*', 'row'));
        const result: Record<string, string>[] = rows.map((r) => {
            const obj: Record<string, string> = {};
            Array.from(r.children).forEach((c) => {
                obj[(c as Element).localName] = (c.textContent ?? '').trim();
            });
            return obj;
        });
        const fault = xml.getElementsByTagNameNS('*', 'Fault')[0];
        if (fault) {
            const faultStr = fault.textContent || 'SOAP Fault';
            throw new Error(faultStr.trim());
        }
        return result;
    };
    const discoverDataSources = async (endpoint: string): Promise<string[]> => {
        const body = xmlaSoapEnvelope('DISCOVER_DATASOURCES');
        const xml = await postXMLA(endpoint, body);
        const rows = parseRowset(xml);
        const names = rows.map(r => r.DataSourceName).filter(Boolean);
        return names;
    };
    const discoverCatalogs = async (endpoint: string, _dataSource?: string): Promise<string[]> => {
        const body = xmlaSoapEnvelope('DBSCHEMA_CATALOGS');
        const xml = await postXMLA(endpoint, body);
        const rows = parseRowset(xml);
        const cats = rows.map(r => r.CATALOG_NAME).filter(Boolean);
        return cats;
    };
    const discoverCubes = async (endpoint: string, catalog: string): Promise<string[]> => {
        const body = xmlaSoapEnvelope('MDSCHEMA_CUBES', { CATALOG_NAME: catalog });
        const xml = await postXMLA(endpoint, body);
        const rows = parseRowset(xml);
        const cubes = rows
            .filter(r => r.CUBE_SOURCE === '1')
            .map(r => r.CUBE_NAME)
            .filter(Boolean);
        return cubes;
    };
    const loadRemoteAndBind = async (kind: 'CSV' | 'JSON', url: string) => {
        const cleanUrl = url.trim();
        if (!cleanUrl) throw new Error('Empty URL');
        if (kind === 'CSV') {
            const res = await fetch(cleanUrl, { cache: 'no-store' });
            if (!res.ok) return res.text().then(() => { throw new Error(`HTTP ${res.status}: ${res.statusText}`); });
            const csvString = await res.text();
            if (
                csvString.trim().startsWith('<!DOCTYPE html') ||
                csvString.trim().startsWith('<html')
            ) {
                throw new Error('Invalid CSV: Received HTML error page instead of CSV.');
            }
            let arr: string[][] = [];
            try {
                arr = parseCSV(csvString);
            } catch (err: any) {
                throw new Error(`CSV parsing error: ${err.message}`);
            }
            if (!arr.length || arr.length <= 1) throw new Error('CSV appears empty or has only headers.');
            const headerLen = arr[0].length;
            const inconsistent = arr.slice(1).some(r => r.length !== headerLen);
            if (inconsistent) throw new Error('Malformed CSV: inconsistent number of columns.');
            lastRemoteRef.current = { kind: 'CSV', url: cleanUrl };
            resetPivot();
            setPivotData('CSV', arr);
        } else {
            const res = await fetch(cleanUrl, { cache: 'no-store' });
            if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
            const jsonData = await res.json();
            const unwrappedData =
                jsonData && typeof jsonData === 'object' && 'record' in jsonData
                    ? jsonData.record
                    : jsonData;
            const looksLikeReport =
                !Array.isArray(unwrappedData) &&
                (unwrappedData?.dataSourceSettings ||
                    unwrappedData?.rows ||
                    unwrappedData?.columns ||
                    unwrappedData?.values ||
                    unwrappedData?.url ||
                    unwrappedData?.providerType);
            if (looksLikeReport) {
                const reportSettings =
                    unwrappedData.dataSourceSettings ?? unwrappedData;
                const isOlapReport = reportSettings?.providerType === 'SSAS';
                const pivot = pivotObj.current;
                if (pivot) {
                    resetPivot();
                    await applyReportSettings(pivot, reportSettings, isOlapReport, unwrappedData);
                    return;
                }
            }
            const arr = Array.isArray(unwrappedData)
                ? unwrappedData
                : unwrappedData?.data ?? unwrappedData;
            if (
                !Array.isArray(arr) ||
                arr.length === 0 ||
                typeof arr[0] !== 'object'
            ) {
                throw new Error(
                    'Invalid JSON: Provide a saved report or a non-empty array of objects (or under "data").'
                );
            }
            lastRemoteRef.current = { kind: 'JSON', url: cleanUrl };
            resetPivot();
            setPivotData('JSON', arr);
        }
    };
    const handleOpenRemote = async () => {
        if (!remoteUrl.trim()) {
            setErrorMessage('Please enter a valid URL.');
            setDialogOpen(false);
            setIsErrorDialogOpen(true);
            return;
        }
        try {
            await loadRemoteAndBind(dialogType as 'CSV' | 'JSON', remoteUrl);
            setDialogOpen(false);
        } catch (err: any) {
            setErrorMessage(
                `Failed to load remote ${dialogType}: ${err.message}\n\n` +
                `Tip: Ensure the URL is accessible and allows CORS for your origin.`
            );
            setDialogOpen(false);
            setIsErrorDialogOpen(true);
        }
    }

    return (
        <div className='control-pane'>
            <meta name="referrer" content="never"></meta>
            <div className='control-section' id='pivot-table-section' style={{ overflow: 'initial' }}>
                <input
                    ref={connectFileRef}
                    type="file"
                    id="connectFile"
                    style={{ display: 'none' }}
                />
                <input
                    ref={reportFileRef}
                    type="file"
                    id="reportFile"
                    style={{ display: 'none' }}
                />
                {isDialogOpen && dialogType !== 'OLAP' && (
                    <DialogComponent
                        visible={isDialogOpen}
                        isModal={true}
                        showCloseIcon={true}
                        width="480px"
                        header={dialogType === 'JSON Report' ? `Load Pivot Report` : (`Connect to ${dialogType}`)}
                        close={() => setDialogOpen(false)}
                        target=".control-pane"
                        closeOnEscape={true}
                        overlayClick={() => setDialogOpen(false)}
                        position={{ X: 'center', Y: 'center' }}
                        animationSettings={{ effect: 'Zoom', duration: 150 }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <input
                                type="text"
                                placeholder={`Enter ${dialogType} URL`}
                                value={remoteUrl}
                                className='e-input'
                                onChange={(e) => setRemoteUrl(e.target.value)}
                                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleOpenRemote(); } }}
                                autoFocus
                            />
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                                <ButtonComponent cssClass='e-primary' onClick={handleOpenRemote}>Open</ButtonComponent>
                                <ButtonComponent onClick={() => setDialogOpen(false)}>Cancel</ButtonComponent>
                            </div>
                        </div>
                    </DialogComponent>
                )}
                {isErrorDialogOpen && (
                    <DialogComponent
                        visible={isErrorDialogOpen}
                        isModal={true}
                        showCloseIcon={true}
                        width="420px"
                        header="Error"
                        close={() => setIsErrorDialogOpen(false)}
                        target=".control-pane"
                        closeOnEscape={true}
                        overlayClick={() => setIsErrorDialogOpen(false)}
                        position={{ X: 'center', Y: 'center' }}
                        animationSettings={{ effect: 'Fade', duration: 120 }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <p className="error-message">{errorMessage}</p>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <ButtonComponent cssClass='e-primary' onClick={() => setIsErrorDialogOpen(false)}>OK</ButtonComponent>
                            </div>
                        </div>
                    </DialogComponent>
                )}
                {isDialogOpen && dialogType === 'OLAP' && (
                    <DialogComponent
                        visible={isDialogOpen}
                        isModal={true}
                        showCloseIcon={true}
                        width="620px"
                        header="Connect to OLAP(XMLA)"
                        close={() => setDialogOpen(false)}
                        target=".control-pane"
                        closeOnEscape={true}
                        overlayClick={() => setDialogOpen(false)}
                        position={{ X: 'center', Y: 'center' }}
                        animationSettings={{ effect: 'Zoom', duration: 150 }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <div className="olap-row">
                                <label style={{ minWidth: '80px', fontWeight: '500' }}>URL</label>
                                <div style={{ display: 'flex', flex: 1, gap: 8, alignItems: 'center' }}>
                                    <input
                                        type="text"
                                        className='e-input'
                                        value={olapProxyUrl}
                                        onChange={(e) => setOlapProxyUrl(e.target.value)}
                                        placeholder="Enter OLAP endpoint URL (e.g., https://bi.syncfusion.com/olap/msmdpump.dll)"
                                        style={{ flex: 1 }}
                                    />
                                    <ButtonComponent
                                        cssClass='e-primary'
                                        onClick={async () => {
                                            setOlapUiMessage('');
                                            setLoadingSources(true);
                                            try {
                                                const sources = await discoverDataSources(olapProxyUrl);
                                                setOlapDataSources(sources);
                                                setSelectedDataSource('');
                                                setOlapConnected(true);
                                                setOlapUiMessage(sources.length ? '' : 'No data sources found.');
                                            } catch (e: any) {
                                                const corsHint = ' If the browser blocks this due to CORS, configure a proxy base URL below and try again.';
                                                setOlapUiMessage(`Connect failed: ${e.message}.${corsHint}`);
                                                setOlapConnected(false);
                                                setOlapDataSources([]);
                                            } finally {
                                                setLoadingSources(false);
                                            }
                                        }}
                                    >
                                        {loadingSources ? 'Connecting…' : 'Connect'}
                                    </ButtonComponent>
                                </div>
                            </div>
                            <div className="olap-row">
                                <label style={{ display: 'block', marginBottom: 4, fontWeight: '500' }}>Data Sources</label>
                                <DropDownListComponent
                                    value={selectedDataSource}
                                    dataSource={olapDataSources}
                                    fields={{ text: 'value', value: 'value' }}
                                    placeholder={loadingSources ? 'Loading…' : 'Select data source'}
                                    enabled={olapConnected || loadingSources}
                                    change={async (e) => {
                                        const v = e.value;
                                        setSelectedDataSource(v);
                                        setSelectedCatalog('');
                                        setSelectedCube('');
                                        setOlapCatalogs([]);
                                        setOlapCubes([]);
                                        if (!v) return;
                                        setLoadingCatalogs(true);
                                        try {
                                            const cats = await discoverCatalogs(olapProxyUrl, v);
                                            setOlapCatalogs(cats);
                                            setSelectedCatalog('');
                                        } catch (err: any) {
                                            setOlapUiMessage(`Load catalogs failed: ${err.message}`);
                                        } finally {
                                            setLoadingCatalogs(false);
                                        }
                                    }}
                                    cssClass="e-input"
                                    style={{ width: '100%' }}
                                />
                            </div>
                            <div className="olap-row">
                                <label style={{ display: 'block', marginBottom: 4, fontWeight: '500' }}>Catalogs</label>
                                <DropDownListComponent
                                    value={selectedCatalog}
                                    dataSource={olapCatalogs}
                                    fields={{ text: 'value', value: 'value' }}
                                    placeholder={loadingCatalogs ? 'Loading…' : 'Select catalog'}
                                    enabled={!!selectedDataSource || loadingCatalogs}
                                    change={async (e) => {
                                        const v = e.value;
                                        setSelectedCatalog(v);
                                        setSelectedCube('');
                                        setOlapCubes([]);
                                        if (!v) return;
                                        setLoadingCubes(true);
                                        try {
                                            const cubes = await discoverCubes(olapProxyUrl, v);
                                            setOlapCubes(cubes);
                                            setSelectedCube('');
                                        } catch (err: any) {
                                            setOlapUiMessage(`Load cubes failed: ${err.message}`);
                                        } finally {
                                            setLoadingCubes(false);
                                        }
                                    }}
                                    cssClass="e-input"
                                    style={{ width: '100%' }}
                                />
                            </div>
                            <div className="olap-row">
                                <label style={{ display: 'block', marginBottom: 4, fontWeight: '500' }}>Cubes</label>
                                <DropDownListComponent
                                    value={selectedCube}
                                    dataSource={olapCubes}
                                    fields={{ text: 'value', value: 'value' }}
                                    placeholder={loadingCubes ? 'Loading…' : 'Select cube'}
                                    enabled={!!selectedCatalog || loadingCubes}
                                    change={async (e) => {
                                        const v = e.value;
                                        setSelectedCube(v);
                                        const pivot = pivotObj.current;
                                        const isOlap = pivot && (pivot.dataSourceSettings as any)?.providerType === 'SSAS';
                                        if (isOlap && v) {
                                            await applyOlapBinding({ cube: v });
                                        }
                                    }}
                                    cssClass="e-input"
                                    style={{ width: '100%' }}
                                />
                            </div>
                            {olapUiMessage && <div style={{ color: 'var(--e-error, #b00020)', fontSize: '14px' }}>{olapUiMessage}</div>}
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                                <ButtonComponent
                                    cssClass='e-primary'
                                    onClick={async () => {
                                        const pivot = pivotObj.current;
                                        if (!pivot) { setDialogOpen(false); return; }
                                        if (!olapConnected || !selectedCatalog || !selectedCube) {
                                            alert('Please connect and select a Catalog and Cube.');
                                            return;
                                        }
                                        await applyOlapBinding({
                                            url: resolveEndpoint(olapProxyUrl),
                                            catalog: selectedCatalog,
                                            cube: selectedCube,
                                        });
                                        setDialogOpen(false);
                                    }}
                                    disabled={!olapConnected}
                                >
                                    OK
                                </ButtonComponent>
                                <ButtonComponent onClick={() => setDialogOpen(false)}>Cancel</ButtonComponent>
                            </div>
                        </div>
                    </DialogComponent>
                )}

                <div className='control-section'>
                    <PivotViewComponent
                        id='PivotView'
                        ref={pivotObj}
                        dataSourceSettings={dataSourceSettings}
                        width={'100%'}
                        height={500}
                        showFieldList={true}
                        showToolbar={true}
                        allowCalculatedField={true}
                        allowPdfExport={true}
                        allowExcelExport={true}
                        allowNumberFormatting={true}
                        allowConditionalFormatting={true}
                        toolbar={toolbarOptions}
                        toolbarRender={toolbarRender}
                        dataBound={onDataBound}
                        enginePopulated={onEnginePopulated}
                        displayOption={{ view: 'Both' }}
                        gridSettings={{ columnWidth: Browser.isDevice ? 100 : 120 }}
                    >
                        <Inject services={[FieldList, Toolbar, CalculatedField, PDFExport, ExcelExport, ConditionalFormatting, NumberFormatting]} />
                    </PivotViewComponent>
                </div>
            </div>
            <div id="action-description">
                <p>This sample showcases how to dynamically load data from multiple data sources in the Pivot Table, including local and remote JSON/CSV files, as well as an OLAP(XMLA) data source via customized toolbar menu options. Additionally, you can save and reload Pivot Table report(s) as JSON files for future analysis.</p>
            </div>
            <div id="description">
                <p>
                    This sample demonstrates how to dynamically load data from various sources into the Pivot Table at runtime. You can load one data source at a time using the custom toolbar option. You can also save and load Pivot Table report(s) using the custom toolbar options, which are explained below one by one.
                </p>

                <h4>Open a Data Source:</h4>

                <b>JSON</b>
                <ul>
                    <li>
                        <strong>Local JSON Data:</strong> Hover over the first toolbar option, then hover over the <strong>JSON</strong> menu option and select the <strong>Local</strong> submenu option. This allows you choose and load a JSON data source file from your machine.
                    </li>
                    <li>
                        <strong>Remote JSON Data:</strong> Hover over the first toolbar option, then hover over the <strong>JSON</strong> menu option and select the <strong>Remote</strong> submenu option. A popup will appear where you can enter the remote JSON data source file URL in the input box to load data into the Pivot Table.
                    </li>
                </ul>

                <b>CSV</b>
                <ul>
                    <li>
                        <strong>Local CSV Data:</strong> Hover over the first toolbar option, then hover over the <strong>CSV</strong> menu option and select the <strong>Local</strong> submenu option. This allows you choose and load a CSV data source file from your machine.
                    </li>
                    <li>
                        <strong>Remote CSV Data:</strong> Hover over the first toolbar option, then hover over the <strong>CSV</strong> menu option and select the <strong>Remote</strong> submenu option. A popup will appear where you can enter the remote CSV data source file URL in the input box to load data into the Pivot Table.
                    </li>
                </ul>

                <b>OLAP(XMLA)</b>
                <ul>
                    <li>Hover over the first toolbar option and click the <strong>OLAP(XMLA)</strong> menu option to open the connection popup.</li>
                    <li>Enter the OLAP server URL in the <strong>URL</strong> input box and click <strong>Connect</strong>. This will load the available data sources from the OLAP server.</li>
                    <li>Select a data source from the <strong>Data Sources</strong> dropdown. This will load the available catalogs for that data source.</li>
                    <li>Select a catalog from the <strong>Catalogs</strong> dropdown. This will load the available cubes for that catalog.</li>
                    <li>Select a cube from the <strong>Cubes</strong> dropdown, then click <strong>OK</strong> to load the selected cube and begin your analysis.</li>
                </ul>

                <h4>Load a Pivot Report:</h4>
                <p>You can load previously saved Pivot Report(s), which are in JSON file format, at any time to restore the exact analysis state.</p>
                <ul>
                    <li>
                        <strong>Local JSON Pivot Report:</strong> Hover over the second toolbar option, then hover over the <strong>Load Pivot Report</strong> menu option and select the <strong>Local JSON</strong> submenu option to choose and load a JSON Pivot Report file from your machine.
                    </li>
                    <li>
                        <strong>Remote JSON Pivot Report:</strong> Hover over the second toolbar option, then hover over the <strong>Load Pivot Report</strong> menu option and select the <strong>Remote JSON</strong> submenu option. A popup will appear where you can enter the remote JSON Pivot Report file URL in the input box to load the report into the Pivot Table.
                    </li>
                </ul>

                <h4>Save a Pivot Report:</h4>
                <p>
                    You can save the Pivot Table report as a JSON file by clicking the third toolbar option (<strong>Save Pivot Report as JSON</strong>) to preserve configurations such as filtering, sorting, field arrangements, formatting, aggregations, and more. In this example, the report configurations are saved excluding the data source, but you can customize this behavior as needed.
                </p>
                <br />
                <p>More information on the Essential® JS2 Pivot Table can be found in these <a target="_blank"
                    href="https://ej2.syncfusion.com/react/documentation/pivotview/data-binding">Data Binding</a> and
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/pivotview/tool-bar#save-and-load-report-as-a-json-file">Save and load report as a JSON file</a> documentation sections.
                </p>
            </div>
        </div>
    );
}
export default DynamicBinding;
