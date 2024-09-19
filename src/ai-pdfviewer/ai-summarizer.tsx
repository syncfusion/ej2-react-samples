import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
    Inject, PdfViewerComponent, Toolbar, Magnification, Navigation, Annotation,
    LinkAnnotation, ThumbnailView, BookmarkView, TextSelection, TextSearch, FormFields,
    FormDesigner, PageOrganizer
} from '@syncfusion/ej2-react-pdfviewer';
import { FabComponent } from '@syncfusion/ej2-react-buttons';
import { Browser } from '@syncfusion/ej2-base';
import { AIAssistViewComponent, AssistViewModel, PromptRequestEventArgs, ToolbarSettingsModel } from '@syncfusion/ej2-react-interactive-chat';
import { useEffect } from 'react';

function Summarizer() {
    // Replace the localhost web service url here
    const SERVICE_URL: string = 'Service_Url/api/pdfviewer';
    useEffect(() => {
        document.body.setAttribute('id', 'e-pv-AI-body-container');
    }, []);
    let pdfviewer: PdfViewerComponent;
    let fabButton: FabComponent;
    let aiAssistViewInst: AIAssistViewComponent;
    let leftContainer: HTMLDivElement;
    let rightContainer: HTMLDivElement;
    let assistViews: AssistViewModel[] = [{ iconCss: "e-icons e-assistview-icon" }];
    let initialResponse: boolean = false;

    /* Function for the document load event*/
    function documentLoad() {
        if (fabButton) {
            (fabButton as any).element.style.display = 'block';
        }
    }

    /* Function for the document unload event*/
    function documentUnLoad() {
        if (rightContainer) {
            rightContainer.style.display = "none";
        }
        if (!Browser.isDevice) {
            if (leftContainer) {
                leftContainer.style.width = "100%";
            }
            pdfviewer.updateViewerContainer();
        }
        if (fabButton) {
            (fabButton as any).element.style.display = 'block';
        }
        aiAssistViewInst.prompts = [];
        aiAssistViewInst.promptSuggestions = [];
        initialResponse = false;
    }

    /* Function for the show the interchat*/
    function showAI() {
        if (fabButton) {
            (fabButton as any).element.style.display = 'none';
        }
        if (!Browser.isDevice) {
            if (leftContainer) {
                leftContainer.style.width = "70%";
            }
            pdfviewer.updateViewerContainer();
        }
        if (rightContainer) {
            rightContainer.style.display = "block";
        }
        if (!initialResponse) {
            aiAssistViewInst.executePrompt("Summarize the document");
        }
    }

    const bannerViewTemplate = () => {
        return (
            <div className="ai-assist-banner">
                <div className="e-icons e-assistview-icon"></div>
                <h2>AI Assistance</h2>
                <div className="ai-assist-banner-subtitle">Your everyday AI companion</div>
            </div>
        );
    };

    /* Interactive chat toolbar settings */
    let assistViewToolbarSettings: ToolbarSettingsModel = {
        itemClicked: function (args: any) {
            if (args.item.iconCss == 'e-icons e-close') {
                if (fabButton) {
                    (fabButton as any).element.style.display = 'block';
                }
                if (!Browser.isDevice) {
                    if (leftContainer) {
                        leftContainer.style.width = "100%";
                    }
                }
                if (rightContainer) {
                    rightContainer.style.display = "none";
                }
                if (!Browser.isDevice) {
                    pdfviewer.updateViewerContainer();
                }
            }
            if (args.item.iconCss == 'e-icons e-refresh') {
                let lastPropmt: any = aiAssistViewInst.prompts[aiAssistViewInst.prompts.length - 1].prompt;
                let editedPrompts: any = aiAssistViewInst.prompts;
                editedPrompts.pop();
                aiAssistViewInst.prompts = editedPrompts;
                aiAssistViewInst.onPropertyChanged(aiAssistViewInst);
                aiAssistViewInst.executePrompt(lastPropmt);
            }
        },
        items: [{ iconCss: 'e-icons e-refresh', align: 'Right' }, { iconCss: 'e-icons e-close', align: 'Right' }]
    };

    /*Function trigger when the prompt request is made*/
    function promptRequestToAI(args: PromptRequestEventArgs) {
        if (!initialResponse) {
            initialResponse = true;
            callAIAssist();
        }
        else {
            var post: any = args.prompt;
            let url: any = SERVICE_URL + "/GetAnswer";
            let xhr: XMLHttpRequest = new XMLHttpRequest();
            xhr.open('Post', url, true);
            xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 300) {
                    let response = xhr.responseText;
                    try {
                        let summarizeResponse = GetResponse(response);
                        let responseSuggestions = GetSuggestion(response);
                        const _promptSuggestions: string[] = responseSuggestions;
                        let references = extractReferences(summarizeResponse);
                        let modifiedResponse = summarizeResponse;
                        const referenceToLink: { [key: string]: string } = {};
                        references.forEach((ref) => {
                            let pageNumber = ref.replace(/[\[\]]/g, '');
                            let linkTag = `<a href='#' id="page-${pageNumber}" onclick="handlePageLinkClick(${parseInt(pageNumber, 10)})">${pageNumber}</a>`;
                            referenceToLink[ref] = linkTag;
                        });
                        Object.keys(referenceToLink).forEach(ref => {
                            let regex = new RegExp(ref, 'g');
                            modifiedResponse = modifiedResponse.replace(regex, referenceToLink[ref]);
                        });
                        aiAssistViewInst.addPromptResponse(modifiedResponse);
                        aiAssistViewInst.promptSuggestions = _promptSuggestions;
                        aiAssistViewInst.onPropertyChanged(aiAssistViewInst);
                    } catch (e) {
                        console.error('Failed to parse response as JSON:', e);
                    }
                } else {
                    console.error('Request failed with status:', xhr.status, xhr.statusText);
                }
            };
            xhr.onerror = function () {
                console.error('Network error');
            };
            xhr.send(JSON.stringify({ question: post }));
        }
    }

    function GetResponse(text: any): string {
        let jsonResponse = JSON.parse(text);
        let suggestions = jsonResponse.split('\nsuggestions');
        suggestions = suggestions.filter((suggestion: string) => suggestion.trim() !== '');
        let summarizeResponse = suggestions[suggestions.length - 2].trim();/*Get the response */
        return summarizeResponse;
    }

    function GetSuggestion(text: any): string[] {
        let jsonResponse = JSON.parse(text);
        let suggestions = jsonResponse.split('\nsuggestions');
        suggestions = suggestions.filter((suggestion: string) => suggestion.trim() !== '');
        suggestions.shift();
        let responseSuggestions = suggestions[0].split('\n');/*Get the suggestions */
        responseSuggestions = responseSuggestions.filter((suggestion: string) => suggestion.trim() !== '');
        responseSuggestions = responseSuggestions.map((line: string) => line.replace(/^\d+\.\s*/, ''));
        return responseSuggestions;
    }

    /*Fucntion to separate the page number */
    function extractReferences(text: string): string[] {
        const referenceRegex = /\[(.*?)\]/g;
        const matches: string[] = [];
        let match: RegExpExecArray | null;
        while ((match = referenceRegex.exec(text)) !== null) {
            const numbers = match[1].split(',').map(num => num.trim());
            matches.push(...numbers);
        }
        return matches;
    }

    /*Function fro navigate the page of the viewer*/
    (window as any).handlePageLinkClick = function (pageNumber: number) {
        pdfviewer.navigation.goToPage(pageNumber);
    };

    /*Initial prompt request method*/
    function callAIAssist() {
        let data: any = pdfviewer.getRootElement();
        var hashId: any = data.ej2_instances[0].viewerBase.hashId;
        var dictionary: any = {
            "hashId": hashId,
        };
        var post: any = JSON.stringify(dictionary);
        let url: any = SERVICE_URL + "/SummarizePDF";
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open('Post', url, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                let response = xhr.responseText;
                try {
                    let summarizeResponse = GetResponse(response);
                    let responseSuggestions = GetSuggestion(response);
                    const _promptSuggestions: string[] = responseSuggestions;
                    aiAssistViewInst.promptSuggestions = _promptSuggestions;
                    aiAssistViewInst.addPromptResponse(summarizeResponse);
                    aiAssistViewInst.onPropertyChanged(aiAssistViewInst);
                } catch (e) {
                    console.error('Failed to parse response as JSON:', e);
                }
            } else {
                console.error('Request failed with status:', xhr.status, xhr.statusText);
            }
        };
        xhr.onerror = function () {
            console.error('Network error');
        };
        xhr.send(post);
    }

    return (
        <>
            <div id="e-pv-AI-parent-container">
                <div id="e-pv-left-container"
                    ref={container => leftContainer = container as HTMLDivElement}>
                    <FabComponent id="e-pv-fab-btn" title="Open AI Assist" style={{ display: 'none' }}
                        ref={fab => fabButton = fab as FabComponent}
                        iconCss='e-icons e-assistview-icon'
                        onClick={showAI}
                    ></FabComponent>
                    <PdfViewerComponent id="PdfViewer" style={{ height: '100%', width: '100%' }}
                        ref={pdfviewerObj => pdfviewer = pdfviewerObj as PdfViewerComponent}
                        documentPath="https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf"
                        serviceUrl={SERVICE_URL}
                        documentLoad={documentLoad}
                        zoomMode="FitToPage"
                        documentUnload={documentUnLoad}
                    >
                        <Inject services={[Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, ThumbnailView, BookmarkView, TextSelection, TextSearch, FormFields, FormDesigner, PageOrganizer]} />
                    </PdfViewerComponent>
                </div>
                <div id="e-pv-right-container" style={{ display: 'none' }}
                    ref={container => rightContainer = container as HTMLDivElement}>
                    <div id="container-ai-assist">
                        <AIAssistViewComponent
                            ref={(aiAssistView) => aiAssistViewInst = aiAssistView as AIAssistViewComponent}
                            id="e-pv-defaultAIAssistView"
                            promptPlaceholder="Type your prompt for assistance..."
                            promptSuggestionsHeader="Suggested Prompts"
                            responseIconCss="e-icons e-assistview-icon"
                            views={assistViews}
                            toolbarSettings={assistViewToolbarSettings}
                            width="100%"
                            height="100vh"
                            bannerTemplate={bannerViewTemplate}
                            promptRequest={promptRequestToAI}
                        ></AIAssistViewComponent>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Summarizer