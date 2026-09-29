import * as React from 'react';
import './toolbar.css';
import { RichTextEditorUIComponent } from '@syncfusion/ej2-react-richtexteditor-ui';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { CheckBoxComponent, ChangeEventArgs as CheckBoxChangeArgs } from '@syncfusion/ej2-react-buttons';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { TOOLBAR_CONTENT } from './toolbar-content';

export class ToolbarConfiguration extends SampleBase<{},{}> {
    private rteObj: RichTextEditorUIComponent | null = null;

    private toolbarTypes: { text: string; value: string }[] = [
        { text: 'Expanded', value: 'Expanded' },
        { text: 'MultiRow', value: 'MultiRow' },
        { text: 'Scrollable', value: 'Scrollable' }
    ];

    private toolbarPositions: { text: string; value: string }[] = [
        { text: 'Top', value: 'Top' },
        { text: 'Bottom', value: 'Bottom' }
    ];

    private onToolbarTypeChange(args: ChangeEventArgs): void {
        if (this.rteObj) {
            this.rteObj.toolbarSettings = {
                ...this.rteObj.toolbarSettings,
                type: args.value as any
            };
        }
    }

    private onToolbarPositionChange(args: ChangeEventArgs): void {
        if (this.rteObj) {
            this.rteObj.toolbarSettings = {
                ...this.rteObj.toolbarSettings,
                position: args.value as any
            };
        }
    }

    private onFloatingChange(args: CheckBoxChangeArgs): void {
        if (this.rteObj) {
            this.rteObj.toolbarSettings = {
                ...this.rteObj.toolbarSettings,
                enableFloating: args.checked
            };
        }
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='col-lg-8 control-section'>
                    <div className='control-wrapper'>
                        <div className='sample-container'>
                            <RichTextEditorUIComponent
                                ref={(scope) => (this.rteObj = scope)}
                                value={TOOLBAR_CONTENT}
                                toolbarSettings={{
                                    items: [
                                        'Undo', 'Redo', '|',
                                        'Bold', 'Italic', 'Underline', 'Strikethrough', '|',
                                        'FontColor', 'BackgroundColor', '|',
                                        'Formats', 'Alignment', '|',
                                        'Table', 'Image', 'Link', '|',
                                        'FontName', 'FontSize', '|',
                                        'NumberFormatList', 'BulletFormatList', '|',
                                        'Subscript', 'Superscript', '|',
                                        'ClearFormat'
                                    ],
                                    type: 'Expanded',
                                    position: 'Top'
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className='col-lg-4 property-section'>
                    <PropertyPane title='Toolbar Properties'>
                        <table id='property' title='Properties' style={{ width: '100%', margin: '10px' }}>
                            <tbody>
                                <tr>
                                    <td style={{ padding: '8px', width: '50%' }}>
                                        <div>Toolbar Type</div>
                                    </td>
                                    <td>
                                        <div style={{ paddingLeft: '10px' }}>
                                            <DropDownListComponent
                                                id='toolbarType'
                                                dataSource={this.toolbarTypes}
                                                fields={{ text: 'text', value: 'value' }}
                                                value='Expanded'
                                                popupHeight='200px'
                                                change={this.onToolbarTypeChange.bind(this)}
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '8px', width: '50%' }}>
                                        <div>Toolbar Position</div>
                                    </td>
                                    <td>
                                        <div style={{ paddingLeft: '10px' }}>
                                            <DropDownListComponent
                                                id='toolbarPosition'
                                                dataSource={this.toolbarPositions}
                                                fields={{ text: 'text', value: 'value' }}
                                                value='Top'
                                                popupHeight='150px'
                                                change={this.onToolbarPositionChange.bind(this)}
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '8px', width: '50%' }}>
                                        <div>Enable Floating</div>
                                    </td>
                                    <td>
                                        <div style={{ paddingLeft: '10px' }}>
                                            <CheckBoxComponent
                                                id='enableFloating'
                                                checked={true}
                                                change={this.onFloatingChange.bind(this)}
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
                        This sample demonstrates the different toolbar configurations
                        of the Rich Text Editor UI component.
                    </p>
                </div>

                <div id="description">
                    <p>
                        The Rich Text Editor UI toolbar can be configured using the
                        <code> toolbarSettings </code> property. The toolbar
                        supports different types and positions:
                    </p>
                    <ul>
                        <li>
                            <code>Toolbar Type</code> - Controls how toolbar items are displayed:
                            <ul>
                                <li><code>Expanded</code>: hides overflowing items in the next row, with an expand arrow to view them.</li>
                                <li><code>MultiRow</code>: automatically wraps items to the next row.</li>
                                <li><code>Scrollable</code>: displays all items in a single row with horizontal scrolling.</li>
                            </ul>
                        </li>
                        <li>
                            <code>Toolbar Position</code> - Controls where the toolbar is placed:
                            <ul>
                                <li><code>Top</code>: toolbar appears above the editor (default).</li>
                                <li><code>Bottom</code>: toolbar appears below the editor.</li>
                            </ul>
                        </li>
                        <li>
                            <code>Enable Floating</code> - The <code>enableFloating</code> property enables floating mode
                            for the toolbar, allowing the toolbar to remain accessible while scrolling through the editor content.
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}