import * as React from 'react';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { TabComponent, TabItemDirective, TabItemsDirective } from '@syncfusion/ej2-react-navigations';
import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-grids';
import { SampleBase } from '../common/sample-base';
import './tab.component.css';
/**
 *  Tab Wizard sample
 */
// tslint:disable:max-line-length
export class Wizard extends SampleBase {
    constructor() {
        super(...arguments);
        this.today = new Date();
        this.dlgTarget = document.querySelector('.sb-content-tab.e-tab .e-content.sb-sample-content-area');
        this.dateMin = new Date(this.today.getTime());
        this.dateMax = new Date(this.today.getTime() + 60 * 24 * 60 * 60 * 1000);
        this.fields = { id: "id", text: "text", value: "text" };
        this.autoCompleteFields = { text: 'name', value: 'name' };
        this.dateValue = new Date();
        this.result = [];
        this.reserved = [];
        this.headerText = [
            { "text": "New Booking" },
            { "text": "Train List" },
            { "text": "Add Passenger" },
            { "text": "Make Payment" }
        ];
        this.quotas = [
            { id: "1", text: "Business Class" },
            { id: "2", text: "Economy Class" },
            { id: "4", text: "Common Class" }
        ];
        this.gender = [
            { id: "1", text: "Male" },
            { id: "2", text: "Female" }
        ];
        this.berths = [
            { id: "1", text: "Upper" },
            { id: "2", text: "Lower" },
            { id: "3", text: "Middle" },
            { id: "4", text: "Window" },
            { id: "5", text: "Aisle" }
        ];
        this.cities = [
            { name: 'Chicago', fare: 300 },
            { name: 'San Francisco', fare: 125 },
            { name: 'Los Angeles', fare: 175 },
            { name: 'Seattle', fare: 250 },
            { name: 'Florida', fare: 150 }
        ];
        this.dlgButtons = [{
                buttonModel: { content: "OK", isPrimary: true },
                click: (() => {
                    this.alertDlg.hide();
                    this.tab.enableTab(0, true);
                    this.tab.enableTab(1, false);
                    this.tab.enableTab(2, false);
                    this.tab.enableTab(3, false);
                    this.tab.select(0);
                })
            }];
    }
    dlgCreated() {
        let proxy = this.alertDlg;
        proxy.hide();
    }
    focusIn() {
        const proxy = this.journeyDate;
        proxy.show();
    }
    tabSelecting(e) {
        if (e.isSwiped) {
            e.cancel = true;
        }
    }
    trainSelected(args) {
        this.selectedTrain = args.data;
    }
    btnClicked(e) {
        switch (e.target.id) {
            case "searchNext":
                /* Validate the Source, Destination, Date and Class chosen and proceed only if all the fields are selected */
                if (this.startPoint.value != null && this.endPoint.value != null &&
                    this.ticketType.value != null && this.journeyDate.value != null) {
                    if (this.startPoint.value && this.startPoint.value === this.endPoint.value) {
                        document.getElementById("err1").innerText = "* Arrival point can't be same as Departure";
                    }
                    else {
                        this.tab.enableTab(1, true);
                        this.tab.enableTab(0, false);
                        this.filterTrains(e);
                        document.getElementById("err1").innerText = "";
                        document.getElementById("err2").innerText = "";
                    }
                }
                else {
                    document.getElementById("err1").innerText = "* Please fill all the details before proceeding";
                }
                break;
            case "bookTickets":
                /* Based on the selected station generate Grid content to display trains available */
                if (this.availTrainGrid.getSelectedRecords() === undefined || this.availTrainGrid.getSelectedRecords().length === 0) {
                    document.getElementById("err2").innerText = "* Select your convenient train";
                }
                else {
                    this.tab.enableTab(2, true);
                    this.tab.enableTab(1, false);
                    document.getElementById("err2").innerText = "";
                }
                break;
            case "confirmTickets":
                /* Get the Passenger details and validate the fields must not be left empty */
                let name = document.getElementById("pass_name1");
                let age = this.pass_age1.value;
                let gender = this.pass_gender1.value;
                if (name.value === "" || age === "" || gender === "") {
                    document.getElementById("err3").innerText = "* Please enter passenger details";
                }
                else {
                    this.tab.enableTab(3, true);
                    this.tab.enableTab(2, false);
                    document.getElementById("err3").innerText = "";
                    this.finalizeDetails(e);
                }
                break;
            case "makePayment":
                this.alertDlg.show();
                break;
            case "goToSearch":
                /* Go back to change class, date or boarding places */
                this.selectedTrain = [];
                this.tab.enableTab(0, true);
                this.tab.select(0);
                this.tab.enableTab(1, false);
                break;
            case "goBackToBook":
                /* Change the preferred train chosen already */
                this.tab.enableTab(1, true);
                this.tab.select(1);
                this.tab.enableTab(2, false);
                break;
            case "goBackDetails":
                /* Update passenger detail before confirming the payment */
                this.tab.enableTab(2, true);
                this.tab.select(2);
                this.tab.enableTab(3, false);
                break;
        }
    }
    filterTrains(args) {
        /* Generating trains based on source and destination chosen */
        let fromCity = this.startPoint.value;
        let toCity = this.endPoint.value;
        let count = Math.floor((Math.random() * 3) + 2);
        for (let i = 0; i < count; i++) {
            let details = {};
            details["TrainNo"] = Math.floor((Math.random() * 20) + 19000);
            details["Name"] = "Train " + i;
            details["Departure"] = fromCity;
            details["Arrival"] = toCity;
            details["Availability"] = Math.floor((Math.random() * 20) + 20);
            this.result.push(details);
        }
    }
    availableTrainGridcreated() {
        this.availTrainGrid.dataSource = this.result;
    }
    finalizeDetails(args) {
        /* Get the passenger details and update table with name and other details for confirmation */
        let passCount = 0;
        let name1 = document.getElementById("pass_name1");
        let name2 = document.getElementById("pass_name2");
        let name3 = document.getElementById("pass_name3");
        for (let i = 1; i <= 3; i++) {
            if (name1.value !== "") {
                let details = {};
                let gender = ((i === 1) ? this.pass_gender1.value : (i === 2) ? this.pass_gender2.value : this.pass_gender3.value);
                let berth = ((i === 1) ? this.pass_berth1.value : (i === 2) ? this.pass_berth2.value : this.pass_berth3.value);
                details["TrainNo"] = this.selectedTrain.TrainNo.toString();
                details["PassName"] = (i === 1) ? name1.value : (i === 2) ? name2.value : name3.value;
                details["Gender"] = (gender === "") ? "Male" : gender;
                details["Berth"] = berth;
                if (details["PassName"] !== "") {
                    this.reserved.push(details);
                }
                passCount++;
            }
            let calcFare = 0;
            for (let i in this.cities) {
                if (this.startPoint.value == this.cities[i].name)
                    calcFare = calcFare + this.cities[i].fare;
                if (this.endPoint.value == this.cities[i].name)
                    calcFare = calcFare + this.cities[i].fare;
            }
            let displayAmt = document.getElementById("amount");
            if (this.ticketType.value === 'Economy Class') {
                displayAmt.innerText = "Total payable amount: $" + passCount * (300 + calcFare);
            }
            else if (this.ticketType.value === 'Business Class') {
                displayAmt.innerText = "Total payable amount: $" + passCount * (500 + calcFare);
            }
            else if (this.ticketType.value === 'Common Class') {
                displayAmt.innerText = "Total payable amount: $" + passCount * (150 + calcFare);
            }
        }
    }
    ticketDetailGridcreated() {
        this.ticketDetailGrid.dataSource = this.reserved;
    }
    content0() {
        return (<div id="booking">
    <div className="wizard-title">Plan your journey</div>
    <div className="responsive-align">
      <div className="row">
        <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6 search-item">
          <DropDownListComponent ref={dropdownlist => { this.startPoint = dropdownlist; }} width="100%" dataSource={this.cities} fields={this.autoCompleteFields} placeholder="From" floatLabelType="Auto"/>
        </div>
        <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6 search-item">
          <DropDownListComponent ref={dropdownlist => { this.endPoint = dropdownlist; }} width="100%" dataSource={this.cities} fields={this.autoCompleteFields} placeholder="To" floatLabelType="Auto"/>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6 search-item">
          <DatePickerComponent ref={calendar => (this.journeyDate = calendar)} width="100%" placeholder="Journey Date" floatLabelType="Auto" min={this.dateMin} max={this.dateMax} focus={this.focusIn.bind(this)}/>
        </div>
        <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6 search-item">
          <DropDownListComponent ref={dropdownlist => (this.ticketType = dropdownlist)} dataSource={this.quotas} placeholder="Ticket type" floatLabelType="Auto" fields={this.fields}/>
        </div>
      </div>
      <div className="btn-container">
        <button id="searchNext" className="e-btn" onClick={this.btnClicked.bind(this)}>
          Search Train
        </button>
      </div>
      <span id="err1"/>
    </div>
  </div>);
    }
    content1() {
        return (<div id="selectTrain">
    <div className="wizard-title">Select the train from the list </div>
    <GridComponent ref={grid => (this.availTrainGrid = grid)} width="100%" rowSelected={this.trainSelected.bind(this)} created={this.availableTrainGridcreated.bind(this)}>
      <ColumnsDirective>
        <ColumnDirective field="TrainNo" headerText="Train No" width={120} type="number"/>
        <ColumnDirective field="Name" headerText="Name" width={140}/>
        <ColumnDirective field="Departure" headerText="Departure" width={120}/>
        <ColumnDirective field="Arrival" headerText="Arrival" width={140}/>
        <ColumnDirective field="Availability" headerText="Availability" width={140} type="number"/>
      </ColumnsDirective>
    </GridComponent>
    <br />
    <div className="btn-container">
      <button id="goToSearch" className="e-btn" onClick={this.btnClicked.bind(this)}>
        Back
      </button>
      <button id="bookTickets" className="e-btn" onClick={this.btnClicked.bind(this)}>
        Continue
      </button>
    </div>
    <span id="err2"/>
  </div>);
    }
    content2() {
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
              <input className="e-input" id="pass_name1" type="text" placeholder="Passenger Name"/>
            </td>
            <td>
              <NumericTextBoxComponent ref={numerictextbox => { this.pass_age1 = numerictextbox; }} showSpinButton={false} min={1} max={100} value={18} format="n0"/>
            </td>
            <td>
              <DropDownListComponent ref={dropdownlist => { this.pass_gender1 = dropdownlist; }} dataSource={this.gender} text="Male" fields={this.fields}/>
            </td>
            <td>
              <DropDownListComponent ref={dropdownlist => { this.pass_berth1 = dropdownlist; }} dataSource={this.berths} placeholder="Optional" fields={this.fields}/>
            </td>
          </tr>
          <tr>
            <td>
              <input id="pass_name2" className="e-input" type="text" placeholder="Passenger Name"/>
            </td>
            <td>
              <NumericTextBoxComponent showSpinButton={false} min={1} max={100} value={18} format="n0"/>
            </td>
            <td>
              <DropDownListComponent ref={dropdownlist => { this.pass_gender2 = dropdownlist; }} dataSource={this.gender} text="Male" fields={this.fields}/>
            </td>
            <td>
              <DropDownListComponent ref={dropdownlist => { this.pass_berth2 = dropdownlist; }} dataSource={this.berths} placeholder="Optional" fields={this.fields}/>
            </td>
          </tr>
          <tr>
            <td>
              <input id="pass_name3" className="e-input" type="text" placeholder="Passenger Name"/>
            </td>
            <td>
              <NumericTextBoxComponent showSpinButton={false} min={1} max={100} value={18} format="n0"/>
            </td>
            <td>
              <DropDownListComponent ref={dropdownlist => { this.pass_gender3 = dropdownlist; }} dataSource={this.gender} text="Male" fields={this.fields}/>
            </td>
            <td>
              <DropDownListComponent ref={dropdownlist => { this.pass_berth3 = dropdownlist; }} dataSource={this.berths} placeholder="Optional" fields={this.fields}/>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <br />
    <div className="btn-container">
      <button id="goBackToBook" className="e-btn" onClick={this.btnClicked.bind(this)}>
        Back
      </button>
      <button id="confirmTickets" className="e-btn" onClick={this.btnClicked.bind(this)}>
        Continue
      </button>
    </div>
    <span id="err3"/>
  </div>);
    }
    content3() {
        return (<div id="confirm">
    <div className="tab-title1 wizard-title">
      Confirm the details and proceed
    </div>
    <GridComponent ref={grid => (this.ticketDetailGrid = grid)} width="100%" created={this.ticketDetailGridcreated.bind(this)}>
      <ColumnsDirective>
        <ColumnDirective field="TrainNo" headerText="Train No" width={120} type="number"/>
        <ColumnDirective field="PassName" headerText="Name" width={140}/>
        <ColumnDirective field="Gender" headerText="Gender" width={120}/>
        <ColumnDirective field="Berth" headerText="Berth" width={140}/>
      </ColumnsDirective>
    </GridComponent>
    <br />
    <div id="amount"/>
    <br />
    <div className="btn-container">
      <button id="goBackDetails" className="e-btn" onClick={this.btnClicked.bind(this)}>
        Back
      </button>
      <button id="makePayment" className="e-btn" onClick={this.btnClicked.bind(this)}>
        Pay
      </button>
    </div>
  </div>);
    }
    render() {
        return (<div>
        <div className="col-lg-12 control-section e-tab-section">
          <div className="e-sample-resize-container">
            <TabComponent id="tab-wizard" ref={tab => (this.tab = tab)} heightAdjustMode="None" height={390} selecting={this.tabSelecting.bind(this)}>
              <TabItemsDirective>
                <TabItemDirective header={this.headerText[0]} content={this.content0.bind(this)}/>
                <TabItemDirective header={this.headerText[1]} content={this.content1.bind(this)} disabled={true}/>
                <TabItemDirective header={this.headerText[2]} content={this.content2.bind(this)} disabled={true}/>
                <TabItemDirective header={this.headerText[3]} content={this.content3.bind(this)} disabled={true}/>
              </TabItemsDirective>
            </TabComponent>
            <DialogComponent ref={dialog => (this.alertDlg = dialog)} header="Success" width={250} isModal={true} visible={false} showCloseIcon={true} content="Your payment successfully processed" target={this.dlgTarget} buttons={this.dlgButtons} created={this.dlgCreated.bind(this)}/>
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
      </div>);
    }
}
