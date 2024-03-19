import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { updateSampleSection } from "../common/sample-base";
import { TimelineComponent, TimelineItemModel, ItemsDirective, ItemDirective } from '@syncfusion/ej2-react-layouts';
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { SwitchComponent } from "@syncfusion/ej2-react-buttons";
import "./api.css";

const API = () => {
  useEffect(() => {
    updateSampleSection();
  }, []);

  const orientationData: string[] = ['Horizontal', 'Vertical'];
  const alignData: string[] = ['Before', 'After', 'Alternate', 'Alternatereverse'];

  const [isReverse, setIsReverse] = useState(false);
  const [orientation, setOrientation] = useState(orientationData[1]);
  const [alignment, setAlignment] = useState(alignData[1]);
  const timelineObj = useRef<TimelineComponent>(null);

  const travelItenary = [
    { date: "May 13, 2024", details: "Flight Booking: Reserving airline tickets", icon: "sf-icon-onward" },
    { date: "June 20, 2024", details: "Hotel Accommodation: Booking lodging for the trip", icon: "sf-icon-accomodation" },
    { date: "July 2, 2024", details: "Excursion Plans: Organized visits to popular attractions", icon: "sf-icon-explore" },
    { date: "Aug 14, 2024", details: "Return Journey: Flight Confirmation", icon: "sf-icon-return" }
  ];

  const timelineItems: TimelineItemModel[] = travelItenary.map(({ date, details, icon }) => ({
    dotCss: icon,
    content: date,
    oppositeContent: details
  }));

  const handleTogglers = (args: any, prop: string) => {
    if (timelineObj.current) {
      timelineObj.current.items.forEach((item: any, index: number) => {
        item[prop] = args.checked ? timelineItems[index][prop] : "";
      });
    }
  };

  return (
    <div className="control-pane">
      <div className="col-lg-8 control-section">
        <div className="timeline-api-section">
          <p style={{ fontWeight: '600' }}> Travel Itenary </p>
          <TimelineComponent ref={timelineObj} orientation={orientation} align={alignment} reverse={isReverse}>
            <ItemsDirective>
              {timelineItems.map((item, index) => {
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
                  <DropDownListComponent dataSource={orientationData} index={1} change={(args) => setOrientation(args.value)} popupHeight='200px'></DropDownListComponent>
                </td>
              </tr>
              <tr>
                <td> Alignment </td>
                <td>
                  <DropDownListComponent dataSource={alignData} index={1} change={(args) => setAlignment(args.value)} popupHeight='200px'></DropDownListComponent>
                </td>
              </tr>
              <tr>
                <td> Opposite content </td>
                <td> <SwitchComponent checked={true} change={(args) => handleTogglers(args, 'oppositeContent')}></SwitchComponent> </td>
              </tr>
              <tr>
                <td> Show Icon </td>
                <td> <SwitchComponent checked={true} change={(args) => handleTogglers(args, 'dotCss')}></SwitchComponent> </td>
              </tr>
              <tr>
                <td> Reverse </td>
                <td> <SwitchComponent change={(args) => setIsReverse(args.checked)}></SwitchComponent> </td>
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
export default API;
