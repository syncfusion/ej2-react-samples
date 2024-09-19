/**
 * MultiColumnComboBox Keyboard Navigation Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { MultiColumnComboBoxComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-multicolumn-combobox';
import { SampleBase } from '../common/sample-base';
import './keyboard-navigation.css';
import * as data from './dataSource.json';

export class Keyboard extends SampleBase<{}, {}> {

    fields: { text: 'Author', value: 'Title' };
    render() {
        return (
            <div className='control-pane'>
                <div className="control-section">
                    <div className='control-wrapper keyboard-multicolumn'>
                        <div style={{ paddingTop: '60px' }}>
                            <MultiColumnComboBoxComponent type="text" dataSource={(data as any).bookDetails} fields={this.fields} placeholder='Select an Author' popupHeight={'230px'}>
                            <ColumnsDirective>
                                <ColumnDirective field='Title' header='Title' width={180}></ColumnDirective>
                                <ColumnDirective field='Author' header='Author' width={150}></ColumnDirective>
                                <ColumnDirective field='Genre' header='Genre' width={100}></ColumnDirective>
                                <ColumnDirective field='PublishedYear' header='Published Year' width={120}></ColumnDirective>
                                <ColumnDirective field='Price' header='Price' width={80}></ColumnDirective>
                            </ColumnsDirective>
                            </MultiColumnComboBoxComponent>
                        </div>
                    </div>
                </div>

                <div id="action-description">
                    <p>This sample demonstrates keyboard navigations support in the MultiColumn Combobox.</p>
                </div>

                <div id="description">
                    <p>To provide users with the ability to navigate, select, and interact with popup data in a MultiColumn ComboBox using keyboard shortcuts for improved accessibility.</p>
                    <p>Keyboards Actions :</p>
                    <p><ul>
                        <li><code>Enter</code>-  Select the focused item and close the popup.</li>
                        <li><code>Esc</code>- Close the popup.</li>
                        <li><code>Alt + Down Arrow</code>- Open the popup.</li>
                        <li><code>Alt + Up Arrow</code>- Close the popup.</li>
                        <li><code>Up Arrow</code>- Select the previous item.</li>
                        <li><code>Down Arrow</code>- Select the next item.</li>
                        <li><code>Home</code>- Select the first item.</li>
                        <li><code>End</code>- Select the last item.</li>
                        <li><code>Tab</code>- Select the focused item, close the popup, and move to the next focusable element.</li>
                        <li><code>Shift + Tab</code>- Select the focused item, close the popup, and move to the previous focusable element.</li>
                    </ul></p>
                </div>
            </div>
        )
    }
}
