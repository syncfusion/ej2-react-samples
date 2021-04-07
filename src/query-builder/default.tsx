import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { QueryBuilderComponent, ColumnsModel, RuleModel } from '@syncfusion/ej2-react-querybuilder';
import { employeeData } from './data-source';
import { SampleBase } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
import './default.css';

export class Default extends SampleBase<{}, {}> {
    public qbObj: QueryBuilderComponent;
    createdControl(): void {
        if(Browser.isDevice) {
           this.qbObj.summaryView = true;
        }
    }
    columnData: ColumnsModel[] = [
        {
            field: 'EmployeeID', label: 'EmployeeID', type: 'number', operators: [{ key: 'Equal', value: 'equal' },
            { key: 'Greater than', value: 'greaterthan' }, { key: 'Less than', value: 'lessthan' }]
        },
        { field: 'FirstName', label: 'FirstName', type: 'string' },
        { field: 'TitleOfCourtesy', label: 'Title Of Courtesy', type: 'boolean', values: ['Mr.', 'Mrs.'] },
        { field: 'Title', label: 'Title', type: 'string' },
        { field: 'HireDate', label: 'HireDate', type: 'date', format: 'dd/MM/yyyy' },
        { field: 'Country', label: 'Country', type: 'string' },
        { field: 'City', label: 'City', type: 'string' }
    ];
    importRules: RuleModel = {
        'condition': 'and',
        'rules': [{
            'label': 'EmployeeID',
            'field': 'EmployeeID',
            'type': 'number',
            'operator': 'equal',
            'value': 1
        },
        {
            'label': 'Title',
            'field': 'Title',
            'type': 'string',
            'operator': 'equal',
            'value': 'Sales Manager'
        }]
    };

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div className='row'>
                        <div className='col-lg-12 control-section'>
                            <QueryBuilderComponent dataSource={employeeData} columns={this.columnData}
                                rule={this.importRules} created={this.createdControl.bind(this)} ref={(scope) => { this.qbObj = scope; }} >
                            </QueryBuilderComponent>
                        </div>
                    </div>
                </div>
                <div id='action-description'>
                    <p>This sample demonstrates the default functionalities of the Query Builder component . Click the plus button to
        add group or conditions.</p>
                </div>
                <div id='description'>
                    <p>The Query Builder component is used to create or edit the filters. You can edit the filters by changing the
                       appropriate fields.
            </p>
                    <p> In mobile mode it is shown in vertical mode.</p>
                    <p>
                        More information about Query Builder can be found in this 
                <a target='_blank' href='https://ej2.syncfusion.com/react/documentation/query-builder/getting-started/'>
                            documentation section</a>.
            </p>
                </div>
            </div>
        );
    }
}