import * as ReactDOM from "react-dom";
import * as React from "react";
import { useEffect } from "react";
import { updateSampleSection } from "../common/sample-base";
import { TimelineComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-react-layouts';
import "./default.css";

const Default = () => {
  useEffect(() => {
    updateSampleSection();
  }, []);

  const orderStatus = [
    'Ordered \n 9:15 AM, January 1, 2024',
    'Shipped \n 12:20 PM, January 4, 2024',
    'Out for delivery \n 07:00 AM, January 8, 2024',
    'Delivered \n Estimated delivery by 09:20 AM'
  ];

  return (
    <div className="control-pane">
      <div className="col-lg-12 control-section">
        <div className="default-timeline-section">
          <TimelineComponent>
            <ItemsDirective>
              <ItemDirective content={orderStatus[0]} dotCss='state-success' cssClass='completed' />
              <ItemDirective content={orderStatus[1]} dotCss='state-success' cssClass='completed' />
              <ItemDirective content={orderStatus[2]} dotCss='state-progress' cssClass='intermediate' />
              <ItemDirective content={orderStatus[3]} />
            </ItemsDirective>
          </TimelineComponent>
        </div>
      </div>

      <div id="action-description">
        <p>This sample demonstrates the default functionalities of the Timeline component including the highlighted customization.</p>
      </div>
      <div id="description">
        <p>
          The Timeline component enables users to display a series of data in chronological order, such as user activities, tracking progress, and more.
          In this example, we have used the <code>content</code> property to display the item's content, <code>dotCss</code> property to customize the dot with background color and <code>cssClass</code> to customize the last connector as dashed style.
        </p>
      </div>
    </div>
  );
}
export default Default;
