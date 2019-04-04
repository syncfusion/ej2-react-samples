/**
 * ListBox Default Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ListBoxComponent, FieldSettingsModel, ToolbarSettingsModel } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import * as data from './dataSource.json';
import './dual-list-box.css';

export class DualListBox extends SampleBase<{}, {}> {
    public dataA: { [key: string]: Object }[] = data["groupa"];
    public dataB: { [key: string]: Object }[] = data["groupb"];
    public fields: FieldSettingsModel = { text: 'Name'};
    public toolbarSettings: ToolbarSettingsModel = { items: ['moveUp', 'moveDown', 'moveTo', 'moveFrom', 'moveAllTo', 'moveAllFrom'] };
    render() {
        return (
            <div className='control-pane'>
                <div className="control-section">
                    <div className="dual-list-wrapper">
                        <div className="dual-list-groupa">
                            <h4>Group A</h4>
                            <ListBoxComponent dataSource={this.dataA} fields={this.fields} height="330px" scope="#combined-listbox" toolbarSettings={this.toolbarSettings} />
                        </div>
                        <div className="dual-list-groupb">
                            <h4>Group B</h4>
                            <ListBoxComponent id="combined-listbox" dataSource={this.dataB} height="330px" fields={this.fields} />
                        </div>
                    </div>
                </div>
                <div id='action-description'>
                    <p>This sample demonstrates the functionalities of the dual list box. Select an item from Group A and click the <code>moveTo</code> button to move item from Group A to Group B.</p>
                </div>
                <div id="description">
                    <p>The dual list box allows the user to move items between two list boxes. Dual list box can be created by listing items in the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/list-box/#toolbarsettings"><code>toolbarSettings</code></a> property along with
                        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/list-box/#scope"><code>scope</code></a> property. The supported operations are,</p>
                    <ul>
                        <li><code>moveUp</code> -  Moves the selected item in the upward direction.</li>
                        <li><code>moveDown</code> -  Moves the selected item in the downward direction.</li>
                        <li><code>moveTo</code> -  Moves the selected item to the Group B list box.</li>
                        <li><code>moveFrom</code> -  Moves the selected item from Group B list box to Group A.</li>
                        <li><code>moveAllTo</code> -  Moves all the items to the Group B list box.</li>
                        <li><code>moveAllFrom</code> -  Moves all the items from Group B list box to Group A.</li>
                    </ul>
                    <p> More information about the dual list box can be found in the
                        <a href="https://ej2.syncfusion.com/react/documentation/list-box/" target="_blank"> documentation</a> section.
                    </p>
                </div>
            </div>
        );
    }
}