import * as React from 'react';
import { QueryBuilderComponent } from '@syncfusion/ej2-react-querybuilder';
import { Query, DataManager } from '@syncfusion/ej2-data';
import { hardwareData } from './data-source';
import { GridComponent, Page, Inject, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-grids';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import './grid.css';
export class DataGrid extends SampleBase {
    constructor() {
        super(...arguments);
        this.datamanager = new DataManager(hardwareData);
        this.query = new Query().select(['TaskID', 'Name', 'Category', 'SerialNo', 'InvoiceNo', 'Status']);
        this.columnData = [
            {
                field: 'TaskID', label: 'TaskID', type: 'number', operators: [{ key: 'equal', value: 'equal' },
                    { key: 'greaterthan', value: 'greaterthan' }, { key: 'lessthan', value: 'lessthan' }]
            },
            { field: 'Name', label: 'Name', type: 'string' },
            { field: 'Category', label: 'Category', type: 'string' },
            { field: 'SerialNo', label: 'SerialNo', type: 'string' },
            { field: 'InvoiceNo', label: 'InvoiceNo', type: 'string' },
            { field: 'Status', label: 'Status', type: 'string' }
        ];
        this.importRules = {
            'condition': 'or',
            'rules': [{
                    'label': 'Category',
                    'field': 'Category',
                    'type': 'string',
                    'operator': 'equal',
                    'value': 'Laptop'
                }]
        };
    }
    updateRule(args) {
        let predicate = this.qbObj.getPredicate(args.rule);
        if (isNullOrUndefined(predicate)) {
            this.gridObj.query = new Query().select(['TaskID', 'Name', 'Category', 'SerialNo', 'InvoiceNo', 'Status']);
        }
        else {
            this.gridObj.query = new Query().select(['TaskID', 'Name', 'Category', 'SerialNo', 'InvoiceNo', 'Status'])
                .where(predicate);
        }
        this.gridObj.refresh();
    }
    onGridCreated() {
        this.updateRule({ rule: this.qbObj.getValidRules(this.qbObj.rule) });
    }
    render() {
        return (<div className='control-pane'>
                <div className='control-section qb-section'>
                    <div className='row'>
                        <div className='col-lg-12 control-section qb-section'>
                            <QueryBuilderComponent width='100%' dataSource={hardwareData} columns={this.columnData} rule={this.importRules} ruleChange={this.updateRule.bind(this)} ref={(scope) => { this.qbObj = scope; }}>
                            </QueryBuilderComponent>
                        </div>
                        <div className='col-lg-12 control-section qb-section'>
                            <div className='content-wrapper'>
                                <GridComponent allowPaging={true} dataSource={this.datamanager} width='100%' ref={(scope) => { this.gridObj = scope; }} query={this.query} created={this.onGridCreated.bind(this)}>
                                    <ColumnsDirective>
                                        <ColumnDirective field='TaskID' headerText='Task ID' width='120' textAlign='Right'/>
                                        <ColumnDirective field='Name' headerText='Name' width='140'/>
                                        <ColumnDirective field='Category' headerText='Category' width='140' textAlign='Right'/>
                                        <ColumnDirective field='SerialNo' headerText='Serial No' width='130'/>
                                        <ColumnDirective field='InvoiceNo' headerText='Invoice No' width='120'/>
                                        <ColumnDirective field='Status' headerText='Status' width='120'/>
                                    </ColumnsDirective>
                                    <Inject services={[Page]}/>
                                </GridComponent>
                            </div>
                        </div>
                    </div>
                </div>
                <div id='action-description'>
                    <p>This sample demonstrates the integration of Grid component to showcase the data population based on the created
            filters using Query Builder component.</p>
                </div>
                <div id='description'>
                    <p>
                        This sample illustrates the way to integrate the Grid component to Query Builder.
            The Grid component will be refreshed while editing the filters in Query Builder.</p>
                    <p>
                        More information about Query Builder can be found in this 
                        <a target='_blank' href='https://ej2.syncfusion.com/react/documentation/query-builder/getting-started/'>
                            documentation section</a>.
                    </p>
                </div>
            </div>);
    }
    ;
}
