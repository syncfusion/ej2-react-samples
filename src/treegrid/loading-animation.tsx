import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Page, Sort, Inject } from '@syncfusion/ej2-react-treegrid';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';

export class LoadingAnimation extends SampleBase<{}, {}> {
    public data = new DataManager({ url: 'https://services.syncfusion.com/react/production/api/SelfReferenceData',
    adaptor: new WebApiAdaptor  });
    public treegridInstance: TreeGridComponent;
    public indicatortypes: { [key: string]: Object }[] = [
        { id: 'Shimmer', name: 'Shimmer' },
        { id: 'Spinner', name: 'Spinner' }
    ];
    private fields: Object = { text: 'name', value: 'id' };
    private indicatorDropDown: DropDownListComponent;
    public indicatorChange(e): void {
        if (this.indicatorDropDown.value === 'Shimmer') {
            this.treegridInstance.loadingIndicator.indicatorType = 'Shimmer';
        } else {
            this.treegridInstance.loadingIndicator.indicatorType = 'Spinner';
        }
    this.treegridInstance.refresh();
    };
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div className = 'col-md-9'>
                        <TreeGridComponent id="TreeGrid" dataSource={this.data} ref={treegrid => this.treegridInstance = treegrid} hasChildMapping='isParent' height='400'
                                pageSettings={{ pageCount: 3 }} treeColumnIndex={1} allowPaging={true} idMapping= 'TaskID' parentIdMapping='parentItem' loadingIndicator= {{ indicatorType: 'Shimmer' }} allowSorting={true}>
                                <ColumnsDirective>
                                    <ColumnDirective field='TaskID' headerText='Task ID' width='120' textAlign='Right'></ColumnDirective>
                                    <ColumnDirective field='TaskName' headerText='Task Name' width='240'></ColumnDirective>
                                    <ColumnDirective field='StartDate' headerText='Start Date' width='140' format='yMd' textAlign='Right' />
                                    <ColumnDirective field='Duration' headerText='Duration' width='130' textAlign='Right' />
                                    <ColumnDirective field='Progress' headerText='Progress' width='130' />
                                </ColumnsDirective>
                                <Inject services={[Page, Sort]} />
                        </TreeGridComponent>
                    </div>
                    <div className='col-md-3 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                                <tbody>
                                    <tr style={{ height: '50px' }}>
                                        <td style={{ width: '30%' }}>
                                            <div> Indicator Type </div>
                                        </td>
                                        <td style={{ width: '70%' }}>
                                            <div id='columnddl'>
                                                <DropDownListComponent width="110px" dataSource={this.indicatortypes} value="Shimmer" change={this.indicatorChange.bind(this)} fields={this.fields} ref={(indicateDropDown) => { this.indicatorDropDown = indicateDropDown; }} />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </PropertyPane>
                    </div>
                </div>
                <div id="action-description">
                    <p>This sample shows the loading indicator while tree grid loading and refreshing especially when using remote data. In this sample, you can change the loading indicators from the properties panel.
                    </p>
                </div>
                <div id='description'>
                    <p>
                        When performing the tree grid actions (like sorting, filtering, and more), the loading indicator is shown in the in-between time the processed data is fetched and bound to the tree grid.
                    </p>
                    <p>The Tree Grid supports the following loading indicator types. They are: </p>
                        <ul>
                            <li><code>Spinner</code></li>
                            <li><code>Shimmer</code></li>
                        </ul>
                    <p>Use the loading indicator by setting the <code><a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/treegrid/#loadingindicator">
                    loadingIndicator.indicatorType</a></code> property as <code>Spinner</code> or <code>Shimmer</code>. The default value of the indicatorType is <code>Spinner</code>. In this demo, the <code>Shimmer</code> type is initially enabled.
                    </p>
                </div>
            </div>
        )
    }
}
