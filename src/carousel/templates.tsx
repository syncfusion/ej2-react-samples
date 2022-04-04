import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { CarouselComponent, CarouselItemsDirective, CarouselItemDirective } from '@syncfusion/ej2-react-navigations';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { SampleBase } from '../common/sample-base';
import './templates.css';

export class Templates extends SampleBase<{}, {}> {

  private carouselObj: CarouselComponent;

  public itemTemplate1(): JSX.Element {
    return (
      <figure className="img-container">
        <img src="src/carousel/images/cardinal.png" alt="cardinal" style={{ height: "100%", width: "100%" }} />
      </figure>
    );
  }

  public itemTemplate2(): JSX.Element {
    return (
      <figure className="img-container">
        <img src="src/carousel/images/hunei.png" alt="hunei" style={{ height: "100%", width: "100%" }} />
      </figure>
    );
  }

  public itemTemplate3(): JSX.Element {
    return (
      <figure className="img-container">
        <img src="src/carousel/images/costa-rica.png" alt="costa-rica" style={{ height: "100%", width: "100%" }} />
      </figure>
    );
  }

  public itemTemplate4(): JSX.Element {
    return (
      <figure className="img-container">
        <img src="src/carousel/images/kaohsiung.png" alt="kaohsiung" style={{ height: "100%", width: "100%" }} />
      </figure>
    );
  }

  public itemTemplate5(): JSX.Element {
    return (
      <figure className="img-container">
        <img src="src/carousel/images/bee-eater.png" alt="bee-eater" style={{ height: "100%", width: "100%" }} />
      </figure>
    );
  }

  public previousButtonTemplate(props: any): JSX.Element {
    return (
      <ButtonComponent className="e-btn" cssClass="e-flat e-round nav-btn" title={props.type}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
          <path d="m13.5 7.01 13 13m-13 13 13-13"></path>
        </svg>
      </ButtonComponent>
    );
  }

  public nextButtonTemplate(props: any): JSX.Element {
    return (
      <ButtonComponent className="e-btn" cssClass="e-flat e-round nav-btn" title={props.type}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
          <path d="m13.5 7.01 13 13m-13 13 13-13"></path>
        </svg>
      </ButtonComponent>
    );
  }

  public indicatorTemplate(props: any): JSX.Element {
    const birds = ['cardinal', 'hunei', 'costa-rica', 'kaohsiung', 'bee-eater'];
    return (
      <div className="indicator">
        <img src={`src/carousel/images/${birds[props.index]}.png`} alt="image" style={{ height: "100%", width: "100%" }} />
      </div>
    );
  }

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section template-carousel-section'>
          <div className='control carousel-sample'>
            {/* Render the Carousel Component */}
            <CarouselComponent cssClass="templateCarousel" animation={{ effect: 'Fade' }} buttonsVisibility="Visible" indicatorsTemplate={this.indicatorTemplate.bind(this)}
              previousButtonTemplate={this.previousButtonTemplate.bind(this)} nextButtonTemplate={this.nextButtonTemplate.bind(this)}>
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
          <p>
            This sample demonstrates the customization of the <strong>React Carousel</strong> component using various templates.
          </p>
        </div>
        <div id="description">
          <p>
            In this demo, the <code>React Carousel</code> component is customized by using the templates. The navigators are customized using <code>previousButtonTemplate</code>,
            and <code>nextButtonTemplate</code>. The indicators are customized using <code>indicatorsTemplate</code>. The carousel item is customized using <code>template</code> option.
          </p>
          <p>
            More information about customizing React Carousel component can be found in this <a target='_blank' href="https://ej2.syncfusion.com/documentation/carousel/getting-started">documentation section</a>.
          </p>
        </div>
      </div>
    );
  }
}