import * as React from "react";
import * as ReactDOM from "react-dom";
import { LinearGaugeComponent, Orientation, ContainerType, AxesDirective, AxisDirective, PointersDirective, PointerDirective, RangesDirective, RangeDirective } from '@syncfusion/ej2-react-lineargauge';
import { PropertyPane } from './property-pane';
import { SampleBase } from './sample-base';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

/**
 * Container sample
 */
export class Container extends SampleBase<{}, {}> {
    private gaugeInstance: LinearGaugeComponent;
    private orientationElement: DropDownListComponent;
    private containerElement: DropDownListComponent;
    private orienatationChange(): void {
        this.gaugeInstance.orientation = this.orientationElement.value as Orientation;
        this.gaugeInstance.refresh();
    }
    private containerChange(): void {
        this.gaugeInstance.container.type = this.containerElement.value as ContainerType;
        this.gaugeInstance.refresh();
    }
    private droplist: { [key: string]: Object }[] = [
        { value: 'Vertical' },
        { value: 'Horizontal' }
    ];
    private modelist: { [key: string]: Object }[] = [
        { value: 'Normal' },
        { value: 'RoundedRectangle' },
        { value: 'Thermometer' }
    ];
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section row'>
                    <div className='col-lg-8'>
                        <LinearGaugeComponent id='gauge' ref={gauge => this.gaugeInstance = gauge} title='Temperature Measure' container={{ width: 13, type: 'Thermometer', roundedCornerRadius: 5 }}>
                            <AxesDirective>
                                <AxisDirective minimum={0} maximum={180} line={{ width: 0 }} minorTicks={{ color: '#9e9e9e' }} majorTicks={{ interval: 20, color: '#9e9e9e' }} labelStyle={{ font: { color: '#000000' } }}>
                                    <PointersDirective>
                                        <PointerDirective value={90} height={13} width={13} type='Bar' roundedCornerRadius={5} color='#f02828'>
                                        </PointerDirective>
                                    </PointersDirective>
                                </AxisDirective>
                                <AxisDirective minimum={0} maximum={180} opposedPosition={true} line={{ width: 0 }} majorTicks={{ interval: 20 }} labelStyle={{ font: { color: '#000000' } }}>
                                    <PointersDirective>
                                        <PointerDirective width={0}>
                                        </PointerDirective>
                                    </PointersDirective>
                                </AxisDirective>
                            </AxesDirective>
                        </LinearGaugeComponent>
                    </div>
                    <div className='col-lg-4 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div>Orientation</div>
                                    </td>
                                    <td>
                                    <div>
                                    <DropDownListComponent width={120} id="orientationMode" style={{ "width": "90%" }} change={this.orienatationChange.bind(this)} className="form-control" ref={d => this.orientationElement = d} dataSource={this.droplist} fields={{text: 'value', value: 'value'}} value="Vertical"/>
                                    </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div>Container Type</div>
                                    </td>
                                    <td>
                                    <div style={{ paddingBottom: '20px', width: '90%' }}>
                                    <DropDownListComponent width={120} id="containerMode" style={{ "width": "90%" }} change={this.containerChange.bind(this)} className="form-control" ref={d => this.containerElement = d} dataSource={this.modelist} fields={{text: 'value', value: 'value'}} value="Normal"/>
                                    </div>
                                    </td>
                                </tr>
                            </table>
                        </PropertyPane>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Container />, document.getElementById('sample'));