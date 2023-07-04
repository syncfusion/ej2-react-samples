import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { ToolbarComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-react-navigations';
import { updateSampleSection } from '../common/sample-base';
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';
import './toolbar.component.css'
import { NumericTextBoxComponent, TextBoxComponent } from '@syncfusion/ej2-react-inputs';

const Template = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const data: string[] = ["25%", "50%", "75%", "100%"];
    let textboxObj = useRef<TextBoxComponent>(null);

    const numeric = () => {
        return (
            <div style={{display:'flex'}}><div><NumericTextBoxComponent width={45} value={0} min={0} max={100} showSpinButton={false} format='###.##'></NumericTextBoxComponent></div><span className='total-page'>of 100</span></div>
        );        
    }
    const dropDown = () => {
        return(
            <div><ComboBoxComponent width={80} popupWidth={50} value='100%' dataSource={data} showClearButton={false} ></ComboBoxComponent></div>
        );
    }
    const textBox = () => {
        return(
            <div><TextBoxComponent ref={textboxObj} placeholder='Find Text' created={onCreate}></TextBoxComponent></div>
        );
    }
    const onCreate = () => {
        textboxObj.current.addIcon('prepend', 'e-icons e-search');
    }
    return (
        <div className='control-pane'>
            <div className='control-section tbar-control-section'>
                <div className='control toolbar-sample tbar-sample' style={{ margin: '150px 0', width: '100%', maxWidth: '100%' }}>
                    {/* Render the Toolbar Component with Popup mode */}
                    <ToolbarComponent overflowMode='Popup' cssClass='template'>
                        <ItemsDirective>
                            <ItemDirective prefixIcon='e-icons e-folder' tooltipText='Open File' text='Open' showTextOn='Overflow' align="Left" />
                            <ItemDirective type='Separator' />
                            <ItemDirective prefixIcon='e-icons e-first-page' tooltipText='Show first page' text='First' showTextOn='Overflow' align="Left" disabled />
                            <ItemDirective prefixIcon='e-icons e-chevron-left' tooltipText='Show previous page' text='Previous' showTextOn='Overflow' align="Left" disabled />
                            <ItemDirective prefixIcon='e-icons e-chevron-right' tooltipText='Show next page' text='Next' showTextOn='Overflow' align="Left" />
                            <ItemDirective prefixIcon='e-icons e-last-page' tooltipText='Show last page' text='Last' showTextOn='Overflow' align="Left" />
                            <ItemDirective cssClass='page-count' template={numeric} align="Left" />
                            <ItemDirective type='Separator' />
                            <ItemDirective prefixIcon='e-icons e-zoom-out' tooltipText='Zoom-Out' text='Zoom-Out' showTextOn='Overflow' align="Left" />
                            <ItemDirective prefixIcon='e-icons e-zoom-in' tooltipText='Zoom-In' text='Zoom-In' showTextOn='Overflow' align="Left" />
                            <ItemDirective cssClass='percentage' type="Input" template={dropDown} align="Left" />
                            <ItemDirective type='Separator' />
                            <ItemDirective prefixIcon='e-icons e-mouse-pointer' tooltipText='Text selection tool' text='Selection' showTextOn='Overflow' align="Left" />
                            <ItemDirective prefixIcon='e-icons e-pan' tooltipText='Pan mode' text='Pan mode' showTextOn='Overflow' align="Left" />
                            <ItemDirective type='Separator' />
                            <ItemDirective prefixIcon='e-icons e-undo' tooltipText='Undo' text='Undo' showTextOn='Overflow' align="Left" />
                            <ItemDirective prefixIcon='e-icons e-redo' tooltipText='Redo' text='Redo' showTextOn='Overflow' align="Left" />
                            <ItemDirective type='Separator' />
                            <ItemDirective prefixIcon='e-pv-comment-icon' tooltipText='Add Comments' text='Add Comments' showTextOn='Overflow' align="Left" />
                            <ItemDirective type='Separator' />
                            <ItemDirective text='Submit Form' align="Left" />
                            <ItemDirective cssClass='find' type="Input" template={textBox} overflow="Show" align="Right" />
                            <ItemDirective prefixIcon='e-icons e-annotation-edit' tooltipText='Edit Annotations' text='Edit' showTextOn='Overflow' align="Right" />
                            <ItemDirective prefixIcon='e-icons e-print' tooltipText='Print File' text='Print' showTextOn='Overflow' align="Right" />
                            <ItemDirective prefixIcon='e-icons e-download' tooltipText='Download' text='Download' showTextOn='Overflow' align="Right" />
                        </ItemsDirective>
                    </ToolbarComponent>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates customization of the React Toolbar.</p>
            </div>
            <div id="description">
                <p>
                    In this demo, the React Toolbar showcases customization options for toolbar items using the <code>template</code> property. The Toolbar items are arranged using the <code>align</code> property.
                </p>
                <p>
                    To add icons to the toolbar items, the <code>prefixIcon</code> property is used. When the <code>showTextOn</code> property's is set to <code>overflow</code>, the Toolbar items' <code>text</code> that overflows will be visible.
                </p>
                <p>
                    In this demo, <code>NumericTextBox</code>, <code>ComboBox</code> and <code>TextBox</code> are used inside the Toolbar .
                </p>
            </div>
        </div>
    );
}
export default Template;