import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { QueryBuilderComponent, ColumnsModel, RuleModel, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-querybuilder';
import { getComponent } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import './rule-template.css';
import { DropDownList, DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { RadioButtonComponent } from '@syncfusion/ej2-react-buttons';
import { employeeData } from './data-source';

export class RuleTemplate extends SampleBase<{}, {}> {
    elem: HTMLElement;
    dropDownObj: DropDownList;
    qryBldrObj: QueryBuilderComponent;
    importRules: RuleModel = {
        'condition': 'and',
        'rules': [{
            'label': 'First Name',
            'field': 'FirstName',
            'type': 'string',
            'operator': 'equal',
            'value': 'Nancy'
        },
        {
            'label': 'Country',
            'field': 'Country',
            'type': 'string',
            'operator': 'equal',
            'value': "USA"
        }
        ]
    };
    ruleTemplate(props) {
        return (<RulesTemplate {...props}/>);
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div className='col-lg-12 control-section'>
                        <QueryBuilderComponent id="querybuilder"
                                rule={this.importRules} dataSource={employeeData} ref={(scope) => { this.qryBldrObj = scope; }} >
                            <ColumnsDirective>
                                <ColumnDirective field="EmployeeID" label="Employee ID" type="number"/>
                                <ColumnDirective field="FirstName" label="First Name" type="string"/>
                                <ColumnDirective field="LastName" label="Last Name" type="string"/>
                                <ColumnDirective field="HireDate" label="Hire Date" type="date" />
                                <ColumnDirective field="Country" label="Country" type="string" ruleTemplate={this.ruleTemplate}/>
                            </ColumnsDirective>
                        </QueryBuilderComponent>
                    </div>
                </div>
                <div id='action-description'>
                    <p>This sample demonstrates the Rule Template functionality in QueryBuilder component using RadioButton components.  In the Country column, user can change the Operator as equal/not equal using RadioButton component and select the Value from DropDownList component.</p>
                </div>
                <div id='description'>
                    <p>This sample illustrates how to integrate ruleTemplate to the columns in the QueryBuilder. This is used for creating custom user interface for the columns with custom components and update the rule collection by using the component events.</p>
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

export class RulesTemplate extends React.Component {
    public items:  { [key: string]: Object}[];
    public fields: Object;
    qryBldrObj: QueryBuilderComponent;
    constructor(props) {
       super(props);
       this.items = [{field:'USA', label:'USA'},{field:'England', label:'England'},{field:'India',label:'India'},{field:'Spain',label:'Spain'}];
       this.fields = { text: 'field', value: 'label' };
       this.state = Object.assign({}, props);
       this.qryBldrObj = getComponent(document.getElementById('querybuilder'), 'query-builder');
    };
    fieldChange(args) {
        this.qryBldrObj.notifyChange(args.value, args.element, 'field');
    }
    valueChange(args) {
        this.qryBldrObj.notifyChange(args.value, args.element, 'value');
    }
    operatorClick(args) {
        this.qryBldrObj.getRule(args.event.target).operator = args.value;
    }
    render() {
        const args: any = this.state;
        return (<div className="e-rule e-rule-template">
            <div className="e-rule-filter">
            <DropDownListComponent change={this.fieldChange.bind(this)} fields={args.fields} dataSource={args.columns} value={args.rule.field}/>
            </div>
            <div className="e-rule-operator e-operator">
               <RadioButtonComponent id={args.ruleID + "_operator1"} change={this.operatorClick.bind(this)} label="Is Equal" value="equal" name="operator" checked={true} ></RadioButtonComponent>
               <RadioButtonComponent id={args.ruleID + "_operator2"} change={this.operatorClick.bind(this)} label="Is Not Equal" value="not equal" name="operator"></RadioButtonComponent>
            </div>
            <div className="e-rule-value e-value e-custom-value">
                <DropDownListComponent change={this.valueChange.bind(this)} fields={this.fields} dataSource={this.items} value={args.rule.value}/>
            </div>
            <div className="e-rule-value-delete">
                <button className="e-removerule e-custom-delete e-rule-delete e-css e-btn e-small e-round">
                    <span className="e-btn-icon e-icons e-delete-icon"/>
                </button>
            </div>
        </div>);
   }
}