import * as ReactDOM from 'react-dom';
import { render } from 'react-dom';
import * as React from 'react';
import { QueryBuilderComponent, ColumnsModel, RuleModel } from '@syncfusion/ej2-react-querybuilder';
import { getComponent, closest } from '@syncfusion/ej2-base';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { updateSampleSection } from '../common/sample-base';
import './header-template.css';

function HeaderTemplate() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let qryBldrObj: QueryBuilderComponent;
    let columnData: ColumnsModel[];
    let importRules: RuleModel;
    columnData = [
        { field: 'EmployeeID', label: 'EmployeeID', type: 'number' },
        { field: 'FirstName', label: 'FirstName', type: 'string' },
        { field: 'LastName', label: 'LastName', type: 'string' },
        { field: 'HireDate', label: 'HireDate', type: 'date', format: 'dd/MM/yyyy' },
        { field: 'Country', label: 'Country', type: 'string' },
    ];
    importRules = {
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
    function headerTemplate(props) {
        let items: { [key: string]: Object }[];
        let fields: object;
        let qryBldrObj: QueryBuilderComponent;

        items = [{ 'key': 'AND', 'value': 'and' }, { 'key': 'OR', 'value': 'or' }];
        fields = { text: 'key', value: 'value' };
        let state = Object.assign({}, props);
        qryBldrObj = getComponent(document.getElementById('querybuilder'), 'query-builder');

        function conditionChange(args: any) {
            qryBldrObj.notifyChange(args.value, args.element, 'condition');
        }
        function addGroupClick(args: any): void {
            let addbtn: any = args.currentTarget.offsetParent.id;
            let ddb = addbtn.split('_');
            qryBldrObj.addGroups([{ condition: 'and', 'rules': [{}] }], ddb[1]);
        }
        function addRuleClick(args: any): void {
            let addbtn: any = args.currentTarget.offsetParent.id;
            let ddb = addbtn.split('_');
            qryBldrObj.addRules([{}], ddb[1]);
        }
        function onClick(args: any) {
            qryBldrObj.deleteGroup(closest(args.target.offsetParent, '.e-group-container'));
        }

        const args: any = state;
        return (<div className="query-template-control" >
            <div className="e-groupheader">
                <DropDownListComponent id={args.ruleID + "_cndtn"} cssClass='e-custom-group-btn' width="100px" dataSource={items} fields={fields} value={args.condition} change={conditionChange} />
                <div className="e-header">
                    <div className="e-qb-hdr-content">
                        <ButtonComponent className="e-grp-btn" cssClass='e-primary' onClick={addGroupClick}>Add Group</ButtonComponent>
                    </div>
                    <div className="e-qb-hdr-content">
                        <ButtonComponent className="e-cond-btn" cssClass='e-primary' onClick={addRuleClick}>Add Condition</ButtonComponent>
                    </div>
                    {(() => {
                        if (args.ruleID !== "querybuilder_group0") {
                            return (<div className="e-qb-hdr-content">
                                <ButtonComponent id={args.ruleID + "_dltbtn"} cssClass='e-danger' onClick={onClick}>Remove</ButtonComponent>
                            </div>);
                        }
                    })()}
                </div>
            </div>
        </div>);
    }

    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div className='col-lg-12 control-section'>
                    <QueryBuilderComponent id="querybuilder" columns={columnData}
                        rule={importRules} headerTemplate={headerTemplate} ref={(scope) => { qryBldrObj = scope; }} >
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
export default HeaderTemplate;
