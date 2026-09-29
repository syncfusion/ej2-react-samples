import * as React from 'react';
import './toolbar.css';
import { RichTextEditorUIComponent } from '@syncfusion/ej2-react-richtexteditor-ui';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import {
    CheckBoxComponent,
    ChangeEventArgs as CheckBoxChangeArgs
} from '@syncfusion/ej2-react-buttons';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { TOOLBAR_CONTENT } from './toolbar-content';

function ToolbarConfiguration() {
    const rteRef = React.useRef<RichTextEditorUIComponent>(null);

    React.useEffect(() => {
        updateSampleSection();
    }, []);

    const toolbarTypes = [
        { text: 'Expanded', value: 'Expanded' },
        { text: 'MultiRow', value: 'MultiRow' },
        { text: 'Scrollable', value: 'Scrollable' }
    ];

    const toolbarPositions = [
        { text: 'Top', value: 'Top' },
        { text: 'Bottom', value: 'Bottom' }
    ];

    const toolbarItems = [
        'Undo', 'Redo', '|',
        'Bold', 'Italic', 'Underline', 'Strikethrough', '|',
        'FontColor', 'BackgroundColor', '|',
        'Formats', 'Alignment', '|',
        'Table', 'Image', 'Link', '|',
        'FontName', 'FontSize', '|',
        'NumberFormatList', 'BulletFormatList', '|',
        'Subscript', 'Superscript', '|',
        'ClearFormat'
    ];

    const handleToolbarTypeChange = (args: ChangeEventArgs): void => {
        if (rteRef.current) {
            rteRef.current.toolbarSettings = {
                ...rteRef.current.toolbarSettings,
                type: args.value as any
            };
        }
    };

    const handleToolbarPositionChange = (args: ChangeEventArgs): void => {
        if (rteRef.current) {
            rteRef.current.toolbarSettings = {
                ...rteRef.current.toolbarSettings,
                position: args.value as any
            };
        }
    };

    const handleFloatingChange = (args: CheckBoxChangeArgs): void => {
        if (rteRef.current) {
            rteRef.current.toolbarSettings = {
                ...rteRef.current.toolbarSettings,
                enableFloating: args.checked
            };
        }
    };

    return (
        <div className='control-pane'>
            <div className='col-lg-8 control-section'>
                <div className='control-wrapper'>
                    <div className='sample-container'>
                        <RichTextEditorUIComponent
                            ref={rteRef}
                            value={TOOLBAR_CONTENT}
                            toolbarSettings={{
                                items: toolbarItems as [],
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
                                            dataSource={toolbarTypes}
                                            fields={{ text: 'text', value: 'value' }}
                                            value='Expanded'
                                            popupHeight='200px'
                                            change={handleToolbarTypeChange}
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
                                            dataSource={toolbarPositions}
                                            fields={{ text: 'text', value: 'value' }}
                                            value='Top'
                                            popupHeight='150px'
                                            change={handleToolbarPositionChange}
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
                                            change={handleFloatingChange}
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

export default ToolbarConfiguration;