/**
 * Sample for tooltip
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PropertyPane } from '../common/property-pane';
import {
    CircularGaugeComponent, AxesDirective, ILoadedEventArgs, GaugeTheme, AxisDirective, ITooltipRenderEventArgs, Inject, AnnotationsDirective, AnnotationDirective,
    PointersDirective, PointerDirective, RangesDirective, RangeDirective, GaugeTooltip, TickModel, getRangeColor, IPointerDragEventArgs,
} from '@syncfusion/ej2-react-circulargauge';
import { SampleBase } from '../common/sample-base';
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }
    #templateWrap img {
        border-radius: 30px;
        width: 30px;
        height: 30px;
        margin: 0 auto;
    }
	 #templateWrap {
        background: #fff;
        padding: 3px;
        border-radius: 2px;
    }
    #templateWrap .des {
        float: right;
        padding-left: 10px;
        line-height: 30px;
    }`;
    
export class Tooltip extends SampleBase<{}, {}> {
    private gauge: CircularGaugeComponent;
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)) as GaugeTheme;
    }
    // custom code end
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section row'>
                    <div className='col-lg-12'>
                        <CircularGaugeComponent title='Tooltip Customization' loaded={this.onChartLoad.bind(this)} tooltipRender={this.tooltipRender.bind(this)} dragEnd={this.dragEnd.bind(this)} id='tooltip-container' ref={gauge => this.gauge = gauge} enablePointerDrag={true}
                            load={this.load.bind(this)}
                            titleStyle={{ size: '15px', color: 'grey' }} tooltip={{
                                enable: true,
                                type: ['Range', 'Pointer'],                             
								enableAnimation: false
                            }}>
                            <Inject services={[GaugeTooltip]} />
                            <AxesDirective>
                                <AxisDirective startAngle={240} endAngle={120} radius='90%' minimum={0} maximum={120}
                                    majorTicks={{
                                        color: 'white', offset: -5, height: 12
                                    }}
                                    lineStyle={{ width: 0 }}
                                    minorTicks={{
                                        width: 0
                                    }} labelStyle={{
                                        useRangeColor: true, font: { color: '#424242', size: '13px', fontFamily: 'Roboto' }
                                    }}>
                                    <PointersDirective>
                                        <PointerDirective value={70} radius='60%'
                                            cap={{
                                                radius: 10, border: { color: '#33BCBD', width: 5 }
                                            }}
                                            animation={{
                                                enable: true, duration: 1500
                                            }} color='#33BCBD' />
                                    </PointersDirective>
                                    <RangesDirective>
                                        <RangeDirective start={0} end={50} radius='102%' color='#3A5DC8' startWidth={10} endWidth={10} />
                                        <RangeDirective start={50} end={120} radius='102%' color='#33BCBD' startWidth={10} endWidth={10} />
                                    </RangesDirective>
                                </AxisDirective>
                            </AxesDirective>
                        </CircularGaugeComponent>
                    </div>
                </div>
                <div id="action-description">
                <p>
                This sample visualizes the tooltip of pointer value and ranges in gauge. To see the tooltip in action, hover pointer or tap the pointer
            </p>
                </div>
                <div id="description">
                    <p>
                    This sample visualizes the tooltip of pointer value and ranges in gauge. To see the tooltip in action, hover pointer or tap the pointer
                    </p>
                    <br />
                    <p className='description-header'>Injecting Module</p>
                    <p>Circular gauge component features are segregated into individual feature-wise modules. To use tooltip, we need to inject
                        <code>GaugeTooltip</code> module into services.
                    </p>
                    <p>
                        More information on the tooltip can be found in this
                        <a target="_blank" href="http://ej2.syncfusion.com/documentation"> documentation section</a>.
                    </p>
                </div>
            </div>
        )
    }
    public onChartLoad(args: ILoadedEventArgs): void {
        document.getElementById('tooltip-container').setAttribute('title', '');
    };

    public tooltipRender(args: ITooltipRenderEventArgs): void {
        let imageName: string; let borderColor: string;
		let textColor: string;
        if(args.pointer) {
            imageName = ((args.pointer.currentValue >= 0 && args.pointer.currentValue <= 50) ? 'min' : 'max');
            borderColor = ((args.pointer.currentValue >= 0 && args.pointer.currentValue <= 50) ? '#3A5DC8' : '#33BCBD');
            textColor = this.gauge.theme.toLowerCase() === 'highcontrast' ? 'White' : borderColor;
            if (this.gauge.theme.toLowerCase() === 'highcontrast') {
                args.tooltip.template = '<div id="templateWrap" style="border:2px solid ' + borderColor +
               ';background-color:black"><img src="src/circular-gauge/images/' + imageName + '.png"/><div class="des" style="color: ' +
               textColor + '"><span>${value} MPH</span></div></div>';
            } else {
                args.tooltip.template = '<div id="templateWrap" style="border:2px solid ' + borderColor +
               '"><img src="src/circular-gauge/images/' + imageName + '.png"/><div class="des" style="color: ' +
               borderColor + '"><span>${value} MPH</span></div></div>';
            }
            
        } else if (args.range){
            imageName = ((args.range.start >= 0 && args.range.end <= 50)) ? 'min' : 'max';
            borderColor = ((args.range.start >= 0 && args.range.end <= 50)) ? '#3A5DC8' : '#33BCBD';
			textColor = this.gauge.theme.toLowerCase() === 'highcontrast' ? 'White' : borderColor;
            let start : number = args.range.start;
            let end : number = args.range.end;
            if (this.gauge.theme.toLowerCase() === 'highcontrast') {
                args.tooltip.rangeSettings.template = '<div id=templateWrap style="padding:5px;border:2px solid' + borderColor + ';color: ' +
                textColor + ';background-color:black"><img src="src/circular-gauge/images/' + imageName +
                '.png"/> <span>' + start + ' - ' + end + ' MPH  </span> </div>';
            } else {
                args.tooltip.rangeSettings.template = '<div id=templateWrap style="padding:5px;border:2px solid' + borderColor + ';color: ' +
                borderColor + '"><img src="src/circular-gauge/images/' + imageName +
                '.png"/> <span>' + start + ' - ' + end + ' MPH  </span> </div>';
            }

            
        }
    };
    public dragEnd(args: IPointerDragEventArgs): void {
        if(args.currentValue >= 0 && args.currentValue <= 50) {
            args.pointer.color = "#3A5DC8";
            args.pointer.cap.border.color = "#3A5DC8";
        } else {
            args.pointer.color = "#33BCBD";
            args.pointer.cap.border.color = "#33BCBD";
        }
		args.pointer.value = args.currentValue;
        args.pointer.animation.enable = false;
        this.gauge.refresh();
    };
}