import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { CarouselComponent, CarouselItemsDirective, CarouselItemDirective } from '@syncfusion/ej2-react-navigations';
import { SampleBase } from '../common/sample-base';
import './keyboard-navigation.css';

export class KeyboardNavigation extends SampleBase<{}, {}> {

  public componentDidMount(): void {
    document.body.addEventListener('keydown', function (e) {
      var carouselElement: HTMLElement = document.querySelector('.e-carousel .e-carousel-slide-container');
      if (e.altKey && e.keyCode === 74 && carouselElement) {
        carouselElement.focus();
      }
    });
  }

  public itemTemplate1(): JSX.Element {
    return (<div className="product-container">
      <div className="col-sm-5 component-container">
        <div className="heading">San Francisco</div>
        <div className="description">
          San Francisco, officially the City and County of San Francisco, is a cultural, commercial, and financial center in the U.S. state of California.
        </div>
        <a className="demo" href="https://en.wikipedia.org/wiki/San_Francisco"
          target="_blank">READ MORE</a>
      </div>
      <div className="col-sm-5 image-container">
        <picture>
          <img width="100%" height="100%"
            src="src/carousel/images/san-francisco.jpg"
            alt="San Francisco" />
        </picture>
      </div>
    </div>);
  }
  public itemTemplate2(): JSX.Element {
    return (<div className="product-container">
      <div className="col-sm-5 component-container">
        <div className="heading">London</div>
        <div className="description">
          London, the capital of England and the United Kingdom, is a 21st-century city with history stretching back to Roman times. At its centre stand the imposing Houses of Parliament, the iconic ‘Big Ben’ clock tower and Westminster Abbey, site of British monarch coronations.
        </div>
        <a className="demo"
          href="https://en.wikipedia.org/wiki/London"
          target="_blank">READ MORE</a>
      </div>
      <div className="col-sm-5 image-container">
        <picture>
          <img width="100%" height="100%"
            src="src/carousel/images/london.jpg"
            alt="London" />
        </picture>
      </div>
    </div>);
  }
  public itemTemplate3(): JSX.Element {
    return (<div className="product-container">
      <div className="col-sm-5 component-container">
        <div className="heading">Tokyo</div>
        <div className="description">
          Tokyo, Japan’s busy capital, mixes the ultramodern and the traditional, from neon-lit skyscrapers to historic temples. The opulent Meiji Shinto Shrine is known for its towering gate and surrounding woods. The Imperial Palace sits amid large public gardens.
        </div>
        <a className="demo" href="https://en.wikipedia.org/wiki/Tokyo"
          target="_blank">READ MORE</a>
      </div>
      <div className="col-sm-5 image-container">
        <picture>
          <img width="100%" height="100%"
            src="src/carousel/images/tokyo.jpg"
            alt="Tokyo" />
        </picture>
      </div>
    </div>);
  }
  public itemTemplate4(): JSX.Element {
    return (<div className="product-container">
      <div className="col-sm-5 component-container">
        <div className="heading">Moscow</div>
        <div className="description">
          Moscow, on the Moskva River in western Russia, is the nation’s cosmopolitan capital. In its historic core is the Kremlin, a complex that’s home to the president and tsarist treasures in the Armoury. Outside its walls is Red Square, Russia's symbolic center.
        </div>
        <a className="demo" href="https://en.wikipedia.org/wiki/Moscow"
          target="_blank">READ MORE</a>
      </div>
      <div className="col-sm-5 image-container">
        <picture>
          <img width="100%" height="100%"
            src="src/carousel/images/moscow.jpg"
            alt="Moscow" />
        </picture>
      </div>
    </div>);
  }

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section keyboard-carousel-section'>
          <div className='control carousel-sample'>
            {/* Render the Carousel Component */}
            <CarouselComponent id='carousel' showPlayButton={true} autoPlay={false} cssClass="kb-carousel">
              <CarouselItemsDirective>
                <CarouselItemDirective template={this.itemTemplate1.bind(this)} />
                <CarouselItemDirective template={this.itemTemplate2.bind(this)} />
                <CarouselItemDirective template={this.itemTemplate3.bind(this)} />
                <CarouselItemDirective template={this.itemTemplate4.bind(this)} />
              </CarouselItemsDirective>
            </CarouselComponent>
          </div></div>
        <div id="action-description">
          <p>
            This sample demonstrates the keyboard navigation functionalities of the <a href="https://www.syncfusion.com/react-ui-components/react-carousel" target="_blank">React Carousel</a> component.
          </p>
        </div>
        <div id="description">
          <p>
            The <code>React Carousel</code> component can be interacted with keyboard navigation. Below key combinations can be used in Carousel to initiate various actions.
          </p>
          <ul>
            <li><b>Alt + J</b> keys to focus the carousel component (done at application end).</li>
            <li><b>Arrows</b> keys to navigate between slides.</li>
            <li><b>Home</b> to navigate to the first slide.</li>
            <li><b>End</b> to navigate to the last slide.</li>
            <li><b>Space</b> to play/pause the slide transitions.</li>
            <li><b>Enter</b> to perform the respective action on its focus.</li>
          </ul>
          <p>
            More information about React Carousel component keyboard navigations can be found in this
            <a aria-label="Documentation" target="_blank" href="https://ej2.syncfusion.com/react/documentation/carousel/getting-started/"> documentation</a> section.
          </p>
        </div>
      </div>
    );
  }
}