import * as ReactDOM from 'react-dom';
import { render } from 'react-dom';
import * as React from 'react';
import { QueryBuilderComponent, ColumnsModel, RuleModel } from '@syncfusion/ej2-react-querybuilder';
import { getComponent, closest } from '@syncfusion/ej2-base';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import './header-template.css';

export class HeaderTemplate extends SampleBase<{}, {}> {
    public qryBldrObj: QueryBuilderComponent;
    public columnData: ColumnsModel[];
    public importRules: RuleModel;
    constructor(args){
        super(args)
        this.columnData = [
            { field: 'EmployeeID', label: 'EmployeeID', type: 'number' },
            { field: 'FirstName', label: 'FirstName', type: 'string' },
            { field: 'LastName', label: 'LastName', type: 'string' },
            { field: 'HireDate', label: 'HireDate', type: 'date', format: 'dd/MM/yyyy' },
            { field: 'Country', label: 'Country', type: 'string' },
        ];
        this.importRules = {
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
    }
    headerTemplate(props) {
        return (<HeaderFormTemplate {...props}/>);
    }
    
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                        <div className='col-lg-12 control-section'>
                            <QueryBuilderComponent id="querybuilder" columns={this.columnData}
                                rule={this.importRules} headerTemplate={this.headerTemplate} ref={(scope) => { this.qryBldrObj = scope; }} >
                            </QueryBuilderComponent>
                        </div>
                </div>
                <div id='action-description'>
                    <p>This sample demonstrates the Header Template functionality in QueryBuilder component using DropDownList and Button components. In this sample, user can change the Condition using DropDownList component and adding rules, groups and deleting groups by using Button component.</p>
                </div>
                <div id='description'>
                    <p>This sample illustrates how to integrate HeaderTemplate in the QueryBuilder. This is used for creating custom user interface for the header with custom components and update the rule collection by using the component events.</p>
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
export class HeaderFormTemplate extends React.Component {
    public items : { [key: string]: Object }[];
    public fields : object;
    qryBldrObj : QueryBuilderComponent;
    constructor(props) {
        super(props);
        this.items = [{'key': 'AND', 'value': 'and'},{'key': 'OR', 'value': 'or'}];
        this.fields = { text: 'key', value: 'value'};
        this.state = Object.assign({}, props);
        this.qryBldrObj = getComponent(document.getElementById('querybuilder'), 'query-builder');
    }
    conditionChange(args:any) {
        this.qryBldrObj.notifyChange(args.value, args.element, 'condition');
    }
    addGroupClick(args: any): void{
        let addbtn : any = args.currentTarget.offsetParent.id;
        let ddb = addbtn.split('_');
        this.qryBldrObj.addGroups([{ condition: 'and', 'rules': [{}]}], ddb[1]);
    }
    addRuleClick(args: any): void{
        let addbtn : any = args.currentTarget.offsetParent.id;
        let ddb = addbtn.split('_');
        this.qryBldrObj.addRules([{}], ddb[1]);
    }
    onClick(args: any) {
        this.qryBldrObj.deleteGroup(closest(args.target.offsetParent, '.e-group-container'));
    }
    render() {
        const args: any = this.state;
        return (<div className="query-template-control" >
        <div className="e-groupheader">
            <DropDownListComponent id={args.ruleID + "_cndtn"} cssClass='e-custom-group-btn' width="100px" dataSource={this.items} fields={this.fields} value={args.condition} change={this.conditionChange.bind(this)}/>
            <div className = "e-header">
                <div className = "e-qb-hdr-content">
                    <ButtonComponent className = "e-grp-btn" cssClass = 'e-primary' onClick={this.addGroupClick.bind(this)}>Add Group</ButtonComponent>
                </div>
                <div className = "e-qb-hdr-content">
                    <ButtonComponent className = "e-cond-btn" cssClass = 'e-primary' onClick={this.addRuleClick.bind(this)}>Add Condition</ButtonComponent>
                </div>
            {(() => {
            if (args.ruleID !== "querybuilder_group0") {
                return (<div className = "e-qb-hdr-content">
                <ButtonComponent id={args.ruleID + "_dltbtn"} cssClass='e-danger' onClick={this.onClick.bind(this)}>Remove</ButtonComponent>
                </div>);
            }
            })()}
            </div>
        </div>
        </div>);
    }
}
