import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { AdornmentsDirection, TextAreaComponent } from '@syncfusion/ej2-react-inputs';
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import './sample.css';
 
const Adornments = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const rows = 5;
    const cols = 250;
    const flowOrientationData: string[] = ['Horizontal', 'Vertical'];
    const orientOrientationData: string[] = ['Horizontal', 'Vertical'];
    const textareaObj = useRef<TextAreaComponent>(null);
    const handleflowOrientation = (args: any) => {
        textareaObj.current.adornmentFlow = args.value as AdornmentsDirection;
        textareaObj.current.appendTemplate = (args.value === 'Horizontal') ?
            '<span class="e-input-separator"></span><span class="e-icons e-save"></span><span class="e-input-separator"></span><span class="e-icons e-trash"></span>' :
            '<span class="e-icons e-save"></span><span class="e-input-separator"></span><span class="e-icons e-trash"></span><span class="e-input-separator"></span>';
        textareaObj.current.dataBind();
    };
    const handleOrientOrientation = (args: any) => {
        textareaObj.current.adornmentOrientation = args.value as AdornmentsDirection;
        textareaObj.current.appendTemplate = (args.value === 'Horizontal') ?
            '<span class="e-input-separator"></span><span class="e-icons e-save"></span><span class="e-input-separator"></span><span class="e-icons e-trash"></span>' :
            '<span class="e-icons e-save"></span><span class="e-input-separator"></span><span class="e-icons e-trash"></span><span class="e-input-separator"></span>';
        textareaObj.current.dataBind();
    };
    const prependTemplate = () => {
        return (<>
            <span className="e-icons e-bold"></span><span className="e-input-separator"></span><span className="e-icons e-italic"></span><span className="e-input-separator"></span>
        </>);
    }
    const appendTemplate = () => {
        return (<>
            <span className="e-input-separator"></span><span className="e-icons e-save"></span><span className="e-input-separator"></span><span className="e-icons e-trash"></span>
        </>);
    }
    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div className="col-lg-8 multiline">
                    <div className="content-wrapper content-wrapper-adornments">
                        <div className="multiline-row e-textarea-adornments">
                            <TextAreaComponent ref={textareaObj} cssClass='e-outline' resizeMode='None' rows={rows} cols={cols} placeholder="Add a comment" floatLabelType="Auto" prependTemplate={prependTemplate} appendTemplate={appendTemplate} />
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
                                        <DropDownListComponent dataSource={flowOrientationData} index={0} change={handleflowOrientation} popupHeight='200px'></DropDownListComponent>
                                    </td>
                                </tr>
                                <tr>
                                    <td> Orientation Direction </td>
                                    <td>
                                        <DropDownListComponent dataSource={orientOrientationData} index={0} change={handleOrientOrientation} popupHeight='200px'></DropDownListComponent>
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
export default Adornments;