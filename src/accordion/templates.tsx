import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { AccordionComponent, AccordionItemDirective, AccordionItemsDirective, ExpandEventArgs } from '@syncfusion/ej2-react-navigations';
import { SampleBase } from '../common/sample-base';
import './accordion.component.css'

export class Templates extends SampleBase<{}, {}> {
  render() {
    function sensorContent() {
      return (
        <div>
          <table>
            <tbody>
              <tr>
                <td>Proximity sensor</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Face ID</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Accelerometer</td>
                <td>Yes</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }

    function cameraContent() {
      return (
        <div>
          <table>
            <tbody>
              <tr>
                <th rowSpan={3}>Camera</th>
                <td> 12MP wide-angle</td>
              </tr>
              <tr>
                <td>Live Photos with stabilization</td>
              </tr>
              <tr>
                <td>Body and face detection</td>
              </tr>
              <tr>
                <th rowSpan={4}>TrueDepth Camera</th>
                <td> 7MP camera</td>
              </tr>
              <tr>
                <td> Animoji</td>
              </tr>
              <tr>
                <td> Face detection</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }

    function videoRecordContent() {
      return (
        <div>
          <table>
            <tbody>
              <tr>
                <th rowSpan={6}>Video Recording</th>
                <td>4K video recording</td>
              </tr>
              <tr>
                <td>1080p &amp; 720p HD video recording</td>
              </tr>
              <tr>
                <td>Optical zoom, 6x digital zoom</td>
              </tr>
              <tr>
                <td>Slow motion video support</td>
              </tr>
              <tr>
                <td>Take 8MP still photos while recording 4K video</td>
              </tr>
              <tr>
                <td>Noise reduction</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }

    function networkHeader() {
      return <div>Network & Connectivity</div>;
    }
    function featureheader() {
      return <div>Feature</div>;
    }
    function hardwareheader() {
      return <div>Hardware & Software</div>;
    }
    function hardwareContent() {
      return (
        <div id="Hard_Soft_features">
          <table>
            <tbody>
              <tr>
                <th rowSpan={3}> Hardware</th>
                <td rowSpan={2}>Chip</td>
                <td>Apple A11 Bionic chip with 64-bit architecture</td>
              </tr>
              <tr>
                <td>Embedded M11 motion coprocessor</td>
              </tr>
              <tr>
                <td>Capacity</td>
                <td>64GB/256GB</td>
              </tr>
              <tr>
                <th> Software</th>
                <td>Operating System</td>
                <td>iOS 11</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }

    function networkContent() {
      return (
        <div>
          <table>
            <tbody>
              <tr>
                <th rowSpan={2}>CELLULAR</th>
                <td>Technology</td>
                <td>GSM / CDMA / HSPA / EV-DO / LTE</td>
              </tr>
              <tr>
                <td>Edge</td>
                <td>Yes</td>
              </tr>
              <tr>
                <th rowSpan={3}>WIRELESS</th>
                <td>Wi-Fi</td>
                <td>Yes (802.11 a/b/g/n/ac)</td>
              </tr>
              <tr>
                <td>Bluetooth</td>
                <td>Yes (v 5.0)</td>
              </tr>
              <tr>
                <td>NFC</td>
                <td>Yes</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }

    function nestedAccordion() {
      return (
        <div>
          <AccordionComponent expandMode="Single">
            <AccordionItemsDirective>
              <AccordionItemDirective header="Sensor" content={sensorContent} />
              <AccordionItemDirective header="Camera" content={cameraContent} />
              <AccordionItemDirective header="Video Recording" content={videoRecordContent} />
            </AccordionItemsDirective>
          </AccordionComponent>
        </div>
      );
    }

    return (
      <div className="control-pane">
        <div className="control-section accordion-control-section">
          <div className="product_title"> iPhone X Product Specification </div>
          {/* Render the Accordion Component */}
          <AccordionComponent expandMode="Single">
            <AccordionItemsDirective>
              <AccordionItemDirective header={networkHeader} content={networkContent} expanded={true} />
              <AccordionItemDirective header={featureheader} content={nestedAccordion} />
              <AccordionItemDirective header={hardwareheader} content={hardwareContent} />
            </AccordionItemsDirective>
          </AccordionComponent>
        </div>
        <div id="source_link">
          Source: &nbsp;
          <a href="https://www.apple.com/iphone-x/specs/" target="_blank">
            www.apple.com/iphone-x/specs/
          </a>
        </div>
        <div id="action-description">
          <p>
            This sample demonstrates the template functionalities of the <code>Accordion</code> component.
          </p>
        </div>
        <div id="description">
          <p>
            This sample illustrates to load an Accordion content using <code>content</code> property. In second panel Feature, another Accordion component is nested as the content of the main Accordion component.
          </p>
          <p>
            More information about Accordion can be found in this{" "}
            <a aria-label="Accordion getting started"
              target="_blank"
              href="https://ej2.syncfusion.com/react/documentation/accordion/getting-started/"
            >
              documentation
            </a>{" "}
            section.
          </p>
        </div>
      </div>
    );
  }
}