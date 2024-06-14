import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { TabComponent, TabItemDirective, TabItemsDirective, SelectEventArgs } from '@syncfusion/ej2-react-navigations';
import { GridComponent, RowSelectEventArgs, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-grids';
import { updateSampleSection } from '../common/sample-base';
import './tab.component.css';
/*
  Tab Wizard sample
 */
const Wizard = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const [error1, setError1] = useState('');
    const [error2, setError2] = useState('');
    const [error3, setError3] = useState('');

    let alertDlg = useRef<DialogComponent>(null);
    let tabObj = useRef<TabComponent>(null);
    let ticketDetailGrid = useRef<GridComponent>(null);
    let pass_name1 = useRef<HTMLInputElement>(null);
    let pass_name2 = useRef<HTMLInputElement>(null);
    let pass_name3 = useRef<HTMLInputElement>(null);
    let pass_gender3 = useRef<DropDownListComponent>(null);
    let pass_gender2 = useRef<DropDownListComponent>(null);
    let pass_gender1 = useRef<DropDownListComponent>(null);
    let pass_berth1 = useRef<DropDownListComponent>(null);
    let pass_berth2 = useRef<DropDownListComponent>(null);
    let pass_berth3 = useRef<DropDownListComponent>(null);
    let pass_age1 = useRef<NumericTextBoxComponent>(null);
    let availTrainGrid = useRef<GridComponent>(null);
    let ticketType = useRef<DropDownListComponent>(null);
    let journeyDate = useRef<DatePickerComponent>(null);
    let endPoint = useRef<DropDownListComponent>(null);
    let startPoint = useRef<DropDownListComponent>(null);
    let today: Date = new Date();
    let selectedTrain = useRef<any>(null);
    const dlgTarget: HTMLElement = document.querySelector('.sb-content-tab.e-tab .e-content.sb-sample-content-area');
    const dateMin: Date = new Date(today.getTime());
    const dateMax: Date = new Date(today.getTime() + 60 * 24 * 60 * 60 * 1000);
    const fields: Object = { id: "id", text: "text", value: "text" };
    const autoCompleteFields: Object = { text: 'name', value: 'name' };
    let result: Object[] = [];
    let reserved: Object[] = [];
    let amountDetails: any;

    const headerText: any = [
        { "text": "New Booking" },
        { "text": "Train List" },
        { "text": "Add Passenger" },
        { "text": "Make Payment" }];

    const quotas: any = [
        { id: "1", text: "Business Class" },
        { id: "2", text: "Economy Class" },
        { id: "4", text: "Common Class" }
    ];

    const gender: any = [
        { id: "1", text: "Male" },
        { id: "2", text: "Female" }
    ];

    const berths: any = [
        { id: "1", text: "Upper" },
        { id: "2", text: "Lower" },
        { id: "3", text: "Middle" },
        { id: "4", text: "Window" },
        { id: "5", text: "Aisle" }
    ];
    const cities: any = [
        { name: 'Chicago', fare: 300 },
        { name: 'San Francisco', fare: 125 },
        { name: 'Los Angeles', fare: 175 },
        { name: 'Seattle', fare: 250 },
        { name: 'Florida', fare: 150 }
    ]

    const dlgButtons: any = [{
        buttonModel: { content: "OK", isPrimary: true },
        click: (() => {
            alertDlg.current.hide();
            reserved = [];
            tabObj.current.enableTab(0, true);
            tabObj.current.enableTab(1, false);
            tabObj.current.enableTab(2, false);
            tabObj.current.enableTab(3, false);
            tabObj.current.select(0);
        })
    }];

    const dlgCreated = (): void => {
        alertDlg.current.hide();
    }

    const focusIn = () => {
        journeyDate.current.show();
    }

    const tabSelecting = (e: SelectEventArgs): void => {
        if (e.isSwiped) {
            e.cancel = true;
        }
    }

    const trainSelected = (args: RowSelectEventArgs): void => {
        selectedTrain.current = args.data;
    }

    const removeItem = (): void => {
        let tabItems: any = tabObj.current.element.querySelectorAll(".e-item");
        tabItems.forEach((item: Element, index: number) => {
            if (index > 0) {
                item.remove();
            }
        });
    }

    const btnClicked = (e: RowSelectEventArgs): void => {
        switch (e.target.id) {
            case "searchNext":
                /* Validate the Source, Destination, Date and Class chosen and proceed only if all the fields are selected */
                if (startPoint.current.value != null && endPoint.current.value != null &&
                    ticketType.current.value != null && journeyDate.current.value != null) {
                    if (startPoint.current.value && startPoint.current.value === endPoint.current.value) {
                        setError1("* Arrival point can't be same as Departure");
                    } else {
                        removeItem();
                        tabObj.current.enableTab(1, true);
                        tabObj.current.enableTab(0, false);
                        filterTrains();
                        setError1("");
                        if (document.getElementById("err2")) {
                            setError2("");
                        }
                    }
                } else {
                    setError1("* Please fill all the details before proceeding");
                }
                break;
            case "bookTickets":
                /* Based on the selected station generate Grid content to display trains available */
                if (availTrainGrid.current.getSelectedRecords() === undefined || availTrainGrid.current.getSelectedRecords().length === 0) {
                    setError2("* Select your convenient train");
                } else {
                    tabObj.current.enableTab(2, true);
                    tabObj.current.enableTab(1, false);
                    setError2("");
                }
                break;
            case "confirmTickets":
                /* Get the Passenger details and validate the fields must not be left empty */
                //let name: any = document.getElementById("pass_name1");
                let age: any = pass_age1.current.value;
                let gender: any = pass_gender1.current.value;
                if (pass_name1.current.value === "" || age === "" || gender === "") {
                    setError3("* Please enter passenger details");
                } else {
                    reserved = []
                    let paymentTab: any = tabObj.current.element.querySelectorAll('.e-item')[3];
                    if (paymentTab) {
                        paymentTab.remove();
                    }
                    tabObj.current.enableTab(3, true);
                    tabObj.current.enableTab(2, false);
                    setError3("");
                    finalizeDetails();
                }
                break;
            case "makePayment":
                alertDlg.current.show();
                break;
            case "goToSearch":
                /* Go back to change class, date or boarding places */
                selectedTrain.current = [];
                tabObj.current.enableTab(0, true);
                tabObj.current.select(0);
                tabObj.current.enableTab(1, false);
                setError1("");
                break;
            case "goBackToBook":
                /* Change the preferred train chosen already */
                tabObj.current.enableTab(1, true);
                tabObj.current.select(1);
                tabObj.current.enableTab(2, false);
                break;
            case "goBackDetails":
                /* Update passenger detail before confirming the payment */
                tabObj.current.enableTab(2, true);
                tabObj.current.select(2);
                tabObj.current.enableTab(3, false);
                break;
        }
        
    }
    const filterTrains = (): void => {
        /* Generating trains based on source and destination chosen */
        let fromCity: string = startPoint.current.value as string;
        let toCity: string = endPoint.current.value as string;
        let count: number = Math.floor((Math.random() * 3) + 2);
        result = [];
        for (let i: number = 0; i < count; i++) {
            let details: { [key: string]: Object } = {};
            details["TrainNo"] = Math.floor((Math.random() * 20) + 19000);
            details["Name"] = "Train " + i;
            details["Departure"] = fromCity;
            details["Arrival"] = toCity;
            details["Availability"] = Math.floor((Math.random() * 20) + 20);
            result.push(details);
        }
    }

    const availableTrainGridcreated = (): void => {
        availTrainGrid.current.dataSource = result;
    }

    const finalizeDetails = (): void => {
        /* Get the passenger details and update table with name and other details for confirmation */
        let passCount: any = 0;

        for (let i: number = 1; i <= 3; i++) {
            if (pass_name1.current.value !== "") {
                let details: { [key: string]: Object } = {};
                let gender: string = ((i === 1) ? pass_gender1.current.value : (i === 2) ? pass_gender2.current.value : pass_gender3.current.value) as string;
                let berth: string = ((i === 1) ? pass_berth1.current.value : (i === 2) ? pass_berth2.current.value : pass_berth3.current.value) as string;
                details["TrainNo"] = selectedTrain.current.TrainNo.toString();
                details["PassName"] = (i === 1) ? pass_name1.current.value : (i === 2) ? pass_name2.current.value : pass_name3.current.value;
                details["Gender"] = (gender === "") ? "Male" : gender;
                details["Berth"] = (berth === null) ? 'Any' : berth;
                if (details["PassName"] !== "") { reserved.push(details); }
                passCount++;
            }
            let calcFare: any = 0;
            for (let i in cities) {
                if (startPoint.current.value == cities[i].name)
                    calcFare = calcFare + cities[i].fare;
                if (endPoint.current.value == cities[i].name)
                    calcFare = calcFare + cities[i].fare;
            }
            if (ticketType.current.value === 'Economy Class') {
                amountDetails = "Total payable amount: $" + passCount * (300 + calcFare)
            } else if (ticketType.current.value === 'Business Class') {
                amountDetails = "Total payable amount: $" + passCount * (500 + calcFare)
            } else if (ticketType.current.value === 'Common Class') {
                amountDetails = "Total payable amount: $" + passCount * (150 + calcFare)
            }
        }
    }

    const ticketDetailGridcreated = (): void => {
        ticketDetailGrid.current.dataSource = reserved;
    }

    const content0 = () => {
        return (
            <div id="booking">
                <div className="wizard-title">Plan your journey</div>
                <div className="responsive-align">
                    <div className="row">
                        <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6 search-item">
                            <DropDownListComponent ref={startPoint} width="100%" dataSource={cities} fields={autoCompleteFields} placeholder="From" floatLabelType="Auto" />
                        </div>
                        <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6 search-item">
                            <DropDownListComponent ref={endPoint} width="100%" dataSource={cities} fields={autoCompleteFields} placeholder="To" floatLabelType="Auto" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6 search-item">
                            <DatePickerComponent ref={journeyDate} width="100%" placeholder="Journey Date" floatLabelType="Auto" value={today} min={dateMin} max={dateMax} focus={focusIn} />
                        </div>
                        <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6 search-item">
                            <DropDownListComponent ref={ticketType} dataSource={quotas} placeholder="Ticket type" floatLabelType="Auto" fields={fields} />
                        </div>
                    </div>
                    <div className="btn-container">
                        <button id="searchNext" className="e-btn" onClick={btnClicked.bind(this)}>Search Train</button>
                    </div>
                    <span id="err1">{error1}</span>
                </div>
            </div>
        );
    }
    const content1 = () => {
        return (
            <div id="selectTrain">
                <div className="wizard-title">Select the train from the list </div>
                <GridComponent ref={availTrainGrid} width="100%" rowSelected={trainSelected} created={availableTrainGridcreated}>
                    <ColumnsDirective>
                        <ColumnDirective field="TrainNo" headerText="Train No" width={120} type="number" />
                        <ColumnDirective field="Name" headerText="Name" width={140} />
                        <ColumnDirective field="Departure" headerText="Departure" width={120} />
                        <ColumnDirective field="Arrival" headerText="Arrival" width={140} />
                        <ColumnDirective field="Availability" headerText="Availability" width={140} type="number" />
                    </ColumnsDirective>
                </GridComponent>
                <br />
                <div className="btn-container">
                    <button id="goToSearch" className="e-btn" onClick={btnClicked.bind(this)}>Back</button>
                    <button id="bookTickets" className="e-btn" onClick={btnClicked.bind(this)}>Continue</button>
                </div>
                <span id="err2">{error2}</span>
            </div>
        );
    }
    const content2 = () => {
        return (
            <div id="details">
                <div className="details-page wizard-title">Enter the passenger details</div>
                <div id="PassengersList">
                    <table id="passenger-table">
                        <colgroup>
                            <col />
                            <col />
                            <col />
                            <col />
                            <col />
                            <col />
                        </colgroup>
                        <thead>
                            <tr>
                                <th className="name-header">Name</th>
                                <th className="age-header">Age</th>
                                <th className="gender-header">Gender</th>
                                <th className="type-header">Berth Preference</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input className="e-input" ref={pass_name1} id="pass_name1" type="text" placeholder="Passenger Name" />
                                </td>
                                <td>
                                    <NumericTextBoxComponent ref={pass_age1} showSpinButton={false} min={1} max={100} value={18} format="n0" />
                                </td>
                                <td>
                                    <DropDownListComponent ref={pass_gender1} dataSource={gender} text="Male" fields={fields} />
                                </td>
                                <td>
                                    <DropDownListComponent ref={pass_berth1} dataSource={berths} placeholder="Optional" fields={fields} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input id="pass_name2" ref={pass_name2} className="e-input" type="text" placeholder="Passenger Name" />
                                </td>
                                <td>
                                    <NumericTextBoxComponent showSpinButton={false} min={1} max={100} value={18} format="n0" />
                                </td>
                                <td>
                                    <DropDownListComponent ref={pass_gender2} dataSource={gender} text="Male" fields={fields} />
                                </td>
                                <td>
                                    <DropDownListComponent ref={pass_berth2} dataSource={berths} placeholder="Optional" fields={fields} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input id="pass_name3" className="e-input" ref={pass_name3} type="text" placeholder="Passenger Name" />
                                </td>
                                <td>
                                    <NumericTextBoxComponent showSpinButton={false} min={1} max={100} value={18} format="n0" />
                                </td>
                                <td>
                                    <DropDownListComponent ref={pass_gender3} dataSource={gender} text="Male" fields={fields} />
                                </td>
                                <td>
                                    <DropDownListComponent ref={pass_berth3} dataSource={berths} placeholder="Optional" fields={fields} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <br />
                <div className="btn-container">
                    <button id="goBackToBook" className="e-btn" onClick={btnClicked.bind(this)}>Back</button>
                    <button id="confirmTickets" className="e-btn" onClick={btnClicked.bind(this)}>Continue</button>
                </div>
                <span id="err3">{error3}</span>
            </div>
        );
    }
    const content3 = () => {
        return (
            <div id="confirm">
                <div className="tab-title1 wizard-title">Confirm the details and proceed</div>
                <GridComponent ref={ticketDetailGrid} width="100%" created={ticketDetailGridcreated}>
                    <ColumnsDirective>
                        <ColumnDirective field="TrainNo" headerText="Train No" width={120} type="number" />
                        <ColumnDirective field="PassName" headerText="Name" width={140} />
                        <ColumnDirective field="Gender" headerText="Gender" width={120} />
                        <ColumnDirective field="Berth" headerText="Berth" width={140} />
                    </ColumnsDirective>
                </GridComponent>
                <br />
                <div id="amount">{amountDetails}</div>
                <br />
                <div className="btn-container">
                    <button id="goBackDetails" className="e-btn" onClick={btnClicked.bind(this)}>Back</button>
                    <button id="makePayment" className="e-btn" onClick={btnClicked.bind(this)}>Pay</button>
                </div>
            </div>
        );
    }


    return (
        <div>
            <div className="col-lg-12 control-section e-tab-section">
                <div className="e-sample-resize-container">
                    <TabComponent id="tab-wizard" ref={tabObj} heightAdjustMode="None" height={'auto'} selecting={tabSelecting}>
                        <TabItemsDirective>
                            <TabItemDirective header={headerText[0]} content={content0} />
                            <TabItemDirective header={headerText[1]} content={content1} disabled={true} />
                            <TabItemDirective header={headerText[2]} content={content2} disabled={true} />
                            <TabItemDirective header={headerText[3]} content={content3} disabled={true} />
                        </TabItemsDirective>
                    </TabComponent>
                    <DialogComponent ref={alertDlg} header="Success" width={250} isModal={true} visible={false} showCloseIcon={true} content="Your payment was successfully processed" target={dlgTarget} buttons={dlgButtons} created={dlgCreated} />
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates simple train reservation wizard that enable/disable Tab items based on sequential validation of each Tab content.
                </p>
            </div>
            <div id="description">
                <p>
                    Tab items can be disabled dynamically by passing the index and boolean value to the <a aria-label="enable tab"  target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/tab/#enabletab">enableTab</a> method.
                </p>
                <p>
                    You can design wizard like sample with Tab using the in-built API and customizing the content with proper validations.
                </p>
                <p>
                    More information about Tab can be found in this <a aria-label="Documentation" target="_blank" href="https://ej2.syncfusion.com/react/documentation/tab/getting-started/"> documentation</a> section.
                </p>
            </div>
        </div >
    );
}
export default Wizard;
