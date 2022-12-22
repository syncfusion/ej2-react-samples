import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { TabComponent, TabItemDirective, TabItemsDirective, SelectEventArgs } from '@syncfusion/ej2-react-navigations';
import { GridComponent, RowSelectEventArgs, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-grids';
import { updateSampleSection } from '../common/sample-base';
import './tab.component.css';
/**
 *  Tab Wizard sample
 */

// tslint:disable:max-line-length
function Wizard() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])

    let alertDlg: DialogComponent;
    let tabObj: TabComponent;
    let ticketDetailGrid: GridComponent;
    let pass_gender3: DropDownListComponent;
    let pass_gender2: DropDownListComponent;
    let listObj: DropDownListComponent;
    let pass_gender1: DropDownListComponent;
    let pass_berth1: DropDownListComponent;
    let pass_berth2: DropDownListComponent;
    let pass_berth3: DropDownListComponent;
    let pass_age1: NumericTextBoxComponent;
    let availTrainGrid: GridComponent;
    let ticketType: DropDownListComponent;
    let journeyDate: DatePickerComponent;
    let endPoint: DropDownListComponent;
    let startPoint: DropDownListComponent;
    let today: Date = new Date();
    let selectedTrain: any;
    const dlgTarget: HTMLElement = document.querySelector('.sb-content-tab.e-tab .e-content.sb-sample-content-area');
    const dateMin: Date = new Date(today.getTime());
    const dateMax: Date = new Date(today.getTime() + 60 * 24 * 60 * 60 * 1000);
    const fields: Object = { id: "id", text: "text", value: "text" };
    const autoCompleteFields: Object = { text: 'name', value: 'name' };
    const dateValue = new Date();
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
            alertDlg.hide();
            reserved = [];
            tabObj.enableTab(0, true);
            tabObj.enableTab(1, false);
            tabObj.enableTab(2, false);
            tabObj.enableTab(3, false);
            tabObj.select(0);
        })
    }];

    function dlgCreated(): void {
        let proxy: any = alertDlg;
        proxy.hide();
    }

    function focusIn() {
        const proxy: any = journeyDate;
        proxy.show();
    }

    function tabSelecting(e: SelectEventArgs): void {
        if (e.isSwiped) {
            e.cancel = true;
        }
    }

    function trainSelected(args: RowSelectEventArgs): void {
        selectedTrain = args.data;
    }

    function removeItem(): void {
        let tabItems: any = tabObj.element.querySelectorAll('.e-item');
        tabItems.forEach((item: Element, index: number) => {
            if (index > 0) {
                item.remove();
            }
        });
    }

    function btnClicked(e: RowSelectEventArgs): void {
        switch (e.target.id) {
            case "searchNext":
                /* Validate the Source, Destination, Date and Class chosen and proceed only if all the fields are selected */
                if (startPoint.value != null && endPoint.value != null &&
                    ticketType.value != null && journeyDate.value != null) {
                    if (startPoint.value && startPoint.value === endPoint.value) {
                        document.getElementById("err1").innerText = "* Arrival point can't be same as Departure";
                    } else {
                        removeItem();
                        tabObj.enableTab(1, true);
                        tabObj.enableTab(0, false);
                        filterTrains(e);
                        document.getElementById("err1").innerText = "";
                        if (document.getElementById("err2")) {
                            document.getElementById("err2").innerText = "";
                        }
                    }
                } else {
                    document.getElementById("err1").innerText = "* Please fill all the details before proceeding";
                }
                break;
            case "bookTickets":
                /* Based on the selected station generate Grid content to display trains available */
                if (availTrainGrid.getSelectedRecords() === undefined || availTrainGrid.getSelectedRecords().length === 0) {
                    document.getElementById("err2").innerText = "* Select your convenient train";
                } else {
                    tabObj.enableTab(2, true);
                    tabObj.enableTab(1, false);
                    document.getElementById("err2").innerText = "";
                }
                break;
            case "confirmTickets":
                /* Get the Passenger details and validate the fields must not be left empty */
                let name: any = document.getElementById("pass_name1");
                let age: any = pass_age1.value;
                let gender: any = pass_gender1.value;
                if (name.value === "" || age === "" || gender === "") {
                    document.getElementById("err3").innerText = "* Please enter passenger details";
                } else {
                    reserved = []
                    let paymentTab: any = tabObj.element.querySelectorAll('.e-item')[3];
                    if (paymentTab) {
                        paymentTab.remove();
                    }
                    tabObj.enableTab(3, true);
                    tabObj.enableTab(2, false);
                    document.getElementById("err3").innerText = "";
                    finalizeDetails(e);
                }
                break;
            case "makePayment":
                alertDlg.show();
                break;
            case "goToSearch":
                /* Go back to change class, date or boarding places */
                selectedTrain = [];
                tabObj.enableTab(0, true);
                tabObj.select(0);
                tabObj.enableTab(1, false);
                break;
            case "goBackToBook":
                /* Change the preferred train chosen already */
                tabObj.enableTab(1, true);
                tabObj.select(1);
                tabObj.enableTab(2, false);
                break;
            case "goBackDetails":
                /* Update passenger detail before confirming the payment */
                tabObj.enableTab(2, true);
                tabObj.select(2);
                tabObj.enableTab(3, false);
                break;
        }
    }

    function filterTrains(args: RowSelectEventArgs): void {
        /* Generating trains based on source and destination chosen */
        let fromCity: string = startPoint.value as string;
        let toCity: string = endPoint.value as string;
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

    function availableTrainGridcreated(): void {
        availTrainGrid.dataSource = result;
    }

    function finalizeDetails(args: RowSelectEventArgs): void {
        /* Get the passenger details and update table with name and other details for confirmation */
        let passCount: any = 0;
        let name1: any = document.getElementById("pass_name1");
        let name2: any = document.getElementById("pass_name2");
        let name3: any = document.getElementById("pass_name3");

        for (let i: number = 1; i <= 3; i++) {
            if (name1.value !== "") {
                let details: { [key: string]: Object } = {};
                let gender: string = ((i === 1) ? pass_gender1.value : (i === 2) ? pass_gender2.value : pass_gender3.value) as string;
                let berth: string = ((i === 1) ? pass_berth1.value : (i === 2) ? pass_berth2.value : pass_berth3.value) as string;
                details["TrainNo"] = selectedTrain.TrainNo.toString();
                details["PassName"] = (i === 1) ? name1.value : (i === 2) ? name2.value : name3.value;
                details["Gender"] = (gender === "") ? "Male" : gender;
                details["Berth"] = (berth === null) ? 'Any' : berth;
                if (details["PassName"] !== "") { reserved.push(details); }
                passCount++;
            }
            let calcFare: any = 0;
            for (let i in cities) {
                if (startPoint.value == cities[i].name)
                    calcFare = calcFare + cities[i].fare;
                if (endPoint.value == cities[i].name)
                    calcFare = calcFare + cities[i].fare;
            }
            if (ticketType.value === 'Economy Class') {
                amountDetails = "Total payable amount: $" + passCount * (300 + calcFare)
            } else if (ticketType.value === 'Business Class') {
                amountDetails = "Total payable amount: $" + passCount * (500 + calcFare)
            } else if (ticketType.value === 'Common Class') {
                amountDetails = "Total payable amount: $" + passCount * (150 + calcFare)
            }
        }
    }

    function ticketDetailGridcreated(): void {
        ticketDetailGrid.dataSource = reserved;
    }

    function content0() {
        return (<div id="booking">
            <div className="wizard-title">Plan your journey</div>
            <div className="responsive-align">
                <div className="row">
                    <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6 search-item">
                        <DropDownListComponent ref={dropdownlist => { startPoint = dropdownlist; }} width="100%" dataSource={cities} fields={autoCompleteFields} placeholder="From" floatLabelType="Auto" />
                    </div>
                    <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6 search-item">
                        <DropDownListComponent ref={dropdownlist => { endPoint = dropdownlist; }} width="100%" dataSource={cities} fields={autoCompleteFields} placeholder="To" floatLabelType="Auto" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6 search-item">
                        <DatePickerComponent ref={calendar => (journeyDate = calendar)} width="100%" placeholder="Journey Date" floatLabelType="Auto" value={today} min={dateMin} max={dateMax} focus={focusIn.bind(this)} />
                    </div>
                    <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6 search-item">
                        <DropDownListComponent ref={dropdownlist => (ticketType = dropdownlist)} dataSource={quotas} placeholder="Ticket type" floatLabelType="Auto" fields={fields} />
                    </div>
                </div>
                <div className="btn-container">
                    <button id="searchNext" className="e-btn" onClick={btnClicked.bind(this)}>
                        Search Train
                    </button>
                </div>
                <span id="err1" />
            </div>
        </div>);
    }
    function content1() {
        return (<div id="selectTrain">
            <div className="wizard-title">Select the train from the list </div>
            <GridComponent ref={grid => (availTrainGrid = grid)} width="100%" rowSelected={trainSelected.bind(this)} created={availableTrainGridcreated.bind(this)}>
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
                <button id="goToSearch" className="e-btn" onClick={btnClicked.bind(this)}>
                    Back
                </button>
                <button id="bookTickets" className="e-btn" onClick={btnClicked.bind(this)}>
                    Continue
                </button>
            </div>
            <span id="err2" />
        </div>);
    }
    function content2() {
        return (<div id="details">
            <div className="details-page wizard-title">
                Enter the passenger details
            </div>
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
                                <input className="e-input" id="pass_name1" type="text" placeholder="Passenger Name" />
                            </td>
                            <td>
                                <NumericTextBoxComponent ref={numerictextbox => { pass_age1 = numerictextbox; }} showSpinButton={false} min={1} max={100} value={18} format="n0" />
                            </td>
                            <td>
                                <DropDownListComponent ref={dropdownlist => { pass_gender1 = dropdownlist; }} dataSource={gender} text="Male" fields={fields} />
                            </td>
                            <td>
                                <DropDownListComponent ref={dropdownlist => { pass_berth1 = dropdownlist; }} dataSource={berths} placeholder="Optional" fields={fields} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input id="pass_name2" className="e-input" type="text" placeholder="Passenger Name" />
                            </td>
                            <td>
                                <NumericTextBoxComponent showSpinButton={false} min={1} max={100} value={18} format="n0" />
                            </td>
                            <td>
                                <DropDownListComponent ref={dropdownlist => { pass_gender2 = dropdownlist; }} dataSource={gender} text="Male" fields={fields} />
                            </td>
                            <td>
                                <DropDownListComponent ref={dropdownlist => { pass_berth2 = dropdownlist; }} dataSource={berths} placeholder="Optional" fields={fields} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input id="pass_name3" className="e-input" type="text" placeholder="Passenger Name" />
                            </td>
                            <td>
                                <NumericTextBoxComponent showSpinButton={false} min={1} max={100} value={18} format="n0" />
                            </td>
                            <td>
                                <DropDownListComponent ref={dropdownlist => { pass_gender3 = dropdownlist; }} dataSource={gender} text="Male" fields={fields} />
                            </td>
                            <td>
                                <DropDownListComponent ref={dropdownlist => { pass_berth3 = dropdownlist; }} dataSource={berths} placeholder="Optional" fields={fields} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <br />
            <div className="btn-container">
                <button id="goBackToBook" className="e-btn" onClick={btnClicked.bind(this)}>
                    Back
                </button>
                <button id="confirmTickets" className="e-btn" onClick={btnClicked.bind(this)}>
                    Continue
                </button>
            </div>
            <span id="err3" />
        </div>);
    }
    function content3() {
        return (<div id="confirm">
            <div className="tab-title1 wizard-title">
                Confirm the details and proceed
            </div>
            <GridComponent ref={grid => (ticketDetailGrid = grid)} width="100%" created={ticketDetailGridcreated.bind(this)}>
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
                <button id="goBackDetails" className="e-btn" onClick={btnClicked.bind(this)}>
                    Back
                </button>
                <button id="makePayment" className="e-btn" onClick={btnClicked.bind(this)}>
                    Pay
                </button>
            </div>
        </div>);
    }


    return (
        <div>
            <div className="col-lg-12 control-section e-tab-section">
                <div className="e-sample-resize-container">
                    <TabComponent id="tab-wizard" ref={tab => (tabObj = tab)} heightAdjustMode="None" height={'auto'} selecting={tabSelecting.bind(this)}>
                        <TabItemsDirective>
                            <TabItemDirective header={headerText[0]} content={content0.bind(this)} />
                            <TabItemDirective header={headerText[1]} content={content1.bind(this)} disabled={true} />
                            <TabItemDirective header={headerText[2]} content={content2.bind(this)} disabled={true} />
                            <TabItemDirective header={headerText[3]} content={content3.bind(this)} disabled={true} />
                        </TabItemsDirective>
                    </TabComponent>
                    <DialogComponent ref={dialog => (alertDlg = dialog)} header="Success" width={250} isModal={true} visible={false} showCloseIcon={true} content="Your payment was successfully processed" target={dlgTarget} buttons={dlgButtons} created={dlgCreated.bind(this)} />
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates simple train reservation wizard that enable/disable Tab items based on sequential validation of each Tab content.
                </p>
            </div>
            <div id="description">
                <p>
                    Tab items can be disabled dynamically by passing the index and boolean value to the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/tab/#enabletab">enableTab</a> method.
                </p>
                <p>
                    You can design wizard like sample with Tab using the in-built API and customizing the content with proper validations.
                </p>
                <p>
                    More information about Tab can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/tab/getting-started/"> documentation</a> section.
                </p>
            </div>
        </div >
    );
}
export default Wizard;
