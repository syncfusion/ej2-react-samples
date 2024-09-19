import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SelectEventArgs, TabComponent, TabItemDirective, TabItemsDirective } from '@syncfusion/ej2-react-navigations';
import './smart-scheduler.css';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, EventRenderedArgs } from '@syncfusion/ej2-react-schedule';
import { createSpinner, DialogComponent, hideSpinner, showSpinner } from '@syncfusion/ej2-react-popups';
import { FormEvent, useEffect } from 'react';
import { ButtonComponent, ChatOptions, SmartPasteButtonComponent } from '@syncfusion/ej2-react-buttons';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { ToastComponent } from '@syncfusion/ej2-react-notifications';

function SmartScheduler() {
    let scheduleObj: ScheduleComponent;
    let dialog: DialogComponent;
    let tabObj: TabComponent;
    let toast: ToastComponent;
    let cancelButton: ButtonComponent;
    let saveButton: ButtonComponent;
    useEffect(() => {
        createSpinner({
            target: document.getElementById('editor_dialog') as HTMLElement
        });
        cancelButton.element.onclick = () => {
          dialog.hide();
        };
        saveButton.element.onclick = formSubmit;
    }, []);

    let cardContent1 = "Title: Discussion on Ticket 429519" +
        "Hi John,\n\n" +
        "We have scheduled the meeting for tomorrow (24th Jan) at 12 PM IST at Mathura Towers and this meeting is scheduled to discuss the issue related to the ticket 429519 only. " +
        "For any other issues, please create a new ticket or update the respective tickets and our technical team will follow up with the details in those tickets.\n\n" +
        "Note: Screen sharing is to see the issue at your end and debug directly, if needed. We request you to contact your IT team and get prior approval/disable firewall settings to share the controls. This will help to minimize the resolution time.\n\n" +
        "Regards,\n\n" +
        "Sabitha";

    let cardContent2 = "Title: Meeting to discuss on Ticket 603027" +
        "Hi Liji,\n\n" +
        "We have scheduled the meeting for today at 3 PM IST in Chennai and this meeting is scheduled to discuss the issue related to the ticket 595353 and 603027 only. " +
        "For any other issues, please create a new ticket or update the respective tickets and our technical team will follow up with the details in those tickets.\n\n" +
        "Regards,\n\n" +
        "Ram";

    let cardContent3 = "Title: Exciting Updates and Demo Invitation from Syncfusion" +
        "You: Hi Alex, I hope you're doing well! I’m reaching out from Syncfusion Software Pvt Ltd. " +
        "We've recently made some exciting updates to our UI components and I'd love to share them with you.\n" +
        "Recipient: Hi Andrew, I'm doing well, thanks! What kind of updates have you made?\n" +
        "You: We've enhanced key components such as the Scheduler, Carousel, Tab, Toolbar, Accordion, and Appbar. " +
        "Additionally, we've improved accessibility to meet WCAG 2.2 standards and enhanced security with XSS prevention. " +
        "These updates aim to provide a more robust and secure experience for our users.\n" +
        "Recipient: That sounds fantastic! I’d be interested in seeing these updates in action.\n" +
        "You: Wonderful! I’d love to schedule a demo to showcase these new features. Are you available for a session on Wednesday, " +
        "August 7th at 11 AM, or Friday, August 9th at 2 PM? The demo will be held at our Morrisville office.\n" +
        "Recipient: Friday, August 9th at 2 PM works for me.\n" +
        "You: Perfect! I’ll send a calendar invite for Friday, August 9th at 2 PM at our Morrisville office.\n" +
        "Recipient: Great, see you then!\n" +
        "You: See you on Friday! Have a great day.";

    interface ScheduleEvent {
        Id: number;
        Subject: string;
        Location: string;
        StartTime: Date;
        EndTime: Date;
        Description: string;
    }

    let event: ScheduleEvent;

    let events: any = [];
    const onEventRendered = (args: EventRenderedArgs) => {
        if (event && (event as any).Id === args.data.Id) {
            args.element.classList.add('e-appointment-border');
        }
    }

    function showDialog() {
        dialog.show();
    }

    function handleButtonClick(content: string): void {
        navigator.clipboard.writeText(content).then(function () {
            console.log('Async: Copying to clipboard was successful!');
        }, function (err) {
            console.error('Async: Could not copy text: ', err);
        });
        showDialog();
    }

    function meetingContents() {
        return (
            <div id="meeting_contents" >
                <div className="control-section">
                    <div className="row card-item">
                        <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6" style={{ marginBottom: "15px", marginTop: "15px" }}>
                            <div tabIndex={0} className="e-card" id="basic">
                                <div className="e-card-header">
                                    <div className="e-card-header-caption">
                                        <div className="e-card-header-title">Discussion on Ticket 429519</div>
                                    </div>
                                    <ButtonComponent id="first-card-button"
                                        content='Schedule Appointment'
                                        iconCss='e-icons e-timeline-work-week'
                                        onClick={() => handleButtonClick(cardContent1)}
                                    ></ButtonComponent>
                                </div>
                                <div className="e-card-content">
                                    <div>
                                        <span>Hi John,</span><br /><br />
                                        <span>We have scheduled the meeting for tomorrow (24th Jan) at 12 PM IST at Mathura Towers
                                            and this meeting is scheduled to discuss the issue related to the ticket 429519 only. </span>
                                        <span>For any other issues, please create a new ticket or update the respective tickets and
                                            our technical team will follow up with the details in those tickets.</span> <br /><br />
                                        <p>
                                            "Note: Screen sharing is to see the issue at your end and debug directly,
                                            if needed. We request you to contact your IT team and get prior approval/disable firewall settings to share the controls.
                                            This will help to minimize the resolution time."
                                        </p><br />
                                        <span>Regards,</span> <br />
                                        <span>Sabitha</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row card-item">
                        <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6" style={{ marginBottom: "15px", marginTop: "15px" }}>
                            <div tabIndex={0} className="e-card" id="basic">
                                <div className="e-card-header">
                                    <div className="e-card-header-caption">
                                        <div className="e-card-header-title">Exciting Updates and Demo Invitation from Syncfusion</div>
                                    </div>
                                    <ButtonComponent id="second-card-button"
                                        content='Schedule Appointment' iconCss='e-icons e-timeline-work-week'
                                        onClick={() => handleButtonClick(cardContent2)}
                                    ></ButtonComponent>
                                </div>
                                <div className="e-card-content">
                                    <div>
                                        <br />
                                        <span>
                                            <strong>You:</strong> Hi Alex, I hope you're doing well! I’m reaching out from Syncfusion Software Pvt Ltd.
                                            We've recently made some exciting updates to our UI components and I'd love to share them with you.</span><br /><br />
                                        <span><strong>Recipient:</strong> Hi Andrew, I'm doing well, thanks! What kind of updates have you made?</span><br /> <br />
                                        <span>
                                            <strong>You:</strong> We've enhanced key components such as the Scheduler, Carousel, Tab, Toolbar, Accordion, and Appbar.
                                            Additionally, we've improved accessibility to meet WCAG 2.2 standards and enhanced security with XSS prevention.
                                            These updates aim to provide a more robust and secure experience for our users.
                                        </span><br /><br />
                                        <span>
                                            <strong>Recipient:</strong> That sounds fantastic! I’d be interested in seeing these updates in action.
                                        </span><br /><br />
                                        <span>
                                            <strong>You:</strong> Wonderful! I’d love to schedule a demo to showcase these new features. Are you available for a session on Wednesday,
                                            August 7th at 11 AM, or Friday, August 9th at 2 PM? The demo will be held at our Morrisville office.
                                        </span><br /><br />
                                        <span>
                                            <strong>Recipient:</strong> Friday, August 9th at 2 PM works for me.
                                        </span><br /><br />
                                        <span>
                                            <strong>You:</strong> Perfect! I’ll send a calendar invite for Friday, August 9th at 2 PM at our Morrisville office.
                                        </span><br /><br />
                                        <span>
                                            <strong>Recipient:</strong> Great, see you then!
                                        </span><br /><br />
                                        <span>
                                            <strong>You:</strong> See you on Friday! Have a great day.
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row card-item">
                        <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6" style={{ marginBottom: "15px", marginTop: "15px" }}>
                            <div tabIndex={0} className="e-card" id="basic">
                                <div className="e-card-header">
                                    <div className="e-card-header-caption">
                                        <div className="e-card-header-title">Meeting to discuss on Ticket 603027</div>
                                    </div>
                                    <ButtonComponent id="third-card-button"
                                        content='Schedule Appointment' iconCss='e-icons e-timeline-work-week'
                                        onClick={() => handleButtonClick(cardContent3)}
                                    ></ButtonComponent>
                                </div>
                                <div className="e-card-content">
                                    <div>
                                        <span>Hi Liji,</span><br /><br />
                                        <span>We have scheduled the meeting for today at 3 PM IST in Chennai
                                            and this meeting is scheduled to discuss the issue related to the ticket 603027 only. </span>
                                        <span>For any other issues, please create a new ticket or
                                            update the respective tickets and our technical team will follow up with the details in those tickets.</span> <br /><br />
                                        <br />
                                        <span>Regards,</span> <br />
                                        <span>Ram</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    function schedule() {
        return (
            <div id="scheduler" >
                <ScheduleComponent
                    ref={schedule => scheduleObj = schedule as ScheduleComponent}
                    height={'750px'}
                    selectedDate={new Date()}
                    currentView='Week'
                    eventSettings={{
                        dataSource: events
                    }}
                    eventRendered={onEventRendered}
                >
                    <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
                </ScheduleComponent>
            </div>
        )
    }

    const tabSelected = (args: SelectEventArgs) => {
        if ((args as any).selectedIndex === 1) {
            if (scheduleObj) {
                scheduleObj.refresh();
            }
            if (event && (event as any).Subject) {
                toast.content = `${event.Subject} has been scheduled at ${event.StartTime.toLocaleString()}`;
                toast.dataBind();
                toast.show();
            }

        }
    }

    const created = () => {
        (document.getElementById('dlgContent') as HTMLElement).style.visibility = 'visible';
        (document.getElementById('dlgHeader') as HTMLElement).style.visibility = 'visible';
    }

    const closeDialog = () => {
        (document.getElementById('subject') as HTMLInputElement).value = '';
        (document.getElementById('location') as HTMLInputElement).value = '';
        (document.getElementById('startTime') as HTMLInputElement).value = (() => {
            let d = new Date();
            d.setHours(12, 0, 0, 0);
            let date = d.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
            let time = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
            return `${date} ${time}`;
        })();
        (document.getElementById('endTime') as HTMLInputElement).value = (() => {
            let d = new Date();
            d.setHours(14, 0, 0, 0);
            let date = d.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
            let time = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
            return `${date} ${time}`;
        })();
        (document.getElementById('description') as HTMLTextAreaElement).value = '';
        (document.getElementById('saveButton') as HTMLButtonElement).disabled = true;
    }

    const openDialog = () => {
        showSpinner(document.getElementById('editor_dialog') as HTMLElement);
        (document.querySelector('.smart-schedule-button') as HTMLElement).click();
        let intervalId = setInterval(() => {
            let subject = (document.getElementById('subject') as HTMLInputElement).value;
            if (subject !== '') {
                clearInterval(intervalId);
                hideSpinner(document.getElementById('editor_dialog') as HTMLElement);
                (document.getElementById('saveButton') as HTMLButtonElement).disabled = false;
            }
        }, 1000);
    }

    const AzureAIRequest = async (settings: ChatOptions) => {
        let output = '';
        try {
            const response = await (window as any).getAzureChatAIRequest(settings) as string;
            output = response;
        } catch (error) {
            console.error("Error:", error);
        }
        return output;
    };

    function switchTab(): void {
        tabObj.select(1);
    }

    const formSubmit = (e: Event | FormEvent) => {
        e.preventDefault();
        let subject = (document.getElementById('subject') as HTMLInputElement).value;
        let location = (document.getElementById('location') as HTMLInputElement).value;
        let startTime = (document.getElementById('startTime') as HTMLInputElement).value;
        let endTime = (document.getElementById('endTime') as HTMLInputElement).value;
        let description = (document.getElementById('description') as HTMLTextAreaElement).value;
        var newEvent = [];
        event = {
            Id: events.length + 1,
            Subject: subject,
            Location: location,
            StartTime: new Date(startTime),
            EndTime: new Date(endTime),
            Description: description
        };
        newEvent = [...events];
        newEvent.push(event);
        events = newEvent;
        scheduleObj.selectedDate = new Date(startTime);
        scheduleObj.eventSettings.dataSource = events;
        scheduleObj.dataBind();
        dialog.hide();
        switchTab();
    };

    return (
        <>
            <div id='container' className="scheduler-ai-container">
                <TabComponent id="tab" heightAdjustMode='Auto'
                    ref={tab => tabObj = tab as TabComponent}
                    selected={tabSelected}
                    animation={{ previous: { effect: 'None' }, next: { effect: 'None' } }}
                    created={() => {
                        tabObj.select(1);
                        tabObj.select(0);
                    }}
                >
                    <TabItemsDirective>
                        <TabItemDirective header={{ 'text': 'Meeting Contents' }} content={meetingContents} />
                        <TabItemDirective header={{ 'text': 'Schedule' }} content={schedule} />
                    </TabItemsDirective>
                </TabComponent>
            </div>
            <DialogComponent id="editor_dialog"
                ref={dialogObj => dialog = dialogObj as DialogComponent}
                header={() => {
                    return (
                        <div id="dlgHeader" style={{ visibility: "hidden" }} className="dialogHeader">
                            <div>Event Scheduler</div>
                        </div>
                    )
                }}
                content={document.getElementById("dlgContent") as HTMLElement}
                target={document.getElementById("container") as HTMLElement}
                showCloseIcon={true}
                isModal={true}
                visible={false}
                width='500px'
                created={created}
                close={closeDialog}
                open={openDialog}
            >
                <div id="dlgContent" style={{ visibility: "hidden" }} className="dialogContent">
                    <form id="formId" className="form-horizontal schedule-form">
                        <div className="form-group">
                            <div className="e-float-input">
                                <input className="e-input" type="text" id="subject" name="Subject" data-smartpaste-description="Subject must be the core content of the input" />
                                <span className="e-float-line"></span>
                                <label className="e-float-text" htmlFor="subject">Subject</label>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="e-float-input">
                                <input className="e-input" type="text" id="location" name="Location" data-smartpaste-description="Check if there is any location given in the input, if there is any location then add it, if not ignore it" />
                                <span className="e-float-line"></span>
                                <label className="e-float-text" htmlFor="location">Location</label>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="e-float-input">
                                <DateTimePickerComponent id="startTime" name="StartTime" data-smartpaste-description='Get Start Time from the input, Date must follow the format: MM/dd/yyyy HH:mm'
                                    value={(() => { let d = new Date(); d.setHours(12, 0, 0, 0); return d; })()} format='MM/dd/yyyy HH:mm'
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="e-float-input">
                                <DateTimePickerComponent id="endTime" name="EndTime" data-smartpaste-description="If there is End Time in the input get the End Time, If the End Time is not present in the input, add 1hr to the StartTime and Provide the date,  Date must follow the format: MM/dd/yyyy HH:mm"
                                    value={(() => { let d = new Date(); d.setHours(13, 0, 0, 0); return d; })()} format='MM/dd/yyyy HH:mm'
                                />
                            </div>
                        </div>

                        <div className="form-group description">
                            <div className="e-float-input">
                                <textarea rows={4} id="description" name="Description" data-smartpaste-description="Description must be the summary of the entire input"></textarea>
                                <span className="e-float-line"></span>
                                <label className="e-float-text" htmlFor="description">Description</label>
                            </div>
                        </div>
                        <div className="row button-group">
                            <div>
                                <SmartPasteButtonComponent type="button" id="smart-paste" className="smart-schedule-button form-button" style={{ visibility: "hidden" }}
                                    aiAssistHandler={AzureAIRequest}
                                >Smart Paste</SmartPasteButtonComponent>
                            </div>

                            <div style={{ display: "inline-block" }}>
                                <ButtonComponent id="saveButton" type='button' ref={button => saveButton = button as ButtonComponent} className="samplebtn" isPrimary={true} disabled={true} style={{ marginRight: "10px" }} data-ripple={true}>Save</ButtonComponent>
                            </div>
                            <div style={{ float: "right" }}>
                                <ButtonComponent ref={button => cancelButton = button as ButtonComponent} id="cancelButton" className="samplebtn"
                                    type="reset" data-ripple="true">cancel</ButtonComponent>
                            </div>
                        </div>
                    </form>
                </div>
            </DialogComponent>


            <ToastComponent id="ToastElement"
                ref={toastObj => toast = toastObj as ToastComponent}
                title='Events Added'
                content=''
                position={{ X: 'Right', Y: 'Top' }}
                cssClass='e-toast-success'
            ></ToastComponent>
        </>
    )
}

export default SmartScheduler