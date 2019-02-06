/**
 * ListView GroupTemplate Sample
 */

import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { SampleBase } from '../common/sample-base';
import './group-template.css';
import { groupDataSource } from './listData';

export class GroupTemplate extends SampleBase<{}, {}> {

    private listviewInstance: ListViewComponent;

    //Map the appropriate columns to fields property
    public fields: Object = { text: 'Name', groupBy: 'order' };

    //Set customized list template
    listTemplate(data: any): JSX.Element {
        return(
            <div className="settings e-list-wrapper e-list-multi-line e-list-avatar">
            <span className={`icon ${data.class} e-avatar`}></span>
            <span className="e-list-item-header">{data.Name}</span>
            <span className="e-list-content">{data.content}</span>
        </div>
        );
    }

    //Set customized group-header template
    groupTemplate(data: any): JSX.Element {
        return(
            <div className="e-list-wrapper"><span className="e-list-item-content">{data.items[0].category}</span></div>
        );
    }
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    {/* ListView element */}
                    <ListViewComponent id='groupedList' dataSource={groupDataSource} headerTitle='Settings' showHeader={true} fields={this.fields}
                        cssClass="e-list-template" template={this.listTemplate as any} groupTemplate={this.groupTemplate as any}
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