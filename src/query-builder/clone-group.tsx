import * as React from 'react';
import { QueryBuilderComponent, ColumnsModel, RuleModel } from '@syncfusion/ej2-react-querybuilder';
import { SampleBase } from '../common/sample-base';
import { employeeData } from './data-source';

export class CloneTemplate extends SampleBase<{}, {}> {
    public qryBldrObj: QueryBuilderComponent;
    public boolOperators: any = [
        { value: 'equal', key: 'Equal'},
    ];
    public dateOperators: any = [
        { value: 'equal', key: 'Equal'},
        { value: 'greaterthan', key: 'Greater Than'},
        { value: 'greaterthanorequal', key: 'Greater Than Or Equal' },
        { value: 'lessthan', key: 'Less Than' },
        { value: 'lessthanorequal', key: 'Less Than Or Equal' },
        { value: 'notequal', key: 'Not Equal' },
        { value: 'between', key: 'Between' },
        { value: 'notbetween', key: 'Not Between' }
    ];
    public importRules: RuleModel;
    public columnData: ColumnsModel[];
    constructor(args){
        super(args)
        this.columnData =  [
            { field: "EmployeeID", label: "Employee ID", type: "number" },
            { field: "FirstName", label: "First Name", type: "string" },
            { field: "LastName", label: "Last Name", type: "string" },
            { field: "Age", label: "Age", type: "number" },
            { field: "IsDeveloper", label: "Is Developer", type: "boolean", operators: this.boolOperators },
            { field: "PrimaryFramework", label: "Primary Framework", type: "string" },
            { field: "HireDate", label: "Hire Date", type: "date", format: "MM/dd/yyyy", operators: this.dateOperators },
            { field: "Country", label: "Country", type: "string" },
        ];
        this.importRules = {
            condition: "and",
            rules: [
                { label: "First Name", field: "FirstName", type: "string", operator: "startswith", value: "Andre" },
                { label: "Last Name", field: "LastName", type: "string", operator: "in", value: ['Davolio', 'Buchanan'] },
                { label: "Age", field: "Age", type: "number", operator: "greaterthan", value: 29 },
                { condition: "or", rules: [
                        { label: "Is Developer", field: "IsDeveloper", type: "boolean", operator: "equal", value: true },
                        { label: "Primary Framework", field: "PrimaryFramework", type: "string", operator: "equal", value: "React" }
                    ]
                },
                { label: "Hire Date", field: "HireDate", type: "date", operator: "between", value: ["11/22/2023", "11/30/2023"] },
            ],
        };
    }

    render() {
        return (
            <div className='control-pane'>
            <div className='control-section'>
                <div className='row'>
                    <div className='col-lg-12 control-section'>
                            <QueryBuilderComponent id="querybuilder" dataSource={employeeData} columns={this.columnData} rule={this.importRules} ref={(scope) => { this.qryBldrObj = scope; }} showButtons={{cloneGroup: true, cloneRule: true}}></QueryBuilderComponent>
                            </div>
                    </div>
                </div>
                <div id='action-description'>
                    <p>This sample demonstrates the clone support of the Query Builder component. Click the clone button to clone the group or rule.</p>
                </div>
                <div id='description'>
                    <p>The Clone options will create an exact replica of a rule or group next to the original.</p>
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