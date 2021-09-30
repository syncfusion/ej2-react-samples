import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SliderComponent } from '@syncfusion/ej2-react-inputs';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { PropertyPane } from '../common/property-pane';

const slidercss = `  
.content-wrapper {
    width: 52%;
    margin: 0 auto;
    min-width: 185px;
}

.sliderwrap {
    margin-top: 45px;
}
.e-bigger .content-wrapper {
    width: 80%;
}
.sliderwrap label {
    padding-bottom: 50px;
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
`
export class Ticks extends SampleBase<{}, {}> {
    // Instance of the control
    private listObj: DropDownListComponent;
    private defaultObj: SliderComponent;
    private rangeObj: SliderComponent;
    // Initialize ticks with placement, largestep, smallstep
    public defaultTicks: object = { placement: 'Before', largeStep: 0.20, smallStep: 0.05, showSmallTicks: true };
    public rangeTicks: object = { placement: 'Before', largeStep: 20, smallStep: 5, showSmallTicks: true };
    //Dropdownlist datasource values for changing ticks placement for slider component
    public option: { [key: string]: Object }[] = [{ text: 'Before', value: 'Before' }, { text: 'After', value: 'After' },
    { text: 'Both', value: 'Both' }, { text: 'None', value: 'None' }];
    public fields: object = { value: 'value', text: 'text' };
    // Handling the dropdown list change event to change slider ticks position
    public change(): void {
        this.defaultObj.ticks = { placement: this.listObj.value as any };
        this.defaultObj.dataBind();
        this.rangeObj.ticks = { placement: this.listObj.value as any };
        this.rangeObj.dataBind();
    }
    // Handler used to enable or disable sliders
    public onChange(args: ChangeEventArgs): void {
        this.defaultObj.enabled = !args.checked;
        this.rangeObj.enabled = !args.checked;
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div className='col-lg-8'>
                        <div className="content-wrapper">
                            <style>{slidercss}</style>
                            <div className='sliderwrap'>
                                <label>Default Slider</label>
                                {/* Initialize Slider Component with ticks with placement, largestep, smallstep */}
                                <SliderComponent value={0.3} min={0.1} max={0.9} step={0.05} ticks={this.defaultTicks} ref={(slider) => { this.defaultObj = slider }} />
                            </div>
                            <div className='sliderwrap'>
                                <label>Range Slider</label>
                                {/* Initialize Range Slider Component with ticks with placement, largestep, smallstep */}
                                <SliderComponent value={[30, 70]} min={10} max={90} step={5} type='Range' ticks={this.rangeTicks} ref={(slider) => { this.rangeObj = slider }} />
                            </div>
                        </div>
                    </div>
                    <div id="#slider_event" className='col-lg-4 property-section'>
                        <PropertyPane title='Properties'>
                            <table id="property" title="Properties" className='property-panel-table' style={{ width: '100%' }}>
                                <tbody>
                                    <tr>
                                        <td style={{ width: '50%' }}>
                                            <div className="userselect">Placement</div>
                                        </td>
                                        <td style={{ width: '50%', paddingRight: '10px' }}>
                                            <div>
                                                <DropDownListComponent dataSource={this.option} fields={this.fields} index={0} placeholder="Select a Placement" popupHeight="200px" ref={(dropdownlist) => { this.listObj = dropdownlist }} change={this.change.bind(this)} />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: '50%', paddingTop: '12px' }}>
                                            <div className="userselect">Disabled</div>
                                        </td>
                                        <td style={{ width: '50%', paddingRight: '10px' }}>
                                            <div style={{ paddingleft: 0, paddingtop: 0 }}>
                                                {/* Initialize checkbox Component */}
                                                <CheckBoxComponent checked={false} change={this.onChange.bind(this)}></CheckBoxComponent>
                                            </div>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </PropertyPane>
                    </div>

                    <div id="action-description">
                        <p>This sample demonstrates the rendering of Slider component with Ticks placement. Drag the thumb over the bar for selecting
                    the values between min and max.</p>
                    </div>

                    <div id="description">
                        <p>The Ticks are the visual representation of the Slider values. The ticks are differentiated as small ticks and large ticks
                    based on its size. The ticks position can be defined by the
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/slider/ticksData/#smallstep"> smallStep</a> and
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/slider/ticksData/#largestep">largeStep</a> properties.</p>
                        <p> In this demo, we have demonstrated Ticks position with Default and Range Slider.</p>
                        <ul>
                            <li>Default Slider – In this sample, the small ticks and large ticks are rendered with the frequency of 0.05 and 0.20.</li>
                            <li>Range Slider – In this sample, the small ticks and large ticks are rendered with the frequency of 5 and 20.</li>
                        </ul>
                        <p> We can also change the Ticks placement of  Slider and Disable Slider component from the property pane.</p>
                        <p>We can use the below property to restrict the value range for the slider:</p>
                        <ul>
                            <li>
                                <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/slider/#step">step </a> - to define incremental/decremental step value for slider</li>
                            <li>
                                <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/slider/#min">min </a> – to specify minimum value of the slider</li>
                            <li>
                                <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/slider/#max">max </a> – to specify maximum value of the slider</li>
                        </ul>
                        <p>For more information, we can refer the
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/range-slider/ticks">ticks</a> section from the documentation.</p>
                    </div>
                </div>
            </div>
        )
    }
}
