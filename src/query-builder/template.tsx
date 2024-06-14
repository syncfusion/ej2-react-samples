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
import { TabComponent, TabItemDirective, TabItemsDirective } from '@syncfusion/ej2-react-navigations';
import { getCELQuery, getSpELQuery } from './util';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import * as CodeMirror from 'codemirror';

export class Template extends SampleBase<{}, {}> {
    elem: HTMLElement;
    dropDownObj: DropDownList;
    boxObj: CheckBox;
    qryBldrObj: QueryBuilderComponent;
    radioButton: RadioButtonComponent;
    tabObj: TabComponent;
    headertext: any = [
        { text: "CEL" },
        { text: "SpEL" }
    ];
    spELQuery: string = '';
    currentIndex: number = 0;
    content: string;
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

    CELTemplate = () => {
        return (
            <div className="preview-content" onClick={this.handleMouseEnter} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                <div className="e-preview-options">
                    <div className="copy-tooltip" style={{ display: 'none' }} onClick={this.copyClipboard}>
                        <TooltipComponent opensOn="Click" content="Copied to clipboard">
                            <div className="e-icons copycode"></div>
                        </TooltipComponent>
                    </div>
                </div>
                <textarea className="e-cel-content" style={{ display: 'none' }}/>
            </div>
          );
    };
    SpELTemplate = () => {
          return (
            <div className="preview-content" onClick={this.handleMouseEnter} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                <div className="e-preview-options">
                    <div className="copy-tooltip" style={{ display: 'none' }} onClick={this.copyClipboard}>
                        <TooltipComponent opensOn="Click" content="Copied to clipboard">
                            <div className="e-icons copycode"></div>
                        </TooltipComponent>
                    </div>
                </div>
                <textarea className="e-spel-content" style={{ display: 'none' }}/>
            </div>
        );
    };
    handleMouseEnter = () => {
        let elem: any = document.getElementsByClassName("copy-tooltip");
        for (var i: number = 0; i< elem.length; i++) {
            if(this.tabObj.selectedItem == i) {
                elem[i].style.display = 'block';
            }
        }
    }
    handleMouseLeave = () => {
        let elem: any = document.getElementsByClassName("copy-tooltip");
        for (var i: number = 0; i< elem.length; i++) {
            if(this.tabObj.selectedItem == i) {
                elem[i].style.display = 'none';
            }
        }
    }
    copyClipboard = (args: any) => {
        navigator.clipboard.writeText(this.content);
        setTimeout(function() {
            (getComponent(args.target.closest('.e-tooltip'), 'tooltip') as any).close();
        }, 1000);
    };
    updateCELContentTemplate = () => {
        let codeMirrorEditor: any;
        const allRules = this.qryBldrObj.getValidRules();
        let celQuery: string = '';
        celQuery = getCELQuery(allRules, celQuery);
        this.content = celQuery
        /* custom code start */
        this.clearHighlight();
        codeMirrorEditor = CodeMirror.fromTextArea(document.getElementsByClassName('e-cel-content')[0] as any, {
            readOnly: true,
            theme: 'default',
            lineWrapping: true,
        });
        codeMirrorEditor.setValue(this.content);
        /* custom code end */
        if (!codeMirrorEditor) {
            document.getElementsByClassName('e-cel-content')[0].textContent = this.content;
            (document.getElementsByClassName('e-cel-content')[0] as HTMLElement).style.display = 'block';
        }
    }
    updateSpCELContentTemplate = () => {
        let codeMirrorEditor: any;
        this.spELQuery = '';
        const allRules: any = this.qryBldrObj.getValidRules();
        this.content = getSpELQuery(allRules);
        /* custom code start */
        this.clearHighlight();
        codeMirrorEditor = CodeMirror.fromTextArea(document.getElementsByClassName('e-spel-content')[0] as any, {
            readOnly: true,
            theme: 'default',
            lineWrapping: true,
        });
        codeMirrorEditor.setValue(this.content);
        /* custom code end */
        if (!codeMirrorEditor) {
            document.getElementsByClassName('e-spel-content')[0].textContent = this.content;
            (document.getElementsByClassName('e-spel-content')[0] as HTMLElement).style.display = 'block';
        }
    }
    tabCreated = () => {
        setTimeout(function() {
            this.updateCELContentTemplate();
        }, 100);
    };
    updateContentTemplate = () => {
        switch (this.currentIndex) {
            case 0:
                this.updateCELContentTemplate();
                break;
            case 1:
                this.updateSpCELContentTemplate();
                break;
        }
    };
    changeTab = (args: any) => {
        this.currentIndex = args.selectedIndex;
        setTimeout(function() {
            this.updateContentTemplate();
        }, 100);
    };
    /* custom code start */
    clearHighlight = () => {
        let codeMirrorElem: any = document.getElementsByClassName('e-query-preview')[0].querySelectorAll('.CodeMirror');
        for (let i: number = codeMirrorElem.length - 1; i >= 0; i--) {
            codeMirrorElem[i].remove();
        }
    }
    /* custom code end */
    updateRule() {
        this.updateContentTemplate();
    }
    
    render() {
        if (!isNullOrUndefined(document.getElementById('right-pane'))) {
            document.getElementById('right-pane').addEventListener('scroll', this.onScroll);
        }
        return (
            <div className='control-pane querybuilder-pane'>
                <div className='col-lg-12 control-section'>
                    <QueryBuilderComponent dataSource={expenseData} columns={this.filter} width='100%' rule={this.importRules}
                        ref={(scope) => { this.qryBldrObj = scope; }} created={this.onCreated.bind(this)}  ruleChange={this.updateRule.bind(this)} >
                    </QueryBuilderComponent>
                    <div className="e-query-preview">
                        <TabComponent id='defaultTab' ref={(scope) => {this.tabObj = scope; }} selected={this.changeTab} created={this.tabCreated}>
                            <TabItemsDirective>
                                <TabItemDirective header={this.headertext[0]} content={this.CELTemplate}/>
                                <TabItemDirective header={this.headertext[1]} content={this.SpELTemplate}/>
                            </TabItemsDirective>
                        </TabComponent>
                    </div>
                </div>
                <div id='action-description'>
                    <p>This sample demonstrates the integration of DropdownList, Slider
                    components as Templates in the Query Builder component with showing different types of queries such as CEL and SpEL. The query preview can be changed using the tab component.</p>
                </div>
                <div id='description'>
                    <p> This sample illustrates the way to integrate drop-down components, Slider, Checkbox with Query Builder. The
                        applicable types of templates are:
                    </p>
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
                    <p> In this demo queries are exported and imported in CEL and SpEL formats. For Common Expression Language (CEL) output, use the "cel" format. CEL is used for validating data.
For Spring Expression Language (SpEL) output, use the "spel" format. The Spring Expression Language (SpEL) is a powerful expression language that supports querying and manipulating an object graph at runtime.</p>
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