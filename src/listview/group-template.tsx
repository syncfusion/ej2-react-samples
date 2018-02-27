/**
 * ListView GroupTemplate Sample
 */

import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { SampleBase } from '../common/sample-base';
import './groupTemplate.css';
import { groupDataSource } from './newsData';

export class GroupTemplate extends SampleBase<{}, {}> {

    private listviewInstance: ListViewComponent;

    //Map the appropriate columns to fields property
    public fields: Object = { text: 'Name', groupBy: 'order' };

    //Set customized group-header template
    public groupTemplate: string = '<div><span class="category">${items[0].category}</span></div>';

    //Set customized list template
    public template: string = '<div class="settings">'
        + '<div class="icon ${class}"></div>'
        + '<div class="_container"> ${if(content)}'
        + '<div class="name">${Name}</div>'
        + '<div class="template-content">${content}</div> ${else}'
        + '<div class="_name">${Name}</div> ${/if} </div>'
        + '</div>';

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    {/* ListView element */}
                    <ListViewComponent id='groupedList' dataSource={groupDataSource} headerTitle='Settings' showHeader={true} fields={this.fields}
                        template={this.template} groupTemplate={this.groupTemplate}
                        ref={(listview) => { this.listviewInstance = listview }}></ListViewComponent>
                </div>

                <div id="action-description">
                    <p>This sample demonstrates the Group Templates functionalities of ListView. Click any list item from the settings option to select and highlight an option.
                    </p>
                </div>

                <div id="description" className="descriptionLayout">
                    <p>ListView component has an option to custom design the group header title with the help of <code>groupTemplate</code> property.</p>
                    <p>In this example, both the group header and list item is customized using the
                    <code>groupTemplate</code> and <code>template</code> property.</p>
                </div>
            </div>
        )
    }
}