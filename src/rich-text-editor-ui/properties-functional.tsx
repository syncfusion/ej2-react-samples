import * as React from 'react';
import './properties.css';
import { RichTextEditorUIComponent, ValueFormat } from '@syncfusion/ej2-react-richtexteditor-ui';
import { DropDownListComponent, ChangeEventArgs as DropDownChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { CheckBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-react-buttons';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';

function Properties() {
    const editorRef = React.useRef<RichTextEditorUIComponent>(null);

    React.useEffect(() => {
        updateSampleSection();
    }, []);

    const valueFormatData = [
        { text: 'HTML', value: 'html' },
        { text: 'JSON', value: 'json' }
    ];

    const log = (value: unknown): void => {
        if (typeof document === 'undefined') { return; }
        const output: HTMLElement = document.getElementById('value-format-output');
        if (!output) { return; }
        const text: string = value === undefined || value === null
            ? String(value)
            : typeof value === 'string'
                ? value
                : JSON.stringify(value, null, 2);
        output.textContent = text;
    };

    const onEditorCreated = (): void => {
        log(editorRef.current ? editorRef.current.value : '');
    };

    const valueFormatChange = (args: DropDownChangeEventArgs): void => {
        if (editorRef.current) {
            const currentValue: any = editorRef.current.value;
            editorRef.current.valueFormat = args.value as ValueFormat;
            editorRef.current.value = currentValue;
            editorRef.current.dataBind();
            log(editorRef.current.value);
        }
    };

    const enableChange = (args: ChangeEventArgs): void => {
        if (editorRef.current) {
            editorRef.current.enable = args.checked as boolean;
        }
    };

    const readonlyChange = (args: ChangeEventArgs): void => {
        if (editorRef.current) {
            editorRef.current.readonly = args.checked as boolean;
        }
    };

    const rtlChange = (args: ChangeEventArgs): void => {
        if (editorRef.current) {
            editorRef.current.enableRtl = args.checked as boolean;
        }
    };

    const persistenceChange = (args: ChangeEventArgs): void => {
        if (editorRef.current) {
            editorRef.current.enablePersistence = args.checked as boolean;
            editorRef.current.dataBind();
        }
    };

    return (
        <div className="Properties-control-pane">
            <div className="col-lg-8">
                <div className="control-section">
                    <div className="rte-control-section">
                        <RichTextEditorUIComponent
                            ref={editorRef}
                            value="<p>Welcome to Rich Text Editor</p>"
                            valueFormat="html"
                            enablePersistence={true}
                            saveInterval={100}
                            change={() => log(editorRef.current ? editorRef.current.value : '')}
                            created={onEditorCreated}
                        />
                    </div>
                    <div id="value-format-output-panel" className="e-rte-api-methods">
                        <h4>Value Format Result</h4>
                        <pre id="value-format-output" aria-live="polite"></pre>
                    </div>
                </div>
                
            </div>

            <div className="col-lg-4 property-section">
                <PropertyPane title="Properties">
                    <table id="property" title="Properties" style={{ width: '100%', margin: '10px' }}>
                        <tbody>
                            <tr>
                                <td style={{ padding: '8px', width: '50%' }}>
                                    <div>Value Format</div>
                                </td>
                                <td>
                                    <div style={{ paddingLeft: '10px' }}>
                                        <DropDownListComponent
                                            id="valueFormat"
                                            dataSource={valueFormatData}
                                            fields={{ text: 'text', value: 'value' }}
                                            value="html"
                                            popupHeight="150px"
                                            change={valueFormatChange}
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ padding: '8px', width: '50%' }}>
                                    <div>Enable</div>
                                </td>
                                <td>
                                    <div style={{ paddingLeft: '10px' }}>
                                        <CheckBoxComponent
                                            id="enable"
                                            checked={true}
                                            change={enableChange}
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ padding: '8px', width: '50%' }}>
                                    <div>Readonly</div>
                                </td>
                                <td>
                                    <div style={{ paddingLeft: '10px' }}>
                                        <CheckBoxComponent
                                            id="readonly"
                                            checked={false}
                                            change={readonlyChange}
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ padding: '8px', width: '50%' }}>
                                    <div>Enable RTL</div>
                                </td>
                                <td>
                                    <div style={{ paddingLeft: '10px' }}>
                                        <CheckBoxComponent
                                            id="enableRtl"
                                            checked={false}
                                            change={rtlChange}
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ padding: '8px', width: '50%' }}>
                                    <div>Enable Persistence</div>
                                </td>
                                <td>
                                    <div style={{ paddingLeft: '10px' }}>
                                        <CheckBoxComponent
                                            id="enablePersistence"
                                            checked={true}
                                            change={persistenceChange}
                                        />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </PropertyPane>
            </div>

            <div id="action-description">
                <p>
                    This sample demonstrates the properties of the Rich Text Editor UI component.
                </p>
            </div>

            <div id="description">
                <p>
                    The Rich Text Editor UI component demonstrates value format,
                    enabled state, read-only mode, RTL support, and persistence options.
                </p>
            </div>
        </div>
    );
}

export default Properties;