import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { DocumentEditorContainerComponent, Toolbar, Ribbon } from '@syncfusion/ej2-react-documenteditor';
import { TitleBar } from './title-bar';
import './default.component.css';
import { SwitchComponent } from '@syncfusion/ej2-react-buttons';
DocumentEditorContainerComponent.Inject(Toolbar,Ribbon);
// tslint:disable:max-line-length
const HyperlinksAndBookmarksView = () => {
    useEffect(() => {
        updateSampleSection();
        rendereComplete();
    }, [])
    let hostUrl: string =
        "https://services.syncfusion.com/react/production/api/documenteditor/";
    let container = useRef<DocumentEditorContainerComponent>(null);
    let titleBar: TitleBar;
    const onLoadDefault = (): void => {
        // tslint:disable
        let defaultDocument: object = {
            sfdt: "UEsDBAoAAAAIAEqJbVbMYSO7bAUAAMgmAAAEAAAAc2ZkdO1azW7jNhB+FYK9GllbtuWNTy3SGls0WQTb7mGx9oGSKIswRSoUFScb7Lt3KFLxH90osREHaJLD0CRnOPPx04wy8QOWhWY5+0H/ThONx1pVtINLGuPx9wcMslB4/ICLJR6HvaCDiwyPR+cw4DkMQContZORk0la4HEXpKR2kCV43A87OHUyYvV0BCfhz3R5TeYUg/25KGHiN0UiFsNnEUsOE70OpjfLWvJIx7WmXfk++wlGam+L1LgaJao0UsOxD7DGtZVqbmXkPmdW3BoBkpTWrVIL45BUOeFwPmep2xDX1lPj7i+DwSi4GEwmGOZZfXa9aqwvdO2cMaJlARseGs3yB/j/EQCAj/hKCqnvC4oupCrZLYGjtkx3jIYByeqYkVcrJfsWREr3LflXwH/NATb8CWYVZ2JRIiISFEm5yIlalKtwmlB7a6HOzOpBl2DB/0RJwsQc9Xbx38Hb+fuocTQn9jFgjweXUtEcsaKscpRILhUqmUYbeNmNJKfaM93x7Y2lgCdQU10pz6rXesIKVsaARUsFypnfnZImEIhXhVVlLpOWB2iaF7Kt+0zELGFJJXRLhcq7kZMIrgNR7wXUt0NRTuaCeCHk7KYinoUz9NVrkAqW+7wgCcoZrPl0bkGJ5G15cFOxsiUgQpaQwr2XQ++oipkmmknhxZJzksey5UE1xn63BCtZ+8vadwWsaEvhO+8saakeyxzYLFvvhkcS+OEL5ewY2ScqbcYnTr4oG00g/+SG5UykRtNceQctmEj4PbplO6kptUUrM2XBvAHsxvbp2/UfXy7//PwXmuJM66Icf/iwXC7P5lLOOT0DED9MMZpOJaxf3aMljUwCpFO8c06wKoku3TfFZlV/ZKWMCWNhR7/X7qK+X4JFpCXQXlMlCEdfv1zOzl6tQBy7GAbPLobBezF8L4bvxfC9GP7Pi+E3WaGYCKQoiTNUlUhnSlbz7JASmBPGtRyb8vprfg+oFUTcmyo4xejFFc8YPbjcGSOz04H/fuwJGP6PBE5TuP2ig2LO4sUB1J5yoDdYeuGbW0bV4a9sTb/B8nhmXK9RmDVdmAiPU8JLWsPhRra/0nP9lQtIm5FiAGFVB19aDCJiobAdJNtx6bof2BtFK3ss2rBdd2J6j52YlX0Sr7bVvZjVUtOCWZ/ZmIDQD2IPYF8HopxMndQ2TEOuruUWUKvuo511R+e9MAyH3dEo6J4PRmbeYuO4ZjtzLqKFcaQZL8XjeBk3VMI65VYt0UvbQnP9OSpSCzZ4iyH20sk0t+cVViSZzrn1PrWdPpNO3aXd64g3w5r4G0+Hs3No26/rsNmBYu2xE3ergw1zt/tUR3ClTgVBB0tufdnuPNb8Djf5jS7ZPNOPzcNgMhychxvNw3CbsiuVdbauzW5wdm3eM21br2vpah0VdJERhZ+ArtlkW4lvPtLfaUoqrtE1UWSuSJGhiXTv52L/8kZ4P7cxCI5HH8eeYB97+s/FtH8q9gRt2BPsZ8+bjPQJ9jRh9Y9KiKfSviFMfx9hgv+EsTfpj8L+BozBqQjTb0OY/n7CvMlIWxJm8OqEGewShjX/PGz33NWvV43CKQgzaEOYgY8wbzjSloQZvjphhp4M0y4/n4QcwzbkGHqzyduIqiURwlcnQvgsIqzn3ZMQIWxDhPCZRHjNqJ4gwmepaXm8P6U8txs1yS9q8uA23l5oH1sLm6hW9dj94T4M+xc9+y2MFqF+FYqWkt/SBF1RYRq/2zdWW/3YNb+trU4k53JJkzYOnw8Hk1HwtOmZQdG0lwBUbmWcW6ncxzsrWT4vXZ9F1H2Zw78I86IO1LTqdrt9162JT+rFoPFCvJIXM9NrxfQd/xPi//NfUEsBAhQACgAAAAgASoltVsxhI7tsBQAAyCYAAAQAAAAAAAAAAAAAAAAAAAAAAHNmZHRQSwUGAAAAAAEAAQAyAAAAjgUAAAAA",
        };
        // tslint:enable
        container.current.documentEditor.open(JSON.stringify(defaultDocument));
        container.current.documentEditor.documentName = "Hyperlinks and Bookmarks";
        container.current.documentEditorSettings.showBookmarks = true;
        container.current.documentEditorSettings.showRuler = true;
        titleBar.updateDocumentTitle();
        container.current.documentChange = (): void => {
            titleBar.updateDocumentTitle();
            container.current.documentEditor.focusIn();
        };
    };
    const rendereComplete = (): void => {
        window.onbeforeunload = function () {
            return "Want to save your changes?";
        };
        container.current.documentEditor.pageOutline = "#E0E0E0";
        container.current.documentEditor.acceptTab = true;
        container.current.documentEditor.resize();
        titleBar = new TitleBar(
            document.getElementById("documenteditor_titlebar"),
            container.current.documentEditor,
            true
        );
       onLoadDefault();
titleBar.showButtons(false);
    };
    const change = (args):void=>{
        if (args.checked) {
            container.current.toolbarMode = 'Ribbon';
        }
        else {
            container.current.toolbarMode = 'Toolbar';
        }
        titleBar.showButtons(container.current.toolbarMode != 'Ribbon')
    }
    return (
        <div className="control-pane">
            <div className="control-section">
                <div className="flex-container">
                                  <label className="switchLabel" htmlFor="toolbarSwitch">Ribbon UI</label>
                            <div className="e-message render-mode-info">
                                <span className="e-msg-icon render-mode-info-icon" title="Turn OFF to switch from Ribbon to toolbar UI"></span>
                            </div>
                                <SwitchComponent cssClass="buttonSwitch" id="toolbarSwitch" change={change} checked={true}></SwitchComponent>
                                </div>
                <div id="documenteditor_titlebar" className="e-de-ctn-title"></div>
                <div id="documenteditor_container_body">
                    <DocumentEditorContainerComponent
                        id="container"
                        ref={container}
                        style={{ display: "block" }}
                                                height={"590px"}
                        toolbarMode= {"Ribbon"}
                        serviceUrl={hostUrl}
                        enableToolbar={true}
                        locale="en-US"
                    />
                </div>
            </div>
            <div id="action-description">
                <p>
                    This example demonstrates hyperlinks and bookmarks support in document
                    editor. A file, mail, webpage, or bookmark can be added as a link to
                    the text.
                </p>
            </div>
            <div id="description">
                <div>
                    <p>
                        In this example, you can find all the link types that can be added
                        to a text or portions of text in the document editor.
                    </p>
                    <ul>
                        <li>Link that refers to a webpage.</li>
                        <li>Link that refers to a mail.</li>
                        <li>Link that refers to a bookmark.</li>
                    </ul>
                    <p style={{ display: "block" }}>
                        You can also add your own screen tip text for a hyperlink. More
                        information about the document editor features can be found in this{" "}
                        <a
                            target="_blank"
                            href="https://ej2.syncfusion.com/react/documentation/document-editor/bookmark/"
                        >
                            documentation section.
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
export default HyperlinksAndBookmarksView;
