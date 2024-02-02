
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { QueryBuilderComponent} from '@syncfusion/ej2-react-querybuilder';
import { getComponent, closest } from '@syncfusion/ej2-base';
import { RadioButtonComponent } from '@syncfusion/ej2-react-buttons';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { updateSampleSection } from '../common/sample-base';
import './query-preview.css';
import { TabComponent, TabItemDirective, TabItemsDirective } from '@syncfusion/ej2-react-navigations';
import { getCELQuery, getSpELQuery, getMongoQuery, getParameterSQL, getNamedParameterSQL, updateRuleValue } from './util';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { employeeData } from './data-source';


declare let CodeMirror: any;
let headertext: any = [
    { text: "SQL" },
    { text: "JSON" },
    { text: "MongoDB" },
    { text: "CEL" },
    { text: "SpEL" }
];
let mongoQuery: string = '{';
let celQuery: string = '';
let spELQuery: string = '';
let queryType: string = 'inline';
let ruleValue = [];
let currentIndex: number = 0;
let content: string;
const frameworkTemplate = (props) => {
    let ds: string[] = ["React", "Angular", "Vue", "TypeScript", "JavaScript"];
    let state: any = Object.assign({}, props);
    const args = state;
    const frameworkChange = (event: any) => {
        let qryBldrObj: any = getComponent(document.getElementById('querybuilder'), 'query-builder');
        let elem: any = document.getElementById(args.ruleID).querySelector('.e-rule-value');
        qryBldrObj.notifyChange(event.value, elem, 'value');
    }
    return (<div><DropDownListComponent dataSource={ds} value={args.rule.value} change={frameworkChange}/></div>);
};
const HeaderTemplate = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    let qryBldrObj: any = useRef<QueryBuilderComponent>(null);
    let tabObj: any = useRef<TabComponent>(null);
    let dateOperators: any = [
        { value: 'equal', key: 'Equal'},
        { value: 'greaterthan', key: 'Greater Than'},
        { value: 'greaterthanorequal', key: 'Greater Than Or Equal' },
        { value: 'lessthan', key: 'Less Than' },
        { value: 'lessthanorequal', key: 'Less Than Or Equal' },
        { value: 'notequal', key: 'Not Equal' },
        { value: 'between', key: 'Between' },
        { value: 'notbetween', key: 'Not Between' }
    ];
    let boolOperators: object = [
        { value: 'equal', key: 'Equal'},
    ];
    let columnData: any = [
        { field: "EmployeeID", label: "Employee ID", type: "number" },
        { field: "FirstName", label: "First Name", type: "string" },
        { field: "LastName", label: "Last Name", type: "string" },
        { field: "Age", label: "Age", type: "number" },
        { field: "IsDeveloper", label: "Is Developer", type: "boolean", operators: boolOperators },
        { field: "PrimaryFramework", label: "Primary Framework", type: "string", template: frameworkTemplate, operators: boolOperators },
        { field: "HireDate", label: "Hire Date", type: "date", format: "MM/dd/yyyy", operators: dateOperators },
        { field: "Country", label: "Country", type: "string" },
    ];
    let importRules: any = {
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
    const SQLTemplate = () => {
        const isInline: any = queryType === "inline";
        const isParameter: any = queryType === "parameter";
        const isNamedParameter: any = queryType === "namedParameter";
        return (
            <div className="preview-content" onClick={handleMouseEnter} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <div className="e-preview-options">
                    <label>Format Info:</label>
                    <RadioButtonComponent cssClass="e-radio-option" change={change} label="Inline" checked={isInline} name="state" value="Inline"></RadioButtonComponent>
                    <RadioButtonComponent cssClass="e-radio-option" checked={isParameter} change={change} label="Parameter" name="state" value="Parameter"></RadioButtonComponent>
                    <RadioButtonComponent cssClass="e-radio-option" checked={isNamedParameter} change={change} label="Named Parameter" name="state" value="NamedParameter"></RadioButtonComponent>
                    <div className="copy-tooltip" style={{ display: 'none' }} onClick={copyClipboard}>
                        <TooltipComponent opensOn="Click" content="Copied to clipboard">
                            <div className="e-icons copycode"></div>
                        </TooltipComponent>
                    </div>
                </div>
                <textarea className="e-sql-content" style={{ display: 'none' }}
                />
            </div>
        );
    };
    const handleMouseEnter = () => {
        let elem: any = document.getElementsByClassName("copy-tooltip");
        for (var i: number = 0; i< elem.length; i++) {
            if(tabObj.current.selectedItem == i) {
                elem[i].style.display = 'block';
            }
        }
    }
    const handleMouseLeave = () => {
        let elem: any = document.getElementsByClassName("copy-tooltip");
        for (var i: number = 0; i< elem.length; i++) {
            if(tabObj.current.selectedItem == i) {
                elem[i].style.display = 'none';
            }
        }
    }
    const copyClipboard = (args: any) => {
        navigator.clipboard.writeText(content);
        setTimeout(function() {
            (getComponent(args.target.closest('.e-tooltip'), 'tooltip') as any).close();
        }, 1000);
    };

    const JSONTemplate = () => {    
        return (
            <div className="preview-content" onClick={handleMouseEnter} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <div className="e-preview-options">
                    <div className="copy-tooltip" style={{ display: 'none' }} onClick={copyClipboard}>
                        <TooltipComponent opensOn="Click" content="Copied to clipboard">
                            <div className="e-icons copycode"></div>
                        </TooltipComponent>
                    </div>
                </div>
                <textarea className="e-json-content" style={{ display: 'none' }}/>
            </div>
        );
    };

    const MongoDBTemplate = () => {
        return (
            <div className="preview-content" onClick={handleMouseEnter} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <div className="e-preview-options">
                    <div className="copy-tooltip" style={{ display: 'none' }} onClick={copyClipboard}>
                        <TooltipComponent opensOn="Click" content="Copied to clipboard">
                            <div className="e-icons copycode"></div>
                        </TooltipComponent>
                    </div>
                </div>
                <textarea className="e-mongo-content" style={{ display: 'none' }}/>
            </div>
          );
    };

    const CELTemplate = () => {
        return (
            <div className="preview-content" onClick={handleMouseEnter} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <div className="e-preview-options">
                    <div className="copy-tooltip" style={{ display: 'none' }} onClick={copyClipboard}>
                        <TooltipComponent opensOn="Click" content="Copied to clipboard">
                            <div className="e-icons copycode"></div>
                        </TooltipComponent>
                    </div>
                </div>
                <textarea className="e-cel-content" style={{ display: 'none' }}/>
            </div>
          );
    };

    const SpELTemplate = () => {
          return (
            <div className="preview-content" onClick={handleMouseEnter} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <div className="e-preview-options">
                    <div className="copy-tooltip" style={{ display: 'none' }} onClick={copyClipboard}>
                        <TooltipComponent opensOn="Click" content="Copied to clipboard">
                            <div className="e-icons copycode"></div>
                        </TooltipComponent>
                    </div>
                </div>
                <textarea className="e-spel-content" style={{ display: 'none' }}/>
            </div>
        );
    };

    const tabCreated = () => {
        setTimeout(function() {
            updateSQLContentTemplate();
        }, 100);
    };

    const changeTab = (args: any) => {
        currentIndex = args.selectedIndex;
        setTimeout(function() {
            updateContentTemplate();
        }, 100);
    };

    const updateContentTemplate = () => {
        switch (currentIndex) {
            case 0:
                updateSQLContentTemplate();
                break;
            case 1:
                updateJSONContentTemplate();
                break;
            case 2:
                updateMongoContentTemplate();
                break;
            case 3:
                updateCELContentTemplate();
                break;
            case 4:
                updateSpCELContentTemplate();
                break;
        }
    };

    const updateSQLContentTemplate = () => {
        let codeMirrorEditor: any;
        content = updateSQLContent();
        /* custom code start */
        clearHighlight();
        codeMirrorEditor = CodeMirror.fromTextArea(document.getElementsByClassName('e-sql-content')[0], {
            parserfile: "codemirror/contrib/sql/js/parsesql.js",
            path: "codemirror/js/",
            stylesheet: "css/sqlcolors.css",
            readOnly: true,
            matchBrackets: true,
            lineWrapping: true,
            textWrapping: true
        });
        codeMirrorEditor.setValue(content);
        /* custom code end */
        if (!codeMirrorEditor) {
            document.getElementsByClassName('e-sql-content')[0].textContent = content;
            (document.getElementsByClassName('e-sql-content')[0] as HTMLElement).style.display = 'block';
        }
    }
    const updateJSONContentTemplate = () => {
        let codeMirrorEditor: any;
        let validRule: any = qryBldrObj.current.getValidRules(qryBldrObj.current.rule);
        content = JSON.stringify(validRule, null, 4);
        /* custom code start */
        clearHighlight();
        codeMirrorEditor = CodeMirror.fromTextArea(document.getElementsByClassName('e-json-content')[0], {
            mode: 'javascript',
            readOnly: true,
            theme: 'default' // Set your desired theme here
        });
        codeMirrorEditor.setValue(content);
        /* custom code end */
        if (!codeMirrorEditor) {
            document.getElementsByClassName('e-json-content')[0].textContent = content;
            (document.getElementsByClassName('e-json-content')[0] as HTMLElement).style.display = 'block';
        }
    }
    const updateMongoContentTemplate = () => {
        let codeMirrorEditor: any;
        mongoQuery = '{';
        const allRules: any = qryBldrObj.current.getValidRules();
        mongoQuery =  getMongoQuery(allRules);
        const mongoJSON: any = JSON.parse(mongoQuery);
        content = JSON.stringify(mongoJSON, null, 4);
        /* custom code start */
        clearHighlight();
        codeMirrorEditor = CodeMirror.fromTextArea(document.getElementsByClassName('e-mongo-content')[0], {
            mode: 'javascript',
            readOnly: true,
            theme: 'default' // Set your desired theme here
        });
        codeMirrorEditor.setValue(content);
        /* custom code end */
        if (!codeMirrorEditor) {
            document.getElementsByClassName('e-mongo-content')[0].textContent = content;
            (document.getElementsByClassName('e-mongo-content')[0] as HTMLElement).style.display = 'block';
        }
    }
    const updateCELContentTemplate = () => {
        let codeMirrorEditor: any;
        const allRules: any = qryBldrObj.current.getValidRules();
        celQuery = '';
        content = getCELQuery(allRules);
        /* custom code start */
        clearHighlight();
        codeMirrorEditor = CodeMirror.fromTextArea(document.getElementsByClassName('e-cel-content')[0], {
            parserfile: "codemirror/contrib/sql/js/parsesql.js",
            path: "codemirror/js/",
            readOnly: true,
            stylesheet: "css/sqlcolors.css",
            matchBrackets: true,
            lineWrapping: true,
            textWrapping: true
        });
        codeMirrorEditor.setValue(content);
        /* custom code end */
        if (!codeMirrorEditor) {
            document.getElementsByClassName('e-cel-content')[0].textContent = content;
            (document.getElementsByClassName('e-cel-content')[0] as HTMLElement).style.display = 'block';
        }
    }
    const updateSpCELContentTemplate = () => {
        let codeMirrorEditor: any;
        spELQuery = '';
        const allRules: any = qryBldrObj.current.getValidRules();
        content = getSpELQuery(allRules);
        /* custom code start */
        clearHighlight();
        codeMirrorEditor = CodeMirror.fromTextArea(document.getElementsByClassName('e-spel-content')[0], {
            parserfile: "codemirror/contrib/sql/js/parsesql.js",
            path: "codemirror/js/",
            stylesheet: "css/sqlcolors.css",
            matchBrackets: true,
            lineWrapping: true,
            textWrapping: true,
            readOnly: true
        });
        codeMirrorEditor.setValue(content);
        /* custom code end */
        if (!codeMirrorEditor) {
            document.getElementsByClassName('e-spel-content')[0].textContent = content;
            (document.getElementsByClassName('e-spel-content')[0] as HTMLElement).style.display = 'block';
        }
    }
    /* custom code start */
    const clearHighlight = () => {
        let codeMirrorElem: any = document.getElementsByClassName('e-query-preview')[0].querySelectorAll('.CodeMirror');
        for (let i: number = codeMirrorElem.length - 1; i >= 0; i--) {
            codeMirrorElem[i].remove();
        }
    }
    /* custom code end */
    const change = (args: any) => {
        if (args.value === "Inline") {
            queryType = 'inline';
        } else if (args.value === "Parameter") {
            queryType = 'parameter';
        } else {
            queryType = 'namedParemeter';
        }
        updateSQLContentTemplate();
    }
    const updateSQLContent = () => {
        let content: string;
        let qbrule: any = qryBldrObj.current.getValidRules();
        let sqlJSON: any;
        switch (queryType){
            case 'inline':
                content = qryBldrObj.current.getSqlFromRules(qbrule);;
                break;
            case 'parameter':
                content = convertParameterSql(qbrule);
                sqlJSON = JSON.parse(content);
                content = JSON.stringify(sqlJSON, null, 4);
                break;
            default:
                content = convertNamedParameterSql(qbrule);
                sqlJSON = JSON.parse(content);
                content = JSON.stringify(sqlJSON, null, 4);
                break;
        }
        return content;
    }
    
    const convertParameterSql = (qbrule: any) => {
        ruleValue = updateRuleValue(qbrule, false); 
        let content: string = qryBldrObj.current.getSqlFromRules(qbrule); 
        content =  getParameterSQL(content, ruleValue);
        return content;
    }
    const convertNamedParameterSql = (qbrule: any) => {
        ruleValue = updateRuleValue(qbrule, true); 
        let content: string = qryBldrObj.current.getSqlFromRules(qbrule); 
        content = getNamedParameterSQL(content, ruleValue);
        return content;
    }
    const updateRule = () => {
        updateContentTemplate();
    }
    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div className='col-lg-12 control-section'>
                    <QueryBuilderComponent id="querybuilder" dataSource={employeeData} columns={columnData} rule={importRules} ref={qryBldrObj} ruleChange={updateRule}></QueryBuilderComponent>
                <div className="e-query-preview">
                    <TabComponent id='defaultTab' ref={tabObj} selected={changeTab} created={tabCreated}>
                        <TabItemsDirective>
                            <TabItemDirective header={headertext[0]} content={SQLTemplate}/>
                            <TabItemDirective header={headertext[1]} content={JSONTemplate}/>
                            <TabItemDirective header={headertext[2]} content={MongoDBTemplate}/>
                            <TabItemDirective header={headertext[3]} content={CELTemplate}/>
                            <TabItemDirective header={headertext[4]} content={SpELTemplate}/>
                        </TabItemsDirective>
                    </TabComponent>
                </div>
                </div>
            </div>
            <div id='action-description'>
                    <p>This sample demonstrates the overview of Query Builder component with showing differnt types of queries. The query preview can be changed using the tab component.</p>
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
export default HeaderTemplate;