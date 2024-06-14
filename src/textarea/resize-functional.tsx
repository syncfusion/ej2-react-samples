import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { TextAreaComponent, Resize } from '@syncfusion/ej2-react-inputs';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import './sample.css';

const Resize = () => {
    // TextArea floating label
    useEffect(() => {
        updateSampleSection();
    }, [])
    const rows = 5;
    const cols = 300;
    const [resizeMode, setResizeMode] = useState<Resize>('Vertical');
    const textareaObj = useRef<TextAreaComponent>(null);
    let resizeModeData: { [key: string]: Object }[];
    let fields: object;
    resizeModeData = [
        { Id: 'Vertical', Label: 'Vertical' },
        { Id: 'Horizontal', Label: 'Horizontal' },
        { Id: 'Both', Label: 'Both' },
        { Id: 'None', Label: 'None' }
    ];
    fields = { text: 'Label', value: 'Id' };
    const resizeHandler = (args: any): void => {
        setResizeMode(args.value);
    }
    return (
        <div className='control-pane'>
            <div id="textarea-sample" className="col-lg-8 control-section resize">
                <div className="content-wrapper">
                    <div className="resize-row">
                        <TextAreaComponent id="resize" placeholder="Enter your comments" floatLabelType="Auto" resizeMode={resizeMode} ref={textareaObj}  rows={rows} cols={cols} ></TextAreaComponent>
                    </div>
                </div>
            </div>
            <div className='col-lg-4 property-section' id="resize">
                <PropertyPane title='Properties'>
                    <table id="property" title="Properties" className="resize-property">
                        <tr>
                            <td className="left-side">Resize Mode</td>
                            <td>
                                <DropDownListComponent id="resizedropdown" value={resizeMode} dataSource={resizeModeData} fields={fields} change={resizeHandler.bind(this)} />
                            </td>
                        </tr>
                    </table>
                </PropertyPane>
            </div>
            <div id="action-description">
                <p>
                    This example demonstrates the resize functionalities of the textarea control.
                    Choose the corresponding resizeMode option from the property panel to update the resize behavior in the textarea.
                    </p>
            </div>
            <div id="description">
                <p>The textarea can be resized vertically, horizontally, or in both directions by selecting the following corresponding options:</p>
                <ul>
                    <li>Choose resizeMode options such as 'Both', 'Vertical', 'Horizontal', or 'None' to control the resize behavior of the textarea.</li>
                </ul>
            </div>
        </div>
    );
}
export default Resize;