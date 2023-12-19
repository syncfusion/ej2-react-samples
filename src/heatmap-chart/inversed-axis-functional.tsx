import * as React from "react";
import * as ReactDOM from "react-dom";
import { useEffect, useRef, useState } from "react";
import { HeatMapComponent, Legend, Tooltip, ILoadedEventArgs, HeatMapTheme, Inject, TitleModel, AxisModel, PaletteSettingsModel, CellSettingsModel } from '@syncfusion/ej2-react-heatmap';
import * as data from './inversed-axis-data.json';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from "../common/property-pane";
import { CheckBoxComponent, ChangeEventArgs } from "@syncfusion/ej2-react-buttons";

// custom code start
const SAMPLE_CSS: any = `
    #control-container {
        padding: 0px !important;
    }
    #source{
        float: right; margin-right: 10p
    }`;
// custom code end
const InversedAxis = () => {

    useEffect(() => {
        updateSampleSection();
    }, [])

    const[isXInversed, setIsXInversed] = useState<boolean>(true);
    const [isYInversed, setIsYInversed] = useState<boolean>(true);

    let heatmap = useRef<HeatMapComponent>(null);
    let title: TitleModel = {
        text: 'Population Growth Rate of the most Populous Countries',
        textStyle: {
            size: '15px',
            fontWeight: '500',
            fontStyle: 'Normal',
            fontFamily: 'inherit'
        }
    }
    let xAxis: AxisModel = {
        labels: ['China', 'India', 'USA', 'Indonesia', 'Brazil', 'Pakistan', 'Nigeria', 'Bangladesh', 'Russia', 'Mexico'],
        labelRotation: 45,
        labelIntersectAction: 'None',
        isInversed: isXInversed,
        textStyle: {
            fontFamily: 'inherit'
        }
    }
    let yAxis: AxisModel = {
        labels: ['1965-1970', '1970-1975', '1975-1980', '1980-1985', '1985-1990', '1990-1995', '1995-2000', '2000-2005', '2005-2010', '2010-2015'],
        isInversed: isYInversed,
        textStyle: {
            fontFamily: 'inherit'
        }
    }
    let paletteSettings: PaletteSettingsModel = {
        palette: [
            { value: 0, color: '#4b7287' },
            { value: 0.5, color: '#b5b29f' },
            { value: 1, color: '#F0D6AD' },
            { value: 1.5, color: '#9da49a' },
            { value: 2, color: '#466f86' },
            { value: 2.5, color: '#d7c7a7' },
            { value: 3, color: '#6e888f' },
        ]
    }
    let cellSettings: CellSettingsModel = {
        border: { width: 0 },
        showLabel: false,
        format: '{value} %'
    }

    const load = (args: ILoadedEventArgs): void => {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark") as HeatMapTheme;
        // custom code end
    };

    const valueXChange = (args: ChangeEventArgs): void => {
        setIsXInversed(args.checked);
        heatmap.current.dataBind();
    }

    const valueYChange = (args: ChangeEventArgs): void => {
        setIsYInversed(args.checked);
        heatmap.current.dataBind();
    }

    return (
        <div>
            <div className='col-md-9 control-section'>
                {/* custom code start */}
                <style>{SAMPLE_CSS}</style>
                {/* custom code end */}
                <HeatMapComponent id='heatmap-container' ref={heatmap} titleSettings={title} tooltipSettings={{ textStyle:{ fontFamily: 'inherit' } }} xAxis={xAxis} yAxis={yAxis} dataSource={(data as any).inveredAxisData} cellSettings={cellSettings} paletteSettings={paletteSettings} load={load.bind(this)} legendSettings={{visible: false }}>
                    <Inject services={[Legend, Tooltip]} />
                </HeatMapComponent>
                <div id="source">Source:
                    <a href="https://en.wikipedia.org/wiki/List_of_countries_by_oil_production" target="_blank">https://en.wikipedia.org/ </a>
                </div>
            </div>
            <div className="col-md-3 property-section">
                <PropertyPane title='Properties'>
                    <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%', marginLeft:-10 }}>
                        <tbody>
                            <tr id='' style={{ height: '50px' }}>
                                <td style={{ width: '40%' }}>
                                    <CheckBoxComponent id='XOpposedPosition' checked={isXInversed} label='Reverse X-Axis Origin' change={valueXChange} />
                                </td>
                            </tr>
                            <tr id='' style={{ height: '50px' }}>
                                <td style={{ width: '40%' }}>
                                    <CheckBoxComponent id='YOpposedPosition' checked={isYInversed} label='Reverse Y-Axis Origin' change={valueYChange} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </PropertyPane>
            </div>
            <div id="action-description">
                <p>
                    This sample illustrates the population growth rate of the most populous countries over the years.
                    The data label is disabled in this sample, the tooltip displays the data point values.  In property panel,
                    the options are available to reverse the origin of the axes by means of checkbox for each axis.
                </p>
            </div>
            <div id="description">
                <p>
                In this example, you can see how to reverse the axis origin for both axes, once the axis origin has been reversed
                the axis data will be displayed inverted. You can reverse the axis origin by enabling the
                <a href="https://ej2.syncfusion.com/react/documentation/api/heatmap/axisModel/#isinversed" target="_blank"> isInversed </a> property for each axis. 
                </p>
                <p>
                    The tooltip is enabled in this example. To see the tooltip in action, hover the mouse over an item or tap an item on touch-enabled devices.
                </p>
                <br></br>
                <p> <b>Injecting Module</b></p>
                <p>
                    Heatmap component features are separated into discrete feature-based modules. To use a tooltip, inject the <a target="_blank"
                    href="https://ej2.syncfusion.com/react/documentation/heatmap-chart/tooltip">Tooltip</a> module using the <code>{'<Inject services={[Tooltip]} />'}</code> method.
                </p>
            </div>
        </div >
    );
}
export default InversedAxis;
