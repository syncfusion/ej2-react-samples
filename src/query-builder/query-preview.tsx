import * as ReactDOM from 'react-dom';
import { render } from 'react-dom';
import * as React from 'react';
import { QueryBuilderComponent, ColumnsModel, RuleModel } from '@syncfusion/ej2-react-querybuilder';
import { getComponent, closest } from '@syncfusion/ej2-base';
import { ButtonComponent, RadioButtonComponent } from '@syncfusion/ej2-react-buttons';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import './query-preview.css';
import { Tab, TabComponent, TabItemDirective, TabItemsDirective } from '@syncfusion/ej2-react-navigations';
import { getCELQuery, getSpELQuery, getMongoQuery, getParameterSQL, getNamedParameterSQL, updateRuleValue } from './util';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { employeeData } from './data-source';

declare let CodeMirror: any;
const frameworkTemplate = (props) => {
    let ds = ["React", "Angular", "Vue", "TypeScript", "JavaScript"];
    let state = Object.assign({}, props);
    const args = state;
    const frameworkChange = (event) => {
        let qryBldrObj: any = getComponent(document.getElementById('querybuilder'), 'query-builder');
        let elem = document.getElementById(args.ruleID).querySelector('.e-rule-value');
        qryBldrObj.notifyChange(event.value, elem, 'value');
    }
    return (<div><DropDownListComponent dataSource={ds} value={args.rule.value} change={frameworkChange}/></div>);
};
export class Template extends SampleBase<{}, {}> {
    public headertext = [
        { text: "SQL" },
        { text: "JSON" },
        { text: "MongoDB" },
        { text: "CEL" },
        { text: "SpEL" }
    ];

    public mongoQuery: string = '{';
    public celQuery: string = '';
    public spELQuery: string = '';
    public queryType: string = 'inline';
    public ruleValue = [];
    public qryBldrObj: QueryBuilderComponent;
    public tabObj: TabComponent;
    public txtAreaElem: any;
    public currentIndex: number = 0;
    public content: string;
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
            { field: "PrimaryFramework", label: "Primary Framework", type: "string", template: frameworkTemplate, operators: this.boolOperators },
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
    SQLTemplate= () => {
        const isInline = this.queryType === "inline";
        const isParameter = this.queryType === "parameter";
        const isNamedParameter = this.queryType === "namedParameter";
        return (
            <div className="preview-content" onClick={this.handleMouseEnter} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                <div className="e-preview-options">
                    <label>Format Info:</label>
                    <RadioButtonComponent cssClass="e-radio-option" change={this.change} label="Inline" checked={isInline} name="state" value="Inline"></RadioButtonComponent>
                    <RadioButtonComponent cssClass="e-radio-option" checked={isParameter} change={this.change} label="Parameter" name="state" value="Parameter"></RadioButtonComponent>
                    <RadioButtonComponent cssClass="e-radio-option" checked={isNamedParameter} change={this.change} label="Named Parameter" name="state" value="NamedParameter"></RadioButtonComponent>
                    <div className="copy-tooltip" style={{ display: 'none' }} onClick={this.copyClipboard}>
                        <TooltipComponent opensOn="Click" content="Copied to clipboard">
                            <div className="e-icons copycode"></div>
                        </TooltipComponent>
                    </div>
                </div>
                <textarea className="e-sql-content" style={{ display: 'none' }}
                />
            </div>
        );
    }

    JSONTemplate = () => {    
        return (
            <div className="preview-content" onClick={this.handleMouseEnter} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                <div className="e-preview-options">
                    <div className="copy-tooltip" style={{ display: 'none' }} onClick={this.copyClipboard}>
                        <TooltipComponent opensOn="Click" content="Copied to clipboard">
                            <div className="e-icons copycode"></div>
                        </TooltipComponent>
                    </div>
                </div>
                <textarea className="e-json-content" style={{ display: 'none' }}/>
            </div>
        );
    };

    MongoDBTemplate = () => {
        return (
            <div className="preview-content" onClick={this.handleMouseEnter} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                <div className="e-preview-options">
                    <div className="copy-tooltip" style={{ display: 'none' }} onClick={this.copyClipboard}>
                        <TooltipComponent opensOn="Click" content="Copied to clipboard">
                            <div className="e-icons copycode"></div>
                        </TooltipComponent>
                    </div>
                </div>
                <textarea className="e-mongo-content" style={{ display: 'none' }}/>
            </div>
          );
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
    }

    tabCreated = (args: any) => {
        setTimeout(() => {
            this.updateSQLContentTemplate();
        }, 100);
    }
    
    changeTab = (args: any) => {
        this.currentIndex = args.selectedIndex;
        setTimeout(() => {
            this.updateContentTemplate();
        }, 100);
    }

    updateContentTemplate = () => {
        switch (this.currentIndex) {
            case 0:
                this.updateSQLContentTemplate();
                break;
            case 1:
                this.updateJSONContentTemplate();
                break;
            case 2:
                this.updateMongoContentTemplate();
                break;
            case 3:
                this.updateCELContentTemplate();
                break;
            case 4:
                this.updateSpCELContentTemplate();
                break;
        }
    }

    updateJSONContentTemplate = () => {
        let codeMirrorEditor: any;
        let validRule: any = this.qryBldrObj.getValidRules(this.qryBldrObj.rule);
        this.content = JSON.stringify(validRule, null, 4);
        /* custom code start */
        this.clearHighlight();
        codeMirrorEditor = CodeMirror.fromTextArea(document.getElementsByClassName('e-json-content')[0], {
            mode: 'javascript',
            readOnly: true,
            theme: 'default' // Set your desired theme here
        });
        codeMirrorEditor.setValue(this.content);
        /* custom code end */
        if (!codeMirrorEditor) {
            document.getElementsByClassName('e-json-content')[0].textContent = this.content;
            (document.getElementsByClassName('e-json-content')[0] as HTMLElement).style.display = 'block';
        }
    }

    updateMongoContentTemplate = () => {
        let codeMirrorEditor: any;
        this.mongoQuery = '{';
        const allRules: any = this.qryBldrObj.getValidRules();
        this.mongoQuery =  getMongoQuery(allRules);
        const mongoJSON: any = JSON.parse(this.mongoQuery);
        this.content = JSON.stringify(mongoJSON, null, 4);
         /* custom code start */
        this.clearHighlight();
        codeMirrorEditor = CodeMirror.fromTextArea(document.getElementsByClassName('e-mongo-content')[0], {
            mode: 'javascript',
            readOnly: true,
            theme: 'default' // Set your desired theme here
        });
        codeMirrorEditor.setValue(this.content);
        /* custom code end */
        if (!codeMirrorEditor) {
            document.getElementsByClassName('e-mongo-content')[0].textContent = this.content;
            (document.getElementsByClassName('e-mongo-content')[0] as HTMLElement).style.display = 'block';
        }
    }

    updateCELContentTemplate = () => {
        let codeMirrorEditor: any;
        const allRules: any = this.qryBldrObj.getValidRules();
        this.celQuery = '';
        this.content = getCELQuery(allRules);
        /* custom code start */
        this.clearHighlight();
        codeMirrorEditor = CodeMirror.fromTextArea(document.getElementsByClassName('e-cel-content')[0], {
            parserfile: "codemirror/contrib/sql/js/parsesql.js",
            path: "codemirror/js/",
            stylesheet: "css/sqlcolors.css",
            readOnly: true,
            matchBrackets: true,
            lineWrapping: true,
            textWrapping: true
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
        codeMirrorEditor = CodeMirror.fromTextArea(document.getElementsByClassName('e-spel-content')[0], {
            parserfile: "codemirror/contrib/sql/js/parsesql.js",
            path: "codemirror/js/",
            stylesheet: "css/sqlcolors.css",
            readOnly: true,
            matchBrackets: true,
            lineWrapping: true,
            textWrapping: true
        });
        codeMirrorEditor.setValue(this.content);
        /* custom code end */
        if (!codeMirrorEditor) {
            document.getElementsByClassName('e-spel-content')[0].textContent = this.content;
            (document.getElementsByClassName('e-spel-content')[0] as HTMLElement).style.display = 'block';
        }
    }

    change= (args: any) => {
        if (args.value === "Inline") {
            this.queryType = 'inline';
        } else if (args.value === "Parameter") {
            this.queryType = 'parameter';
        } else {
            this.queryType = 'namedParemeter';
        }
        this.updateSQLContentTemplate();
    }
    
    updateSQLContentTemplate = () => {
        let codeMirrorEditor: any;
        this.content = this.updateSQLContent();
        /* custom code start */
        this.clearHighlight();
        codeMirrorEditor = CodeMirror.fromTextArea(document.getElementsByClassName('e-sql-content')[0], {
            parserfile: "codemirror/contrib/sql/js/parsesql.js",
            path: "codemirror/js/",
            stylesheet: "css/sqlcolors.css",
            readOnly: true,
            matchBrackets: true,
            lineWrapping: true,
            textWrapping: true
        });
        codeMirrorEditor.setValue(this.content);
        /* custom code end */
        if (!codeMirrorEditor) {
            document.getElementsByClassName('e-sql-content')[0].textContent = this.content;
            (document.getElementsByClassName('e-sql-content')[0] as HTMLElement).style.display = 'block';
        }
    }
    updateSQLContent = () => {
        let content: any;
        let qbrule: any = this.qryBldrObj.getValidRules();
        let sqlJSON: any;
        switch (this.queryType){
            case 'inline':
                content = this.qryBldrObj.getSqlFromRules(qbrule);;
                break;
            case 'parameter':
                content = this.convertParameterSql(qbrule);
                sqlJSON = JSON.parse(content);
                content = JSON.stringify(sqlJSON, null, 4);
                break;
            default:
                content = this.convertNamedParameterSql(qbrule);
                sqlJSON = JSON.parse(content);
                content = JSON.stringify(sqlJSON, null, 4);
                break;
        }
        return content;
    }
    convertParameterSql = (qbrule: any) => {
        this.ruleValue = updateRuleValue(qbrule, false); 
        let content: string = this.qryBldrObj.getSqlFromRules(qbrule); 
        content =  getParameterSQL(content, this.ruleValue);
        return content;
    }

    convertNamedParameterSql = (qbrule: any) => {
        this.ruleValue = updateRuleValue(qbrule, true); 
        let content = this.qryBldrObj.getSqlFromRules(qbrule); 
        content = getNamedParameterSQL(content, this.ruleValue);
        return content;
    }
    /* custom code start */
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
    /* custom code end */

    copyClipboard = (args: any) => {
        navigator.clipboard.writeText(this.content);
        setTimeout(function() {
            (getComponent(args.target.closest('.e-tooltip'), 'tooltip') as any).close();
        }, 1000);
    }

    /* custom code start */
    clearHighlight = () => {
        let codeMirrorElem: any = document.getElementsByClassName('e-query-preview')[0].querySelectorAll('.CodeMirror');
        for (let i = codeMirrorElem.length - 1; i >= 0; i--) {
            codeMirrorElem[i].remove();
        }
    }
    /* custom code end */
    updateRule = () => {
        this.updateContentTemplate();
    }
    // Handler used to reposition the tooltip on page scroll
    
    render() {
        return (
            <div className='control-pane'>
            <div className='control-section'>
                <div className='col-lg-12 control-section'>
                <QueryBuilderComponent id="querybuilder" dataSource={employeeData} columns={this.columnData} rule={this.importRules} ref={(scope) => { this.qryBldrObj = scope; }} ruleChange={this.updateRule}></QueryBuilderComponent>
                <div className="e-query-preview">
                    <TabComponent id='defaultTab' ref={(scope) => { this.tabObj = scope; }} selected={this.changeTab} created={this.tabCreated}>
                        <TabItemsDirective>
                            <TabItemDirective header={this.headertext[0]} content={this.SQLTemplate}/>
                            <TabItemDirective header={this.headertext[1]} content={this.JSONTemplate}/>
                            <TabItemDirective header={this.headertext[2]} content={this.MongoDBTemplate}/>
                            <TabItemDirective header={this.headertext[3]} content={this.CELTemplate}/>
                            <TabItemDirective header={this.headertext[4]} content={this.SpELTemplate}/>
                        </TabItemsDirective>
                    </TabComponent>
                </div>
                </div>
            </div>
            <div id='action-description'>
                    <p>This sample demonstrates the Query Builder component with showing different types of queries. The query preview can be changed using the tab component.</p>
                </div>
                <div id='description'>
                    <p>
                    The Query Builder component is used to create or edit the filters. You can edit the filters by changing the appropriate fields. In this demo, Query Builder features such as exporting the filter as SQL Query and JSON are used along with the sample level implementation of
                    CEL, SpEL and Mongo queries.
                    </p>
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