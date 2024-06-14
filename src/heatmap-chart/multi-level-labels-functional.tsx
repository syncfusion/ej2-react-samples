import * as React from "react";
import * as ReactDOM from "react-dom";
import { useEffect } from "react";
import { HeatMapComponent, Legend, Tooltip, ITooltipEventArgs, ICellEventArgs, ILoadedEventArgs, HeatMapTheme, Inject, TitleModel, AxisModel, PaletteSettingsModel } from '@syncfusion/ej2-react-heatmap';
import * as data from './multi-level-label-data.json';
import { updateSampleSection } from '../common/sample-base';


const MultiLevelLabels = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    let title: TitleModel = {
        text: 'Product wise Monthly sales revenue for a e-commerce website',
        textStyle: {
            size: '15px',
            fontWeight: '500',
            fontStyle: 'Normal',
            fontFamily: 'inherit'
        }
    }
    let xAxis: AxisModel = {
        labels: ['Laptop', 'Mobile', 'Gaming', 'Cosmetics', 'Fragrance', 'Watches', 'Handbags', 'Apparel', 'Kitchenware', 'Furniture', 'Home Decor'],
        border: {
            width: 1,
            type: 'Rectangle',
            color: '#a19d9d'
        },
        textStyle: {
            color: 'black',
            fontFamily: 'inherit'
        },
        multiLevelLabels: [
            {
                border: { type: 'Rectangle', color: '#a19d9d' },
                textStyle: {
                    color: 'black',
                    fontWeight: 'Bold',
                    fontFamily: 'inherit'
                },
                categories: [
                    { start: 0, end: 2, text: 'Electronics', },
                    { start: 3, end: 4, text: 'Beauty and personal care', },
                    { start: 5, end: 7, text: 'Fashion', },
                    { start: 8, end: 10, text: 'Household' }
                ]
            }
        ]
    }
    let yAxis: AxisModel = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        border: {
            width: 0
        },
        textStyle: {
            color: 'black',
            fontFamily: 'inherit'
        },
        isInversed: true,
        multiLevelLabels: [
            {
                border: { type: 'Brace', color: '#a19d9d' },
                textStyle: {
                    color: 'black',
                    fontWeight: 'Bold',
                    fontFamily: 'inherit'
                },
                categories: [
                    { start: 0, end: 2, text: 'Q1' },
                    { start: 3, end: 5, text: 'Q2' },
                    { start: 6, end: 8, text: 'Q3' },
                    { start: 9, end: 11, text: 'Q4' }
                ]
            }
        ]
    }
    let paletteSettings: PaletteSettingsModel = {
        palette: [
            { color: '#F0ADCE' },
            { color: '#19307B' }
        ]
    }

    const cellTemplate = (args: ICellEventArgs): void => {
        args.displayText = '$ ' + (args.value as number / 10) + 'K';
    };

    const tooltipTemplate = (args: ITooltipEventArgs): void => {
        args.content = [args.xLabel + ' | ' + args.yLabel + ' : $ ' + (args.value as number / 10) + 'K'];
    };

    const load = (args: ILoadedEventArgs): void => {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark") as HeatMapTheme;
        selectedTheme = selectedTheme.toLowerCase();
        if (selectedTheme === 'highcontrast' || selectedTheme === 'bootstrap5-dark' || selectedTheme === 'material-dark' || selectedTheme === 'fabric-dark' || selectedTheme === 'bootstrap-dark' || selectedTheme === 'tailwind-dark' || selectedTheme === 'material3-dark' || selectedTheme === 'fluent-dark' || selectedTheme === 'fluent2-dark' || selectedTheme === 'fluent2-highcontrast') {
            args.heatmap.xAxis.textStyle.color = 'White';
            args.heatmap.yAxis.textStyle.color = 'White';
            args.heatmap.xAxis.multiLevelLabels[0].textStyle.color = 'White';
            args.heatmap.yAxis.multiLevelLabels[0].textStyle.color = 'White';
        }
        else {
            args.heatmap.xAxis.textStyle.color = 'Black';
            args.heatmap.yAxis.textStyle.color = 'Black';
            args.heatmap.xAxis.multiLevelLabels[0].textStyle.color = 'Black';
            args.heatmap.yAxis.multiLevelLabels[0].textStyle.color = 'Black';
        }
        // custom code end
    };

    return (
        <main><div className='control-pane'>
            <div className='control-section'>
                <HeatMapComponent id='heatmap-container' titleSettings={title} tooltipSettings={{ textStyle:{ fontFamily: 'inherit' }}} xAxis={xAxis} yAxis={yAxis} dataSource={(data as any).multiLevelLabelData} tooltipRender={tooltipTemplate} cellRender={cellTemplate} paletteSettings={paletteSettings} legendSettings={{ visible: false }} cellSettings={{ border: { width: 0 }, textStyle:{ fontFamily: 'inherit' } }} load={load.bind(this)}>
                    <Inject services={[Legend, Tooltip]} />
                </HeatMapComponent>
            </div>
        </div >
            <section id="action-description" aria-label="Description of HeatMap sample">
                <p>This sample visualizes the product wise monthly sales revenue of the items sold by an online retailer in a year. The products are grouped based on the purchase domains and revenue is displayed as cell data.</p>
            </section>
            <section id="description" aria-label="Description of the HeatMap features demonstrated in this sample">
                <p>
                    In this example, you can see how to group axis labels. 
                    You can customize text in each level by using <a href="https://ej2.syncfusion.com/react/documentation/api/heatmap/multiLevelLabelsModel/#alignment" target="_blank">alignment</a>,<a href="https://ej2.syncfusion.com/react/documentation/api/heatmap/multiLevelLabelsModel/#textstyle" target="_blank">textStyle</a> and <a href="https://ej2.syncfusion.com/react/documentation/api/heatmap/multiLevelLabelsModel/#border" target="_blank">border</a> properties.
                </p>
                <p>
                    Border of the axis labels can be customized by using <a href="https://ej2.syncfusion.com/react/documentation/api/heatmap/axisLabelBorderModel/#type" target="_blank">type</a> property.
                </p>
                <ul>
                    <li><code>Rectangle</code></li>
                    <li><code>Brace</code></li>
                    <li><code>WithoutTopBorder</code></li>
                    <li><code>WithoutBottomBorder</code></li>
                    <li><code>WithoutTopandBottomBorder</code></li>
                    <li><code>WithoutBorder</code>.</li>
                </ul>
                <br></br>
                <p> <b>Injecting Module</b></p>
                <p>
                    Heatmap component features are separated into discrete feature-based modules. To use a tooltip, inject the <a target="_blank"
                    href="https://ej2.syncfusion.com/react/documentation/heatmap-chart/tooltip">Tooltip</a> module using the <code>{'<Inject services={[Tooltip]} />'}</code> method.
                </p>
            </section>
        </main>
    );
}
export default MultiLevelLabels;
