import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ButtonComponent, ChatOptions, ChipListComponent, ClickEventArgs, SmartPasteButtonComponent } from "@syncfusion/ej2-react-buttons";
import { TextBoxComponent, TextAreaComponent } from "@syncfusion/ej2-react-inputs";
import { RadioButtonComponent } from "@syncfusion/ej2-react-buttons";
import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import './default.css';

function Default() {
    React.useEffect(() => {
        let copyContent: HTMLElement = document.getElementById('bug-report-text') as HTMLElement;
        copyContent.innerHTML = bugReports[0];
    }, []);
    let copyButton: ButtonComponent
    let chipList: ChipListComponent;
    let bugPresets: string[] = [
        "Issue with the dropdown menu",
        "Trouble logging into the website",
        "Search functionality not working",
        "Images missing on the product page"
    ];

    let bugReports: string[] = [
        `Hi, this is Alice. On July 3rd, I've come across a bug where the dropdown menu in the navigation bar doesn't close after selecting an item. I just navigated to the homepage, opened the dropdown menu in the navigation bar, clicked an item in the dropdown and then the issue occurred which happens only on Chrome. Though this doesn't seem like a serious/important bug, kindly look into it and resolve it. Regards, J Alice Abraham`,
        `Hey team, On May 2nd, K John Doe reported an issue where the login page refreshes instead of logging in when the user clicks the login button. This problem prevents users from accessing their accounts, making it a critical issue that needs immediate attention. The issue has been observed across all major browsers. To reproduce the issue, open any browser and navigate to the website's login page. Enter a valid username and password, then click the Login button.`,
        `Hi, Whenever I type something in the search bar and hit search, it doesn't return any results, even for items I know exist. This problem was noticed by Jane Smith on July 5th in FireFox browser. You can repro the issue by opening the site in the Firefox browser and navigate to the search bar. Type in any search term, including items that are known to exist, and click the search button. The search functionality fails to return any results, displaying an empty result set even for valid queries. This is quite important, but not urgent. Please look into it. Regards, M William Marker`,
        `Hello, When I selected the category option on the landing page and chose the electronics category, the images were missing on the product page. The placeholders are there, but no actual images are loading. This happens on all browsers. I reported this on July 3rd. It's not urgent, but it does affect the user experience. Regards, L Mike Johnson`
    ];

    const serverAIRequest = async (options: ChatOptions) => {
        let output: string = '';
        try {
            output = await (window as any).getAzureChatAIRequest(options) as string;
        } catch (error) {
            console.error("Error:", error);
        }
        return output;
    };

    const onCopyClickHandler = async () => {
        let copyContent: HTMLElement = document.getElementById('bug-report-text') as HTMLElement;
        await navigator.clipboard.writeText(copyContent.innerHTML);
        copyButton.content = "Copied";
        copyButton.iconCss = "e-icons e-check";
    }
    const chipsClickHandler = (e: ClickEventArgs) => {
        let copyContent: HTMLElement = document.getElementById('bug-report-text') as HTMLElement;
        copyContent.innerHTML = bugReports[e.index as number] as string;
        chipList.selectedChips = e.index as number;
        copyButton.content = "Copy";
        copyButton.iconCss = "e-icons e-copy";
    }

    return (
        <>
            <div className='control-pane'>
                <div className='control-section'>
                    <form className="form-container container bug-form-container" style={{
                        maxWidth: "900px",
                        lineHeight: "35px", backgroundColor: "#f3f4f6"
                    }}>
                        <div className="single-row-group">
                            <label htmlFor="bug-name" className="e-form-label">Bug Name</label>
                            <TextBoxComponent id="bug-name" placeholder="What's the bug ?" floatLabelType="Never" />
                        </div>
                        <div className="row-group">
                            <div>
                                <label htmlFor="reporter-name" className="e-form-label">Reporter</label>
                                <TextBoxComponent id="reporter-name" placeholder="Who is the reporter ?" floatLabelType="Never" />
                            </div>
                            <div>
                                <label htmlFor="submitted-date" className="e-form-label">Submitted Date</label>
                                <TextBoxComponent id="submitted-date" placeholder="When it is reported ?" floatLabelType="Never" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="bug-description" className="e-form-label">Bug Description</label>
                            <TextAreaComponent id="bug-description" placeholder="Describe a little about the bug." rows={2} floatLabelType="Never" />
                        </div>
                        <div className="row-group">
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <label htmlFor="reproduce-steps" className="e-form-label">Reproduce Steps</label>
                                <TextAreaComponent id="reproduce-steps" placeholder="Enter the repro steps here.." cols={30} rows={4} floatLabelType="Never" />
                            </div>
                            <div>
                                <label className="form-label">Bug Priority</label>
                                <div className="row">
                                    <RadioButtonComponent id="radio1" label="Low" name="bug-priority" value="low" />
                                </div>
                                <div className="row">
                                    <RadioButtonComponent id="radio2" label="Medium" name="bug-priority" value="medium" checked={true} />
                                </div>
                                <div className="row">
                                    <RadioButtonComponent id="radio3" label="High" name="bug-priority" value="high" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="browser" className="form-label">Select the browser</label>
                            <ComboBoxComponent id="browser" popupHeight='230px' dataSource={['Chrome', 'Firefox', 'Safari']} placeholder='Choose the browser' />
                        </div>
                        <div className="form-footer">
                            <ButtonComponent type="reset" id="reset" content="Reset" iconCss="e-icons e-reset" className="form-button" />
                            <SmartPasteButtonComponent type="button" id="smart-paste" className="form-button"
                                content={'Smart Paste'}
                                iconCss={"e-icons e-paste"}
                                aiAssistHandler={serverAIRequest} />
                        </div>
                    </form>
                    <div className="col-lg-4 property-section">
                        <div className="property-panel-section">
                            <div className="property-panel-content">
                                <h4> Choose a preset below </h4>
                                <div className="chip-container">
                                    <ChipListComponent id="chip-choice" aria-label="choiceChips"
                                        ref={chip => chipList = chip as ChipListComponent}
                                        chips={bugPresets} selection={'Single'}
                                        selectedChips={[0]}
                                        click={chipsClickHandler}
                                    ></ChipListComponent>
                                </div>
                                <div id="bug-report-text"></div>
                                <ButtonComponent id="copy-btn" ref={button => copyButton = button as ButtonComponent}
                                    content='Copy'
                                    iconCss="e-icons e-copy"
                                    onClick={onCopyClickHandler}
                                ></ButtonComponent>
                            </div>
                        </div>
                    </div>
                    <div id="action-description">
                        <p>This example demonstrates how the <code>SmartPasteButton</code> component can automatically fill out forms using data from the user's clipboard.</p>
                        <p>To explore this and more Syncfusion React Smart AI integrations locally, check out our <a target='_blank' href='https://github.com/syncfusion/smart-ai-samples/tree/master/react/ej2-react-ai-samples' aria-label="Navigate to explore the syncfusion React AI Demos repository">GitHub repository</a>.</p>
                    </div>
                    <div id='description'>
                        <p>In this example, clicking the Smart Paste button retrieves data from the clipboard and automatically fills in the form fields. This streamlines the data entry process by removing the need for manual input.</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Default;