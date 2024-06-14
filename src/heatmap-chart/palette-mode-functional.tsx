import * as React from "react";
import * as ReactDOM from "react-dom";
import { useEffect, useRef, useState } from "react";
import { HeatMapComponent, Legend, Tooltip, ILoadedEventArgs, HeatMapTheme, Inject, TitleModel, AxisModel, PaletteSettingsModel, CellSettingsModel, LegendSettingsModel, PaletteType } from '@syncfusion/ej2-react-heatmap';
import * as data from './palette-sample-data.json';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from "../common/property-pane";
import { RadioButtonComponent, ChangeEventArgs, CheckBoxComponent } from "@syncfusion/ej2-react-buttons";
// custom code start
const SAMPLE_CSS: any = `
    #control-container {
        padding: 0px !important;
    }
    .fluent .enableSmart, .fluent-dark .enableSmart, fabric .enableSmart, .fabric-dark .enableSmart {
        margin-top:7px !important;
    }
    .enableSmart {
        margin-top: 10px;
    }
    #source{
        float: right; margin-right: 10p
    }`;
// custom code end
const Palette = () => {

    useEffect(() => {
        updateSampleSection();
    }, [])

    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [paletteType, setPaletteType] = useState<PaletteType>('Fixed');
    const [isEnableSmartLegend, setIsEnableSmartLegend] = useState<boolean>(true);
    let heatmap = useRef<HeatMapComponent>(null);
    let title: TitleModel = {
        text: 'U.S. Government Energy Consumption by Agency (Trillion Btu)',
        textStyle: {
            size: '15px',
            fontWeight: '500',
            fontStyle: 'Normal',
            fontFamily: 'inherit'
        }
    }
    let xAxis: AxisModel = {
        labels: ['2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015'],
        labelRotation: 45,
        labelIntersectAction: 'None',
        textStyle: {
            fontFamily: 'inherit'
        }
    }
    let yAxis: AxisModel = {
        labels: ['Agriculture', 'Energy', 'Administration', 'Health', 'Interior', 'Justice', 'NASA', 'Transportation'],
        textStyle: {
            fontFamily: 'inherit'
        }
    }
    let paletteSettings: PaletteSettingsModel = {
        palette: [
            { value: 4.3, color: '#FFFFDA' },
            { value: 7, color: '#EDF8B6' },
            { value: 9, color: '#CAE8B4' },
            { value: 15, color: '#78D1BD' },
            { value: 18, color: '#36BCC6' },
            { value: 25, color: '#208FC6' },
            { value: 30, color: '#253494' },
            { value: 32, color: '#081D58' }
        ],
        type: paletteType
    }
    let cellSettings: CellSettingsModel = {
        border: { width: 0 },
        showLabel: false
    }
    let legendSettings: LegendSettingsModel = {
        position: 'Bottom',
        width: '400px',
        enableSmartLegend: isEnableSmartLegend,
        textStyle: {
            fontFamily: 'inherit'
        }
    }

    const fixed = (): void => {
        setIsDisabled(false);
        setPaletteType('Fixed');
        heatmap.current.dataBind();
    }

    const gradient = (): void => {
        setIsDisabled(true);
        setPaletteType('Gradient');
        heatmap.current.dataBind();
    }

    const valueChange = (args: ChangeEventArgs): void => {
        setIsEnableSmartLegend(args.checked);
        heatmap.current.dataBind();
    }

    const load = (args: ILoadedEventArgs): void => {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark") as HeatMapTheme;
        // custom code end
    };

    return (
        <main><div>
            <div className='col-md-9 control-section'>
                {/* custom code start */}
                <style>{SAMPLE_CSS}</style>
                {/* custom code end */}
                <HeatMapComponent id='heatmap-container' ref={heatmap} titleSettings={title} tooltipSettings={{ textStyle:{ fontFamily: 'inherit' } }} xAxis={xAxis} yAxis={yAxis} dataSource={(data as any).palatteSampleData} paletteSettings={paletteSettings} cellSettings={cellSettings} load={load.bind(this)} legendSettings={legendSettings}>
                    <Inject services={[Legend, Tooltip]} />
                </HeatMapComponent>
            </div>
            <div className="col-md-3 property-section">
                <PropertyPane title='Properties'>
                    <table id='property' role='none' title='Properties' className='property-panel-table' style={{ width: '100%', marginLeft:-10 }}>
                        <tbody>
                            <tr style={{ height: '50px' }}>
                                <td style={{ width: '60%' }}>
                                    <div>Palette Type:</div>
                                </td>
                                <td style={{ width: '40%' }}>
                                    <div className='row'>
                                        <RadioButtonComponent id='fixed' checked={true} label='Fixed' name='paletteType' value="Fixed" change={fixed} />
                                    </div>
                                    <div className='row'>
                                        <RadioButtonComponent id='gradient' label='Gradient' name='paletteType' value="Gradient" change={gradient} />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td style={{ width: '60%' }}>
                                    <div className='enableSmart'>Enable Smart Legend:</div>
                                </td>
                                <td style={{ width: '40%' }}>
                                    <div className='row'>
                                        <CheckBoxComponent id='smartLegend' checked={true} disabled={isDisabled} name='enableSmartLegend' change={valueChange} />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </PropertyPane>
            </div>
        </div >
            <section id="action-description" aria-label="Description of HeatMap sample">
                <p>
                    This sample visualizes the energy consumption in trillion British thermal units (btu) by
                    the various public sectors in US government over the years. The data label is disabled in this sample,
                    the tooltip displays the data point values.  In property panel, the options are available to change
                    palette type in Heatmap by means of radio button.
                </p>
            </section>
            <section id="description" aria-label="Description of the HeatMap features demonstrated in this sample">
                <p>
                    In this example, you can see how to change the palette type between
                    <a href="https://ej2.syncfusion.com/react/documentation/heatmap-chart/palette#fixed" target="_blank"> Fixed</a> and
                    <a href="https://ej2.syncfusion.com/react/documentation/heatmap-chart/palette#gradient" target="_blank"> Gradient</a> types in Heatmap. The palette type can be defined using the
                    <a href="https://ej2.syncfusion.com/react/documentation/api/heatmap/paletteSettingsModel/#type" target="_blank"> type</a> property in
                    <a href="https://ej2.syncfusion.com/react/documentation/api/heatmap/paletteSettingsModel/" target="_blank"> paletteSettings</a>. Legend is enabled in this example, changing the palette mode the legend type will be automatically switched between
                    gradient legend and fixed type legend.
                </p>
                <p>The tooltip is enabled in this example. To see the tooltip in action, hover the mouse over an item or tap an item on touch-enabled devices.</p>
                <br></br>
                <p><b>Injecting Module</b></p>
                <p>
                        Heatmap component features are separated into discrete feature-based modules. To use a tooltip and the legend, inject the <a target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/heatmap-chart/tooltip">Tooltip</a> and <a target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/heatmap-chart/legend">Legend</a> module using the <code>{'<Inject services={[Tooltip, Legend]} />'}</code> method.
                </p>
            </section>
        </main>
    );
}
export default Palette;
