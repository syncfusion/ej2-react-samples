import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { CarouselComponent, CarouselItemsDirective, CarouselItemDirective } from '@syncfusion/ej2-react-navigations';
import { SampleBase } from '../common/sample-base';
import './partial-visible.css';

export class PartialVisible extends SampleBase<{}, {}> {

  public itemTemplate1(): JSX.Element {
    return (<figure className="img-container">
      <img src="src/carousel/images/bridge.jpg" alt="bridge" style={{ height: "100%", width: "100% " }} />
      <figcaption className="img-caption">Golden Gate Bridge, San Francisco</figcaption>
    </figure>);
  }
  public itemTemplate2(): JSX.Element {
    return (<figure className="img-container">
      <img src="src/carousel/images/trees.jpg" alt="trees" style={{ height: "100%", width: "100% " }} />
      <figcaption className="img-caption">Spring Flower Trees</figcaption>
    </figure>);
  }
  public itemTemplate3(): JSX.Element {
    return (<figure className="img-container">
      <img src="src/carousel/images/waterfall.jpg" alt="waterfall" style={{ height: "100%", width: "100% " }} />
      <figcaption className="img-caption">Oddadalen Waterfalls, Norway</figcaption>
    </figure>);
  }
  public itemTemplate4(): JSX.Element {
    return (<figure className="img-container">
      <img src="src/carousel/images/sea.jpg" alt="sea" style={{ height: "100%", width: "100% " }} />
      <figcaption className="img-caption">Anse Source d`Argent, Seychelles</figcaption>
    </figure>);
  }
  public itemTemplate5(): JSX.Element {
    return (<figure className="img-container">
      <img src="src/carousel/images/rocks.jpeg" alt="rocks" style={{ height: "100%", width: "100% " }} />
      <figcaption className="img-caption">Stonehenge, England</figcaption>
    </figure>);
  }

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section partial-carousel-section'>
          <div className='control carousel-sample'>
            {/* Render the Carousel Component */}
            <CarouselComponent cssClass="partial-carousel" partialVisible={true}>
              <CarouselItemsDirective>
                <CarouselItemDirective template={this.itemTemplate1.bind(this)} />
                <CarouselItemDirective template={this.itemTemplate2.bind(this)} />
                <CarouselItemDirective template={this.itemTemplate3.bind(this)} />
                <CarouselItemDirective template={this.itemTemplate4.bind(this)} />
                <CarouselItemDirective template={this.itemTemplate5.bind(this)} />
              </CarouselItemsDirective>
            </CarouselComponent>
          </div></div>
        <div id="action-description">
          <p>This sample demonstrates the partial visible functionality of the <a
            href="https://www.syncfusion.com/react-ui-components/react-carousel" target="_blank">React Carousel</a> component.
          </p>
        </div>
        <div id="description">
          <p>
            The <code>React Carousel</code> component shows partially visible previous/next slides by setting the
            <code>partialVisible</code> property to true. By default, this property is set to <code>false</code>.
          </p>
          <p>See also
          </p>
          <p><a target='_blank'
            href="https://ej2.syncfusion.com/react/documentation/carousel/getting-started/">React Carousel Getting Started</a>.
          </p>
        </div>
      </div>
    );
  }
}
