import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { CarouselComponent, CarouselItemsDirective, CarouselButtonVisibility, CarouselItemDirective } from '@syncfusion/ej2-react-navigations';
import { DropDownListComponent, ChangeEventArgs as DropdownChangeArgs } from '@syncfusion/ej2-react-dropdowns';
import { SwitchComponent, ChangeEventArgs as ButtonChangeArgs } from '@syncfusion/ej2-react-buttons';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import './api.css';

const API = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const [showArrow, setShowArrow] = useState<CarouselButtonVisibility>('Visible');
    const [interval, setInterval] = useState<number>(3000);
    const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);
    const [isInfinityLoop, setIsInfinityLoop] = useState<boolean>(true);
    const [isShowIndicator, setIsShowIndicator] = useState<boolean>(true);
    const [isShowPlay, setIsShowPlay] = useState<boolean>(true);

    let carouselObj: CarouselComponent;

    const itemTemplate1 = () => {
        return (
            <figure className="img-container">
                <img src="src/carousel/images/bridge.jpg" alt="bridge" style={{ height: "100%", width: "100% " }} />
                <figcaption className="img-caption">Showing 1 of 5</figcaption>
            </figure>
        );
    }
    const itemTemplate2 = () => {
        return (
            <figure className="img-container">
                <img src="src/carousel/images/trees.jpg" alt="spring_trees" style={{ height: "100%", width: "100% " }} />
                <figcaption className="img-caption">Showing 2 of 5</figcaption>
            </figure>
        );
    }
    const itemTemplate3 = () => {
        return (
            <figure className="img-container">
                <img src="src/carousel/images/waterfall.jpg" alt="waterfall" style={{ height: "100%", width: "100% " }} />
                <figcaption className="img-caption">Showing 3 of 5</figcaption>
            </figure>
        );
    }
    const itemTemplate4 = () => {
        return (
            <figure className="img-container">
                <img src="src/carousel/images/sea.jpg" alt="sea" style={{ height: "100%", width: "100% " }} />
                <figcaption className="img-caption">Showing 4 of 5</figcaption>
            </figure>
        );
    }
    const itemTemplate5 = () => {
        return (
            <figure className="img-container">
                <img src="src/carousel/images/rocks.jpeg" alt="rocks" style={{ height: "100%", width: "100% " }} />
                <figcaption className="img-caption">Showing 5 of 5</figcaption>
            </figure>
        );
    }
    const showArrowsData: Record<string, any>[] = [
        { text: 'Hidden', value: 'Hidden' },
        { text: 'Visible', value: 'Visible' },
        { text: 'On Hover', value: 'VisibleOnHover' }
    ];
    const showArrowsField: Record<string, any> = { text: 'text', value: 'value' };
    const showArrowsStateChange = (args: DropdownChangeArgs): void => {
        setShowArrow(args.value as CarouselButtonVisibility);
    }

    const intervalData: Record<string, any>[] = [
        { text: '3 Seconds', value: 3000 },
        { text: '5 Seconds', value: 5000 },
        { text: '7 Seconds', value: 7000 }
    ];
    const intervalField: Record<string, any> = { text: 'text', value: 'value' };
    const intervalStateChange = (args: DropdownChangeArgs): void => {
        setInterval(args.value as number);
    }

    const autoPlayStateChange = (args: ButtonChangeArgs): void => {
        setIsAutoPlay(args.checked as boolean);
    }

    const infiniteLoopStateChange = (args: ButtonChangeArgs): void => {
        setIsInfinityLoop(args.checked as boolean);
    }

    const showIndicatorStateChange = (args: ButtonChangeArgs): void => {
        setIsShowIndicator(args.checked as boolean);
    }

    const showPlayStateChange = (args: ButtonChangeArgs): void => {
        setIsShowPlay(args.checked as boolean);
    }

    return (
        <div className='control-pane'>
            <div className='col-lg-8 control-section api-carousel-section'>
                <div className='control-wrapper carousel-sample'>
                    {/* Render the Carousel Component */}
                    <CarouselComponent ref={(carousel) => { carouselObj = carousel }} cssClass="api-carousel" interval={interval} buttonsVisibility={showArrow} autoPlay={isAutoPlay} loop={isInfinityLoop} showIndicators={isShowIndicator} showPlayButton={isShowPlay}>
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
            <div className='col-lg-4 property-section api-carousel-section'>
                <PropertyPane title='Properties'>
                    <table id='property' title='Properties' className='property-panel-table'>
                        <tbody>
                            <tr>
                                <td>Enable Autoplay</td>
                                <td>
                                    <div>
                                        <SwitchComponent id="autoPlay" checked={isAutoPlay} change={autoPlayStateChange} />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Infinite Looping</td>
                                <td>
                                    <div>
                                        <SwitchComponent id="infiniteLoop" checked={isInfinityLoop} change={infiniteLoopStateChange} />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td >Show Indicators</td>
                                <td>
                                    <div>
                                        <SwitchComponent id="showIndicator" checked={isShowIndicator} change={showIndicatorStateChange} />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Show Play Button</td>
                                <td>
                                    <div>
                                        <SwitchComponent id="showPlay" checked={isShowPlay} change={showPlayStateChange} />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Show Arrows</td>
                                <td>
                                    <div>
                                        <DropDownListComponent id='showArrows' dataSource={showArrowsData} fields={showArrowsField} value={showArrow} change={showArrowsStateChange} />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Slide Interval</td>
                                <td>
                                    <div>
                                        <DropDownListComponent id='interval' dataSource={intervalData} fields={intervalField} value={interval} change={intervalStateChange} />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </PropertyPane>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates the properties available in the <a href="https://www.syncfusion.com/react-ui-components/react-carousel" target="_blank">React Carousel</a> component.
                </p>
            </div>
            <div id="description">
                <p>
                    In this demo,  you can manually change the properties of the <code>React Carousel</code> component like <code>autoPlay</code>, <code>buttonsVisibility</code>, <code>showIndicators</code>,
                    <code>interval</code>, <code>showPlayButton</code>, <code>loop</code> using the property panel.
                </p>
                <p>
                    More information about the properties available in the Carousel component can be found in this <a aria-label="documentation section" target='_blank' href="https://ej2.syncfusion.com/documentation/api/carousel/">documentation section</a>.
                </p>
            </div>
        </div >
    );
}
export default API;
