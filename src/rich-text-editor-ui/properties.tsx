import * as React from 'react';
import './properties.css';
import { RichTextEditorUIComponent, ValueFormat } from '@syncfusion/ej2-react-richtexteditor-ui';
import { DropDownListComponent, ChangeEventArgs as DropDownChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { CheckBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-react-buttons';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';

export class Properties extends SampleBase<{}, {}> {
    private editorObj: RichTextEditorUIComponent | null = null;

    private valueFormatData = [
        { text: 'HTML', value: 'html' },
        { text: 'JSON', value: 'json' }
    ];

    private log = (value: unknown): void => {
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

    private valueFormatChange(args: DropDownChangeEventArgs): void {
        if (this.editorObj) {
            const currentValue: any = this.editorObj.value;
            this.editorObj.valueFormat = args.value as ValueFormat;
            this.editorObj.value = currentValue;
            this.editorObj.dataBind();
            this.log(this.editorObj.value);
        }
    }

    private enableChange(args: ChangeEventArgs): void {
        if (this.editorObj) {
            this.editorObj.enable = args.checked as boolean;
        }
    }

    private readonlyChange(args: ChangeEventArgs): void {
        if (this.editorObj) {
            this.editorObj.readonly = args.checked as boolean;
        }
    }

    private rtlChange(args: ChangeEventArgs): void {
        if (this.editorObj) {
            this.editorObj.enableRtl = args.checked as boolean;
        }
    }

    private persistenceChange(args: ChangeEventArgs): void {
        if (this.editorObj) {
            this.editorObj.enablePersistence = args.checked as boolean;
            this.editorObj.dataBind();
        }
    }

    private onEditorCreated = (): void => {
        this.log(this.editorObj ? this.editorObj.value : '');
    };

    render() {
        return (
            <div className="properties-control-pane">
                <div className="col-lg-8">
                    <div className="control-section">
                        <div className="rte-control-section">
                            <RichTextEditorUIComponent
                                ref={(scope) => (this.editorObj = scope)}
                                value="<p>Welcome to Rich Text Editor</p>"
                                valueFormat="html"
                                enablePersistence={true}
                                saveInterval={100}
                                change={() => this.log(this.editorObj ? this.editorObj.value : '')}
                                created={this.onEditorCreated}
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
                                                dataSource={this.valueFormatData}
                                                fields={{ text: 'text', value: 'value' }}
                                                value="html"
                                                popupHeight="150px"
                                                change={this.valueFormatChange.bind(this)}
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
                                                change={this.enableChange.bind(this)}
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
                                                change={this.readonlyChange.bind(this)}
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
                                                change={this.rtlChange.bind(this)}
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
                                                change={this.persistenceChange.bind(this)}
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
}
