/**
 * Sample fro DataLabel template
 */
import * as React from "react";
import { useEffect } from "react";
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, LineSeries, DataLabel, Legend, ILoadedEventArgs,ColumnSeries, ChartTheme, Category, ITextRenderEventArgs } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from "../common/sample-base";
let data1: Object[] = [
    { sports: "Tennis", boys: 50, girls: 38 },
    { sports: "Badminton", boys: 30, girls: 40 },
    { sports: "Cycling", boys: 37, girls: 20 },
    { sports: "Football", boys: 60, girls: 21 },
    { sports: "Hockey", boys: 15, girls: 8 },
];
let data2: Object[] = [
    { sports: "Tennis", boys: 50, girls: 38 },
    { sports: "Badminton", boys: 30, girls: 40 },
    { sports: "Cycling", boys: 37, girls: 20 },
    { sports: "Football", boys: 60, girls: 21 },
    { sports: "Hockey", boys: 15, girls: 8 },
];
let theme: ChartTheme;
let materialMan: string = '<div style="background-color:#00bdae;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center; padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let materialWomen: string = '<div style="background-color:#404041;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let fabricMan: string = '<div style="background-color:#4472c4;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px"><span>' +
    '${point.y} </span></div></div>';
let fabricWomen: string = '<div style="background-color:#ed7d31;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px"><span>' +
    '${point.y} </span></div></div>';
let bootstrapMan: string = '<div style="background-color:#a16ee5;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let bootstrapWomen: string = '<div style="background-color:#f7ce69;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px"><span>' +
    '${point.y} </span></div></div>';
let highcontrastMan: string = '<div style="background-color:#79ECE4;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let highcontrastWomen: string = '<div style="background-color:#E98272;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let tailwindMan: string = '<div style="background-color:#5A61F6;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let tailwindWomen: string = '<div style="background-color:#65A30D;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let tailwind3Man: string = '<div style="background-color:#2F4074;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let tailwind3Women: string = '<div style="background-color:#03B4B4;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let bootstrap5Man: string = '<div style="background-color:#FD7E14;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let bootstrap5Women: string = '<div style="background-color:#6610F2;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let materialDarkMan: string = '<div style="background-color:#9ECB08;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let materialDarkWomen: string = '<div style="background-color:#56AEFF;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let fabricDarkMan: string = '<div style="background-color:#4472c4;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let fabricDarkWomen: string = '<div style="background-color:#ed7d31;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let tailwindDarkMan: string = '<div style="background-color:#8B5CF6;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let tailwindDarkWomen: string = '<div style="background-color:#22D3EE;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let tailwind3DarkMan: string = '<div style="background-color:#8029F1;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let tailwind3DarkWomen: string = '<div style="background-color:#1ABC9C;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let bootstrap5DarkMan: string = '<div style="background-color:#FD7E14;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let bootstrap5DarkWomen: string = '<div style="background-color:#6610F2;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let fluentMan: string = '<div style="background-color:#1AC9E6;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let fluentWomen: string = '<div style="background-color:#DA4CB2;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let fluentDarkMan: string = '<div style="background-color:#1AC9E6;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let fluentDarkWomen: string = '<div style="background-color:#DA4CB2;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let material3Man: string = '<div style="background-color:#6355C7;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center; padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let material3Women: string = '<div style="background-color:#00AEE0;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let material3DarkMan: string = '<div style="background-color:#4EAAFF;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center; padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let material3DarkWomen: string = '<div style="background-color:#FA4EAB;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let fluent2Women: string = '<div style="background-color:#09AF74;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let fluent2Man: string = '<div style="background-color:#6200EE;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let fluent2DarkMan: string = '<div style="background-color:#9BB449;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let fluent2DarkWomen: string = '<div style="background-color:#2A72D5;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let fluent2HighContrastMan: string = '<div style="background-color:#9BB449;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let fluent2HighContrastWomen: string = '<div style="background-color:#2A72D5;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';

const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const DataLabelTemplate = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const textRender = (args: ITextRenderEventArgs): void => {
        if (theme === 'Material') {
            args.template = args.series.name === 'Boys' ? materialMan : materialWomen;
        } else if (theme === 'Fabric') {
            args.template = args.series.name === 'Boys' ? fabricMan : fabricWomen;
        } else if (theme === 'Tailwind') {
            args.template = args.series.name === 'Boys' ? tailwindMan : tailwindWomen;
        }
        else if (theme === 'Tailwind3') {
            args.template = args.series.name === 'Boys' ? tailwind3Man : tailwind3Women;
        }  else if (theme.toLowerCase() === 'highcontrast') {
            args.template = args.series.name === 'Boys' ? highcontrastMan : highcontrastWomen;
        } else if (theme === 'MaterialDark') {
            args.template = args.series.name === 'Boys' ? materialDarkMan : materialDarkWomen;
        } else if (theme === 'FabricDark') {
            args.template = args.series.name === 'Boys' ? fabricDarkMan : fabricDarkWomen;
        } else if (theme === 'TailwindDark') {
            args.template = args.series.name === 'Boys' ? tailwindDarkMan : tailwindDarkWomen;
        }
        else if (theme === 'Tailwind3Dark') {
            args.template = args.series.name === 'Boys' ? tailwind3DarkMan : tailwind3DarkWomen;
        }  else if (theme === 'Bootstrap5Dark') {
            args.template = args.series.name === 'Boys' ? bootstrap5DarkMan : bootstrap5DarkWomen;
        } else if (theme === 'Bootstrap5') {
            args.template = args.series.name === 'Boys' ? bootstrap5Man : bootstrap5Women;
        } else if (theme === 'Fluent') {
            args.template = args.series.name === 'Boys' ? fluentMan : fluentWomen;
        } else if (theme === 'FluentDark') {
            args.template = args.series.name === 'Boys' ? fluentDarkMan : fluentDarkWomen;
        } else if (theme === 'Material3') {
            args.template = args.series.name === 'Boys' ? material3Man : material3Women;
        } else if (theme === 'Material3Dark') {
            args.template = args.series.name === 'Boys' ? material3DarkMan : material3DarkWomen;
        } else if (theme === 'Fluent2') {
            args.template = args.series.name === 'Boys' ? fluent2Man : fluent2Women;
        } else if (theme === 'Fluent2Dark') {
            args.template = args.series.name === 'Boys' ? fluent2DarkMan : fluent2DarkWomen;
        } else if (theme === 'Fluent2HighContrast') {
            args.template = args.series.name === 'Boys' ? fluent2HighContrastMan : fluent2HighContrastWomen;
        } else {
            args.template = args.series.name === 'Boys' ? bootstrapMan : bootstrapWomen;
        }
    };
    const loadPre = (args: ILoadedEventArgs): void => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
        theme = args.chart.theme;
    };
    const loaded = (args: ILoadedEventArgs): void => {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <ChartComponent id='charts' style={{ textAlign: "center" }} primaryXAxis={{ valueType: 'Category', edgeLabelPlacement: 'Shift', majorGridLines: { width: 0 }, labelIntersectAction: 'Rotate45', majorTickLines: {width : 0}, minorTickLines: {width : 0} }} primaryYAxis={{ minimum: 0, maximum: 70, lineStyle:{width:0}, majorGridLines:{ color:'#eaeaea', width:1} }} titleStyle={{ fontStyle: 'medium', size: '14px' }} chartArea={{ border: { width: 0 } }} width={Browser.isDevice ? '100%' : '75%'} title='Athletes in Popular School' load={loadPre.bind(this)} loaded={loaded.bind(this)} textRender={textRender.bind(this)}>
                    <Inject services={[LineSeries, DataLabel, Category, Legend, ColumnSeries]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={data1} xName='sports' yName='boys' name='Boys' type='Column' columnWidth={0.75} columnSpacing={0.5} marker={{ visible: false, shape: 'Circle', dataLabel: { visible: true, position: 'Outer', margin: { top: 70 }, template: materialMan  } }} width={2} />
                        <SeriesDirective dataSource={data2} xName='sports' yName='girls' name='Girls' type='Column' columnWidth={0.75} columnSpacing={0.5} marker={{ visible: false, shape: 'Rectangle', dataLabel: { visible: true, position: 'Outer', margin: { top: 70 }, template: materialWomen } }} width={2} />
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
            <div id="action-description">
                <p>
                    This sample illustrates data label template support in charts. Each data label for each point is rendered using the template.
                </p>
            </div>
            <div id="description">
                <p>
                    The React Charts data label template feature allows you to change the appearance and behavior of the data label for each data point using the <code>Template</code> property in <code>ChartDataLabel</code>.
                </p>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use dataLabel, we need to inject <code>DataLabel</code> module into <code>services</code>.
                </p>
                <p>
                    More information on the data label template can be found in this
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/data-labels/#data-label-template" aria-label="Navigate to the documentation for Data Label Template in React Chart component">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default DataLabelTemplate;