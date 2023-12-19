/**
 * Rich Text Editor Mention integration sample
 */
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';
import { MentionComponent } from '@syncfusion/ej2-react-dropdowns';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { updateSampleSection } from '../common/sample-base';
import './mention-integration.css';
function MentionIntegration() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    const data: { [key: string]: Object }[] = [
        { Name: "Selma Rose", Status: "active", Eimg: "2", EmailId: "selma@gmail.com" },
        { Name: "Maria", Status: "active", Eimg: "1", EmailId: "maria@gmail.com" },
        { Name: "Russo Kay", Status: "busy", Eimg: "8", EmailId: "russo@gmail.com" },
        { Name: "Camden Kate", Status: "active", Eimg: "9", EmailId: "camden@gmail.com" },
        { Name: "Robert", Status: "busy", Eimg: "dp", EmailId: "robert@gmail.com" },
        { Name: "Garth", Status: "active", Eimg: "7", EmailId: "garth@gmail.com" },
        { Name: "Andrew James", Status: "away", Eimg: "pic04", EmailId: "noah@gmail.com" },
        { Name: "Olivia", Status: "busy", Eimg: "5", EmailId: "olivia@gmail.com" },
        { Name: "Sophia", Status: "away", Eimg: "6", EmailId: "sophia@gmail.com" },
        { Name: "Margaret", Status: "active", Eimg: "3", EmailId: "margaret@gmail.com" },
        { Name: "Ursula Ann", Status: "active", Eimg: "dp", EmailId: "ursula@gmail.com" },
        { Name: "Laura Grace", Status: "away", Eimg: "4", EmailId: "laura@gmail.com" },
        { Name: "Albert", Status: "active", Eimg: "pic03", EmailId: "albert@gmail.com" },
        { Name: "William", Status: "away", Eimg: "10", EmailId: "william@gmail.com" }
    ];
    const fieldsData: { [key: string]: string } = { text: 'Name' };
    function itemTemplate(data: any): JSX.Element {
        return (
            <table>
                <tr>
                    <td>
                        <div id="mention-TemplateList">
                            <img className="mentionEmpImage" src={"src/rich-text-editor/images/" + data.Eimg + ".png"} />
                            <span className={"e-badge e-badge-success e-badge-overlap e-badge-dot e-badge-bottom" + data.Status}></span>
                        </div>
                    </td>
                    <td className="mentionNameList">
                        <span className="person">{data.Name}</span>
                        <span className="email">{data.EmailId}</span>
                    </td>
                </tr>
            </table>
        );
    }
    function displayTemplate(data: any): JSX.Element {
        return (
            <React.Fragment>
                <a href={`mailto:${data.EmailId}`} title={data.EmailId}>@{data.Name}</a>
            </React.Fragment>
        );
    }
    function actionBegineHandler(args: any): void {
        if (args.requestType === 'EnterAction') {
            args.cancel = true;
        }
    }
    return (
        <div className='control-pane'>
            <div className='control-section' id="rte">
                <div className='rte-control-section'>
                    <RichTextEditorComponent id="mention_integration" placeholder="Type @ and tag the name" actionBegin={actionBegineHandler.bind(this)}  >
                        <p>Hello <a href="mailto:maria@gmail.com" title="maria@gmail.com">@Maria</a>, </p>
                        <p>Welcome to Mention demo, it easily integrates any editable element like input, textarea or any contenteditable supported element.</p>
                        <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
                    </RichTextEditorComponent>
                </div>
            </div>

            <MentionComponent id="mentionEditor" target="#mention_integration_rte-edit-view" suggestionCount={8} showMentionChar={false} allowSpaces={true} dataSource={data} fields={fieldsData}
                popupWidth="250px" popupHeight="200px" itemTemplate={itemTemplate} displayTemplate={displayTemplate}></MentionComponent>

            <div id="action-description">
                <p>This example shows how to integrate @mention component within Rich Text Editor component. Type `@` character and select a user from the suggestion list.</p>
            </div>

            <div id="description">
                <p> The @Mention is a component used to display a list of items that users can select or tag from the suggested list. In this demo, configured the following properties with popup dimensions.</p>
                <ul>
                    <li><code>allowSpaces</code> - Allows to search a word with space.</li>
                    <li><code>suggestionCount</code> - Control the items in suggestion list.</li>
                    <li><code>itemTemplate</code> - Used to display the customized appearance in suggestion list.</li>
                </ul>
            </div>
        </div>
    );
}
export default MentionIntegration;

