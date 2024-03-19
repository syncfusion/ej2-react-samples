import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { TimelineComponent, TimelineItemModel, ItemsDirective, ItemDirective } from '@syncfusion/ej2-react-layouts';
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { SwitchComponent } from "@syncfusion/ej2-react-buttons";
import './api.css';


// *  API Sample for Timeline component

export class API extends SampleBase<{}, {}> {

    public timelineObj!: TimelineComponent | null;
    public orientationData: string[] = ['Horizontal', 'Vertical'];
    public alignData: string[] = ['Before', 'After', 'Alternate', 'Alternatereverse'];

    state = {
        orientation: this.orientationData[1],
        align: this.alignData[1],
        isReverse: false
    }

    public travelItenary = [
        { date: "May 13, 2024", details: "Flight Booking: Reserving airline tickets", icon: "sf-icon-onward" },
        { date: "June 20, 2024", details: "Hotel Accommodation: Booking lodging for the trip", icon: "sf-icon-accomodation" },
        { date: "July 2, 2024", details: "Excursion Plans: Organized visits to popular attractions", icon: "sf-icon-explore" },
        { date: "Aug 14, 2024", details: "Return Journey: Flight Confirmation", icon: "sf-icon-return" }
    ];

    public timelineItems: TimelineItemModel[] = this.travelItenary.map(({ date, details, icon }) => ({
        dotCss: icon,
        content: date,
        oppositeContent: details
    }));

    handleTogglers = (args: any, prop: string) => {
        if (this.timelineObj) {
            this.timelineObj.items.forEach((item: any, index: number) => {
                item[prop] = args.checked ? this.timelineItems[index][prop] : "";
            });
        }
    };

    render() {
        return (
            <div className='control-pane'>
                <div className="col-lg-8 control-section">
                    <div className="timeline-api-section">
                        <p style={{ fontWeight: '600' }}> Travel Itenary </p>
                        <TimelineComponent ref={(timeline) => { this.timelineObj = timeline }} orientation={this.state.orientation} align={this.state.align} reverse={this.state.isReverse}>
                            <ItemsDirective>
                                {this.timelineItems.map((item, index) => {
                                    return <ItemDirective key={index} dotCss={item.dotCss} content={item.content} oppositeContent={item.oppositeContent} />
                                })}
                            </ItemsDirective>
                        </TimelineComponent>
                    </div>
                </div>
                <div className="col-lg-4 property-section">
                    <div className="property-panel-header"> Properties </div>
                    <div className="property-panel-content timeline">
                        <table>
                            <tbody>
                                <tr>
                                    <td> Orientation </td>
                                    <td>
                                        <DropDownListComponent dataSource={this.orientationData} index={1} change={(args) => this.setState({ orientation: args.value })} popupHeight='200px'></DropDownListComponent>
                                    </td>
                                </tr>
                                <tr>
                                    <td> Alignment </td>
                                    <td>
                                        <DropDownListComponent dataSource={this.alignData} index={1} change={(args) => this.setState({ align: args.value })} popupHeight='200px'></DropDownListComponent>
                                    </td>
                                </tr>
                                <tr>
                                    <td> Opposite content </td>
                                    <td> <SwitchComponent checked={true} change={(args) => this.handleTogglers(args, 'oppositeContent')}></SwitchComponent> </td>
                                </tr>
                                <tr>
                                    <td> Show Icon </td>
                                    <td> <SwitchComponent checked={true} change={(args) => this.handleTogglers(args, 'dotCss')}></SwitchComponent> </td>
                                </tr>
                                <tr>
                                    <td> Reverse </td>
                                    <td> <SwitchComponent change={(args) => this.setState({ isReverse: args.checked })}></SwitchComponent> </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the properties available in the Timeline component.</p>
                </div>
                <div id="description">
                    <p>This sample can be customized further with the combination of Timeline properties from the property pane. For example,</p>
                    <ul>
                        <li>The layout can be changed by selecting the orientation dropdownlist from property pane.</li>
                        <li>Items alignment can be changed by selecting the alignment dropdownlist from property pane.</li>
                        <li>Show or hide the information opposite to the content by toggling the opposite content switcher button.</li>
                        <li>Show or hide the item icons by toggling the show icon switcher button.</li>
                        <li>Reverse the timeline items by toggling the reverse switcher button.</li>
                    </ul>
                </div>
            </div>
        );
    }
}