import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { CarouselComponent, CarouselItemsDirective, CarouselItemDirective } from '@syncfusion/ej2-react-navigations';
import { updateSampleSection } from '../common/sample-base';
import './partial-visible.css';

function PartialVisible() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])

    function itemTemplate1(): JSX.Element {
        return (<figure className="img-container">
            <img src="src/carousel/images/bridge.jpg" alt="bridge" style={{ height: "100%", width: "100% " }} />
            <figcaption className="img-caption">Golden Gate Bridge, San Francisco</figcaption>
        </figure>);
    }
    function itemTemplate2(): JSX.Element {
        return (<figure className="img-container">
            <img src="src/carousel/images/trees.jpg" alt="trees" style={{ height: "100%", width: "100% " }} />
            <figcaption className="img-caption">Spring Flower Trees</figcaption>
        </figure>);
    }
    function itemTemplate3(): JSX.Element {
        return (<figure className="img-container">
            <img src="src/carousel/images/waterfall.jpg" alt="waterfall" style={{ height: "100%", width: "100% " }} />
            <figcaption className="img-caption">Oddadalen Waterfalls, Norway</figcaption>
        </figure>);
    }
    function itemTemplate4(): JSX.Element {
        return (<figure className="img-container">
            <img src="src/carousel/images/sea.jpg" alt="sea" style={{ height: "100%", width: "100% " }} />
            <figcaption className="img-caption">Anse Source d`Argent, Seychelles</figcaption>
        </figure>);
    }
    function itemTemplate5(): JSX.Element {
        return (<figure className="img-container">
            <img src="src/carousel/images/rocks.jpeg" alt="rocks" style={{ height: "100%", width: "100% " }} />
            <figcaption className="img-caption">Stonehenge, England</figcaption>
        </figure>);
    }

    return (
        <div className='control-pane'>
            <div className='control-section partial-carousel-section'>
                <div className='control carousel-sample'>
                    {/* Render the Carousel Component */}
                    <CarouselComponent cssClass="partial-carousel" partialVisible={true}>
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
export default PartialVisible;