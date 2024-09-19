/**
 * Local Data for bullet chart
 */
import * as React from 'react';
import * as ReactDOM from "react-dom";
import { BulletChartComponent, BulletRangeCollectionDirective, BulletRangeDirective, BulletTooltip, Inject } from '@syncfusion/ej2-react-charts';
import { IBulletLoadedEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import { fabricColors, bootstrapColors, highContrastColors, materialColors, bootstarp5Colors, bootstarp5DarkColors, bootstrapDarkColors, tailwindColors, tailwindDarkColors, material3Colors, material3DarkColors, defaultColors, fluentColors, fluent2Colors, fluent2DarkColors  } from './theme-color'

const SAMPLE_CSS = `
      .control-fluid {
          padding: 0px !important;
      }`;

let data: Object[] = [
    {
        requiredStories: 20,
        completedStories: 25,
        name: 'David',
        color: "#7f84e8"
    },
    {
        requiredStories: 25,
        completedStories: 20,
        name: 'Asif',
        color: "#dd8abd"
    },
    {
        requiredStories: 15,
        completedStories: 10,
        name: 'Thomas',
        color: "#70ad47"
    },
    {
        requiredStories: 40,
        completedStories: 39,
        name: 'Rohit',
        color: "#f8b883"
    },
    {
        requiredStories: 35,
        completedStories: 40,
        name: 'Virat',
        color: "#e56590"
    },
    {
        requiredStories: 28,
        completedStories: 25,
        name: 'Jude',
        color: "#357cd2"
    },
    {
        requiredStories: 10,
        completedStories: 18,
        name: 'Warner',
        color: "#404041"
    },
    {
        requiredStories: 30,
        completedStories: 28,
        name: 'Malik',
        color: "#00bdae"
    }
];

function BulletChartMultipleData() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])

    return (
        < div className='control-pane' >
            <style>
                {SAMPLE_CSS}
            </style>
            <div className='control-section'>
                <BulletChartComponent
                    id='multipleData'
                    style={{ textAlign: "center" }}
                    width={Browser.isDevice ? '100%' : '80%'}
                    tooltip={{ enable: true }}
                    dataSource={data}
                    valueField='completedStories'
                    targetField='requiredStories'
                    categoryField='name'
                    animation={{ enable: false }}
                    height='400'
                    minimum={5}
                    maximum={45} interval={5}
                    minorTickLines={{ width: 0 }}
                    title='Sprint Planning'
                    titlePosition='Top'
                    valueFill='color'
                    targetColor='#304560'
                    subtitle='Estimated in story points'
                    load={bulletLoad.bind(this)}
                >
                    <Inject services={[BulletTooltip]} />
                    <BulletRangeCollectionDirective>
                        <BulletRangeDirective end={25} color='#DBE7F3'></BulletRangeDirective>
                        <BulletRangeDirective end={37} color='#BBCEE7'></BulletRangeDirective>
                        <BulletRangeDirective end={45} color='#96B2D7'></BulletRangeDirective>
                    </BulletRangeCollectionDirective>
                </BulletChartComponent>
            </ div>
            <div id="action-description">
                <p>
                    This sample illustrates a bullet chart with multiple datasets, allowing for the comparison of different values.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, you can observe how multiple datasets are compared in a bullet chart. Here, each value bar is assigned a different color from the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/bullet-chart/#datasource" aria-label="Navigate to the dataSource property reference for React Bullet Chart component">dataSource</a>.
                </p>
                <p>
                    <code>Tooltips</code> are enabled in this example, to see them in action, hover over a feature bar or comparative bar on the bullet chart.
                </p>
                <p>
                    More information on the data binding for the bullet chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/bullet-chart/data-binding" aria-label="Navigate to the documentation for Data Binding in React Bullet Chart component">documentation section</a>.
                </p>
            </div>
        </div>

    )
    function bulletLoad(args: IBulletLoadedEventArgs): void {
        let chart: Element = document.getElementById('multipleData');
        chart.setAttribute('title', '');
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.bulletChart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/light/i, 'Light').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
        let color: string[] = [];
        switch (args.bulletChart.theme) {
            case 'Fabric':
                color = fabricColors;
                break;
            case 'Bootstrap4':
            case 'Bootstrap':
                color = bootstrapColors;
                break;
            case 'HighContrastLight':
            case 'HighContrast':
                color = highContrastColors;
                break;
            case 'MaterialDark':
                color = materialColors;
                break;
            case 'FabricDark':
                color = fabricColors;
                break;
            case 'BootstrapDark':
                color = bootstrapDarkColors;
                break;
            case 'Tailwind':
                color = tailwindColors;
                break;
            case 'TailwindDark':
                color = tailwindDarkColors;
                break;
            case 'Bootstrap5':
                color = bootstarp5Colors
                break;
            case 'Bootstrap5Dark':
                color = bootstarp5DarkColors;
                break;
            case 'Fluent':
            case 'FluentDark':
                color = fluentColors;
                break;
            case 'Material3':
                color = material3Colors;
                break;
            case 'Material3Dark':
                color = material3DarkColors;
                break;
            case "Fluent2":
                color = fluent2Colors;
                break;
            case "Fluent2HighContrast":
            case "Fluent2Dark":
                color = fluent2DarkColors;
                break;
            default:
                color = defaultColors;
                break;
        }
        for (let i: number = 0; i < (args.bulletChart.dataSource as Object[]).length; i++) {
            args.bulletChart.dataSource[i].color = color[i];
        }
    }
}
export default BulletChartMultipleData;