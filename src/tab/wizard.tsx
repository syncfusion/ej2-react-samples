import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { TabComponent, TabItemDirective, TabItemsDirective, SelectEventArgs } from '@syncfusion/ej2-react-navigations';
import { GridComponent, RowSelectEventArgs, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-grids';
import { SampleBase } from '../common/sample-base';
import './tab.component.css';
/**
 *  Tab Wizard sample
 */

// tslint:disable:max-line-length
export class Wizard extends SampleBase<{}, {}> {
  public alertDlg: DialogComponent;
  public tab: TabComponent;
  public ticketDetailGrid: GridComponent;
  public pass_gender3: DropDownListComponent;
  public pass_gender2: DropDownListComponent;
  public listObj: DropDownListComponent;
  public pass_gender1: DropDownListComponent;
  public pass_berth1: DropDownListComponent;
  public pass_berth2: DropDownListComponent;
  public pass_berth3: DropDownListComponent;
  public pass_age1: NumericTextBoxComponent;
  public availTrainGrid: GridComponent;
  public ticketType: DropDownListComponent;
  public journeyDate: DatePickerComponent;
  public endPoint: DropDownListComponent;
  public startPoint: DropDownListComponent;
  public today: Date = new Date();
  public selectedTrain: any;
  public dlgTarget: HTMLElement = document.querySelector('.sb-content-tab.e-tab .e-content.sb-sample-content-area');
  public dateMin: Date = new Date(this.today.getTime());
  public dateMax: Date = new Date(this.today.getTime() + 60 * 24 * 60 * 60 * 1000);
  public fields: Object = { id: "id", text: "text", value: "text" };
  public autoCompleteFields: Object = { text: 'name', value: 'name' };
  public dateValue = new Date();

  public headerText: any = [
    { "text": "New Booking" },
    { "text": "Train List" },
    { "text": "Add Passenger" },
    { "text": "Make Payment" }];

  public quotas: any = [
    { id: "1", text: "Business Class" },
    { id: "2", text: "Economy Class" },
    { id: "4", text: "Common Class" }
  ];

  public gender: any = [
    { id: "1", text: "Male" },
    { id: "2", text: "Female" }
  ];

  public berths: any = [
    { id: "1", text: "Upper" },
    { id: "2", text: "Lower" },
    { id: "3", text: "Middle" },
    { id: "4", text: "Window" },
    { id: "5", text: "Aisle" }
  ];
  public cities: any = [
    { name: 'Chicago', fare: 300 },
    { name: 'San Francisco', fare: 125 },
    { name: 'Los Angeles', fare: 175 },
    { name: 'Seattle', fare: 250 },
    { name: 'Florida', fare: 150 }
  ]

  public dlgButtons: any = [{
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

  public dlgCreated(): void {
    let proxy: any = this;
    proxy.hide();
  }

  public tabSelected(e: SelectEventArgs): void {
    if (e.isSwiped) {
      e.cancel = true;
    }
  }

  public trainSelected(args: RowSelectEventArgs): void {
    this.selectedTrain = args.data;
  }

  public btnClicked(e: RowSelectEventArgs): void {
    switch (e.target.id) {
      case "searchNext":
        /* Validate the Source, Destination, Date and Class chosen and proceed only if all the fields are selected */
        if (this.startPoint.value != null && this.endPoint.value != null &&
          this.ticketType.value != null && this.journeyDate.value != null) {
          if (this.startPoint.value && this.startPoint.value === this.endPoint.value) {
            document.getElementById("err1").innerText = "* Arrival point can't be same as Departure";
          } else {
            this.tab.enableTab(0, false);
            this.tab.enableTab(1, true);
            this.filterTrains(e);
            this.tab.select(1);
            document.getElementById("err1").innerText = "";
            document.getElementById("err2").innerText = "";
          }
        } else {
          document.getElementById("err1").innerText = "* Please fill all the details before proceeding";
        }
        break;
      case "bookTickets":
        /* Based on the selected station generate Grid content to display trains available */
        if (this.availTrainGrid.getSelectedRecords() === undefined || this.availTrainGrid.getSelectedRecords().length === 0) {
          document.getElementById("err2").innerText = "* Select your convenient train";
        } else {
          this.tab.enableTab(2, true);
          this.tab.select(2);
          this.tab.enableTab(1, false);
          document.getElementById("err2").innerText = "";
        }
        break;
      case "confirmTickets":
        /* Get the Passenger details and validate the fields must not be left empty */
        let name: any = document.getElementById("pass_name1");
        let age: any = this.pass_age1.value;
        let gender: any = this.pass_gender1.value;
        if (name.value === "" || age === "" || gender === "") {
          document.getElementById("err3").innerText = "* Please enter passenger details";
        } else {
          this.tab.enableTab(3, true);
          this.tab.select(3);
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

  public filterTrains(args: RowSelectEventArgs): void {
    /* Generating trains based on source and destination chosen */
    let result: Object[] = [];
    let fromCity: string = this.startPoint.value as string;
    let toCity: string = this.endPoint.value as string;
    let count: number = Math.floor((Math.random() * 3) + 2);

    for (let i: number = 0; i < count; i++) {
      let details: { [key: string]: Object } = {};
      details["TrainNo"] = Math.floor((Math.random() * 20) + 19000);
      details["Name"] = "Train " + i;
      details["Departure"] = fromCity;
      details["Arrival"] = toCity;
      details["Availability"] = Math.floor((Math.random() * 20) + 20);
      result.push(details);
    }
    this.availTrainGrid.dataSource = result;
    this.availTrainGrid.dataBind();
  }

  public finalizeDetails(args: RowSelectEventArgs): void {
    /* Get the passenger details and update table with name and other details for confirmation */
    let reserved: Object[] = [];
    let passCount: any = 0;
    let name1: any = document.getElementById("pass_name1");
    let name2: any = document.getElementById("pass_name2");
    let name3: any = document.getElementById("pass_name3");

    for (let i: number = 1; i <= 3; i++) {
      if (name1.value !== "") {
        let details: { [key: string]: Object } = {};
        let gender: string = ((i === 1) ? this.pass_gender1.value : (i === 2) ? this.pass_gender2.value : this.pass_gender3.value) as string;
        let berth: string = ((i === 1) ? this.pass_berth1.value : (i === 2) ? this.pass_berth2.value : this.pass_berth3.value) as string;
        details["TrainNo"] = this.selectedTrain.TrainNo.toString();
        details["PassName"] = (i === 1) ? name1.value : (i === 2) ? name2.value : name3.value;
        details["Gender"] = (gender === "") ? "Male" : gender;
        details["Berth"] = berth;
        if (details["PassName"] !== "") { reserved.push(details); }
        passCount++;
      }
      let calcFare: any = 0;
      for (let i in this.cities) {
        if (this.startPoint.value == this.cities[i].name)
          calcFare = calcFare + this.cities[i].fare;
        if (this.endPoint.value == this.cities[i].name)
          calcFare = calcFare + this.cities[i].fare;
      }
      let displayAmt: any = document.getElementById("amount");
      if (this.ticketType.value === 'Economy Class') {
        displayAmt.innerText = "Total payable amount: $" + passCount * (300 + calcFare)
      } else if (this.ticketType.value === 'Business Class') {
        displayAmt.innerText = "Total payable amount: $" + passCount * (500 + calcFare)
      } else if (this.ticketType.value === 'Common Class') {
        displayAmt.innerText = "Total payable amount: $" + passCount * (150 + calcFare)
      }
    }
    this.ticketDetailGrid.dataSource = reserved;
  }

  render() {
    const hideDiv = { display: "none" };
    return (
      <div>
        <div className="col-lg-12 control-section e-tab-section">
          <div className="e-sample-resize-container">
            <div id="booking" style={hideDiv}>
              <div className="wizard-title">Plan your journey</div>
              <div className="responsive-align">
                <div className='row'>
                  <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6 search-item">
                    <DropDownListComponent ref={(dropdownlist) => { this.startPoint = dropdownlist }} width="100%" dataSource={this.cities} fields={this.autoCompleteFields} placeholder='From' floatLabelType="Auto"></DropDownListComponent>
                  </div>
                  <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6 search-item">
                    <DropDownListComponent ref={(dropdownlist) => { this.endPoint = dropdownlist }} width="100%" dataSource={this.cities} fields={this.autoCompleteFields} placeholder='To' floatLabelType="Auto"></DropDownListComponent>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6 search-item">
                    <DatePickerComponent ref={calendar => this.journeyDate = calendar} width='100%' placeholder='Journey Date' floatLabelType='Auto' min={this.dateMin} max={this.dateMax} value={this.dateValue}></DatePickerComponent>
                  </div>
                  <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6 search-item">
                    <DropDownListComponent ref={dropdownlist => this.ticketType = dropdownlist} dataSource={this.quotas} placeholder='Ticket type' floatLabelType='Auto' fields={this.fields}></DropDownListComponent>
                  </div>
                </div>
                <div className="btn-container">
                  <button id="searchNext" className="e-btn" onClick={this.btnClicked.bind(this)}>Search Train</button>
                </div>
                <span id="err1"></span>
              </div>
            </div >
            <div id="selectTrain" style={hideDiv}>
              <div className="wizard-title">Select the train from the list </div>
              <GridComponent ref={grid => this.availTrainGrid = grid} width='100%' rowSelected={this.trainSelected.bind(this)}>
                <ColumnsDirective>
                  <ColumnDirective field="TrainNo" headerText="Train No" width={120} type="number"></ColumnDirective>
                  <ColumnDirective field="Name" headerText="Name" width={140}></ColumnDirective>
                  <ColumnDirective field="Departure" headerText="Departure" width={120}></ColumnDirective>
                  <ColumnDirective field="Arrival" headerText="Arrival" width={140}></ColumnDirective>
                  <ColumnDirective field="Availability" headerText="Availability" width={140} type="number"></ColumnDirective>
                </ColumnsDirective>
              </GridComponent>
              <br />
              <div className="btn-container">
                <button id="goToSearch" className="e-btn" onClick={this.btnClicked.bind(this)}>Back</button>
                <button id="bookTickets" className="e-btn" onClick={this.btnClicked.bind(this)}>Continue</button>
              </div>
              <span id="err2"></span>
            </div>
            <div id="details" style={hideDiv}>
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
                        <input className="e-input" id="pass_name1" type="text" placeholder="Passenger Name" />
                      </td>
                      <td>
                        <NumericTextBoxComponent ref={(numerictextbox) => { this.pass_age1 = numerictextbox }} showSpinButton={false} min={1} max={100} value={18} format='n0'></NumericTextBoxComponent>
                      </td>
                      <td>
                        <DropDownListComponent ref={(dropdownlist) => { this.pass_gender1 = dropdownlist }} dataSource={this.gender} text="Male" fields={this.fields}></DropDownListComponent>
                      </td>
                      <td>
                        <DropDownListComponent ref={(dropdownlist) => { this.pass_berth1 = dropdownlist }} dataSource={this.berths} placeholder="Optional" fields={this.fields}></DropDownListComponent>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input id="pass_name2" className="e-input" type="text" placeholder="Passenger Name" />
                      </td>
                      <td>
                        <NumericTextBoxComponent showSpinButton={false} min={1} max={100} value={18} format="n0"></NumericTextBoxComponent>
                      </td>
                      <td>
                        <DropDownListComponent ref={(dropdownlist) => { this.pass_gender2 = dropdownlist }} dataSource={this.gender} text="Male" fields={this.fields}></DropDownListComponent>
                      </td>
                      <td>
                        <DropDownListComponent ref={(dropdownlist) => { this.pass_berth2 = dropdownlist }} dataSource={this.berths} placeholder="Optional" fields={this.fields}></DropDownListComponent>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input id="pass_name3" className="e-input" type="text" placeholder="Passenger Name" />
                      </td>
                      <td>
                        <NumericTextBoxComponent showSpinButton={false} min={1} max={100} value={18} format="n0"></NumericTextBoxComponent>
                      </td>
                      <td>
                        <DropDownListComponent ref={(dropdownlist) => { this.pass_gender3 = dropdownlist }} dataSource={this.gender} text="Male" fields={this.fields}></DropDownListComponent>
                      </td>
                      <td>
                        <DropDownListComponent ref={(dropdownlist) => { this.pass_berth3 = dropdownlist }} dataSource={this.berths} placeholder="Optional" fields={this.fields}></DropDownListComponent>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <br />
              <div className="btn-container">
                <button id="goBackToBook" className="e-btn" onClick={this.btnClicked.bind(this)}>Back</button>
                <button id="confirmTickets" className="e-btn" onClick={this.btnClicked.bind(this)}>Continue</button>
              </div>
              <span id="err3"></span>
            </div>
            <div id="confirm" style={hideDiv}>
              <div className="tab-title1 wizard-title">Confirm the details and proceed</div>
              <GridComponent ref={grid => this.ticketDetailGrid = grid} width='100%'>
                <ColumnsDirective>
                  <ColumnDirective field="TrainNo" headerText="Train No" width={120} type="number"></ColumnDirective>
                  <ColumnDirective field="PassName" headerText="Name" width={140}></ColumnDirective>
                  <ColumnDirective field="Gender" headerText="Gender" width={120}></ColumnDirective>
                  <ColumnDirective field="Berth" headerText="Berth" width={140}></ColumnDirective>
                </ColumnsDirective>
              </GridComponent>
              <br />
              <div id="amount"></div>
              <br />
              <div className="btn-container">
                <button id="goBackDetails" className="e-btn" onClick={this.btnClicked.bind(this)}>Back</button>
                <button id="makePayment" className="e-btn" onClick={this.btnClicked.bind(this)}>Pay</button>
              </div>
            </div>
            <TabComponent id="tab-wizard" ref={tab => this.tab = tab} heightAdjustMode="None" height={390} selecting={this.tabSelected.bind(this)}>
              <TabItemsDirective>
                <TabItemDirective header={this.headerText[0]} content={"#booking"} />
                <TabItemDirective header={this.headerText[1]} content={"#selectTrain"} disabled={true} />
                <TabItemDirective header={this.headerText[2]} content={"#details"} disabled={true} />
                <TabItemDirective header={this.headerText[3]} content={"#confirm"} disabled={true} />
              </TabItemsDirective>
            </TabComponent>
            <DialogComponent ref={dialog => this.alertDlg = dialog} header="Success" width={250} isModal={true} visible={false} showCloseIcon={true} content='Your payment successfully processed' target={this.dlgTarget} buttons={this.dlgButtons} created={this.dlgCreated}></DialogComponent>
          </div >
        </div >
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
}