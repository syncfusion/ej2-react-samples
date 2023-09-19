import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { QueryBuilderComponent, ColumnsModel, RuleModel, RuleChangeEventArgs } from '@syncfusion/ej2-react-querybuilder';
import { getComponent, isNullOrUndefined } from '@syncfusion/ej2-base';
import { RadioButtonComponent, CheckBox } from '@syncfusion/ej2-react-buttons';
import { DropDownList } from '@syncfusion/ej2-react-dropdowns';
import { Slider } from '@syncfusion/ej2-react-inputs';
import { expenseData } from './data-source';
import { PropertyPane } from '../common/property-pane';
import { updateSampleSection } from '../common/sample-base';
import './template.css';

const Template = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    let elem: HTMLElement;
    let dropDownObj = useRef<DropDownList>(null);
    let boxObj = useRef<CheckBox>(null);
    let qryBldrObj = useRef<QueryBuilderComponent>(null);
    let radioButton = useRef<RadioButtonComponent>(null);
    let checked: boolean;
    let txtAreaElem = useRef<HTMLTextAreaElement>(null);
    let validRule: RuleModel;
    let filter: ColumnsModel[] = [
        {
            field: "Category",
            label: "Category",
            type: "string",
        },
        {
            field: "PaymentMode",
            label: "Payment Mode",
            type: "string",
            template: {
                create: () => {
                    elem = document.createElement("input");
                    elem.setAttribute("type", "text");
                    return elem;
                },
                destroy: (args: { elementId: string }) => {
                    dropDownObj.current = getComponent(
                        document.getElementById(args.elementId),
                        "dropdownlist"
                    ) as DropDownList;
                    if (dropDownObj.current) {
                        dropDownObj.current.destroy();
                    }
                },
                write: (args: {
                    elements: Element;
                    values: string[] | string;
                    operator: string;
                }) => {
                    let ds: string[] = [
                        "Cash",
                        "Debit Card",
                        "Credit Card",
                        "Net Banking",
                        "Wallet",
                    ];
                    dropDownObj.current = new DropDownList({
                        dataSource: ds,
                        value: args.values ? (args.values as string) : ds[0],
                        change: (e: any) => {
                            qryBldrObj.current.notifyChange(e.itemData.value, e.element);
                        },
                    });
                    dropDownObj.current.appendTo("#" + args.elements.id);
                },
            },
            operators: [
                { key: "Equal", value: "equal" },
                { key: "Not Equal", value: "notequal" },
            ],
        },
        {
            field: "TransactionType",
            label: "Transaction Type",
            type: "boolean",
            template: {
                create: () => {
                    elem = document.createElement("input");
                    elem.setAttribute("type", "checkbox");
                    return elem;
                },
                destroy: (args: { elementId: string }) => {
                    (
                        getComponent(
                            document.getElementById(args.elementId),
                            "checkbox"
                        ) as CheckBox
                    ).destroy();
                },
                write: (args: { elements: Element; values: string }) => {
                    checked = args.values === "IsExpensive" ? true : false;
                    boxObj.current = new CheckBox({
                        label: "Is Expensive",
                        checked: checked,
                        change: (e: any) => {
                            qryBldrObj.current.notifyChange(
                                e.checked ? "expensive" : "income",
                                e.event.target
                            );
                        },
                    });
                    boxObj.current.appendTo("#" + args.elements.id);
                },
            },
            operators: [
                { key: "Equal", value: "equal" },
                { key: "Not Equal", value: "notequal" },
            ],
        },
        { field: "Description", label: "Description", type: "string" },
        { field: "Date", label: "Date", type: "date" },
        {
            field: "Amount",
            label: "Amount",
            type: "number",
            template: {
                create: () => {
                    elem = document.createElement("div");
                    elem.setAttribute("class", "ticks_slider");
                    return elem;
                },
                destroy: (args: { elementId: string }) => {
                    (
                        getComponent(
                            document.getElementById(args.elementId),
                            "slider"
                        ) as Slider
                    ).destroy();
                },
                write: (args: { elements: Element; values: number }) => {
                    let slider: Slider = new Slider({
                        value: args.values,
                        min: 0,
                        max: 100,
                        type: "MinRange",
                        tooltip: { isVisible: true, placement: "Before", showOn: "Hover" },
                        change: (e: any) => {
                            if (e.isInteracted) {
                                qryBldrObj.current.notifyChange(e.value, args.elements);
                            }
                        },
                    });
                    slider.appendTo("#" + args.elements.id);
                },
            },
            operators: [
                { key: "Equal", value: "equal" },
                { key: "Not equal", value: "notequal" },
                { key: "Greater than", value: "greaterthan" },
                { key: "Less than", value: "lessthan" },
                { key: "Less than or equal", value: "lessthanorequal" },
                { key: "Greater than or equal", value: "greaterthanorequal" },
            ],
        },
    ];
    const updateRule = (args: RuleChangeEventArgs): void => {
        if (radioButton.current.checked) {
            txtAreaElem.current.value = qryBldrObj.current.getSqlFromRules(args.rule);
        } else {
            txtAreaElem.current.value = JSON.stringify(args.rule, null, 4);
        }
    };
    const changeValue = (): void => {
        validRule = qryBldrObj.current.getValidRules(qryBldrObj.current.rule);
        if (radioButton.current.checked) {
            txtAreaElem.current.value = qryBldrObj.current.getSqlFromRules(validRule);
        } else {
            txtAreaElem.current.value = JSON.stringify(validRule, null, 4);
        }
    };
    const onCreated = (): void => {
        txtAreaElem.current.value = JSON.stringify(
            qryBldrObj.current.getValidRules(qryBldrObj.current.rule),
            null,
            4
        );
    };

    // Handler used to reposition the tooltip on page scroll
    const onScroll = (): void => {
        let tooltip: HTMLCollection = document.getElementsByClassName(
            "e-handle e-control e-tooltip"
        );
        let i: number;
        let len: number = tooltip.length,
            tooltipObj: any;
        for (i = 0; i < len; i++) {
            tooltipObj = (tooltip[i] as any).ej2_instances[0];
            tooltipObj.refresh(tooltipObj.element);
        }
    };
    let importRules: RuleModel = {
        condition: "and",
        rules: [
            {
                label: "Category",
                field: "Category",
                type: "string",
                operator: "in",
                value: ["Clothing"],
            },
            {
                condition: "or",
                rules: [
                    {
                        label: "TransactionType",
                        field: "TransactionType",
                        type: "boolean",
                        operator: "equal",
                        value: "Income",
                    },
                    {
                        label: "PaymentMode",
                        field: "PaymentMode",
                        type: "string",
                        operator: "equal",
                        value: "Cash",
                    },
                ],
            },
            {
                label: "Amount",
                field: "Amount",
                type: "number",
                operator: "equal",
                value: 10,
            },
        ],
    };

    if (!isNullOrUndefined(document.getElementById("right-pane"))) {
        document.getElementById("right-pane").addEventListener("scroll", onScroll);
    }

    return (
        <div className="control-pane querybuilder-pane">
            <div className="col-lg-8 control-section">
                <QueryBuilderComponent
                    dataSource={expenseData}
                    columns={filter}
                    width="100%"
                    rule={importRules}
                    ref={qryBldrObj}
                    created={onCreated}
                    ruleChange={updateRule}
                ></QueryBuilderComponent>
            </div>
            <div className="col-lg-4 property-section">
                <PropertyPane title="Properties">
                    <table id="qbproperypane" title="Properties">
                        <tr>
                            <td>
                                <div className="row">
                                    <RadioButtonComponent
                                        label="JSON"
                                        name="rule"
                                        value="sql"
                                        checked={true}
                                        change={changeValue}
                                        ref={radioButton}
                                    ></RadioButtonComponent>
                                </div>
                            </td>
                            <td>
                                <div className="row">
                                    <RadioButtonComponent
                                        label="SQL"
                                        name="rule"
                                        value="sql"
                                        change={changeValue}
                                        ref={radioButton}
                                    ></RadioButtonComponent>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <textarea id="ruleContent" readOnly={true} ref={txtAreaElem} />
                            </td>
                        </tr>
                    </table>
                </PropertyPane>
            </div>

            <div id="action-description">
                <p>
                    This sample demonstrates the integration of DropdownList, Slider
                    components as Templates in the Query Builder control.
                </p>
            </div>
            <div id="description">
                <p>
                    {" "}
                    This sample illustrates the way to integrate drop-down components,
                    Slider, Checkbox with Query Builder. The applicable types of templates
                    are:
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
                <p>
                    {" "}
                    In this sample also illustrates the created filters in JSON and SQL
                    mode.{" "}
                </p>
                <p>
                    More information about Query Builder can be found in this
                    <a
                        target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/query-builder/getting-started/"
                    >
                        documentation section
                    </a>
                    .
                </p>
            </div>
        </div>
    );
}
export default Template;