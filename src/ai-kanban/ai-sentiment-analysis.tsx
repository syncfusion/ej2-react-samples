import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ColumnDirective, ColumnsDirective, KanbanComponent } from "@syncfusion/ej2-react-kanban";
import { PizzaDataModel, pizzaData } from './datasource';
import { DialogEventArgs } from '@syncfusion/ej2-kanban';
import { ProgressButtonComponent } from "@syncfusion/ej2-react-splitbuttons";
import { ToastComponent } from "@syncfusion/ej2-react-notifications";
import { useEffect } from "react";
import { TextAreaComponent, TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import './sentiment-analysis.css';

function SentimentAnalysis() {
    let isAiChecked = false;
    let dataSource: PizzaDataModel[] = pizzaData;
    let sentiment: ProgressButtonComponent;
    let kanbanObj: KanbanComponent;
    let toast: ToastComponent;
    let categoryData: string[] = ['Menu', 'Order', 'Ready to Serve', 'Delivered', 'Served'];

    useEffect(() => {
        sentiment.element.onclick = () => {
            isAiChecked = false;
            getScore();
        };
    }, []);

    function cardTemplate(data: any) {
        return (
            <div className="card-template">
                <div className="card-template-wrap">
                    <table className="card-template-wrap">
                        <colgroup>
                            <col style={{ width: '55px' }} />
                            <col />
                        </colgroup>
                        <tbody>
                            <tr>
                                <td className="e-image">
                                    <img src={data.ImageURL} alt="" />
                                </td>
                                <td className="e-title">
                                    <div className="e-card-stacked">
                                        <div className="e-card-header">
                                            <div className="e-card-header-caption">
                                                <div className="e-card-header-title e-tooltip-text">{data.Title}</div>
                                            </div>
                                        </div>
                                        <div className="e-card-content" style={{ lineHeight: '2.75em' }}>
                                            <table className="card-template-wrap">
                                                <tbody>
                                                    <tr className="e-tooltip-text">
                                                        {(data.Category === "Menu" || data.Category === "Order" || data.Category === "Ready to Serve") ? (
                                                            <td colSpan={2}>
                                                                <div className="e-description">
                                                                    {data.Category === "Menu" ? data.Description : data.OrderID}
                                                                </div>
                                                            </td>
                                                        ) : (
                                                            <>
                                                                <td><div className="e-description">{data.OrderID}</div></td>
                                                                <td><span className="e-icons e-done"></span></td>
                                                            </>
                                                        )}
                                                    </tr>
                                                    <tr>
                                                        {data.Category !== "Menu" && (
                                                            <>
                                                                {data.Category === "Order" && (
                                                                    <>
                                                                        <td><div className="e-preparingText e-tooltip-text">Preparing</div></td>
                                                                        <td className="e-prepare">
                                                                            <div className="e-time e-tooltip-text">
                                                                                <div className="e-icons e-clock"></div><div className="e-mins">15 mins</div>
                                                                            </div>
                                                                        </td>
                                                                    </>
                                                                )}
                                                                {data.Category === "Ready to Serve" && (
                                                                    <>
                                                                        <td><div className="e-readyText e-tooltip-text">Ready to Serve</div></td>
                                                                        <td className="e-prepare">
                                                                            <div className="e-time e-tooltip-text">
                                                                                <div className="e-icons e-clock"></div><div className="e-mins">5 mins</div>
                                                                            </div>
                                                                        </td>
                                                                    </>
                                                                )}
                                                            </>
                                                        )}
                                                    </tr>
                                                    {(data.Category === "Delivered" || data.Category === "Served") && (
                                                        <>
                                                            <tr>
                                                                <td colSpan={2}>
                                                                    <label className="e-date">Deliver:</label>
                                                                    <span className="e-kanban-date">{new Date(data.Date).toLocaleDateString("en-US", {
                                                                        year: "numeric",
                                                                        month: "2-digit",
                                                                        day: "2-digit",
                                                                    })}</span>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td><div className="e-deliveredText e-tooltip-text">Delivered</div></td>
                                                                {data.Emoji && (
                                                                    <td className="e-prepare">
                                                                        <div className="e-emoji e-tooltip-text">
                                                                            <div className="e-emoji">{data.Emoji}</div>
                                                                        </div>
                                                                    </td>
                                                                )}
                                                            </tr>
                                                        </>
                                                    )}
                                                    {data.Category !== "Delivered" && data.Category !== "Served" && (
                                                        <tr>
                                                            <td><div className="e-size e-tooltip-text">{data.Size}</div></td>
                                                            <td><div className="e-price e-tooltip-text">{data.Price}</div></td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    function dialogTemplate(data: any) {
        return (
            <table>
                <tbody>
                    <tr>
                        <td className="e-label">ID</td>
                        <td>
                            <TextBoxComponent id="Id" name="Id" type="text" className="e-field" value={data.Id} disabled />
                        </td>
                    </tr>
                    <tr>
                        <td className="e-label">Category</td>
                        <td>
                            <DropDownListComponent type="text" name="Category" id="Category"
                                className="e-field" value={data.Category} popupHeight='300px'
                                dataSource={categoryData} fields={{ text: 'Category', value: 'Category' }} placeholder='Category'
                            ></DropDownListComponent>
                        </td>
                    </tr>
                    <tr>
                        <td className="e-label">Title</td>
                        <td>
                            <TextBoxComponent type="text" name="Title" id="Title" className="e-field" value={data.Title}
                                placeholder='Title'
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="e-label">Size</td>
                        <td>
                            <TextBoxComponent type="text" name="Size" id="Size" className="e-field" value={data.Size}
                                placeholder='Size'
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="e-label">Description</td>
                        <td>
                            <TextAreaComponent
                                name="Description"
                                id="Description"
                                className="e-field"
                                value={data.Description}
                                placeholder='Description'
                            ></TextAreaComponent>
                            <span className="e-float-line"></span>
                        </td>
                    </tr>
                    <tr>
                        <td className="e-label">Deliver</td>
                        <td>
                            <DatePickerComponent type="text"
                            className="e-field"
                            id="datepicker" value={data.Date}
                                format='MM/dd/yyyy'
                            />
                        </td>
                    </tr>
                    {data.Category === "Delivered" && (
                        <tr>
                            <td className="e-label">Feedback</td>
                            <td>
                                <TextBoxComponent type="text" className="e-field" id="feedback" value={data.Feedback}
                                    placeholder='Feedback'
                                    multiline={true}
                                />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    function onDialogClose(args: DialogEventArgs) {
        if (args.element?.querySelector('#datepicker') as any) {
            args.data.Date = (args.element?.querySelector('#datepicker') as any).ej2_instances[0].value.toLocaleString('es-PR').split(",")[0];
        }
    }

    function getScore(): void {
        try {
            let pizzaJson = JSON.stringify(dataSource);
            let description = "Provide a SentimentScore out of 5 (whole numbers only) based on the Feedback. If the feedback is null, do not give a SentimentScore. Use the dataset provided below to make recommendations. NOTE: Return the data in JSON format with all fields included, and return only JSON data, no explanatory text. Don't change the dataset formart. Just update the sentiment scrore given dataset field (fieldName: SentimentScore)" + pizzaJson;
            getResponseFromOpenAI(description).then((response) => {
                try {
                    const jsonArrayPattern = /\[\s*{[\s\S]*?}\s*\]/;
                    let result = response.match(jsonArrayPattern);
                    if (result && result[0]) {
                        let data = result[0].replace("```json", "").replace("```", "").replace("\r", "").replace("\n", "").replace("\t", "").trim();
                        dataSource = JSON.parse(data);
                        dataSource.forEach(item => {
                            if (item.SentimentScore !== undefined) {
                                if (item.SentimentScore > 0 && item.SentimentScore <= 2) {
                                    item.Emoji = "😢";
                                } else if (item.SentimentScore > 3 && item.SentimentScore <= 5) {
                                    item.Emoji = "😀";
                                } else if (item.SentimentScore === 3) {
                                    item.Emoji = "😐";
                                }
                            }
                        });
                        kanbanObj.dataSource = dataSource;
                        kanbanObj.dataBind();
                        isAiChecked = true;
                    } else {
                        isAiChecked = true;
                        toast.content = "An error occurred during the AI process, Please try again."
                        toast.show();
                    }
                } catch {
                    isAiChecked = true;
                    toast.content = "An error occurred during the AI process, Please try again."
                    toast.show();
                }
            });
        } catch {
            isAiChecked = true;
            toast.content = "An error occurred during the AI process, Please try again."
            toast.show();
        }
    }

    async function getResponseFromOpenAI(promptQuery: string): Promise<string> {
        const content = await (window as any).OpenAiModelKanban(promptQuery);
        return content ? content as string : '';
    }


    return (
        <>
            <div id="ai-button" style={{ margin: '10px' }}>
                <ProgressButtonComponent
                    ref={button => sentiment = button as ProgressButtonComponent}
                    id="sentiment"
                    content="Check Customer Sentiments"
                    enableProgress={false}
                    begin={() => {
                        sentiment.content = "Progressing...";
                        sentiment.dataBind();
                        const checkTasksGenerated = () => {
                            if (isAiChecked) {
                                sentiment.content = "Check Customer Sentiments";
                                sentiment.dataBind();
                                isAiChecked = false;
                            } else {
                                setTimeout(checkTasksGenerated, 100);
                            }
                        };
                        checkTasksGenerated();
                    }}
                ></ProgressButtonComponent>
            </div>
            <div className="control-section">
                <div className="control_wrapper">
                    <KanbanComponent
                        ref={kanban => kanbanObj = kanban as KanbanComponent}
                        id="Kanban"
                        keyField="Category"
                        dataSource={dataSource}
                        cardSettings={{
                            headerField: 'Id',
                            template: cardTemplate
                        }}
                        dialogSettings={{
                            template: dialogTemplate
                        }}
                        dialogClose={onDialogClose}
                    >
                        <ColumnsDirective>
                            <ColumnDirective headerText="Menu" keyField="Menu" />
                            <ColumnDirective headerText="Order" keyField="Order" />
                            <ColumnDirective headerText="Ready to Serve" keyField="Ready to Serve" />
                            <ColumnDirective headerText="Delivered" keyField="Delivered,Served" />
                        </ColumnsDirective>
                    </KanbanComponent>
                </div>
            </div>
            <ToastComponent
                ref={toastObj => toast = toastObj as ToastComponent}
                id="toast"
                position={{ X: 'Right', Y: 'Top' }}
                showCloseButton={true}
                target="#Kanban"
            ></ToastComponent>
        </>
    );
}

export default SentimentAnalysis;