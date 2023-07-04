import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { SliderComponent, NumericTextBoxComponent, SliderChangeEventArgs, SliderOrientation } from '@syncfusion/ej2-react-inputs';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { ChangeEventArgs } from '@syncfusion/ej2-buttons';
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

const APIs = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const [min, setMin] = useState<number>(0);
    const [max, setMax] = useState<number>(100);
    const [value, setValue] = useState<number>(30);
    const [step, setStep] = useState<number>(1);
    const [orientation, setOrientation] = useState<SliderOrientation>("Horizontal");
    const [readonly, setReadonly] = useState<boolean>(false);
    const [enabled, setEnabled] = useState<boolean>(true);
    const [button, setButton] = useState<boolean>(false);
    /**
 * slider property customization
 */
    let defaultObj = useRef<SliderComponent>(null);
    let tooltip: object = { placement: 'Before', isVisible: true, showOn: 'Focus' };
    let ticks: object = { placement: 'Before', largeStep: 20 };
    const onValueChange = (args: any): void => {
        setValue(args.value);
    }

    const onMinChange = (args: any): void => {
        setMin(args.value);
    }

    const onMaxChange = (args: any): void => {
        setMax(args.value);
    }

    const onStepChange = (args: any): void => {
        setStep(args.value);
    }

    const onOrientationChange = (args: ChangeEventArgs): void => {
        setOrientation(args.checked ? "Vertical" : "Horizontal");
    }

    const onReadonlyChange = (args: ChangeEventArgs): void => {
        setReadonly(args.checked);
    }

    const onDisableChange = (args: ChangeEventArgs): void => {
        setEnabled(!args.checked);
    }

    const onButtonChange = (args: any): void => {
        setButton(args.checked);
    }

    const refreshTooltip = (e: any): void => {
        if ((defaultObj as any).current) {
            (defaultObj as any).current.refreshTooltip((defaultObj as any).tooltipTarget);
        }
    }

    const sliderChange = (args: SliderChangeEventArgs): void => {
        setValue(args.value as number);
    }

    if (!isNullOrUndefined(document.getElementById('right-pane'))) {
        document.getElementById('right-pane').addEventListener('scroll', refreshTooltip.bind(this));
    }
    return (
        <div className='control-pane'>
            <style>{slidercss}</style>
            <div className='control-section'>
                <div className='col-lg-8'>
                    <div className="content-wrapper" id="all-option-sample">
                        <div className='sliderwrap'>
                            <SliderComponent id='slider' value={value} min={min} max={max} orientation={orientation} enabled={enabled} step={step} readonly={readonly} showButtons={button} change={sliderChange.bind(this)} ticks={ticks} tooltip={tooltip} type='MinRange' ref={defaultObj} />
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
                                            <NumericTextBoxComponent value={value} format='n0' change={onValueChange.bind(this)} />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: '50%' }}>
                                        <div className="userselect">Min</div>
                                    </td>
                                    <td style={{ width: '50%' }}>
                                        <div>
                                            <NumericTextBoxComponent value={0} format='n0' change={onMinChange.bind(this)} />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: '50%' }}>
                                        <div className="userselect">Max</div>
                                    </td>
                                    <td style={{ width: '50%' }}>
                                        <div>
                                            <NumericTextBoxComponent value={100} format='n0' change={onMaxChange.bind(this)} />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: '50%' }}>
                                        <div className="userselect">Step</div>
                                    </td>
                                    <td style={{ width: '50%' }}>
                                        <div>
                                            <NumericTextBoxComponent value={1} change={onStepChange.bind(this)} />
                                        </div>
                                    </td>
                                </tr>
                                <tr id="desktop-checkbox-row-1">
                                    <td style={{ width: "50%" }}>
                                        <div className="userselect" style={{ paddingLeft: "0" }}>
                                            <CheckBoxComponent id="button" label={"Show Buttons"} checked={false} change={onButtonChange.bind(this)} />
                                        </div>
                                    </td>
                                    <td style={{ width: "50%", paddingRight: '10px' }}>
                                        <div style={{ paddingLeft: "0", paddingTop: "10" }}>
                                            <CheckBoxComponent id="disabled" label={"Disable"} checked={false} change={onDisableChange.bind(this)} />
                                        </div>
                                    </td>
                                </tr>
                                <tr id="desktop-checkbox-row-2">
                                    <td style={{ width: "50%", paddingRight: '10px' }}>
                                        <div style={{ paddingLeft: "0", paddingTop: "0" }}>
                                            <CheckBoxComponent id="readOnly" label={"Read Only"} checked={false} change={onReadonlyChange.bind(this)} />
                                        </div>
                                    </td>
                                    <td style={{ width: "50%" }}>
                                        <div className="userselect" style={{ paddingLeft: "0" }}>
                                            <CheckBoxComponent id="orientation" label={"Vertical Orientation"} checked={false} change={onOrientationChange.bind(this)} />
                                        </div>
                                    </td>
                                </tr>
                                <tr id="mobile-checkbox-row-1">
                                    <td style={{ width: "50%" }}>
                                        <div className="userselect" style={{ paddingLeft: "0" }}>Show Buttons</div>
                                    </td>
                                    <td style={{ width: "50%", paddingRight: '10px' }}>
                                        <div style={{ paddingLeft: "0", paddingTop: "0" }}>
                                            <CheckBoxComponent id="mb-button" checked={false} change={onButtonChange.bind(this)} />
                                        </div>
                                    </td>
                                </tr>
                                <tr id="mobile-checkbox-row-2">
                                    <td style={{ width: "50%" }}>
                                        <div className="userselect" style={{ paddingLeft: "0" }}>Disabled</div>
                                    </td>
                                    <td style={{ width: "50%", paddingRight: '10px' }}>
                                        <div style={{ paddingLeft: "0", paddingTop: "0" }}>
                                            <CheckBoxComponent id="mb-disabled" checked={false} change={onDisableChange.bind(this)} />
                                        </div>
                                    </td>
                                </tr>
                                <tr id="mobile-checkbox-row-3">
                                    <td style={{ width: "50%" }}>
                                        <div className="userselect" style={{ paddingLeft: "0" }}>Vertical Orientation</div>
                                    </td>
                                    <td style={{ width: "50%", paddingRight: '10px' }}>
                                        <div style={{ paddingLeft: "0", paddingTop: "0" }}>
                                            <CheckBoxComponent id="mb-orientation" checked={false} change={onOrientationChange.bind(this)} />
                                        </div>
                                    </td>
                                </tr>
                                <tr id="mobile-checkbox-row-4">
                                    <td style={{ width: "50%" }}>
                                        <div className="userselect" style={{ paddingLeft: "0" }}>Readonly</div>
                                    </td>
                                    <td style={{ width: "50%", paddingRight: '10px' }}>
                                        <div style={{ paddingLeft: "0", paddingTop: "0" }}>
                                            <CheckBoxComponent id="mb-readOnly" checked={false} change={onReadonlyChange.bind(this)} />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates the customization of Slider component by using its properties from property pane. Select any
                    combination of properties from property pane to customize Slider component.
                </p>
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
export default APIs;
