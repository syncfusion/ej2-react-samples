import * as React from 'react';
import { useEffect, useRef } from 'react';
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  Inject,
  PieSeries,
  AccumulationDataLabel,
  AccumulationLegend,
  AccumulationTooltip,
  IAccLoadedEventArgs,
  ILegendRenderEventArgs,
  ILegendClickEventArgs
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { loadAccumulationChartTheme } from './theme-color';
import { updateSampleSection } from '../common/sample-base';

const SAMPLE_CSS = `
  .control-fluid { padding: 0px !important; }
`;


const data: any[] = [
  { x: 'United States', y: 29.55, image: 'United States', text: Browser.isDevice ? 'USA: 29.55%' : 'United States: 29.55%', description: '13.4M barrels per day', tooltip: '13.4M' },
  { x: 'Saudi Arabia',  y: 23.83, image: 'Saudi Arabia',  text: Browser.isDevice ? 'SAU: 23.83%' : 'Saudi Arabia: 23.83%',  description: '10.8M barrels per day', tooltip: '10.8M' },
  { x: 'Russia',        y: 23.69, image: 'Russia',        text: Browser.isDevice ? 'RUS: 23.69%' : 'Russia: 23.69%',        description: '10.8M barrels per day', tooltip: '10.8M' },
  { x: 'Canada',        y: 12.12, image: 'Canada',        text: Browser.isDevice ? 'CAN: 12.12%' : 'Canada: 12.12%',        description: '5.5M barrels per day',  tooltip: '5.5M'  },
  { x: 'China',         y: 10.83, image: 'China',         text: Browser.isDevice ? 'CHN: 10.83%' : 'China: 10.83%',         description: '4.9M barrels per day',  tooltip: '4.9M'  }
];

const AccumulationLegendTemplate = () => {
  const chartRef = useRef<AccumulationChartComponent | null>(null);

  useEffect(() => {
    updateSampleSection();
  }, []);

  const legendTemplate: string =
    '<div class="legend-template" style="display:flex; align-items:flex-start; gap:' + (Browser.isDevice ? '6px' : '8px') + '; opacity:1; max-width:' + (Browser.isDevice ? '160px' : '280px') + '; box-sizing:border-box;">' +
    '<img class="e-legend-img" src="" width="' + (Browser.isDevice ? '24' : '36') + '" height="' + (Browser.isDevice ? '24' : '36') + '" style="flex:0 0 ' + (Browser.isDevice ? '24px' : '36px') + '; margin-top:' + (Browser.isDevice ? '0px' : '2px') + ';" />' +
    '<div style="display:flex; flex-direction:column; min-width:0; text-align:left;">' +
    '<span class="e-legend-label" style="font-weight:600; font-size:' + (Browser.isDevice ? '10px' : '13px') + '; color:LABEL_COLOR; line-height:' + (Browser.isDevice ? '12px' : '18px') + '; white-space:normal; overflow-wrap:break-word; word-break:break-word; max-width:' + (Browser.isDevice ? '130px' : '220px') + ';"></span>' +
    '<span class="e-legend-desc" style="font-size:' + (Browser.isDevice ? '10px' : '12px') + '; margin-top:' + (Browser.isDevice ? '0px' : '2px') + '; line-height:' + (Browser.isDevice ? '12px' : '15px') + '; white-space:normal; overflow-wrap:break-word; word-break:break-word; max-width:' + (Browser.isDevice ? '130px' : '220px') + ';"></span>' +
    '</div>' +
    '</div>';
  const onChartLoad = (args: IAccLoadedEventArgs): void => {
    document.getElementById('accumulationLegendFunctional').setAttribute('title', '');
  };
  const legendRender = (args: ILegendRenderEventArgs): void => {
    const matched = data.find((d) => d.x === args.text);
    const desc: string = matched ? matched.description : '';
    const chart = chartRef.current as any;
    const matchedPoint: any = chart && chart.series && chart.series[0]
      ? (chart.series[0] as any).points.find((p: any) => p.x === args.text)
      : null;
    const opacity: string = matchedPoint && !matchedPoint.visible ? '0.5' : '1';
    (args as any).template = (args as any).template
      .replace('opacity:1;', 'opacity:' + opacity + ';')
      .replace('LABEL_COLOR', (args as any).fill)
      .replace('src=""', 'src="src/chart/images/' + args.text + '.png"')
      .replace('></span>', '>' + args.text + '</span>')
      .replace(/<span class="e-legend-desc"([^>]*)><\/span>/, '<span class="e-legend-desc"$1>' + desc + '</span>');
  };

  const load = (args: IAccLoadedEventArgs): void => { loadAccumulationChartTheme(args); };

  return (
    <div className='control-pane'>
      <style>{SAMPLE_CSS}</style>
      <div className='control-section' style={{ textAlign: "center" }}>
        <AccumulationChartComponent
          style={{ textAlign: "center" }}
          id='accumulationLegendFunctional'
          ref={(chart) => { chartRef.current = chart; }}
          title='Top 5 Oil Producing Countries (2023)'
          subTitle='Source: Wikipedia.org'
          titleStyle={{
            position: 'Custom',
            x: Browser.isDevice ? 150 : 383,
            y: 22.75
          }}
          tooltip={{
            enable: true,
            header: '<b>${point.x}</b>',
            format: 'Production: <b>${point.tooltip}</b> barrels/day'
          }}
          enableBorderOnMouseMove={false}
          legendRender={legendRender}
          load={load}
          loaded={onChartLoad.bind(this)}
          legendSettings={{
            visible: true,
            width: Browser.isDevice ? '35%' : '20%',
            position: 'Right',
            itemPadding: 15,
            template: legendTemplate
          }}
          width={Browser.isDevice ? '100%' : '75%'}>
          <Inject services={[PieSeries, AccumulationDataLabel, AccumulationLegend, AccumulationTooltip]} />
          <AccumulationSeriesCollectionDirective>
            <AccumulationSeriesDirective
              dataSource={data}
              xName='x'
              yName='y'
              tooltipMappingName='tooltip'
              border={{ color: '#ffffff', width: 1 }}
              radius={Browser.isDevice ? '65%' : '70%'}
              innerRadius='0%'
              animation={{ enable: false }}
              type='Pie'
              dataLabel={{
                visible: true,
                position: Browser.isDevice ? 'Inside' : 'Outside',
                name: Browser.isDevice ? '' : 'text',
                format: Browser.isDevice ? '{value}%' : '',
                enableRotation: Browser.isDevice ? true : false,
                font: { size: Browser.isDevice ? '8px' : '12px', fontWeight: '600' },
                connectorStyle: { type: 'Line' }
              }}
            />
          </AccumulationSeriesCollectionDirective>
        </AccumulationChartComponent>
      </div>

      <div id="action-description">
        <p>
          This sample demonstrates custom legend templates in a pie chart visualizing the world's top 5 oil-producing countries — United States, Saudi Arabia, Russia, Canada, and China. Each pie segment reflects the percentage share of production, and the legend displays country flags and daily output in millions of barrels.
        </p>
      </div>
      <div id="description">
        <p>
          This sample uses the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/accumulation-chart/legendSettings/#template"
            aria-label="Navigate to the documentation for template in legendSettings in the EJ2 Accumulation Chart control"><code>template</code></a> property of
          <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/accumulation-chart/legendSettings"
            aria-label="Navigate to the documentation for LegendSettings in the EJ2 Accumulation Chart control"> <code>legendSettings</code></a> to
          fully customize legend items.
          
          The <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/accumulation-chart/iacclegendrendereventargs"
            aria-label="Navigate to the documentation for legendRender event in the EJ2 Accumulation Chart control"><code>legendRender</code></a> event
          dynamically injects country-specific data — including flag images, color-matched labels, and production volumes — into the legend template at render time.
        </p>
        <p><b>Injecting Module</b></p>
        <p>
          Accumulation Chart component features are segregated into individual feature-wise modules. To use the legend and tooltip, inject <code>AccumulationLegend</code> and <code>AccumulationTooltip</code> into <code>services</code>.
        </p>
        <p>
          More information on legend customization in accumulation charts can be found in the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/accumulation-chart/legend/"
            aria-label="Navigate to the documentation for Legend in TypeScript Accumulation Chart control">documentation</a>.
        </p>
      </div>
    </div>
  );
};

export default AccumulationLegendTemplate;

