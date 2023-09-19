import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { QueryBuilderComponent, ColumnsModel, RuleModel, RuleChangeEventArgs } from '@syncfusion/ej2-react-querybuilder';
import { getComponent, isNullOrUndefined } from '@syncfusion/ej2-base';
import { RadioButtonComponent, CheckBox } from '@syncfusion/ej2-react-buttons';
import { DropDownList } from '@syncfusion/ej2-react-dropdowns';
import { Slider } from '@syncfusion/ej2-react-inputs';
import { expenseData } from './data-source';
import { PropertyPane } from '../common/property-pane';
import { SampleBase } from '../common/sample-base';
import './template.css';

export class Template extends SampleBase<{}, {}> {
    elem: HTMLElement;
    dropDownObj: DropDownList;
    boxObj: CheckBox;
    qryBldrObj: QueryBuilderComponent;
    radioButton: RadioButtonComponent;
    checked: boolean;
    txtAreaElem: Element = document.getElementById('ruleContent');
    validRule: RuleModel;
    filter: ColumnsModel[] = [
        {
            field: 'Category', label: 'Category', type: 'string',
        },
        {
            field: 'PaymentMode', label: 'Payment Mode', type: 'string', template: {
                create: () => {
                    this.elem = document.createElement('input');
                    this.elem.setAttribute('type', 'text');
                    return this.elem;
                },
                destroy: (args: { elementId: string }) => {
                    this.dropDownObj = getComponent(document.getElementById(args.elementId), 'dropdownlist') as DropDownList;
                    if (this.dropDownObj) {
                        this.dropDownObj.destroy();
                    }
                },
                write: (args: { elements: Element, values: string[] | string, operator: string }) => {
                    let ds: string[] = ['Cash', 'Debit Card', 'Credit Card', 'Net Banking', 'Wallet'];
                    this.dropDownObj = new DropDownList({
                        dataSource: ds,
                        value: args.values ? args.values as string : ds[0],
                        change: (e: any) => {
                            this.qryBldrObj.notifyChange(e.itemData.value, e.element);
                        }
                    });
                    this.dropDownObj.appendTo('#' + args.elements.id);
                }
            },
            operators: [
                { key: 'Equal', value: 'equal' },
                { key: 'Not Equal', value: 'notequal' }
            ]
        },
        {
            field: 'TransactionType', label: 'Transaction Type', type: 'boolean', template: {
                create: () => {
                    this.elem = document.createElement('input');
                    this.elem.setAttribute('type', 'checkbox');
                    return this.elem;
                },
                destroy: (args: { elementId: string }) => {
                    (getComponent(document.getElementById(args.elementId), 'checkbox') as CheckBox).destroy();
                },
                write: (args: { elements: Element, values: string }) => {
                    this.checked = args.values === 'IsExpensive' ? true : false;
                    this.boxObj = new CheckBox({
                        label: 'Is Expensive',
                        checked: this.checked,
                        change: (e: any) => {
                            this.qryBldrObj.notifyChange(e.checked ? 'expensive' : 'income', e.event.target);
                        }
                    });
                    this.boxObj.appendTo('#' + args.elements.id);
                }
            },
            operators: [
                { key: 'Equal', value: 'equal' },
                { key: 'Not Equal', value: 'notequal' }]
        },
        { field: 'Description', label: 'Description', type: 'string' },
        { field: 'Date', label: 'Date', type: 'date' },
        {
            field: 'Amount', label: 'Amount', type: 'number', template: {
                create: () => {
                    this.elem = document.createElement('div');
                    this.elem.setAttribute('class', 'ticks_slider');
                    return this.elem;
                },
                destroy: (args: { elementId: string }) => {
                    (getComponent(document.getElementById(args.elementId), 'slider') as Slider).destroy();
                },
                write: (args: { elements: Element, values: number }) => {
                    let slider: Slider = new Slider({
                        value: args.values,
                        min: 0,
                        max: 100,
                        type: 'MinRange',
                        tooltip: { isVisible: true, placement: 'Before', showOn: 'Hover' },
                        change: (e: any) => {
                            if (e.isInteracted) {
                                this.qryBldrObj.notifyChange(e.value, args.elements);
                            }  
                        }
                    });
                    slider.appendTo('#' + args.elements.id);
                }
            },
            operators: [
                { key: 'Equal', value: 'equal' },
                { key: 'Not equal', value: 'notequal' },
                { key: 'Greater than', value: 'greaterthan' },
                { key: 'Less than', value: 'lessthan' },
                { key: 'Less than or equal', value: 'lessthanorequal' },
                { key: 'Greater than or equal', value: 'greaterthanorequal' }
            ]
        }
    ];

    updateRule(args: RuleChangeEventArgs): void {
        this.txtAreaElem = document.getElementById('ruleContent');
        if (this.radioButton.checked) {
            (this.txtAreaElem as HTMLInputElement).value = this.qryBldrObj.getSqlFromRules(args.rule);
        } else {
            (this.txtAreaElem as HTMLInputElement).value = JSON.stringify(args.rule, null, 4);
        }
    }

    changeValue(): void {
        this.txtAreaElem = document.getElementById('ruleContent');
        this.validRule = this.qryBldrObj.getValidRules(this.qryBldrObj.rule);
        if (this.radioButton.checked) {
            (this.txtAreaElem as HTMLInputElement).value = this.qryBldrObj.getSqlFromRules(this.validRule);
        } else {
            (this.txtAreaElem as HTMLInputElement).value = JSON.stringify(this.validRule, null, 4);

        }
    }
    onCreated(): void {
        (document.getElementById('ruleContent') as HTMLInputElement).value = JSON.stringify(this.qryBldrObj.getValidRules(this.qryBldrObj.rule), null, 4);
    }

     // Handler used to reposition the tooltip on page scroll
    onScroll(): void {
        let tooltip: HTMLCollection = document.getElementsByClassName('e-handle e-control e-tooltip');
        let i: number; let len: number = tooltip.length, tooltipObj: any;
        for (i = 0; i < len; i++) {
			tooltipObj = (tooltip[i] as any).ej2_instances[0];
			tooltipObj.refresh(tooltipObj.element);
        }
    }
    importRules: RuleModel = {
        'condition': 'and',
        'rules': [{
            'label': 'Category',
            'field': 'Category',
            'type': 'string',
            'operator': 'in',
            'value': ['Clothing']
        },
        {
            'condition': 'or',
            'rules': [{
                'label': 'TransactionType',
                'field': 'TransactionType',
                'type': 'boolean',
                'operator': 'equal',
                'value': 'Income'
            },
            {
                'label': 'PaymentMode',
                'field': 'PaymentMode',
                'type': 'string',
                'operator': 'equal',
                'value': 'Cash'
            }]
        }, {
            'label': 'Amount',
            'field': 'Amount',
            'type': 'number',
            'operator': 'equal',
            'value': 10
        }
        ]
    };
    
    render() {
        if (!isNullOrUndefined(document.getElementById('right-pane'))) {
            document.getElementById('right-pane').addEventListener('scroll', this.onScroll);
        }
        return (
            <div className='control-pane querybuilder-pane'>
                <div className='col-lg-8 control-section'>
                    <QueryBuilderComponent dataSource={expenseData} columns={this.filter} width='100%' rule={this.importRules}
                        ref={(scope) => { this.qryBldrObj = scope; }} created={this.onCreated.bind(this)}  ruleChange={this.updateRule.bind(this)} >
                    </QueryBuilderComponent>
                </div>
                <div className='col-lg-4 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='qbproperypane' title='Properties'>
                            <tr><td>
                                <div className="row">
                                    <RadioButtonComponent label='JSON' name='rule' value='sql' checked={true}
                                        change={this.changeValue.bind(this)} ref={(scope) => { this.radioButton = scope; }}>
                                    </RadioButtonComponent>
                                </div>
                            </td>
                                <td>
                                    <div className="row">
                                        <RadioButtonComponent label='SQL' name='rule' value='sql'
                                            change={this.changeValue.bind(this)} ref={(scope) => { this.radioButton = scope; }}>
                                        </RadioButtonComponent>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} >
                                    <textarea id='ruleContent' readOnly={true} />
                                </td>
                            </tr>
                        </table>
                    </PropertyPane>
                </div>

                <div id='action-description'>
                    <p>This sample demonstrates the integration of DropdownList, Slider components as Templates in the Query Builder
        control.</p>
                </div>
                <div id='description'>
                    <p> This sample illustrates the way to integrate drop-down components, Slider, Checkbox with Query Builder. The
                        applicable types of templates are:
        <ul>
                            <li>
                                <code>DropDownList</code>
                            </li>
                            <li>
                                <code>AutoComplete</code>
                            </li>
                            <li>
                                <code>CheckBox</code>
                            </li>
                            <li>
                                <code>Slider</code>
                            </li>
                        </ul>
                    </p>
                    <p> In this sample also illustrates the created filters in JSON and SQL mode. </p>
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