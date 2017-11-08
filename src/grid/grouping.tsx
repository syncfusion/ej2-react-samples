import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Group, Sort, Inject } from '@syncfusion/ej2-react-grids';
import { inventoryData } from './data';
import { SampleBase } from '../common/sample-base';

export class Grouping extends SampleBase<{}, {}> {

    public groupOptions: Object = { showGroupedColumn: false, columns: ['Country'] };
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <GridComponent dataSource={inventoryData} allowPaging={true} pageSettings={{ pageSize: 9 }} allowGrouping={true} groupSettings={this.groupOptions} allowSorting={true} height="320">
                        <ColumnsDirective>
                            <ColumnDirective field='Inventor' headerText='Inventor Name' width='180' ></ColumnDirective>
                            <ColumnDirective field='NumberofPatentFamilies' headerText='Number of Patent Families' width='220' textAlign='right'></ColumnDirective>
                            <ColumnDirective field='Country' headerText='Country' width='140' />
                            <ColumnDirective field='Active' headerText='Active' width='120' />
                            <ColumnDirective field='Mainfieldsofinvention' headerText='Main fields of invention' width='200'></ColumnDirective>
                        </ColumnsDirective>
                        <Inject services={[Page, Group, Sort]} />
                    </GridComponent>
                    <div className="e-dsalign">Source:
                    <a href="https://en.wikipedia.org/wiki/List_of_prolific_inventors" target='_blank'>Wikipedia: List of Prolific inventors</a>
                    </div>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates grouping feature of the Grid component. In this sample, the Grid data is grouped against
        Country column. To group any other column simply drag the column header and drop on the group drop area.</p>
                </div>
                <div id='description'>
                    <p>The Grid control has options to group the records based on the required column. When grouping is applied, grouped
            records are organized into a hierarchical structure to facilitate easier expansion and collapse of records. To enable
            grouping, set <code><a target='_blank' className='code'
                            href="http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#allowgrouping-boolean">
                            allowGrouping</a></code> property as true.</p>
                    <p>Columns can be grouped by simply dragging the column header and drop on the group drop area.</p>
                    <p>In this demo, to group a specify column, drag and drop the column in the group drop area.</p>
                    <p style={{ fontWeight: 500 }}>Injecting Module:</p>
                    <p>
                        Grid component features are segregated into individual feature-wise modules. To use grouping feature, we need to inject
            <code>Group</code> module into the <code>services</code>.
        </p>
                    <p>
                        More information on the grouping feature configuration can be found in this
            <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#groupsettings-groupsettingsmodel"> documentation section</a>.
        </p>
                </div>
            </div>
        )
    }
}
