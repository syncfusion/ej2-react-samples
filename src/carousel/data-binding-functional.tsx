import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { CarouselComponent, CarouselButtonVisibility } from '@syncfusion/ej2-react-navigations';
import { updateSampleSection } from '../common/sample-base';
import './data-binding.css';


const DataBinding = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    let productDetails: Record<string, string | number>[] = [
        {
            ID: 1,
            Title: 'San Francisco',
            Content: 'San Francisco, officially the City and County of San Francisco, is a cultural, commercial, and financial center in the U.S. state of California. Located in Northern California, San Francisco is the 17th most populous city proper in the United States, and the fourth most populous in California.',
            ImgPath: 'src/carousel/images/san-francisco.jpg',
            URL: 'https://en.wikipedia.org/wiki/San_Francisco'
        }, {
            ID: 2,
            Title: 'London',
            Content: 'London, the capital of England and the United Kingdom, is a 21st-century city with history stretching back to Roman times. At its centre stand the imposing Houses of Parliament, the iconic ‘Big Ben’ clock tower and Westminster Abbey, site of British monarch coronations.',
            ImgPath: 'src/carousel/images/london.jpg',
            URL: 'https://en.wikipedia.org/wiki/London'
        }, {
            ID: 3,
            Title: 'Tokyo',
            Content: 'Tokyo, Japan’s busy capital, mixes the ultramodern and the traditional, from neon-lit skyscrapers to historic temples. The opulent Meiji Shinto Shrine is known for its towering gate and surrounding woods. The Imperial Palace sits amid large public gardens.',
            ImgPath: 'src/carousel/images/tokyo.jpg',
            URL: 'https://en.wikipedia.org/wiki/Tokyo'
        }, {
            ID: 4,
            Title: 'Moscow',
            Content: 'Moscow, on the Moskva River in western Russia, is the nation’s cosmopolitan capital. In its historic core is the Kremlin, a complex that’s home to the president and tsarist treasures in the Armoury. Outside its walls is Red Square, Russia`s symbolic center.',
            ImgPath: 'src/carousel/images/moscow.jpg',
            URL: 'https://en.wikipedia.org/wiki/Moscow'
        }
    ];

    let showButtons: CarouselButtonVisibility = "Hidden";

    const productTemplate = (props: any) => {

        return (
            <div className="card">
                <img src={props.ImgPath} alt={props.Title} className="card-img-top" style={{ height: "210px", width: "100%" }} />
                <div className="card-body" style={{ padding: "1rem" }}>
                    <h5 className="card-title">{props.Title}</h5>
                    <p className="card-text">{props.Content}</p>
                </div>
            </div>
        );
    }

    return (
        <div className='control-pane'>
            <div className='control-section db-carousel-section'>
                <div className='control carousel-sample'>
                    {/* Render the Carousel Component */}
                    <CarouselComponent cssClass="db-carousel" animationEffect="Fade" dataSource={productDetails} buttonsVisibility={showButtons} itemTemplate={productTemplate}></CarouselComponent>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates the basic rendering of the <a href="https://www.syncfusion.com/react-ui-components/react-carousel" target="_blank">React Carousel</a> component.
                </p>
            </div>
            <div id="description">
                <p>
                    In this demo, products and its details available in our Syncfusion has been shown as slide show. The data to the
                    React Carousel component is bound using <code>dataSource</code> property. Also,
                    <code>itemTemplate</code> is used to customize the slides of the carousel.
                </p>
            </div>
        </div>
    );
}

export default DataBinding;