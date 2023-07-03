import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SliderComponent, NumericTextBoxComponent, SliderChangeEventArgs } from '@syncfusion/ej2-react-inputs';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { isNullOrUndefined } from '@syncfusion/ej2-base';


const slidercss = `
.content-wrapper {
    width: 52%;
    margin: 0 auto;
    min-width: 185px;
}

.sliderwrap {
    margin-top: 30px;
}

.sb-mobile-prop-pane #all-option-table #desktop-checkbox-row-1,
.sb-mobile-prop-pane #all-option-table #desktop-checkbox-row-2 {
    display: none;

}

.sb-mobile-prop-pane #all-option-table #mobile-checkbox-row-1,
.sb-mobile-prop-pane #all-option-table #mobile-checkbox-row-2,
.sb-mobile-prop-pane #all-option-table #mobile-checkbox-row-3,
.sb-mobile-prop-pane #all-option-table #mobile-checkbox-row-4 {
    display: table-row;

}

#all-option-table #mobile-checkbox-row-1,
#all-option-table #mobile-checkbox-row-2,
#all-option-table #mobile-checkbox-row-3,
#all-option-table #mobile-checkbox-row-4 {
    display: none;

}

#all-option-table .property-panel-section .property-panel-content table#property tr {
    height: 50px;
}

#all-option-sample .e-slider-container.e-horizontal {
    margin-top: 160px;
}

#all-option-sample .e-slider-container.e-vertical {
    margin-left: 40%;
}

#all-option-sample.content-wrapper {
    height: 363px;
    width: 50%;
    margin: 0 auto;
    min-width: 185px;
}

.sliderwrap {
    height: 340px;
}

.e-bigger .content-wrapper {
    width: 50%;
}

.sliderwrap label {
    padding-bottom: 26px;
    font-size: 13px;
    font-weight: 500;
    margin-top: 15px;
    text-align: left;
    width: 100%;
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

.e-bigger .e-sidebar .sb-mobile-right-pane .property-section .e-numerictextbox {
    display: flex;
    padding-left: 0;
    text-align: center;
} 
`
export class APIs extends SampleBase<{}, {}> {
    /**
 * slider property customization
 */
    private defaultObj: SliderComponent;
    public tooltip: object = { placement: 'Before', isVisible: true, showOn: 'Focus' };
    public ticks: object = { placement: 'Before', largeStep: 20 };
    public tooltipplacement: { [key: string]: Object }[] = [{ text: 'Before', value: 'Before' }, { text: 'After', value: 'After' }];
    public ticksplacement: { [key: string]: Object }[] = [{ text: 'Before', value: 'Before' }, { text: 'After', value: 'After' }, { text: 'Both', value: 'Both' }, { text: 'None', value: 'None' }];
    public fields: object = { value: 'value', text: 'text' };
    public numbericValue: NumericTextBoxComponent;
    public onValueChange(args: any): void {
        this.defaultObj.value = args.value;
    }
    public onMinChange(args: any): void {
        this.defaultObj.min = args.value;
    }

    public onMaxChange(args: any): void {
        this.defaultObj.max = args.value;
    }

    public onStepChange(args: any): void {
        this.defaultObj.step = args.value;
    }
    public onChange(args: ChangeEventArgs): void {
        this.defaultObj.tooltip.isVisible = args.checked;
    }
    public onOrientationChange(args: ChangeEventArgs): void {
        args.checked ? this.defaultObj.orientation = 'Vertical' : this.defaultObj.orientation = 'Horizontal';
    }
    public onReadonlyChange(args: ChangeEventArgs): void {
        this.defaultObj.readonly = args.checked;
    }
    public onDisableChange(args: ChangeEventArgs): void {
        this.defaultObj.enabled = !args.checked;
    }
    public onTicksChange(args: any): void {
        this.defaultObj.ticks = { placement: args.value };
    }
    public onTooltipChange(args: any): void {
        this.defaultObj.tooltip = { placement: args.value };
    }
    public onButtonChange(args: any): void {
        args.checked ? this.defaultObj.showButtons = true : this.defaultObj.showButtons = false;
    }
    public refreshTooltip(e: any): void {
        if (this.defaultObj) {
            (this.defaultObj as any).refreshTooltip((this.defaultObj as any).tooltipTarget);
        }
    }
    public sliderChange(args: SliderChangeEventArgs): void {
        (this.numbericValue as any).value = args.value;
    }

    render() {
        if (!isNullOrUndefined(document.getElementById('right-pane'))) {
            document.getElementById('right-pane').addEventListener('scroll', this.refreshTooltip.bind(this));
        }
        return (
            <div className='control-pane'>
                <style>{slidercss}</style>
                <div className='control-section'>
                    <div className='col-lg-8'>
                        <div className="content-wrapper" id="all-option-sample">
                            <div className='sliderwrap'>
                                <SliderComponent id='slider' value={30} min={0} max={100} change={this.sliderChange.bind(this)} ticks={this.ticks} tooltip={this.tooltip} type='MinRange' ref={(slider) => { this.defaultObj = slider }} />
                            </div>
                        </div>
                    </div>
                    <div id="all-option-table" className="col-lg-4 property-section">
                        <PropertyPane title='Properties'>
                            <table id="property" title="Properties" className='property-panel-table' style={{ width: "100%" }}>
                                <tbody>
                                    <tr>
                                        <td style={{ width: '50%' }}>
                                            <div className="userselect">Value</div>
                                        </td>
                                        <td style={{ width: '50%' }}>
                                            <div>
                                                <NumericTextBoxComponent value={30} format='n0' change={this.onValueChange.bind(this)}
                                                    ref={(value) => { this.numbericValue = value }} />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: '50%' }}>
                                            <div className="userselect">Min</div>
                                        </td>
                                        <td style={{ width: '50%' }}>
                                            <div>
                                                <NumericTextBoxComponent value={0} format='n0' change={this.onMinChange.bind(this)} />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: '50%' }}>
                                            <div className="userselect">Max</div>
                                        </td>
                                        <td style={{ width: '50%' }}>
                                            <div>
                                                <NumericTextBoxComponent value={100} format='n0' change={this.onMaxChange.bind(this)} />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: '50%' }}>
                                            <div className="userselect">Step</div>
                                        </td>
                                        <td style={{ width: '50%' }}>
                                            <div>
                                                <NumericTextBoxComponent value={1} change={this.onStepChange.bind(this)} />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr id="desktop-checkbox-row-1">
                                        <td style={{ width: "50%" }}>
                                            <div className="userselect" style={{ paddingLeft: "0" }}>
                                                <CheckBoxComponent id="button" label={"Show Buttons"} checked={false} change={this.onButtonChange.bind(this)} />
                                            </div>
                                        </td>
                                        <td style={{ width: "50%", paddingRight: '10px' }}>
                                            <div style={{ paddingLeft: "0", paddingTop: "10" }}>
                                                <CheckBoxComponent id="disabled" label={"Disable"} checked={false} change={this.onDisableChange.bind(this)} />
                                            </div>
                                        </td>
                                    </tr>

                                    <tr id="desktop-checkbox-row-2">
                                        <td style={{ width: "50%", paddingRight: '10px' }}>
                                            <div style={{ paddingLeft: "0", paddingTop: "0" }}>
                                                <CheckBoxComponent id="readOnly" label={"Read Only"} checked={false} change={this.onReadonlyChange.bind(this)} />
                                            </div>
                                        </td>
                                        <td style={{ width: "50%" }}>
                                            <div className="userselect" style={{ paddingLeft: "0" }}>
                                                <CheckBoxComponent id="orientation" label={"Vertical Orientation"} checked={false} change={this.onOrientationChange.bind(this)} />
                                            </div>
                                        </td>
                                    </tr>

                                    <tr id="mobile-checkbox-row-1">
                                        <td style={{ width: "50%" }}>
                                            <div className="userselect" style={{ paddingLeft: "0" }}>Show Buttons
                                            </div>
                                        </td>
                                        <td style={{ width: "50%", paddingRight: '10px' }}>
                                            <div style={{ paddingLeft: "0", paddingTop: "0" }}>
                                                <CheckBoxComponent id="mb-button" checked={false} change={this.onButtonChange.bind(this)} />
                                            </div>
                                        </td>
                                    </tr>

                                    <tr id="mobile-checkbox-row-2">
                                        <td style={{ width: "50%" }}>
                                            <div className="userselect" style={{ paddingLeft: "0" }}>Disabled
                                            </div>
                                        </td>
                                        <td style={{ width: "50%", paddingRight: '10px' }}>
                                            <div style={{ paddingLeft: "0", paddingTop: "0" }}>
                                                <CheckBoxComponent id="mb-disabled" checked={false} change={this.onDisableChange.bind(this)} />
                                            </div>
                                        </td>
                                    </tr>

                                    <tr id="mobile-checkbox-row-3">
                                        <td style={{ width: "50%" }}>
                                            <div className="userselect" style={{ paddingLeft: "0" }}>Vertical Orientation
                                            </div>
                                        </td>
                                        <td style={{ width: "50%", paddingRight: '10px' }}>
                                            <div style={{ paddingLeft: "0", paddingTop: "0" }}>
                                                <CheckBoxComponent id="mb-orientation" checked={false} change={this.onOrientationChange.bind(this)} />
                                            </div>
                                        </td>
                                    </tr>

                                    <tr id="mobile-checkbox-row-4">
                                        <td style={{ width: "50%" }}>
                                            <div className="userselect" style={{ paddingLeft: "0" }}>Readonly
                                            </div>
                                        </td>
                                        <td style={{ width: "50%", paddingRight: '10px' }}>
                                            <div style={{ paddingLeft: "0", paddingTop: "0" }}>
                                                <CheckBoxComponent id="mb-readOnly" checked={false} change={this.onReadonlyChange.bind(this)} />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </PropertyPane>
                    </div>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the customization of Slider component by using its properties from property pane. Select any
                        combination of properties from property pane to customize Slider component.</p>
                </div>

                <div id="description">
                    <p>In this demo, we have rendered default slider with minimal configuration.</p>
                    <p>we can further customize this sample with the combination of Slider properties from the property pane. For example,</p>
                    <ul>
                        <li>Min, Max, Value and Steps can be changed from the property pane.</li>
                        <li>Ticks can be enabled by selecting the Ticks placement from the property pane.</li>
                        <li>Tooltip can be enabled by checking Show Tooltip checkbox from property pane.</li>
                        <li>Vertical orientation can be enabled by checking Vertical orientation from property pane and so on.</li>
                    </ul>
                </div>
            </div>
        )
    }
}
