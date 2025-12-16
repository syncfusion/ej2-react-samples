import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PropertyPane } from '../common/property-pane';
import { AdornmentsDirection, TextAreaComponent } from '@syncfusion/ej2-react-inputs';
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { SampleBase } from '../common/sample-base';
import './sample.css';
 
export class Adornments extends SampleBase<{}, {}> {
    private rows = 5;
    private cols = 250;
    public flowOrientationData: string[] = ['Horizontal', 'Vertical'];
    public orientOrientationData: string[] = ['Horizontal', 'Vertical'];
    public textareaObj: TextAreaComponent;
    handleflowOrientation = (args: any) => {
        this.textareaObj.adornmentFlow = args.value as AdornmentsDirection;
        this.textareaObj.appendTemplate = (args.value === 'Horizontal') ?
            '<span class="e-input-separator"></span><span class="e-icons e-save"></span><span class="e-input-separator"></span><span class="e-icons e-trash"></span>' :
            '<span class="e-icons e-save"></span><span class="e-input-separator"></span><span class="e-icons e-trash"></span><span class="e-input-separator"></span>';
        this.textareaObj.dataBind();
    };
    handleOrientOrientation = (args: any) => {
        this.textareaObj.adornmentOrientation = args.value as AdornmentsDirection;
        this.textareaObj.appendTemplate = (args.value === 'Horizontal') ?
            '<span class="e-input-separator"></span><span class="e-icons e-save"></span><span class="e-input-separator"></span><span class="e-icons e-trash"></span>' :
            '<span class="e-icons e-save"></span><span class="e-input-separator"></span><span class="e-icons e-trash"></span><span class="e-input-separator"></span>';
        this.textareaObj.dataBind();
    };
    render(): JSX.Element {
        return (
        <div className='control-pane'>
            <div className='control-section'>
                <div className="col-lg-8 control-section multiline">
                    <div className="content-wrapper">
                        <div className="multiline-row e-textarea-adornments">
                            <TextAreaComponent ref={(scope) => {this.textareaObj = scope}} cssClass='e-outline' resizeMode='None' rows={this.rows} cols={this.cols} placeholder="Add a comment" floatLabelType="Auto" prependTemplate={this.prependTemplate} appendTemplate={this.appendTemplate} />
                        </div>
                    </div>
                </div>  

                <div className="col-lg-4 property-section">
                    <PropertyPane title='Properties'>
                        <table id="property" title="Properties" className="multiline-property">
                            <tbody>
                                <tr>
                                    <td> Flow Direction </td>
                                    <td>
                                        <DropDownListComponent dataSource={this.flowOrientationData} index={0} change={this.handleflowOrientation} popupHeight='200px'></DropDownListComponent>
                                    </td>
                                </tr>
                                <tr>
                                    <td> Orientation Direction </td>
                                    <td>
                                        <DropDownListComponent dataSource={this.orientOrientationData} index={0} change={this.handleOrientOrientation} popupHeight='200px'></DropDownListComponent>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
            </div>
            <div id="action-description">
                <p>This example demonstrates the adornments enhance a textarea with prefix/suffix elements, icons, text, or buttons that provide context or quick actions. Flow and orientation can be configured for horizontal or vertical layouts.</p>
            </div>
            <div id="description">
                <p>
                    This sample showcases TextArea adornments using <code>prependTemplate</code> and <code>appendTemplate</code> to add bold/italic (prefix) and save/delete (suffix) icons. A DropDownList allows you to switch <code>adornmentFlow</code> and <code>adornmentOrientation</code> between Horizontal and Vertical, and the layout updates dynamically via dataBind whenever the selected option changes.
                </p>
            </div>
        </div>
        );
    }
    private prependTemplate(): JSX.Element {
        return (
            <div>
                <span className="e-icons e-bold"></span><span className="e-input-separator"></span><span className="e-icons e-italic"></span><span className="e-input-separator"></span>
            </div>
        );
    }
    private appendTemplate(): JSX.Element {
        return (
            <div>
                <span className="e-input-separator"></span><span className="e-icons e-save"></span><span className="e-input-separator"></span><span className="e-icons e-trash"></span>
            </div>
        );
    }
}
