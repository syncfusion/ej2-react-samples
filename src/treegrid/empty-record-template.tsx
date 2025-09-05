import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
    TreeGridComponent,
    ColumnsDirective,
    ColumnDirective,
    Inject,
    Toolbar,
    Edit,
    Filter,
    Sort,
    Page
} from '@syncfusion/ej2-react-treegrid';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { SampleBase } from '../common/sample-base';

const EMPTYRECORDTEMPLATE_CSS = `
.emptyRecordTemplate {
    text-align: center;
    margin: 31px auto;
}

.e-emptyRecord {
    display: block;
    margin: 15px auto;
    border-radius: 4px;
    box-shadow: 2px 4px 10px rgba(52, 52, 52, 0.5);
}
`;

export class EmptyRecordTemplate extends SampleBase<{}, {}> {
    public treegridRef: TreeGridComponent;
    public priorityParams: object = {
        params: {        
            dataSource: [
               {priority:"Low"},{priority:"Medium"},{priority:"High"}, {priority:"Critical"}
            ]
        }
    };
    public statusParams: object = {
        params: {        
            dataSource: [
                {status:"Open"},{status:"Inprogress"},{status:"Review-Request"},{status:"Review-Reject"},{status:"Closed"}
            ]
        }
    };
    /**
     * The empty record template function that returns a custom template for the empty record.
     * This template will be displayed when there are no records in the Tree Grid.
     */
    public emptyTemplate(): any {
        return (
            <div className="emptyRecordTemplate">
                <img
                    src="https://ej2.syncfusion.com/angular/demos/assets/grid/images/emptyRecordTemplate_light.svg"
                    alt="No record"
                    className="e-emptyRecord"
                />
                <div>
                    <b>There is no data available to display at the moment.</b>
                </div>
            </div>
        );
    };

    public template: any = this.emptyTemplate;

    public onDataBound(): any {
        const isGridEmpty = this.treegridRef.flatData.length === 0;
        if (this.treegridRef.searchSettings.key === '' || this.treegridRef.searchSettings.key === undefined) {
            this.treegridRef.toolbarModule.enableItems([this.treegridRef.element.id + '_gridcontrol_searchbar'], !isGridEmpty);
        }
        const filterMenudivs: any = this.treegridRef.element.querySelectorAll('.e-filtermenudiv');
        filterMenudivs.forEach((div: HTMLElement) => {
            if (isGridEmpty && this.treegridRef.grid.filterSettings.columns.length == 0) {
                div.classList.add('e-disabled');
                div.style.cursor = 'default';
            } else {
                div.classList.remove('e-disabled');
                div.style.removeProperty('cursor');
            }
        });
    };

    public onActionComplete(args: any): any {
        // Toggle filter dialog based on visible records
        if (args.requestType === 'filterAfterOpen' && this.treegridRef.flatData.length === 0) {
            if (args.filterModel.filterSettings.columns.length > 0 && args.filterModel.filterSettings.columns.some((col: any) => col.field === args.columnName)) {
                args.filterModel.dlgObj.show();
            }
            else {
                args.filterModel.dlgObj.hide();
            }
        }
        if ((args.requestType === 'delete' || args.requestType === 'searching') && this.treegridRef.flatData.length === 0 && this.treegridRef.searchSettings.key === '') {
            this.treegridRef.toolbarModule.enableItems([this.treegridRef.element.id + '_gridcontrol_searchbar'], false);
        }
        if(args.action === 'clearFilter' && this.treegridRef.flatData.length !== 0) {
            this.treegridRef.toolbarModule.enableItems([this.treegridRef.element.id + '_gridcontrol_searchbar'], true);
        }
    };

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <style>{EMPTYRECORDTEMPLATE_CSS}</style>
                    <TreeGridComponent
                        id="TreeGrid"
                        ref={treegridRef => this.treegridRef = treegridRef}
                        dataSource={[]}
                        treeColumnIndex={1}
                        childMapping="subtasks"
                        emptyRecordTemplate={this.template.bind(this)}
                        toolbar={['Add', 'Delete', 'Update', 'Cancel', 'Search']}
                        editSettings={{ allowEditing: true, allowAdding: true, allowDeleting: true, }}
                        allowPaging={true}
                        allowSorting={true}
                        allowFiltering={true}
                        filterSettings={{ type: 'Menu' }}
                        dataBound={this.onDataBound.bind(this)}
                        actionComplete={this.onActionComplete.bind(this)}
                    >
                        <ColumnsDirective>
                            <ColumnDirective field="taskID" headerText="Task ID" type="number" textAlign="Right" isPrimaryKey={true} validationRules= {{ required: true, min:0 }} width="130" />
                            <ColumnDirective field="taskName" headerText="Task Name" type="string" textAlign='Left' validationRules={ { required: true }}  clipMode="EllipsisWithTooltip" width="180"/>
                            <ColumnDirective field="priority" headerText="Priority" type="string" textAlign="Left" editType='dropdownedit' edit={this.priorityParams} width="120" />
                            <ColumnDirective field="assignee" headerText="Assignee" type="string" textAlign="Left" width="120" />
                            <ColumnDirective field="status" headerText="Status" editType='dropdownedit' edit={this.statusParams} type="string" textAlign='Left' width="120" />
                            <ColumnDirective field="duration" headerText="Duration in Days" type="number" editType='numericedit' textAlign="Right" width="150" />
                        </ColumnsDirective>
                        <Inject services={[Toolbar, Edit, Filter, Sort, Page]} />
                    </TreeGridComponent>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the use of the empty record template in the Tree Grid. The <code>emptyRecordTemplate</code> accepts either a string or an HTML element value, which will be used as the template when there is no data.</p>
                </div>
                <div id='description'>
                    <p>The Tree Grid provides a way to use custom content when it has no data to present. Custom content, such as images, text, or other components, can be used when the Tree Grid does not contain any records to display. This feature replaces the default message of "No records to display" typically shown in the Tree Grid.</p>
                    <p>More information on the empty record template can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/treegrid/overview"> documentation</a> section.</p>
                </div>
            </div>
        )
    }
}
