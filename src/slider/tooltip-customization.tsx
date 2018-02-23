import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SliderComponent, SliderTickEventArgs, SliderTooltipEventArgs } from '@syncfusion/ej2-react-inputs';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { isNullOrUndefined } from '@syncfusion/ej2-base';


const slidercss = `
.sliderwrap .label-text {
    font-weight: 500;
}

.content-wrapper {
    width: 80%;
    margin: 0 auto;
    min-width: 185px;
}

.sliderwrap {
    margin-top: 40px;
}

#slider01 .e-material-handle,
#out .e-material-handle,
.bootstrap #out .e-handle,
.bootstrap #slider01 .e-handle,
.fabric #out .e-handle,
.fabric #slider01 .e-handle,
.highcontrast #out .e-handle,
.highcontrast #slider01 .e-handle {
    background-color: #ffd939;
    border-color: #ffd939;
    z-index: 1;
}

.e-bigger .content-wrapper {
    width: 80%;
}

.sliderwrap label {
    padding-bottom: 26px;
    font-size: 13px;
    font-weight: 500;
    margin-top: 15px;
}

.userselect {
    -webkit-user-select: none;
    /* Safari 3.1+ */
    -moz-user-select: none;
    /* Firefox 2+ */
    -ms-user-select: none;
    /* IE 10+ */
    user-select: none;
    /* Standard syntax */
}



.e-slider-tooltip.e-tooltip-wrap.e-popup.e-slider-tooltip .e-tip-content,
.e-slider-tooltip.e-tooltip-wrap.e-popup.e-material-range .e-tip-content.e-material-tooltip-show {
    color: #333;
}

.e-slider-tooltip.e-tooltip-wrap.e-popup.e-material-range .e-arrow-tip-inner {
    color: #ffd939;
}

.e-slider-tooltip.e-tooltip-wrap.e-popup.e-material-range.e-slider-horizontal-before .e-arrow-tip-outer {
    border-top-color: #ffd939;

}

.e-slider-tooltip.e-tooltip-wrap.e-popup.e-material-range.e-slider-horizontal-after .e-arrow-tip-outer {
    border-bottom-color: #ffd939;
}

.e-slider-container .e-slider#slider01 .e-range,
.e-slider-container .e-slider#out .e-range {
    background-color: #0375be;
    z-index: unset;
}

.e-slider-tooltip.e-tooltip-wrap.e-popup.e-material-range,
.e-slider-tooltip.e-tooltip-wrap.e-popup {
    background-color: #ffd939;
    border-color: #ffd939;
}

`
export class TooltipCustomization extends SampleBase<{}, {}> {
    // Set slider minimum and maximum values
    // new Date(Year, Month, day, hours, minutes, seconds, millseconds)
    public min: any = new Date(2013, 6, 13, 11).getTime();
    public sliderMin: any = new Date(2013, 6, 13, 11).getTime();
    public sliderMax: any = new Date(2013, 6, 13, 23).getTime();
    public max: any = new Date(2013, 6, 13, 23).getTime();
    // Initialize ticks with placement, largestep, smallste
    public value: any = [new Date(2013, 6, 13, 12).getTime(), new Date(2013, 6, 13, 18).getTime()];
    public sliderValue: any = new Date(2013, 6, 13, 17).getTime();
    public ticks: object = {
        placement: 'After',
        // 3 * 3600000 milliseconds = 3 Hour
        largeStep: 3 * 3600000,
        smallStep: 3600000, showSmallTicks: true
    };
    // Initialize tooltip with placement
    public tooltip: object = {
        placement: 'Before', isVisible: true
    };
    public sliderTooltip: object = {
        placement: 'Before', isVisible: true
    };
    private timeObj: SliderComponent;
    private sliderObj: SliderComponent;
    public tooltipChangeHandler(args: SliderTooltipEventArgs): void {
        /**
         * toLocaleTimeString is predefined javascript date function, which is used to
         * customize the date in different format
         */
        let custom: { [key: string]: string } = { hour: '2-digit', minute: '2-digit' };
        // Splitting the range values from the tooltip using space into an array.
        if (args.text.indexOf('-') !== -1) {
            let totalMiliSeconds: string[] = args.text.split(' ');
            // First part is the first handle value
            let firstPart: string = totalMiliSeconds[0];
            // Second part is the second handle value
            let secondPart: string = totalMiliSeconds[2];

            firstPart = new Date(Number(firstPart)).toLocaleTimeString('en-us', custom);
            secondPart = new Date(Number(secondPart)).toLocaleTimeString('en-us', custom);
            // Assigning our custom text to the tooltip value.
            args.text = firstPart + ' - ' + secondPart;
        } else {
            args.text = 'Until ' + new Date(Number(args.text)).toLocaleTimeString('en-us', custom);
        }
    }
    public onCreated01(args: any): void {
        let element01: any = document.getElementById('slider01');
        element01.ej2_instances[0].keyUp({ keyCode: 9, target: element01.ej2_instances[0].secondHandle });
        element01.ej2_instances[0].secondHandle.focus();
    }
    public sliderTicks: any = {
        placement: 'After',
        // 3 * 3600000 milliseconds = 3 Hour
        largeStep: 3 * 3600000,
        smallStep: 3600000, showSmallTicks: true
    };
    public onRenderingTicks(args: SliderTickEventArgs) {
        let totalMiliSeconds: number = Number(args.value);
        /**
         * toLocaleTimeString is predefined javascript date function, which is used to
         * customize the date in different format
         */
        let custom: { [key: string]: string } = { hour: '2-digit', minute: '2-digit' };
        // Assigning our custom text to the tick value.
        args.text = new Date(totalMiliSeconds).toLocaleTimeString('en-us', custom);
    }

    // Handler used to reposition the tooltip on page scroll
    public onScroll(): void {
        if (!isNullOrUndefined(document.getElementById('slider01')) &&
            !isNullOrUndefined((document.getElementById('slider01') as any).ej2_instances[0]) && !isNullOrUndefined(document.getElementById('out')) &&
            !isNullOrUndefined((document.getElementById('out') as any).ej2_instances[0])) {
            let element01: any = document.getElementById('slider01');
            let element02: any = document.getElementById('out');
            element01.ej2_instances[0].refreshTooltip();
            element02.ej2_instances[0].refreshTooltip();
        }
    }



    render() {
        if (!isNullOrUndefined(document.getElementById('right-pane'))) {
            document.getElementById('right-pane').addEventListener('scroll', this.onScroll);
        }
        return (
            <div className='control-pane'>
                <style>{slidercss}</style>
                <div className='col-lg-12-control-section'>
                    <div className="content-wrapper" >
                        <div className="sliderwrap">
                            <label className="labeltext userselect">
                                <span className="label-text">Background color</span>
                            </label>

                            <SliderComponent id="slider01" value={this.value} min={this.min} max={this.max} step={3600000 / 6} ticks={this.ticks} type="Range" tooltip={this.tooltip} tooltipChange={this.tooltipChangeHandler.bind(this)} ref={(slider) => { this.timeObj = slider }} created={this.onCreated01.bind(this)} renderingTicks={this.onRenderingTicks.bind(this)} />
                        </div>
                        <div className="sliderwrap">
                            <label className="labeltext userselect">
                                <span className="label-text">Color and text</span>
                            </label>
                            {/* Ticks slider element - */}
                            <SliderComponent id="out" value={new Date(2013, 6, 13, 17).getTime()} min={this.sliderMin} max={this.sliderMax} step={3600000 / 6} ticks={this.sliderTicks} type="MinRange" tooltip={this.sliderTooltip} tooltipChange={this.tooltipChangeHandler.bind(this)} ref={(slider) => { this.sliderObj = slider }} renderingTicks={this.onRenderingTicks.bind(this)} />
                        </div>
                    </div>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the customization of Slider's Tooltip. Drag the thumb over the bar for selecting the values
                    between min and max.</p>
                </div>

                <div id="description">
                    <p>In this demo, we have demonstrated the following customization of Tooltip using CSS.</p>
                    <ul>
                        <li>Background color - In this sample, Tooltip has been customized to custom color.</li>
                        <li>Color and text - In this sample, Tooltip and its content has been customized to custom color.</li>
                    </ul>
                </div>
            </div>
        )
    }
}
