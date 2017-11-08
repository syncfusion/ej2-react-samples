import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Accordion } from '@syncfusion/ej2-navigations';
import { Ajax } from '@syncfusion/ej2-base';
import { AccordionComponent, AccordionItemDirective, AccordionItemsDirective, ExpandEventArgs } from '@syncfusion/ej2-react-navigations';
import { SampleBase } from './sample-base';

export class AjaxContent extends SampleBase<{}, {}> {
    private acrdnObj: AccordionComponent;
    private nestAcrdn = AccordionComponent;
    public ajaxData: string
    public rendereComplete(): void {
        let ajax: Ajax = new Ajax('./src/accordion/Ajax_content.html', 'GET', true);
        ajax.send().then();
        ajax.onSuccess = (data: string): void => {
            // Load Accordion content on AJAX success
            this.acrdnObj.items[0].content = data;
            // Refreshing Accoridon Component with AJAX content
            this.acrdnObj.refresh();
        };
    }

    public expand(e: ExpandEventArgs): void {
        let checkMaterial: boolean = document.body.classList.contains('material');
        if (e.isExpanded && [].indexOf.call(this.acrdnObj.items, e.item) === 1) {
            if (e.element.querySelectorAll('.e-accordion').length > 0) {
                return;
            }
            //Initialize Nested Accordion component
            let nestAcrdn: Accordion = new Accordion({
                expandMode: 'Single',
                items: [
                    { header: 'Sensor', content: '#Sensor_features' },
                    { header: 'Camera', content: '#Camera_features' },
                    { header: 'Video Recording', content: '#Video_Rec_features' },
                ]
            });
            //Render initialized Nested Accordion component
            nestAcrdn.appendTo('#nested_Acc');
        }
    }
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section accordion-control-section'>
                    <div className='product_title' > iPhone X Product Specification </div>
                    {/* Render the Accoridon Component */}
                    <AccordionComponent expandMode='Single' expanding={this.expand.bind(this)} ref={accordion => this.acrdnObj = accordion}>
                        <AccordionItemsDirective>
                            <AccordionItemDirective header='Network & Connectivity' expanded={true} />
                            <AccordionItemDirective header='Feature' content='<div id="nested_Acc"></div>' />
                            <AccordionItemDirective header='Hardware & Software' content='#Hard_Soft_features' />
                        </AccordionItemsDirective>
                    </AccordionComponent>

                    <div id="Hard_Soft_features" style={{ display: 'none'}}>
                        <table>
                            <tbody><tr>
                                <th rowSpan={3}> Hardware</th>
                                <td rowSpan={2} className="e-bold">Chip</td>
                                <td>Apple A11 Bionic chip with 64-bit architecture</td>
                            </tr>
                                <tr>
                                    <td>Embedded M11 motion coprocessor</td>
                                </tr>
                                <tr>
                                    <td className="e-bold">Capacity</td>
                                    <td>64GB/256GB</td>
                                </tr>
                                <tr>
                                    <th> Software</th>
                                    <td className="e-bold">Operating System</td>
                                    <td>iOS 11</td>
                                </tr>
                            </tbody></table>
                    </div>
                    <div id="Sensor_features" style={{ display: 'none'}}>
                        <table>
                            <tbody><tr>
                                <td className="e-bold">Proximity sensor</td>
                                <td>Yes</td>
                            </tr>
                                <tr>
                                    <td className="e-bold">Face ID</td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td className="e-bold">Accelerometer</td>
                                    <td>Yes</td>
                                </tr>

                            </tbody></table>
                    </div>
                    <div id="Video_Rec_features" style={{ display: 'none'}}>
                        <table>
                            <tbody><tr>
                                <th className="e-bold" rowSpan={9}>Video Recording</th>
                            </tr>
                                <tr>
                                    <td className="e-bold">4K video recording</td>
                                </tr>
                                <tr>
                                    <td className="e-bold">1080p &amp; 720p HD video recording</td>
                                </tr>
                                <tr>
                                    <td className="e-bold">Optical zoom, 6x digital zoom</td>
                                </tr>
                                <tr>
                                    <td className="e-bold">Slow motion video support</td>
                                </tr>
                                <tr>
                                    <td className="e-bold">Take 8MP still photos while recording 4K video</td>
                                </tr>
                                <tr>
                                    <td className="e-bold">Noise reduction</td>
                                </tr>
                            </tbody></table>
                    </div>
                    <div id="Camera_features" style={{ display: 'none'}}>
                        <table>
                            <tbody><tr>
                                <th className="e-bold" rowSpan={3}>Camera</th>
                                <td className="e-bold"> 12MP wide-angle</td>
                            </tr>
                                <tr>
                                    <td className="e-bold">Live Photos with stabilization</td>
                                </tr>
                                <tr>
                                    <td className="e-bold">Body and face detection</td>
                                </tr>
                                <tr>
                                    <th className="e-bold" rowSpan={4} >TrueDepth Camera</th>
                                    <td className="e-bold"> 7MP camera</td>
                                </tr>
                                <tr>
                                    <td className="e-bold"> Animoji</td>
                                </tr>
                                <tr>
                                    <td className="e-bold"> Face detection</td>
                                </tr>
                            </tbody></table>
                    </div>
                </div>
                <div id='source_link'>Source: &nbsp;
                         <a href="https://www.apple.com/iphone-x/specs/" target='_blank'>www.apple.com/iphone-x/specs/</a>
                    </div>
            </div>);
    }
}
ReactDOM.render(<AjaxContent />, document.getElementById('sample'));