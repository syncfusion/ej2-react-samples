import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SliderComponent, SliderTooltipEventArgs, SliderTickEventArgs } from '@syncfusion/ej2-react-inputs';
import { SampleBase } from '../common/sample-base';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { isNullOrUndefined } from '@syncfusion/ej2-base';


const slidercss = `  
.content-wrapper {
    width: 40%;
    margin: 0 auto;
    min-width: 185px;
}

.sliderwrap {
    margin-top: 40px;
}
.e-bigger .content-wrapper {
    width: 80%;
}
.sliderwrap label {
    padding-bottom: 26px;
    font-size: 13px;
    font-weight: 500;
    margin-top: 15px;
    text-align: left;
    width: 100%;
}
`
export class Format extends SampleBase<{}, {}> {
    private currencyObj: SliderComponent;
    private kilometerObj: SliderComponent;
    private timeObj: SliderComponent;
    public currencyTicks: object = {
        placement: 'After', largeStep: 25, smallStep: 5, showSmallTicks: true,
        // Formatting ticks value in currency with 3-decimal specifier.
        format: 'c1'
    };
    public currencyTooltip: object = {
        placement: 'Before', isVisible: true,
        // Formatting tooltip value in currency with 2-decimal specifier.
        format: 'c2'
    };
    public kilometerTicks: object = {
        placement: 'After',
        largeStep: 400,
        smallStep: 200,
        showSmallTicks: true,
        /**
         * Formatting ticks value in numeric with 2-decimal specifier if the any decimal values occurred.
         * Zeros will be filled if the values are not in 4-digits in the fractional part.
         */
        format: '00##.## km'
    };
    public kilometerTooltip: object = {
        placement: 'Before',
        isVisible: true,
        /**
         * Formatting tooltip value in numeric with 2-decimal specifier if the any decimal values occurred.
         * Zeros will be filled if the values are not in 4-digits in the fractional part.
         */
        format: '00##.## km'
    }
    public minValue: any = new Date(2013, 6, 13, 11).getTime();
    public maxValue: any = new Date(2013, 6, 13, 23).getTime();
    // 3600000 milliseconds = 1 Hour, 3600000 / 6 milliseconds = 10 Minutes
    public stepValue: number = 3600000 / 6;
    public value: any = [new Date(2013, 6, 13, 12).getTime(), new Date(2013, 6, 13, 18).getTime()];
    public timeTooltip: any = {
        placement: 'Before', isVisible: true
    };

    public timeTicks: any = {
        placement: 'After',
        // 3 * 3600000 milliseconds = 3 Hour
        largeStep: 3 * 3600000,
        smallStep: 3600000, showSmallTicks: true
    };
    public tooltipChangeHandler(args: SliderTooltipEventArgs): void {
        // Splitting the range values from the tooltip using space into an array.
        let totalMiliSeconds: string[] = args.text.split(' ');
        // First part is the first handle value
        let firstPart: string = totalMiliSeconds[0];
        // Second part is the second handle value
        let secondPart: string = totalMiliSeconds[2];
        /**
         * toLocaleTimeString is predefined javascript date function, which is used to
         * customize the date in different format
         */
        let custom: { [key: string]: string } = { hour: '2-digit', minute: '2-digit' };
        firstPart = new Date(Number(firstPart)).toLocaleTimeString('en-us', custom);
        secondPart = new Date(Number(secondPart)).toLocaleTimeString('en-us', custom);
        // Assigning our custom text to the tooltip value.
        args.text = firstPart + ' - ' + secondPart;
    }
    public renderingTicksHandler(args: SliderTickEventArgs): void {
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
        !isNullOrUndefined((document.getElementById('slider01') as any).ej2_instances[0]) && !isNullOrUndefined(document.getElementById('slider02')) &&
        !isNullOrUndefined((document.getElementById('slider02') as any).ej2_instances[0]) && !isNullOrUndefined(document.getElementById('slider03')) &&
        !isNullOrUndefined((document.getElementById('slider03') as any).ej2_instances[0])) {
            let element01: any = document.getElementById('slider01');
            let element02: any = document.getElementById('slider02');
            let element03: any = document.getElementById('slider03');
            for (let slider of [element01, element02, element03]) {
                slider.ej2_instances[0].refreshTooltip(slider.ej2_instances[0].tooltipTarget);
            }
        }
    }

    render() {
        if (!isNullOrUndefined(document.getElementById('right-pane'))) {
            document.getElementById('right-pane').addEventListener('scroll', this.onScroll);
        }
        return (
            <div>
                <div className="col-lg-12 control-section">
                    <div className="content-wrapper">
                        <style>{slidercss}</style>
                        <div className='sliderwrap'>
                            <label>Currency Slider</label>
                            {/* Initialize Slider Component with type Range */}
                            <SliderComponent id="slider01" value={[20, 80]} min={0} max={100} ticks={this.currencyTicks} tooltip={this.currencyTooltip} type='Range' ref={(slider) => { this.currencyObj = slider }} />
                        </div>
                        <div className='sliderwrap'>
                            <label>Kilometer Slider</label>
                            {/* Initialize Slider Component with type Range */}
                            <SliderComponent id="slider02" value={[1100, 1850]} min={900} max={2100} ticks={this.kilometerTicks} type='Range' tooltip={this.kilometerTooltip} ref={(slider) => { this.kilometerObj = slider }} />
                        </div>
                        <div className='sliderwrap'>
                            <label>Time Slider</label>
                            {/* Initialize Slider Component with type Range */}
                            <SliderComponent id="slider03" value={this.value} min={this.minValue} max={this.maxValue} ticks={this.timeTicks} type='Range' step={this.stepValue} tooltip={this.timeTooltip} tooltipChange={this.tooltipChangeHandler.bind(this)} renderingTicks={this.renderingTicksHandler.bind(this)} ref={(slider) => { this.timeObj = slider }} />
                        </div>
                    </div>
                </div>

                <div id="action-description">
                    <p>This sample demonstrates the formatting of Ticks and Tooltip of Slider. Drag the thumb over the bar for selecting the
                    formatted values between min and max.</p>
                </div>

                <div id="description">
                    <p>The format feature used to customize the units of Slider values to desired format. The formatted values will also be
                    applied to the ARIA attributes of the slider</p>
                    <p>In this demo, we have demonstrated Slider with Currency, Kilometer and Time formatting.</p>
                    <ul>
                        <li>Currency Slider – In this sample, Ticks and Tooltip are formatted to currency using format API in both tooltip and
                        ticks. </li>
                        <li>Kilometer Slider – In this sample, Ticks and Tooltip are formatted to Kilometer using format API in both tooltip
                        and ticks. </li>
                        <li>Time Slider – In this sample, Ticks and Tooltip are formatted to Time using change event in Tooltip and renderingTicks
                        event in Ticks</li>
                    </ul>
                    <p>For more information, we can refer the
                    <a target="_blank" href="http://ej2.syncfusion.com/documentation/slider/format.html?lang=es6">Format</a> section from the documentation.</p>
                </div>

            </div>
        )
    }
}
