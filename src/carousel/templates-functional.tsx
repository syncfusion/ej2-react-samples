import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { CarouselComponent, CarouselItemsDirective, CarouselItemDirective } from '@syncfusion/ej2-react-navigations';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { updateSampleSection } from '../common/sample-base';
import './templates.css';

function Templates() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])

    let carouselObj: CarouselComponent;

    function itemTemplate1(): JSX.Element {
        return (
            <figure className="img-container">
                <img src="src/carousel/images/cardinal.png" alt="cardinal" style={{ height: "100%", width: "100%" }} />
            </figure>
        );
    }

    function itemTemplate2(): JSX.Element {
        return (
            <figure className="img-container">
                <img src="src/carousel/images/hunei.png" alt="hunei" style={{ height: "100%", width: "100%" }} />
            </figure>
        );
    }

    function itemTemplate3(): JSX.Element {
        return (
            <figure className="img-container">
                <img src="src/carousel/images/costa-rica.png" alt="costa-rica" style={{ height: "100%", width: "100%" }} />
            </figure>
        );
    }

    function itemTemplate4(): JSX.Element {
        return (
            <figure className="img-container">
                <img src="src/carousel/images/kaohsiung.png" alt="kaohsiung" style={{ height: "100%", width: "100%" }} />
            </figure>
        );
    }

    function itemTemplate5(): JSX.Element {
        return (
            <figure className="img-container">
                <img src="src/carousel/images/bee-eater.png" alt="bee-eater" style={{ height: "100%", width: "100%" }} />
            </figure>
        );
    }

    function previousButtonTemplate(props: any): JSX.Element {
        return (
            <ButtonComponent className="e-btn" cssClass="e-flat e-round nav-btn" title={props.type}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
                    <path d="m13.5 7.01 13 13m-13 13 13-13"></path>
                </svg>
            </ButtonComponent>
        );
    }

    function nextButtonTemplate(props: any): JSX.Element {
        return (
            <ButtonComponent className="e-btn" cssClass="e-flat e-round nav-btn" title={props.type}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
                    <path d="m13.5 7.01 13 13m-13 13 13-13"></path>
                </svg>
            </ButtonComponent>
        );
    }

    function indicatorTemplate(props: any): JSX.Element {
        const birds = ['cardinal', 'hunei', 'costa-rica', 'kaohsiung', 'bee-eater'];
        return (
            <div className="indicator">
                <img src={`src/carousel/images/${birds[props.index]}.png`} alt="image" style={{ height: "100%", width: "100%" }} />
            </div>
        );
    }

    return (
        <div className='control-pane'>
            <div className='control-section template-carousel-section'>
                <div className='control carousel-sample'>
                    {/* Render the Carousel Component */}
                    <CarouselComponent cssClass="templateCarousel" animationEffect="Fade" buttonsVisibility="Visible" indicatorsTemplate={indicatorTemplate.bind(this)}
                        previousButtonTemplate={previousButtonTemplate.bind(this)} nextButtonTemplate={nextButtonTemplate.bind(this)}>
                        <CarouselItemsDirective>
                            <CarouselItemDirective template={itemTemplate1.bind(this)} />
                            <CarouselItemDirective template={itemTemplate2.bind(this)} />
                            <CarouselItemDirective template={itemTemplate3.bind(this)} />
                            <CarouselItemDirective template={itemTemplate4.bind(this)} />
                            <CarouselItemDirective template={itemTemplate5.bind(this)} />
                        </CarouselItemsDirective>
                    </CarouselComponent>
                </div></div>
            <div id="action-description">
                <p>
                    This sample demonstrates the customization of the <a href="https://www.syncfusion.com/react-ui-components/react-carousel" target="_blank">React Carousel</a> component using various templates.
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

export default Templates;