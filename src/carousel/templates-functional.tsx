import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { CarouselComponent, CarouselItemsDirective, CarouselItemDirective } from '@syncfusion/ej2-react-navigations';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { updateSampleSection } from '../common/sample-base';
import './templates.css';

const Templates = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])


    const itemTemplate1 = () => {
        return (
            <figure className="img-container">
                <img src="src/carousel/images/cardinal.png" alt="cardinal" style={{ height: "100%", width: "100%" }} />
            </figure>
        );
    }

    const itemTemplate2 = () => {
        return (
            <figure className="img-container">
                <img src="src/carousel/images/hunei.png" alt="hunei" style={{ height: "100%", width: "100%" }} />
            </figure>
        );
    }

    const itemTemplate3 = () => {
        return (
            <figure className="img-container">
                <img src="src/carousel/images/costa-rica.png" alt="costa-rica" style={{ height: "100%", width: "100%" }} />
            </figure>
        );
    }

    const itemTemplate4 = () => {
        return (
            <figure className="img-container">
                <img src="src/carousel/images/kaohsiung.png" alt="kaohsiung" style={{ height: "100%", width: "100%" }} />
            </figure>
        );
    }

    const itemTemplate5 = () => {
        return (
            <figure className="img-container">
                <img src="src/carousel/images/bee-eater.png" alt="bee-eater" style={{ height: "100%", width: "100%" }} />
            </figure>
        );
    }

    const previousButtonTemplate = (props: any) => {
        return (
            <ButtonComponent className="e-btn" cssClass="e-flat e-round nav-btn" title={props.type}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
                    <path d="m13.5 7.01 13 13m-13 13 13-13"></path>
                </svg>
            </ButtonComponent>
        );
    }

    const nextButtonTemplate = (props: any) => {
        return (
            <ButtonComponent className="e-btn" cssClass="e-flat e-round nav-btn" title={props.type}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
                    <path d="m13.5 7.01 13 13m-13 13 13-13"></path>
                </svg>
            </ButtonComponent>
        );
    }

    const indicatorTemplate = (props: any) => {
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
                    <CarouselComponent cssClass="templateCarousel" animationEffect="Fade" buttonsVisibility="Visible" indicatorsTemplate={indicatorTemplate} previousButtonTemplate={previousButtonTemplate} nextButtonTemplate={nextButtonTemplate}>
                        <CarouselItemsDirective>
                            <CarouselItemDirective template={itemTemplate1} />
                            <CarouselItemDirective template={itemTemplate2} />
                            <CarouselItemDirective template={itemTemplate3} />
                            <CarouselItemDirective template={itemTemplate4} />
                            <CarouselItemDirective template={itemTemplate5} />
                        </CarouselItemsDirective>
                    </CarouselComponent>
                </div>
            </div>
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
                    More information about customizing React Carousel component can be found in this <a aria-label="Documentation section" target='_blank' href="https://ej2.syncfusion.com/documentation/carousel/getting-started">documentation section</a>.
                </p>
            </div>
        </div>
    );
}

export default Templates;