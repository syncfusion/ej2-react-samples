"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var ej2_react_calendars_1 = require("@syncfusion/ej2-react-calendars");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var sample_base_1 = require("../common/sample-base");
require("./tab.component.css");
/**
 *  Tab Wizard sample
 */
// tslint:disable:max-line-length
var Wizard = (function (_super) {
    __extends(Wizard, _super);
    function Wizard() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.today = new Date();
        _this.dlgTarget = document.querySelector('.sb-content-tab.e-tab .e-content.sb-sample-content-area');
        _this.dateMin = new Date(_this.today.getTime());
        _this.dateMax = new Date(_this.today.getTime() + 60 * 24 * 60 * 60 * 1000);
        _this.fields = { id: "id", text: "text", value: "text" };
        _this.autoCompleteFields = { text: 'name', value: 'name' };
        _this.dateValue = new Date();
        _this.result = [];
        _this.reserved = [];
        _this.headerText = [
            { "text": "New Booking" },
            { "text": "Train List" },
            { "text": "Add Passenger" },
            { "text": "Make Payment" }
        ];
        _this.quotas = [
            { id: "1", text: "Business Class" },
            { id: "2", text: "Economy Class" },
            { id: "4", text: "Common Class" }
        ];
        _this.gender = [
            { id: "1", text: "Male" },
            { id: "2", text: "Female" }
        ];
        _this.berths = [
            { id: "1", text: "Upper" },
            { id: "2", text: "Lower" },
            { id: "3", text: "Middle" },
            { id: "4", text: "Window" },
            { id: "5", text: "Aisle" }
        ];
        _this.cities = [
            { name: 'Chicago', fare: 300 },
            { name: 'San Francisco', fare: 125 },
            { name: 'Los Angeles', fare: 175 },
            { name: 'Seattle', fare: 250 },
            { name: 'Florida', fare: 150 }
        ];
        _this.dlgButtons = [{
                buttonModel: { content: "OK", isPrimary: true },
                click: (function () {
                    _this.alertDlg.hide();
                    _this.tab.enableTab(0, true);
                    _this.tab.enableTab(1, false);
                    _this.tab.enableTab(2, false);
                    _this.tab.enableTab(3, false);
                    _this.tab.select(0);
                })
            }];
        return _this;
    }
    Wizard.prototype.dlgCreated = function () {
        var proxy = this.alertDlg;
        proxy.hide();
    };
    Wizard.prototype.focusIn = function () {
        var proxy = this.journeyDate;
        proxy.show();
    };
    Wizard.prototype.tabSelecting = function (e) {
        if (e.isSwiped) {
            e.cancel = true;
        }
    };
    Wizard.prototype.trainSelected = function (args) {
        this.selectedTrain = args.data;
    };
    Wizard.prototype.btnClicked = function (e) {
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
                var name_1 = document.getElementById("pass_name1");
                var age = this.pass_age1.value;
                var gender = this.pass_gender1.value;
                if (name_1.value === "" || age === "" || gender === "") {
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
    };
    Wizard.prototype.filterTrains = function (args) {
        /* Generating trains based on source and destination chosen */
        var fromCity = this.startPoint.value;
        var toCity = this.endPoint.value;
        var count = Math.floor((Math.random() * 3) + 2);
        for (var i = 0; i < count; i++) {
            var details = {};
            details["TrainNo"] = Math.floor((Math.random() * 20) + 19000);
            details["Name"] = "Train " + i;
            details["Departure"] = fromCity;
            details["Arrival"] = toCity;
            details["Availability"] = Math.floor((Math.random() * 20) + 20);
            this.result.push(details);
        }
    };
    Wizard.prototype.availableTrainGridcreated = function () {
        this.availTrainGrid.dataSource = this.result;
    };
    Wizard.prototype.finalizeDetails = function (args) {
        /* Get the passenger details and update table with name and other details for confirmation */
        var passCount = 0;
        var name1 = document.getElementById("pass_name1");
        var name2 = document.getElementById("pass_name2");
        var name3 = document.getElementById("pass_name3");
        for (var i = 1; i <= 3; i++) {
            if (name1.value !== "") {
                var details = {};
                var gender = ((i === 1) ? this.pass_gender1.value : (i === 2) ? this.pass_gender2.value : this.pass_gender3.value);
                var berth = ((i === 1) ? this.pass_berth1.value : (i === 2) ? this.pass_berth2.value : this.pass_berth3.value);
                details["TrainNo"] = this.selectedTrain.TrainNo.toString();
                details["PassName"] = (i === 1) ? name1.value : (i === 2) ? name2.value : name3.value;
                details["Gender"] = (gender === "") ? "Male" : gender;
                details["Berth"] = berth;
                if (details["PassName"] !== "") {
                    this.reserved.push(details);
                }
                passCount++;
            }
            var calcFare = 0;
            for (var i_1 in this.cities) {
                if (this.startPoint.value == this.cities[i_1].name)
                    calcFare = calcFare + this.cities[i_1].fare;
                if (this.endPoint.value == this.cities[i_1].name)
                    calcFare = calcFare + this.cities[i_1].fare;
            }
            var displayAmt = document.getElementById("amount");
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
    };
    Wizard.prototype.ticketDetailGridcreated = function () {
        this.ticketDetailGrid.dataSource = this.reserved;
    };
    Wizard.prototype.content0 = function () {
        var _this = this;
        return (React.createElement("div", { id: "booking" },
            React.createElement("div", { className: "wizard-title" }, "Plan your journey"),
            React.createElement("div", { className: "responsive-align" },
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6 search-item" },
                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (dropdownlist) { _this.startPoint = dropdownlist; }, width: "100%", dataSource: this.cities, fields: this.autoCompleteFields, placeholder: "From", floatLabelType: "Auto" })),
                    React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6 search-item" },
                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (dropdownlist) { _this.endPoint = dropdownlist; }, width: "100%", dataSource: this.cities, fields: this.autoCompleteFields, placeholder: "To", floatLabelType: "Auto" }))),
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6 search-item" },
                        React.createElement(ej2_react_calendars_1.DatePickerComponent, { ref: function (calendar) { return (_this.journeyDate = calendar); }, width: "100%", placeholder: "Journey Date", floatLabelType: "Auto", min: this.dateMin, max: this.dateMax, focus: this.focusIn.bind(this) })),
                    React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6 search-item" },
                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (dropdownlist) { return (_this.ticketType = dropdownlist); }, dataSource: this.quotas, placeholder: "Ticket type", floatLabelType: "Auto", fields: this.fields }))),
                React.createElement("div", { className: "btn-container" },
                    React.createElement("button", { id: "searchNext", className: "e-btn", onClick: this.btnClicked.bind(this) }, "Search Train")),
                React.createElement("span", { id: "err1" }))));
    };
    Wizard.prototype.content1 = function () {
        var _this = this;
        return (React.createElement("div", { id: "selectTrain" },
            React.createElement("div", { className: "wizard-title" }, "Select the train from the list "),
            React.createElement(ej2_react_grids_1.GridComponent, { ref: function (grid) { return (_this.availTrainGrid = grid); }, width: "100%", rowSelected: this.trainSelected.bind(this), created: this.availableTrainGridcreated.bind(this) },
                React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: "TrainNo", headerText: "Train No", width: 120, type: "number" }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: "Name", headerText: "Name", width: 140 }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: "Departure", headerText: "Departure", width: 120 }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: "Arrival", headerText: "Arrival", width: 140 }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: "Availability", headerText: "Availability", width: 140, type: "number" }))),
            React.createElement("br", null),
            React.createElement("div", { className: "btn-container" },
                React.createElement("button", { id: "goToSearch", className: "e-btn", onClick: this.btnClicked.bind(this) }, "Back"),
                React.createElement("button", { id: "bookTickets", className: "e-btn", onClick: this.btnClicked.bind(this) }, "Continue")),
            React.createElement("span", { id: "err2" })));
    };
    Wizard.prototype.content2 = function () {
        var _this = this;
        return (React.createElement("div", { id: "details" },
            React.createElement("div", { className: "details-page wizard-title" }, "Enter the passenger details"),
            React.createElement("div", { id: "PassengersList" },
                React.createElement("table", { id: "passenger-table" },
                    React.createElement("colgroup", null,
                        React.createElement("col", null),
                        React.createElement("col", null),
                        React.createElement("col", null),
                        React.createElement("col", null),
                        React.createElement("col", null),
                        React.createElement("col", null)),
                    React.createElement("thead", null,
                        React.createElement("tr", null,
                            React.createElement("th", { className: "name-header" }, "Name"),
                            React.createElement("th", { className: "age-header" }, "Age"),
                            React.createElement("th", { className: "gender-header" }, "Gender"),
                            React.createElement("th", { className: "type-header" }, "Berth Preference"))),
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("input", { className: "e-input", id: "pass_name1", type: "text", placeholder: "Passenger Name" })),
                            React.createElement("td", null,
                                React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { ref: function (numerictextbox) { _this.pass_age1 = numerictextbox; }, showSpinButton: false, min: 1, max: 100, value: 18, format: "n0" })),
                            React.createElement("td", null,
                                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (dropdownlist) { _this.pass_gender1 = dropdownlist; }, dataSource: this.gender, text: "Male", fields: this.fields })),
                            React.createElement("td", null,
                                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (dropdownlist) { _this.pass_berth1 = dropdownlist; }, dataSource: this.berths, placeholder: "Optional", fields: this.fields }))),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("input", { id: "pass_name2", className: "e-input", type: "text", placeholder: "Passenger Name" })),
                            React.createElement("td", null,
                                React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { showSpinButton: false, min: 1, max: 100, value: 18, format: "n0" })),
                            React.createElement("td", null,
                                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (dropdownlist) { _this.pass_gender2 = dropdownlist; }, dataSource: this.gender, text: "Male", fields: this.fields })),
                            React.createElement("td", null,
                                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (dropdownlist) { _this.pass_berth2 = dropdownlist; }, dataSource: this.berths, placeholder: "Optional", fields: this.fields }))),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("input", { id: "pass_name3", className: "e-input", type: "text", placeholder: "Passenger Name" })),
                            React.createElement("td", null,
                                React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { showSpinButton: false, min: 1, max: 100, value: 18, format: "n0" })),
                            React.createElement("td", null,
                                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (dropdownlist) { _this.pass_gender3 = dropdownlist; }, dataSource: this.gender, text: "Male", fields: this.fields })),
                            React.createElement("td", null,
                                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (dropdownlist) { _this.pass_berth3 = dropdownlist; }, dataSource: this.berths, placeholder: "Optional", fields: this.fields })))))),
            React.createElement("br", null),
            React.createElement("div", { className: "btn-container" },
                React.createElement("button", { id: "goBackToBook", className: "e-btn", onClick: this.btnClicked.bind(this) }, "Back"),
                React.createElement("button", { id: "confirmTickets", className: "e-btn", onClick: this.btnClicked.bind(this) }, "Continue")),
            React.createElement("span", { id: "err3" })));
    };
    Wizard.prototype.content3 = function () {
        var _this = this;
        return (React.createElement("div", { id: "confirm" },
            React.createElement("div", { className: "tab-title1 wizard-title" }, "Confirm the details and proceed"),
            React.createElement(ej2_react_grids_1.GridComponent, { ref: function (grid) { return (_this.ticketDetailGrid = grid); }, width: "100%", created: this.ticketDetailGridcreated.bind(this) },
                React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: "TrainNo", headerText: "Train No", width: 120, type: "number" }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: "PassName", headerText: "Name", width: 140 }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: "Gender", headerText: "Gender", width: 120 }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: "Berth", headerText: "Berth", width: 140 }))),
            React.createElement("br", null),
            React.createElement("div", { id: "amount" }),
            React.createElement("br", null),
            React.createElement("div", { className: "btn-container" },
                React.createElement("button", { id: "goBackDetails", className: "e-btn", onClick: this.btnClicked.bind(this) }, "Back"),
                React.createElement("button", { id: "makePayment", className: "e-btn", onClick: this.btnClicked.bind(this) }, "Pay"))));
    };
    Wizard.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement("div", { className: "col-lg-12 control-section e-tab-section" },
                React.createElement("div", { className: "e-sample-resize-container" },
                    React.createElement(ej2_react_navigations_1.TabComponent, { id: "tab-wizard", ref: function (tab) { return (_this.tab = tab); }, heightAdjustMode: "None", height: 390, selecting: this.tabSelecting.bind(this) },
                        React.createElement(ej2_react_navigations_1.TabItemsDirective, null,
                            React.createElement(ej2_react_navigations_1.TabItemDirective, { header: this.headerText[0], content: this.content0.bind(this) }),
                            React.createElement(ej2_react_navigations_1.TabItemDirective, { header: this.headerText[1], content: this.content1.bind(this), disabled: true }),
                            React.createElement(ej2_react_navigations_1.TabItemDirective, { header: this.headerText[2], content: this.content2.bind(this), disabled: true }),
                            React.createElement(ej2_react_navigations_1.TabItemDirective, { header: this.headerText[3], content: this.content3.bind(this), disabled: true }))),
                    React.createElement(ej2_react_popups_1.DialogComponent, { ref: function (dialog) { return (_this.alertDlg = dialog); }, header: "Success", width: 250, isModal: true, visible: false, showCloseIcon: true, content: "Your payment successfully processed", target: this.dlgTarget, buttons: this.dlgButtons, created: this.dlgCreated.bind(this) }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates simple train reservation wizard that enable/disable Tab items based on sequential validation of each Tab content.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Tab items can be disabled dynamically by passing the index and boolean value to the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/tab/#enabletab" }, "enableTab"),
                    " method."),
                React.createElement("p", null, "You can design wizard like sample with Tab using the in-built API and customizing the content with proper validations."),
                React.createElement("p", null,
                    "More information about Tab can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/tab/getting-started/" }, " documentation"),
                    " section."))));
    };
    return Wizard;
}(sample_base_1.SampleBase));
exports.Wizard = Wizard;
